/**
 * client.ts: Clientに対して送信するPayloadを記述
 */

import type { IPlayer } from '../../game';
import type { Choices } from '../../game/system';
import type { Rule } from '../../rule';
import type { BasePayload } from './base';
import type { ErrorCode } from '../../../constant/error';

interface GameStats {
  round: number;
  turn: number;
  turnPlayer: IPlayer['id'],
  firstPlayer: IPlayer['id'],
}

export interface DisplayEffectPayload extends BasePayload {
  type: 'DisplayEffect';
  promptId: string;
  stackId: string; // これがなにか分かってない
  title: string;
  message: string;
  unitId: string | undefined;
}

export interface DebugPrintPayload extends BasePayload {
  type: 'DebugPrint';
  message: string | object;
}

export interface ChoicesPayload extends BasePayload {
  type: 'Choices';
  promptId: string;
  player: string;
  choices: Choices;
}

export interface SelectedPayload extends BasePayload {
  type: 'Selected';
  promptId: string;
}

export interface SyncPayload extends BasePayload {
  type: 'Sync';
  selfId?: string;
  role?: 'player' | 'spectator';
  body: {
    rule: Rule;
    game: GameStats;
    players: { [key: string]: IPlayer };
  };
}

export type VisualEffectPayloadBody = {
  effect: 'drive';
  type: 'UNIT' | 'EVOLVE' | 'INTERCEPT' | 'TRIGGER' | 'JOKER';
  player: string;
  image: string;
} | {
  effect: 'attack';
  attackerId: string;
} | {
  effect: 'launch';
  attackerId: string;
  blockerId?: string;
} | {
  effect: 'launch-cancel';
  attackerId: string;
} | {
  effect: 'status';
  unitId: string;
  type: 'bp' | 'base-bp' | 'damage' | 'level' | 'overclock';
  value: number;
} | {
  effect: 'select';
  unitId: string;
} | {
  effect: 'block';
  blockerId: string;
}

export type VisualEffectPayload = {
  type: 'VisualEffect'
  body: VisualEffectPayloadBody
}

export interface SoundEffectPayload extends BasePayload {
  type: 'SoundEffect';
  soundId: string;
}

export interface OperationPayload extends BasePayload {
  type: 'Operation';
  action: 'freeze' | 'defrost';
  remainingTime?: number; // 残り時間（ミリ秒）
}

export interface TurnEndPayload extends BasePayload {
  type: 'TurnEnd';
  remainingTime: number;
}

export interface MulliganStartPayload extends BasePayload {
  type: 'MulliganStart';
}

/**
 * エラー通知ペイロード
 * サーバーからクライアントにエラー情報を送信する
 */
export interface ErrorPayload extends BasePayload {
  type: 'Error';
  errorCode: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

/**
 * プレイヤー切断通知ペイロード
 * 対戦相手が切断した際に残りのプレイヤーに送信される
 */
export interface PlayerDisconnectedPayload extends BasePayload {
  type: 'PlayerDisconnected';
  disconnectedPlayerId: string;
  reason: 'connection_lost' | 'client_close' | 'timeout';
  timestamp: number;
  roomWillClose: boolean;
}

/**
 * プレイヤー復帰通知ペイロード
 * 切断したプレイヤーが再接続した際に他のプレイヤーに送信される
 */
export interface PlayerReconnectedPayload extends BasePayload {
  type: 'PlayerReconnected';
  reconnectedPlayerId: string;
  timestamp: number;
}

/**
 * ルーム閉鎖通知ペイロード
 * ルームが閉鎖される際にクライアントに送信される
 */
export interface RoomClosedPayload extends BasePayload {
  type: 'RoomClosed';
  roomId: string;
  reason: 'empty' | 'admin_close' | 'error';
  message?: string;
}

/**
 * ターンチェンジペイロード
 * クライアントにターンチェンジを通知
 */
export interface TurnChangePayload extends BasePayload {
  type: 'TurnChange';
  player: string;
  isFirst: boolean;
}

/**
 * ゲームの終了を伝達するペイロード
 * winner がない場合、両者敗北を示す
 */
export interface SituationCompletedPayload extends BasePayload {
  type: 'SituationCompleted';
  winner?: string;
  reason: 'damage' | 'limit' | 'surrender'
}

/**
 * マッチング成功通知ペイロード
 * マッチングが成立した際に両プレイヤーに送信される
 */
export interface MatchingSuccessPayload extends BasePayload {
  type: 'MatchingSuccess';
  roomId: string;
  opponentName: string;
  mode: 'freedom' | 'standard' | 'legacy' | 'limited';
}

/**
 * マッチング待機状況ペイロード
 * 各モードの待機人数をリアルタイムで配信
 */
export interface MatchingStatusPayload extends BasePayload {
  type: 'MatchingStatus';
  queues: {
    freedom: number;
    standard: number;
    legacy: number;
    limited: number;
  };
  timestamp: number;
  activeGames: number;
}
