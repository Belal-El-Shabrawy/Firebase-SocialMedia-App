import { Link } from "react-router-dom";
import { auth } from "../Config/FireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user && <Link to="/Login">Login</Link>}
                {user && <Link to="/CreatePost">Create-Post</Link>}
            </div>
            
            <div className="user">
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img 
                            src={user?.photoURL || ""} 
                            width="20px" 
                            height="20px" 
                            alt="Profile" 
                        />
                        <button onClick={signUserOut} className="logout-btn">
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};