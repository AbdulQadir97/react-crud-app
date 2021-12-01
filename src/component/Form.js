import { useState, useEffect } from "react";
//import "./App.css";
import { db, auth } from "../config/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const Form = ()=> {
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState('');
  const [newName, setNewName] = useState('');

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

  const createUser = async () => {
    
    const res = await addDoc(usersCollectionRef, { email: newEmail, pass: newPass, name:newName });
    register(res);
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

      </div>
  )}

      export default Form;