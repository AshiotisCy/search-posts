import { Button, Comment, Divider, Tag } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { AddCommentInterface, CommentInterface, DefaultState } from "../interfaces"
import ReplyForm from "./ReplyForm"


function CommentsList(
    props: {
        comments: CommentInterface[],
        currentPostId: number
    }) {

    const reply = useSelector((state: DefaultState) => state.postComments)

    const [displayForm, setDisplayForm] = useState(false)
    const [individualForm, setIndividualForm] = useState(false)
    const [replyId, setReplyId] = useState(-1)

    const onReplybutton = () => {
        setDisplayForm(true)
    }

    const onIndividualReplyButton = (id: number) => {
        setIndividualForm(true)
        setReplyId(id)
    }

    return (
        <div className="Comment-List">
            {props.comments.map(comment => {
                return (

                    <div id={comment.id.toString()} key={comment.id}>
                        {props.currentPostId !== -1 && props.currentPostId !== undefined &&
                            <div>
                                <Comment
                                    className="Comments"
                                    author={comment.email}
                                    content={comment.body}
                                    actions={[
                                        <span
                                            key={comment.id}
                                            onClick={() => onIndividualReplyButton(comment.id)}
                                        >
                                            <a>Reply to</a>
                                        </span>]}
                                >
                                    {(individualForm && replyId === comment.id) &&
                                        <ReplyForm
                                            commentId={comment.id}
                                            setIndividualForm={setIndividualForm}
                                        />
                                    }

                                    {reply?.length > 0 && reply.map((data: AddCommentInterface) => {
                                        const individualTag = data.tags.map((tag: string) => {
                                            return (<Tag color="success" key={data.postId}>{tag}</Tag>)
                                        })
                                        const body = <div>
                                            <div className="reply-body">{data.body}</div>
                                            <div className="reply-tags">{individualTag}</div>
                                            <div className="reply-username">{data.username}</div>
                                        </div>
                                        return (
                                            <div>
                                                {data.replyTo === comment.id &&
                                                    <Comment
                                                        className="Nested-Comments"
                                                        author={data.email}
                                                        content={body}
                                                    />
                                                }
                                            </div>
                                        )
                                    })}
                                </Comment>
                                <Divider />
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default CommentsList