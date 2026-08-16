// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { ConditionNode } from './nodes/conditionNode';
import { DelayNode } from './nodes/delayNode';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { LoggerNode } from './nodes/loggerNode';
import { MergeNode } from './nodes/mergeNode';
import { NumberNode } from './nodes/numberNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { useStore } from './store';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  number: NumberNode,
  delay: DelayNode,
  logger: LoggerNode,
  condition: ConditionNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100wv', height: '70vh', backgroundColor: '#f9fafb' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          deleteKeyCode={['Backspace', 'Delete']}
          multiSelectionKeyCode='Shift'
          fitView
        >
          <Background color="#e5e7eb" gap={gridSize} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const colorMap = {
                customInput: '#10b981',
                customOutput: '#3b82f6',
                text: '#14b8a6',
                llm: '#a855f7',
                number: '#f97316',
                delay: '#ef4444',
                logger: '#6b7280',
                condition: '#eab308',
                merge: '#ec4899'
              };
              return colorMap[node.type] || '#6b7280';
            }}
            maskColor="rgba(0, 0, 0, 0.05)"
          />
        </ReactFlow>
      </div>
    </>
  )
}
