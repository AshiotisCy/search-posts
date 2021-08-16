import { Avatar, Col, Divider } from "antd"
import { useDispatch } from "react-redux"
import { UserInterface } from "../interfaces"
import * as actions from "../redux/actions"

function Avatars(props: {
    users: UserInterface[],
    avatarId: number
    setAvatarId: (avatarId: number) => void
    setCurrentPostId: (postId: number) => void
}) {

    const dispatch = useDispatch()

    const onAvatarSelected = (user: UserInterface) => {
        props.setAvatarId(user.id)
        props.setCurrentPostId(-1)
        dispatch(actions.avatarSelected(user))
    }

    return (
        <div className="Avatars">
            {props.users && props.users.map(user => {
                const border = props.avatarId === user.id ? "selected-avatar" : undefined
                return (
                    <div key={user.id} className="user-Avatar" onClick={() => onAvatarSelected(user)}>
                        <Avatar className={border} size={60}>{user.username}</Avatar>
                    </div>
                )
            })}
        </div>
    )
}

export default Avatars