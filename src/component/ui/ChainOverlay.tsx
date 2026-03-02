import React from 'react';

interface ChainOverlayProps {
  isSmall?: boolean;
}

/**
 * 繧ｫ繝ｼ繝我ｸ翫↓2譛ｬ縺ｮ蟇ｾ隗堤ｷ壹メ繧ｧ繝ｼ繝ｳ・亥屁隗偵＞霈ｪ縺ｮ騾｣縺ｪ繧奇ｼ峨→荳ｭ螟ｮ縺ｮ襍､縺・ｼｪ繧呈緒逕ｻ縺吶ｋ繧ｪ繝ｼ繝舌・繝ｬ繧､
 */
export const ChainOverlay: React.FC<ChainOverlayProps> = ({ isSmall = false }) => {
  // 繧ｫ繝ｼ繝峨し繧､繧ｺ
  const cardWidth = isSmall ? 76 : 112;
  const cardHeight = isSmall ? 104 : 156;

  // 繝√ぉ繝ｼ繝ｳ縺ｮ霈ｪ・亥屁隗貞ｽ｢・峨・謨ｰ
  const numLinks = isSmall ? 15 : 20;
  // 蝗幄ｧ貞ｽ｢縺ｮ繧ｵ繧､繧ｺ
  const linkSize = isSmall ? 6 : 7;
  // 蝗幄ｧ貞ｽ｢縺ｮ隗剃ｸｸ
  const linkRadius = linkSize * 0.25;

  // 繝√ぉ繝ｼ繝ｳ縺ｮ濶ｲ
  const linkColor = '#ff0000';
  const linkBorder = '#990000';

  // 荳ｭ螟ｮ縺ｮ霈ｪ
  const ringRadius = isSmall ? 11 : 16;
  const ringStroke = isSmall ? 2 : 4;
  const ringColor = '#ff0000';

  // 蟇ｾ隗堤ｷ壻ｸ翫・蝗幄ｧ貞ｽ｢蠎ｧ讓吶ｒ險育ｮ・
  // leftTopToRightBottom: 蟾ｦ荳岩・蜿ｳ荳・ rightTopToLeftBottom: 蜿ｳ荳岩・蟾ｦ荳・
  const getDiagonalPositions = (direction: 'leftTopToRightBottom' | 'rightTopToLeftBottom') => {
    return Array.from({ length: numLinks }).map((_, i) => {
      const t = i / (numLinks - 1);
      if (direction === 'leftTopToRightBottom') {
        // 蟾ｦ荳岩・蜿ｳ荳・
        return {
          x: t * cardWidth,
          y: t * cardHeight,
        };
      } else {
        // 蜿ｳ荳岩・蟾ｦ荳・
        return {
          x: (1 - t) * cardWidth,
          y: t * cardHeight,
        };
      }
    });
  };

  // 2譛ｬ縺ｮ蟇ｾ隗堤ｷ夲ｼ医ヰ繝・魂: 蟾ｦ荳岩・蜿ｳ荳・ 蜿ｳ荳岩・蟾ｦ荳具ｼ・
  const diagonal1 = getDiagonalPositions('leftTopToRightBottom'); // 蟾ｦ荳岩・蜿ｳ荳・
  const diagonal2 = getDiagonalPositions('rightTopToLeftBottom'); // 蜿ｳ荳岩・蟾ｦ荳・

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <svg
        width={cardWidth}
        height={cardHeight}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* 繝√ぉ繝ｼ繝ｳ1・亥ｷｦ荳岩・蜿ｳ荳具ｼ・*/}
        {diagonal1.map((pos, idx) => (
          <rect
            key={`chain1-${idx}`}
            x={pos.x - linkSize / 2}
            y={pos.y - linkSize / 2}
            width={linkSize}
            height={linkSize}
            rx={linkRadius}
            fill={linkColor}
            stroke={linkBorder}
            strokeWidth={1.5}
            opacity={0.95}
            filter="url(#chainShadow)"
          />
        ))}
        {/* 繝√ぉ繝ｼ繝ｳ2・亥承荳岩・蟾ｦ荳具ｼ・*/}
        {diagonal2.map((pos, idx) => (
          <rect
            key={`chain2-${idx}`}
            x={pos.x - linkSize / 2}
            y={pos.y - linkSize / 2}
            width={linkSize}
            height={linkSize}
            rx={linkRadius}
            fill={linkColor}
            stroke={linkBorder}
            strokeWidth={1.5}
            opacity={0.95}
            filter="url(#chainShadow)"
          />
        ))}
        {/* 荳ｭ螟ｮ縺ｮ襍､縺・ｼｪ */}
        <circle
          cx={cardWidth / 2}
          cy={cardHeight / 2}
          r={ringRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth={ringStroke}
          opacity={0.9}
          filter="url(#ringShadow)"
        />
        {/* SVG繝輔ぅ繝ｫ繧ｿ・亥ｽｱ・・*/}
        <defs>
          <filter id="chainShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#990000" floodOpacity="0.5" />
          </filter>
          <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#990000" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
