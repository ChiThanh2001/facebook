import { useState } from "react";
import Detail from "./Detail";
import { saveProfileDetail } from "../../function/user";
import { useSelector } from "react-redux";

export default function EditDetails({ setOpenEditBox, setRefreshDetails}) {
  const [inputValue, setInputvalue] = useState({
    bio:'',
    othername:'',
    job:'',
    workplace:'',
    highschool:'',
    living:'',
    hometown:'',
    relationship:'',
  })

  const { user } = useSelector(state=> ({...state}))

  const cancelHandler = async ()=>{
    setOpenEditBox(false)
  }
  const saveHandler = async ()=>{
    saveProfileDetail(inputValue,user.token)
    setTimeout(()=>{
      setRefreshDetails(prev => !prev)
    },500)
    setOpenEditBox(false)
  }

  const inputHandler = async (e)=>{
    setInputvalue({...inputValue, [e.target.name]: e.target.value})
  }

  return (
    <div className="blur">
      <div className="postBox infosBox">
        <div className="box_header">
          <div className="small_circle" onClick={cancelHandler}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <Detail
            header="Bio"
            img="studies"
            placeholder="add Bio"
            name="bio"
            inputHandler={inputHandler}
          />
          <Detail
            header="Other Name"
            img="studies"
            placeholder="add other name"
            name="othername"
            inputHandler={inputHandler}
          />
          <Detail
            header="Job"
            img="studies"
            placeholder="add Job"
            name="job"
            inputHandler={inputHandler}
          />
          <Detail
            header="Work Place"
            img="studies"
            placeholder="add Work Place"
            name="workplace"
            inputHandler={inputHandler}
          />
          <Detail
            header="highschool"
            img="studies"
            placeholder="add highschool"
            name="highschool"
            inputHandler={inputHandler}
          />
          <Detail
            header="Relationship"
            img="studies"
            placeholder="add Relationship"
            name="relationship"
            inputHandler={inputHandler}
          />
          <Detail
            header="Living"
            img="studies"
            placeholder="add Living"
            name="living"
            inputHandler={inputHandler}
          />
          <Detail
            header="Hometown"
            img="studies"
            placeholder="add Hometown"
            name="hometown"
            inputHandler={inputHandler}
          />
          <div className="flex flex_right">
            <button className="gray_btn" onClick={ cancelHandler }>Cancel</button>
            <button className="blue_btn" onClick={ saveHandler }>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
