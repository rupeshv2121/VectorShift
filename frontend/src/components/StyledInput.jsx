// StyledInput.jsx
// Reusable styled input component

export const StyledInput = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  label,
  accentColor = "#3b82f6",
  required = false,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 10px",
          fontSize: "13px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          backgroundColor: "white",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = accentColor;
          e.target.style.boxShadow = `0 0 0 3px ${accentColor}1a`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
        {...props}
      />
    </div>
  );
};
