import { cn } from '@/utils/helpers'
import { cva } from 'class-variance-authority'
import { type HTMLAttributes, type SVGProps } from 'react'
import type { SpinnerVariants } from './spinner.types'

const spinnerContainerVariants = cva('relative', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-10'
    }
  }
})

const spinnerVariants = cva('absolute rounded-full  border-neutral-300', {
  variants: {
    size: {
      xs: 'size-3 border',
      sm: 'size-4 border',
      md: 'size-6 border-2',
      lg: 'size-8 border-2',
      xl: 'size-10 border-[3px]'
    }
  }
})

const spinSVGProps: Record<NonNullable<SpinnerVariants['size']>, SVGProps<never>> = {
  xs: {
    strokeWidth: 2,
    viewBox: '0.5 0 24 24'
  },
  sm: {
    strokeWidth: 1.5,
    viewBox: '1 0.25 23 23.5'
  },
  md: {
    strokeWidth: 2,
    viewBox: '0.5 0 24 24'
  },
  lg: {
    strokeWidth: 1.5,
    viewBox: '1 0.25 23 23.5'
  },
  xl: {
    strokeWidth: 1.75,
    viewBox: '1 0.125 23 23.75'
  }
}

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, SpinnerVariants {}

export function Spinner({ size = 'md', className, ...rest }: SpinnerProps) {
  return (
    <div className='inline-flex flex-col items-center justify-center gap-3'>
      <div className={cn(spinnerContainerVariants({ size }))} {...rest}>
        <div className={cn(spinnerVariants({ size }), className)}></div>
        <svg
          width='100%'
          height='100%'
          fill='none'
          className='absolute animate-spin stroke-neutral-500'
          xmlns='http://www.w3.org/2000/svg'
          {...spinSVGProps[size]}
        >
          <path d='M12.5 23c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11' strokeLinecap='round' />
        </svg>
      </div>
    </div>
  )
}

Spinner.displayName = 'Spinner'
