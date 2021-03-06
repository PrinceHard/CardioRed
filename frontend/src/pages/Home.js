import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import HomeContent from "../components/HomeContent/HomeContent";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { userIsAuthenticated } from "../services/Login/LoginService";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsAuthenticated()) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <div className="page-container-home">
                <NavBar currentPage="H" />
                <div className="content-wrap">
                    <HomeContent />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;
