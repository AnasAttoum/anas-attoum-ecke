import Header from '@/layouts/header/header';
import ScrollToTop from '@/lib/scroll-to-top';
import { AppSidebar } from '@/layouts/sidebar/sidebar';
import SidebarProviderHandler from '@/layouts/sidebar/sidebar-provider-handler';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {

  return (
    <SidebarProviderHandler>
      <AppSidebar />
      <main className='w-full'>
        <ScrollToTop />
        <Header />
        <div className="x-spacing" style={{ minHeight: "calc(100dvh - 5rem)" }}>
          {children}
        </div>
      </main>
    </SidebarProviderHandler>
  )
}