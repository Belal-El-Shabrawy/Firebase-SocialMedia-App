import { getDocs,collection } from "firebase/firestore";
import { db } from "../../Config/FireBase";
import { useEffect, useState } from "react";
import { PostCard } from "./post";
export interface IPost { 
    id:string,
    UserId:string,
    title:string,
    description:string,
    UserName:string,
}

export const Main = () => {
    const [postslist, setpostslist] = useState<IPost[] | null>(null);
    const postsref = collection(db,"Posts");

    const getposts = async () =>{
        try {
        const data = await getDocs(postsref);
        setpostslist(data.docs.map((doc) => ({...doc.data(), id: doc.id })) as IPost[]);}
        catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    useEffect(() => {
    getposts();
    }, []);
    return (
        <div className="page-container">
            <div className="card">
                <h1>Home</h1>
                <div>{postslist?.map((post) => <PostCard key={post.id} post={post}/>)}</div>
            </div>
        </div>
    );
};