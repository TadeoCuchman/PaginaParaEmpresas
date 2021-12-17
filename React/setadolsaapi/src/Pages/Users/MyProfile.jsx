import React from 'react';
import { Link } from "react-router-dom";
import unknown from '../../photos/unknown.jpg'


const MyProfile = () => {
    return (
        <main>
            <br />
            <h1>{localStorage.alias}</h1>
            <br />
            <img id='profilphoto' src={unknown} alt="default profile photo" />
            <br />
            <br />
            <h2>Notas:</h2>
            <br />
            <h2>Fotos:</h2>
            <br />
        </main>
    )
}

export default MyProfile;