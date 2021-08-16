import { 
    CommentInterface,
    PostInterface,
    UserInterface,
    AddCommentInterface
} from "../../interfaces"


const avatarSelected = (avatar: UserInterface) => {
    return {
        type: "AVATAR_SELECTED",
        payload: avatar
    }
}

const setUsers = (users: UserInterface[]) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}

const setPosts = (posts: PostInterface[]) => {
    return {
        type: "SET_POSTS",
        payload: posts
    }
}
  
const setSelectedPost = (post: PostInterface) => {
    return {
        type: "SELECTED_POST",
        payload: post
    }
}

const getComments = (comments: CommentInterface[]) => {
    return {
        type: "GET_COMMENTS",
        payload: comments
    }
}

const postComments = (comments: AddCommentInterface[]) => {
    return {
        type: "POST_COMMENTS",
        payload: comments
    }
}

const addReply = (comment: AddCommentInterface) => {
    return {
        type: "ADD_REPLY",
        payload: comment
    }
}

export {
    avatarSelected,
    setUsers,
    setPosts,
    setSelectedPost,
    getComments,
    postComments,
    addReply
}