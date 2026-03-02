'use client';

import { NumberInput } from '@/component/interface/numberInput';
import { SettingsGroup } from '@/component/interface/settingsGroup';
import { UseFormRegister } from 'react-hook-form';
import { RoomCreatorFormParams } from '../type';
import { DEFAULT_ROOM_SETTINGS } from '../../../constants/room';

interface DrawSettingsProps {
  register: UseFormRegister<RoomCreatorFormParams>;
}

export const DrawSettings: React.FC<DrawSettingsProps> = ({ register }) => {
  return (
    <SettingsGroup title="ドロー設宁E>
      <NumberInput
        label="ターン開始時のドロー枚数"
        min={1}
        max={5}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.draw.top}
        registration={register('rule.system.draw.top', { valueAsNumber: true })}
      />
      <NumberInput
        label="オーバ�EライチE
        description="オーバ�Eライドした際のドロー枚数"
        min={0}
        max={5}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.draw.override}
        registration={register('rule.system.draw.override', { valueAsNumber: true })}
      />
      <NumberInput
        label="マリガン枚数"
        min={0}
        max={10}
        defaultValue={DEFAULT_ROOM_SETTINGS.rule.system.draw.mulligan}
        registration={register('rule.system.draw.mulligan', { valueAsNumber: true })}
      />
    </SettingsGroup>
  );
};
