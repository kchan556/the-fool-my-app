/**
 * プレイヤーが持ち込むデッキ構成
 * カード40枚 + ジョーカー0-2枚
 */
export interface PlayerDeck {
  cards: string[];   // catalogId の配列
  jokers: string[];  // JOKER catalogId の配列
}
