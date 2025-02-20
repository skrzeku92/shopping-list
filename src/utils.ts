import { collection, getDocs, getFirestore, or, query, where } from "firebase/firestore";
import { app } from "./firebase";
import { List } from "./types/type";

export const fetchAllLists = async (userEmail: string)=> {
    const db = getFirestore(app);
    const doc_refs = await getDocs(query(collection(db, 'lists'), or (where("createdBy", "==", userEmail), (where("invited", "array-contains", userEmail)))));
    const res: List[] = [];

    doc_refs.forEach((doc)=> {
        console.log(doc);
        const obj = {id: doc.id, ...doc.data()} as List;
        res.push(obj);
    });

    return res;
}