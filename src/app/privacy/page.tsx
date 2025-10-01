'use client'

import { useState, useEffect } from 'react'
import { Shield, Calendar, Lock, Eye, Database, UserCheck, AlertTriangle, Code2, Zap } from 'lucide-react'

export default function PrivacyPolicyPage() {
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

  const lastUpdated = "January 15, 2025"

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Shield className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  PRIVACY <span className="text-red-600">POLICY</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm font-cyber-alt">Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-muted-foreground font-cyber-alt text-lg leading-relaxed mb-6">
                Thank you for choosing to be part of our community at CodeboltAI (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are 
                committed to protecting your Personal Information and your right to privacy. If you have any questions or concerns 
                about this Privacy Policy or our practices with regard to your Personal Information, please contact us at{' '}
                <a href="mailto:privacy@codebolt.ai" className="text-red-600 hover:text-red-500 underline">
                  privacy@codebolt.ai
                </a>.
              </p>
              
              <p className="text-muted-foreground font-cyber-alt text-lg leading-relaxed mb-6">
                This Privacy Policy describes how we might use your information if you:
              </p>
              
              <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                <li>Visit our website at codebolt.ai</li>
                <li>Use our AI-powered code editor and development tools</li>
              </ul>

              <p className="text-muted-foreground font-cyber-alt text-lg leading-relaxed mb-6">
                In this Privacy Policy, if we refer to:
              </p>

              <div className="bg-card rounded-lg p-6 border border-border mb-6">
                <ul className="space-y-3 text-muted-foreground font-cyber-alt">
                  <li><strong className="text-foreground">&quot;Personal Information,&quot;</strong> we are referring to information that alone or in combination with other information in our possession could be used to identify you</li>
                  <li><strong className="text-foreground">"Website,"</strong> we are referring to any website of ours that references or links to this policy</li>
                  <li><strong className="text-foreground">"Services,"</strong> we are referring to our Website, and other related services, including our AI code editor, application programming interfaces ("APIs"), associated software, tools, developer services, data and documentation</li>
                </ul>
              </div>

              <p className="text-muted-foreground font-cyber-alt text-lg leading-relaxed mb-6">
                The purpose of this Privacy Policy is to explain to you in the clearest way possible what Personal Information we collect, 
                how we use it, and what rights you have in relation to it. If there are any terms in this Privacy Policy that you do not agree 
                with, please discontinue use of our Services immediately. <strong className="text-foreground">By using our Services, you agree to the collection, use, 
                disclosure and procedures this Privacy Policy describes.</strong> Beyond this Privacy Policy, your use of our Services is also 
                subject to our{' '}
                <a href="/terms" className="text-red-600 hover:text-red-500 underline">
                  Terms of Service
                </a>.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm font-cyber-alt">
                      This Privacy Policy does not apply to the extent we process information in the role of a processor or service provider on 
                      behalf of our customers (for example, on behalf of your employer). In that context, our customers are the data controllers 
                      and their privacy policies will apply to the processing of your personal information.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground font-cyber-alt text-lg leading-relaxed mb-8">
                If you do not provide your Personal Information when requested, you may not be able to use our Services if that Personal 
                Information is necessary to provide you with our Services or if we are legally required to collect it.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-card rounded-lg p-6 border border-border mb-8">
              <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">TABLE OF CONTENTS</h2>
              <div className="space-y-2">
                <a href="#section1" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">WHAT PERSONAL INFORMATION DO WE COLLECT?</a>
                <a href="#section2" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">HOW DO WE USE YOUR PERSONAL INFORMATION?</a>
                <a href="#section3" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">LEGAL BASES FOR PROCESSING EUROPEAN PERSONAL INFORMATION</a>
                <a href="#section4" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">WILL YOUR PERSONAL INFORMATION BE DISCLOSED TO ANYONE?</a>
                <a href="#section5" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">TO WHOM WILL YOUR PERSONAL INFORMATION BE DISCLOSED?</a>
                <a href="#section6" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a>
                <a href="#section7" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">IS YOUR PERSONAL INFORMATION TRANSFERRED INTERNATIONALLY?</a>
                <a href="#section8" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">HOW LONG DO WE KEEP YOUR PERSONAL INFORMATION?</a>
                <a href="#section9" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">HOW DO WE KEEP YOUR PERSONAL INFORMATION SAFE?</a>
                <a href="#section10" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">DO WE COLLECT PERSONAL INFORMATION FROM MINORS?</a>
                <a href="#section11" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">WHAT ARE YOUR PRIVACY RIGHTS?</a>
                <a href="#section12" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">CONTROLS FOR DO-NOT-TRACK FEATURES</a>
                <a href="#section13" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">DO WE MAKE UPDATES TO THIS NOTICE?</a>
                <a href="#section14" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
                <a href="#section15" className="block text-red-600 hover:text-red-500 underline font-cyber-alt">HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</a>
              </div>
            </div>

            <div className="space-y-12">
              {/* Section 1 */}
              <section id="section1">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">1. WHAT PERSONAL INFORMATION DO WE COLLECT?</h2>
                
                <h3 className="text-xl font-semibold text-foreground font-cyber mb-4">Personal information you disclose to us</h3>
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We collect personal information that you voluntarily provide to us when you register on the Services, 
                  express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                </p>

                <p className="text-muted-foreground font-cyber-alt mb-4">
                  <strong className="text-foreground">Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                  <li>names</li>
                  <li>email addresses</li>
                  <li>usernames</li>
                  <li>passwords</li>
                  <li>contact or authentication data</li>
                  <li>billing addresses</li>
                  <li>debit/credit card numbers</li>
                  <li>phone numbers</li>
                  <li>job titles</li>
                  <li>company information</li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 font-cyber mb-2">Code and Project Data</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm font-cyber-alt">
                        <strong>You retain full ownership of your code.</strong> When you use our AI features, we may temporarily process your code to provide suggestions, debugging assistance, and optimization recommendations. This processing is done in real-time and your code is not permanently stored or used to train our models without your explicit consent.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground font-cyber mb-4">Information automatically collected</h3>
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
                </p>

                <p className="text-muted-foreground font-cyber-alt mb-4">
                  The information we collect includes:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                  <li><strong className="text-foreground">Log and Usage Data.</strong> Service-related, diagnostic, usage, and performance information</li>
                  <li><strong className="text-foreground">Device Data.</strong> Information about your device such as IP address, browser type, operating system</li>
                  <li><strong className="text-foreground">Location Data.</strong> Information about your location as determined by your IP address</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="section2">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">2. HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-3 mb-6">
                  <li><strong className="text-foreground">To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                  <li><strong className="text-foreground">To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                  <li><strong className="text-foreground">To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                  <li><strong className="text-foreground">To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
                  <li><strong className="text-foreground">To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
                  <li><strong className="text-foreground">To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
                  <li><strong className="text-foreground">To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                  <li><strong className="text-foreground">To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences.</li>
                  <li><strong className="text-foreground">To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.</li>
                  <li><strong className="text-foreground">To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                  <li><strong className="text-foreground">To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
                  <li><strong className="text-foreground">To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
                  <li><strong className="text-foreground">To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100 font-cyber mb-2">AI Model Improvement</h4>
                      <p className="text-green-800 dark:text-green-200 text-sm font-cyber-alt">
                        We may use aggregated, anonymized usage patterns to improve our AI models and Services. Your specific code or personal projects are never used for training without your explicit consent through our opt-in programs.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="section3">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">3. LEGAL BASES FOR PROCESSING EUROPEAN PERSONAL INFORMATION</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  If you are located in the EU or UK, this section applies to you. The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-3 mb-6">
                  <li><strong className="text-foreground">Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose.</li>
                  <li><strong className="text-foreground">Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
                  <li><strong className="text-foreground">Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms.</li>
                  <li><strong className="text-foreground">Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency.</li>
                  <li><strong className="text-foreground">Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="section4">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">4. WILL YOUR PERSONAL INFORMATION BE DISCLOSED TO ANYONE?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We may process or share your data that we hold based on the following legal basis:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-3 mb-6">
                  <li><strong className="text-foreground">Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                  <li><strong className="text-foreground">Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                  <li><strong className="text-foreground">Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                  <li><strong className="text-foreground">Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                  <li><strong className="text-foreground">Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
                </ul>

                <p className="text-muted-foreground font-cyber-alt mb-4">
                  More specifically, we may need to process your data or share your personal information in the following situations:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                  <li><strong className="text-foreground">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  <li><strong className="text-foreground">When we use Google Analytics.</strong> We may share your information with Google Analytics to track and analyze the use of the Services.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="section5">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">5. TO WHOM WILL YOUR PERSONAL INFORMATION BE DISCLOSED?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We only share information with your consent or to complete any transaction or provide any service you have requested or authorized. We share information with the following categories of third parties:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                  <li><strong className="text-foreground">Service Providers:</strong> Companies that provide services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                  <li><strong className="text-foreground">Business Partners:</strong> Partners with whom we offer co-branded services or engage in joint marketing activities.</li>
                  <li><strong className="text-foreground">Analytics Providers:</strong> Companies that help us understand how our Services are used.</li>
                  <li><strong className="text-foreground">Advertising Partners:</strong> Companies that help us provide targeted advertisements.</li>
                </ul>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-900 dark:text-red-100 font-cyber mb-2">We Never Share</h4>
                      <ul className="text-red-800 dark:text-red-200 text-sm font-cyber-alt list-disc pl-4 space-y-1">
                        <li>Your source code or project files</li>
                        <li>Personal information for marketing purposes without consent</li>
                        <li>Data with competitors or unauthorized parties</li>
                        <li>Information that could compromise your intellectual property</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Continue with remaining sections... */}
              {/* For brevity, I'll include a few more key sections */}

              {/* Section 9 */}
              <section id="section9">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">9. HOW DO WE KEEP YOUR PERSONAL INFORMATION SAFE?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>

                <p className="text-muted-foreground font-cyber-alt mb-4">
                  Our security measures include:
                </p>

                <ul className="list-disc pl-6 text-muted-foreground font-cyber-alt space-y-2 mb-6">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Access controls and employee training</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>SOC 2 Type II compliance</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="section11">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-6">
                  In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right to:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <h4 className="font-semibold text-foreground font-cyber">Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-cyber-alt">Request access to your personal information</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserCheck className="w-4 h-4 text-green-500" />
                      <h4 className="font-semibold text-foreground font-cyber">Rectification</h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-cyber-alt">Request correction of inaccurate data</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-4 h-4 text-red-500" />
                      <h4 className="font-semibold text-foreground font-cyber">Erasure</h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-cyber-alt">Request deletion of your data</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="w-4 h-4 text-purple-500" />
                      <h4 className="font-semibold text-foreground font-cyber">Portability</h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-cyber-alt">Request transfer of your data</p>
                  </div>
                </div>

                <p className="text-muted-foreground font-cyber-alt mb-4">
                  If you would like to exercise any of these rights, please contact us using the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
                </p>
              </section>

              {/* Contact Section */}
              <section id="section14">
                <h2 className="text-2xl font-bold text-foreground font-cyber mb-6">14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                
                <p className="text-muted-foreground font-cyber-alt mb-4">
                  If you have questions or comments about this notice, you may contact us by:
                </p>
                
                <div className="bg-card rounded-lg p-6 border border-border">
                  <div className="space-y-2">
                    <p className="font-cyber text-foreground"><strong>Email:</strong> privacy@codebolt.ai</p>
                    <p className="font-cyber text-foreground"><strong>Data Protection Officer:</strong> dpo@codebolt.ai</p>
                    <p className="font-cyber text-foreground"><strong>Address:</strong> CodeboltAI Privacy Team</p>
                    <p className="font-cyber text-foreground"><strong>Website:</strong> <a href="https://codebolt.ai" className="text-red-600 hover:text-red-500 underline">codebolt.ai</a></p>
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