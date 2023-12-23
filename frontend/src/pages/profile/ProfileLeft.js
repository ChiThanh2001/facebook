import { FaHeart } from "react-icons/fa";

export default function ProfileLeft(){
    return (
        <div className="left_container">
            <div className="introduce">
                <span class="introduce_title">Introduce</span>
                <div className="detail">
                    <span>View này anh thường hay ngồi chill em thì pha trà ấm</span>
                </div>
                <div className="button_edit">
                    <button>Edit Profile</button>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/job.png" />
                    <span>Work at Salesforce</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/job.png" />
                    <span>Fullstack and SFCC developer</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/studies.png" />
                    <span>Studied at Thuy Loi university</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/home.png" />
                    <span>Living in Hanoi</span>
                </div>
                <div className="info_profile">
                    <FaHeart />
                    <span className="married">Married</span>
                </div>
            </div>
            <div className="picture">

            </div>
        </div>
    )
}