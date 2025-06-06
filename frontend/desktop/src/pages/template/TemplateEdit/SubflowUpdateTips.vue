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
    <div v-if="expiredNodes.length > 0" class="subflow-update-tips">
        <div :class="['number', { active: showDetail }]" @click="onToggleDetail">{{ expiredNodes.length }}</div>
        <div class="tips-content">
            <notify-info
                :show.sync="showDetail"
                :content="tips">
                <template v-slot:buttons>
                    <bk-button :text="true" size="small" @click="onViewClick">{{ $t('查看需要更新的子流程') }}</bk-button>
                    <bk-button :disabled="isViewMode" :text="true" size="small" @click="onBatchUpdateClick">{{ $t('批量更新') }}</bk-button>
                    <bk-button :text="true" size="small" @click="onFoldClick">{{ $t('收起') }}</bk-button>
                </template>
            </notify-info>
        </div>
    </div>
</template>
<script>
    import i18n from '@/config/i18n/index.js'
    import NotifyInfo from '@/components/common/NotifyInfo.vue'

    export default {
        name: 'SubflowUpdateTips',
        components: {
            NotifyInfo
        },
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            },
            locations: {
                type: Array,
                default () {
                    return []
                }
            },
            isViewMode: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showDetail: true,
                curId: undefined
            }
        },
        computed: {
            // 节点根据位置做排序，优先级从左往右，在从上往下
            sortedList () {
                const list = this.list.map(item => {
                    const node = this.locations.find(loc => loc.id === item.subprocess_node_id)
                    return Object.assign({}, item, {
                        x: node.x,
                        y: node.y
                    })
                })
                return list.sort((a, b) => a.x - b.x)
            },
            expiredNodes () {
                return this.list.filter(item => {
                    return item.expired && this.locations.find(loc => loc.id === item.subprocess_node_id)
                })
            },
            tips () {
                return i18n.t('建议及时处理子流程更新，涉及') + this.expiredNodes.length + i18n.t('个子流程节点')
            }
        },
        methods: {
            onToggleDetail () {
                this.showDetail = !this.showDetail
                if (!this.showDetail) {
                    this.$emit('foldClick')
                }
            },
            onViewClick () {
                let id
                let reorderList = []
                if (this.curId === undefined) {
                    reorderList = this.sortedList
                } else {
                    const index = this.sortedList.findIndex(item => item.subprocess_node_id === this.curId)
                    if (index === this.sortedList.length - 1) {
                        reorderList = this.sortedList
                    } else {
                        reorderList = this.sortedList.slice(index + 1).concat(this.sortedList.slice(0, index))
                    }
                }
                reorderList.some(item => {
                    if (item.expired && this.locations.find(loc => loc.id === item.subprocess_node_id)) {
                        id = item.subprocess_node_id
                        return true
                    }
                })
                this.curId = id
                if (id) {
                    this.$emit('viewClick', id)
                }
            },
            onBatchUpdateClick () {
                this.$emit('batchUpdate')
            },
            onFoldClick () {
                this.showDetail = false
                this.$emit('foldClick')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .number {
        float: left;
        margin-top: 11px;
        margin-right: 10px;
        padding: 1px;
        min-width: 18px;
        height: 18px;
        font-size: 12px;
        border-radius: 9px;
        text-align: center;
        vertical-align: middle;
        color: #ffffff;
        background: #ea3636;
        cursor: pointer;
        transition: background-color .5s;
        &.active {
            background: #979ba5;
        }
    }
    .tips-content {
        float: left;
        ::v-deep .content-area {
            padding-right: 70px;
        }
        .bk-button-text {
            float: left;
        }
    }
</style>
