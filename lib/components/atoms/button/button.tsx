import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { ButtonProps } from './button.types'
import { cn } from '@/utils/helpers'
import { Spinner } from '../spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline hover:btn-outline--hover',
        text: 'text-blue-600 hover:text-blue-800',
        danger: 'bg-red-600 text-white hover:bg-red-700'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
      },
      fullWidth: {
        true: 'w-full',
        false: 'auto'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, fullWidth, isLoading, icon, className, ...props }, ref) => {
    return (
      <button
        className={cn('btn-default', buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Spinner size='sm' className='mr-2' />}
        {icon && !isLoading && icon}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
