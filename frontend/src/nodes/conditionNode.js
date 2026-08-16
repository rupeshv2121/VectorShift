// conditionNode.js

import { useState } from 'react';
import { MdCompare } from 'react-icons/md';
import { CustomDropdown } from '../components/CustomDropdown';
import { StyledInput } from '../components/StyledInput';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
    const [operator, setOperator] = useState(data?.operator || 'equals');
    const [compareValue, setCompareValue] = useState(data?.compareValue || '');

    return (
        <BaseNode
            title="Condition"
            description="Conditional branching"
            accent="yellow"
            icon={<MdCompare />}
            inputs={[
                { id: `${id}-input` }
            ]}
            outputs={[
                { id: `${id}-true` },
                { id: `${id}-false` }
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <CustomDropdown
                    value={operator === 'equals' ? 'Equals' : operator === 'notEquals' ? 'Not Equals' : operator === 'greaterThan' ? 'Greater Than' : operator === 'lessThan' ? 'Less Than' : 'Contains'}
                    options={['Equals', 'Not Equals', 'Greater Than', 'Less Than', 'Contains']}
                    onChange={(val) => {
                        const map = { 'Equals': 'equals', 'Not Equals': 'notEquals', 'Greater Than': 'greaterThan', 'Less Than': 'lessThan', 'Contains': 'contains' };
                        setOperator(map[val]);
                    }}
                    accentColor="#eab308"
                    accentColorLight="#fefce8"
                    accentColorBorder="#fef08a"
                    label="Operator"
                />
                <StyledInput
                    type="text"
                    value={compareValue}
                    onChange={(e) => setCompareValue(e.target.value)}
                    placeholder="Value to compare"
                    label="Compare Value"
                    accentColor="#eab308"
                />
            </div>
        </BaseNode>
    );
};
