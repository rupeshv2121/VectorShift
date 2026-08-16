// mergeNode.js

import { BiGitMerge } from 'react-icons/bi';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
    return (
        <BaseNode
            title="Merge"
            description="Combine multiple inputs"
            accent="pink"
            icon={<BiGitMerge />}
            inputs={[
                { id: `${id}-input1` },
                { id: `${id}-input2` },
                { id: `${id}-input3` }
            ]}
            outputs={[
                { id: `${id}-merged` }
            ]}
        >
            <div
                style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    padding: "12px",
                    backgroundColor: "#fdf2f8",
                    borderRadius: "6px",
                    border: "1px solid #fce7f3",
                    textAlign: "center",
                }}
            >
                Combines multiple data streams into one
            </div>
        </BaseNode>
    );
};
