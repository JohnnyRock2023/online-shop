import React, {useRef} from 'react';
import Class from "./CommentsItem.module.css";
import Uploads from "../../../../../../API/Uploads";
import trashcan from './icons/trash.png'

import defaultProfile from "..//..//..//..//..//..//DefaultImages/default-profile.jpg";

const CommentsItem = ({comment, onDelete}) => {

    const [offset, setOffset] = React.useState(0);
    const startX = useRef(0);
    const dragging = useRef(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const deletable = (comment?.user_id === user?.id) || (user?.role === 'super' || user?.role === 'admin');

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(comment?.date));

    const onPointerDown = (e) => {
        if (!deletable) return
        startX.current = e.clientX
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
        if (!deletable) return
        if(!dragging.current) return;

        const diff = e.clientX - startX.current;

        if (diff > 0 && diff <= 140 ) {
            setOffset(diff);
        }
    }

    const onPointerUp = async () => {
        if (!deletable) return
        dragging.current = false;

        if (offset >= 100) {
            await onDelete(comment?.id);
            setOffset(0);
        }
        else {
            setOffset(0);
        }
    }

    return (
        <div className={Class.commentsListItem}>
            <div
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}

                className={Class.comment} style={{transform:`translateX(${offset}px)`}} key={comment?.id}>
                <div className={Class.commentsListItemPerson}>
                    <img src={comment?.image ? Uploads.getImageLink(comment?.image): defaultProfile} alt={comment?.image}></img>
                    <h3 className={Class.commentsListItemPerson__title} >{comment?.name}</h3>
                    <time className={Class.commentDate}>{formattedDate}</time>
                </div>
                <p>{comment?.comment}</p>
            </div>
            <div className={Class.deleteBackground} style={{opacity: Math.min(Math.abs(offset)/100, 1)}}>
                <img style={{borderRadius: 0}} src={trashcan} alt={trashcan}></img>
            </div>
        </div>
    );
};

export default CommentsItem;
