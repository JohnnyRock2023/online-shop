import React, {useEffect, useState} from 'react';
import Class from './CommentsList.module.css'
import CommentsListItem from "./CommentsListItem/CommentsListItem";
import useFetching from "../../../../../Hooks/useFetching";
import CommentsService from "../../../../../API/CommentsService";
import Loader from "../../../../Components/Loader/Loader";
import {useParams} from "react-router-dom";

const CommentsList = () => {

    const id = useParams();
    const [fetchComments, isLoading, comments, error] = useFetching(
        async () => await CommentsService.getComments(id)
    );

    useEffect(() => {
        fetchComments();
    },[])

    return (
        <>
            {isLoading ?
               <Loader/>
               :
               <div className={Class.commentsList}>
                   <h1 className={Class.commentsList__title}>Commentaries</h1>
                   {comments?.map(comment => <CommentsListItem key={comment?.id} comment={comment} />)}
               </div>
            }
        </>
    );
};

export default CommentsList;