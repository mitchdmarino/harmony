export default function StepInput ({objValue, onChange, index}) {
    const { label, type, value } = objValue
    return (
        <div className="input-group">
        <label htmlFor={label}>{label}</label>
        <div className="input">
          <input
            type={type || "text"}
            id={label}
            value={value || ""}
            onChange={(e) => onChange(e, index)}
            placeholder="step to achieve goal"
            required
          />
        </div>
      </div>
    )
}