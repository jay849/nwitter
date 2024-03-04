import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuidv4} from 'uuid';
import { useState, useEffect } from "react";

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect (() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) =>{
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = "";
        if ( attachment !== ""){

            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            // console.log("파일 업로드 응답:", await getDownloadURL(response.ref));
            attachmentUrl = await getDownloadURL(response.ref);
            // 파일이 성공적으로 업로드되었을 때 추가 작업을 수행할 수 있습니다.
        }
            await addDoc(collection(dbService,"nweets"),{
                text: nweet,
                createdAt : Date.now(),
                creatorId: userObj.uid,
                attachmentUrl,
            });
            setNweet(""); 
            setAttachment("");
    
    };
 

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
       const{
        target: { files },
       } = event;
       const theFile = files[0];
       const reader = new FileReader();
       reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
       };
       reader.readAsDataURL(theFile);

    };

    const onClearAttachment = () => setAttachment("");

    return(
        <>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet" />  
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="attachment preview" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>   
            )}  
        </form>

        <div>
            {nweets.map((nweet) => (
              <Nweet
               key = {nweet.id} 
               nweetObj = {nweet}
               isOwner = {nweet.creatorId === userObj.uid}
            />   
            ))}
        </div>
        </>
    );
    
};

export default Home;