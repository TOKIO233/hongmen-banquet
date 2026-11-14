# 飞书 OpenAPI 接入

当前适配云文档评论 OpenAPI，不代表全部飞书资源。资源 token 通过 useComments.resourceKey 传入；fileType 与 anchorBlockId 是当前资源配置，切换到不同块或资源类型时重建 adapter。

```tsx
import { useMemo } from 'react';
import { useComments, CommentPanel } from '@/components/miaoda/comments';
import { createFeishuOpenApiCommentAdapter } from '@/components/miaoda/comments/adapters/feishu-openapi';

const adapter = useMemo(() => createFeishuOpenApiCommentAdapter({
  scopeKey: authorizationScope,
  request: backendRequest,
  currentUser,
  fileType: 'docx',
  anchorBlockId,
  people: peopleSource,
  documents: documentSource,
  reactions: { allowedKeys: ['THUMBSUP'] },
}), [authorizationScope, backendRequest, currentUser, anchorBlockId, peopleSource, documentSource]);
const comments = useComments({ resourceKey: fileToken, currentUser, adapter });
return <CommentPanel value={comments} />;
```

request 接收 method/path/query/body/signal，返回 OpenAPI 的 code/msg/data。应用后端按用户授权转发，校验允许的资源和操作；不要暴露通用无鉴权代理，或把 access token/secret 放到前端。Agent 生成期使用 CLI 准备资源与运行时请求是两条链路。

currentUser.ref.namespace 应覆盖飞书应用及 open_id 身份域，id 保留 ou_ 字符串。people.source 必须使用相同 namespace；不需要转换为 Miaoda ID。文档元数据按调用用户读取，网络错误不能映射成 forbidden，真实拒绝才显示无权限。

工厂直接返回 CommentAdapter，接入后无需再包装 actions/list。它映射创建与回复的不同 elements 协议、两层分页、秒转毫秒、编辑、单消息删除与回应。整篇文档评论不支持回复；块级评论需有效 anchor。回应仅在配置 allowedKeys 且后端有对应授权时开启，当前已验收 THUMBSUP；截断人员列表不能证明 mine:false。

文档链接通过 documents.source.parseUrl 和 resolve 恢复引用及标题。有限 URL 解析不等于标题搜索。图片写入未接入，不能因链接引用已支持就开启上传。
