import { auth, provider } from "../Config/FireBase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/");
    };

    return (
        <div className="login-page">
            {user ? (
                /* This shows instead of the button if they are logged in */
                <div className="card">
                    <p>You are already logged in as {user.displayName}!</p>
                    <button onClick={() => navigate("/")} className="google-btn">
                        Go to Home Page
                    </button>
                </div>
            ) : (
                /* This shows if they are logged out */
                <>
                    <p>Sign In With Google To Continue</p>
                    <button onClick={signInWithGoogle} className="google-btn">
                        Sign In With Google
                    </button>
                </>
            )}
        </div>
    );
};