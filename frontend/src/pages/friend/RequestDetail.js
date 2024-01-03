import React from 'react'

const RequestDetail = ({request}) => {
  return (
    <div className='listRequest'>
        <div className="title">
            <img src={request.picture} className='avatar' />
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
