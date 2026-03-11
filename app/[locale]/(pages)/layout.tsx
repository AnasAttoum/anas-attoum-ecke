import Header from '@/layouts/header/header';
import Footer from '@/layouts/footer/footer';
import ScrollToTop from '@/lib/scroll-to-top';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layouts/sidebar/sidebar';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <ScrollToTop />
        <Header />
        <div className="x-spacing" style={{ minHeight: "calc(100dvh - 5rem)" }}>
          {children}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}