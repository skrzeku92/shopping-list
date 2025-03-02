import { addDoc, collection, doc, getDocs, getFirestore, or, query, getDoc, where } from "firebase/firestore";
import { app, getAuth } from "./firebase";
import { List } from "./types/type";

const db = getFirestore(app);

export const fetchAllLists = async (userEmail: string)=> {
    console.log(getAuth());
    const doc_refs = await getDocs(query(collection(db, 'lists'), or (where("createdBy", "==", userEmail), (where("invited", "array-contains", userEmail)))));
    const res: List[] = [];

    doc_refs.forEach((doc)=> {
        const obj = {id: doc.id, ...doc.data()} as List;
        res.push(obj);
    });

    return res;
}

export const getList = async (id: string) => {
    const doc_ref = doc(db, "lists", id);
    console.log(id);
        try {
        const snapshot = await getDoc(doc_ref);
        console.log(snapshot.data());
        return snapshot.data();
    }
    catch (e) {
        console.error(e);
    }
    
}

export const addList = async (title: string, userEmail: string)=> {
    try {
        await addDoc(collection(db, 'lists'), {
            title,
            createdAt: new Date(),
            createdBy: userEmail,
            products: []
        });
        console.log('Created Successfuly');
    }
    catch (e) {
        console.error(e)
    }
}