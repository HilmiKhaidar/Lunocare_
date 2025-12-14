import { useState } from 'react'
import { Download, Trash2, Bell, Moon, Sun, Smartphone, AlertCircle, RotateCcw } from 'lucide-react'
import { useHealthStore } from '../store/healthStore'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const Settings = () => {
  const { entries } = useHealthStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('lunocare-theme') || 'system')
  const [notifications, setNotifications] = useState(
    localStorage.getItem('lunocare-notifications') === 'true'
  )

  const exportData = () => {
    if (entries.length === 0) {
      alert('Tidak ada data untuk diekspor')
      return
    }

    const csvHeaders = [
      'Tanggal',
      'Energi',
      'Fokus', 
      'Stres',
      'Mood',
      'Tidur (jam)',
      'Air (gelas)',
      'Olahraga',
      'Catatan',
      'Dibuat'
    ]

    const csvData = entries.map(entry => [
      entry.date,
      entry.energy,
      entry.focus,
      entry.stress,
      entry.mood,
      entry.sleep,
      entry.water,
      entry.exercise ? 'Ya' : 'Tidak',
      `"${entry.notes.replace(/"/g, '""')}"`, // Escape quotes
      format(new Date(entry.createdAt), 'yyyy-MM-dd HH:mm:ss')
    ])

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `lunocare-data-${format(new Date(), 'yyyy-MM-dd')}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAllData = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('lunocare-theme', newTheme)
    
    // Apply theme (basic implementation)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const handleNotificationToggle = (enabled: boolean) => {
    setNotifications(enabled)
    localStorage.setItem('lunocare-notifications', enabled.toString())
    
    if (enabled && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notifications enabled')
        }
      })
    }
  }

  const installPWA = () => {
    // This will be handled by PWAInstallButton component
    alert('Gunakan tombol install yang muncul di browser atau menu "Add to Home Screen"')
  }

  const resetSplashScreen = () => {
    localStorage.removeItem('lunocare-splash-seen')
    alert('Splash screen akan muncul lagi saat aplikasi dimuat ulang')
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pengaturan</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Kelola preferensi dan data aplikasi Anda
        </p>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kelola Data</h3>
        
        <div className="space-y-3">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Download className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Ekspor Data
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {entries.length} entri tersimpan • Format CSV
                  </p>
                </div>
              </div>
              <button
                onClick={exportData}
                disabled={entries.length === 0}
                className="btn-secondary text-xs sm:text-sm px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ekspor
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Hapus Semua Data
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Menghapus semua check-in dan pengaturan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferensi</h3>
        
        <div className="space-y-3">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-purple-600" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Tema Aplikasi
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Pilih tampilan yang nyaman untuk Anda
                  </p>
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 py-1 focus:border-mint-500 focus:outline-none"
              >
                <option value="system">Sistem</option>
                <option value="light">Terang</option>
                <option value="dark">Gelap</option>
              </select>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Notifikasi Pengingat
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Pengingat lembut untuk check-in harian
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => handleNotificationToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint-600"></div>
              </label>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Reset Splash Screen
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Tampilkan kembali splash screen saat membuka aplikasi
                  </p>
                </div>
              </div>
              <button
                onClick={resetSplashScreen}
                className="btn-secondary text-xs sm:text-sm px-3 py-2"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PWA */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aplikasi</h3>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-mint-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  Install Aplikasi
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Tambahkan ke home screen untuk akses cepat
                </p>
              </div>
            </div>
            <button
              onClick={installPWA}
              className="btn-secondary text-xs sm:text-sm px-3 py-2"
            >
              Install
            </button>
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="card bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Informasi Penyimpanan</h4>
        <div className="space-y-1 text-xs sm:text-sm text-gray-600">
          <p>• Data tersimpan lokal di perangkat Anda</p>
          <p>• Total entri: {entries.length}</p>
          <p>• Ukuran data: ~{Math.round(JSON.stringify(entries).length / 1024)} KB</p>
          <p>• Terakhir diperbarui: {entries.length > 0 ? format(new Date(entries[entries.length - 1].createdAt), 'dd MMM yyyy', { locale: id }) : 'Belum ada data'}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Konfirmasi Hapus</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary text-sm py-2"
              >
                Batal
              </button>
              <button
                onClick={clearAllData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings