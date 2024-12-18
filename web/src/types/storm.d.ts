declare module '@projectstorm/react-diagrams' {
  import { DiagramEngine } from '@projectstorm/react-diagrams-core'
  
  export enum PortModelAlignment {
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom',
    RIGHT = 'right'
  }

  export interface DefaultNodeModelOptions {
    type?: string
    color?: string
    name?: string
    selected?: boolean
    extras?: any
  }

  export interface DefaultPortModelOptions {
    in?: boolean
    name: string
    alignment: PortModelAlignment
    maximumLinks?: number
  }

  export class DefaultNodeModel {
    constructor(options?: DefaultNodeModelOptions)
    addPort(options: DefaultPortModelOptions): DefaultPortModel
    getPort(name: string): DefaultPortModel | null
    getPorts(): { [key: string]: DefaultPortModel }
    setPosition(x: number, y: number): void
    getPosition(): { x: number; y: number }
  }

  export class DefaultPortModel {
    constructor(options: DefaultPortModelOptions)
    getName(): string
    getNode(): DefaultNodeModel
    getLinks(): { [key: string]: DefaultLinkModel }
    createLinkModel(): DefaultLinkModel | null
  }

  export class DefaultLinkModel {
    constructor()
    setSourcePort(port: DefaultPortModel): void
    setTargetPort(port: DefaultPortModel): void
    getSourcePort(): DefaultPortModel
    getTargetPort(): DefaultPortModel
  }

  export class DiagramModel {
    addNode(node: DefaultNodeModel): void
    addLink(link: DefaultLinkModel): void
    getNodes(): { [key: string]: DefaultNodeModel }
    getLinks(): { [key: string]: DefaultLinkModel }
    serialize(): any
    deserialize(data: any): void
  }

  export interface CanvasWidgetProps {
    engine: DiagramEngine
    className?: string
  }

  export class CanvasWidget extends React.Component<CanvasWidgetProps> {}
}

declare module '@projectstorm/react-canvas-core' {
  export interface CanvasEngineOptions {
    registerDefaultDeleteItemsAction?: boolean
    registerDefaultZoomCanvasAction?: boolean
  }

  export class CanvasEngine {
    constructor(options?: CanvasEngineOptions)
    getModel(): any
    setModel(model: any): void
    zoomToFit(): void
  }

  export class CanvasModel {
    serialize(): any
    deserialize(data: any): void
  }
} 