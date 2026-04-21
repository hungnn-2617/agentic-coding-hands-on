'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { SearchIcon } from '@/components/icons/search-icon';
import type { SpotlightNode } from '@/types/kudo-feed';

interface SpotlightBoardProps {
  data: SpotlightNode[];
  kudosCount: number;
}

// Golden angle for spiral distribution (≈137.508°)
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
// Font size range
const MIN_FONT = 7;
const MAX_FONT = 16;

// Generate positions using golden angle spiral
function generatePositions(count: number, width: number, height: number) {
  const positions: { x: number; y: number }[] = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.42;

  for (let i = 0; i < count; i++) {
    const angle = i * GOLDEN_ANGLE;
    const radius = maxRadius * Math.sqrt(i / count);
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }
  return positions;
}

export function SpotlightBoard({ data, kudosCount }: SpotlightBoardProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const maxCount = useMemo(
    () => Math.max(...data.map((d) => d.kudo_count), 1),
    [data]
  );

  const positions = useMemo(() => {
    // Default canvas size for position calculation
    return generatePositions(data.length, 1100, 450);
  }, [data.length]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.map((node) => ({
      ...node,
      isMatch: node.name.toLowerCase().includes(query),
    }));
  }, [data, searchQuery]);

  const handleZoomClick = useCallback(() => {
    if (!isZoomMode) {
      setIsZoomMode(true);
      return;
    }
    // Cycle through zoom levels: 1 -> 1.5 -> 2 -> 3 -> 1
    const levels = [1, 1.5, 2, 3];
    const currentIndex = levels.indexOf(scale);
    const nextIndex = currentIndex === -1 || currentIndex === levels.length - 1 ? 0 : currentIndex + 1;
    setScale(levels[nextIndex]);
    if (levels[nextIndex] === 1) {
      setTranslate({ x: 0, y: 0 });
    }
  }, [isZoomMode, scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isZoomMode) return;
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, [isZoomMode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full h-[548px] rounded-[47px] border border-[var(--color-border)] overflow-hidden relative bg-[#00101A] max-sm:h-[200px] max-sm:rounded-[24px]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[var(--color-overlay-spotlight)]" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <span className="text-4xl font-bold leading-[44px] text-white">
          {kudosCount.toLocaleString()} KUDOS
        </span>

        <div className="flex items-center gap-3 max-sm:hidden">
          {/* Search Field */}
          <div className="flex items-center w-[219px] h-[39px] rounded-[46px] border-[0.682px] border-[var(--color-border)] bg-transparent px-3 gap-2">
            <SearchIcon className="w-4 h-4 text-white shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.slice(0, 100))}
              placeholder={t('liveBoard.spotlight.search')}
              className="flex-1 bg-transparent text-sm font-bold text-white placeholder:text-[#999] outline-none"
            />
          </div>

          {/* Pan/Zoom Button */}
          <button
            type="button"
            onClick={handleZoomClick}
            title={t('liveBoard.spotlight.panZoom')}
            className={`flex w-9 h-9 items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isZoomMode ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 3h2a2 2 0 0 1 2 2v2M3 15v2a2 2 0 0 0 2 2h2M15 19h2a2 2 0 0 0 2-2v-2M3 5V3a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
            </svg>
          </button>
        </div>
      </div>

      {/* Name Cloud Canvas */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full h-[calc(100%-70px)] overflow-hidden ${
          isZoomMode ? 'cursor-grab' : ''
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-full h-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          }}
        >
          {(filteredData as (SpotlightNode & { isMatch?: boolean })[]).map((node, index) => {
            const fontSize = MIN_FONT + ((node.kudo_count / maxCount) * (MAX_FONT - MIN_FONT));
            const pos = positions[index] || { x: 50, y: 50 };
            const hasSearch = searchQuery.trim().length > 0;
            const isMatch = 'isMatch' in node ? node.isMatch : true;
            // Use index-based opacity for visual depth when not searching
            const baseOpacity = 0.3 + (index / data.length) * 0.7;
            const opacity = hasSearch ? (isMatch ? 1 : 0.15) : baseOpacity;
            const color = hasSearch && isMatch ? '#F17676' : '#FFFFFF';

            return (
              <span
                key={node.id}
                className="absolute cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-200 font-bold whitespace-nowrap"
                style={{
                  left: `${(pos.x / 1100) * 100}%`,
                  top: `${(pos.y / 450) * 100}%`,
                  fontSize: `${fontSize}px`,
                  opacity,
                  color,
                  transform: 'translate(-50%, -50%)',
                }}
                title={`${node.name} - ${node.kudo_count} kudos`}
              >
                {node.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
