import { signInWithEmail, signInWithGoogle } from "api/auth";
import app from "api/firebase";
import { addMember } from "api/group";
import { addUser, isExists } from "api/user";
import { getAuth } from "firebase/auth";
import { createContext, useContext, useReducer } from "react";

const AuthContext: any = createContext(null);

const initialState: {
  user: Object | null;
  error: Object | null;
  loading: boolean;
} = {
  user: null,
  error: null,
  loading: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: Object | any }
) => {
  let curr = { ...state, error: null };
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...curr, user: action.payload, loading: false };
    case "LOGIN_FAILURE":
      return { ...curr, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...curr, user: null, loading: false };
    case "LOADING_ON":
      return { ...curr, loading: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const emailAuth = async (email: string, password: string) => {
    try {
      dispatch({ type: "LOADING_ON" });
      const result = await signInWithEmail({ email, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  const googleOAuth = async () => {
    try {
      dispatch({ type: "LOADING_ON" });
      const result = await signInWithGoogle();
      if (!(await isExists(result.user.uid))) {
        registerUser(result);
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  const twitterOAuth = async () => {};

  const facebookOAuth = async () => {};

  const githubOAuth = async () => {};

  const registerUser = async (result: any) => {
    await addUser({
      displayName: result.user.displayName,
      email: result.user.email,
      isEmailVerified: result.user.emailVerified,
      photoURL: result.user.photoURL,
      phoneNumber: result.user.phoneNumber,
      lastSignInTime: result.user.metadata.lastSignInTime,
      uid: result.user.uid,
    });

    await addMember(result.user.uid, "6HocnkpE2onWgkS5DFUi");
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        googleOAuth,
        facebookOAuth,
        githubOAuth,
        twitterOAuth,
        emailAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
