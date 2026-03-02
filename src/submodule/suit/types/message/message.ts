import type {
  Payload,
  RoomPayload,
  RequestPayload,
  ResponsePayload,
  RoomOpenRequestPayload,
  RoomOpenResponsePayload,
  PlayerEntryPayload,
  TurnChangePayload,
} from './payload';

/**
 * ハンドラータイプ
 * payloadを処理させる対象を指定します。
 */
export type HandlerType = 'server' | 'room' | 'core' | 'client';

/**
 * アクションタイプ
 * payloadを処理するタイプを指定します。
 */
export type ActionType = string;

/**
 * Action
 * メッセージのアクション情報を定義します。
 * @param handler payloadを処理させる対象を指定します。
 * @param type payloadを処理するタイプを指定します。
 */
export interface Action<H extends HandlerType = HandlerType, T extends ActionType = ActionType> {
  handler: H;
  type: T;
}

/**
 * Message
 * WebSocketを通じて送信されるJSONオブジェクトの形式を定義しています。
 * ジェネリックパラメータPでペイロードの型を指定できます。
 * payload.typeに基づいて具体的なペイロード型が推論されます。
 *
 * @param action メッセージのアクション情報
 * @param payload 処理内容を記述します
 */
export interface Message<P = Payload> {
  action: Action;
  payload: P;
}

/**
 * 特定のハンドラーに対するメッセージ型
 */
export interface RoomMessage<P = RoomPayload> extends Message<P> {
  action: Action<'room'>;
}

export interface ServerMessage<P = Payload> extends Message<P> {
  action: Action<'server'>;
}

export interface CoreMessage<P = Payload> extends Message<P> {
  action: Action<'core'>;
}

export interface ClientMessage<P = Payload> extends Message<P> {
  action: Action<'client'>;
}

/**
 * リクエスト用のメッセージ型
 * RequestPayloadを拡張したペイロードを持つメッセージ
 */
export type RequestMessage<P extends RequestPayload = RequestPayload> = Message<P>;

/**
 * レスポンス用のメッセージ型
 * ResponsePayloadを拡張したペイロードを持つメッセージ
 */
export type ResponseMessage<P extends ResponsePayload = ResponsePayload> = Message<P>;

/**
 * ペイロードタイプに基づいた型推論のためのユーティリティ型
 */
export interface PayloadTypeToPayload {
  RoomOpenRequest: RoomOpenRequestPayload;
  RoomOpenResponse: RoomOpenResponsePayload;
  PlayerEntry: PlayerEntryPayload;
  TurnChange: TurnChangePayload;
  // 他のペイロードタイプも必要に応じて追加
}

/**
 * ペイロードタイプから具体的なペイロード型を取得
 */
export type PayloadFromType<T extends string> = T extends keyof PayloadTypeToPayload
  ? PayloadTypeToPayload[T]
  : never;

/**
 * アクションタイプとペイロードタイプの関連付け
 * 例: 'open'アクションタイプは'RoomOpenRequest'ペイロードタイプと関連付けられる
 */
export interface ActionTypeToPayloadType {
  open: 'RoomOpenRequest';
  response: 'RoomOpenResponse';
  join: 'PlayerEntry';
  turnChange: 'TurnChange';
  // 他のアクションタイプとペイロードタイプの関連付けも必要に応じて追加
}

/**
 * アクションタイプとペイロードタイプのマッピング（実行時の値）
 */
export const actionTypeToPayloadType: ActionTypeToPayloadType = {
  open: 'RoomOpenRequest',
  response: 'RoomOpenResponse',
  join: 'PlayerEntry',
  turnChange: 'TurnChange',
};

/**
 * アクションタイプから関連するペイロードタイプを取得
 */
export type PayloadTypeFromActionType<T extends keyof ActionTypeToPayloadType> =
  ActionTypeToPayloadType[T];

/**
 * アクションタイプから具体的なペイロード型を取得
 */
export type PayloadFromActionType<T extends keyof ActionTypeToPayloadType> = PayloadFromType<
  PayloadTypeFromActionType<T>
>;

/**
 * 型安全なメッセージ作成のためのヘルパー関数
 *
 * 使用例:
 * const message = createMessage({
 *   action: {
 *     handler: 'server',
 *     type: 'open'
 *   },
 *   payload: {
 *     type: 'RoomOpenRequest',
 *     name: 'Game Room',
 *     requestId: '123'
 *   }
 * });
 */
export function createMessage<
  H extends HandlerType,
  T extends ActionType,
  P extends Payload,
>(message: { action: Action<H, T>; payload: P }): Message<P> {
  return message;
}

/**
 * 型安全なメッセージ作成のためのヘルパー関数（アクションタイプからペイロードタイプを推論）
 *
 * 使用例:
 * const message = createMessageFromActionType({
 *   action: {
 *     handler: 'server',
 *     type: 'open'
 *   },
 *   payload: {
 *     name: 'Game Room',
 *     requestId: '123'
 *   }
 * });
 */
export function createMessageFromActionType<
  H extends HandlerType,
  T extends keyof ActionTypeToPayloadType,
>(message: {
  action: Action<H, T>;
  payload: Omit<PayloadFromActionType<T>, 'type'>;
}): Message<PayloadFromActionType<T>> {
  return {
    action: message.action,
    payload: {
      ...message.payload,
      type: actionTypeToPayloadType[message.action.type],
    } as PayloadFromActionType<T>,
  };
}

