// loggerNode.js

import { useState } from 'react';
import { MdBugReport } from 'react-icons/md';
import { CustomDropdown } from '../components/CustomDropdown';
import { StyledInput } from '../components/StyledInput';
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, data }) => {
    const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');
    const [prefix, setPrefix] = useState(data?.prefix || '[LOG]');

    return (
        <BaseNode
            title="Logger"
            description="Debug and monitoring"
            accent="gray"
            icon={<MdBugReport />}
            inputs={[
                { id: `${id}-input` }
            ]}
            outputs={[
                { id: `${id}-output` }
            ]}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <CustomDropdown
                    value={logLevel.charAt(0).toUpperCase() + logLevel.slice(1)}
                    options={['Debug', 'Info', 'Warning', 'Error']}
                    onChange={(val) => setLogLevel(val === 'Warning' ? 'warn' : val.toLowerCase())}
                    accentColor="#6b7280"
                    accentColorLight="#f9fafb"
                    accentColorBorder="#d1d5db"
                    label="Log Level"
                />
                <StyledInput
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="Log prefix"
                    label="Prefix"
                    accentColor="#6b7280"
                />
            </div>
        </BaseNode>
    );
};
