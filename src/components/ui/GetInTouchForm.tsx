'use client'

import { useState } from 'react'
import { Mail, Phone, Send, User, MessageSquare } from 'lucide-react'
import Button from './Button'
import AnimatedBackground from './AnimatedBackground'

interface FormData {
  name: string
  email: string
  message: string
}

export default function GetInTouchForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
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
      const subject = 'Contact Form Submission'
      const body = `
        Name: ${formData.name}
        Email: ${formData.email}

        Message:
        ${formData.message}
      `.trim()
      
      const mailtoLink = `mailto:info@codebolt.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoLink, '_blank')
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setAcceptTerms(false)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800/10 select-none font-cyber-heavy leading-none">
          CONTACT
        </h1>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-cyber-heavy">
              GET IN TOUCH
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-cyber-alt">
                Feel free to get in touch with me. I am always open to discussing new projects, 
                creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-cyber-alt">Mail me</p>
                  <p className="text-white font-cyber">info@codebolt.ai</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-cyber-alt">Call me</p>
                  <p className="text-white font-cyber">+1 333 454 55 44</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your Name"
                    className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  <User className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter a valid email address"
                    className={`w-full bg-transparent border-b-2 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors font-cyber-alt ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  <Mail className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-2 font-cyber-alt">{errors.email}</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
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
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !acceptTerms}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 font-cyber flex items-center justify-center space-x-2 font-cyber"
                  shape="gaming"
                  size="lg"
                  variant="primary"
                >
                  <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}</span>
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}