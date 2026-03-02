/**
 * exportされるPayloadはUniqueなtypeを持たなければならない。
 */
export interface BasePayload {
  type: string;
}

/**
 * クライアントがRequestPayload形式のMessageを送り返すことを期待したMessageを送信する際に利用します。
 * この形式のPayloadを受け取った場合、同値のrequestIdのMessageを送り返す必要があります。
 * @param requestId リクエストを識別するためのUUID
 */
export interface RequestPayload extends BasePayload {
  requestId: string;
}

export interface ResponsePayload extends BasePayload {
  requestId: string;
  result: boolean;
}
