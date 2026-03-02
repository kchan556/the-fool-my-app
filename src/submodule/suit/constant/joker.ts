// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jokerGuageAmountKey = [
  '小',
  '中',
  '大',
  '特大',
] as const

export const JOKER_GAUGE_AMOUNT: Record<JokerGuageAmountKey, number> = {
  '小': 41,
  '中': 53.5,
  '大': 66,
  '特大': 81,
}

export type JokerGuageAmountKey = (typeof jokerGuageAmountKey)[number];
