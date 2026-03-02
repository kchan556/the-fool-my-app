import type { BasePayload, RequestPayload, ResponsePayload } from './base';
import type { Rule } from '../../rule';
import type { PlayerDeck } from '../../game/deck';

export interface RoomOpenRequestPayload extends RequestPayload {
  type: 'RoomOpenRequest';
  name: string;
  rule: Rule;
}

export interface RoomOpenResponsePayload extends ResponsePayload {
  type: 'RoomOpenResponse';
  roomId: string;
}

/**
 * マッチングモード
 * - freedom: 制限なし。全カード使用可能。
 * - standard: Ver.1.2以降。同名カード3枚まで。
 * - legacy: Ver.1.4EX3以前。1stジョーカー、手札加算方式。
 * - limited: デッキ合計オリジナリティ100以上必須。
 */
export type MatchingMode = 'freedom' | 'standard' | 'legacy' | 'limited';

/**
 * マッチング開始リクエストペイロード
 * クライアントからサーバーにマッチングキューへの参加を要求
 */
export interface MatchingStartRequestPayload extends RequestPayload {
  type: 'MatchingStartRequest';
  mode: MatchingMode;
  player: {
    name: string;
    id: string;
    deck: PlayerDeck;
  };
}

/**
 * マッチング開始レスポンスペイロード
 * キューへの参加確認を返す
 */
export interface MatchingStartResponsePayload extends ResponsePayload {
  type: 'MatchingStartResponse';
  queueId: string;
  position: number;
}

/**
 * マッチングキャンセルリクエストペイロード
 * クライアントからサーバーにマッチングキャンセルを要求
 */
export interface MatchingCancelRequestPayload extends RequestPayload {
  type: 'MatchingCancelRequest';
}

/**
 * マッチングキャンセルレスポンスペイロード
 * キャンセル確認を返す
 */
export interface MatchingCancelResponsePayload extends ResponsePayload {
  type: 'MatchingCancelResponse';
}

/**
 * ルーム退室リクエストペイロード
 * ゲーム終了後にクライアントがルームを退室する際に送信
 */
export interface LeaveRoomRequestPayload extends BasePayload {
  type: 'LeaveRoomRequest';
  roomId: string;
}

/**
 * マッチング状況リクエストペイロード
 * クライアントからサーバーに現在のマッチングキュー状況を要求
 */
export interface MatchingStatusRequestPayload extends BasePayload {
  type: 'MatchingStatusRequest';
}
