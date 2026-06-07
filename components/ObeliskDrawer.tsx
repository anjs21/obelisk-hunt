'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Obelisk, Visit } from '@/types';
import { supabase } from '@/lib/supabase';
import VisitForm from './VisitForm';

interface Props {
  obelisk: Obelisk | null;
  visitedByMe: boolean;
  onClose: () => void;
  onVisited: (obeliskId: string) => void;
}

type DrawerView = 'detail' | 'form' | 'success';

export default function ObeliskDrawer({ obelisk, visitedByMe, onClose, onVisited }: Props) {
  const [view, setView] = useState<DrawerView>('detail');
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(false);

  const isOpen = obelisk !== null;

  // Reset view and load visits whenever obelisk changes
  useEffect(() => {
    if (!obelisk) return;
    setView('detail');
    setLoadingVisits(true);
    supabase
      .from('visits')
      .select('*')
      .eq('obelisk_id', obelisk.id)
      .order('visited_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setVisits(data ?? []);
        setLoadingVisits(false);
      });
  }, [obelisk]);

  function handleVisitSuccess() {
    setView('success');
    if (obelisk) onVisited(obelisk.id);
    // Reload visits
    supabase
      .from('visits')
      .select('*')
      .eq('obelisk_id', obelisk!.id)
      .order('visited_at', { ascending: false })
      .limit(20)
      .then(({ data }) => setVisits(data ?? []));
  }

  const mapsUrl = obelisk
    ? `https://www.google.com/maps/search/?api=1&query=${obelisk.latitude},${obelisk.longitude}`
    : '#';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-parchment rounded-t-3xl shadow-2xl max-h-[88vh] flex flex-col ${
          isOpen ? 'drawer-open' : 'drawer-closed'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-stone-300 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 text-lg"
        >
          ✕
        </button>

        {/* Scrollable content */}
        {obelisk && (
          <div className="overflow-y-auto flex-1 px-5 pb-8">
            {/* Header */}
            <div className="pt-2 pb-4 border-b border-stone-200">
              <h2 className="text-2xl font-bold font-serif text-stone-ink pr-8">
                {obelisk.name}
              </h2>
              <p className="text-sm text-stone-400 italic mt-0.5">{obelisk.italianName}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Chip>{obelisk.origin}</Chip>
                <Chip>{obelisk.era}</Chip>
                <Chip>{obelisk.heightM}m tall</Chip>
                {obelisk.pharaoh && <Chip>Pharaoh: {obelisk.pharaoh}</Chip>}
                {obelisk.arrivedRome && <Chip>Rome: {obelisk.arrivedRome}</Chip>}
              </div>
            </div>

            {view === 'detail' && (
              <>
                {/* Location & Maps link */}
                <div className="py-4 border-b border-stone-200">
                  <p className="text-sm font-semibold text-stone-500 flex items-center gap-1.5">
                    📍 {obelisk.location}
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                  >
                    Open in Maps →
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-700 leading-relaxed py-4 border-b border-stone-200">
                  {obelisk.description}
                </p>

                {/* Fun fact */}
                <div className="py-4 border-b border-stone-200 bg-amber-50 -mx-5 px-5">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    💡 Fun Fact
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">{obelisk.funFact}</p>
                </div>

                {/* Visit gallery */}
                <div className="py-4 border-b border-stone-200">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                    {loadingVisits
                      ? 'Loading visits…'
                      : visits.length === 0
                      ? 'No visits yet — be the first!'
                      : `${visits.length} ${visits.length === 1 ? 'visit' : 'visits'} by your crew`}
                  </p>
                  {visits.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                      {visits.map((v) => (
                        <div key={v.id} className="shrink-0 w-28">
                          {v.photo_url ? (
                            <Image
                              src={v.photo_url}
                              alt={v.visitor_name ?? 'Visit'}
                              width={112}
                              height={112}
                              className="w-28 h-28 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-28 h-28 bg-stone-100 rounded-xl flex items-center justify-center text-3xl">
                              🏺
                            </div>
                          )}
                          <p className="text-xs text-stone-500 mt-1 text-center truncate">
                            {v.visitor_name ?? 'Anonymous'}
                          </p>
                          {v.note && (
                            <p className="text-xs text-stone-400 mt-0.5 text-center line-clamp-2 italic">
                              "{v.note}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  {visitedByMe ? (
                    <div className="text-center">
                      <p className="text-amber-600 font-semibold mb-2">✓ You've been here!</p>
                      <button
                        onClick={() => setView('form')}
                        className="text-sm text-stone-500 underline"
                      >
                        Add another visit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setView('form')}
                      className="w-full bg-stone-ink text-amber-300 rounded-2xl py-4 text-base font-bold font-serif tracking-wide hover:bg-amber-900 transition-colors"
                    >
                      ⚔️ I Was Here!
                    </button>
                  )}
                </div>
              </>
            )}

            {view === 'form' && (
              <>
                <div className="pt-4">
                  <h3 className="text-lg font-bold font-serif text-stone-ink mb-4">
                    Record your conquest
                  </h3>
                  <VisitForm
                    obelisk={obelisk}
                    onSuccess={handleVisitSuccess}
                    onCancel={() => setView('detail')}
                  />
                </div>
              </>
            )}

            {view === 'success' && (
              <div className="pt-8 flex flex-col items-center text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold font-serif text-stone-ink mb-2">Conquered!</h3>
                <p className="text-stone-500 mb-6">
                  {obelisk.name} is officially yours. The ancients would be proud.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-stone-ink text-amber-300 rounded-2xl py-4 text-base font-bold font-serif"
                >
                  Back to the Hunt
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
}
