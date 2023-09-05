import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../ToDoX/ToDoStore";
import Signup from "./Signup";

const SignIn: React.FC = () => {
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebase.getAuth(), email, password);
    } catch (error) {
      console.error("SignIn.Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.getAuth().signOut();
    } catch (error) {
      console.error("SignIn.Error signing out:", error);
    }
  };

  return (
    <div>
      <Signup />
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignIn;
