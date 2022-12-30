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

from django.contrib import admin

from gcloud.label import models


@admin.register(models.Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "project_id", "from_space_id"]
    list_filter = ["project_id", "is_default", "color", "creator", "from_space_id"]
    search_fields = ["name", "project_id", "creator", "from_space_id"]


@admin.register(models.TemplateLabelRelation)
class TemplateLabelRelation(admin.ModelAdmin):
    list_display = ["id", "label_id", "template_id"]
    search_fields = ["label_id", "template_id"]
