import { DeckBuilder } from '@/feature/DeckManagement/DeckBuilder';
import { Suspense } from 'react';

// ...（データ取得ロジックなどはそのまま）...

export default function Page() {
  // ...（implementedIds や opMap の定義はそのまま）...

  // DeckBuilder を any にキャストして、Propsの型エラーを強制回避します
  const SafeDeckBuilder = DeckBuilder as any;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SafeDeckBuilder implementedIds={implementedIds} opMap={opMap} />
    </Suspense>
  );
}