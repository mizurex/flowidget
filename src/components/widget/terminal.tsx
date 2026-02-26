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
    <div className="border border-white/10 bg-[#0F0F0F] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#0d0d0d]">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 bg-red-500/80" />
          <span className="h-2 w-2 bg-yellow-500/80" />
          <span className="h-2 w-2 bg-green-500/80" />
        </div>
        <span className="text-[11px] text-white/45 ml-2 font-mono">{headerText}</span>
      </div>
      <div className={`font-mono text-sm overflow-y-auto ${maxHeightClassName}`}>
        {loading ? (
          <div className="flex items-center gap-2 px-4 py-8 justify-center">
            <div className="flex items-end gap-[3px]">
              <span className="h-4 w-[3px] bg-[#F04D26] animate-pulse" />
              <span className="h-4 w-[3px] bg-[#F04D26] animate-pulse [animation-delay:150ms]" />
              <span className="h-4 w-[3px] bg-[#F04D26] animate-pulse [animation-delay:300ms]" />
            </div>
            <span className="text-white/45 text-[11px] font-mono">fetching logs...</span>
          </div>
        ) : error ? (
          <div className="px-4 py-6 text-center">
            <p className="text-red-400 text-[11px] font-mono">
              <span className="text-red-500">ERR</span> {error}
            </p>
          </div>
        ) : entries.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-white/45 text-[11px] font-mono">{emptyText}</p>
          </div>
        ) : (
          entries.map((q, i) => (
            <div
              key={`${q.timestamp}-${i}`}
              className={`px-4 py-3 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/5 ${
                expandedIdx === i ? 'bg-white/5' : ''
              }`}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-[#F04D26] shrink-0 mt-0.5">&gt;</span>
                  <span className="text-white/80 break-words">{q.question}</span>
                </div>
                <span className="text-white/45 text-[11px] whitespace-nowrap shrink-0 font-mono">
                  {formatRelativeTime(q.timestamp)}
                </span>
              </div>

              {expandedIdx === i && (
                <div className="mt-2 ml-5 pl-3 border-l border-white/10">
                  <p className="text-white/55 text-[11px] leading-relaxed">{q.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {!loading && !error && entries.length > 0 && (
        <div className="px-4 py-2 border-t border-white/10 bg-[#0d0d0d]">
          <span className="text-white/45 text-[11px] font-mono">
            showing {entries.length} of {entries.length}
          </span>
        </div>
      )}
    </div>
  );
}

