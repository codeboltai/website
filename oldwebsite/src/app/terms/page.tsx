'use client'

import { useEffect } from 'react'
import { FileText, Calendar, AlertTriangle } from 'lucide-react'

export default function TermsOfServicePage() {
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const lastUpdated = "January 15, 2024"

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <FileText className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  TERMS OF <span className="text-red-600">SERVICE</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Please read these terms carefully before using CodeboltAI
              </p>
              <div className="flex items-center justify-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm font-cyber-alt">Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introduction */}
            <div className="bg-card rounded-lg p-6 border border-border mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground font-cyber mb-2">Important Notice</h3>
                  <p className="text-muted-foreground font-cyber-alt text-sm">
                    By accessing and using CodeboltAI, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">1. Acceptance of Terms</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    Welcome to CodeboltAI. These Terms of Service (&quot;Terms&quot;) govern your use of our AI-powered code editor and related services (the &quot;Service&quot;) operated by CodeboltAI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">2. Description of Service</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    CodeboltAI provides an AI-powered code editor that helps developers write, debug, and optimize code using artificial intelligence and machine learning technologies.
                  </p>
                  <p>
                    Our Service includes but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI-assisted code generation and completion</li>
                    <li>Automated debugging and error detection</li>
                    <li>Code optimization suggestions</li>
                    <li>Multi-agent orchestration capabilities</li>
                    <li>Integration with various development tools and platforms</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">3. User Accounts</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    To access certain features of the Service, you may be required to create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate and complete information during registration</li>
                    <li>Promptly updating your account information when necessary</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">4. Acceptable Use</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Transmit malicious code, viruses, or harmful content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">5. Intellectual Property</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of CodeboltAI and its licensors. The Service is protected by copyright, trademark, and other laws.
                  </p>
                  <p>
                    You retain ownership of any code you create using our Service. However, by using our AI features, you grant us a limited license to process and analyze your code to provide the Service.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">6. Privacy and Data Protection</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                  </p>
                  <p>
                    We implement appropriate security measures to protect your personal information and code against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">7. Subscription and Payment</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    Some features of the Service may require a paid subscription. By purchasing a subscription, you agree to pay all applicable fees and charges.
                  </p>
                  <p>
                    Subscription fees are billed in advance and are non-refundable except as required by law or as specifically stated in these Terms.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">8. Limitation of Liability</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    In no event shall CodeboltAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">9. Termination</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                  <p>
                    If you wish to terminate your account, you may simply discontinue using the Service.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">10. Changes to Terms</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-4">11. Contact Information</h2>
                <div className="text-muted-foreground font-cyber-alt space-y-4">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="font-cyber">Email: legal@codebolt.ai</p>
                    <p className="font-cyber">Address: CodeboltAI Legal Department</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}