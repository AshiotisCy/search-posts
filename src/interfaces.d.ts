interface AddCommentInterface {
    postId: string
    email: string
    username: string
    body: string
    tags: string[]
    replyTo: number | undefined
}

interface PostInterface {
    id: number
    title: string
    userId: number
    body: string
}

interface UserAddress {
    street: string
    suite: string
    city: string
    zipcode: string
}

interface UserCompany {
    name: string
    catchPhrase: string
    bs: string
}

interface UserInterface {
    id: number
    username: string
    name: string
    email: string
    phone: string
    website: string
    address: UserAddress
    company: UserCompany
}

interface CommentInterface {
    postId: number
    id: number
    email: string
    body: string,
    username: string,
    tags: string[],
    replies: CommentInterface[],
    replyingTo: number
}

interface DefaultState extends DefaultRootState {
    avatar: UserInterface,
    posts: PostInterface[],
    postComments: AddCommentInterface[],
    users: UserInterface[],
    selectedPost: CommentInterface
    getComments: CommentInterface[]

  }

export {
    AddCommentInterface,
    PostInterface,
    UserInterface,
    CommentInterface,
    DefaultState
}