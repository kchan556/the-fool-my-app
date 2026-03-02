'use client';

import { useDeck } from '@/hooks/deck';
import { useOriginalityMap } from '@/hooks/originality';
import { DeckColorBar } from '@/component/ui/DeckColorBar';
import { originality } from '@/helper/originality';
import Link from 'next/link';
import { useState } from 'react';
import { DeckData } from '@/type/deck';
import { DeckPreview } from '../DeckBuilder/DeckPreview';

// 蜿励￠蜿悶ｋ繝・・繧ｿ縺ｮ蠖｢繧貞ｮ夂ｾｩ
interface DeckManagementProps {
  userId: string;
}

// () 縺ｮ荳ｭ霄ｫ繧呈嶌縺肴鋤縺医※ userId 繧貞女縺大叙繧後ｋ繧医≧縺ｫ縺吶ｋ
export const DeckManagement = ({ userId }: DeckManagementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewDeck, setPreviewDeck] = useState<DeckData>();
  const { decks, mainDeck, setMainDeck, deleteDeck, setDeckPublic } = useDeck();
  const { opMap, isLoading: isOpLoading } = useOriginalityMap();

  const handleSetMainDeck = async (deckId: string) => {
    try {
      await setMainDeck(deckId);
    } catch (error) {
      console.error('繝｡繧､繝ｳ繝・ャ繧ｭ險ｭ螳壹お繝ｩ繝ｼ:', error);
      alert('繝｡繧､繝ｳ繝・ャ繧ｭ縺ｮ險ｭ螳壹↓螟ｱ謨励＠縺ｾ縺励◆');
    }
  };

  const handleDeleteDeck = async (deckId: string, deckTitle: string) => {
    if (!confirm(`縲・{deckTitle}縲阪ｒ蜑企勁縺励※繧ゅｈ繧阪＠縺・〒縺吶°・歔)) return;
    try {
      await deleteDeck(deckId);
    } catch (error) {
      console.error('繝・ャ繧ｭ蜑企勁繧ｨ繝ｩ繝ｼ:', error);
      alert('繝・ャ繧ｭ縺ｮ蜑企勁縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
    }
  };

  const handleTogglePublic = async (deckId: string, currentIsPublic: boolean) => {
    try {
      await setDeckPublic(deckId, !currentIsPublic);
    } catch (error) {
      console.error('蜈ｬ髢狗憾諷句・繧頑崛縺医お繝ｩ繝ｼ:', error);
      alert('蜈ｬ髢狗憾諷九・蛻・ｊ譖ｿ縺医↓螟ｱ謨励＠縺ｾ縺励◆');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">繝・ャ繧ｭ邂｡逅・/h1>
      <div className="border rounded border-green-500 bg-green-900 my-2 p-2 text-xs">
        <p>
          繧ｫ繝ｩ繝ｼ繝舌・繧偵け繝ｪ繝・け縺吶ｋ縺ｨ繝・ャ繧ｭ繧偵・繝ｬ繝薙Η繝ｼ縺ｧ縺阪∪縺・
          <br />
          繝・ャ繧ｭ縺ｮ繧ｿ繧､繝医Ν繧偵け繝ｪ繝・け縺吶ｋ縺ｨ繝・ャ繧ｭ縺ｮ繝壹・繧ｸ縺碁幕縺阪∪縺・
          <br />
          蜈ｬ髢倶ｸｭ縺ｮ繝・ャ繧ｭ縺ｮURL繧剃ｻ悶・莠ｺ縺ｫ蜈ｱ譛峨☆繧九→縲∽ｻ悶・莠ｺ縺後ョ繝・く繧定・逕ｱ縺ｫ菫晏ｭ倥〒縺阪ｋ繧医≧縺ｫ縺ｪ繧翫∪縺・
        </p>
      </div>

      <div className="mb-4">
        <Link
          href="/builder"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          繝・ャ繧ｭ繧剃ｽ懈・
        </Link>
      </div>

      {decks.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400">菫晏ｭ倥＆繧後◆繝・ャ繧ｭ縺後≠繧翫∪縺帙ｓ</p>
          <p className="text-gray-500 text-sm mt-2">繝・ャ繧ｭ繝薙Ν繝繝ｼ縺ｧ繝・ャ繧ｭ繧剃ｽ懈・縺励※縺上□縺輔＞縲・/p>
        </div>
      ) : (
        <div className="space-y-3">
          {decks.map(deck => {
            const isMain = mainDeck?.id === deck.id;
            return (
              <div
                key={deck.id}
                className={`p-4 rounded-lg border ${
                  isMain ? 'bg-blue-900/40 border-blue-500' : 'bg-gray-800 border-gray-700'
                }`}
              >
                {/* 繧ｿ繧､繝医Ν繝ｻ繝｡繧ｿ諠・ｱ: 繧ｯ繝ｪ繝・け縺ｧ繝・ャ繧ｭ隧ｳ邏ｰ繝壹・繧ｸ縺ｸ驕ｷ遘ｻ */}
                <Link
                  href={`/deck/${deck.id}`}
                  className="block cursor-pointer hover:opacity-80 transition-opacity mb-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{deck.title}</span>
                      {isMain && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                          繝｡繧､繝ｳ繝・ャ繧ｭ
                        </span>
                      )}
                      {deck.is_public && (
                        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                          蜈ｬ髢倶ｸｭ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {(deck.jokers?.length ?? 0) < 2 && (
                        <span className="text-red-400">JOKER縺ｪ縺・/span>
                      )}
                      <span className="text-gray-400">
                        {isOpLoading
                          ? '...'
                          : originality([...deck.cards, ...(deck.jokers ?? [])], opMap)}
                        P
                      </span>
                      <span className="text-gray-400">{deck.cards.length}譫・/span>
                    </div>
                  </div>
                </Link>

                {/* 繧ｫ繝ｩ繝ｼ繝舌・: 繧ｯ繝ｪ繝・け縺ｧ繝｢繝ｼ繝繝ｫ繝励Ξ繝薙Η繝ｼ陦ｨ遉ｺ */}
                <button
                  onClick={() => {
                    setPreviewDeck(deck);
                    setIsOpen(true);
                  }}
                  className="w-full cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <DeckColorBar cards={deck.cards} />
                </button>

                {/* 繧｢繧ｯ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ鄒､ */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleTogglePublic(deck.id, deck.is_public ?? false)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      deck.is_public
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                  >
                    {deck.is_public ? '蜈ｬ髢倶ｸｭ' : '髱槫・髢・}
                  </button>
                  <button
                    onClick={() => handleDeleteDeck(deck.id, deck.title)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    蜑企勁
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isOpen && previewDeck && <DeckPreview deck={previewDeck} onClose={() => setIsOpen(false)} />}
    </div>
  );
};
