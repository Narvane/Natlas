import {
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type ReactFlowProps,
  type XYPosition,
} from '@xyflow/react'
import {
  useCallback,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react'

function FlowCoordinatesPanel({ position }: { position: XYPosition | null }) {
  return (
    <Panel position="bottom-left" className="flow-coordinates">
      {position
        ? `x: ${Math.round(position.x)}, y: ${Math.round(position.y)}`
        : '—'}
    </Panel>
  )
}

function FlowCanvasInner<NodeType extends Node = Node, EdgeType extends Edge = Edge>({
  children,
  onPaneMouseMove,
  onPaneMouseLeave,
  ...props
}: ReactFlowProps<NodeType, EdgeType>) {
  const { screenToFlowPosition } = useReactFlow()
  const [position, setPosition] = useState<XYPosition | null>(null)

  const handlePaneMouseMove = useCallback(
    (event: ReactMouseEvent) => {
      setPosition(screenToFlowPosition({ x: event.clientX, y: event.clientY }))
      onPaneMouseMove?.(event)
    },
    [onPaneMouseMove, screenToFlowPosition],
  )

  const handlePaneMouseLeave = useCallback(
    (event: ReactMouseEvent) => {
      setPosition(null)
      onPaneMouseLeave?.(event)
    },
    [onPaneMouseLeave],
  )

  return (
    <ReactFlow<NodeType, EdgeType>
      {...props}
      onPaneMouseMove={handlePaneMouseMove}
      onPaneMouseLeave={handlePaneMouseLeave}
    >
      <FlowCoordinatesPanel position={position} />
      {children}
    </ReactFlow>
  )
}

export default function FlowCanvas<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  props: ReactFlowProps<NodeType, EdgeType>,
) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner {...props} />
    </ReactFlowProvider>
  )
}
