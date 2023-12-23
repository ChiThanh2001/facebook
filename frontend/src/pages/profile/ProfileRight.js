import { useSelector } from "react-redux"
import CreatePost from "../../components/createPost"

export default function ProfileRight({ setVisible }){
    const { user } = useSelector( state => ({...state}) )
    console.log(user)
    return (
        <CreatePost user={user} setVisible={setVisible} margin/>
    )
}