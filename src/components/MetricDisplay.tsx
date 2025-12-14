import { Zap, Brain, Heart, Smile, Moon, Droplets } from 'lucide-react'

interface MetricDisplayProps {
  type: 'energy' | 'focus' | 'stress' | 'mood' | 'sleep' | 'water'
  value: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical'
}

const MetricDisplay = ({ 
  type, 
  value, 
  showLabel = true, 
  size = 'md',
  layout = 'vertical'
}: MetricDisplayProps) => {
  const getIcon = () => {
    switch (type) {
      case 'energy':
        return <Zap className={`${getIconSize()} text-yellow-600`} />
      case 'focus':
        return <Brain className={`${getIconSize()} text-blue-600`} />
      case 'stress':
        return <Heart className={`${getIconSize()} text-red-500`} />
      case 'mood':
        return <Smile className={`${getIconSize()} text-purple-600`} />
      case 'sleep':
        return <Moon className={`${getIconSize()} text-mint-600`} />
      case 'water':
        return <Droplets className={`${getIconSize()} text-teal-600`} />
      default:
        return null
    }
  }

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3'
      case 'md':
        return 'w-4 h-4'
      case 'lg':
        return 'w-5 h-5'
      default:
        return 'w-4 h-4'
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'energy':
        return 'Energi'
      case 'focus':
        return 'Fokus'
      case 'stress':
        return 'Stres'
      case 'mood':
        return 'Mood'
      case 'sleep':
        return 'Tidur'
      case 'water':
        return 'Air'
      default:
        return ''
    }
  }

  const getValueDisplay = () => {
    if (type === 'sleep') {
      return `${value}j`
    }
    if (type === 'water') {
      return `${value}`
    }
    return value.toString()
  }

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs'
      case 'md':
        return 'text-sm'
      case 'lg':
        return 'text-base'
      default:
        return 'text-sm'
    }
  }

  if (layout === 'horizontal') {
    return (
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className={`font-medium ${getTextSize()}`}>
          {getValueDisplay()}
        </span>
        {showLabel && (
          <span className={`text-gray-500 ${getTextSize()}`}>
            {getLabel()}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        {getIcon()}
        <span className={`font-medium ${getTextSize()}`}>
          {getValueDisplay()}
        </span>
      </div>
      {showLabel && (
        <div className={`text-gray-500 ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>
          {getLabel()}
        </div>
      )}
    </div>
  )
}

export default MetricDisplay