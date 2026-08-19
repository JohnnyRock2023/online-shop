import React, {useEffect, useState} from 'react';
import Class from './CommentsList.module.css'
import CommentsListItem from "./CommentsListItem/CommentsListItem";
import useFetching from "../../../../../Hooks/useFetching";
import CommentsService from "../../../../../API/CommentsService";
import Loader from "../../../../Components/Loader/Loader";

const CommentsList = () => {

    const [comments, setComments] = useState([]);
    const [fetchComments, isLoadingComments, commentsError] = useFetching(async () => {
        const res = await CommentsService.getComments(1)
        setComments(res)
    });

    useEffect(() => {
        fetchComments();
    },[])

    return (
        <>
            {isLoadingComments ?
               <Loader/>
               :
               <div className={Class.commentsList}>
                   <h1 className={Class.commentsList__title}>Commentaries</h1>
                   {comments.map(comment => <CommentsListItem key={comment.id} comment={comment} />)}
               </div>
            }
        </>
    );
};

export default CommentsList;