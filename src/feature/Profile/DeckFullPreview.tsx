'use client';

import { useCallback, useState } from 'react';
import { DeckPreview } from '@/feature/DeckBuilder/DeckPreview';
import { RichButton } from '@/component/ui/RichButton';
import { useDeck } from '@/hooks/deck';
import { DeckColorBar } from '@/component/ui/DeckColorBar';

interface Deck {
  cards: string[];
  jokers: string[];
}

export function DeckFullPreview({ deck, isOwns }: { deck: Deck; isOwns?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const { saveDeck, decks } = useDeck();
  const handleSaveDeck = useCallback(() => {
    const deckName = prompt('繝・ャ繧ｭ蜷阪ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞');

    if (!deckName || !deckName.trim()) {
      alert('繝・ャ繧ｭ蜷阪′蠢・ｦ√〒縺・);
      return;
    }

    // 繧ｿ繧､繝医Ν驥崎､・メ繧ｧ繝・け
    if (decks.some(d => d.title === deckName.trim())) {
      alert('蜷後§蜷榊燕縺ｮ繝・ャ繧ｭ縺梧里縺ｫ蟄伜惠縺励∪縺・);
      return;
    }

    // 菫晏ｭ・
    saveDeck(deckName.trim(), deck.cards, deck.jokers, false)
      .then(() => alert('菫晏ｭ倥＠縺ｾ縺励◆'))
      .catch(() => alert('菫晏ｭ倥↓螟ｱ謨励＠縺ｾ縺励◆'));
  }, [saveDeck, decks, deck.cards, deck.jokers]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full cursor-pointer hover:opacity-80 transition-opacity"
      >
        <DeckColorBar cards={deck.cards} />
      </button>
      {isOpen && (
        <DeckPreview deck={deck} onClose={() => setIsOpen(false)}>
          {!isOwns ? (
            <RichButton colorScheme="blue" onClick={handleSaveDeck}>
              閾ｪ蛻・・繝・ャ繧ｭ縺ｫ菫晏ｭ倥☆繧・
            </RichButton>
          ) : null}
        </DeckPreview>
      )}
    </>
  );
}
