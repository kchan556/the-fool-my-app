'use client';

import { useState, useEffect } from 'react';
import { defaultUIColors } from '@/helper/color';
import { useWebSocketGame } from '@/hooks/game';
import { useSoundV2 } from '@/hooks/soundV2/hooks';
import { useSystemContext } from '@/hooks/system/hooks';
import { useAttackAnimation } from '@/hooks/attack-animation';
import { useUnitSelection } from '@/hooks/unit-selection';
import { useSelectEffect } from '@/hooks/select-effect';
import { useOverclockEffect } from '@/hooks/overclock-effect';
import { useStatusChange } from '@/hooks/status-change';
import { useSelfId } from '@/hooks/player-identity';
import { Button } from '../interface/button';
import master from '@/submodule/suit/catalog/catalog';

export const DebugDialog = () => {
  const { send } = useWebSocketGame();
  const { play, setVolume, getVolume, bgm, stopBgm, isPlaying } = useSoundV2();
  const { cursorCollisionSize, setCursorCollisionSize, setOperable } = useSystemContext();
  const { state: attackState, proceedToPreparation } = useAttackAnimation();
  const { setAnimationUnit } = useUnitSelection(); 
  const { addTargetUnit } = useSelectEffect(); 
  const { addOverclockUnit, removeOverclockUnit } = useOverclockEffect(); 
  const { addStatusChange } = useStatusChange(); 
  const selfId = useSelfId();
  const [bgmVolume, setBgmVolume] = useState(getVolume());
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const [hide, setHide] = useState(false);
  const [targetX, setTargetX] = useState('0');
  const [targetY, setTargetY] = useState('0');

  // BGMの再生状態を定期的にチェック
  useEffect(() => {
    const checkBgmStatus = () => {
      const playing = isPlaying();
      setIsBgmPlaying(playing);
    };

    checkBgmStatus();
    const intervalId = setInterval(checkBgmStatus, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const [debugDriveId, setDebugDriveId] = useState('');
  const [debugMakeId, setDebugMakeId] = useState('');

  const handleDrawButtonClick = () => {
    play('draw');
    send({
      action: {
        handler: 'core',
        type: 'debug',
      },
      payload: {
        type: 'DebugDraw',
        player: selfId,
      },
    });
  };

  const handleDebugDriveButtonClick = () => {
    const card =
      master.get(debugDriveId) ||
      master.values().find(catalog => catalog.name.includes(debugDriveId));
    if (card) {
      debugDrive(card.id);
    }
  };

  const debugDrive = (targetUnitId: string) => {
    send({
      action: {
        handler: 'core',
        type: 'debug',
      },
      payload: {
        type: 'DebugDrive',
        player: selfId,
        catalogId: targetUnitId,
      },
    });
  };

  const handleDebugMakeButtonClick = () => {
    const card =
      master.get(debugMakeId) ||
      master.values().find(catalog => catalog.name.includes(debugMakeId));
    if (card) {
      debugMake(card.id);
    }
  };

  const debugMake = (targetCardId: string) => {
    send({
      action: {
        handler: 'core',
        type: 'debug',
      },
      payload: {
        type: 'DebugMake',
        player: selfId,
        catalogId: targetCardId,
      },
    });
  };

  const increaseCursorSize = () => {
    setCursorCollisionSize(prev => Math.min(prev + 2, 20));
  };

  const decreaseCursorSize = () => {
    setCursorCollisionSize(prev => Math.max(prev - 2, 1));
  };

  const increaseVolume = () => {
    const newVolume = Math.min(bgmVolume + 0.1, 1);
    setBgmVolume(newVolume);
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(bgmVolume - 0.1, 0);
    setBgmVolume(newVolume);
    setVolume(newVolume);
  };

  const toggleBgm = async () => {
    if (isBgmPlaying) {
      stopBgm();
      setIsBgmPlaying(false);
    } else {
      await bgm();
      setIsBgmPlaying(true);
    }
    setHide(false); // UIが消えないように修正
  };

  return (
    !hide && (
      <div
        className={`absolute top-4 left-4 z-50 p-3 rounded-lg shadow-lg ${defaultUIColors.playerInfoBackground} border ${defaultUIColors.border}`}
      >
        <div className="flex flex-col">
          <div className={`text-sm font-bold mb-2 ${defaultUIColors.text.primary}`}>
            Debug Console
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={debugDriveId}
                onChange={e => setDebugDriveId(e.target.value)}
                className="w-32 px-2 py-1 bg-slate-700 rounded text-white"
                placeholder="IDかカード名を入力…"
              />
              <button
                onClick={handleDebugDriveButtonClick}
                className={`px-3 py-1 rounded ${defaultUIColors.border} bg-blue-600 hover:bg-blue-500 transition-colors`}
              >
                DebugDrive送信
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={debugMakeId}
                onChange={e => setDebugMakeId(e.target.value)}
                className="w-32 px-2 py-1 bg-slate-700 rounded text-white"
                placeholder="IDかカード名を入力…"
              />
              <button
                onClick={handleDebugMakeButtonClick}
                className={`px-3 py-1 rounded ${defaultUIColors.border} bg-purple-600 hover:bg-purple-500 transition-colors`}
              >
                DebugMake送信
              </button>
            </div>
            
            <details>
              <summary className="cursor-pointer text-xs text-gray-400">ユニット召喚ショートカット</summary>
              <div
                className={`flex flex-col justify-center border-t ${defaultUIColors.border} pt-2 mt-2 gap-1`}
              >
                <p className="text-center font-bold">汎用ユニット召喚</p>
                <div className={`flex flex-col border-t ${defaultUIColors.border} pt-1`}>
                  <p className="text-center text-xs">特殊召喚</p>
                  <div className="flex gap-2">
                    <Button className="bg-green-500 w-1/2" onClick={() => debugDrive('2-0-324')}>
                      デッキから
                    </Button>
                    <Button className="w-1/2" onClick={() => debugDrive('2-1-115')}>
                      捨札から
                    </Button>
                  </div>
                </div>
                <div className={`flex flex-col border-t ${defaultUIColors.border} pt-1`}>
                  <p className="text-center text-xs">基本BP</p>
                  <div className="flex gap-2">
                    <Button className="bg-green-500 w-1/2" onClick={() => debugDrive('2-0-119')}>
                      下げる
                    </Button>
                    <Button className="w-1/2" onClick={() => debugDrive('2-3-018')}>
                      上げる
                    </Button>
                  </div>
                </div>
              </div>
            </details>

            <button
              onClick={handleDrawButtonClick}
              className={`px-3 py-1 rounded ${defaultUIColors.border} bg-slate-600 hover:bg-slate-500 transition-colors`}
            >
              Draw
            </button>
            <button
              onClick={() => setOperable(true)}
              className={`px-3 py-1 rounded ${defaultUIColors.border} bg-slate-600 hover:bg-slate-500 transition-colors`}
            >
              操作権を得る
            </button>

            <details>
              <summary className="cursor-pointer text-xs text-gray-400">UI・アニメ調整</summary>
              <div className="mt-2 border-t pt-2 border-gray-700">
                <div className="text-sm mb-1">カーソル判定サイズ: {cursorCollisionSize}px</div>
                <div className="flex gap-2">
                  <button onClick={decreaseCursorSize} className="px-3 py-1 bg-slate-600 rounded">-</button>
                  <button onClick={increaseCursorSize} className="px-3 py-1 bg-slate-600 rounded">+</button>
                </div>
                
                <div className="mt-2 border-t pt-2 border-gray-700">
                  <div className="text-sm mb-1">アタックアニメ: {attackState.phase}</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className="text-xs">座標(X,Y):</label>
                      <input type="number" value={targetX} onChange={e => setTargetX(e.target.value)} className="w-12 bg-slate-700 text-white px-1" />
                      <input type="number" value={targetY} onChange={e => setTargetY(e.target.value)} className="w-12 bg-slate-700 text-white px-1" />
                    </div>
                    {attackState.phase === 'declaration' && (
                      <button onClick={() => proceedToPreparation({ x: Number(targetX), y: Number(targetY) })} className="bg-green-600 px-2 py-1 rounded">
                        続行
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2 border-t pt-2 border-gray-700">
                  <div className="text-sm mb-1">エフェクトデバッグ</div>
                  <input id="animationUnitId" type="text" placeholder="Unit ID" className="w-full bg-slate-700 mb-2 px-2 py-1" />
                  <div className="flex flex-wrap gap-1">
                    <button onClick={() => {
                      const id = (document.getElementById('animationUnitId') as HTMLInputElement).value;
                      if(id) setAnimationUnit(id);
                    }} className="bg-gray-600 px-2 py-1 text-xs rounded">既存</button>
                    <button onClick={() => {
                      const id = (document.getElementById('animationUnitId') as HTMLInputElement).value;
                      if(id) addTargetUnit(id);
                    }} className="bg-blue-600 px-2 py-1 text-xs rounded">選択</button>
                    <button onClick={() => {
                      const id = (document.getElementById('animationUnitId') as HTMLInputElement).value;
                      if(!id) return;
                      addOverclockUnit(id);
                      setTimeout(() => removeOverclockUnit(id), 5000);
                    }} className="bg-yellow-600 px-2 py-1 text-xs rounded">OC表現</button>
                    <button onClick={() => {
                      const id = (document.getElementById('animationUnitId') as HTMLInputElement).value;
                      if(!id) return;
                      addStatusChange({ unitId: id, changes: [{ type: 'level', value: 1 }] });
                    }} className="bg-green-600 px-2 py-1 text-xs rounded">ステータス変化</button>
                  </div>
                </div>
              </div>
            </details>

            <div className="mt-2 border-t pt-2 border-gray-700">
              <div className="text-sm mb-1">BGM: {Math.round(bgmVolume * 100)}%</div>
              <div className="flex gap-2">
                <button onClick={decreaseVolume} className="px-3 py-1 bg-slate-600 rounded">-</button>
                <button onClick={increaseVolume} className="px-3 py-1 bg-slate-600 rounded">+</button>
                <button onClick={toggleBgm} className={`px-3 py-1 rounded ${isBgmPlaying ? 'bg-red-600' : '