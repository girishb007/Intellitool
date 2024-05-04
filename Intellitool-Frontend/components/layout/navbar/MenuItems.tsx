import React, { useState, useEffect } from 'react';
import { MenuLink, MenuLinkProps } from './MenuLink';
import { Button, ModalUser } from '@/components';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter hook for Next.js routing
import { useDisclosure } from '@chakra-ui/react';
import { getSession, clearSession, setSession } from '../../../pages/session'; // Import session management utilities
import { toast } from 'react-hot-toast';

interface MenuItemsProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

// In your page component file or wherever MenuItems is used
export async function getServerSideProps(context) {
  const session = getSession(context.req); // Pass the request to getSession if needed
  return {
    props: { session }, // Pass session data as props
  };
}


export const MenuItems = ({ isOpen = false, links }: MenuItemsProps) => {
  const router = useRouter();
  const { isLoggedIn, username, role } = getSession()

  const handleLogin = () => {
    router.push('/joinUs');
  };

  const handleLogout = () => {
    // setSession(false); // Clear session
    clearSession();
    window.location.reload();
    toast.success('Logged out successfully.');
  };


  return (
    <>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } lg:flex flex-col lg:flex-row justify-between basis-full md:basis-auto ml-0 lg:ml-10 w-full`}
      >
        {/* Links */}
        <div className="pt-0 space-x-0 lg:space-x-8 space-y-4 lg:space-y-0 flex flex-col lg:flex-row items-left lg:items-center justify-end font-bold">
          {links.map(link => (
            <MenuLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        {/* CTA Button -> Login / Profile */}
        <div className="mt-4 lg:mt-0">
          {!isLoggedIn ? (
            <Button onClick={handleLogin}>Login</Button>
          ) : (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuItems;
