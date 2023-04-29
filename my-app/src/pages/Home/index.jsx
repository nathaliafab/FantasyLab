import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="Home">
            <h1>Welcome</h1>
            <div className="button-container">
                <Link to="/character">
                    <button>Create character</button>
                </Link>
                <Link to="/history">
                    <button>Create history</button>
                </Link>
                <Link to="/background">
                    <button>Create background</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
