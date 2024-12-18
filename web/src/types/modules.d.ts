// React and Next.js modules
declare module 'react' {
  export * from 'react'
}

declare module 'next/link' {
  import { ComponentType } from 'react'
  const Link: ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
    key?: string | number
    onClick?: (event: React.MouseEvent) => void
  }>
  export default Link
}

declare module 'next/navigation' {
  export function usePathname(): string
  export function useRouter(): {
    push: (url: string) => void
    replace: (url: string) => void
    back: () => void
    forward: () => void
    refresh: () => void
    prefetch: (url: string) => Promise<void>
  }
  export function useSearchParams(): URLSearchParams
  export function useParams(): { [key: string]: string | string[] }
}

declare module 'lucide-react' {
  import { ComponentType } from 'react'
  
  interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    strokeWidth?: number
    className?: string
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void
  }

  export const LayoutDashboard: ComponentType<IconProps>
  export const Activity: ComponentType<IconProps>
  export const Shield: ComponentType<IconProps>
  export const Bell: ComponentType<IconProps>
  export const Settings: ComponentType<IconProps>
  export const FileText: ComponentType<IconProps>
  export const Users: ComponentType<IconProps>
  export const LineChart: ComponentType<IconProps>
  export const Sun: ComponentType<IconProps>
  export const Moon: ComponentType<IconProps>
  export const Menu: ComponentType<IconProps>
  // ... other icons
}

declare module '@projectstorm/react-canvas-core' {
  export class CanvasWidget extends React.Component<any, any> {
    render(): JSX.Element
  }
  // ... other exports
} 