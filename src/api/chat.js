import { db } from "api/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const subscribeChat = async (chatId, cb) => {
  try {
    const unsub = onSnapshot(doc(db, "chat", chatId), (doc) => {
      cb(doc.data());
    });
    return unsub;
  } catch (err) {
    console.log(err);
  }
};

const getChat = async () => {
  const result = await getDocs(collection(db, "chat"));
  return result.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

const addChat = async (chatId, userId, name, photoURL, message) => {
  await setDoc(
    doc(db, "chat", chatId),
    {
      [new Date().getMonth() +
      1 +
      " " +
      new Date().getDate() +
      " " +
      new Date().getFullYear()]: arrayUnion({
        userId,
        message,
        time: new Date().getTime(),
        name,
        photoURL,
      }),
    },
    { merge: true }
  );
};

export { subscribeChat, addChat, getChat };
