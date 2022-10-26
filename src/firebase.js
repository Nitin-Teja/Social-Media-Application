// import { initializeApp } from 'firebase/app';
// import { getFirestore, getDocs, collection, doc } from 'firebase/firestore';
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyBcNfcT3pN5aA2BC1gfUFhxG_wX15p4lb4",
  authDomain: "instagram-clone-ae945.firebaseapp.com",
  databaseURL: "https://instagram-clone-ae945-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-ae945",
  storageBucket: "instagram-clone-ae945.appspot.com",
  messagingSenderId: "765787671033",
  appId: "1:765787671033:web:bbf4d427fe4d7b742f5528",
  measurementId: "G-MDYQH1J23S"
});


// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);
//   export { db, auth, storage };

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };

// export default firebase;
  

