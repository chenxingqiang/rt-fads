declare module 'next/link' {
  import { ComponentType } from 'react'
  const Link: ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
    key?: string | number
  }>
  export default Link
}

declare module 'next/navigation' {
  export function usePathname(): string
  export function useRouter(): {
    push: (url: string) => void
    replace: (url: string) => void
    back: () => void
  }
}

declare module 'next/dynamic' {
  import { ComponentType } from 'react'
  export default function dynamic<P = {}>(
    dynamicOptions: () => Promise<ComponentType<P>>,
    options?: { 
      ssr?: boolean
      loading?: ComponentType
      suspense?: boolean
    }
  ): ComponentType<P>
}

declare module 'next/font/google'
declare module 'lucide-react'
declare module 'recharts'
declare module 'react-mermaid2'

// Add React module declaration with all necessary exports
declare module 'react' {
  export type FC<P = {}> = React.FunctionComponent<P>
  export type ReactNode = React.ReactNode
  export type ComponentType<P = any> = React.ComponentType<P>
  
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void]
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void
  export function useContext<T>(context: React.Context<T>): T
  export function createContext<T>(defaultValue: T): React.Context<T>
  
  const React: any
  export default React
}