// textNode.js

import { useEffect, useRef, useState } from 'react';
import { MdTextFields } from 'react-icons/md';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{ variableName }})
  useEffect(() => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = variablePattern.exec(currText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }

    setVariables(matches);
  }, [currText]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputHandles = variables.map((varName) => ({
    id: `${id}-${varName}`,
    label: varName
  }));

  return (
    <BaseNode
      title="Text"
      description="Static text or template"
      accent="teal"
      icon={<MdTextFields />}
      inputs={inputHandles}
      outputs={[
        { id: `${id}-output` }
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Text
            </label>
          </div>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder='Enter text or use {{ variableName }} for inputs'
            rows={1}
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: "13px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "white",
              outline: "none",
              resize: "none",
              overflow: "hidden",
              minHeight: "40px",
              fontFamily: "inherit",
              boxSizing: "border-box",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        {variables.length > 0 && (
          <div
            style={{
              fontSize: "11px",
              color: "#6b7280",
              padding: "6px 8px",
              backgroundColor: "#f0fdfa",
              borderRadius: "4px",
              border: "1px solid #ccfbf1",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            <span style={{ fontWeight: "600" }}>Variables:</span> {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
