import { useState } from 'react'
import { Heart, Menu, X, BarChart3, Lightbulb } from 'lucide-react'
import { useHealthStore } from './store/healthStore'
import Header from './components/Header'
import DailyCheckIn from './components/DailyCheckIn'
import Dashboard from './components/Dashboard'
import Insights from './components/Insights'
import StatusIcon from './components/StatusIcon'
import BottomNavigation from './components/BottomNavigation'

type View = 'checkin' | 'dashboard' | 'insights'

function App() {
  const [currentView, setCurrentView] = useState<View>('checkin')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { hasCheckedInToday } = useHealthStore()

  const renderView = () => {
    switch (currentView) {
      case 'checkin':
        return <DailyCheckIn />
      case 'dashboard':
        return <Dashboard />
      case 'insights':
        return <Insights />
      default:
        return <DailyCheckIn />
    }
  }

  const menuItems = [
    { id: 'checkin', label: 'Check-in Harian', icon: Heart },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'insights', label: 'Wawasan', icon: Lightbulb },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Mobile Menu Button - Hidden since we use bottom nav */}
      <div className="hidden">
        {/* Mobile navigation moved to bottom */}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <nav className="fixed left-0 top-20 h-full w-72 bg-white shadow-sm border-r border-gray-100">
          <div className="p-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`w-full text-left p-4 rounded-xl transition-colors flex items-center gap-3 ${
                    currentView === item.id
                      ? 'bg-mint-100 text-mint-700 border border-mint-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            {hasCheckedInToday() && (
              <div className="mt-8 p-4 bg-mint-50 rounded-xl border border-mint-200">
                <div className="flex items-center gap-2">
                  <StatusIcon type="success" size="sm" />
                  <p className="text-sm text-mint-700">
                    Anda sudah check-in hari ini. Terima kasih sudah meluangkan waktu untuk diri sendiri!
                  </p>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as View)}
        hasCheckedInToday={hasCheckedInToday()}
      />
    </div>
  )
}

export default App