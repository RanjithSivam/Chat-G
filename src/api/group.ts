import { db } from "api/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

// @ts-ignore
import uniqid from "uniqid";

const getGroup = async () => {
  const group = await getDocs(collection(db, "group"));
  return group.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

const subscribeGroup = async (cb: Function) => {
  const unsuscribe = await onSnapshot(collection(db, "group"), (doc) => {
    cb(
      doc.docs.map((e) => {
        return {
          id: e.id,
          ...e.data(),
        };
      })
    );
  });

  return unsuscribe;
};

const postGroup = async ({
  name,
  owner,
  description,
  creationDate,
}: {
  name: string;
  owner: string;
  description: string;
  creationDate: Date;
}) => {
  await addDoc(collection(db, "group"), {
    name,
    owner,
    description,
    creationDate,
    chatId: uniqid(),
    member: [owner],
  });
};

const addMember = (uid: string, groupId: string) => {
  return setDoc(
    doc(db, "group", groupId),
    {
      member: arrayUnion(uid),
    },
    {
      merge: true,
    }
  );
};

export { getGroup, postGroup, subscribeGroup, addMember };
