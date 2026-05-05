'use client'

import { CTASection as CTASectionTemplate } from '@/templatesections'

export default function CTASection() {
    return (
        <CTASectionTemplate
            title={"Stop building alone.\nStart leading a swarm."}
            description="Deploy your first AI agent swarm. Build 24/7. Wake up to completed features."
            ctaText="Download Codebolt"
            ctaHref="/download"
            releaseType="Public Release"
            buildBadge="macOS • Windows • Linux"
        />
    )
}
