import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../Config/FireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("You Must Add a Title for your Post"),
        description: yup.string().required("You Must Add Some Description for your Post"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    
    const postsref = collection(db, "Posts");
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsref, {
            ...data,
            UserName: user?.displayName,
            UserId: user?.uid
        });
        navigate("/");
    };
    
    return (
        <form onSubmit={handleSubmit(onCreatePost)} className="post-form">
            <input type="text" placeholder="Title..." {...register("title")} className="form-input" />
            <p className="error-msg">{errors.title?.message}</p>
            
            <textarea placeholder="Description..." {...register("description")} className="form-textarea" />
            <p className="error-msg">{errors.description?.message}</p>
            
            <input type="submit" value="Submit Post" className="submit-btn" />
        </form>
    );
};