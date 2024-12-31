import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  type?: 'default' | 'success' | 'warning' | 'error';
}

export function StatusCard({ icon: Icon, title, value, type = 'default' }: StatusCardProps) {
  const styles = {
    default: 'bg-gray-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50',
  };

  const iconStyles = {
    default: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <div className={`rounded-lg p-4 ${styles[type]} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <Icon className={`${iconStyles[type]} mt-1 transition-transform duration-300 hover:scale-110`} size={20} />
        <div className="flex-1">
          <span className="font-semibold text-gray-700">{title}</span>
          <p className="text-sm text-gray-600 break-all mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}