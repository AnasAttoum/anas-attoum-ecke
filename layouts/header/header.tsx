"use client"

import Logo from "@/components/logo/logo";
import clsx from "clsx";
import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';
import LocaleSwitcher from "@/components/buttons/locale-switcher/locale-switcher";
import Logout from "@/components/buttons/logout/logout";
import { usePathname } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Disable SSR for this component
const ThemeToggle = dynamic(() => import('@/components/buttons/theme-toggle/theme-toggle'), {
  ssr: false,
  loading: () => <button className="simpleBtn invisible">🔆</button>
});

export default function Header({ withoutToggle = false }: { withoutToggle?: boolean }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const isLoggedIn = pathname !== paths.login;

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      // 1. Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // 2. Hide if scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // 3. Show if scrolling up
      else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);


  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >

      <div className="flex justify-between items-center h-20 shadow dark:shadow-black x-spacing backdrop-blur-sm overflow-visible!">
        <div className="flex items-center gap-10">
          {isLoggedIn && !withoutToggle && <SidebarTrigger />}
          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LocaleSwitcher />
          {isLoggedIn && <Logout />}
        </div>
      </div>

    </header>
  )
}