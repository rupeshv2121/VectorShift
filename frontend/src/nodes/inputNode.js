// inputNode.js

import { useState } from 'react';
import { BiImport } from 'react-icons/bi';
import { CustomDropdown } from '../components/CustomDropdown';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      title="Input"
      description="Pass data of different types into your workflow"
      accent="green"
      icon={<BiImport />}
      outputs={[
        { id: `${id}-value` }
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Name Field */}
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="Enter input name"
          style={{
            backgroundColor: "#e0e7ff",
            padding: "10px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500",
            color: "#4338ca",
            border: "1px solid #c7d2fe",
            outline: "none",
            boxSizing: "border-box",
            width: "100%",
          }}
        />

        {/* Type Field */}
        <CustomDropdown
          value={inputType}
          options={['Text', 'File']}
          onChange={setInputType}
          accentColor="#10b981"
          accentColorLight="#f0fdf9"
          accentColorBorder="#d1fae5"
          label="Type"
        />
      </div>
    </BaseNode>
  );
}
