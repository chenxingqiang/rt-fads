'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

interface MermaidDiagramProps {
  definition: string
  className?: string
}
export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ definition, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const initializeMermaid = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'sans-serif'
        })

        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          containerRef.current.innerHTML = `<div class="mermaid" id="${id}">${definition}</div>`
          await mermaid.run({
            nodes: [containerRef.current.querySelector(`#${id}`)!]
          })
        }
      } catch (error) {
        console.error('Error initializing Mermaid:', error)
      }
    }

    initializeMermaid()
  }, [definition])

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  )
} 