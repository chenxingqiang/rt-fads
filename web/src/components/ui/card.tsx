// src/components/ui/card.tsx
import React, { forwardRef } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
  children?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
})

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(function CardHeader(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className="flex flex-col space-y-1.5 p-6" {...props}>
      {children}
    </div>
  )
})

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { className = '', children, ...props },
  ref
) {
  return (
    <h3 ref={ref} className="text-2xl font-semibold leading-none tracking-tight" {...props}>
      {children}
    </h3>
  )
})

export const CardContent = forwardRef<HTMLDivElement, CardProps>(function CardContent(
  { className = '', children, ...props },
  ref
) {
  return (
    <div ref={ref} className="p-6 pt-0" {...props}>
      {children}
    </div>
  )
})