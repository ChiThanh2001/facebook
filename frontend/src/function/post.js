import axios from 'axios'

export const createPost = async (type,text,images,user,token)=>{
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createPost`, {
            type,
            text,
            images,
            user,
            token
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return "ok"
    } catch (error) {
        return error.response.data.message
    }
}

export const comment = async (postId, comment, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment`,
        {
          postId,
          comment,
        },
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
};

export const getCommentsBelongToPost = async (postId,token)=>{
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCommentsByPost/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    return error.response.data.message;
  }
}

export const reactPost = async (postId, react, token)=>{
  try {
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/reactPost`, {
         postId,
         react
      }, {
          headers:{
              Authorization: `Bearer ${token}`
          }
      })

      return "ok"
  } catch (error) {
      return error.response.data.message
  }
}

export const getReacts = async (postId, token)=>{
  try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`, {
          headers:{
              Authorization: `Bearer ${token}`
          }
      })

      return data
  } catch (error) {
      return error.response.data.message
  }
}
