import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { Item, SnackbarTexts } from "../../const/types";
import { BaseFirestoreResposne, getItemById } from "./fetch";
import { myDb, myStorage } from "../main";
import deepEqual from "deep-equal";
import { ref, deleteObject } from "@firebase/storage";

export const updateByDbId = async (
  data: Item
): Promise<BaseFirestoreResposne> => {
  try {
    // check if item is the same
    const { location, category, name, description, count, dbId } = data;
    const itemRef = doc(myDb, "items", dbId);
    const newItem = {
      location: location.toUpperCase(),
      category: category.toLowerCase(),
      name,
      description,
      count,
    };
    const hasChanged = await checkIfItemHasChanged(dbId, newItem);
    if (hasChanged) {
      console.log("changed");
      await setDoc(itemRef, newItem, { merge: true });
      return {
        error: false,
        text: SnackbarTexts.succesfulItemUpdate,
      };
    } else {
      return {
        error: true,
        text: SnackbarTexts.editWithoutChanges,
      };
    }
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
  return !deepEqual(dbItem, item);
};

export const deleteById = async (id: string) => {
  try {
    const desertRef = ref(myStorage, id);
    await deleteObject(desertRef);
  } finally {
    try {
      await deleteDoc(doc(myDb, "items", id));

      return {
        error: false,
        text: SnackbarTexts.succesfulItemDeletion,
      };
    } catch (e) {
      return {
        error: true,
        text: SnackbarTexts.unsuccesfulItemDeletion + e.code,
      };
    }
  }
};
