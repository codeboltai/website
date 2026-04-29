import ComplianceSecurityPostureSection from '@/components/sections/enterprise/ComplianceSecurityPostureSection'
import ComputeTopologySection from '@/components/sections/enterprise/ComputeTopologySection'
import EnterpriseHeroSection from '@/components/sections/enterprise/EnterpriseHeroSection'
import IntegrityMandateSection from '@/components/sections/enterprise/IntegrityMandateSection'
import SequenceProtocolSection from '@/components/sections/enterprise/SequenceProtocolSection'
import { SectionWrapper } from '@/components/sections/enterprise/EnterpriseShared'

export default function EnterprisePageSection() {
  return (
    <SectionWrapper>
      <EnterpriseHeroSection />
      <IntegrityMandateSection />
      <ComplianceSecurityPostureSection />
      <ComputeTopologySection />
      <SequenceProtocolSection />
    </SectionWrapper>
  )
}

