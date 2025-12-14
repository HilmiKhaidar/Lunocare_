import { CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react'

interface StatusIconProps {
  type: 'success' | 'warning' | 'info' | 'positive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const StatusIcon = ({ type, size = 'md', className = '' }: StatusIconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconProps = {
    className: `${sizeClasses[size]} ${className}`
  }

  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} className={`${iconProps.className} text-mint-600`} />
    case 'warning':
      return <AlertCircle {...iconProps} className={`${iconProps.className} text-orange-500`} />
    case 'info':
      return <Info {...iconProps} className={`${iconProps.className} text-blue-500`} />
    case 'positive':
      return <TrendingUp {...iconProps} className={`${iconProps.className} text-mint-600`} />
    default:
      return <Info {...iconProps} className={`${iconProps.className} text-gray-500`} />
  }
}

export default StatusIcon