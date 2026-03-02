'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type ChoiceOption = {
  id: string;
  label: string;
  enabled: boolean;
  // 莉ｻ諢上〒繝ｩ繝吶Ν繧・ｿｽ蜉諠・ｱ繧呈僑蠑ｵ蜿ｯ
  // labelTop?: string;
};

type ChoicePanelState = {
  options: ChoiceOption[] | null;
  selectedId: string | null;
  remainTime: number | null; // 遘抵ｼ亥ｰ乗焚轤ｹ2譯・ｼ・
  deadline: number | null; // Date.now() + 谿九ｊms
  player: string | null; // 驕ｸ謚樊ｨｩ繧呈戟縺､繝励Ξ繧､繝､繝ｼID
  title: string | null; // 繝懊ち繝ｳ荳企Κ繝ｩ繝吶Ν
  promptId: string | null; // 驕ｸ謚櫁い繝励Ο繝ｳ繝励ヨID
};

type ChoicePanelContextType = {
  state: ChoicePanelState;
  setOptions: (
    opts: ChoiceOption[],
    timeLimitSec: number,
    player: string,
    title: string,
    promptId: string
  ) => void;
  clear: () => void;
  select: (id: string) => void;
  tick: () => void;
  setOnSelectCallback: (cb: (id: string | null) => void) => void;
};

const ChoicePanelContext = createContext<ChoicePanelContextType | undefined>(undefined);

export const useChoicePanel = () => {
  const ctx = useContext(ChoicePanelContext);
  if (!ctx) throw new Error('useChoicePanel must be used within ChoicePanelProvider');
  return ctx;
};

export const ChoicePanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChoicePanelState>({
    options: null,
    selectedId: null,
    remainTime: null,
    deadline: null,
    player: null,
    title: null,
    promptId: null,
  });

  // 繧ｿ繧､繝槭・邂｡逅・
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 驕ｸ謚樊凾繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ
  const onSelectCallbackRef = useRef<((id: string | null) => void) | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.deadline) return prev;
      const remain = Math.max(0, prev.deadline - Date.now());
      const remainSec = remain / 1000;
      if (remain <= 0) {
        clearTimer();
        return { ...prev, remainTime: 0 };
      }
      return { ...prev, remainTime: remainSec };
    });
  }, []);

  const setOptions = (
    opts: ChoiceOption[],
    timeLimitSec: number,
    player: string,
    title: string,
    promptId: string
  ) => {
    clearTimer();
    const deadline = Date.now() + timeLimitSec * 1000;
    setState({
      options: opts,
      selectedId: null,
      remainTime: timeLimitSec,
      deadline,
      player,
      title,
      promptId,
    });
    timerRef.current = setInterval(tick, 30);
  };

  const clear = () => {
    console.log('clear');
    clearTimer();
    // onSelectCallbackRef.current縺ｯ蜻ｼ縺ｰ縺壹√◆縺null繧ｯ繝ｪ繧｢
    onSelectCallbackRef.current = null;
    setState({
      options: null,
      selectedId: null,
      remainTime: null,
      deadline: null,
      player: null,
      title: null,
      promptId: null,
    });
  };

  const select = (id: string) => {
    clearTimer();
    setState(prev => ({
      ...prev,
      selectedId: id,
    }));
    if (onSelectCallbackRef.current) {
      onSelectCallbackRef.current(id);
      onSelectCallbackRef.current = null;
    }
  };

  // 繧ｯ繝ｪ繝ｼ繝ｳ繧｢繝・・
  React.useEffect(() => {
    return () => clearTimer();
  }, []);

  // 驕ｸ謚樊凾繧ｳ繝ｼ繝ｫ繝舌ャ繧ｯ繧偵そ繝・ヨ
  const setOnSelectCallback = (cb: (id: string | null) => void) => {
    onSelectCallbackRef.current = cb;
  };

  return (
    <ChoicePanelContext.Provider
      value={{ state, setOptions, clear, select, tick, setOnSelectCallback }}
    >
      {children}
    </ChoicePanelContext.Provider>
  );
};
