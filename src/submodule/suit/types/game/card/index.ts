import type { JokerGuageAmountKey } from "../../../constant/joker";
import type { Species } from "./species";

export interface IAtom {
  id: string;
}

export interface ICard extends IAtom {
  catalogId: string;
  lv: number;
  delta?: IDelta[];
  currentCost?: number;
}

export type KeywordEffect =
  | '行動制限'
  | '不屈'
  | '貫通'
  | '無我の境地'
  | '固着'
  | '加護'
  | '次元干渉'
  | '呪縛'
  | '不滅'
  | '王の治癒力'
  | '秩序の盾'
  | '沈黙'
  | '強制防御'
  | '攻撃禁止'
  | '防御禁止'
  | '破壊効果耐性'
  | '消滅効果耐性'
  | '進化禁止'
  | 'セレクトハック'
  | '狂戦士'
  | '神託'
  | 'オーバーヒート'
  | '沈黙効果耐性'
  | '撤退禁止'
  | '起動';

export type DeltaEffect =
  | {
    type: 'bp';
    diff: number;
  }
  | {
    type: 'dynamic-bp';
    diff: number;
  }
  | {
    type: 'keyword';
    name: '次元干渉';
    cost: number;
  }
  | {
    type: 'keyword';
    name: Exclude<KeywordEffect, '次元干渉'>;
  }
  | {
    type: 'damage';
    value: number;
  }
  | {
    type: 'cost';
    value: number;
  }
  | {
    type: 'dynamic-cost';
    diff: number;
  }
  | {
    type: 'death'; // デスカウンター: 汎用
  }
  | {
    type: 'life'; // 寿命カウンター: ウィルス専用
  }
  | {
    type: 'banned'; // 使用不能
  };

export interface IDelta {
  count: number;
  event: string | undefined;
  effect: DeltaEffect;
}

export interface IUnit extends ICard {
  bp: number;
  currentBP: number;
  active: boolean;
  isCopy: boolean;
  hasBootAbility: boolean | undefined;
  isBooted: boolean;
}

export interface Catalog {
  id: string;
  name: string;
  rarity: 'c' | 'uc' | 'r' | 'vr' | 'sr' | 'pr' | 'sp';
  cost: number;
  color: number;
  bp?: [number, number, number];
  ability: string;
  originality: number;
  img: string;
  type: 'unit' | 'trigger' | 'intercept' | 'advanced_unit' | 'virus' | 'joker';
  species?: Species[];
  info: {
    version: number;
    number: number;
  };
  gauge?: JokerGuageAmountKey;
  visible?: number;
  rank?: {
    order: number;
    point: number;
  };
  related?: string[];
}
