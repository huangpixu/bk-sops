/**
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
    <div class="tag-checkbox">
        <div v-if="formMode">
            <el-checkbox-group v-model="checkedValue">
                <div class="checkbox-item" v-for="item in items" :key="item.name">
                    <el-checkbox :label="item.value" :disabled="!editable || disabled">{{item.name}}</el-checkbox>
                </div>
            </el-checkbox-group>
            <span v-show="!validateInfo.valid" class="common-error-tip error-info">{{validateInfo.message}}</span>
        </div>
        <span v-else class="rf-view-value">{{viewValue}}</span>
    </div>
</template>
<script>
    import '@/utils/i18n.js'
    import i18n from '@/config/i18n/index.js'
    import { getFormMixins } from '../formMixins.js'

    export const attrs = {
        items: {
            type: Array,
            required: true,
            default () {
                return [
                    {
                        name: i18n.t('选项1'),
                        value: 'value1'
                    },
                    {
                        name: i18n.t('选项2'),
                        value: 'value2'
                    },
                    {
                        name: i18n.t('选项3'),
                        value: 'value3'
                    }
                ]
            },
            desc: "array like [{name: '', value: ''}, {name: '', value: ''}]"
        },
        disabled: {
            type: Array,
            required: false,
            default: false,
            desc: 'disable checkbox'
        },
        value: {
            type: [Array, String],
            required: false,
            default () {
                return []
            }
        }
    }
    export default {
        name: 'TagCheckbox',
        mixins: [getFormMixins(attrs)],
        computed: {
            checkedValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.updateForm(val)
                }
            },
            viewValue () {
                // 特殊处理只有一个可选项并且label为空的情况，兼容job快速执行脚本滚动执行
                if (this.items.length === 1 && !this.items[0].label) {
                    return this.checkedValue.length ? this.$t('是') : this.$t('否')
                }

                if (!this.checkedValue.length) {
                    return '--'
                }

                return this.checkedValue.map(val => {
                    let label = val
                    this.items.some(item => {
                        if (item.value === val) {
                            label = item.name
                            return true
                        }
                    })
                    return label
                }).join(',')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .checkbox-item {
        display: inline-block;
        min-width: 100px;
        height: 32px;
        line-height: 32px;
        ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #606266;
        }
    }
</style>
