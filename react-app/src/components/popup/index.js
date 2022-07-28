import React from 'react'
import './PopUp.css'
import { RiCloseFill } from "react-icons/ri"

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inside">
                <RiCloseFill className="close" onClick={() => props.setTrigger(false)} />
                { props.children }
            </div>
        </div>
    ) : "";
}


export default Popup
