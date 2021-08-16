import {combineReducers} from 'redux'

const avatar = (state = {}, action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "AVATAR_SELECTED":
            return payload
        default:
            return state
    }
}

const users = (state = [], action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "SET_USERS":
            return payload
        default:
            return state
    }
}

const posts = (state = [], action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "SET_POSTS":
            return payload
        default:
            return state
    }
}

const selectedPost = (state = {}, action: any) => {
    switch (action?.type) {
        case "SELECTED_POST":
            return action.payload
        default:
            return state
    }
}

const getComments = (state = [], action: any) => {
    switch (action?.type) {
        case "GET_COMMENTS":
            return action.payload
        default:
            return state
    }
}

const postComments = (state = [], action: any) => {
    switch (action?.type) {
        case "POST_COMMENTS":
            return [
                ...state,
                action?.payload
            ]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    avatar,
    users,
    posts,
    selectedPost,
    getComments,
    postComments
})

export default rootReducer