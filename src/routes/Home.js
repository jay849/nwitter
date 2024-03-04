// import { dbService } from "fbase";
import { dbService } from "fbase";
import { storageService } from "fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";


const Home = ({userObj}) => {
    // console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const getNweet = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     // console.log(dbNweets);
    //     dbNweets.forEach((document) => {
    //         const nweetObject = { ...document.data(), id: document.id };
    //         setNweets((prev) => [nweetObject, ...prev])
    //     });
    // };

    // useEffect (() => {
    //     const getNweets = async () => {
    //         const querySnapshot = await getDocs(collection(dbService, "nweets"));
    //         const nweetArray = [];
    //         querySnapshot.forEach((doc) => {
    //             nweetArray.push({ id: doc.id, ...doc.data() });
    //         });
    //         setNweets(nweetArray);
    //     };
    //     getNweets();
    // }, []);

    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    // console.log(nweets);

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     /* await addDoc(collection(dbService, "nweets"), {
    //         text: nweet,
    //         createAt: Date.now(),
    //         creatorId: userObj.uid,
    //     });
    //     setNweet(""); */
    //     // Storage에 대한 참조 생성
    //     // storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    //     const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    //     // 데이터 URL 업로드
    //     const upladTask = await uploadString(attachmentRef, attachment, "data_url");
    //     // const response = await attachmentRef.putString(attachment, "data_url");

    //     
    // };
/* 
    const onSubmit = async (event) => {
        event.preventDefault();
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, 'data_url');
        // console.log(await getDownloadURL(response.ref));
        const attachmentUrl = await getDownloadURL(response.ref);
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
       
    };
 */
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await getDownloadURL(response.ref);
        }
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
       
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>    
                    </div>
                    )}
            </form>
            {/* <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div> */}
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
    )
};

export default Home;