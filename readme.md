![](docs/resource/img/logo_zh.png)
---
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/TencentBlueKing/bk-sops/blob/master/LICENSE)
[![Coverage Status](https://codecov.io/gh/TencentBlueKing/bk-sops/branch/master/graph/badge.svg)](https://codecov.io/gh/TencentBlueKing/bk-sops)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentBlueKing/bk-sops/pulls)

[(English Documents Available)](readme_en.md)

标准运维（SOPS）是通过可视化的图形界面进行任务流程编排和执行的系统，是腾讯蓝鲸产品体系中一款轻量级的调度编排类SaaS产品。

标准运维有两大核心服务。一个是流程编排服务：基于腾讯蓝鲸PaaS平台的API网关服务，对接企业内部各个系统 API的能力，
将在多系统间切换的工作模式整合到一个流程中，实现一键自动化调度。另一个是自助化服务：标准运维屏蔽了底层系统之间的差异，
让运维人员可以将业务日常的运维工作交给产品、开发、测试等人员执行，实现业务发布、变更等日常工作的自助化，除此之外，为降低非运维人员的操作成本，
标准运维与蓝鲸PaaS平台深度整合，为用户提供了“轻应用”和“职能化”功能，提高自助率。

标准运维后台使用 Python 作为开发语言，使用 Django 开发框架；前端使用 Vue 开发页面，使用 jQuery 开发标准插件，通过配置式的开发模式，
不断降低用户开发标准插件前端表单的难度。

> 底层流程引擎 SDK：[bamboo-engine](https://github.com/TencentBlueKing/bamboo-engine)

## Overview
- [架构设计](docs/overview/architecture.md)
- [代码目录](docs/overview/code_structure.md)
- [使用场景](docs/overview/usecase.md)


## Features
- 多元接入支持：标准运维对接了蓝鲸通知、作业平台、配置平台等服务，作为官方标准插件库提供服务，还支持用户自定义接入企业内部系统，定制开发标准插件。
- 可视化流程编排：通过拖拽方式组合标准插件节点到一个流程模板。
- 多种流程模式：支持标准插件节点的串行、并行，支持子流程，可以根据全局参数自动选择分支执行，节点失败处理机制可配置。
- 参数引擎：支持参数共享，支持参数替换。
- 可交互的任务执行：任务执行中可以随时暂停、继续、撤销，节点失败后可以重试、跳过。
- 通用权限管理：通过配置平台同步业务角色，支持流程模板的使用权限控制。

了解更多功能，请参考[标准运维白皮书](https://bk.tencent.com/docs/)


## Getting started
- [开发环境后台部署](docs/install/dev_deploy.md)
- [开发环境前端部署](docs/install/dev_web.md)
- [正式环境源码部署](docs/install/source_code_deploy.md)
- [正式环境上传部署](docs/install/upload_pack_deploy.md)
- [移动端部署](docs/install/mobile_deploy.md)
- [标准插件开发](docs/develop/dev_plugins.md)
- [标准插件开发最佳实践](docs/develop/dev_plugin_best_practices.md)
- [标准运维开发者工具包](docs/develop/bksops-developer-tools.md)


## Usage
- [API使用说明](https://bk.tencent.com/docs/document/6.0/167/13157)
- [标准插件说明](docs/features/plugin_usage.md)
- [标准插件远程加载](docs/features/remote_plugins.md)
- [变量引擎](docs/features/variables_engine.md)
- [Tag使用和开发说明](docs/develop/tag_usage_dev.md)
- [移动端使用说明](docs/features/mobile.md)
- [redis 部署模式支持](docs/features/redis_usage.md)
- [版本升级注意事项](docs/ops/version_update_notes.md)
- [故障排查手册](docs/ops/fault_detection_manual.md)

## Releases
- [已发布版本](https://github.com/TencentBlueKing/bk-sops/releases)

## BlueKing Community

- [BK-CMDB](https://github.com/Tencent/bk-cmdb)：蓝鲸配置平台（蓝鲸 CMDB）是一个面向资产及应用的企业级配置管理平台。
- [BK-CI](https://github.com/Tencent/bk-ci)：蓝鲸持续集成平台是一个开源的持续集成和持续交付系统，可以轻松将你的研发流程呈现到你面前。
- [BK-BCS](https://github.com/Tencent/bk-bcs)：蓝鲸容器管理平台是以容器技术为基础，为微服务业务提供编排管理的基础服务平台。
- [BK-PaaS](https://github.com/Tencent/bk-paas)：蓝鲸 PaaS 平台是一个开放式的开发平台，让开发者可以方便快捷地创建、开发、部署和管理 SaaS 应用。
- [BK-SOPS](https://github.com/TencentBlueKing/bk-sops)：标准运维（SOPS）是通过可视化的图形界面进行任务流程编排和执行的系统，是蓝鲸体系中一款轻量级的调度编排类 SaaS 产品。
- [BK-JOB](https://github.com/Tencent/bk-job)：蓝鲸作业平台(Job)是一套运维脚本管理系统，具备海量任务并发处理能力。

## Support
- [源码](https://github.com/TencentBlueKing/bk-sops/tree/master)
- [wiki](https://github.com/TencentBlueKing/bk-sops/wiki)
- [白皮书](https://bk.tencent.com/docs/)
- [蓝鲸论坛](https://bk.tencent.com/s-mart/community)
- [蓝鲸 DevOps 在线视频教程](https://bk.tencent.com/s-mart/video/)
- 联系我们，加入腾讯蓝鲸运维开发交流群：878501914

## Contributing
如果你有好的意见或建议，欢迎给我们提 Issues 或 Pull Requests，为蓝鲸开源社区贡献力量。关于标准运维分支管理、Issue 以及 PR 规范，
请阅读 [Contributing Guide](docs/CONTRIBUTING.md)。

[腾讯开源激励计划](https://opensource.tencent.com/contribution) 鼓励开发者的参与和贡献，期待你的加入。

## FAQ
[FAQ](docs/wiki/faq.md)


## License
标准运维是基于 MIT 协议， 详细请参考 [LICENSE](LICENSE.txt) 。

我们承诺未来不会更改适用于交付给任何人的当前项目版本的开源许可证（MIT 协议）。
