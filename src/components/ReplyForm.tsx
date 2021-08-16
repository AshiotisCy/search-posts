import { Button, Col, Form, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { AddCommentInterface } from "../interfaces";
import { v4 as uuid } from 'uuid';

import Tags from "../tags/Tags.json";
import * as actions from "../redux/actions"
import { useDispatch } from "react-redux";

const { Option } = Select



function ReplyForm(props: {
    commentId: number
    setIndividualForm: (value: boolean) => void
}) {

    const dispatch = useDispatch()

    const [tags, setTags] = useState([])
    const [replyComment, setReplyComment] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [invalid, setInvalid] = useState("")

    useEffect(() => {
        let selectOptions: JSX.Element[] = []
        Tags.tags.forEach((tag) => {
            selectOptions.push(<Option key={tag} value={tag}>{tag}</Option>)
        })
        setTags(selectOptions as never[])
    }, [])

    const fillReplyComment = (comment: string) => {
        setInvalid("")
        setReplyComment(comment)
    }

    const hanldeSelectedTags = (value: string) => {
        setSelectedTags(value as never)
    }

    const onSubmitReply = () => {
        if (replyComment) {
            const replyPayload: AddCommentInterface = {
                postId: uuid(), //Here i could have used a normal ID as a number but i find the uuid more appropriate since i want to create unique ids
                email: "welemG@post-comments.com",
                username: "WelemG",
                body: replyComment,
                tags: selectedTags,
                replyTo: props.commentId
            }
            dispatch(actions.postComments(replyPayload as never))
            props.setIndividualForm(false)
        }
        if(replyComment==="") {
            setInvalid("invalid-border")
            setErrorMessage("You cannot submit an empty comment.")
        }
        else {
            setInvalid("invalid-border")
            
        }

    }

    return (
        <div className="Reply-Form">
            <Form.Item>
                <TextArea
                    className={`comment-area ${invalid}`}
                    onChange={(e) => fillReplyComment(e.target.value)}
                    value={replyComment}
                    rows={3}
                    maxLength={500}
                    showCount={true}
                />
                {replyComment === "" &&
                    <div className="ErrorMessage">
                        {errorMessage}
                    </div>
                }
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={5}>
                        <Button
                            onClick={() => onSubmitReply()}>
                            Reply
                        </Button>
                    </Col>
                    <Col span={19}>
                        <Select
                            mode="multiple"
                            placeholder="Select your tags"
                            onChange={hanldeSelectedTags}
                        >
                            {tags}
                        </Select>
                    </Col>

                </Row>
            </Form.Item>

        </div>
    )
}

export default ReplyForm