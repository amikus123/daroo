import { collection, getDocs } from "firebase/firestore";
import { Item, SnackbarTexts } from "../../const/types";
import { db, storage } from "../main";
import { getDownloadURL, ref } from "firebase/storage";

export interface BaseFirestoreResposne {
  text: string;
  error: boolean;
}

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
      text: SnackbarTexts.succesfulInitialFetching,
    };
  } catch (e) {
    console.error(e);

    return {
      items: [],
      error: true,
      text: SnackbarTexts.unsuccesfulInitialFetching + e.code,
    };
  }
};

export type FetchedUrl = BaseFirestoreResposne & {
  url: string;
};

export const getURL = async (imageName: string): Promise<FetchedUrl> => {
  try {
    const url = await getDownloadURL(ref(storage, imageName));
    return {
      error: false,
      text: "",
      url,
    };
  } catch (e) {
    console.error(e);
    return {
      error: true,
      text: SnackbarTexts.unsuccesfulImageFetching + e.code,
      url:"",
    };
  }
};
