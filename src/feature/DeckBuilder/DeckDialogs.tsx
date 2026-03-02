'use client';

import { useDeck } from '@/hooks/deck';
import { useState } from 'react';

interface DeckSaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, isMainDeck: boolean) => void;
  deck: string[];
  jokers?: string[];
}

export const DeckSaveDialog = ({
  isOpen,
  onClose,
  onSave,
  deck,
  jokers = [],
}: DeckSaveDialogProps) => {
  const { decks, saveDeck, refreshDecks } = useDeck();
  const [title, setTitle] = useState('');
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [saveMode, setSaveMode] = useState<'new' | 'overwrite'>('new');
  const [isMainDeck, setIsMainDeck] = useState(false);

  // 繝・ャ繧ｭ繧ｳ繝斐・繝ｻ繧､繝ｳ繝昴・繝育畑
  const [copyFeedback, setCopyFeedback] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  const handleClose = () => {
    // Reset states when closing
    setTitle('');
    setSelectedDeck(null);
    setSaveMode('new');
    setIsMainDeck(false);
    onClose();
  };

  const handleSave = () => {
    const finalTitle = saveMode === 'new' ? title : selectedDeck!;
    if (!finalTitle.trim()) {
      alert('繝・ャ繧ｭ縺ｮ繧ｿ繧､繝医Ν繧貞・蜉帙＠縺ｦ縺上□縺輔＞縲・);
      return;
    }

    onSave(finalTitle, isMainDeck);
    handleClose();
  };

  const handleDeckSelect = (deckTitle: string) => {
    setSelectedDeck(deckTitle);
    setSaveMode('overwrite');
  };

  const handleImport = async () => {
    setImportError('');
    setImportSuccess('');

    // JSON繝代・繧ｹ
    let obj: { cards?: unknown; jokers?: unknown };
    try {
      obj = JSON.parse(importText);
    } catch {
      setImportError('JSON縺ｮ繝代・繧ｹ縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
      return;
    }

    // 繝舌Μ繝・・繧ｷ繝ｧ繝ｳ
    if (!obj.cards || !Array.isArray(obj.cards)) {
      setImportError('cards驟榊・縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ');
      return;
    }
    if (!obj.cards.every((c: unknown) => typeof c === 'string')) {
      setImportError('cards縺ｯ譁・ｭ怜・驟榊・縺ｧ縺ゅｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・);
      return;
    }
    if (obj.cards.length !== 40) {
      setImportError('繝・ャ繧ｭ縺ｯ40譫壹〒縺ゅｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・);
      return;
    }

    // JOKER讀懆ｨｼ
    const importJokers = obj.jokers || [];
    if (!Array.isArray(importJokers)) {
      setImportError('jokers縺ｯ驟榊・縺ｧ縺ゅｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・);
      return;
    }
    if (!importJokers.every((j: unknown) => typeof j === 'string')) {
      setImportError('jokers縺ｯ譁・ｭ怜・驟榊・縺ｧ縺ゅｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・);
      return;
    }
    if (importJokers.length > 2) {
      setImportError('JOKER縺ｯ譛螟ｧ2譫壹∪縺ｧ縺ｧ縺・);
      return;
    }

    // 繧ｿ繧､繝医Ν蜈･蜉・
    const newTitle = prompt('繝・ャ繧ｭ蜷阪ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞');
    if (!newTitle || !newTitle.trim()) {
      setImportError('繝・ャ繧ｭ蜷阪′蠢・ｦ√〒縺・);
      return;
    }
    // 繧ｿ繧､繝医Ν驥崎､・メ繧ｧ繝・け
    if (decks.some(d => d.title === newTitle.trim())) {
      setImportError('蜷後§蜷榊燕縺ｮ繝・ャ繧ｭ縺梧里縺ｫ蟄伜惠縺励∪縺・);
      return;
    }

    // 菫晏ｭ・
    try {
      await saveDeck(newTitle.trim(), obj.cards as string[], importJokers as string[], false);
      setImportSuccess('繝・ャ繧ｭ繧剃ｽ懈・縺励∪縺励◆');
      await refreshDecks();
    } catch (error) {
      const message = error instanceof Error ? error.message : '繝・ャ繧ｭ縺ｮ菫晏ｭ倥↓螟ｱ謨励＠縺ｾ縺励◆';
      setImportError(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">繝・ャ繧ｭ繧剃ｿ晏ｭ・/h2>

        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              className={`px-3 py-1 rounded ${saveMode === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
              onClick={() => setSaveMode('new')}
            >
              譁ｰ隕丈ｽ懈・
            </button>
            <button
              className={`px-3 py-1 rounded ${saveMode === 'overwrite' ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
              onClick={() => setSaveMode('overwrite')}
              disabled={decks.length === 0}
            >
              荳頑嶌縺・
            </button>
          </div>

          {saveMode === 'new' ? (
            <div>
              <label className="block text-white mb-2">繝・ャ繧ｭ蜷・/label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="繝・ャ繧ｭ蜷阪ｒ蜈･蜉・
                autoFocus
              />
              <div className="mt-4">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={isMainDeck}
                    onChange={e => setIsMainDeck(e.target.checked)}
                  />
                  繝｡繧､繝ｳ縺ｮ繝・ャ繧ｭ縺ｫ縺吶ｋ
                </label>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-white mb-2">荳頑嶌縺阪☆繧九ョ繝・く繧帝∈謚・/label>
              <div className="max-h-60 overflow-y-auto bg-gray-700 rounded">
                {decks.map(deckItem => (
                  <div
                    key={deckItem.title}
                    className={`p-2 cursor-pointer hover:bg-gray-600 ${
                      selectedDeck === deckItem.title ? 'bg-blue-500' : ''
                    }`}
                    onClick={() => handleDeckSelect(deckItem.title)}
                  >
                    <span className="text-white">{deckItem.title}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={isMainDeck}
                    onChange={e => setIsMainDeck(e.target.checked)}
                  />
                  繝｡繧､繝ｳ縺ｮ繝・ャ繧ｭ縺ｫ縺吶ｋ
                </label>
              </div>
            </div>
          )}
        </div>

        {/* --- 繝・ャ繧ｭ蜀・ｮｹ繧ｳ繝斐・/繧､繝ｳ繝昴・繝域ｩ溯・ --- */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          {/* 繧ｳ繝斐・ */}
          <div className="mb-4">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={async () => {
                try {
                  const json = JSON.stringify({ cards: deck, jokers });
                  await navigator.clipboard.writeText(json);
                  setCopyFeedback('繝・ャ繧ｭ蜀・ｮｹ繧偵さ繝斐・縺励∪縺励◆');
                  setTimeout(() => setCopyFeedback(''), 2000);
                } catch {
                  setCopyFeedback('繧ｳ繝斐・縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
                  setTimeout(() => setCopyFeedback(''), 2000);
                }
              }}
            >
              繝・ャ繧ｭ蜀・ｮｹ繧偵さ繝斐・
            </button>
            {copyFeedback && <span className="ml-3 text-sm text-green-300">{copyFeedback}</span>}
          </div>
          {/* 繧､繝ｳ繝昴・繝・*/}
          <div>
            <button
              className="px-3 py-1 bg-purple-600 text-white rounded"
              onClick={() => {
                setShowImport(v => !v);
                setImportText('');
                setImportError('');
                setImportSuccess('');
              }}
            >
              繝・ャ繧ｭ蜀・ｮｹ縺九ｉ菴懈・
            </button>
          </div>
          {showImport && (
            <div className="mt-4 bg-gray-700 p-3 rounded">
              <label className="block text-white mb-2">繝・ャ繧ｭJSON繧定ｲｼ繧贋ｻ倥￠</label>
              <textarea
                className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                rows={4}
                value={importText}
                onChange={e => {
                  setImportText(e.target.value);
                  setImportError('');
                  setImportSuccess('');
                }}
                placeholder='{"cards": [...]}'
              />
              <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleImport}>
                繝・ャ繧ｭ菴懈・
              </button>
              {importError && <div className="text-red-400 mt-2">{importError}</div>}
              {importSuccess && <div className="text-green-300 mt-2">{importSuccess}</div>}
            </div>
          )}
        </div>
        {/* --- 譌｢蟄倥・菫晏ｭ・繧ｭ繝｣繝ｳ繧ｻ繝ｫ繝懊ち繝ｳ --- */}
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={handleClose}>
            繧ｭ繝｣繝ｳ繧ｻ繝ｫ
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-800 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={
              (saveMode === 'new' && !title.trim()) ||
              (saveMode === 'overwrite' && !selectedDeck) ||
              deck.length !== 40
            }
          >
            菫晏ｭ・
          </button>
        </div>
      </div>
    </div>
  );
};
