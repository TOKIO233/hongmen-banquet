# 多维表格插件接入

默认用 `BitableRecordComments`（见 SKILL.md 场景 A），它内部完成 `capabilityClient.load(pluginInstanceId)`、当前用户、妙搭人员目录与 adapter 装配。只有下面两种情况才手工装配：

- **只读展示**：不想暴露写入口时，注入只有 `list` 的 api：

```tsx
import { useComments, CommentPanel, useMiaodaCurrentUser, createMiaodaPeopleSource } from '@/components/miaoda/comments';
import { createBitableCommentAdapter, type BitableCommentAPI } from '@/components/miaoda/comments/adapters/bitable';

const api: BitableCommentAPI = { list: listRecordComments }; // 应用按插件 schema 实现的方法
const currentUser = useMiaodaCurrentUser();
const people = useMemo(() => createMiaodaPeopleSource(), []);
const adapter = useMemo(() => createBitableCommentAdapter({ scopeKey: `bitable-plugin:${PLUGIN_INSTANCE_ID}`, api, people }), [people]);
const comments = useComments({ resourceKey: recordId, currentUser, adapter });
return <CommentPanel value={comments} />;
```

- **已有插件封装层**：传 `client`（`{ call(action, input) }`）或 `api`（list/create/update/remove/react），二选一。未提供的方法不暴露对应入口；`react` 只在实例 schema 有 `updateRecordCommentReaction` 且 `needReaction/reactions` 字段可用时提供，否则 `reactions: false`。

约束不变：评论 ID 保留字符串，秒转毫秒由 adapter 处理；回复带原 `commentID`，删除始终传选中消息的 `replyID`；图片未接入，不开启图片按钮；`scopeKey` 覆盖插件实例与授权上下文，切换记录只改 `resourceKey`。身份域是妙搭 userId（namespace `miaoda-user`），作者回显靠 `people.resolve`，当前用户靠 `currentUser`，两条链分别验收。
