import axios from 'axios'

export const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')
export const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')
export const getPostsbyUserId = (userId: number) => axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
export const getCommentsById = (postId: number) => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)