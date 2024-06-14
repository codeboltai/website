import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/navbar'

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth" dir="ltr">
      <Head />
      <body className={`text-base text-slate-900 dark:text-white dark:bg-slate-900`}>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}