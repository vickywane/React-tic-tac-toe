import "../App.css"

const Button = ({ title, clickAction, isDisabled }) => (
    <button
        style={{
            background: isDisabled && "rgba(40, 45, 79, 0.66)"
        }}
        className="custom-btn"
        onClick={() => clickAction()} disabled={isDisabled}
    >
        {title}
    </button>
)

export default Button