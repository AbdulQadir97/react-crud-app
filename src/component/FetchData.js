import { useState, useEffect } from 'react';
import {collection, onSnapshot } from '@firebase/firestore';
import { db } from '../config/firebase-config'

const FetchData = () => {

    const [userDetails, setUserDetails] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const collectionRef = collection(db, 'users')
        const getPost = () => {
                onSnapshot((collectionRef), (uDeteails) => {
                const newDetailes = uDeteails.docs.map((doc) => ({ ...doc.data() }));
                console.log(newDetailes)
                setUserDetails(newDetailes)
                console.log(userDetails)
            
            });
        };

        getPost();

    }, [])
    const searchAble = (event) =>{
        const searchWord = event.target.value;
        const newFilter = userDetails.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        console.log(newFilter)
        console.log(newFilter)
    }

    

    return (
        <>


        <input type='search' onChange={searchAble}></input>
    {/* {
        userDetails.map((user)=>{
            <div>
        
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p><img src={user.imageUser} alt={userDetails.name}/></p>
        
        </div>
        })
       } */}

        </>

    )
}

export default FetchData