# -*- coding: utf-8 -*-
"""
Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
Edition) available.
Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""


from django.views.decorators.http import require_GET

from blueapps.account.decorators import login_exempt
from gcloud import err_code
from gcloud.apigw.decorators import mark_request_whether_is_trust, return_json_response
from gcloud.apigw.decorators import project_inject
from gcloud.common_template.models import CommonTemplate
from gcloud.constants import PROJECT
from gcloud.constants import NON_COMMON_TEMPLATE_TYPES
from gcloud.tasktmpl3.models import TaskTemplate
from gcloud.apigw.views.utils import format_template_data, process_pipeline_constants
from gcloud.iam_auth.intercept import iam_intercept
from gcloud.iam_auth.view_interceptors.apigw import GetTemplateInfoInterceptor
from apigw_manager.apigw.decorators import apigw_require


@login_exempt
@require_GET
@apigw_require
@return_json_response
@mark_request_whether_is_trust
@project_inject
@iam_intercept(GetTemplateInfoInterceptor())
def get_template_info(request, template_id, project_id):
    project = request.project
    template_source = request.GET.get("template_source", PROJECT)
    include_subprocess = request.GET.get("include_subprocess", None)
    include_constants = request.GET.get("include_constants", None)
    include_executor_proxy = request.GET.get("include_executor_proxy", None)
    if template_source in NON_COMMON_TEMPLATE_TYPES:
        try:
            tmpl = TaskTemplate.objects.select_related("pipeline_template").get(
                id=template_id, project_id=project.id, is_deleted=False
            )
        except TaskTemplate.DoesNotExist:
            result = {
                "result": False,
                "message": "template[id={template_id}] of project[project_id={project_id}, biz_id={biz_id}] "
                "does not exist".format(
                    template_id=template_id,
                    project_id=project.id,
                    biz_id=project.bk_biz_id,
                ),
                "code": err_code.CONTENT_NOT_EXIST.code,
            }
            return result
    else:
        try:
            tmpl = CommonTemplate.objects.select_related("pipeline_template").get(id=template_id, is_deleted=False)
        except CommonTemplate.DoesNotExist:
            result = {
                "result": False,
                "message": "common template[id={template_id}] does not exist".format(template_id=template_id),
                "code": err_code.CONTENT_NOT_EXIST.code,
            }
            return result

    data = format_template_data(tmpl, project, include_subprocess, include_executor_proxy=include_executor_proxy)
    if include_constants:
        data["template_constants"] = process_pipeline_constants(data["pipeline_tree"])

    return {
        "result": True,
        "data": data,
        "code": err_code.SUCCESS.code,
    }
