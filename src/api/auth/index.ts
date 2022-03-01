import app from "api/firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  return signInWithPopup(auth, provider);
};

const signUpWithEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return createUserWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
};

const signInWithEmail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return signInWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;
  //   console.log(user);
  //   // ...
  // })
  // .catch((error) => {
  //   console.log(error);
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
};

const logOut = () => {
  // signOut(auth)
  //   .then(() => {
  //     // Sign-out successful.
  //   })
  //   .catch((error) => {
  //     // An error happened.
  //   });
  return signOut(auth);
};

export { signUpWithEmail, signInWithEmail, signInWithGoogle, logOut };
