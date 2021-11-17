import { doc, getDoc, setDoc } from "firebase/firestore";
import { Item, SnackbarTexts } from "../../const/types";
import { BaseFirestoreResposne } from "./fetch";
import { db } from "../main";
import deepEqual from "deep-equal";

export const updateByDbId = async (
  data: Item
): Promise<BaseFirestoreResposne> => {
  try {
    // check if item is the same
    const { location, category, name, description, count, dbId } = data;
    const itemRef = doc(db, "items", dbId);
    const newItem = {
      location: location.toUpperCase(),
      category: category.toLowerCase(),
      name,
      description,
      count,
    };
    const hasChanged = await checkIfItemHasChanged(dbId, newItem);
    if (hasChanged) {
    } else {
    }
    await setDoc(
      itemRef,
      newItem,

      { merge: true }
    );
    return {
      error: false,
      text: SnackbarTexts.succesfulItemUpdate,
    };
  } catch (e) {
    return {
      error: true,
      text: SnackbarTexts.unsuccesfulItemUpdate + e.code,
    };
  }
};

const checkIfItemHasChanged = async (id: string, item: any) => {
  const dbItem = await getItemById(id);
  delete dbItem["dbId"];
  delete dbItem["imageCount"];
  console.log(dbItem, item);
  return !deepEqual(dbItem, item);
};



const getItemById = async (id: string): Promise<any> => {
  try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log("No such document!");
  }
};
