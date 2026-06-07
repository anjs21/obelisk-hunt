'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { OBELISKS } from '@/lib/obelisks-data';
import { Obelisk, VisitCounts } from '@/types';
import ObeliskCard from '@/components/ObeliskCard';
import ObeliskDrawer from '@/components/ObeliskDrawer';
import ProgressBanner from '@/components/ProgressBanner';
import Leaderboard from '@/components/Leaderboard';

const LOCAL_KEY = 'obelisk-hunt-visited';

function loadLocalVisited(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveLocalVisited(ids: Set<string>) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(Array.from(ids)));
}

export default function HomePage() {
  const [selected, setSelected] = useState<Obelisk | null>(null);
  const [visitCounts, setVisitCounts] = useState<VisitCounts>({});
  const [visitedByMe, setVisitedByMe] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all');
  const [tab, setTab] = useState<'hunt' | 'leaderboard'>('hunt');

  const fetchCounts = useCallback(async () => {
    const { data } = await supabase
      .from('visits')
      .select('obelisk_id');
    if (!data) return;
    const counts: VisitCounts = {};
    for (const row of data) {
      counts[row.obelisk_id] = (counts[row.obelisk_id] ?? 0) + 1;
    }
    setVisitCounts(counts);
  }, []);

  useEffect(() => {
    setVisitedByMe(loadLocalVisited());
    fetchCounts();
  }, [fetchCounts]);

  function handleVisited(obeliskId: string) {
    setVisitedByMe((prev) => {
      const next = new Set(prev);
      next.add(obeliskId);
      saveLocalVisited(next);
      return next;
    });
    setVisitCounts((prev) => ({
      ...prev,
      [obeliskId]: (prev[obeliskId] ?? 0) + 1,
    }));
  }

  const filtered = OBELISKS.filter((o) => {
    if (filter === 'visited') return visitedByMe.has(o.id);
    if (filter === 'unvisited') return !visitedByMe.has(o.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-parchment">
      <ProgressBanner visitedIds={visitedByMe} total={OBELISKS.length} />

      {/* Hunt / Leaderboard toggle */}
      <div className="flex bg-stone-ink px-4 pb-3 gap-2">
        <button
          onClick={() => setTab('hunt')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold font-serif transition-colors ${
            tab === 'hunt'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-amber-900/30 text-amber-200'
          }`}
        >
          🗺 The Hunt
        </button>
        <button
          onClick={() => setTab('leaderboard')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold font-serif transition-colors ${
            tab === 'leaderboard'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-amber-900/30 text-amber-200'
          }`}
        >
          🏆 Leaderboard
        </button>
      </div>

      {tab === 'leaderboard' ? (
        <Leaderboard />
      ) : (
        <>
      {/* Filter tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-stone-100 sticky top-0 z-10">
        {(['all', 'unvisited', 'visited'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              filter === f
                ? 'bg-stone-ink text-amber-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {f === 'all'
              ? `All (${OBELISKS.length})`
              : f === 'visited'
              ? `✓ Done (${visitedByMe.size})`
              : `To Hunt (${OBELISKS.length - visitedByMe.size})`}
          </button>
        ))}
      </div>

      {/* Obelisk list */}
      <div className="px-4 py-4 space-y-3 max-w-2xl mx-auto">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <p className="text-4xl mb-2">🏺</p>
            <p className="text-sm">
              {filter === 'visited'
                ? "You haven't visited any yet — get out there!"
                : 'All done! The entire hunt is complete.'}
            </p>
          </div>
        )}
        {filtered.map((obelisk) => (
          <ObeliskCard
            key={obelisk.id}
            obelisk={obelisk}
            visitCount={visitCounts[obelisk.id] ?? 0}
            visitedByMe={visitedByMe.has(obelisk.id)}
            onClick={() => setSelected(obelisk)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-8 text-center">
        <p className="text-xs text-stone-400 font-serif italic">
          11 ancient obelisks · Rome, Italy
        </p>
      </div>
        </>
      )}

      <ObeliskDrawer
        obelisk={selected}
        visitedByMe={selected ? visitedByMe.has(selected.id) : false}
        onClose={() => setSelected(null)}
        onVisited={handleVisited}
      />
    </div>
  );
}
