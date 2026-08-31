import React, {useContext, useEffect, useRef, useState} from 'react';
import Class from './Comments.module.css'
import CommentsItem from "./CommentsItem/CommentsItem";
import useFetching from "../../../../../Hooks/useFetching";
import CommentsService from "../../../../../API/CommentsService";
import Loader from "../../../../Components/Loader/Loader";
import {useParams} from "react-router-dom";
import Uploads from "../../../../../API/Uploads";
import TextArea from "../../../../Components/TextArea/TextArea";
import {handleRequest} from "../../../../../utils/handleRequest";
import usePartialFetching from "../../../../../Hooks/usePartialFetching";
import LoaderRef from "../../../../Components/LoaderRef/LoaderRef";
import UserContext from "../../../../../Context/UserContext";

const Comments = () => {
    const {id} = useParams();

    const [text, setText] = useState("");
    const {user} = useContext(UserContext)
    const token = localStorage.getItem('token');
    const maxSymbols = 2000;
    const limit = 10;

    const loaderRef = useRef(null);

    const [isLoading, comments, setComments, hasMore, error] = usePartialFetching(
        async (page, cursor) => await CommentsService.getComments(id, cursor, page, limit), loaderRef)

    const sendComment = async () => {
        const {data, error} = await handleRequest(async () => await CommentsService.addComment(id, text));
        if (!error) {
            setText("")
            data.image = user?.image
            data.name = user?.name
            setComments([...comments, data]);
        }
    }

    const deleteComment = async (id) => {
        const {data, error} = await handleRequest(async () => await CommentsService.deleteComment(id))
        setComments(comments.filter(comment => comment.id !== id))
    }

    return (
        <div className={Class.comments}>
            {token &&
                <div className={Class.addComment}>
                    <img className={Class.addComment_image} src={Uploads.getImageLink(user?.image)} alt={user?.image}/>
                    <div className={Class.field}>
                        <TextArea className={Class.textArea} text={text} setText={setText} maxSymbols={maxSymbols} placeholder="Leave a comment..."></TextArea>
                        <p className={Class.bottomPart__counter} >{text.length}/{maxSymbols}</p>
                        <button onClick={sendComment} className={Class.sendBtn}>Send</button>
                    </div>
                </div>
            }

            <div className={Class.commentsList}>
                   {comments && comments?.map(comment => <CommentsItem onDelete={deleteComment} key={comment?.id} comment={comment} />)}
                   {isLoading && <Loader/>}
                   {hasMore && <LoaderRef ref={loaderRef}/>}
            </div>
        </div>
    );
};

export default Comments;