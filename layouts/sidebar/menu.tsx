"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { links } from '@/lib/paths';
import { Separator } from '@/components/ui/separator';
import { usePathname } from '@/lib/localization/navigation';
import { useTranslations } from 'next-intl';

export default function Menu() {

    const pathname = usePathname();
    const t = useTranslations();

    return (
        <SidebarMenu>
            {links.map(({ icon: Icon, label, link }, index) => {
                const isActive = link === pathname;
                return link
                    ? (
                        <div key={label} className='flex flex-col gap-1'>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={cn(
                                    "relative w-full text-center text-white hover:text-white hover:bg-secondary rounded-md transition-all duration-200 py-7",
                                    isActive && "font-bold bg-secondary"
                                )}>
                                    <Link href={link} className='z-10'>
                                        <Icon color="#fff" />
                                        <span>{t(label)}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {index !== links.length - 1 && <Separator />}
                        </div>
                    ) : (
                        <div key={label}>
                            <SidebarGroupLabel className="mt-1 text-gray-300 uppercase">
                                {t(label)}
                            </SidebarGroupLabel>
                        </div>
                    )
            })}
        </SidebarMenu>
    )
}