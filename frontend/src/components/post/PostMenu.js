import React, { useRef, useState } from 'react'
import MenuItem from './MenuItem'
import useClickOutSide from "../../helpers/clickOutside";

const PostMenu = ({userId, postUserId, imagesLength, setShowMenu}) => {
    const [myPost, setMyPost] = useState(userId === postUserId)
    const menu = useRef(null)
    useClickOutSide(menu, ()=>setShowMenu(false))

    return (
        <ul className="post_menu" ref={menu}>
            {myPost && <MenuItem icon="pin_icon" title="Pin Post" />}
            <MenuItem icon="save_icon" title="Save Post" subtitle="Add this to your saved items" />
            <div className="line"></div>
            {myPost && <MenuItem icon="edit_icon" title="Edit Post" />}
            {imagesLength && <MenuItem icon="download_icon" title="Download" />}
            {imagesLength && <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />}
            {myPost && <MenuItem icon="edit_icon" title="Edit Post" />}
            {myPost && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
            {myPost && <MenuItem icon="turnOffNotifications_icon" title="Turn off notification for this post" />}
            {myPost && <MenuItem icon="delete_icon" title="Turn off translation" />}
            {myPost && <MenuItem icon="date_icon" title="Edit Date" />}
            {myPost && (
                <MenuItem icon="refresh_icon" title="Refresh share attachment" />
            )}
            {myPost && <MenuItem icon="archive_icon" title="Move to archive" />}
            {myPost && (
                <MenuItem
                icon="trash_icon"
                title="Move to trash"
                subtitle="items in your trash are deleted after 30 days"
                />
            )}
            {!myPost && <div className="line"></div>}
            {!myPost && (
                <MenuItem
                img="../../../icons/report.png"
                title="Report post"
                subtitle="i'm concerned about this post"
                />
            )}            
        </ul>
    )
}

export default PostMenu
