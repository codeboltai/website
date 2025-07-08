'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Apple, Monitor, Smartphone } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function DownloadPage() {
  const [os, setOs] = useState<'windows' | 'mac' | 'other'>('other')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('win')) {
      setOs('windows')
    } else if (userAgent.includes('mac')) {
      setOs('mac')
    } else {
      setOs('other')
    }
  }, [])

  const getOSSpecificDownload = () => {
    switch (os) {
      case 'windows':
        return {
          title: 'Select an option to download the CodeboltAI Editor for Windows',
          options: [
            { label: 'Download for x64', primary: true },
            { label: 'Download for arm64', primary: false }
          ]
        }
      case 'mac':
        return {
          title: 'Select an option to download the CodeboltAI Editor for macOS',
          options: [
            { label: 'Download for Apple Silicon', primary: true },
            { label: 'Download for Intel', primary: false }
          ]
        }
      default:
        return {
          title: 'Download CodeboltAI Editor',
          options: [
            { label: 'Download Editor', primary: true }
          ]
        }
    }
  }

  const osSpecific = getOSSpecificDownload()

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28">
      {/* OS-Specific Download Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 rounded-lg p-8 md:p-12 text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-cyber">
              {osSpecific.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              {osSpecific.options.map((option, index) => (
                <Button
                  key={index}
                  variant={option.primary ? "primary" : "outline"}
                  size="lg"
                  shape="gaming"
                  className="font-cyber min-w-[200px]"
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <p className="text-gray-600 text-sm font-cyber-alt">
              Not using {os === 'windows' ? 'Windows' : os === 'mac' ? 'macOS' : 'this OS'}? 
              <a href="#all-downloads" className="text-red-600 hover:text-red-700 underline ml-1">
                View all download options
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Platforms Section */}
      <section id="all-downloads" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cyber-heavy">
              Available wherever you want it
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mac */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center mb-6">
                <Apple className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 font-cyber">Mac</h3>
              </div>
              
              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber bg-red-600 hover:bg-red-700"
                >
                  Download for Apple Silicon
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Download for Intel
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="font-semibold mb-2">Minimum Requirements:</p>
                <p>macOS versions with Apple security update support. This is typically the latest release and the two previous versions. 10.15 is not supported.</p>
              </div>
            </motion.div>

            {/* Windows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center mb-6">
                <Monitor className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 font-cyber">Windows</h3>
              </div>
              
              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber bg-red-600 hover:bg-red-700"
                >
                  Download for x64
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Download for arm64
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="font-semibold mb-2">Minimum Requirements:</p>
                <p>Windows 10 (64-bit)</p>
              </div>
            </motion.div>

            {/* Linux */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center mb-6">
                <Smartphone className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 font-cyber">Linux</h3>
              </div>
              
              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber bg-red-600 hover:bg-red-700"
                >
                  Download
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p className="font-semibold mb-2">Minimum Requirements:</p>
                <p>glibc {'>='} 2.28, glibc++ {'>='} 3.4.25 (e.g. Ubuntu 20, Debian 10, Fedora 36, RHEL 8)</p>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-sm">
              Want to download an older version? 
              <a href="#releases" className="text-red-600 hover:text-red-700 underline ml-1">
                View all releases
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 