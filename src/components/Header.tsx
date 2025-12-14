import { Heart } from 'lucide-react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-mint-400 to-teal-500 rounded-lg sm:rounded-xl">
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Lunocare</h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Kesadaran dalam setiap hari</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header