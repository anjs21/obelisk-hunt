'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { OBELISKS } from '@/lib/obelisks-data';

interface Ranked {
  name: string;
  conquered: number; // distinct obelisks
  totalVisits: number;
  lastVisit: string;
}

const TOTAL = OBELISKS.length;

export default function Leaderboard() {
  const [rows, setRows] = useState<Ranked[]>([]);
  const [anonCount, setAnonCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('visits')
      .select('visitor_name, obelisk_id, visited_at')
      .order('visited_at', { ascending: false })
      .then(({ data }) => {
        if (!data) {
          setLoading(false);
          return;
        }

        const byName = new Map<
          string,
          { display: string; obelisks: Set<string>; total: number; last: string }
        >();
        let anon = 0;

        for (const v of data) {
          const name = (v.visitor_name ?? '').trim();
          if (!name) {
            anon += 1;
            continue;
          }
          const key = name.toLowerCase();
          // data is sorted desc, so the first row seen for a key is the most recent
          const entry =
            byName.get(key) ??
            { display: name, obelisks: new Set<string>(), total: 0, last: v.visited_at };
          entry.obelisks.add(v.obelisk_id);
          entry.total += 1;
          byName.set(key, entry);
        }

        const ranked: Ranked[] = Array.from(byName.values()).map((e) => ({
          name: e.display,
          conquered: e.obelisks.size,
          totalVisits: e.total,
          lastVisit: e.last,
        }));

        ranked.sort(
          (a, b) =>
            b.conquered - a.conquered ||
            b.totalVisits - a.totalVisits ||
            a.lastVisit.localeCompare(b.lastVisit)
        );

        setRows(ranked);
        setAnonCount(anon);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-stone-400 text-sm">
        Tallying the conquests…
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-16 text-stone-400">
        <p className="text-4xl mb-2">🏆</p>
        <p className="text-sm">
          No ranked hunters yet. Add your name when you log a visit to climb the
          board!
        </p>
        {anonCount > 0 && (
          <p className="text-xs mt-2 text-stone-300">
            ({anonCount} anonymous {anonCount === 1 ? 'visit' : 'visits'} not counted)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="space-y-2">
        {rows.map((r, i) => {
          const medal = ['🥇', '🥈', '🥉'][i];
          const isChampion = r.conquered === TOTAL;
          return (
            <div
              key={r.name}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3.5 ${
                i === 0
                  ? 'border-amber-400 bg-amber-50'
                  : 'border-stone-200 bg-white'
              }`}
            >
              <div className="w-8 text-center shrink-0">
                {medal ? (
                  <span className="text-2xl">{medal}</span>
                ) : (
                  <span className="text-stone-400 font-bold text-sm">{i + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-ink font-serif truncate flex items-center gap-1.5">
                  {r.name}
                  {isChampion && (
                    <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                      👑 Complete
                    </span>
                  )}
                </p>
                <div className="w-full bg-stone-100 rounded-full h-1.5 mt-1.5">
                  <div
                    className="h-1.5 rounded-full bg-amber-400 transition-all duration-700"
                    style={{ width: `${(r.conquered / TOTAL) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-lg text-stone-ink tabular-nums leading-none">
                  {r.conquered}
                  <span className="text-stone-400 text-sm font-normal">/{TOTAL}</span>
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  {r.totalVisits} {r.totalVisits === 1 ? 'visit' : 'visits'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {anonCount > 0 && (
        <p className="text-xs text-center text-stone-400 mt-4 italic">
          {anonCount} anonymous {anonCount === 1 ? 'visit is' : 'visits are'} not
          ranked — add a name to count!
        </p>
      )}
    </div>
  );
}
