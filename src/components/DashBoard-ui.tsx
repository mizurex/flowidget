'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import HeaderLogged from './HeaderLoggedIn';
import UserWidget from './widget/UserWidgetPopup';
import { ArrowBigDown, ArrowDown, ArrowRight, ArrowUp, ArrowUpNarrowWideIcon, GiftIcon } from 'lucide-react';
import { BsArrow90DegRight, BsArrowDown, BsArrowRight, BsPeople } from 'react-icons/bs';

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
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // Fetch dashboard data when user is available
  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const fetchDashboardData = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://widget-xxtv.onrender.com/dashboard-data?user_id=${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch dashboard data');
      }

      if (data.success) {
        setWidgetData(data.widget);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleWidget = () => {
    setShowEmbedPopup(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getWidgetStatus = () => {
    return widgetData ? 'Active' : 'Not Found';
  };

  const creditsLeft = widgetData ? 500 - widgetData.messageCount : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {user && (
        <HeaderLogged
          user={user}
         onCreateClick={() => {
          
  setShowNotification(true);
  setTimeout(() => setShowNotification(false), 3000); // hide after 3s
}}
        />
      )}

      <main className="pt-24 sm:pt-32 px-4 sm:px-6 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto space-y-8 sm:space-y-12">
        {showNotification && (
  <div className="fixed bottom-4 sm:bottom-1 left-4 right-4 sm:left-auto sm:right-5 z-50 border border-zinc-800 rounded-md animate-fade-in-down max-w-sm sm:max-w-xs mx-auto sm:mx-0">
    <div className="bg-[#09090b] text-white px-4 py-3 shadow-lg flex items-center gap-2">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm">You’ve already created 1 free widget </span>
    </div>
  </div>
)}

        {/* 1. Widgets */}
        <section className="bg-[#09090b] p-4 sm:p-6 border border-zinc-800 rounded-lg">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">Your Widgets</h2>
            <p className="text-zinc-400 text-sm sm:text-base">Manage and preview your active widgets</p>
            <div className="h-px bg-zinc-800/60 my-4" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-8">
            <span className="loading loading-spinner loading-xs bg-green-300"></span>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded">
              <p className="text-red-400">Error: {error}</p>
              <button 
                onClick={fetchDashboardData}
                className="mt-2 px-3 py-1 text-sm bg-red-800 hover:bg-red-700 rounded"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row text-center sm:text-left items-center sm:items-center w-full gap-4">
              {widgetData ? (
                <div className="p-4 bg-[#09090b] flex w-full items-center justify-between border border-[#8fe457] rounded-md">
                  <div className="text-left w-full sm:w-auto">
                    <h3 className="text-lg sm:text-xl font-medium">{widgetData.name}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                      Created: {formatDate(widgetData.createdAt)}
                    </p>
                  </div>
                  
                  <div className="text-center flex items-center gap-2 mt-3 sm:mt-0">
                    <div className="inline-grid *:[grid-area:1/1]">
  <div className="bg-green-600 w-3 h-3 rounded-full animate-ping"></div>
  <div className="bg-green-600 w-3 h-3 rounded-full"></div>
</div> 
                    <p className="text-xs sm:text-sm text-zinc-400">Status: {getWidgetStatus()}</p>
                   
                  </div>
                  
                  <button 
                    className="w-full sm:w-auto px-6 py-2 text-sm font-medium bg-white text-black shadow hover:bg-zinc-100 mt-3 sm:mt-0"
                    onClick={handleWidget}
                  > 
                    Show Embed Code
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-zinc-800 flex w-full items-center justify-center border border-zinc-600 rounded-md">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-zinc-400">No Widget Found</h3>
                    <p className="text-sm text-zinc-500 mt-1">
                      Create your first widget to get started
                    </p>
                    <button 
                      className="mt-3 w-full sm:w-auto px-4 py-2 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 rounded"
                      onClick={() => alert('Create Widget Clicked')}
                    >
                      Create Widget
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

          
         <section className="bg-[#09090b] p-4 sm:p-6  border border-zinc-800 rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-1">Widget Stats</h2>
      <p className="text-zinc-400 text-sm sm:text-base">Recent usage for your widgets</p>
      <div className="mt-3">
        <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          Credits left: {creditsLeft}
        </span>
      </div>
      <div className="h-px bg-zinc-800/60 my-4" />

      {widgetData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="p-4 bg-[#0f0f12] border border-zinc-700 rounded-md">
            <div className="text-2xl font-bold">
              {widgetData.messageCount}
            </div>
            <div className="text-sm text-zinc-400">Total Response</div>
          </div>
          <div className="p-4 bg-[#0f0f12] border border-zinc-700 rounded-md">
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-zinc-400">Active Widgets</div>
          </div>
          <div className='pl-0 sm:pl-2'>
             <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {showDetails ? "Hide details" : "See more details"}
      </button>
          </div>
          
        </div>
      ) : (
        <div className="text-center text-zinc-500 py-8">
          <div className="flex  flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
        </div>
      )}
     
      {showDetails && (
        <div className="mt-4 p-4 bg-[#0f0f12] rounded border border-zinc-700">
          <p className="text-sm text-zinc-400 mb-2">Extra analytics:</p>
          <ul className="list-disc list-inside text-zinc-300 text-sm">
            <li>Average response time: 2.3s</li>
            <li>Top widget: Support Bot</li>
            <li>Messages today: 42</li>
          </ul>
        </div>
      )}
    </section>

       
        <section className="bg-[#09090b] p-4 sm:p-6  border border-zinc-800 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-1">Plan & Usage</h2>
          <div className="h-px bg-zinc-800/60 my-4" />
          <div className="space-y-2">
            <div className="border border-zinc-700 rounded-md w-full ">
     
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-3 sm:px-4 py-3 cursor-pointer  transition-colors hover:bg-zinc-900/40"
      >
        <div className="flex items-center gap-2">
          {open ? (
            <BsArrowDown size={14} className="text-white mt-0.5" />
          ) : (
            <BsArrowRight size={14} className="text-white mt-0.5" />
          )}
          <span className="text-white font-bold">Renewable Credits </span>
          <span className="text-sm text-blue-400 border border-blue-500 rounded px-2 py-0.5">
            Free Tier
          </span>
        </div>
        <div className="text-white font-bold">
          {creditsLeft} <span className="text-zinc-400 font-normal">left</span>
        </div>
      </div>


      {open && (
        <div className="pl-6 sm:pl-9 pr-3.5 py-3 space-y-3 border-t border-zinc-700 bg-[#09090b]">
          {/* Monthly Free */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className=''>
              <GiftIcon size={17} />
              <p className="text-white font-bold flex items-center gap-2">
                 Monthly Free
              </p>
              <p className="text-zinc-400 text-sm">Your monthly free response</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">{creditsLeft} <span className="text-zinc-400">left</span></p>
              <p className="text-zinc-400 text-sm">500 total</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <BsPeople size={17}/>
              <p className="text-white font-bold flex items-center gap-2">
                 Referral Bonus
              </p>
              <p className="text-zinc-400 text-sm">Earned by referring others</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">0 <span className="text-zinc-400">left</span></p>
              <p className="text-zinc-400 text-sm">0 total</p>
            </div>
          </div>
        </div>
      )}
    </div>
            
            
         
            <div className="mt-4">
              <div className="flex justify-between text-sm text-zinc-400 mb-1">
                <span>Usage</span>
                <span>{widgetData?.messageCount || 0}/500</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-[#7cff3f] h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(((widgetData?.messageCount || 0) / 500) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
         {showEmbedPopup && user?.id && (
          <UserWidget onClose={() => setShowEmbedPopup(false)} userId={user.id} />
        )}
      </main>
    </div>
  );
}