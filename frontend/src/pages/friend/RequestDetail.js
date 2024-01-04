import React from 'react'
import { Link } from 'react-router-dom'

const RequestDetail = ({request}) => {
  return (
    <div className='listRequest'>
        <div className="title">
            <Link to={`/profile/${request.username}`}>
              <img src={request.picture} className='avatar' />
            </Link>
            <div className='name'>{request.first_name + " " +request.last_name}</div>
        </div>
        <div>
            {request.first_name + " " +request.last_name} want to be your friend
        </div>
        <div className="request">
            <button className='btn_accept'>Accept</button>
            <button className='btn_deny'>Deny</button>
        </div>
    </div>
  )
}

export default RequestDetail
