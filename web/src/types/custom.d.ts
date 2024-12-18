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
  export const MenuSquare: ComponentType<IconProps>
  export const Download: ComponentType<IconProps>
  export const Calendar: ComponentType<IconProps>
  export const Filter: ComponentType<IconProps>
  export const TrendingUp: ComponentType<IconProps>
  export const DollarSign: ComponentType<IconProps>
  export const AlertCircle: ComponentType<IconProps>
  export const ChevronDown: ComponentType<IconProps>
  export const ChevronUp: ComponentType<IconProps>
  export const ChevronLeft: ComponentType<IconProps>
  export const ChevronRight: ComponentType<IconProps>
  export const X: ComponentType<IconProps>
  export const Check: ComponentType<IconProps>
  export const Search: ComponentType<IconProps>
}

declare module '@/app/routes' {
  import { ComponentType } from 'react'
  
  export interface Route {
    path: string
    name: string
    icon: ComponentType<any>
    description?: string
  }
  
  export const routes: Route[]
}

declare module 'react' {
  // Basic types
  export type ReactNode = 
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined;

  export type ReactChild = React.ReactElement | React.ReactText;
  export type ReactText = string | number;
  export type ReactFragment = {} | React.ReactNodeArray;
  export type ReactNodeArray = Array<React.ReactNode>;

  // Component types
  export type ComponentType<P = any> = React.ComponentClass<P> | React.FC<P>;
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }, context?: any): ReactElement | null;
    displayName?: string;
  }

  // Element types
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  // Ref types
  export type Ref<T> = RefCallback<T> | RefObject<T> | null;
  export type RefCallback<T> = (instance: T | null) => void;
  export interface RefObject<T> {
    readonly current: T | null;
  }

  // Hook types
  export function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
  export function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  export function useContext<T>(context: Context<T>): T;
  export function useRef<T>(initialValue: T): MutableRefObject<T>;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

  // Event types
  export interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
  export interface MouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> {}
  export interface KeyboardEvent<T = Element> extends SyntheticEvent<T, NativeKeyboardEvent> {}

  // DOM types
  export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
    onClick?: (event: MouseEvent<T>) => void;
    onKeyDown?: (event: KeyboardEvent<T>) => void;
    // ... add other event handlers as needed
  }

  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    id?: string;
    role?: string;
    style?: CSSProperties;
    tabIndex?: number;
    // ... add other HTML attributes as needed
  }

  // Context types
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }

  export interface ForwardRefRenderFunction<T, P = {}> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null
  }

  export interface ForwardRefExoticComponent<P> extends React.NamedExoticComponent<P> {
    defaultProps?: Partial<P>
    propTypes?: WeakValidationMap<P>
  }

  export interface RefAttributes<T> extends React.Attributes {
    ref?: React.Ref<T>
  }

  export type PropsWithoutRef<P> = P extends { ref?: infer R } ? P & { ref?: never } : P

  export type WeakValidationMap<T> = {
    [K in keyof T]?: null extends T[K]
      ? Validator<T[K] | null | undefined>
      : undefined extends T[K]
      ? Validator<T[K] | null | undefined>
      : Validator<T[K]>
  }

  export interface Validator<T> {
    (props: { [key: string]: any }, propName: string, componentName: string, ...rest: any[]): Error | null
  }
}

// Add recharts types
declare module 'recharts' {
  export const LineChart: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const XAxis: React.ComponentType<any>;
  export const YAxis: React.ComponentType<any>;
  export const CartesianGrid: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const ResponsiveContainer: React.ComponentType<any>;
  export const PieChart: React.ComponentType<any>;
  export const Pie: React.ComponentType<any>;
  export const Cell: React.ComponentType<any>;
  export const BarChart: React.ComponentType<any>;
  export const Bar: React.ComponentType<any>;
}

// ... rest of declarations ... 