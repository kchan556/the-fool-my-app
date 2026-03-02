export interface Rule {
  system: {
    round: number;
    turnTime: number; // ターン時間（秒）
    draw: {
      top: number;
      override: number;
      mulligan: number;
    };
    handicap: {
      draw: boolean;
      cp: boolean;
      attack: boolean;
    };
    cp: {
      init: number;
      increase: number;
      max: number;
      ceil: number;
      carryover: boolean;
    };
  };
  player: {
    max: {
      life: number;
      hand: number;
      trigger: number;
      field: number;
    };
  };
  misc: {
    strictOverride: boolean;
    autoEndOnTimeout: boolean;
    damageAsCost: boolean;
  };
  joker: {
    suicide: boolean;
    single: boolean;
    inHand: boolean;
    gauge: number;
    lifeDamage: number;
    maxTurnEnd: number;
    minTurnEnd: number;
  }
  debug?: {
    enable: boolean;
    reveal: {
      opponent: {
        deck: boolean;
        hand: boolean;
        trigger: boolean;
        trash: boolean;
      };
      self: {
        deck: boolean;
      };
    };
  };
}
