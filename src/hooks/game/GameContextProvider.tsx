'use client';

import { ReactNode, useEffect } from 'react';
import { CardsDialogProvider } from '../cards-dialog';
import { CardEffectDialogProvider } from '../card-effect-dialog';
import { CardUsageEffectProvider } from '../card-usage-effect';
import { InterceptUsageProvider } from '../intercept-usage';
import { TimerProvider } from '@/feature/Timer/context';
import { UnitSelectionProvider } from '../unit-selection';
import { ChoicePanelProvider } from '@/feature/ChoicePanel/context';
import { MulliganProvider } from '../mulligan/context';
import { AnimationProvider } from '../animation';
import { SelectEffectProvider } from '../select-effect';
import { OverclockEffectProvider } from '../overclock-effect';
import { StatusChangeProvider } from '../status-change';
import { UnitPositionProvider } from '../unit-position';
import { TurnChangeEffectProvider } from '../turn-change-effect';
import { SoundManagerV2Provider } from '../soundV2';
import { AttackAnimationProvider } from '../attack-animation';
import { useErrorOverlay } from '../error-overlay';
import { GameResultProvider } from '../game-result';

interface Props {
  children: ReactNode;
}

// ゲーム開始時にエラーオーバ�Eレイをクリアするコンポ�EネンチE
const ErrorClearer = ({ children }: { children: ReactNode }) => {
  const { hideOverlay } = useErrorOverlay();

  useEffect(() => {
    // ゲーム開始時にエラーをクリア�E��Eウント時のみ実行！E
    hideOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export const GameContextProvider = ({ children }: Props) => {
  return (
    <ErrorClearer>
      <SoundManagerV2Provider>
        <AttackAnimationProvider>
          <CardsDialogProvider>
            <CardEffectDialogProvider>
              <CardUsageEffectProvider>
                <InterceptUsageProvider>
                  <TimerProvider>
                    <ChoicePanelProvider>
                      <MulliganProvider>
                        <UnitSelectionProvider>
                          <AnimationProvider>
                            <SelectEffectProvider>
                              <OverclockEffectProvider>
                                <StatusChangeProvider>
                                  <UnitPositionProvider>
                                    <TurnChangeEffectProvider>
                                      <GameResultProvider>{children}</GameResultProvider>
                                    </TurnChangeEffectProvider>
                                  </UnitPositionProvider>
                                </StatusChangeProvider>
                              </OverclockEffectProvider>
                            </SelectEffectProvider>
                          </AnimationProvider>
                        </UnitSelectionProvider>
                      </MulliganProvider>
                    </ChoicePanelProvider>
                  </TimerProvider>
                </InterceptUsageProvider>
              </CardUsageEffectProvider>
            </CardEffectDialogProvider>
          </CardsDialogProvider>
        </AttackAnimationProvider>
      </SoundManagerV2Provider>
    </ErrorClearer>
  );
};
