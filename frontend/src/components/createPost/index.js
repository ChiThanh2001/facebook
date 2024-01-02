import { Feeling, LiveVideo, Photo } from "../../svg";
import UserMenu from "../header/userMenu";
import "./style.css";
export default function CreatePost({user, setVisible, eachUserProfile, margin }) {
  return (
    eachUserProfile && user.id === eachUserProfile._id ? (
      <div className={`createPost ${margin ? 'fix_margin' : ''}`}>
        <div className="createPost_header">
          <img src={eachUserProfile?.picture || user?.picture} alt="error" />
          <div className="open_post hover2" onClick={ ()=> setVisible(true) }>
            What's on your mind, {eachUserProfile?.first_name}
          </div>
        </div>
        <div className="create_splitter"></div>
        <div className="createPost_body">
          <div className="createPost_icon hover1">
            <LiveVideo color="#f3425f" />
            Live Video
          </div>
          <div className="createPost_icon hover1">
            <Photo color="#4bbf67" />
            Photo/Video
          </div>
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feeling/Activity
          </div>
        </div>
      </div>
    ):eachUserProfile && user.id !== eachUserProfile._id ? "":(
      <div className={`createPost ${margin ? 'fix_margin' : ''}`}>
        <div className="createPost_header">
          <img src={eachUserProfile?.picture || user?.picture} alt="error" />
          <div className="open_post hover2" onClick={ ()=> setVisible(true) }>
            What's on your mind, {user?.first_name}
          </div>
        </div>
        <div className="create_splitter"></div>
        <div className="createPost_body">
          <div className="createPost_icon hover1">
            <LiveVideo color="#f3425f" />
            Live Video
          </div>
          <div className="createPost_icon hover1">
            <Photo color="#4bbf67" />
            Photo/Video
          </div>
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feeling/Activity
          </div>
        </div>
      </div>
    )
  );
}
