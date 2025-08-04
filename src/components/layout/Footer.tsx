'use client'

import { usePathname } from 'next/navigation'
import FooterContent from '../ui/FooterContent'
import HeroCTASection from '../ui/HeroCTASection'

export default function Footer() {
  const pathname = usePathname()
  
  // Define routes that should NOT show the HeroCTASection
  const hideHeroCTARoutes = [
    '/agents',
    '/mcp-tools'
  ]
  
  // Check if current path should hide the HeroCTASection
  const shouldHideHeroCTA = hideHeroCTARoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  return (
    <>
      {!shouldHideHeroCTA && (
        <HeroCTASection
          title="Ready to Transform Your Development Workflow?"
          buttons={[
            {
              text: "Start Building Now",
              variant: "primary",
              size: "lg",
              shape: "gaming",
              className: "bg-red-600 hover:bg-red-700 text-white font-cyber"
            },
            {
              text: "Watch Demo",
              variant: "outline",
              size: "lg",
              shape: "cyber",
              className: "border-white text-white hover:bg-white hover:text-gray-900 font-cyber"
            }
          ]}
          showIsometricCube={true}
          showBrandOverlay={true}
          brandText="CodeboltAI"
        />
      )}
      <FooterContent colorScheme="grey" />
    </>
  )
} 