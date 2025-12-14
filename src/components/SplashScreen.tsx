import { useState, useEffect } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Mempersiapkan aplikasi...')

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Mempersiapkan aplikasi...' },
      { progress: 40, text: 'Memuat data personal...' },
      { progress: 60, text: 'Menyiapkan refleksi kesehatan...' },
      { progress: 80, text: 'Hampir siap...' },
      { progress: 100, text: 'Selamat datang!' }
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress)
        setLoadingText(loadingSteps[currentStep].text)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-mint-500 to-teal-500 flex flex-col items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-white rounded-full animate-pulse-slow delay-300"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-white rounded-full animate-pulse-slow delay-700"></div>
        <div className="absolute bottom-32 right-10 w-8 h-8 bg-white rounded-full animate-pulse-slow delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative mx-auto">
            {/* Outer Ring */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-white border-opacity-30 rounded-full flex items-center justify-center animate-spin-slow">
              {/* Inner Circle */}
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {/* Heart Icon */}
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className="mb-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
            Lunocare
          </h1>
          <p className="text-lg lg:text-xl text-white text-opacity-90 font-medium">
            Kesadaran dalam setiap hari
          </p>
        </div>

        {/* Loading Progress */}
        <div className="mt-12 mb-6 w-full max-w-xs mx-auto">
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Loading Text */}
          <p className="text-white text-opacity-80 text-sm lg:text-base font-medium">
            {loadingText}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white text-opacity-70 text-xs lg:text-sm">
          Bagian dari ekosistem Lunetix
        </p>
        <p className="text-white text-opacity-60 text-xs mt-1">
          v2.0.0 • by Lunetix Health Team
        </p>
      </div>
    </div>
  )
}

export default SplashScreen