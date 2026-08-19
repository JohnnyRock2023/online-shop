import React from 'react';
import Class from "./CommentListItem.module.css";

const CommentsListItem = ({comment}) => {
    return (
        <div className={Class.CommentsListItem} key={comment.id}>
            <div className={Class.CommentsListItemPerson}>
                <img src={`http://localhost:5000/uploads/${comment.image}`} alt={comment.image}></img>
                <h3>{comment.name}</h3>
            </div>
            <p>{comment.comment}</p>
        </div>
    );
};

export default CommentsListItem;