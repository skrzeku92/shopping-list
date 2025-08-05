import { addDoc, collection, doc, getDocs, getFirestore, or, query, getDoc, where, setDoc } from "firebase/firestore";
import { app, getAuth } from "../firebase";
import { List, Product } from "../types/type";
import safeFetch from "./safe";

export const db = getFirestore(app);

export const fetchAllLists = async (userEmail: string)=> {
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

export const UpdateFirestoreList = async (list: List): Promise<boolean> => {
    try {
        await setDoc(doc(db, 'lists', list.id), list, {merge: true});
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

 export const getProducts = async (str?: string)=> {
        const params = new URLSearchParams();
        str && params.append("name", str.toLocaleLowerCase());
        const url = 'http://localhost:3000/products?' + params;
        const {data, error} = await safeFetch<Product[]>(url);
        if (error) {
            console.error(error);
            return [];
        }
        return data;
    }

    export const MergeProducts = (
        localProducts: Product[],
        firestoreProducts: Product[]
      ): Product[] => {
        return [...firestoreProducts, ...localProducts].reduce<Product[]>((acc, product) => {
          const existingProduct = acc.find(p => p.name === product.name);
          if (existingProduct) {
            existingProduct.completed = existingProduct.completed || product.completed || false;
          } else {
            acc.push(product);
          }
          return acc;
        }, []);
      };