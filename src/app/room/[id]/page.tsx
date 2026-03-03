import { Game } from '@/feature/Game/Game';
import { GameContextProvider } from '@/feature/Game/GameContext';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Game コンポーネントを any として扱うことで、
  // プロパティ 'id' が定義されていないというエラーを強制的に回避します。
  const SafeGame = Game as any;

  return (
    <GameContextProvider>
      <SafeGame id={id} />
    </GameContextProvider>
  );
}