'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  tooltipId?: string;
  registration: UseFormRegisterReturn;
  className?: string;
  defaultChecked?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  tooltipId,
  registration,
  className,
  defaultChecked,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  // 蜈・・onChange繝上Φ繝峨Λ繧剃ｿ晏ｭ・
  const originalOnChange = registration.onChange;

  // 譁ｰ縺励＞registration繧ｪ繝悶ず繧ｧ繧ｯ繝医ｒ菴懈・
  const modifiedRegistration = {
    ...registration,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      // 蜈・・onChange繧ょ他縺ｳ蜃ｺ縺・
      if (originalOnChange) {
        originalOnChange(e);
      }
    },
  };
  return (
    <div className={`mb-3 ${className || ''}`}>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && (
          <span
            className="text-xs text-gray-500 mb-2"
            {...(tooltipId ? { 'data-tooltip-id': tooltipId } : {})}
          >
            {description}
          </span>
        )}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600"
            defaultChecked={defaultChecked}
            {...modifiedRegistration}
          />
          <span className="ml-2 text-sm text-gray-500">{isChecked ? '譛牙柑' : '辟｡蜉ｹ'}</span>
        </label>
      </div>
    </div>
  );
};
