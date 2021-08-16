import { Button, Modal } from "antd"
import { UserInterface } from "../interfaces"

function UserInformation(props: {
    avatar: UserInterface,
    showModal: boolean,
    setShowModal: (value: boolean) => void
}) {

    const {avatar, showModal, setShowModal} = props

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <Modal
            title="User's Information"
            visible={showModal}
            onCancel={onCloseModal}
            footer={[
                <Button key="close" onClick={onCloseModal}> Close </Button>
            ]}
        >
            <div>
                <label>Name: {avatar.name}</label> <br></br>
                <label>Username: {avatar.username}</label> <br></br>
                <label>Email: {avatar.email}</label> <br></br>
                <label>Phone: {avatar.phone}</label> <br></br>
                <label>Website: <a href={`${avatar.website}`} target="_blank">{avatar.website}</a></label>
            </div>
        </Modal>
    )
}

export default UserInformation