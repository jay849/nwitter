import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [ editing, setEnditing] = useState(false);
    const [ newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick =  async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if(ok) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            // console.log(data); 

            if (nweetObj.attachmentUrl !== "")
                                /* const fileRef = ref(storageService, nweetObj.attachmentUrl);
                await deleteObject(fileRef); */
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    };

    const toggleEditing = () => setEnditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "nweets", nweetObj.id), {text: newNweet});
        setEnditing(false);
    };

    return(
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                            onChange={onChange}
                            value={newNweet}
                            required
                            placeholder="Edit your nweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && (
                    <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                )}
                {isOwner && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>                        
                    </div>
                )}
            </>
            )}
        </div>
    );
};

export default Nweet;