import { doc, setDoc } from "firebase/firestore";
import { BaseItem, SnackbarTexts } from "../../const/types";
import { BaseFirestoreResposne } from "./fetch";
import { myDb, myStorage } from "../main";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";

export const addItemFromForm = async (
  data: BaseItem,
  files: File[]
): Promise<BaseFirestoreResposne &{res:{
  imageCount:number,
  dbId:string,
}}> => {
  try {
    if(data.name==="" || data.description===""){
      throw new Error()
    }
    const dbId = uuidv4();
    const itemRef = doc(myDb, "items", dbId);
    for (let i = 0; i < files.length; i++) {
       await uploadImage(files[i], dbId + "-" + i);
  
    }
    console.log("uploaded all");
    console.log({ ...data, imageCount: files.length, dbId });
    await setDoc(
      itemRef,
      { ...data, imageCount: files.length, dbId },
      { merge: true }
    );
    return {
      error: false,
      text: SnackbarTexts.succesfulDbAddition,
      res:{
        dbId,
        imageCount: files.length
      }
    };
  } catch (e) {
    const mess  =  e.code? e.code:"Dodaj nazwe i opis"
    return {
      error: true,
      text: SnackbarTexts.unsuccesfulDbAddition + mess,
      res:{
        dbId:"null",
        imageCount: files.length
      }
    };
  }
};

const uploadImage = async (
  file: File,
  fileName: string
): Promise<BaseFirestoreResposne> => {
  try {
    const storageRef = ref(myStorage, fileName);
    await uploadBytes(storageRef, file);
    return {
      error: false,
      text: SnackbarTexts.succesfulImageUpload,
    };
  } catch (e) {
    return {
      error: true,
      text: SnackbarTexts.unsuccesfulImageUpload + e.code,
    };
  }
};
