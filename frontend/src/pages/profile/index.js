import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../function/reducers";
import Header from "../../components/header";
import Cover from "./Cover";
import "./style.css"
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import CreatePostPopup from "../../components/createPostPopup";
import { useState } from "react";
import Post from "../../components/post";
import { getUserPosts } from "../../function/post";

export default function Profile() {
  const [visible, setVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)
  
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [posts, setPosts] = useState([])
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log('data',data)
      if (data.ok === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  const userPosts = async ()=>{
    try {
      const data = await getUserPosts(user.id, user.token)
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    userPosts()
  },[refresh])

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_container">
        <div className="profile_top">
          <div className="profile_container">
            <Cover cover={profile.cover} />
            <ProfielPictureInfos profile={profile}/>
            <ProfileMenu />
          </div>
        </div>
        <div className="profile_body">
          {visible && <CreatePostPopup user={user} setVisible={setVisible} setRefresh={setRefresh}/>}
          <div className="body_left">
            <ProfileLeft />
          </div>
          <div className="body_right">
            <ProfileRight setVisible={setVisible}/>
            {posts.map(post=>{
              return <Post key={post._id} post={post} setRefresh={setRefresh}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
