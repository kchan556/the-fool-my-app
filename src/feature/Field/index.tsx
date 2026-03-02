import { UnitView } from '@/component/ui/UnitView';
import { useGameStore } from '@/hooks/game';
import { useUnitSelection } from '@/hooks/unit-selection';

interface FieldProps {
  playerId: string;
  isOwnField?: boolean;
}

export const Field = ({ playerId, isOwnField = false }: FieldProps) => {
  const units = useGameStore(state => state.players?.[playerId]?.field);
  const { activeUnit, setActiveUnit } = useUnitSelection();

  return (
    <div className="relative flex justify-center items-center gap-4 h-42">
      {/* 画面カバ�E: ボタン表示中のみ有効 */}
      {activeUnit && (
        <div
          className="absolute inset-0 z-19"
          style={{ background: 'transparent', pointerEvents: 'auto' }}
          onClick={() => setActiveUnit(undefined)}
        />
      )}
      {(isOwnField ? [...(units ?? [])].reverse() : (units ?? [])).map(unit => (
        <UnitView unit={unit} key={unit.id} isOwnUnit={isOwnField} />
      ))}
    </div>
  );
};
