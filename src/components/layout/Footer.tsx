'use client'

import FooterContent from '../ui/FooterContent'
import HeroCTASection from '../ui/HeroCTASection'

export default function Footer() {
  return (
    <>
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
      <FooterContent colorScheme="grey" />
    </>
  )
} 