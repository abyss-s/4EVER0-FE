import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  action: () => void;
  color?: string;
  requiresLogin: boolean;
  disabled?: boolean;
}

interface ServiceCardProps {
  service: ServiceData;
  buttonDisabled: boolean;
  onServiceClick: (service: ServiceData) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  buttonDisabled,
  onServiceClick,
}) => {
  const { isLoggedIn } = useAuthStore();

  const isLocked = service.requiresLogin && !isLoggedIn;
  const isDisabled = service.disabled;

  return (
    <motion.button
      whileHover={{ scale: isLocked || isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isLocked || isDisabled ? 1 : 0.98 }}
      onClick={() => onServiceClick(service)}
      disabled={buttonDisabled}
      className={`
        relative p-4 rounded-2xl border text-center transition-all
        ${
          isDisabled
            ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
            : isLocked
              ? 'bg-gray-50 border-gray-200 opacity-70 cursor-pointer'
              : 'bg-white border-gray-200 hover:border-brand-yellow hover:shadow-md active:scale-95 hover:bg-gray-50/50'
        }
      `}
    >
      {/* 잠금 오버레이 (로그인 필요한 것만) */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
          <div className="text-center">
            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <div className="text-xs text-gray-500 font-medium">로그인 필요</div>
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="text-2xl mb-2">{service.icon}</div>

      {/* Title */}
      <div className="font-semibold text-gray-900 text-xs leading-tight mb-1">{service.title}</div>

      {/* Subtitle */}
      {service.subtitle && (
        <div className="font-medium text-gray-700 text-xs leading-tight mb-1">
          {service.subtitle}
        </div>
      )}

      {/* Description */}
      <div className="text-xs text-gray-500 leading-relaxed">{service.description}</div>
    </motion.button>
  );
};
