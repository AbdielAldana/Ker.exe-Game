import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

// Icons
import { FaQuestion } from "react-icons/fa";

// Component
import Options from '../../components/options/options'

// CSS
import "./styleLanding.css"

// Imgs
import logo from "../../../media/logoGame.png"


function Landing(props) {
    const [cookies, setCookie] = useCookies(['themeColor', "volume", "scale"]);

    // Setea Cookies si no existen
    useEffect(() => {
        const checkCookies = () => {
            if(!cookies.themeColor) {
                setCookie('themeColor', 'white', {
                    path: "/",
                    maxAge: 99000000
                })
            }
            if(!cookies.volume) {
                setCookie('volume', '-20', {
                    path: "/",
                    maxAge: 99000000
                })
            }
            console.log(12);
        }

        checkCookies(); // eslint-disable-next-line
    }, [])

    // Empieza el Juego
    const PlayGame = () => {
        props.setState(1)
    }

    // Open and Close Options
    const [openOptions, setOpenOptions] = useState(false)
    const fnOptions = ()=>{setOpenOptions(!openOptions)}

    // Texto
    let menu1 = "<entrar/>"
    let menu2 = "<opciones/>"

    return(
        <div id="landing">
            <div className="landing_content">
                <div className="landingLogo_content">
                    <img src={logo} alt="logo1" className={"landingLogo noGlitch themeImg "+cookies.themeColor} />
                    <img src={logo} alt="logo2" className="landingLogo glitch1" />
                    <img src={logo} alt="logo3" className="landingLogo glitch2" />
                </div>
                <h2 className={"landingMenu themeFont " + cookies.themeColor} onClick={PlayGame}>{menu1}</h2>
                <h2 className={"landingMenu themeFont green " + cookies.themeColor} onClick={fnOptions}>{menu2}</h2>
            </div>
            <div className={"landingHelp themeFont green " + cookies.themeColor}>
                <h2><FaQuestion/></h2>
            </div>
            <div className={"landingVer themeFont green " + cookies.themeColor}>
                <h5>v. 1.0.1</h5>
            </div>


            <Options
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
            ></Options>
        </div>
    )
}

export default Landing


// Opciones
// Color de letra