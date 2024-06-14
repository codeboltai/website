declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

import '../styles/globals.css'
import '../assets/css/tailwind.css'
import "../assets/css/materialdesignicons.min.css"
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Figtree } from 'next/font/google'
import GoogleAnalytics from '../components/GoogleAnalytics'
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag('config', 'G-JPJFN4RHD4', {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  return (
    <div className={`${figtree.variable} font-figtree`}>
      <GoogleAnalytics/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
