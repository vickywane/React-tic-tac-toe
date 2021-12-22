import { useEffect, useState } from "react"
import "../App.css"

const Toast = ({ title }) => {
    const [toastVisibility, setToastVisibility] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setToastVisibility(false)
        }, 2000)
    }, [])

    return (
        <div className="toast-container" style={{ display: !toastVisibility ? 'none' : 'absolute' }}  >
            <p> {title} </p>
        </div>
    )
}

export default Toast