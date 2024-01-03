import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { getFriendRequest } from '../../function/user'
import RequestDetail from './RequestDetail'

const FriendRequest = () => {
    const { user } = useSelector(state=> ({...state}))
    const [requestInfo, setRequestInfo] = useState([])
    const getRequest = async ()=>{
        const data = await getFriendRequest(user.id,user.token)
        setRequestInfo(data)
    }

    useEffect(()=>{
        getRequest()
    },[])
    return (
        <>
            {requestInfo.length > 0 ? (
                requestInfo.map((request, index)=> <RequestDetail key={index} request={request} />)
            ):(
                <div>You do not have any friend request</div>
            )}
        </>
    )
}

export default FriendRequest
