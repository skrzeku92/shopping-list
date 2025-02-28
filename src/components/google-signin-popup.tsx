import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export const GoogleSignIn = async (): Promise<boolean>=> {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return new Promise((resolve) => {
        signInWithPopup(auth, provider).then((user)=> {
            console.log(user);
            resolve(!!user);
        }).catch((e)=> resolve(false))
    });

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     console.log(user);
    //     window.location.href ='/dsda';
    //   }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.customData.email;
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //   });
}

