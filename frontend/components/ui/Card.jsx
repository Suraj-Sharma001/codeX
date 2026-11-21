'use client';
import clsx from 'clsx';
export function Card({ children, className, hoverable = false }) {
    return (<div className={clsx('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm', hoverable && 'transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700', className)}>
      {children}
    </div>);
}
