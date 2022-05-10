import React from 'react';
import { useCookies } from 'react-cookie';
import Draggable from 'react-draggable';

// Icons
import { FaCheck, FaVolumeUp } from "react-icons/fa";

// Components
import Sonidos from "../../components/sonidos/sonidos"

// Imgs
import Logo from "../../../media/logo.png"

// CSS
import './options.css';

function Options(props) {
    const [cookies, setCookie] = useCookies(['themeColor', "volume", "scale"]);

    const closeOptions = ()=>{
        props.setOpenOptions(false)
    }

    const changeColor = (color) => {
        setCookie('themeColor', color, {
            path: "/",
            maxAge: 99000000
        })
    }

    const changeVolume = (e) => {
        setCookie('volume', e.target.value, {
            path: "/",
            maxAge: 99000000
        })
    }

    const checkSonido = () => {
        Sonidos("error", cookies.volume)
    }

    let title = "< o p c i o n e s />"

    return(
        <div>
            {props.openOptions &&
                <Draggable
                    handle=".handle"
                    position={null}
                    grid={[5, 5]}
                    scale={parseFloat(cookies.scale)}
                    onStart={Options.handleStart}
                    onDrag={Options.handleDrag}
                    onStop={Options.handleStop}
                >
                    <div id="options" className={"themeBorder themeFont " + cookies.themeColor}>

                        <img alt="logo" src={Logo} className={"imgLogo themeImg " + cookies.themeColor} />

                        <div className={"header themeBorder handle " + cookies.themeColor}>
                            <h2>{title}</h2>
                            <div className={"close themeFont " + cookies.themeColor} onClick={closeOptions}>
                                x
                            </div>
                        </div>

                        <div className={"content themeScroll " + cookies.themeColor}>

                            <div className="buttonsColorsTheme">
                                <h3 className={"themeFont " + cookies.themeColor} >[ Color ] :</h3>
                                <div onClick={()=>{changeColor("white")}} className={"buttonColor white"} > {cookies.themeColor === "white" && <FaCheck/> }</div>
                                <div onClick={()=>{changeColor("green")}} className={"buttonColor green"} > {cookies.themeColor === "green" && <FaCheck/>} </div>
                                <div onClick={()=>{changeColor("pink")}} className={"buttonColor pink"} > {cookies.themeColor === "pink" && <FaCheck/>} </div>
                            </div>

                            <div className={"buttonsColorsTheme"}>
                                <h3 style={{marginRight: "25px"}}>[ Volumen ] :</h3>
                                <input className={"themeRange " + cookies.themeColor} type="range" min="-40" max="0" value={cookies.volume} onChange={changeVolume} />
                                <div className="optionsIconSound" onClick={checkSonido}><FaVolumeUp /></div>
                            </div>

                        </div>
                    </div>
                </Draggable>
            }
        </div>
    )
}

export default Options