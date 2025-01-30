import { signOut } from '@/auth';
import { Session } from 'next-auth';
import React from 'react';
import { Button } from '../ui/button';

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 font-semibold text-2xl capitalize">
          Welcome {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all your users and products.
        </p>
      </div>
      <div>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <form
              action={async () => {
                'use server';

                await signOut();
              }}
              className="mb-10"
            >
              <Button>Logout</Button>
            </form>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
