import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { BaseItem } from "../const/types";
import { db, storage } from "./main";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// 'file' comes from the Blob or File API

//

const tryToUploadImg = async (file: any, fileName: string) => {
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const updateDb = async (data: BaseItem, files: File[]) => {
  const itemRef = doc(db, "items", data.description);
  const dbId = uuidv4();
  for (let i = 0; i < files.length; i++) {
    await tryToUploadImg(files[i], dbId + "-" + i);
  }
  await setDoc(
    itemRef,
    { ...data, imageCount: files.length, dbId },
    { merge: true }
  );
};

export const getAll = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    res.push(doc.data());
  });
  return res;
};

export const getURL = async (imageName: string) => {
  try{
    const url = await   getDownloadURL(ref(storage, imageName))
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    console.log(url, "url");
    return url;
  }catch(error){
    console.error(error);
    return "error";
  }
  
  
};