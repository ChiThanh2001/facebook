import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import { useState } from "react";
export default function Post({ post }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type == "cover" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div className="post_header_right hover1">
          <Dots color="#828387" />
        </div>
      </div>
      <div className="post_body">
        <div className="post_text">
          {post.text}
        </div>
        <div className={
                post.images?.length === 1
                  ? "grid_1"
                  : post.images?.length === 2
                  ? "grid_2"
                  : post.images?.length === 3
                  ? "grid_3"
                  : post.images?.length === 4
                  ? "grid_4"
                  : post.images?.length >= 5 && "grid_5"
              }
          >
          {post.images?.map((image, index)=>{
            return <img src={image.url} className={`img-${index}`} alt=""/>
          })}                 
        </div>
      </div>
      <div className="post_bottom">
          <div className="post_info">
            <div className="comment">10 comment</div>
            <div className="share">1 share</div>
          </div>
          <div className="post_react">
            {/* <ReactPopup visible={visible} setVisible={setVisible}/> */}
            <div className="post_action" onMouseOver={()=>{
              setTimeout(()=>{
                setVisible(true)
              },500)
            }} onMouseLeave={()=>{
              setTimeout(()=>{
                setVisible(false)
              },500)
            }}>
              <ReactPopup visible={visible} setVisible={setVisible}/>
              <i className="like_icon"></i>
              <span>Like</span>
            </div>
            <div className="post_action">
              <i className="comment_icon"></i>
              <span>Comment</span>
            </div>
            <div className="post_action">
              <i className="share_icon"></i>
              <span>Share</span>
            </div>
          </div>
          <div className="post_comment">

          </div>
      </div> 
    </div>
  );
}
