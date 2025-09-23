'use client';

import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import WizardForm from './Wizardpage';

type Props = {
  user: User | null;
};

export default function WizardClient({ user }: Props) {
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-center text-white">
        <div>
          <p className="text-lg">Please sign in to create a widget.</p>
        </div>
      </div>
    );
  }

  return (
    <WizardForm
      user={user}
      widget={null}
      onSuccess={() => router.push('/dashboard')}
    />
  );
}


