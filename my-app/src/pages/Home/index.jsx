import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from '../../assets/Logo.png';
import createStory from "./assets/CreateStory.png"
import createCharacter from "./assets/CreateCharacter.png"

function Home() {
    return (
        <div className="Home">
            <div className="home-top-section">
                <img src={logo} alt="Logo" />
                <h1>FANTASY LAB</h1>
                <h3>This project utilizes GPT 3.5 and Dall-E to enhance your RPG game. With the help of these technologies, our tool allows you to easily create captivating stories and immersive imagery for your characters and environments. Just select your desired option, and our tool will take care of the rest.</h3>
            </div>
            <div className="button-container">
                <Link to="/character">
                    <button className="homeButton"><img src={createCharacter} /></button>
                </Link>
                <Link to="/story">
                    <button className="homeButton"><img src={createStory} /></button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
