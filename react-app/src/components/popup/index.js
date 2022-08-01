import React from 'react'
import './PopUp.css'
import { RiCloseFill } from "react-icons/ri"
import { createCommentThunk } from '../../store/comments'
import CreateCommentsPage from '../createCommentsPage'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inside">
                <RiCloseFill className="close" onClick={() => props.setTrigger(false)} />
                { props.children }
            </div>
            <CreateCommentsPage value={props.value} />
        </div>
    ) : "";
}


export default Popup
