'use client';

import { createContext, ReactNode, useReducer, useMemo } from 'react';

// Define the supported drive types
export type DriveType = 'UNIT' | 'EVOLVE' | 'INTERCEPT' | 'TRIGGER' | 'JOKER';
export type Position = 'left' | 'center' | 'right';
export type Phase = 'phase1' | 'phase2' | 'phase3' | 'hidden';

// Define the parameters for showing the effect
export interface CardUsageEffectParams {
  image: string;
  type: DriveType;
  position: Position;
}

// Define the state interface for the card usage effect
export interface CardUsageEffectState {
  isVisible: boolean;
  imageUrl: string;
  type: DriveType;
  position: Position;
  phase: Phase;
}

// Define the action types for the reducer
export type CardUsageEffectAction =
  | { type: 'SHOW_EFFECT'; params: CardUsageEffectParams }
  | { type: 'SET_PHASE'; phase: Phase }
  | { type: 'HIDE_EFFECT' };

// Define the context type
export type CardUsageEffectContextType = {
  state: CardUsageEffectState;
  showCardUsageEffect: (params: CardUsageEffectParams) => Promise<void>;
  hideCardUsageEffect: () => void;
};

// Create the context
export const CardUsageEffectContext = createContext<CardUsageEffectContextType | undefined>(
  undefined
);

// Initial state
const initialState: CardUsageEffectState = {
  isVisible: false,
  imageUrl: '',
  type: 'UNIT',
  position: 'center',
  phase: 'hidden',
};

// Reducer function
function cardUsageEffectReducer(
  state: CardUsageEffectState,
  action: CardUsageEffectAction
): CardUsageEffectState {
  switch (action.type) {
    case 'SHOW_EFFECT':
      return {
        ...state,
        isVisible: true,
        imageUrl: action.params.image,
        type: action.params.type,
        position: action.params.position,
        phase: 'phase1',
      };
    case 'SET_PHASE':
      return {
        ...state,
        phase: action.phase,
      };
    case 'HIDE_EFFECT':
      return {
        ...state,
        isVisible: false,
        phase: 'hidden',
      };
    default:
      return state;
  }
}

// Provider component
export const CardUsageEffectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardUsageEffectReducer, initialState);

  // 繧ｿ繧､繝溘Φ繧ｰ險ｭ螳・(ms蜊倅ｽ・
  const timings = {
    phase1: 10, // 繝輔ぉ繝ｼ繧ｺ1縺ｮ陦ｨ遉ｺ譎る俣・医⊇縺ｼ蜊ｳ譎る・遘ｻ・・
    phase2: 500, // 繝輔ぉ繝ｼ繧ｺ2縺ｮ陦ｨ遉ｺ譎る俣
    phase3: 500, // 繝輔ぉ繝ｼ繧ｺ3縺ｮ邨ゆｺ・∪縺ｧ縺ｮ譎る俣
  };

  // Action creators
  const showCardUsageEffect = (params: CardUsageEffectParams): Promise<void> => {
    // Cancel any ongoing animation
    hideCardUsageEffect();

    // Start new animation
    dispatch({ type: 'SHOW_EFFECT', params });

    return new Promise(resolve => {
      const schedule = [
        {
          delay: timings.phase1,
          action: () => dispatch({ type: 'SET_PHASE', phase: 'phase2' }),
        },
        {
          delay: timings.phase1 + timings.phase2 + 500,
          action: () => dispatch({ type: 'SET_PHASE', phase: 'phase3' }),
        },
        {
          delay: timings.phase1 + timings.phase2 + timings.phase3 + 500,
          action: () => {
            dispatch({ type: 'HIDE_EFFECT' });
            resolve();
          },
        },
      ];

      // 蜷・い繧ｯ繧ｷ繝ｧ繝ｳ繧偵せ繧ｱ繧ｸ繝･繝ｼ繝ｫ縺ｩ縺翫ｊ縺ｫ螳溯｡・
      schedule.forEach(({ delay, action }) => {
        setTimeout(action, delay);
      });
    });
  };

  const hideCardUsageEffect = () => {
    dispatch({ type: 'HIDE_EFFECT' });
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({ state, showCardUsageEffect, hideCardUsageEffect }),
    [state]
  );

  return (
    <CardUsageEffectContext.Provider value={contextValue}>
      {children}
    </CardUsageEffectContext.Provider>
  );
};
