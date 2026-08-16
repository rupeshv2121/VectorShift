// BaseNode.jsx
// Reusable base component for all React Flow nodes

import { MdClose, MdExpandMore, MdSettings } from "react-icons/md";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title = "Node",
  description = "",
  inputs = [],
  outputs = [],
  accent = "blue",
  icon = null,
  children,
}) => {
  // Accent color variants
  const accentColors = {
    blue: { border: "#3b82f6", header: "#3b82f6", bg: "#f8faff" },
    green: { border: "#10b981", header: "#10b981", bg: "#f0fdf9" },
    purple: { border: "#a855f7", header: "#a855f7", bg: "#faf5ff" },
    orange: { border: "#f97316", header: "#f97316", bg: "#fff7ed" },
    pink: { border: "#ec4899", header: "#ec4899", bg: "#fdf2f8" },
    teal: { border: "#14b8a6", header: "#14b8a6", bg: "#f0fdfa" },
    red: { border: "#ef4444", header: "#ef4444", bg: "#fef2f2" },
    yellow: { border: "#eab308", header: "#eab308", bg: "#fefce8" },
    gray: { border: "#6b7280", header: "#6b7280", bg: "#f9fafb" },
  };

  const colors = accentColors[accent] || accentColors.blue;

  return (
    <div
      style={{
        minWidth: "280px",
        maxWidth: "320px",
        borderRadius: "8px",
        border: `2px solid ${colors.border}`,
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: colors.bg,
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          padding: "12px 14px",
          borderBottom: `1px solid ${colors.border}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}
        >
          {icon && (
            <span style={{ fontSize: "16px", color: colors.header }}>
              {icon}
            </span>
          )}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#1f2937",
                marginBottom: description ? "2px" : "0",
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  lineHeight: "1.3",
                }}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {/* Action buttons */}
        <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Toggle node expansion (placeholder for future feature)
              console.log("Expand clicked");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#9ca3af",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = colors.header)}
            onMouseOut={(e) => (e.target.style.color = "#9ca3af")}
            title="Expand"
          >
            <MdExpandMore />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Open settings (placeholder for future feature)
              console.log("Settings clicked");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#9ca3af",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = colors.header)}
            onMouseOut={(e) => (e.target.style.color = "#9ca3af")}
            title="Settings"
          >
            <MdSettings />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Minimize/close node (placeholder for future feature)
              console.log("Close clicked");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#9ca3af",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "#ef4444")}
            onMouseOut={(e) => (e.target.style.color = "#9ca3af")}
            title="Close"
          >
            <MdClose />
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px" }}>{children}</div>

      {/* Input Handles (Left) */}
      {inputs.map((input, index) => {
        const topPosition =
          inputs.length === 1 ? 50 : ((index + 1) * 100) / (inputs.length + 1);

        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{
              top: `${topPosition}%`,
              width: "12px",
              height: "12px",
              border: `2px solid ${colors.border}`,
              backgroundColor: "white",
              transition: "all 0.2s ease",
            }}
          />
        );
      })}

      {/* Output Handles (Right) */}
      {outputs.map((output, index) => {
        const topPosition =
          outputs.length === 1
            ? 50
            : ((index + 1) * 100) / (outputs.length + 1);

        return (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={output.id}
            style={{
              top: `${topPosition}%`,
              width: "12px",
              height: "12px",
              border: `2px solid ${colors.border}`,
              backgroundColor: "white",
              transition: "all 0.2s ease",
            }}
          />
        );
      })}
    </div>
  );
};
