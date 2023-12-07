import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import ActivateForm from "../../components/home/activate/ActivateForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";
export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  console.log('reduxxx',user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[error, setError] = useState()
  const[success, setSuccess] = useState()
  const [activateInfo, setActivateInfo] = useState({ message: '' });

  const {token} = useParams()

  useEffect(()=>{
    activateAccount()
  },[])

  const activateAccount = async ()=>{
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/activate/`, {token},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    
        dispatch({type:'VERIFY',payload :{verified: true, picture: data.picture, first_name:data.first_name, last_name: data.last_name}})
        Cookies.set('user',JSON.stringify({verified : true, picture: data.picture, first_name:data.first_name, last_name: data.last_name}))
        setSuccess(true)
        setActivateInfo({message: data.message})

        setTimeout(()=>{
            navigate('/')
        },3000)
    } catch (error) {
        console.log(error)
        setError(true)
        setActivateInfo({message: error.response.data.message})
    }
  }

  return (
    <div className="home">
      {
        error && <ActivateForm header={activateInfo.message} message={activateInfo.message} type='error' />
      }
      {
        success && <ActivateForm header={activateInfo.message} message='Welcome To Facebook' type='success' />
      }
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
