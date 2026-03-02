'use client';

import { useRef, useCallback } from 'react';
import { useTimer as useTimerHook } from 'react-timer-hook';
import { TimerContext, TimerContextType, TimerProviderProps } from './hooks';

export const TimerProvider = ({ children, initialTime = 60 }: TimerProviderProps) => {
  // 繧ｿ繧､繝槭・髢句ｧ区凾蛻ｻ
  const startTimeRef = useRef<number | null>(null);
  // 髢句ｧ区凾縺ｮ谿九ｊ遘呈焚
  const startSecondsRef = useRef<number>(initialTime);
  // 荳譎ょ●豁｢譎ゅ・谿九ｊ遘呈焚
  const pausedSecondsRef = useRef<number | null>(null);
  // 繧ｿ繧､繝繧｢繧ｦ繝医さ繝ｼ繝ｫ繝舌ャ繧ｯ
  const onExpireRef = useRef<(() => void) | null>(null);
  const expireFiredRef = useRef(false);

  const setOnExpire = useCallback((callback: (() => void) | null) => {
    onExpireRef.current = callback;
    expireFiredRef.current = false;
  }, []);

  const getExpiryTimestamp = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  const handleExpire = useCallback(() => {
    if (onExpireRef.current && !expireFiredRef.current) {
      expireFiredRef.current = true;
      onExpireRef.current();
    }
  }, []);

  const { totalSeconds, isRunning, restart } = useTimerHook({
    expiryTimestamp: getExpiryTimestamp(initialTime),
    autoStart: false,
    interval: 100,
    onExpire: handleExpire,
  });

  const resetTimer = useCallback(() => {
    startTimeRef.current = null;
    startSecondsRef.current = initialTime;
    pausedSecondsRef.current = initialTime;
    restart(getExpiryTimestamp(initialTime), false);
  }, [initialTime, restart]);

  const resumeTimer = useCallback(() => {
    const secondsToUse = pausedSecondsRef.current ?? initialTime;
    startTimeRef.current = Date.now();
    startSecondsRef.current = secondsToUse;
    pausedSecondsRef.current = null;
    restart(getExpiryTimestamp(secondsToUse), true);
  }, [initialTime, restart]);

  const pauseTimer = useCallback(() => {
    // 髢句ｧ区凾蛻ｻ縺九ｉ邨碁℃譎る俣繧定ｨ育ｮ励＠縺ｦ谿九ｊ譎る俣繧呈ｱゅａ繧・
    if (startTimeRef.current !== null) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, startSecondsRef.current - elapsed);
      pausedSecondsRef.current = remaining;
      restart(getExpiryTimestamp(remaining), false);
    } else {
      // 繧ｿ繧､繝槭・縺後∪縺髢句ｧ九＆繧後※縺・↑縺・ｴ蜷・
      pausedSecondsRef.current = pausedSecondsRef.current ?? initialTime;
      restart(getExpiryTimestamp(pausedSecondsRef.current), false);
    }
  }, [initialTime, restart]);

  const endTurn = useCallback(() => {
    startTimeRef.current = null;
    startSecondsRef.current = 0;
    pausedSecondsRef.current = null;
    restart(new Date(), false);
  }, [restart]);

  // 谿九ｊ譎る俣繧貞､夜Κ縺九ｉ險ｭ螳夲ｼ医し繝ｼ繝舌・蜷梧悄逕ｨ・・
  const setRemainingTime = useCallback(
    (seconds: number) => {
      const clampedSeconds = Math.max(0, seconds);
      startTimeRef.current = Date.now();
      startSecondsRef.current = clampedSeconds;
      pausedSecondsRef.current = clampedSeconds;
      restart(getExpiryTimestamp(clampedSeconds), isRunning);
    },
    [restart, isRunning]
  );

  // 謖・ｮ壹＠縺滓凾髢薙〒繧ｿ繧､繝槭・繧偵Μ繧ｻ繝・ヨ・・urnChange逕ｨ・・
  const resetWithDuration = useCallback(
    (seconds: number) => {
      startTimeRef.current = null;
      startSecondsRef.current = seconds;
      pausedSecondsRef.current = seconds;
      restart(getExpiryTimestamp(seconds), false);
    },
    [restart]
  );

  const value: TimerContextType = {
    totalSeconds,
    maxTime: initialTime,
    isRunning,
    pauseTimer,
    resumeTimer,
    resetTimer,
    endTurn,
    setRemainingTime,
    resetWithDuration,
    setOnExpire,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};
