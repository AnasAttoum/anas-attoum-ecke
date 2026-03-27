import Header from '@/layouts/header/header';
import ScrollToTop from '@/lib/scroll-to-top';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {

  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
    </>
  )
}