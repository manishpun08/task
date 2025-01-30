import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import Header from '@/components/Header';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />

        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
