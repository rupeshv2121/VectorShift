// delayNode.js

import { useState } from 'react';
import { MdTimer } from 'react-icons/md';
import { CustomDropdown } from '../components/CustomDropdown';
import { StyledInput } from '../components/StyledInput';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
    const [duration, setDuration] = useState(data?.duration || 1000);
    const [unit, setUnit] = useState(data?.unit || 'ms');

    return (
        <BaseNode
            title="Delay"
            description="Time-based delay"
            accent="red"
            icon={<MdTimer />}
            inputs={[
                { id: `${id}-input` }
            ]}
            outputs={[
                { id: `${id}-output` }
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <StyledInput
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    label="Duration"
                    accentColor="#ef4444"
                />
                <CustomDropdown
                    value={unit === 'ms' ? 'Milliseconds' : unit === 's' ? 'Seconds' : 'Minutes'}
                    options={['Milliseconds', 'Seconds', 'Minutes']}
                    onChange={(val) => setUnit(val === 'Milliseconds' ? 'ms' : val === 'Seconds' ? 's' : 'm')}
                    accentColor="#ef4444"
                    accentColorLight="#fef2f2"
                    accentColorBorder="#fecaca"
                    label="Unit"
                />
            </div>
        </BaseNode>
    );
};
