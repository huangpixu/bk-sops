* Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
* Edition) available.
* Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
* Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://opensource.org/licenses/MIT
* Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
* an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
* specific language governing permissions and limitations under the License.
*/
<template>
    <div class="output-params">
        <bk-table :data="list" :col-border="false" :row-class-name="getRowClassName">
            <bk-table-column show-overflow-tooltip :label="$t('名称')" :width="180" prop="name"></bk-table-column>
            <bk-table-column show-overflow-tooltip :label="$t('说明')">
                <template slot-scope="props">
                    <div
                        v-if="props.row.description"
                        v-bk-overflow-tips>
                        {{ props.row.description }}
                    </div>
                    <span v-else>--</span>
                </template>
            </bk-table-column>
            <bk-table-column label="Key" class-name="param-key" :width="260">
                <template slot-scope="props">
                    <div v-bk-overflow-tips :style="{ color: props.row.hooked ? '#3a84ff' : '#63656e' }">{{ props.row.key }}</div>
                    <span
                        class="hook-icon-wrap"
                        v-bk-tooltips="{
                            content: props.row.hooked ? $t('取消接收输出') : $t('使用变量接收输出'),
                            placement: 'bottom',
                            zIndex: 3000
                        }">
                        <i
                            :class="['common-icon-variable-hook hook-icon', {
                                actived: props.row.hooked,
                                disabled: isViewMode || !hook
                            }]"
                            @click="onHookChange(props)">
                        </i>
                    </span>
                </template>
            </bk-table-column>
        </bk-table>
        <bk-dialog
            ext-cls="common-dialog"
            :theme="'primary'"
            :mask-close="false"
            :render-directive="'if'"
            :header-position="'left'"
            :title="$t('使用变量接收输出')"
            :auto-close="false"
            :value="isShow"
            width="600"
            :cancel-text="$t('取消')"
            @confirm="onConfirm"
            @cancel="onCancel">
            <div class="variable-dialog">
                <bk-alert
                    style="margin-bottom: 14px;"
                    type="warning"
                    :title="$t('已存在相同KEY的变量，请新建变量')">
                </bk-alert>
                <bk-form
                    ref="form"
                    :model="formData"
                    :rules="rules">
                    <template>
                        <bk-form-item :label="$t('变量名称')" property="name" :required="true">
                            <bk-input
                                name="variableName"
                                v-model="formData.name"
                                :maxlength="stringLength.VARIABLE_NAME_MAX_LENGTH"
                                :show-word-limit="true">
                            </bk-input>
                        </bk-form-item>
                        <bk-form-item :label="$t('变量KEY')" property="key" :required="true">
                            <bk-input
                                name="variableKey"
                                v-model="formData.key"
                                :maxlength="stringLength.VARIABLE_KEY_MAX_LENGTH"
                                :show-word-limit="true">
                            </bk-input>
                        </bk-form-item>
                    </template>
                </bk-form>
            </div>
        </bk-dialog>
    </div>
