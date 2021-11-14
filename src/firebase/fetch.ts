import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { BaseItem, Item } from "../const/types";
import { db, storage } from "./main";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export interface BaseFirestoreResposne {
  text: string;
  error: boolean;
}

const uploadImage = async (
  file: File,
  fileName: string
): Promise<BaseFirestoreResposne> => {
  try {
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    return {
      error: false,
      text: "uploaded file in form",
    };
  } catch (e) {
    return {
      error: true,
      text: e.code,
    };
  }
};

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
      text: "Added item to db and uploaded files",
    };
  } catch (e) {
    return {
      error: true,
      text: e.code,
    };
  }
};

export const updateByDbId = async (
  data: Item
): Promise<BaseFirestoreResposne> => {
  try {
    const itemRef = doc(db, "items", data.dbId);
    const { location, category, name, description, count } = data;
    await setDoc(
      itemRef,
      {
        location: location.toUpperCase(),
        category: category.toLowerCase(),
        name,
        description,
        count,
      },
      { merge: true }
    );
    return {
      error: false,
      text: "Changed item in db",
    };
  } catch (e) {
    return {
      error: true,
      text: e.code,
    };
  }
};

// USED FOR INITIAL FETCH
export type FetchedItems = BaseFirestoreResposne & {
  items: Item[];
};

export const getAll = async (): Promise<FetchedItems> => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as Item;
      items.push(docData);
    });
    return {
      items,
      error: false,
      text: "",
    };
  } catch (e) {
    return {
      items: [],
      error: true,
      text: e.code,
    };
  }
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
