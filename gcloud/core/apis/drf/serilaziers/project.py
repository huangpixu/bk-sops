# -*- coding: utf-8 -*-
"""
Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
Edition) available.
Copyright (C) 2017-2022 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""
from rest_framework import serializers

from gcloud.core.models import Project, ProjectConfig


class ProjectSerializer(serializers.ModelSerializer):
    create_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S %z", read_only=True)
    allow_plugin_cross_biz = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ["relate_business"]
        read_only_fields = [
            "name",
            "time_zone",
            "creator",
            "from_cmdb",
            "bk_biz_id",
            "relate_business",
            "allow_plugin_cross_biz",
        ]

    def get_allow_plugin_cross_biz(self, obj):
        project_id = obj.id
        project_config = ProjectConfig.objects.filter(project_id=project_id).first()
        return getattr(project_config, "allow_plugin_cross_biz", False)
