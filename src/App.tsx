import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultState, UserInterface } from "./interfaces";
import { Divider, Row, Col, message } from "antd"
import * as actions from "./redux/actions"
import * as apis from "./apiCalls/api"
import SearchBar from "./components/SearchBar";
import Avatars from "./components/Avatars";
import PostList from "./components/PostList";
import UserInformation from "./components/UserInformation";
import CommentsList from "./components/CommentsList";
import { invalidUser } from "./components/Utils";


function App() {

  const dispatch = useDispatch()

  const users = useSelector((state: DefaultState) => state.users)
  const avatar = useSelector((state: DefaultState) => state.avatar)
  const posts = useSelector((state: DefaultState) => state.posts)
  const selectedPost = useSelector((state: DefaultState) => state.selectedPost)
  const postedComments = useSelector((state: DefaultState) => state.postComments)

  const [avatarFilter, setAvatarFilter] = useState("")
  const [avatarId, setAvatarId] = useState(-1)
  const [ShowModal, setShowModal] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(-1)
  const [commentList, setCommentList] = useState([])
  const [filteredUser, setFilteredUser] = useState([])
  

  //Get Users
  useEffect(() => {
    apis.getUsers().then(response => {
      dispatch(actions.setUsers(response.data))
    })
  }, [])

  //Get Posts
  useEffect(() => {
    if (Object.entries(avatar).length !== 0) {
      apis.getPostsbyUserId(avatar.id).then(response => {
        dispatch(actions.setPosts(response.data))
      })
    }
    setCommentList([])
  }, [avatar])

  //Get Comments
  useEffect(() => {
    if (Object.entries(selectedPost).length !== 0) {
      apis.getCommentsById(selectedPost.id).then(response => {
        dispatch(actions.getComments(response.data))
        setCommentList(response.data)
      })
    }
    setCurrentPostId(selectedPost.id)
  }, [selectedPost])

  //Search by User
  useEffect(() => {
    if (avatarFilter !== "") {
      const filterUser = users.find((user: UserInterface) => {
        if (user.username.toLowerCase() === avatarFilter.toLowerCase()) {
          return user.username.toLowerCase() === avatarFilter.toLowerCase()
        }
      })
      if (filterUser) {
        setAvatarId(filterUser?.id ?? -1)
        setCurrentPostId(-1)
        setFilteredUser([filterUser] as never)
        dispatch(actions.avatarSelected(filterUser ?? invalidUser))
      }
      else {
        message.error("No such User can be found")
        setAvatarFilter("")
        setCurrentPostId(-1)
      }
    } 
  }, [avatarFilter])

  return (
    <div className="App">
      {console.log("current", currentPostId)}
      <SearchBar
        setAvatarFilter={setAvatarFilter}
      />
      <Row>
        <Col span={2}>
          <Avatars
            users={avatarFilter !== "" ? filteredUser : users}
            avatarId={avatarId}
            setAvatarId={setAvatarId}
            setCurrentPostId={setCurrentPostId}
          />
        </Col>
        <Divider type="vertical" />
        <Col span={10}>
          <PostList
            posts={posts}
            avatar={avatar}
            setShowModal={setShowModal}
            currentPostId={currentPostId}
          />
        </Col>
        <Divider type="vertical" />
        <Col span={10}>
          <CommentsList
            comments={commentList}
            currentPostId={currentPostId}
          />
        </Col>
      </Row>
      <UserInformation
        avatar={avatar}
        showModal={ShowModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default App;
