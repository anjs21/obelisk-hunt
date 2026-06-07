'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Obelisk } from '@/types';
import Image from 'next/image';

interface Props {
  obelisk: Obelisk;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function VisitForm({ obelisk, onSuccess, onCancel }: Props) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError('Photo must be under 10 MB');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let photoUrl: string | null = null;

      if (file) {
        const ext = file.name.split('.').pop();
        const path = `${obelisk.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('obelisk-photos')
          .upload(path, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('obelisk-photos')
          .getPublicUrl(path);
        photoUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('visits').insert({
        obelisk_id: obelisk.id,
        visitor_name: name.trim() || null,
        photo_url: photoUrl,
        note: note.trim() || null,
      });

      if (insertError) throw new Error(insertError.message);

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Your name <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Marco"
          maxLength={60}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Note <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did you think? Any secrets discovered?"
          rows={2}
          maxLength={280}
          className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Proof photo <span className="font-normal text-stone-400">(optional)</span>
        </label>
        {preview ? (
          <div className="relative">
            <Image
              src={preview}
              alt="Preview"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = ''; }}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-stone-300 rounded-xl py-6 text-sm text-stone-400 flex flex-col items-center gap-1 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            <span className="text-2xl">📷</span>
            Tap to add a photo
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-stone-300 rounded-xl py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl py-3 text-sm font-bold transition-colors"
        >
          {submitting ? 'Saving…' : 'Mark as Visited!'}
        </button>
      </div>
    </form>
  );
}
