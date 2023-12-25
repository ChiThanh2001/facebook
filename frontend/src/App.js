import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import Profile  from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./function/reducers";

function App() {
  const [visible, setVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const { user } = useSelector(state=> ({...state}))
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  
  useEffect(() => {
    getAllPosts();
  }, [user, refresh]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} setRefresh={setRefresh}/>}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element = {<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile setRefresh={setRefresh} />} />
          <Route path="/" element={<Home setVisible={setVisible} posts={posts} setRefresh={setRefresh}/>} />
        </Route>
        <Route path='/activate/:token' element={<Activate />}/>
        <Route path='/reset' element={<Reset />}/>
      </Routes>
    </div>
  );
}

export default App;
