import { doc, setDoc } from "firebase/firestore";
import { BaseItem, SnackbarTexts } from "../../const/types";
import { BaseFirestoreResposne } from "./fetch";
import { db, storage } from "../main";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";




export const addItemFromForm = async (
  data: BaseItem,
  files: File[]
): Promise<BaseFirestoreResposne> => {
  try {
    const dbId = uuidv4();
    const itemRef = doc(db, "items", dbId);
    for (let i = 0; i < files.length; i++) {
      const res = await uploadImage(files[i], dbId + "-" + i);
      if (res.error) {
        return res;
      }
    }
    console.log("uploaded all");
    await setDoc(
      itemRef,
      { ...data, imageCount: files.length, dbId },
      { merge: true }
    );
    return {
      error: false,
      text: SnackbarTexts.succesfulDbAddition,
    };
  } catch (e) {
    return {
      error: true,
      text: SnackbarTexts.unsuccesfulDbAddition + e.code,
    };
  }
};

const uploadImage = async (
  file: File,
  fileName: string
): Promise<BaseFirestoreResposne> => {
  try {
    const storageRef = ref(storage, fileName);
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
