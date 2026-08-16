// toolbar.js

import { MdViewModule } from 'react-icons/md';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
            <h2 style={{
                margin: '0 0 15px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <MdViewModule style={{ fontSize: '22px', color: '#3b82f6' }} />
                Node Palette
            </h2>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='number' label='Number' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
