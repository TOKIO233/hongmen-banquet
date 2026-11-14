---
name: comments-guide
description: Use when integrating comment lists, reply editors, mentions, reactions or comment adapters in an application. 触发词：评论组件、评论、记录评论、多维表格评论、评论回复、编辑删除评论、表情回应、@人、评论 OpenAPI、useComments、CommentAdapter、BitableRecordComments
steering: true
steering-topic: comments_guide
match-template-name: nestjs-react-fullstack
---

# 评论组件接入

评论组件来自组件市场 `@miaoda/comments`，安装后在 `client/src/components/miaoda/comments`。接入依据只有两份：`get_ui_component_info(["@miaoda/comments"])` 返回的 docs，和本指南。**不要读 `core/` 源码，不要自己实现 adapter、编辑器、人员搜索、乐观更新。**

## 第一步：评论存在哪里（先定数据源，再动手）

| 被评论的数据 | 评论存储 | 走哪条 |
|---|---|---|
| 用户 @ 的多维表格、或记录本来就在飞书 Base 里 | 多维表格记录评论（飞书侧，随记录存） | 场景 A。**不建评论表、不写评论接口** |
| 飞书云文档 | 文档评论 OpenAPI | 场景 B |
| 应用自己数据库里的记录 | 只有用户明确要求时才建评论表 | 场景 C，先澄清 |

应用库为空、选了全栈模板、安装了评论组件，都不是建评论表的理由。缺 base/table/记录标识时先问用户，拿到前不执行 DDL。

## 场景 A：多维表格记录评论（4 步，顺序固定）

1. `skill` 加载 plugin-guide → `plugin_instance` 创建 `feishu-bitable` 插件实例。同一实例同时提供记录 CRUD 与评论动作（listRecordComments / addRecordComment / updateRecordComment / deleteRecordComment，新版还有 updateRecordCommentReaction），不需要第二个实例。
2. `get_ui_component_info(["@miaoda/comments"])` 安装组件并读 docs。
3. 在详情抽屉 / 详情页放一行（容器要有高度）：

```tsx
import { BitableRecordComments } from '@/components/miaoda/comments';

<div className="h-[360px]">
  <BitableRecordComments pluginInstanceId={PLUGIN_INSTANCE_ID} recordId={record.id} reactions />
</div>
```

`reactions` 开启表情回应：`shared/plugin-types.ts` 里有 `updateRecordCommentReaction` 就保留（新版插件都有），没有再删掉。要自定义布局用 `useBitableRecordComments({ pluginInstanceId, recordId })` + `CommentsProvider value` + `CommentList` / `CommentComposer`。

4. 验收：打开详情能看到评论列表与作者姓名头像；新增、回复、@人、编辑、删除各做一次。本地验证入口没有登录态时输入框不显示、作者未知是环境限制（预览 / 发布态正常），标为"未验证"即可，**不要改组件、不要加兜底请求**。

已内置、不要再写：当前用户（`useCurrentUserProfile`）、妙搭人员目录（@ 搜索与作者回显）、`capabilityClient.load`、adapter、分页与写后回读。

## 场景 B：飞书云文档评论

`createFeishuOpenApiCommentAdapter({ scopeKey, request, currentUser, fileType, anchorBlockId })` + `useComments({ resourceKey: fileToken, currentUser, adapter })` + `CommentPanel value`。`request` 由应用后端转发 OpenAPI，Token 不进浏览器；身份域是 open_id，与妙搭 userId 不混用，需要转换由后端做。细节见 [feishu-openapi](references/feishu-openapi.md)。

## 场景 C：应用自有数据源

实现 `CommentAdapter`（`list` 必需；`create/update/remove/people/reactions` 按真实能力提供；ID 字符串、时间毫秒、真实游标、删除只删选中消息），`currentUser` 用 `useMiaodaCurrentUser()`，人员目录用 `createMiaodaPeopleSource()`，再 `useComments` + `CommentPanel`。合同细节以组件 README「新数据源 adapter」为准。

## Common Mistakes

| 错误 | 正确做法 |
|---|---|
| 记录来自多维表格却建 `comment` 表 / 评论 API | 场景 A，评论随记录存在飞书侧 |
| 读 `core/*.ts`、`adapters/bitable.ts` 推断用法 | 只用 docs 与入口导出 |
| 自己拼 `createBitableCommentAdapter`，不传 `currentUser` / `people` | `BitableRecordComments` 已内置 |
| `Number(user.user_id)` 手工传 `currentUserID` | 已内置安全转换 |
| 再接一套 UserSelect / 人员搜索给 @ 用 | 组件内置妙搭人员目录 |
| 页面维护 loading / 临时评论 / 刷新 | hook 已处理 |
| `plugin_instance` 报"前置指南不在上下文" | 先 `skill` 加载 plugin-guide 再调用 |
| 本地预览输入框不显示就改组件 | 环境限制，预览 / 发布态正常 |
