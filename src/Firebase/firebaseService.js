import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

// Collection ref
const itemsRef = collection(db, "items");

// Fetch all items
export const fetchItems = async () => {
  const snapshot = await getDocs(itemsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add item
export const addItem = async (item) => {
  const docRef = await addDoc(itemsRef, { item, checked: false });
  return { id: docRef.id, item, checked: false };
};

// Delete item
export const deleteItem = async (id) => {
  await deleteDoc(doc(db, "items", id));
};

// Update checked status
export const toggleChecked = async (id, checked) => {
  const itemRef = doc(db, "items", id);
  await updateDoc(itemRef, { checked });
};
