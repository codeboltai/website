// GoogleAnalytics.tsx

import React from 'react';
import Script from 'next/script';

const GA_TRACKING_ID = 'G-JPJFN4RHD4';
const GoogleAnalytics = () => {
  return (
    <>
      <Script
           strategy="afterInteractive"
           src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
         />
         <Script
           id="google-analytics"
           strategy="afterInteractive"
           dangerouslySetInnerHTML={{
             __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${GA_TRACKING_ID}', {
                 page_path: window.location.pathname,
               });
             `,
           }}
         />
    </>
  );
};

export default GoogleAnalytics;