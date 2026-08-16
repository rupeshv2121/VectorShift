// outputNode.js

import { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { CustomDropdown } from '../components/CustomDropdown';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [outputText, setOutputText] = useState(data?.outputText || '');

  return (
    <BaseNode
      title="Output"
      description="Output data of different types from your workflow."
      accent="blue"
      icon={<BiExport />}
      inputs={[
        { id: `${id}-value` }
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Name Field */}
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="Enter output name"
          style={{
            backgroundColor: "#dbeafe",
            padding: "10px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500",
            color: "#1e40af",
            border: "1px solid #bfdbfe",
            outline: "none",
            boxSizing: "border-box",
            width: "100%",
          }}
        />

        {/* Type Field */}
        <CustomDropdown
          value={outputType}
          options={['Text', 'Image']}
          onChange={setOutputType}
          accentColor="#3b82f6"
          accentColorLight="#eff6ff"
          accentColorBorder="#dbeafe"
          label="Type"
        />

        {/* Output Field */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Output <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="Copy"
              >
                📋
              </button>
              <button
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="Add"
              >
                +
              </button>
              <button
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="Expand"
              >
                ⛶
              </button>
              <span
                style={{
                  fontSize: "11px",
                  color: "#6366f1",
                  cursor: "pointer",
                }}
              >
                Text
              </span>
            </div>
          </div>
          <input
            type="text"
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            placeholder='Type "{{" to utilize variables'
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: "13px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "white",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Format output toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Format output
          </label>
          <label style={{ position: "relative", display: "inline-block", width: "40px", height: "22px" }}>
            <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
            <span
              style={{
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#3b82f6",
                borderRadius: "22px",
                transition: "0.3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  content: "",
                  height: "16px",
                  width: "16px",
                  left: "21px",
                  bottom: "3px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "0.3s",
                }}
              />
            </span>
          </label>
        </div>

        {/* Error message */}
        {!outputText && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 10px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#dc2626",
            }}
          >
            <span>⚠</span>
            <span>Output field is required</span>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
