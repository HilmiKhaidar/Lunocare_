import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Heart, Brain, Zap, Smile } from 'lucide-react'
import { useHealthStore } from '../store/healthStore'
import StatusIcon from './StatusIcon'
import MetricDisplay from './MetricDisplay'

const DailyCheckIn = () => {
  const { addEntry, updateEntry, getTodayEntry } = useHealthStore()
  const [isCompleted, setIsCompleted] = useState(false)
  const [formData, setFormData] = useState({
    energy: 3,
    focus: 3,
    stress: 3,
    mood: 3,
    sleep: 7,
    water: 6,
    exercise: false,
    notes: '',
  })

  useEffect(() => {
    const todayEntry = getTodayEntry()
    if (todayEntry) {
      setFormData({
        energy: todayEntry.energy,
        focus: todayEntry.focus,
        stress: todayEntry.stress,
        mood: todayEntry.mood,
        sleep: todayEntry.sleep,
        water: todayEntry.water,
        exercise: todayEntry.exercise,
        notes: todayEntry.notes,
      })
      setIsCompleted(true)
    }
  }, [getTodayEntry])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const today = format(new Date(), 'yyyy-MM-dd')
      const todayEntry = getTodayEntry()
      
      console.log('Submitting check-in:', { formData, today, todayEntry })
      
      if (todayEntry) {
        updateEntry(todayEntry.id, formData)
        console.log('Updated existing entry')
      } else {
        addEntry({
          ...formData,
          date: today,
        })
        console.log('Added new entry')
      }
      
      setIsCompleted(true)
    } catch (error) {
      console.error('Error saving check-in:', error)
      // You could add a toast notification here
      alert('Terjadi kesalahan saat menyimpan check-in. Silakan coba lagi.')
    }
  }

  const ScaleInput = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon, 
    color = 'mint',
    lowLabel = 'Rendah',
    highLabel = 'Tinggi'
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    icon: any
    color?: string
    lowLabel?: string
    highLabel?: string
  }) => (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${
          color === 'energetic' ? 'bg-yellow-100' :
          color === 'focused' ? 'bg-blue-100' :
          color === 'stressed' ? 'bg-red-100' :
          color === 'calm' ? 'bg-purple-100' :
          'bg-mint-100'
        }`}>
          <Icon className={`w-5 h-5 ${
            color === 'energetic' ? 'text-yellow-600' :
            color === 'focused' ? 'text-blue-600' :
            color === 'stressed' ? 'text-red-600' :
            color === 'calm' ? 'text-purple-600' :
            'text-mint-600'
          }`} />
        </div>
        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{label}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={`flex-1 h-10 sm:h-12 rounded-lg border-2 transition-all ${
                value === num
                  ? color === 'energetic' ? 'border-yellow-500 bg-yellow-50' :
                    color === 'focused' ? 'border-blue-500 bg-blue-50' :
                    color === 'stressed' ? 'border-red-500 bg-red-50' :
                    color === 'calm' ? 'border-purple-500 bg-purple-50' :
                    'border-mint-500 bg-mint-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`font-medium text-sm sm:text-base ${
                value === num 
                  ? color === 'energetic' ? 'text-yellow-700' :
                    color === 'focused' ? 'text-blue-700' :
                    color === 'stressed' ? 'text-red-700' :
                    color === 'calm' ? 'text-purple-700' :
                    'text-mint-700'
                  : 'text-gray-600'
              }`}>
                {num}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-mint-100 rounded-full mb-4">
            <StatusIcon type="success" size="lg" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Check-in Berhasil
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Anda sudah melakukan check-in hari ini. Setiap langkah kecil menuju kesadaran diri sangat berarti.
          </p>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Ringkasan Check-in Hari Ini</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <MetricDisplay type="energy" value={formData.energy} size="md" />
            <MetricDisplay type="focus" value={formData.focus} size="md" />
            <MetricDisplay type="mood" value={formData.mood} size="md" />
            <MetricDisplay type="stress" value={formData.stress} size="md" />
            <MetricDisplay type="sleep" value={formData.sleep} size="md" />
            <MetricDisplay type="water" value={formData.water} size="md" />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Heart className="w-4 h-4" />
            <span>Olahraga: {formData.exercise ? 'Ya' : 'Tidak'}</span>
          </div>
          
          {formData.notes && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Catatan:</p>
              <p className="text-gray-700 text-sm">{formData.notes}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCompleted(false)}
          className="w-full mt-4 sm:mt-6 btn-secondary text-sm sm:text-base py-3 sm:py-4"
        >
          Edit Check-in
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Check-in Harian
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
          Bagaimana perasaan Anda hari ini? Tidak ada jawaban yang salah.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <ScaleInput
          label="Bagaimana tingkat energi Anda hari ini?"
          value={formData.energy}
          onChange={(value) => setFormData({ ...formData, energy: value })}
          icon={Zap}
          color="energetic"
          lowLabel="Sangat lelah"
          highLabel="Sangat berenergi"
        />

        <ScaleInput
          label="Seberapa fokus Anda merasa saat ini?"
          value={formData.focus}
          onChange={(value) => setFormData({ ...formData, focus: value })}
          icon={Brain}
          color="focused"
          lowLabel="Sulit fokus"
          highLabel="Sangat fokus"
        />

        <ScaleInput
          label="Bagaimana tingkat stres Anda?"
          value={formData.stress}
          onChange={(value) => setFormData({ ...formData, stress: value })}
          icon={Heart}
          color="stressed"
          lowLabel="Sangat tenang"
          highLabel="Sangat stres"
        />

        <ScaleInput
          label="Bagaimana mood Anda secara keseluruhan?"
          value={formData.mood}
          onChange={(value) => setFormData({ ...formData, mood: value })}
          icon={Smile}
          color="calm"
          lowLabel="Kurang baik"
          highLabel="Sangat baik"
        />

        {/* Sleep and Water */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="card">
            <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Berapa jam Anda tidur tadi malam?</h3>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={formData.sleep}
              onChange={(e) => setFormData({ ...formData, sleep: parseFloat(e.target.value) })}
              className="input-field"
              placeholder="7"
            />
          </div>

          <div className="card">
            <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Berapa gelas air yang Anda minum hari ini?</h3>
            <input
              type="number"
              min="0"
              max="20"
              value={formData.water}
              onChange={(e) => setFormData({ ...formData, water: parseInt(e.target.value) })}
              className="input-field"
              placeholder="6"
            />
          </div>
        </div>

        {/* Exercise */}
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Apakah Anda berolahraga hari ini?</h3>
          <div className="flex gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, exercise: true })}
              className={`flex-1 p-2 sm:p-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                formData.exercise
                  ? 'border-mint-500 bg-mint-50 text-mint-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, exercise: false })}
              className={`flex-1 p-2 sm:p-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                !formData.exercise
                  ? 'border-mint-500 bg-mint-50 text-mint-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Tidak
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
            Ada yang ingin Anda catat tentang hari ini? (Opsional)
          </h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input-field resize-none"
            rows={3}
            placeholder="Tulis apa saja yang Anda rasakan atau alami hari ini..."
          />
        </div>

        <button type="submit" className="w-full btn-primary text-sm sm:text-base py-3 sm:py-4">
          Simpan Check-in
        </button>
      </form>
    </div>
  )
}

export default DailyCheckIn