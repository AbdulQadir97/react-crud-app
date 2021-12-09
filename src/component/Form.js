import { useState, useEffect } from "react";
//import "./App.css";
import { db, auth, storage } from "../config/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";

const Form = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState('');
  const [newName, setNewName] = useState('');
  const [newfile, setNewFile] = useState('');
  const [newurls, setUrl] = useState('');
  console.log(newfile)

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPass
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  //const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const mydoc = usersCollectionRef

  const createUser = async () => {
    const uploadFiles = (file) => {
      //
      
      const sotrageRef = ref(storage, `images/${newfile.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, file);
  
      uploadTask.on(
        "state_changed",
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL)
            console.log(newurls)
          });
        }
      );
    };

    const res = await addDoc(usersCollectionRef, { email: newEmail, pass: newPass, name: newName, urls:newurls });
    register(res);
    uploadFiles(newfile)
    console.log(newurls)

   



    //setNewName('')
    //setNewAge('')
  };

  


  //   const updateUser = async (id, age) => {
  //     const userDoc = doc(db, "users", id);
  //     const newFields = { age: age + 1 };
  //     await updateDoc(userDoc, newFields);
  //   };

  //   const deleteUser = async (id) => {
  //     const userDoc = doc(db, "users", id);
  //     await deleteDoc(userDoc);
  //   };

  //   useEffect(() => {
  //     const getUsers = async () => {
  //       const data = await getDocs(usersCollectionRef);
  //       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     };

  //     getUsers();
  //   }, []);

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />

      <input
        placeholder="Email..."
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="pass..."
        onChange={(event) => {
          setNewPass(event.target.value);
        }}
      />



      <button onClick={createUser}> Create User</button>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setNewFile(event.target.files[0]);
          }}
        />
      </div>
      <img src = {newfile}></img>
    </div>


  )
}

export default Form;