import { authService, dbService } from "fbase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";
import { updateProfile } from "firebase/auth";

// 로그아웃 signOut() 이용!! 
const Profile = ({ userObj, refreshUser }) => {

    // const [nweets, setNweets] = useState([]);
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/")
    };
    
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            try {
                await updateProfile(userObj, { displayName: newDisplayName });
                refreshUser();
                console.log("프로필 이름이 성공적으로 업데이트되었습니다.");
            } catch (error) {
                console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
            }
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            {/* <div>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div> */}
        </>
    );

};

export default Profile;