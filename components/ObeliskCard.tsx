'use client';

import { Obelisk } from '@/types';

interface Props {
  obelisk: Obelisk;
  visitCount: number;
  visitedByMe: boolean;
  onClick: () => void;
}

export default function ObeliskCard({ obelisk, visitCount, visitedByMe, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all active:scale-[0.98] shadow-sm ${
        visitedByMe
          ? 'border-amber-400 bg-amber-50'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {visitedByMe && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full">
                ✓ Visited
              </span>
            )}
            <h2 className="font-bold text-base text-stone-ink leading-tight font-serif">
              {obelisk.name}
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 italic">{obelisk.italianName}</p>
          <p className="text-sm text-stone-600 mt-1">{obelisk.location}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
              {obelisk.era}
            </span>
            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
              {obelisk.heightM}m tall
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div
            className={`text-2xl ${
              visitedByMe ? 'opacity-100' : 'opacity-30'
            }`}
          >
            🏺
          </div>
          {visitCount > 0 && (
            <span className="text-xs text-stone-500 font-medium">
              {visitCount} {visitCount === 1 ? 'visit' : 'visits'}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
