import { useWebSocket } from '@/hooks/websocket/hooks';
import { useSelfId } from '@/hooks/player-identity';
import { Message, RoomOpenRequestPayload, RoomOpenResponsePayload } from '@/submodule/suit/types';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback } from 'react';

// ドット区切りのキーをネストされたオブジェクトに変換する関数
const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const lastObj = keys.reduce((o, key) => (o[key] = o[key] || {}), obj);
  lastObj[lastKey] = value;
};

export const useRoomCreator = () => {
  const { websocket } = useWebSocket();
  const router = useRouter();
  const selfId = useSelfId();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      if (websocket == null) return;
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const rawValues = Object.fromEntries(formData);
      
      // 1. サーバーが送れと言っている「正しい階層構造」をゼロから作る
      const payload: any = {
        type: 'RoomOpenRequest',
        requestId: selfId,
        name: rawValues.name || 'Room',
        rule: {}
      };

      // 2. ドット繋ぎのデータを正しい位置に流し込む
      Object.keys(rawValues).forEach(key => {
        if (key === 'name') return;
        let value: any = rawValues[key];
        if (value === 'on') value = true;
        if (value === 'off') value = false;
        if (!isNaN(Number(value)) && typeof value !== 'boolean') value = Number(value);
        
        setNestedValue(payload, key, value);
      });

      console.log('--- 修正済み送信データ ---', payload);

      try {
        const response = await websocket.request<RoomOpenRequestPayload, RoomOpenResponsePayload>({
          action: { handler: 'server', type: 'open' },
          payload: payload,
        } satisfies Message<RoomOpenRequestPayload>);

        router.push(`/room/${response.payload.roomId}`);
      } catch (error) {
        console.error('作成失敗:', error);
        alert('作成失敗。コンソールを確認してください。');
      }
    },
    [router, websocket, selfId]
  );

  return { handleSubmit };
};