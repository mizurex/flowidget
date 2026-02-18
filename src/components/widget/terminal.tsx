'use client';

import { useMemo, useState } from 'react';

export type TerminalQueryEntry = {
  question: string;
  answer: string;
  timestamp: string;
};

type Props = {
  title?: string;
  entries: TerminalQueryEntry[];
  loading?: boolean;
  error?: string | null;
  emptyText?: string;
  maxHeightClassName?: string;
  headerLabel?: string;
};

function formatRelativeTime(ts: string) {
  const t = new Date(ts).getTime();
  if (Number.isNaN(t)) return '';
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function TerminalLog({
  title = 'widget-queries',
  entries,
  loading = false,
  error = null,
  emptyText = 'no queries yet — waiting for visitors',
  maxHeightClassName = 'max-h-[55vh]',
  headerLabel,
}: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const headerText = useMemo(() => {
    const base = headerLabel ?? title;
    return `${base} — ${entries.length} entries`;
  }, [entries.length, headerLabel, title]);

  return (
    <div className="border border-zinc-800 bg-[#09090b] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-[#0f0f12]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-zinc-500 ml-2 font-mono">{headerText}</span>
      </div>
      <div className={`font-mono text-sm overflow-y-auto ${maxHeightClassName}`}>
        {loading ? (
          <div className="flex items-center gap-2 px-4 py-8 justify-center">
            <span className="loading loading-spinner loading-xs bg-green-300"></span>
            <span className="text-zinc-500 text-xs">fetching logs...</span>
          </div>
        ) : error ? (
          <div className="px-4 py-6 text-center">
            <p className="text-red-400 text-xs">
              <span className="text-red-500">ERR</span> {error}
            </p>
          </div>
        ) : entries.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-zinc-500 text-xs">{emptyText}</p>
          </div>
        ) : (
          entries.map((q, i) => (
            <div
              key={`${q.timestamp}-${i}`}
              className={`px-4 py-3 border-b border-zinc-800/50 cursor-pointer transition-colors hover:bg-zinc-900/50 ${
                expandedIdx === i ? 'bg-zinc-900/30' : ''
              }`}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-[#7cff3f] shrink-0 mt-0.5">&gt;</span>
                  <span className="text-zinc-200 break-words">{q.question}</span>
                </div>
                <span className="text-zinc-600 text-xs whitespace-nowrap shrink-0">
                  {formatRelativeTime(q.timestamp)}
                </span>
              </div>

              {expandedIdx === i && (
                <div className="mt-2 ml-5 pl-3 border-l border-zinc-700">
                  <p className="text-zinc-400 text-xs leading-relaxed">{q.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {!loading && !error && entries.length > 0 && (
        <div className="px-4 py-2 border-t border-zinc-800 bg-[#0f0f12]">
          <span className="text-zinc-600 text-xs font-mono">
            showing {entries.length} of {entries.length}
          </span>
        </div>
      )}
    </div>
  );
}

