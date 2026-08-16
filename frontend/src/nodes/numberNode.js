// numberNode.js

import { useState } from 'react';
import { TbMathFunction } from 'react-icons/tb';
import { CustomDropdown } from '../components/CustomDropdown';
import { StyledInput } from '../components/StyledInput';
import { BaseNode } from './BaseNode';

export const NumberNode = ({ id, data }) => {
    const [value, setValue] = useState(data?.value || 0);
    const [operation, setOperation] = useState(data?.operation || 'add');

    return (
        <BaseNode
            title="Number"
            description="Numeric operations"
            accent="orange"
            icon={<TbMathFunction />}
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
                    value={value}
                    onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                    label="Value"
                    accentColor="#f97316"
                />
                <CustomDropdown
                    value={operation.charAt(0).toUpperCase() + operation.slice(1)}
                    options={['Add', 'Subtract', 'Multiply', 'Divide']}
                    onChange={(val) => setOperation(val.toLowerCase())}
                    accentColor="#f97316"
                    accentColorLight="#fff7ed"
                    accentColorBorder="#fed7aa"
                    label="Operation"
                />
            </div>
        </BaseNode>
    );
};
