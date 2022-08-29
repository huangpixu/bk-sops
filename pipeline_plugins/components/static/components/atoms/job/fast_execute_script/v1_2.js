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
(function () {
    $.atoms.job_fast_execute_script = [
        {
            tag_code: "biz_cc_id",
            type: "select",
            attrs: {
                name: gettext("业务"),
                allowCreate: true,
                hookable: true,
                remote: true,
                remote_url: $.context.get('site_url') + 'pipeline/cc_get_business_list/',
                remote_data_init: function (resp) {
                    if (resp.result === false) {
                        show_msg(resp.message, 'error');
                    }
                    return resp.data;
                },
                disabled: !$.context.canSelectBiz(),
                validation: [
                    {
                        type: "required"
                    }
                ]
            },
            methods: {
                _tag_init: function () {
                    if (this.value) {
                        return
                    }
                    this._set_value($.context.getBkBizId())
                }
            }
        },
        {
            tag_code: "job_script_source",
            type: "radio",
            attrs: {
                name: gettext("脚本来源"),
                hookable: false,
                items: [
                    {value: "manual", name: gettext("手工录入")},
                    {value: "general", name: gettext("业务脚本")},
                    {value: "public", name: gettext("公共脚本")},
                ],
                default: "manual",
                validation: [
                    {
                        type: "required"
                    }
                ],
            },
            events: [
                {
                    source: "job_script_source",
                    type: "init",
                    action: function () {
                        this.emit_event(this.tagCode, "change", this.value)
                    }
                },
            ]
        },
        {
            tag_code: "job_script_type",
            type: "radio",
            attrs: {
                name: gettext("脚本类型"),
                hookable: true,
                items: [
                    {value: "1", name: "shell"},
                    {value: "2", name: "bat"},
                    {value: "3", name: "perl"},
                    {value: "4", name: "python"},
                    {value: "5", name: "powershell"}
                ],
                default: "1",
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            var self = this;
                            var result = {
                                result: true,
                                error_message: ""
                            }
                            if (!self.get_parent) {
                                return result;
                            } else if (self.get_parent().get_child('job_script_source')) {
                                if (self.get_parent().get_child('job_script_source').value === "manual" && !value) {
                                    result.result = false;
                                    result.error_message = gettext("请选择脚本类型");
                                }
                            } else if (!value) {
                                result.result = false;
                                result.error_message = gettext("请选择脚本类型");
                            }
                            return result;
                        }
                    }
                ]
            },
            events: [
                {
                    source: "job_script_source",
                    type: "change",
                    action: function (value) {
                        var self = this;
                        if (value === "manual") {
                            self.show();
                        } else {
                            self.hide();
                        }
                    }
                }
            ]
        },
        {
            tag_code: "job_content",
            type: "code_editor",
            attrs: {
                name: gettext("脚本内容"),
                hookable: true,
                placeholder: gettext("填写执行脚本内容"),
                language: "shell",
                showLanguageSwitch: false,
                height: "400px",
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            var self = this;
                            var result = {
                                result: true,
                                error_message: ""
                            }
                            if (!self.get_parent) {
                                return result;
                            } else if (self.get_parent().get_child('job_script_source')) {
                                if (self.get_parent().get_child('job_script_source').value === "manual" && !value) {
                                    result.result = false;
                                    result.error_message = gettext("请输入脚本内容");
                                }
                            } else if (!value) {
                                result.result = false;
                                result.error_message = gettext("请输入脚本内容");
                            }
                            return result;
                        }
                    }
                ]
            },
            events: [
                {
                    source: "job_script_source",
                    type: "change",
                    action: function (value) {
                        var self = this;
                        if (value === "manual") {
                            self.show();
                        } else {
                            self.hide();
                        }
                    }
                }
            ]
        },
        {
            tag_code: "job_script_list_public",
            type: "select",
            attrs: {
                name: gettext("脚本列表"),
                hookable: true,
                remote: true,
                remote_url: function () {
                    return $.context.get('site_url') + 'pipeline/job_get_public_script_name_list/';
                },
                remote_data_init: function (resp) {
                    if (resp.result === false) {
                        show_msg(resp.message, 'error');
                    }
                    return resp.data;
                },
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            var self = this;
                            var result = {
                                result: true,
                                error_message: ""
                            };
                            if (!self.get_parent) {
                                return result;
                            } else if (self.get_parent().get_child('job_script_source')) {
                                if (self.get_parent().get_child('job_script_source').value === "public" && !value) {
                                    result.result = false;
                                    result.error_message = gettext("请选择脚本");
                                }
                            } else if (!value) {
                                result.result = false;
                                result.error_message = gettext("请选择脚本");
                            }
                            return result;
                        }
                    }
                ],
            },
            events: [
                {
                    source: "job_script_source",
                    type: "change",
                    action: function (value) {
                        var self = this
                        if (value === "public") {
                            self.show()
                        } else {
                            self.hide()
                        }
                    }
                }
            ]
        },
        {
            tag_code: "job_script_list_general",
            type: "select",
            attrs: {
                name: gettext("脚本列表"),
                hookable: true,
                remote: true,
                remote_url: function () {
                    const url = $.context.canSelectBiz() ? '' : $.context.get('site_url') + 'pipeline/job_get_script_name_list/' + $.context.getBkBizId() + '/?type=general';
                    return url;
                },
                remote_data_init: function (resp) {
                    if (resp.result === false) {
                        show_msg(resp.message, 'error');
                    }
                    return resp.data;
                },
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            let self = this
                            let result = {
                                result: true,
                                error_message: ""
                            }
                            if (!self.get_parent) {
                                return result
                            } else if (self.get_parent().get_child('job_script_source')) {
                                if (self.get_parent().get_child('job_script_source').value === "general" && !value) {
                                    result.result = false;
                                    result.error_message = gettext("请选择脚本");
                                }
                            } else if (!value) {
                                result.result = false;
                                result.error_message = gettext("请选择脚本");
                            }
                            return result
                        }
                    }
                ]
            },
            events: [
                {
                    source: "biz_cc_id",
                    type: "init",
                    action: function () {
                        const cc_id = this.get_parent && this.get_parent().get_child('biz_cc_id')._get_value();
                        if (cc_id !== '' && $.context.canSelectBiz()) {
                            this.remote_url = $.context.get('site_url') + 'pipeline/job_get_script_name_list/' + cc_id + '/?type=general';
                            this.remoteMethod();
                        }
                    }
                },
                {
                    source: "biz_cc_id",
                    type: "change",
                    action: function (value) {
                        if (!$.context.canSelectBiz()) {
                            return;
                        }
                        this._set_value('');
                        if (value === '') {
                            return;
                        }
                        this.remote_url = $.context.get('site_url') + 'pipeline/job_get_script_name_list/' + value + '/?type=general';
                        this.remoteMethod();
                    }
                },
                {
                    source: "job_script_source",
                    type: "change",
                    action: function (value) {
                        var self = this
                        if (value === "general") {
                            self.show()
                        } else {
                            self.hide()
                        }
                    }
                }
            ]
        },
        {
            tag_code: "job_script_param",
            type: "input",
            attrs: {
                name: gettext("脚本参数"),
                placeholder: gettext("可为空"),
                hookable: true
            },
        },
        {
            tag_code: "job_script_timeout",
            type: "input",
            attrs: {
                name: gettext("超时时间"),
                placeholder: gettext("单位为秒(60 - 86400)，为空时使用 JOB 默认值"),
                hookable: true,
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            let result = {
                                result: true,
                                error_message: ""
                            };
                            if (!value) {
                                return result
                            }
                            if (+value < 60 || +value > 86400) {
                                result.result = false;
                                result.error_message = gettext("超时时间必须在 60 - 86400 范围内")
                            }
                            return result
                        }
                    }
                ]
            }
        },
        {
            tag_code: "job_ip_list",
            type: "textarea",
            attrs: {
                name: gettext("目标IP"),
                placeholder: gettext("输入IP, 多个用英文逗号 `,` 或换行分隔"),
                hookable: true,
                validation: [
                    {
                        type: "required"
                    }
                ],
            },
        },
        {
            tag_code: "job_account",
            type: "input",
            attrs: {
                name: gettext("目标账户"),
                placeholder: gettext("请输入在蓝鲸作业平台上注册的账户名"),
                hookable: true,
                validation: [
                    {
                        type: "required"
                    }
                ]
            }
        },
        {
            tag_code: "job_rolling_execute",
            type: "radio",
            attrs: {
                name: gettext("滚动执行"),
                hookable: true,
                items: [
                    {value: true, name: gettext("是")},
                    {value: false, name: gettext("否")},
                ],
                default: false,
                validation: [
                    {
                        type: "required"
                    }
                ]
            }
        },
        {
            tag_code: "job_rolling_expression",
            type: "input",
            attrs: {
                name: gettext("滚动策略"),
                placeholder: gettext("详情请查看JOB使用指引"),
                hookable: true,
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            let self = this
                            let result = {
                                result: true,
                                error_message: ""
                            }
                            if (!self.get_parent) {
                                return result
                            } else if (self.get_parent().get_child('job_rolling_execute')) {
                                if (self.get_parent().get_child('job_rolling_execute').value && !value.toString()) {
                                    result.result = false;
                                    result.error_message = gettext("滚动执行开启时滚动策略为必填项");
                                }
                            }
                            return result
                        }
                    }
                ]
            },
            events: [
                {
                    source: "job_rolling_execute",
                    type: "change",
                    action: function (value) {
                        var self = this
                        if (value) {
                            self.show()
                        } else {
                            self.hide()
                        }
                    }
                },
                {
                    source: "job_rolling_execute",
                    type: "init",
                    action: function () {
                        const job_rolling_execute = this.get_parent && this.get_parent().get_child('job_rolling_execute')._get_value();
                        if (job_rolling_execute) {
                            this.show()
                        } else {
                            this.hide()
                        }
                    }
                },
            ]
        },
        {
            tag_code: "job_rolling_mode",
            type: "select",
            attrs: {
                name: gettext("滚动机制"),
                hookable: true,
                default: 1,
                validation: [
                    {
                        type: "custom",
                        args: function (value) {
                            let self = this
                            let result = {
                                result: true,
                                error_message: ""
                            }
                            if (!self.get_parent) {
                                return result
                            } else if (self.get_parent().get_child('job_rolling_execute')) {
                                if (self.get_parent().get_child('job_rolling_execute').value && !value.toString()) {
                                    result.result = false;
                                    result.error_message = gettext("滚动执行开启时滚动机制为必填项");
                                }
                            }
                            return result
                        }
                    }
                ],
                items: [
                    {text: '默认（执行失败则暂停）', value: 1},
                    {text: '忽略失败，自动滚动下一批', value: 2},
                    {text: '不自动，每批次都人工确认', value: 3},
                ]
            },
            events: [
                {
                    source: "job_rolling_execute",
                    type: "change",
                    action: function (value) {
                        var self = this
                        if (value) {
                            self.show()
                        } else {
                            self.hide()
                        }
                    }
                },
                {
                    source: "job_rolling_execute",
                    type: "init",
                    action: function () {
                        const job_rolling_execute = this.get_parent && this.get_parent().get_child('job_rolling_execute')._get_value();
                        if (job_rolling_execute) {
                            this.show()
                        } else {
                            this.hide()
                        }
                    }
                },
            ]
        },
        {
            tag_code: "job_success_id",
            type: "select",
            attrs: {
                name: gettext("JOB成功历史"),
                allowCreate: true,
                hookable: false,
                remote: true,
                remote_url: function () {
                    const url = $.context.canSelectBiz() ? '' : $.context.get('site_url') + 'pipeline/jobv3_get_instance_list/' + $.context.getBkBizId() + '/1/3/';
                    return url;
                },
                remote_data_init: function (resp) {
                    if (resp.result === false) {
                        show_msg(resp.message, 'error');
                    }
                    return resp.data;
                },
                showRightBtn: true,
                rightBtnCb: function () {
                    if (!this.value) {
                        return;
                    }
                    let biz_cc_id = this.get_parent && this.get_parent().get_child('biz_cc_id')._get_value();
                    let bk_job_host = window.BK_JOB_HOST;
                    if (bk_job_host.charAt(bk_job_host.length - 1) == "/") bk_job_host = bk_job_host.substr(0, bk_job_host.length - 1);
                    let url = bk_job_host + '/' + biz_cc_id + "/execute/task/" + this.value;
                    window.open(url, '_blank')
                },
                cols: 10
            },
            events: [
                {
                    source: "biz_cc_id",
                    type: "init",
                    action: function () {
                        if($.context.exec_env === "NODE_CONFIG") {
                            this.hide()
                        }
                        const cc_id = this.get_parent && this.get_parent().get_child('biz_cc_id')._get_value();
                        if (cc_id !== '' && $.context.canSelectBiz()) {
                            this.remote_url = $.context.get('site_url') + 'pipeline/jobv3_get_instance_list/' + cc_id + '/1/3/';
                            this.remoteMethod();
                        }
                    }
                },
                {
                    source: "button_refresh_2",
                    type: "click",
                    action: function (value) {
                        const cc_id = this.get_parent && this.get_parent().get_child('biz_cc_id')._get_value();
                        if (cc_id !== '') {
                            this.remote_url = $.context.get('site_url') + 'pipeline/jobv3_get_instance_list/' + cc_id + '/1/3/';
                            this.remoteMethod();
                        }
                    }
                },
                {
                    source: "biz_cc_id",
                    type: "change",
                    action: function (value) {
                        if (!$.context.canSelectBiz()) {
                            return;
                        }
                        this._set_value('');
                        if (value === '') {
                            return;
                        }
                        this.remote_url = $.context.get('site_url') + 'pipeline/jobv3_get_instance_list/' + value + '/1/3/';
                        this.remoteMethod();
                    }
                }
            ]
        },
        {
            tag_code: "©",
            type: "button",
            attrs: {
                hookable: false,
                type: "primary",
                title: '刷新',
                size: "normal",
                cols: 1,
                formViewHidden: true
            },
            events: [
                {
                    source: "biz_cc_id",
                    type: "init",
                    action: function () {
                        if($.context.exec_env === "NODE_CONFIG") {
                            this.hide()
                        }
                    }
                },
            ]
        },
    ]
})();