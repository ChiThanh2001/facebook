import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { getProfileDetail } from "../../function/user";

export default function ProfileLeft({ user, refreshDetails, profileId }){
    const [details, setDetails] = useState({})

    const getDetailsData = async ()=>{
        const data = await getProfileDetail(profileId,user.token)
        setDetails(data)
    }

    useEffect(()=>{
        getDetailsData()
    },[refreshDetails, profileId])

    return (
        <div className="left_container">
            <div className="introduce">
                <span class="introduce_title">Introduce</span>
                <div className="detail">
                    <span>{!details?.bio ? 'Bạn chưa đặt thông tin về bio' : details.bio}</span>
                </div>
                <div className="button_edit">
                    <button>Edit Profile</button>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/job.png" />
                    <span>{!details?.job ? 'Bạn chưa đặt thông tin về công việc' : details.job}</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/job.png" />
                    <span>{!details?.workplace ? 'Bạn chưa đặt thông tin về nơi làm việc' : details.workplace}</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/studies.png" />
                    <span>{!details?.highschool ? 'Bạn chưa đặt thông tin về trường' : details.highschool}</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/home.png" />
                    <span>{!details?.living ? 'Bạn chưa đặt thông tin về nơi ở' : details.living}</span>
                </div>
                <div className="info_profile">
                    <img src="../../../icons/home.png" />
                    <span>{!details?.hometown ? 'Bạn chưa đặt thông tin về đất nước' : details.hometown}</span>
                </div>
                <div className="info_profile">
                    <FaHeart />
                    <span className="married">{!details?.relationship ? 'Bạn chưa đặt thông tin tình trạng quan hệ' : details.relationship}</span>
                </div>
            </div>
            <div className="picture">

            </div>
        </div>
    )
}