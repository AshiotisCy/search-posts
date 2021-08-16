import { Card, Tooltip } from "antd"
import { useDispatch } from "react-redux"
import { PostInterface, UserInterface } from "../interfaces"
import * as actions from "../redux/actions"

function PostList(props: {
    posts: PostInterface[],
    avatar: UserInterface
    setShowModal: (value: boolean) => void
    currentPostId: number
}) {

    const { posts, avatar, setShowModal, currentPostId } = props

    const dispatch = useDispatch()

    const onPostSelected = (post: PostInterface) => {
        dispatch(actions.setSelectedPost(post))
    }

    return (
        <div className="post-List">
            {posts.map((post: PostInterface) => {
                const selectedPost = currentPostId === post.id ? "selected-post" : ""
                return (
                    <div key={post.id} className="individual-post" onClick={() => onPostSelected(post)}>
                        <Card
                            className={`post ${selectedPost}`}
                            title={post.title}>
                            <p>{post.body}</p>
                            <Tooltip placement="right" title={"Click to view User's Information"}>
                                <a onClick={() => setShowModal(true)}>{avatar.username}</a>
                            </Tooltip>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default PostList