'use client';

interface Props {
  visitedIds: Set<string>;
  total: number;
}

export default function ProgressBanner({ visitedIds, total }: Props) {
  const count = visitedIds.size;
  const pct = Math.round((count / total) * 100);

  const label =
    count === 0
      ? 'Your hunt begins — go find them all!'
      : count === total
      ? 'Legendary! You conquered every obelisk!'
      : count === 1
      ? '1 obelisk down, keep marching!'
      : `${count} down, ${total - count} to go!`;

  return (
    <div className="bg-stone-ink text-amber-100 px-4 py-4">
      <div className="flex items-baseline justify-between mb-2">
        <h1 className="text-xl font-bold tracking-wide font-serif">🏛 Roma Obelisk Hunt</h1>
        <span className="text-amber-300 text-sm font-semibold tabular-nums">
          {count}/{total}
        </span>
      </div>
      <div className="w-full bg-amber-900/40 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-amber-200/80">{label}</p>
    </div>
  );
}
