import NewPricingHeroSection from '@/components/sections/pricing/NewPricingHeroSection'
import NewPricingPlansSection from '@/components/sections/pricing/NewPricingPlansSection'

export default function NewPricingPageSection() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="min-h-screen py-32 px-6 font-sans border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <NewPricingHeroSection />
          <NewPricingPlansSection />
        </div>
      </section>
    </div>
  )
}

