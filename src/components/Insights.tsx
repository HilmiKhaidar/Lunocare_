import { useMemo } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Lightbulb, TrendingUp, TrendingDown, Minus, Heart } from 'lucide-react'
import { useHealthStore } from '../store/healthStore'

const Insights = () => {
  const { entries, getAverages } = useHealthStore()
  
  const insights = useMemo(() => {
    if (entries.length < 3) return []
    
    const last7Days = entries.slice(-7)
    const previous7Days = entries.slice(-14, -7)
    
    const currentAverages = getAverages(last7Days)
    const previousAverages = getAverages(previous7Days)
    
    const insights = []
    
    // Energy insights
    const energyDiff = currentAverages.energy - previousAverages.energy
    if (Math.abs(energyDiff) > 0.5) {
      insights.push({
        type: energyDiff > 0 ? 'positive' : 'negative',
        title: energyDiff > 0 ? 'Energi Meningkat' : 'Energi Menurun',
        description: `Tingkat energi Anda ${energyDiff > 0 ? 'naik' : 'turun'} ${Math.abs(energyDiff).toFixed(1)} poin dibanding minggu lalu.`,
        suggestion: energyDiff > 0 
          ? 'Pertahankan rutinitas yang sudah baik ini!'
          : 'Coba perhatikan pola tidur dan aktivitas fisik Anda.'
      })
    }
    
    // Sleep insights
    const sleepDiff = currentAverages.sleep - previousAverages.sleep
    if (Math.abs(sleepDiff) > 0.5) {
      insights.push({
        type: sleepDiff > 0 ? 'positive' : 'negative',
        title: sleepDiff > 0 ? 'Tidur Lebih Baik' : 'Kurang Tidur',
        description: `Durasi tidur Anda ${sleepDiff > 0 ? 'bertambah' : 'berkurang'} ${Math.abs(sleepDiff).toFixed(1)} jam per malam.`,
        suggestion: sleepDiff > 0 
          ? 'Tidur yang cukup membantu meningkatkan energi dan fokus.'
          : 'Cobalah untuk tidur lebih awal atau ciptakan rutinitas tidur yang konsisten.'
      })
    }
    
    // Stress insights
    const stressDiff = currentAverages.stress - previousAverages.stress
    if (Math.abs(stressDiff) > 0.5) {
      insights.push({
        type: stressDiff < 0 ? 'positive' : 'negative',
        title: stressDiff < 0 ? 'Stres Berkurang' : 'Stres Meningkat',
        description: `Tingkat stres Anda ${stressDiff < 0 ? 'turun' : 'naik'} ${Math.abs(stressDiff).toFixed(1)} poin.`,
        suggestion: stressDiff < 0 
          ? 'Apa pun yang Anda lakukan, sepertinya berhasil mengurangi stres!'
          : 'Mungkin saatnya untuk lebih memperhatikan teknik relaksasi atau istirahat.'
      })
    }
    
    // Exercise correlation
    const exerciseDays = last7Days.filter(e => e.exercise)
    if (exerciseDays.length > 0) {
      const exerciseEnergyAvg = getAverages(exerciseDays).energy
      const nonExerciseEnergyAvg = getAverages(last7Days.filter(e => !e.exercise)).energy
      
      if (exerciseEnergyAvg > nonExerciseEnergyAvg + 0.5) {
        insights.push({
          type: 'positive',
          title: 'Olahraga Meningkatkan Energi',
          description: `Pada hari-hari Anda berolahraga, tingkat energi rata-rata ${exerciseEnergyAvg.toFixed(1)} vs ${nonExerciseEnergyAvg.toFixed(1)} pada hari tanpa olahraga.`,
          suggestion: 'Olahraga teratur tampaknya memberikan dampak positif pada energi Anda!'
        })
      }
    }
    
    // Water intake insights
    if (currentAverages.water < 6) {
      insights.push({
        type: 'neutral',
        title: 'Hidrasi Perlu Perhatian',
        description: `Rata-rata konsumsi air Anda ${currentAverages.water.toFixed(1)} gelas per hari.`,
        suggestion: 'Cobalah untuk minum lebih banyak air. Target 8 gelas per hari dapat membantu meningkatkan energi dan fokus.'
      })
    }
    
    return insights
  }, [entries, getAverages])
  
  const patterns = useMemo(() => {
    if (entries.length < 5) return []
    
    const patterns = []
    
    // Find best and worst days
    const sortedByEnergy = [...entries].sort((a, b) => b.energy - a.energy)
    const bestEnergyDay = sortedByEnergy[0]
    const worstEnergyDay = sortedByEnergy[sortedByEnergy.length - 1]
    
    if (bestEnergyDay && worstEnergyDay && bestEnergyDay.energy - worstEnergyDay.energy > 2) {
      patterns.push({
        title: 'Pola Energi Terbaik',
        description: `Energi tertinggi Anda (${bestEnergyDay.energy}/5) terjadi ketika tidur ${bestEnergyDay.sleep} jam dan ${bestEnergyDay.exercise ? 'berolahraga' : 'tidak berolahraga'}.`,
        date: format(new Date(bestEnergyDay.date), 'd MMMM', { locale: id })
      })
    }
    
    // Sleep patterns
    const avgSleep = getAverages(entries).sleep
    const goodSleepEntries = entries.filter(e => e.sleep >= avgSleep + 0.5)
    if (goodSleepEntries.length > 0) {
      const goodSleepAvgEnergy = getAverages(goodSleepEntries).energy
      const allAvgEnergy = getAverages(entries).energy
      
      if (goodSleepAvgEnergy > allAvgEnergy + 0.3) {
        patterns.push({
          title: 'Tidur Cukup = Energi Lebih',
          description: `Ketika Anda tidur ${avgSleep + 0.5}+ jam, energi rata-rata ${goodSleepAvgEnergy.toFixed(1)} vs ${allAvgEnergy.toFixed(1)} secara keseluruhan.`,
          date: 'Pola konsisten'
        })
      }
    }
    
    return patterns
  }, [entries, getAverages])

  const InsightCard = ({ insight }: { insight: any }) => {
    const getIcon = () => {
      switch (insight.type) {
        case 'positive':
          return <TrendingUp className="w-5 h-5 text-mint-600" />
        case 'negative':
          return <TrendingDown className="w-5 h-5 text-orange-500" />
        default:
          return <Minus className="w-5 h-5 text-gray-500" />
      }
    }
    
    const getBgColor = () => {
      switch (insight.type) {
        case 'positive':
          return 'bg-mint-50 border-mint-200'
        case 'negative':
          return 'bg-orange-50 border-orange-200'
        default:
          return 'bg-gray-50 border-gray-200'
      }
    }
    
    return (
      <div className={`card border ${getBgColor()}`}>
        <div className="flex items-start gap-3">
          <div className="mt-1">{getIcon()}</div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
            <p className="text-sm text-gray-500 italic">{insight.suggestion}</p>
          </div>
        </div>
      </div>
    )
  }

  if (entries.length < 3) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Lightbulb className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Wawasan Akan Segera Tersedia
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Lakukan check-in selama beberapa hari lagi untuk mendapatkan wawasan personal tentang pola kesehatan Anda.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Wawasan Personal</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Pola dan tren dari data kesehatan Anda
        </p>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
            Wawasan Terbaru
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
      )}

      {/* Patterns */}
      {patterns.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            Pola yang Ditemukan
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {patterns.map((pattern, index) => (
              <div key={index} className="card border border-teal-200 bg-teal-50">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-teal-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{pattern.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{pattern.description}</p>
                    <p className="text-xs text-teal-600">{pattern.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="card bg-gradient-to-r from-mint-50 to-teal-50 border border-mint-200">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">
            Perjalanan Kesadaran Diri
          </h3>
          <p className="text-sm text-gray-600">
            Setiap check-in adalah langkah menuju pemahaman yang lebih baik tentang diri Anda. 
            Tidak ada target yang harus dicapai, hanya kesadaran yang perlu dibangun.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Insights