// llmNode.js

import { SiOpenai } from 'react-icons/si';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      description="Language model processor"
      accent="purple"
      icon={<SiOpenai />}
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
    >
      <div
        style={{
          padding: "12px",
          backgroundColor: "#faf5ff",
          borderRadius: "6px",
          border: "1px solid #e9d5ff",
          fontSize: "12px",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Processes text using a language model
      </div>
    </BaseNode>
  );
}
