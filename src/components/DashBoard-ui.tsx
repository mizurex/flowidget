'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';
import HeaderLogged from '@/components/HeaderLoggedIn';
import UserWidget from '@/components/widget/UserWidgetPopup';
import CreateWidgetModal from '@/components/model/WidgetModel';
import TerminalLog, { type TerminalQueryEntry } from '@/components/widget/terminal';
import { GiftIcon, Code2, BotIcon, Loader2 } from 'lucide-react';
import { BsArrowDown, BsArrowRight, BsPeople } from 'react-icons/bs';
import Logo from './svg/logo';
import EditorialLines from './hero/hero-lines';
import DiagonalPattern from './hero/pattern';
import RulerTicks from './hero/morph';
import EditorialLines2 from './hero/lines';

interface DashboardProps {
  initialUser?: User | null;
}

interface WidgetData {
  id: string;
  name: string;
  messageCount: number;
  createdAt: string;
}

export default function UiDashBoard({ initialUser = null }: DashboardProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [showEmbedPopup, setShowEmbedPopup] = useState(false);
  const [showCreateWidgetModal, setShowCreateWidgetModal] = useState(false);
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasWidget, setHasWidget] = useState(false);
  const [showAlreadyCreatedToast, setShowAlreadyCreatedToast] = useState(false);
  const [noWidget, setNoWidget] = useState(false);
  const [recentEntries, setRecentEntries] = useState<TerminalQueryEntry[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );


    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  useEffect(() => {
    async function fetchi() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !user?.id) return;
      try {
        const url = `https://widget-api.turfworks.site/recent-q?user_id=${user.id}`;
        const data = await fetch(url, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!data.ok) {
          const errBody = await data.json().catch(() => ({}));
          console.error('recent-q failed:', data.status, data.statusText, errBody);
          return;
        }
        const res = await data.json();
        const entries: TerminalQueryEntry[] = (res.questions ?? []).map((q: string, i: number) => ({
          question: q,
          answer: res.answers?.[i] ?? '',
          timestamp: res.timestamps?.[i],
        }));
        setRecentEntries(entries);
      } catch (err) {
        console.error('Error fetching recent entries:', err);
      }
    }
    if (user?.id) fetchi();
  }, [user?.id]);

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return;
    }
    try {
      const response = await fetch(`https://widget-api.turfworks.site/dashboard-data`,{
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      const data = await response.json();
      const apiErrorMessage = (data?.error || '').toString().toLowerCase();
      if (response.status === 404 || apiErrorMessage.includes('no widget')) {
        setWidgetData(null);
        setNoWidget(true);
        setHasWidget(false);
        return;
      }
      if (!response.ok) throw new Error(data.error || 'Failed to fetch dashboard data');
      if (data.success) {
        setWidgetData(data.widget);
        setNoWidget(false);
        setHasWidget(true);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      const msg = err instanceof Error ? err.message : 'Failed to load data';
      if (msg.toLowerCase().includes('no widget')) {
        setNoWidget(true);
        setHasWidget(false);
        setError(null);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHasWid = async () => {
      try {
        const hasWid = await fetch(`https://widget-api.turfworks.site/widget-status?user_id=${user?.id}`);
        if (!hasWid.ok) throw new Error('Failed to fetch widget status');
        const data = await hasWid.json();
        if (!data.success) throw new Error('Failed to fetch widget status');
        setHasWidget(!!data.status.wid);
      } catch (err) {
        console.error('Error fetching widget status:', err);
      }
    };
    if (user?.id) fetchHasWid();
  }, [user?.id]);

  const handleWidget = () => setShowEmbedPopup(true);

  const handleCreateClick = () => {
    if (hasWidget) {
      setShowAlreadyCreatedToast(true);
      setTimeout(() => setShowAlreadyCreatedToast(false), 3000);
    } else {
      setShowCreateWidgetModal(true);
    }
  };

  
  const creditsLeft = widgetData ? 100 - widgetData.messageCount : 0;

  return (
    <div className="relative min-h-screen text-white bg-black">
     
     <EditorialLines />
     <RulerTicks />
     

      {user && !hasWidget && (
        <CreateWidgetModal
          isOpen={showCreateWidgetModal}
          onClose={() => {
            setShowCreateWidgetModal(false);
            fetchDashboardData();
          }}
          user={user}
        />
      )}

      <main className="relative z-10 pt-5 md:pt-10 px-6 max-w-3xl mx-auto space-y-6 md:space-y-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       
          <div className="flex items-start gap-3">
            <Link href="/" className="flex items-center ">
              <Logo width={40} height={40} />
            </Link>
            <div>
           
              <h1 className="pt-2.5 font-mono text-xl text-white md:text-2xl">
                Dashboard
              </h1>
          
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-xs text-white/60 sm:items-end">
            {user?.email && (
              <div className="font-mono">
                Signed in as <span className="text-white/80">{user.email}</span>
              </div>
            )}
         
          </div>
        </div>

       {noWidget ? (
          <div className="py-24 text-center">
            <div className="inline-flex border border-muted-foreground/40 bg-muted/10 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Dashboard
            </div>
            <h2 className="font-mono text-2xl text-white md:text-3xl">No widgets found</h2>
            <p className="mt-2 text-sm text-white/55">Create a widget first</p>
            <button
              onClick={handleCreateClick}
              className="mt-6 border border-white/20 bg-white text-black px-6 py-2.5 font-mono text-sm hover:bg-white/90 transition-colors"
            >
              Create Widget
            </button>
          </div>
        ) : (
          <>
            {showAlreadyCreatedToast && (
              <div className="fixed bottom-4 right-4 z-50 border border-white/10 bg-[#0d0d0d] px-4 py-3 flex items-center gap-2 font-mono text-sm text-white">
                <span className="h-1.5 w-1.5 shrink-0 bg-green-500" />
                You&apos;ve already created 1 free widget
              </div>
            )}

            <section className="border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
            
              <h2 className="font-mono text-xl text-white md:text-2xl">Manage widgets</h2>
              

              {loading ? (
                <div className="flex items-center justify-center py-12">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                </div>
              ) : error ? (
                <div className="mt-6 grid gap-4 p-4 ">
                  <p className="font-mono text-sm text-red-400">Error: {error}</p>
                  <button
                    onClick={fetchDashboardData}
                    className="border border-white/20 px-4 py-2 max-w-fit font-mono text-sm text-white hover:border-white/40 hover:bg-white/5"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="mt-6">
                  {widgetData ? (
                    <div className="border border-white/10 bg-[#0F0F0F] overflow-hidden">
                      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                        <button
                          className="inline-flex items-center gap-2 px-4 py-2 border border-white bg-white text-black font-mono text-sm hover:bg-white/90 transition-colors"
                          onClick={handleWidget}
                        >
                          <Code2 size={14} />
                          Embed Code
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-white/10 bg-[#0F0F0F] p-6 flex flex-col items-center justify-center text-center">
                      <h3 className="font-mono text-lg text-white/80">No Widget Found</h3>
                      <p className="mt-1 text-sm text-white/55">Create your first widget to get started</p>
                      <button
                        className="mt-4 px-6 py-2.5 border border-[#F04D26] bg-[#F04D26] text-white font-mono text-sm hover:bg-[#F04D26]/90 transition-colors"
                        onClick={handleCreateClick}
                      >
                        Create Widget
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
            
              <h2 className="font-mono text-xl text-white md:text-2xl">Widget Stats</h2>
              <p className="mt-1 text-sm text-white/55">Recent usage for your widgets</p>

              {widgetData ? (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-b border-white/10 pb-4">
                    <div className="font-mono text-2xl text-white">{widgetData.messageCount}</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-white/45 mt-0.5">Total Response</div>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <div className="font-mono text-2xl text-white">1</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-white/45 mt-0.5">Active Widgets</div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="font-mono text-sm text-white/55 hover:text-white/80 underline"
                    >
                      {showDetails ? 'Hide details' : 'See more details'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="h-24 w-full bg-white/5 border border-white/10" />
                  <div className="mt-4 h-4 w-[70%] bg-white/5 border border-white/10" />
                  <div className="mt-2 h-4 w-[50%] bg-white/5 border border-white/10" />
                </div>
              )}

           
            </section>

            <section className="border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
             
              <h2 className="font-mono text-xl text-white md:text-2xl">Recent Conversations</h2>
              <p className="mt-1 text-sm text-white/55">See what visitors are asking your widget</p>
              <div className="mt-6">
                <TerminalLog entries={recentEntries} />
              </div>
            </section>

            <section className="border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
            
              <h2 className="font-mono text-xl text-white md:text-2xl">Usage</h2>

              <div className="mt-6 border border-white/10">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex w-full items-center justify-between px-4 py-3 cursor-pointer border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {open ? <BsArrowDown size={14} className="text-white/80" /> : <BsArrowRight size={14} className="text-white/80" />}
                    <span className="font-mono font-medium text-white">Renewable Credits</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] border border-white/20 px-2 py-0.5 text-white/80">Free Tier</span>
                  
                  </div>
                </button>

                {open && (
                  <div className="px-4 py-4 space-y-4 bg-[#0F0F0F]">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <GiftIcon size={16} className="text-white/60" />
                          <p className="font-mono text-sm font-medium text-white">Monthly Free</p>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-white/45">Your monthly free response</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-white">{creditsLeft} <span className="text-white/45">left</span></p>
                        <p className="font-mono text-[11px] text-white/45">100 total</p>
                      </div>
                    </div>
                 
                  </div>
                )}
              </div>

           
            </section>

            <section className="border border-white/10 bg-[#0a0a0a] px-4 py-4 md:px-5 md:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[11px] text-white/55">
                  Like flowidget? Support the project.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/mizurex/flowidget"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1  bg-muted-foreground px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-muted-foreground/80"
                  >
                    Star Github
                  </a>
              
                </div>
              </div>
            </section>

            {showEmbedPopup && user?.id && (
              <UserWidget onClose={() => setShowEmbedPopup(false)} userId={user.id} />
            )}
          </>
        )}
      </main>
      <DiagonalPattern side="left" />
      <DiagonalPattern side="right" />
    </div>
  );
}
