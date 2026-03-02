# Message型システム

このドキュメントでは、WebSocketを通じて送信されるJSONオブジェクトの型定義システムについて説明します。

## 基本構造

Message型は以下の基本構造を持っています：

```typescript
interface Message<P = Payload> {
  action: Action;
  payload: P;
}

interface Action<H extends HandlerType = HandlerType, T extends ActionType = ActionType> {
  handler: H;
  type: T;
}
```

- `action.handler`: payloadを処理させる対象を指定します（'server', 'room', 'core', 'client'）
- `action.type`: payloadを処理するタイプを指定します
- `payload`: 処理内容を記述します
- `payload.type`: ペイロードの具体的な型を識別するための文字列

## 型推論の仕組み

このシステムでは、以下の2つの方法で型推論が行われます：

1. **ジェネリックパラメータによる型指定**：

   ```typescript
   const message: Message<RoomOpenRequestPayload> = { ... };
   ```

2. **payload.typeによる型推論**：
   ```typescript
   function processMessage(message: Message) {
     if (message.payload.type === 'RoomOpenRequest') {
       // この中ではmessage.payloadはRoomOpenRequestPayloadとして推論される
       console.log(message.payload.name);
     }
   }
   ```

## 特殊なメッセージ型

特定のハンドラーに対するメッセージ型：

```typescript
interface RoomMessage<P = RoomPayload> extends Message<P> {
  action: Action<'room'>;
}

interface ServerMessage<P = Payload> extends Message<P> {
  action: Action<'server'>;
}

interface CoreMessage<P = Payload> extends Message<P> {
  action: Action<'core'>;
}

interface ClientMessage<P = Payload> extends Message<P> {
  action: Action<'client'>;
}
```

リクエスト/レスポンス用のメッセージ型：

```typescript
type RequestMessage<P extends RequestPayload = RequestPayload> = Message<P>;
type ResponseMessage<P extends ResponsePayload = ResponsePayload> = Message<P>;
```

## ユーティリティ型と関数

アクションタイプとペイロードタイプの関連付け：

```typescript
type ActionTypeToPayloadType = {
  open: 'RoomOpenRequest';
  response: 'RoomOpenResponse';
  join: 'PlayerEntry';
  // 他のアクションタイプとペイロードタイプの関連付けも必要に応じて追加
};
```

ペイロードタイプに基づいた型推論：

```typescript
type PayloadTypeToPayload = {
  RoomOpenRequest: RoomOpenRequestPayload;
  RoomOpenResponse: RoomOpenResponsePayload;
  PlayerEntry: PlayerEntryPayload;
  // 他のペイロードタイプも必要に応じて追加
};
```

## ヘルパー関数

型安全なメッセージ作成のためのヘルパー関数：

```typescript
// 通常のメッセージ作成
const message = createMessage({
  action: {
    handler: 'server',
    type: 'open',
  },
  payload: {
    type: 'RoomOpenRequest',
    name: 'Game Room',
    requestId: '123',
  },
});

// アクションタイプからペイロードタイプを自動的に設定
const message = createMessageFromActionType({
  action: {
    handler: 'server',
    type: 'open',
  },
  payload: {
    name: 'Game Room',
    requestId: '123',
  },
});
```

## 使用例

詳細な使用例は `src/submodule/suit/examples/message-example.ts` を参照してください。

## 型安全性の向上

このシステムにより、以下のような型安全性が向上します：

1. ジェネリックパラメータによる型指定（`Message<RoomOpenRequestPayload>`）
2. payload.typeに基づく型の絞り込み
3. アクションタイプとペイロードタイプの関連付け
4. ヘルパー関数による型安全なメッセージ作成

これにより、コード補完が強化され、型エラーを早期に発見できるようになります。
