import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { BaseItem, Item } from "../const/types";
import { db, storage } from "./main";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const tryToUploadImg = async (file: any, fileName: string) => {
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const addItemFromForm = async (
  data: BaseItem,
  files: File[]
): Promise<string> => {
  try {
    const dbId = uuidv4();
    const itemRef = doc(db, "items", dbId);
    for (let i = 0; i < files.length; i++) {
      await tryToUploadImg(files[i], dbId + "-" + i);
    }
    await setDoc(
      itemRef,
      { ...data, imageCount: files.length, dbId },
      { merge: true }
    );
    return "success";
  } catch (e) {
    return e.code;
  }
};

export const updateByDbId = async (data: Item) => {
  const itemRef = doc(db, "items", data.dbId);
  const { location, category, name, description, count } = data;
  await setDoc(
    itemRef,
    { location, category, name, description, count },
    { merge: true }
  );
};

export const getAll = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    res.push(doc.data());
  });
  return res;
};

export const getURL = async (imageName: string) => {
  try {
    const url = await getDownloadURL(ref(storage, imageName));
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.open("GET", url);
    xhr.send();
    console.log(url, "url");
    return url;
  } catch (error) {
    console.error(error);
    return "error";
  }
};
