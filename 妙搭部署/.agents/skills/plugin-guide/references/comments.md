# 评论接入

先读共享的 [comments-guide](../../comments-guide/SKILL.md)。默认路径：安装 `@miaoda/comments` → `<BitableRecordComments pluginInstanceId recordId />`，不重复实现编辑器、乐观队列、人员搜索或已有服务映射。

- [多维表格插件接入](../../comments-guide/references/bitable.md)：评论存在记录上，读写走当前实例的 listRecordComments / addRecordComment / updateRecordComment / deleteRecordComment；只读或已有封装时才手工注入 api / client。
- [飞书 OpenAPI 接入](../../comments-guide/references/feishu-openapi.md)：注入用户授权的后端 request；当前覆盖云文档评论，Token 留在后端；身份域是 open_id，与妙搭 userId 不混用。

组件内只有 comments 入口，core 是私有实现目录，不读、不改。缺组件时先 get_ui_component_info 安装，不能编造 import。
