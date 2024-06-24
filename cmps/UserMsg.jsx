import { eventBusService } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    const msgRef = useRef(null)
    
    useEffect(() => {
        
        const onRemoveListener = eventBusService.on('show-user-msg', msg => {
            clearTimeout(timeoutIdRef.current)
            setMsg(msg)
            utilService.animateCSS(msgRef.current, 'backInRight')
            timeoutIdRef.current = setTimeout(closeMsg, 2000);
        })

        return () => onRemoveListener()

    }, [msg])


    function closeMsg() {
        clearTimeout(timeoutIdRef.current)
        setMsg(null)
    }

    if (!msg) return null
    return (
        <section ref={msgRef} className={`user-msg ${msg.type}`}>
            <h4>{msg.txt}</h4>
            <button onClick={closeMsg} className="close-btn">X</button>
        </section>
    )
}