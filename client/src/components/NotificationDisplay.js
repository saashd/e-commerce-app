const NotificationDisplay = ({message, messageType}) => {
    return (
        <div
            style={{
                marginBottom: "10px",
                backgroundColor:
                    messageType === "success"
                        ? "#d4edda"
                        : messageType === "warning"
                            ? "#ffeeba"
                            : "#f8d7da",
                color:
                    messageType === "success"
                        ? "#155724"
                        : messageType === "warning"
                            ? "#856404"
                            : "#721c24",
                padding: "10px",
                borderRadius: "5px",
                border:
                    messageType === "success"
                        ? "1px solid #c3e6cb"
                        : messageType === "warning"
                            ? "1px solid #ffeeba"
                            : "1px solid #f5c6cb",
            }}
        >
            {message}
        </div>
    )
}

export default NotificationDisplay;