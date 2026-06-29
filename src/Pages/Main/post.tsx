import { addDoc, getDocs, collection, query, where,deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Config/FireBase";
import type { IPost } from "./Main-Page"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost,
}
interface Like {
    LikeID: string,
    UserId: string,
}
export const PostCard = (props : Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes,setlikes] = useState<Like[]|null>(null);
    const likesref = collection(db, "Likes");
    const likesDoc = query(likesref, where("PostId", "==", post.id));
    const onCreateLike = async () => {
        try{
        if (user){
        const newDoc = await addDoc(likesref, { UserId: user.uid, PostId: post.id});
        setlikes((prev) => prev ? [...prev, { UserId: user.uid, LikeID: newDoc.id }] : [{ UserId: user.uid, LikeID: newDoc.id }]);}
        }catch(err){
            console.log(err);
        }
    };
    const onRemoveLike = async () => {
        try {
            if (!user) return;
            const likeToDeleteQuery = query(likesref, where("PostId", "==", post.id), where("UserId", "==", user.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            if (!likeToDeleteData.empty) {
                const likeID = likeToDeleteData.docs[0].id;
                const likeToDelete = doc(db, "Likes", likeID);

                await deleteDoc(likeToDelete);
                setlikes((prev) => prev ? prev.filter((like) => like.LikeID !== likeID) : null);
            }
        } catch (err) {
            console.error("Error removing like:", err);
        }
    };

    const getLikes = async () =>{
        const data = await getDocs(likesDoc);
        setlikes(data.docs.map((doc) => ({ UserId: doc.data().UserId, LikeID: doc.id })));
    }
    useEffect(()=>{
    getLikes();
    },[]);

    const hasUserLiked = likes?.find((like) => like.UserId === user?.uid)

    return (
        <div>
            <div className="user">
                <p>@{post.UserName}</p>
            </div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <button onClick={hasUserLiked? onRemoveLike:onCreateLike}> {hasUserLiked? <>&#128078;</>:<>&#128077;</>} </button>
                <p>Likes: {likes? likes.length:0}</p>
            </div>
        </div>
    )
}