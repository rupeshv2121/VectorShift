// CustomDropdown.jsx
// Reusable custom dropdown component with styled options

import { useState } from "react";

export const CustomDropdown = ({
  value,
  options,
  onChange,
  accentColor = "#3b82f6",
  accentColorLight = "#eff6ff",
  accentColorBorder = "#dbeafe",
  label,
  badgeText = "Dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Convert accentColor to rgba for shadow
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Label and Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        {label && (
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            {label} <span style={{ color: "#9ca3af" }}>◷</span>
          </label>
        )}
        <span
          style={{
            fontSize: "10px",
            color: accentColor,
            fontWeight: "500",
            backgroundColor: accentColorLight,
            padding: "2px 6px",
            borderRadius: "4px",
            border: `1px solid ${accentColorBorder}`,
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "9px 32px 9px 12px",
          fontSize: "13px",
          border: `1.5px solid ${isOpen ? accentColor : "#d1d5db"}`,
          borderRadius: "6px",
          backgroundColor: "white",
          cursor: "pointer",
          outline: "none",
          boxSizing: "border-box",
          color: "#1f2937",
          fontWeight: "500",
          transition: "all 0.2s ease",
          position: "relative",
          boxShadow: isOpen
            ? `0 0 0 3px ${hexToRgba(accentColor, 0.1)}`
            : "none",
        }}
      >
        {value}
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: `translateY(-50%) rotate(${isOpen ? "180deg" : "0deg"})`,
            color: accentColor,
            fontSize: "12px",
            transition: "transform 0.2s ease",
          }}
        >
          ▼
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            backgroundColor: "white",
            border: `1.5px solid ${accentColor}`,
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                color: option === value ? accentColor : "#1f2937",
                backgroundColor: option === value ? accentColorLight : "white",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (option !== value) {
                  e.target.style.backgroundColor = "#f9fafb";
                }
              }}
              onMouseLeave={(e) => {
                if (option !== value) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {option}
              {option === value && (
                <span style={{ float: "right", color: accentColor }}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
