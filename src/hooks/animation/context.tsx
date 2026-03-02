'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AnimationRegistryEntry, EffectType } from './types';

export interface AnimationContextType {
  // 繧｢繧ｯ繝・ぅ繝悶↑繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ逋ｻ骭ｲ縺ｨ霑ｽ霍｡
  activeAnimations: AnimationRegistryEntry[];
  registerAnimation: (
    type: EffectType,
    target: string,
    metadata?: Record<string, unknown>
  ) => string;
  unregisterAnimation: (id: string) => void;

  // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ髢薙・隱ｿ謨ｴ逕ｨ
  getPriorityAnimation: (target: string) => AnimationRegistryEntry | undefined;
  getAnimationsForTarget: (target: string) => AnimationRegistryEntry[];
}

// 繝・ヵ繧ｩ繝ｫ繝亥､
const defaultContext: AnimationContextType = {
  activeAnimations: [],
  registerAnimation: () => '',
  unregisterAnimation: () => {},
  getPriorityAnimation: () => undefined,
  getAnimationsForTarget: () => [],
};

export const AnimationContext = createContext<AnimationContextType>(defaultContext);

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAnimations, setActiveAnimations] = useState<AnimationRegistryEntry[]>([]);

  // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ逋ｻ骭ｲ
  const registerAnimation = useCallback(
    (type: EffectType, target: string, metadata?: Record<string, unknown>): string => {
      const id = `${type}-${target}-${Date.now()}`;

      setActiveAnimations(prev => [...prev, { id, type, target, isActive: true, metadata }]);

      return id;
    },
    []
  );

  // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ逋ｻ骭ｲ隗｣髯､
  const unregisterAnimation = useCallback((id: string) => {
    setActiveAnimations(prev => prev.filter(animation => animation.id !== id));
  }, []);

  // 迚ｹ螳壹・繧ｿ繝ｼ繧ｲ繝・ヨ縺ｫ蟇ｾ縺吶ｋ蜆ｪ蜈医い繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧貞叙蠕・
  const getPriorityAnimation = useCallback(
    (target: string) => {
      return activeAnimations.find(anim => anim.target === target);
    },
    [activeAnimations]
  );

  // 迚ｹ螳壹・繧ｿ繝ｼ繧ｲ繝・ヨ縺ｫ髢｢騾｣縺吶ｋ縺吶∋縺ｦ縺ｮ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧貞叙蠕・
  const getAnimationsForTarget = useCallback(
    (target: string) => {
      return activeAnimations.filter(anim => anim.target === target);
    },
    [activeAnimations]
  );

  return (
    <AnimationContext.Provider
      value={{
        activeAnimations,
        registerAnimation,
        unregisterAnimation,
        getPriorityAnimation,
        getAnimationsForTarget,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
