import { Heart, BarChart3, Lightbulb, HelpCircle, Settings } from 'lucide-react'

interface BottomNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
  hasCheckedInToday: boolean
}

const BottomNavigation = ({ currentView, onViewChange, hasCheckedInToday }: BottomNavigationProps) => {
  const menuItems = [
    { id: 'checkin', label: 'Check-in', icon: Heart },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'insights', label: 'Wawasan', icon: Lightbulb },
    { id: 'help', label: 'Bantuan', icon: HelpCircle },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:hidden z-40">
      <div className="flex justify-around">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors relative ${
              currentView === item.id
                ? 'text-mint-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs font-medium">{item.label}</span>
            {item.id === 'checkin' && hasCheckedInToday && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-mint-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation