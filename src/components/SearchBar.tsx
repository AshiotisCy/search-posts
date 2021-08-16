import { Input, Divider } from "antd"
import { useContext } from "hoist-non-react-statics/node_modules/@types/react"

const { Search } = Input

function SearchBar(props: {setAvatarFilter: (avatar: string) => void}) {
    return (
        <div className="Search-Header">
            <Search
                placeholder="Search by User <Only>"
                onSearch={(value) => props.setAvatarFilter(value)}
                enterButton
            />
            <Divider />
        </div>

    )
}

export default SearchBar