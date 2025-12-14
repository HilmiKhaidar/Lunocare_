import { Heart, Shield, Smartphone, BarChart3, Lightbulb, Download, Users, Clock } from 'lucide-react'

const Help = () => {
  const features = [
    {
      icon: Heart,
      title: 'Check-in Harian',
      description: 'Catat kondisi energi, fokus, mood, dan stres Anda setiap hari dengan skala 1-5 yang mudah dipahami.'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Personal',
      description: 'Lihat ringkasan rata-rata mingguan dan pola 7 hari terakhir untuk memahami tren kesehatan Anda.'
    },
    {
      icon: Lightbulb,
      title: 'Wawasan Cerdas',
      description: 'Dapatkan insight personal tentang pola kesehatan dan korelasi antara kebiasaan dengan kondisi tubuh.'
    },
    {
      icon: Shield,
      title: 'Privasi Terjamin',
      description: 'Semua data tersimpan lokal di perangkat Anda. Tidak ada data yang dikirim ke server atau dibagikan.'
    },
    {
      icon: Smartphone,
      title: 'Progressive Web App',
      description: 'Install di home screen untuk pengalaman seperti aplikasi native dengan akses offline.'
    },
    {
      icon: Download,
      title: 'Export Data',
      description: 'Ekspor data Anda dalam format CSV untuk analisis lebih lanjut atau backup personal.'
    }
  ]

  const faqs = [
    {
      question: 'Apakah Lunocare memberikan diagnosis medis?',
      answer: 'Tidak. Lunocare adalah alat untuk membangun kesadaran diri, bukan untuk diagnosis medis. Selalu konsultasi dengan profesional kesehatan untuk masalah medis.'
    },
    {
      question: 'Bagaimana data saya disimpan?',
      answer: 'Semua data tersimpan secara lokal di perangkat Anda menggunakan localStorage browser. Data tidak pernah dikirim ke server atau cloud.'
    },
    {
      question: 'Apakah saya harus check-in setiap hari?',
      answer: 'Tidak ada kewajiban. Check-in dilakukan sesuai keinginan Anda. Konsistensi membantu, tapi tidak ada tekanan atau target yang harus dicapai.'
    },
    {
      question: 'Bagaimana cara menginstall aplikasi?',
      answer: 'Di browser mobile, tap menu dan pilih "Add to Home Screen". Di desktop Chrome, klik icon install di address bar.'
    },
    {
      question: 'Apakah aplikasi bekerja offline?',
      answer: 'Ya, setelah diinstall, aplikasi dapat digunakan offline. Data yang sudah tersimpan tetap dapat diakses tanpa internet.'
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-mint-400 to-teal-500 rounded-full mb-4">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Tentang Lunocare
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Lunocare membantu Anda membangun kesadaran diri terhadap kondisi tubuh dan mental 
          melalui check-in harian yang sederhana, jujur, dan tidak menghakimi.
        </p>
      </div>

      {/* Mission */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-mint-600" />
          Misi Kami
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Kami percaya bahwa kesadaran diri adalah langkah pertama menuju kesehatan yang lebih baik. 
          Lunocare dirancang untuk membantu Anda mengenal pola tubuh dan mental tanpa tekanan, 
          judgment, atau target yang memberatkan. Setiap orang unik, dan perjalanan kesehatan 
          setiap individu berbeda.
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Fitur Utama
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-mint-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-mint-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pertanyaan Umum
        </h3>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="card">
              <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="card bg-mint-50 border-mint-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-mint-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-mint-800 mb-1">Komitmen Privasi</h4>
            <p className="text-mint-700 text-xs sm:text-sm">
              Lunocare tidak mengumpulkan, menyimpan, atau membagikan data personal Anda. 
              Semua informasi tersimpan secara lokal di perangkat Anda dan sepenuhnya 
              dalam kendali Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
        <p>Lunocare v1.0.0 • by Lunetix Health Team</p>
        <p className="mt-1">
          <Clock className="w-3 h-3 inline mr-1" />
          Dibuat dengan ❤️ untuk kesehatan mental yang lebih baik
        </p>
      </div>
    </div>
  )
}

export default Help