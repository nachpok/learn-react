import React, { useState, useContext, useEffect } from "react";
import { User } from "firebase/auth";
import Firebase from "../ToDo/Firebase";

//Todo set user as type of AuthContext
interface AuthContextType {}

const AuthContext = React.createContext<any | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  firebase: Firebase;
  children: any;
}

export function AuthProvider({ firebase, children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string) {
    return firebase.signUpWithEmail(email, password);
  }
  function login(email: string, password: string) {
    return firebase.signInWithEmail(email, password);
  }
  function logout() {
    setCurrentUser(null);
    return firebase.logout();
  }
  function googleLogin() {
    return firebase.loginWithGoogle();
  }
  function githubLogin() {
    return firebase.loginWithGithub();
  }
  function resetPassword(email: string) {
    return firebase.resetPassword(email);
  }
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
      if (user) {
        firebase.setUserPath(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleLogin,
    githubLogin,
    resetPassword,
  };
  //
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
