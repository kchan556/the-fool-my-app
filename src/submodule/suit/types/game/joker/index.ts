import type { ICard } from "../card";

/**
 * Joker card with its ability
 */
export interface IJoker extends ICard {
  catalogId: string; // catalogId (アビリティ名、例: "ルインリード")
  chara: string; // JOKERカード名（例: "THE HERMIT"）
  cost: number; // ジョーカーゲージ消費量
  isAvailable: boolean; // 使用可能かどうか（ゲージ + 条件チェック）
}
