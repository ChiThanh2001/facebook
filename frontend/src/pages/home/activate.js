import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import ActivateForm from "../../components/home/activate/ActivateForm";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie";
export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    
        Cookies.set('user',JSON.stringify({...user, verified: true}))
        dispatch({type:'VERIFY',payload :true})
        setTimeout(()=>{
            navigate('/')
        },3000)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="home">
      <ActivateForm header='Activate account successfully' message='Welcome to Facebook' type='success' />
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