</template>
<script>
    import i18n from '@/config/i18n/index.js'
    import tools from '@/utils/tools.js'
    import { NAME_REG, STRING_LENGTH, INVALID_NAME_CHAR } from '@/constants/index.js'
    export default {
        name: 'OutputParams',
        props: {
            params: Array,
            hook: {
                type: Boolean,
                default: true
            },
            constants: Object,
            thirdPartyCode: String,
            isSubflow: Boolean,
            isViewMode: Boolean,
            nodeId: String,
            version: String // 标准插件版本或子流程版本
        },
        data () {
            const list = this.getOutputsList(this.params)
            const $this = this
            return {
                list,
                isShow: false,
                formData: {},
                selectIndex: '',
                stringLength: STRING_LENGTH,
                rules: {
                    name: [
                        {
                            required: true,
                            message: i18n.t('必填项'),
                            trigger: 'blur'
                        },
                        {
                            max: STRING_LENGTH.VARIABLE_NAME_MAX_LENGTH,
                            message: i18n.t('变量名称长度不能超过') + STRING_LENGTH.VARIABLE_NAME_MAX_LENGTH + i18n.t('个字符'),
                            trigger: 'blur'
                        },
                        {
                            regex: NAME_REG,
                            message: i18n.t('变量名称不能包含') + INVALID_NAME_CHAR + i18n.t('非法字符'),
                            trigger: 'blur'
                        }
                    ],
                    key: [
                        {
                            required: true,
                            message: i18n.t('必填项'),
                            trigger: 'blur'
                        },
                        {
                            max: STRING_LENGTH.VARIABLE_KEY_MAX_LENGTH,
                            message: i18n.t('变量KEY值长度不能超过') + STRING_LENGTH.VARIABLE_KEY_MAX_LENGTH + i18n.t('个字符'),
                            trigger: 'blur'
                        },
                        {
                            // 合法变量key正则，eg:${fsdf_f32sd},fsdf_f32sd
                            regex: /(^\${(?!_env_|_system\.)[a-zA-Z_]\w*}$)|(^(?!_env_|_system\.)[a-zA-Z_]\w*$)/,
                            message: i18n.t('变量KEY由英文字母、数字、下划线组成，不允许使用系统变量及业务环境变量命名规则，且不能以数字开头'),
                            trigger: 'blur'
                        },
                        {
                            validator (val) {
                                const value = /^\$\{\w+\}$/.test(val) ? val : `\${${val}}`
                                if (value in $this.constants) {
                                    return false
                                }
                                return true
                            },
                            message: i18n.t('变量KEY值已存在'),
                            trigger: 'blur'
                        }
                    ]
                },
                unhookingVarIndex: 0 // 正被取消勾选的表单下标
            }
        },
        watch: {
            params (val) {
                this.list = this.getOutputsList(val)
            }
        },
        methods: {
            getOutputsList () {
                const list = []
                const varKeys = Object.keys(this.constants)
                this.params.forEach(param => {
                    let key = param.key
                    const isHooked = varKeys.some(item => {
                        const varItem = this.constants[item]
                        if (varItem.source_type === 'component_outputs') {
                            const sourceInfo = varItem.source_info[this.nodeId]
                            if (sourceInfo && sourceInfo.includes(param.key)) {
                                key = item
                                return true
                            }
                        }
                    })
                    list.push({
                        key,
                        name: param.name,
                        description: param.schema ? param.schema.description : '--',
                        version: param.version,
                        status: param.status,
                        hooked: isHooked
                    })
                })
                return list
            },
            getRowClassName ({ row }) {
                return row.status || ''
            },
            /**
             * 输出参数勾选切换
             */
            onHookChange (props) {
                if (this.isViewMode) return
                const index = props.$index
                this.unhookingVarIndex = index
                if (!props.row.hooked) {
                    props.row.hooked = true
                    // 输出选中默认新建不弹窗，直接生成变量。 如果有冲突则如下弹窗
                    const { key, version, plugin_code } = props.row
                    const value = /^\$\{\w+\}$/.test(key) ? key : `\${${key}}`
                    if (value in this.constants) {
                        this.isShow = true
                        this.formData = tools.deepClone(props.row)
                        this.formData.key = ''
                        this.selectIndex = index
                    } else {
                        let setKey = ''
                        if ((/^\$\{((?!\{).)*\}$/).test(key)) {
                            props.row.key = key
                            setKey = key
                        } else {
                            props.row.key = `\$\{${key}\}`
                            setKey = `\$\{${key}\}`
                        }
                        const config = {
                            name: props.row.name,
                            key: setKey,
                            source_info: {
                                [this.nodeId]: [this.params[index].key]
                            },
                            version,
                            plugin_code: this.isSubflow ? plugin_code : (this.thirdPartyCode || '')
                        }
                        this.createVariable(config)
                    }
                } else {
                    const config = ({
                        type: 'delete',
                        id: this.nodeId,
                        key: props.row.key,
                        tagCode: props.row.key,
                        source: 'output'
                    })
                    this.$emit('hookChange', 'delete', config)
                }
            },
            // 变量勾选/取消勾选后，需重新对form进行赋值
            setFormData () {
                const index = this.unhookingVarIndex
                this.list[index].key = this.params[index].key
                this.list[index].name = this.params[index].name
                this.list[index].hooked = false
            },
            onConfirm ($event) {
                this.$refs.form.validate().then(result => {
                    if (result) {
                        const { name, key } = this.formData
                        this.isShow = false
                        const selectInfo = this.list[this.selectIndex]
                        const version = this.isSubflow ? selectInfo.version : this.version
                        let setKey = ''
                        if ((/^\$\{((?!\{).)*\}$/).test(key)) {
                            selectInfo.key = key
                            setKey = key
                        } else {
                            selectInfo.key = `\$\{${key}\}`
                            setKey = `\$\{${key}\}`
                        }
                        const config = {
                            name: name,
                            key: setKey,
                            source_info: {
                                [this.nodeId]: [this.params[this.selectIndex].key]
                            },
                            version,
                            plugin_code: this.isSubflow ? selectInfo.plugin_code : (this.thirdPartyCode || '')
                        }
                        this.createVariable(config)
                    }
                })
            },
            onCancel () {
                this.isShow = false
                this.list[this.selectIndex].hooked = false
            },
            createVariable (variableOpts) {
                const len = Object.keys(this.constants).length
                const defaultOpts = {
                    name: '',
                    key: '',
                    desc: '',
                    custom_type: '',
                    source_info: {},
                    source_tag: '',
                    value: '',
                    show_type: 'hide',
                    source_type: 'component_outputs',
                    validation: '',
                    index: len,
                    version: '',
                    plugin_code: ''
                }
                const variable = Object.assign({}, defaultOpts, variableOpts)
                this.$emit('hookChange', 'create', variable)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .variable-dialog {
        padding: 30px;
        .new-var-notice {
            margin-bottom: 10px;
            font-size: 14px;
            color: #ea3636;
        }
        .bk-form:not(.bk-form-vertical) {
            ::v-deep .bk-form-content {
                margin-right: 30px;
            }
        }
    }
    .bk-table {
        ::v-deep .bk-table-row {
            &.deleted {
                background: #fff5f4;
            }
            &.added {
                background: rgba(220,255,226,0.30);
            }
            .param-key .cell {
                padding-right: 50px;
            }
        }
    }
    .hook-icon-wrap {
        position: absolute;
        right: 22px;
        top: 5px;
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        background: #f0f1f5;
        text-align: center;
        border-radius: 2px;
        .hook-icon {
            font-size: 16px;
            color: #979ba5;
            cursor: pointer;
            &.disabled {
                color: #c4c6cc;
                cursor: not-allowed;
            }
            &.actived {
                color: #3a84ff;
            }
        }
    }
</style>
