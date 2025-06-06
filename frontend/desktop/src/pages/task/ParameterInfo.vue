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
    <div :class="['parameter-info-wrap', { 'no-data': isNoData }]" v-bkloading="{ isLoading: isParameterInfoLoading, opacity: 1, zIndex: 100 }">
        <TaskParamEdit
            v-if="isReferencedShow"
            class="task-param-wrapper"
            ref="TaskParamEdit"
            :constants="referencedVariable"
            @onChangeConfigLoading="onRefVarLoadingChange">
        </TaskParamEdit>
        <div
            class="variable-wrap"
            v-if="isUnreferencedShow">
            <div class="title-background" @click="onToggleUnreferenceShow">
                <div :class="['unreferenced-variable', { 'unreference-show': isUnrefVarShow }]"></div>
                <span class="title">{{$t('查看未引用变量')}}</span>
                <i class="common-icon-info desc-tooltip"
                    v-bk-tooltips="{
                        content: $t('在编辑流程模板时，可以通过变量引擎支持的语法引用全局变量，未引用的变量不可编辑'),
                        width: '400',
                        placements: ['bottom-end'] }">
                </i>
            </div>
            <TaskParamEdit
                class="unreferenced"
                v-show="isUnrefVarShow"
                :show-required="false"
                :constants="unReferencedVariable"
                :editable="false"
                @onChangeConfigLoading="onUnrefVarLoadingChange">
            </TaskParamEdit>
        </div>
        <NoData v-if="isNoData" :message="$t('暂无参数')"></NoData>
    </div>
</template>
<script>
    import TaskParamEdit from './TaskParamEdit.vue'
    import NoData from '@/components/common/base/NoData.vue'
    export default {
        name: 'ParameterInfo',
        components: {
            TaskParamEdit,
            NoData
        },
        props: ['referencedVariable', 'unReferencedVariable', 'taskMessageLoading'],
        data () {
            return {
                isUnrefVarShow: false,
                isRefVarLoading: true,
                isUnrefVarLoading: true

            }
        },
        computed: {
            isReferencedShow () {
                return this.getReferencedStatus(this.referencedVariable)
            },
            isUnreferencedShow () {
                if (this.taskMessageLoading) return false
                const variableKeys = Object.keys(this.unReferencedVariable)
                const unreferenced = variableKeys.filter(key => this.unReferencedVariable[key].show_type === 'show')
                return !!unreferenced.length
            },
            isParameterInfoLoading () {
                return this.isRefVarLoading || this.isUnrefVarLoading
            },
            isNoData () {
                return !this.taskMessageLoading && !this.isReferencedShow && !this.isUnreferencedShow
            }
        },
        watch: {
            isParameterInfoLoading (Val) {
                this.$emit('paramsLoadingChange', Val)
            },
            taskMessageLoading (val) {
                if (!val) {
                    if (!this.isReferencedShow) {
                        this.isRefVarLoading = false
                    }
                    if (!this.isUnreferencedShow) {
                        this.isUnrefVarLoading = false
                    }
                }
            }
        },
        methods: {
            onToggleUnreferenceShow () {
                this.isUnrefVarShow = !this.isUnrefVarShow
            },
            onRefVarLoadingChange (val) {
                this.isRefVarLoading = val
            },
            onUnrefVarLoadingChange (val) {
                this.isUnrefVarLoading = val
            },
            // 获取 TaskParamEdit
            getTaskParamEdit () {
                return this.$refs.TaskParamEdit
            },
            getReferencedStatus (variable) {
                return (this.taskMessageLoading || !variable)
                    ? false
                    : !!Object.keys(variable).length
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '@/scss/config.scss';
.task-param-wrapper {
    max-width: 100%;
    margin: 0 20px 20px 20px;
}
.parameter-info-wrap {
    min-height: 200px;
}
.variable-wrap {
    background: #f0f1f5;
    .unreferenced {
       padding-bottom: 1px;
    }
    .title-background {
        position: relative;
        padding-left: 20px;
        margin-bottom: 16px;
        cursor: pointer;
        &:hover {
            background: #e4e6ed;
        }
        .unreferenced-variable {
            display: inline-block;
            position: relative;
            width: 0;
            height: 0;
            border-left: 5px solid gray;
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }
        .unreference-show {
            top: 2px;
            transform: rotate(90deg);
        }
        .desc-tooltip {
            position: absolute;
            right: 20px;
            top: 22px;
            color: #c4c6cc;
            &:hover {
                color: #f4aa1a;
            }
        }
        .title {
            font-weight: 600;
            line-height: 60px;
            font-size: 14px
        }
    }
}
::v-deep .render-form {
    .el-input__inner,
    .el-tree,
    .el-date-editor,
    .el-textarea__inner,
    .el-input-number,
    .tag-input,
    .el-date-editor,
    .el-cascader,
    .el-select,
    .user-selector-layout,
    ::v-deep .ip-search-wrap {
        max-width: 598px;
    }
    ::v-deep .module-form  {
        .bk-form-content,
        .bk-input-number,
        .bk-select {
            max-width: 598px;
        }
    }
    .el-radio__label,
    .checkbox-item {
        max-width: 160px;
        margin-right: 24px;
    }
}
.no-data {
    ::v-deep .no-data-wrapper {
        position: relative;
        top: 90px;
    }
}
</style>
