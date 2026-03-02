'use client';

import { NumberInput } from '@/component/interface/numberInput';
import { SettingsGroup } from '@/component/interface/settingsGroup';
import { Toggle } from '@/component/interface/toggle';
import { UseFormRegister } from 'react-hook-form';
import { RoomCreatorFormParams } from '../type';
import { DEFAULT_ROOM_SETTINGS } from '../../../constants/room';

interface CpSettingsProps {
  register: UseFormRegister<RoomCreatorFormParams>;
}

export const CpSettings: React.FC<CpSettingsProps> = ({ register }) => {
  return (
    <SettingsGroup title="CP設宁E>
      <NumberInput
        label="初期CP"
        description="ゲーム開始時のCP"
        min={0}
        max={10}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.cp.init}
        registration={register('rule.system.cp.init', { valueAsNumber: true })}
      />
      <NumberInput
        label="ターンごとのCP増加釁E
        description="ターン開始時に増加するCP (総増加釁E 初期値 + ラウンド数 ÁE増加釁E≦ 最大値)"
        min={0}
        max={5}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.cp.increase}
        registration={register('rule.system.cp.increase', { valueAsNumber: true })}
      />
      <NumberInput
        label="CP最大値"
        description="ターン開始時に増加するCPの最大値"
        min={1}
        max={20}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.cp.max}
        registration={register('rule.system.cp.max', { valueAsNumber: true })}
      />
      <NumberInput
        label="CP上限"
        description="ストック可能なCPの最大値"
        min={1}
        max={20}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.cp.ceil}
        registration={register('rule.system.cp.ceil', { valueAsNumber: true })}
      />
      <Toggle
        label="CPの持ち越し"
        description="未使用のCPを次のラウンドに持ち越せるよぁE��する"
        registration={register('rule.system.cp.carryover')}
        defaultChecked={DEFAULT_ROOM_SETTINGS.rule.system.cp.carryover}
      />
    </SettingsGroup>
  );
};
