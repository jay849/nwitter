import { authService, dbService } from "fbase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";

// 로그아웃 signOut() 이용!! 
const Profile = ({ userObj }) => {

    const [nweets, setNweets] = useState([]);

    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/")
    };

    const getMyNweets = async () => {
        // const nweets = await collection(dbService, "nweets");
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==" , userObj.uid),
            orderBy("createdAt", "asc")
        );

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const nweets = [];
        querySnapshot.forEach((doc) => {
            nweets.push(doc.data());
            console.log(doc.data());
        });
        // console.log(nweets);
        setNweets(nweets);
    };

    useEffect( () => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );

};

export default Profile;