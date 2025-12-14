import { format, subDays, eachDayOfInterval } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar, TrendingUp, Heart, Zap, Brain, Smile, Moon, Droplets } from 'lucide-react'
import { useHealthStore } from '../store/healthStore'
import MetricDisplay from './MetricDisplay'

const Dashboard = () => {
  const { entries, getWeekEntries, getAverages } = useHealthStore()
  
  const weekEntries = getWeekEntries()
  const weekAverages = getAverages(weekEntries)
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  })

  const getEntryForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return entries.find(entry => entry.date === dateStr)
  }

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    unit = '',
    description 
  }: {
    title: string
    value: number
    icon: any
    color: string
    unit?: string
    description: string
  }) => (
    <div className="card">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className={`p-1.5 sm:p-2 rounded-lg ${
          color === 'energetic' ? 'bg-yellow-100' :
          color === 'focused' ? 'bg-blue-100' :
          color === 'stressed' ? 'bg-red-100' :
          color === 'calm' ? 'bg-purple-100' :
          color === 'teal' ? 'bg-teal-100' :
          'bg-mint-100'
        }`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
            color === 'energetic' ? 'text-yellow-600' :
            color === 'focused' ? 'text-blue-600' :
            color === 'stressed' ? 'text-red-600' :
            color === 'calm' ? 'text-purple-600' :
            color === 'teal' ? 'text-teal-600' :
            'text-mint-600'
          }`} />
        </div>
        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{title}</h3>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-bold text-gray-900">
          {value > 0 ? value.toFixed(1) : '-'}
        </span>
        {unit && <span className="text-gray-500 text-sm sm:text-base">{unit}</span>}
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">{description}</p>
    </div>
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Ringkasan kesehatan Anda minggu ini
        </p>
      </div>

      {/* Weekly Averages */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          Rata-rata Minggu Ini
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard
            title="Energi"
            value={weekAverages.energy}
            icon={Zap}
            color="energetic"
            unit="/5"
            description="Tingkat energi harian"
          />
          <MetricCard
            title="Fokus"
            value={weekAverages.focus}
            icon={Brain}
            color="focused"
            unit="/5"
            description="Kemampuan berkonsentrasi"
          />
          <MetricCard
            title="Mood"
            value={weekAverages.mood}
            icon={Smile}
            color="calm"
            unit="/5"
            description="Suasana hati keseluruhan"
          />
          <MetricCard
            title="Stres"
            value={weekAverages.stress}
            icon={Heart}
            color="stressed"
            unit="/5"
            description="Tingkat stres yang dirasakan"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
          <MetricCard
            title="Tidur"
            value={weekAverages.sleep}
            icon={Moon}
            color="mint"
            unit=" jam"
            description="Durasi tidur per malam"
          />
          <MetricCard
            title="Hidrasi"
            value={weekAverages.water}
            icon={Droplets}
            color="teal"
            unit=" gelas"
            description="Konsumsi air per hari"
          />
        </div>
      </div>

      {/* 7-Day Overview */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          7 Hari Terakhir
        </h3>
        
        <div className="card">
          <div className="space-y-4">
            {last7Days.map((date) => {
              const entry = getEntryForDate(date)
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              
              return (
                <div 
                  key={date.toISOString()}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg gap-2 sm:gap-0 ${
                    isToday ? 'bg-mint-50 border border-mint-200' : 'bg-gray-50'
                  }`}
                >
                  <div>
                    <h4 className={`font-medium ${isToday ? 'text-mint-700' : 'text-gray-900'}`}>
                      {format(date, 'EEEE', { locale: id })}
                      {isToday && ' (Hari ini)'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {format(date, 'd MMMM', { locale: id })}
                    </p>
                  </div>
                  
                  {entry ? (
                    <div className="flex gap-3 sm:gap-4 text-sm overflow-x-auto">
                      <div className="min-w-0 flex-shrink-0">
                        <MetricDisplay 
                          type="energy" 
                          value={entry.energy} 
                          size="sm" 
                          showLabel={false}
                        />
                      </div>
                      <div className="min-w-0 flex-shrink-0">
                        <MetricDisplay 
                          type="focus" 
                          value={entry.focus} 
                          size="sm" 
                          showLabel={false}
                        />
                      </div>
                      <div className="min-w-0 flex-shrink-0">
                        <MetricDisplay 
                          type="mood" 
                          value={entry.mood} 
                          size="sm" 
                          showLabel={false}
                        />
                      </div>
                      <div className="min-w-0 flex-shrink-0">
                        <MetricDisplay 
                          type="sleep" 
                          value={entry.sleep} 
                          size="sm" 
                          showLabel={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Belum check-in
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Statistik Cepat</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-mint-600 mb-1">
              {entries.length}
            </div>
            <p className="text-sm text-gray-600">Total check-in</p>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-teal-600 mb-1">
              {weekEntries.length}
            </div>
            <p className="text-sm text-gray-600">Check-in minggu ini</p>
          </div>
          
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {weekEntries.filter(e => e.exercise).length}
            </div>
            <p className="text-sm text-gray-600">Hari olahraga minggu ini</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard