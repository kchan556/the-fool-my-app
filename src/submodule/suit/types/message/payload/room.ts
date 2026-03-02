import type { BasePayload } from './base';
import type { PlayerDeck } from '../../game/deck';

export interface RoomPayload extends BasePayload {
  roomId: string;
}

/**
 * プレイヤー参加登録ペイロード
 */
export interface PlayerEntryPayload extends RoomPayload {
  type: 'PlayerEntry';
  player: {
    name: string;
    id: string;
    deck: PlayerDeck;
  };
}
