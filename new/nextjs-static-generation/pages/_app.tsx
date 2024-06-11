import '../styles/globals.css'
import '../assets/css/tailwind.css'
import "../assets/css/materialdesignicons.min.css"
import type { AppProps } from 'next/app'
import { Figtree } from 'next/font/google'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${figtree.variable} font-figtree`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
