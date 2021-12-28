import React from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth, db, storage } from "../config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
const Form = () => {
  const [username, setUserName] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userpass, setUserPass] = useState('');
  const [userprofile, setProfile] = useState('');
  const [userId, setUserId] = useState('')
  const createUser = async() => {
    try
    {
      await createUserWithEmailAndPassword(auth, useremail, userpass);
      onAuthStateChanged(auth, (userInfo) => {
        setUserId(userInfo.uid)
        console.log(userId)
      })
      const usersCollRef = collection(db, "users");
      const sotrageRef = ref(storage, `userImages/${userprofile.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, userprofile);
      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setDoc(doc(usersCollRef,  userId), { id: userId, name: username, email: useremail, password: userpass, imageUser: downloadUrl })
        })})



    }
    catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />

      <input
        placeholder="Email..."
        onChange={(event) => {
          setUserEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="pass..."
        onChange={(event) => {
          setUserPass(event.target.value);
        }}
      />



      <button onClick={createUser}> Create User</button>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setProfile(event.target.files[0]);
          }}
        />
      </div>
      <div>


      </div>
    </div>


  )
}

export default Form;