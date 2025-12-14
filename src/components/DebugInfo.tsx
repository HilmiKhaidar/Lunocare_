import { useState } from 'react'
import { Bug, ChevronDown, ChevronUp } from 'lucide-react'
import { useHealthStore } from '../store/healthStore'
import { isLocalStorageAvailable } from '../utils/storage'

const DebugInfo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { entries } = useHealthStore()

  // Only show in development
  if (import.meta.env.MODE === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm"
      >
        <Bug className="w-4 h-4" />
        Debug
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-sm max-h-60 overflow-auto">
          <div className="space-y-2">
            <div>
              <strong>localStorage:</strong> {isLocalStorageAvailable() ? '✅ Available' : '❌ Not Available'}
            </div>
            <div>
              <strong>crypto.randomUUID:</strong> {typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? '✅ Available' : '❌ Not Available'}
            </div>
            <div>
              <strong>Entries count:</strong> {entries.length}
            </div>
            <div>
              <strong>Last entry:</strong> {entries.length > 0 ? entries[entries.length - 1].date : 'None'}
            </div>
            <div>
              <strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}...
            </div>
            <button
              onClick={() => {
                console.log('Current store state:', { entries })
                console.log('localStorage content:', localStorage.getItem('lunocare-health-data'))
              }}
              className="mt-2 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
            >
              Log State
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="mt-2 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs ml-2"
            >
              Clear Storage
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DebugInfo