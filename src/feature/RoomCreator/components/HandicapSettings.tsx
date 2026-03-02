'use client';

import { SettingsGroup } from '@/component/interface/settingsGroup';
import { Toggle } from '@/component/interface/toggle';
import { UseFormRegister } from 'react-hook-form';
import { RoomCreatorFormParams } from '../type';
import { DEFAULT_ROOM_SETTINGS } from '../../../constants/room';

interface HandicapSettingsProps {
  register: UseFormRegister<RoomCreatorFormParams>;
}

export const HandicapSettings: React.FC<HandicapSettingsProps> = ({ register }) => {
  return (
    <SettingsGroup title="ハンチE��キャチE�E設宁E>
      <Toggle
        label="先攻1ターン目のドローを無効にする"
        registration={register('rule.system.handicap.draw')}
        defaultChecked={DEFAULT_ROOM_SETTINGS.rule.system.handicap.draw}
      />
      <Toggle
        label="先攻1ターン目の攻撁E��禁止する"
        registration={register('rule.system.handicap.attack')}
        defaultChecked={DEFAULT_ROOM_SETTINGS.rule.system.handicap.attack}
      />
      <Toggle
        label="先攻1ターン目のCP増加を無効にする"
        registration={register('rule.system.handicap.cp')}
        defaultChecked={DEFAULT_ROOM_SETTINGS.rule.system.handicap.cp}
      />
    </SettingsGroup>
  );
};
