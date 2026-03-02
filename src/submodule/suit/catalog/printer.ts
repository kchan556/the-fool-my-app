import { writeFile } from 'fs/promises';

// catalog.json 生成

const base = 'https://coj.sega.jp/player/card/data/card_list_';
const pages = [
  'Ver.2.3EX2.json',
  'Ver.2.3EX1.json',
  'Ver.2.3.json',
  'Ver.2.2EX.json',
  'Ver.2.2.json',
  'Ver.2.1EX.json',
  'Ver.2.1.json',
  'Ver.2.0EX3.json',
  'Ver.2.0EX2.json',
  'Ver.2.0EX1.json',
  'Ver.2.0.json',
  'Ver.1.4EX3.json',
  'Ver.1.4EX2.json',
  'Ver.1.4EX1.json',
  'Ver.1.4.json',
  'Ver.1.3EX2.json',
  'Ver.1.3EX1.json',
  'Ver.1.3.json',
  'Ver.1.2EX.json',
  'Ver.1.2.json',
  'Classic.json',
  'Sp.json',
  "Virus.json",
  "Interceptunit.json",
  'PR.json',
];

interface Joker {
  abilities: JokerAbility[];
  charName: string;
  jokerName: string;
  jokerLImg: string;
  jokerSImg: string;
}
interface JokerAbility {
  abilityText: string;
  cp: number;
  customImg: string;
  gaugeSpeed: '小' | '中' | '大' | '特大';
  name: string;
  op: number;
}

interface JokerResponse {
  joker: Joker[]
}

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cards: any[] = [];
  for await (const url of pages) {
    const response = await fetch(`${base}${url}`);
    // unknownだけど絶対Cardが返るはず
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { card: _cards } = await response.json() as any;
    cards = [...cards, ..._cards];
  }

  const jkResponse = await fetch(`${base}joker.json`);
  const jkResult = await jkResponse.json() as JokerResponse;
  const jkMaster = jkResult.joker.map(joker => {
    return joker.abilities.map(card => {
      return ({
        id: card.name,
        name: joker.jokerName,
        type: 'joker',
        cost: card.cp,
        ability: `■${card.name}\n${card.abilityText}`,
        originality: card.op,
        img: joker.jokerLImg.replace('../img', ''),
        info: {
          version: 0,
          number: 0,
        },
        gauge: card.gaugeSpeed,
      })
    })
  }).flat()

  // 当システムにおけるデータ形式に変換
  const json =
    JSON.stringify([
      ...cards
        .map(card => {
          const species = [card.species, card.species2].filter(v => v !== '-' && v.length > 0);
          const bp = [card.bp1, card.bp2, card.bp3].filter(v => v > 0);
          return {
            id: card.viewNo.length > 0 ? card.viewNo : card.name,
            name: card.name,
            rarity: card.rarity,
            type: card.type,
            color: card.cId,
            species: species.length ? species : undefined,
            cost: card.cp,
            bp: bp.length ? bp : undefined,
            ability: card.ability
              .replace(/<br>/g, '\n')
              .replace(/[Ａ-Ｚａ-ｚ０-９％＋－]/g, (s: string) =>
                String.fromCharCode(s.charCodeAt(0) - 0xfee0)
              )
              .trim(),
            originality: card.op,
            img: card.lImg.replace('../img', ''),
            info: {
              version: card.ver,
              number: card.no,
            },
          };
        })
        .sort((a, b) => a.info.version - b.info.version),
      ...jkMaster,
    ])

  // catalog.json に書き出し
  await writeFile('catalog.json', json, 'utf8');
}

main();
