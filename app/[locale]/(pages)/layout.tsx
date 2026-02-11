import Header from '@/layouts/header/header';
import Footer from '@/layouts/footer/footer';
import ScrollToTop from '@/lib/scroll-to-top';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="x-spacing" style={{ minHeight: "calc(100dvh - 5rem)" }}>
        {children}
      </div>
      <Footer />
    </>
  )
}