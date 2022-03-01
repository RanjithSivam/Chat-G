import { db } from "api/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const addUser = ({
  displayName,
  email,
  isEmailVerified,
  lastSignInTime,
  phoneNumber,
  photoURL,
  uid,
}: any) => {
  return setDoc(doc(db, "user", uid), {
    displayName,
    email,
    isEmailVerified,
    lastSignInTime,
    phoneNumber,
    photoURL,
  });
};

const isExists = async (uid: string) => {
  const docs = await getDoc(doc(db, "user", uid));
  return docs.exists();
};

const getUser = (uid: string) => {
  return getDoc(doc(db, "user", uid));
};

export { addUser, isExists, getUser };
