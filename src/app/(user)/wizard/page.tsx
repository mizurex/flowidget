import { createSupabaseServer } from '@/lib/supabase-server';
import WizardClient from './WizardClient';

export default async function WizardPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-black">
      <div className="py-10">
        <WizardClient user={user} />
      </div>
    </div>
  );
}


