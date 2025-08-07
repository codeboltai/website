'use client'

import { useState } from 'react'
import { Mail, Phone, Send, User, MessageSquare, Building2, Users, Handshake } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

interface FormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  partnershipType: string
  message: string
}

export default function PartnersPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.partnershipType.trim()) newErrors.partnershipType = 'Partnership type is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !acceptTerms) return

    setIsSubmitting(true)
    
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mailto link with form data
      const subject = 'Partnership Inquiry'
      const body = `
Company Name: ${formData.companyName}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Partnership Type: ${formData.partnershipType}

Message:
${formData.message}
      `.trim()
      
      const mailtoLink = `mailto:partnerships@codebolt.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoLink, '_blank')
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        partnershipType: '',
        message: ''
      })
      setAcceptTerms(false)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const partnershipTypes = [
    { value: '', label: 'Select Partnership Type' },
    { value: 'technology', label: 'Technology Integration' },
    { value: 'reseller', label: 'Reseller Partnership' },
    { value: 'strategic', label: 'Strategic Alliance' },
    { value: 'channel', label: 'Channel Partner' },
    { value: 'consulting', label: 'Consulting Partner' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Handshake className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  PARTNER <span className="text-red-600">WITH US</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Join our ecosystem and help shape the future of AI-powered development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber mb-4">
              Why Partner With CodeboltAI
            </h2>
            <p className="text-lg text-muted-foreground font-cyber-alt max-w-2xl mx-auto">
              Build innovative solutions together and unlock new opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-red-600 mb-4 flex justify-center">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground font-cyber mb-3">
                Technology Integration
              </h3>
              <p className="text-muted-foreground font-cyber-alt">
                Integrate your tools and services with our AI platform to reach more developers
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-red-600 mb-4 flex justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground font-cyber mb-3">
                Market Expansion
              </h3>
              <p className="text-muted-foreground font-cyber-alt">
                Access our growing community of developers and expand your market reach
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-red-600 mb-4 flex justify-center">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground font-cyber mb-3">
                Strategic Alliance
              </h3>
              <p className="text-muted-foreground font-cyber-alt">
                Build long-term strategic relationships that drive mutual growth and innovation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-black">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800/10 select-none font-cyber-heavy leading-none">
            PARTNER
          </h1>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-cyber-heavy">
                  LET'S COLLABORATE
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed font-cyber-alt">
                  Ready to build something amazing together? We're always looking for innovative partners 
                  who share our vision of transforming software development with AI.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-cyber-alt">Email us</p>
                    <p className="text-white font-cyber">partnerships@codebolt.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-cyber-alt">Call us</p>
                    <p className="text-white font-cyber">+1 333 454 55 44</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Company Name"
                      className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                        errors.companyName ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    <Building2 className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.companyName && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.companyName}</p>}
                </div>

                {/* Contact Name */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                        errors.contactName ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    <User className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.contactName && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.contactName}</p>}
                </div>

                {/* Email and Phone in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                          errors.email ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      <Mail className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                          errors.phone ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      <Phone className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.phone}</p>}
                  </div>
                </div>

                {/* Partnership Type */}
                <div>
                  <div className="relative">
                    <select
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent border-b-2 pb-3 text-white focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                        errors.partnershipType ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      {partnershipTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-black text-white">
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <Handshake className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.partnershipType && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.partnershipType}</p>}
                </div>

                {/* Message Textarea */}
                <div>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your partnership idea..."
                      rows={4}
                      className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors resize-none font-cyber-alt ${
                        errors.message ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    <MessageSquare className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.message && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.message}</p>}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-yellow-500 bg-transparent border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <label htmlFor="acceptTerms" className="text-gray-300 text-sm font-cyber-alt">
                    I accept the{' '}
                    <a href="/terms" className="text-yellow-500 hover:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-yellow-500 hover:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !acceptTerms}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 font-cyber flex items-center justify-center space-x-2"
                    shape="gaming"
                    size="lg"
                    variant="primary"
                  >
                    <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT PARTNERSHIP INQUIRY'}</span>
                    {!isSubmitting && <Send className="w-5 h-5" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}