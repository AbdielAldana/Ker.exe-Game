import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery'
import clsx from "clsx";
import Draggable from "react-draggable";

// View Map SVG
import World from "./world.js"

// Data JSON
import DataMap from "../../data/mapa.json"

// CSS
import "./mapa.css"

function Mapa(){
    const [cookies] = useCookies();

    const [name, setname] = useState("Select one.")
    const [zona, setzona] = useState("")
    const [dataBuild, setDataBuild] = useState([])
    const checkData = (id) => {
        DataMap.forEach(data => {
            if(data.id === id){
                setname(data.name + " - [" +  id + "]")
                setzona(data.zona)
                setDataBuild(data.documentos)
            }
        })
    }

    const [scala, setScala]  = useState(1)
    const [position, setPosition]  = useState(null)
    $('.contentWorld').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            if(scala <= 1){
                setScala(scala + 1)
                setPosition(null)
            }
        } else {
            if(scala > 1){
                setScala(scala - 1)
                setPosition({x: 0, y: 0})
            }
        }
    });


    return(
        <div className="mapa">
            <Draggable
                handle=".mapzoom"
                defaultPosition={{x: 0, y: 0}}
                position={position}
                grid={[5, 5]}
                scale={parseFloat(cookies.scale)}
                onStart={Mapa.handleStart}
                onDrag={Mapa.handleDrag}
                onStop={Mapa.handleStop}
                bounds={scala === 2 ? {top: -240, left: -350, right: 350, bottom: 240} : {top: 0, left: 0, right: 0, bottom: 0}}
            >
                <div className={clsx("mapzoom")}>
                    <div className="contentWorld" style={{transform: "scale("+scala+")"}}>
                    <World setCoorSelected={checkData}></World>
                    <div className="reticula">
                        <div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>A1</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>A2</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>A3</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>A4</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>A5</h1></div>
                        </div>
                        <div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>B1</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>B2</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>B3</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>B4</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>B5</h1></div>
                        </div>
                        <div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>C1</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>C2</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>C3</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>C4</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>C5</h1></div>
                        </div>
                        <div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>D1</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>D2</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>D3</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>D4</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>D5</h1></div>
                        </div>
                        <div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>E1</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>E2</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>E3</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>E4</h1></div>
                            <div className={clsx("themeBorder", cookies.themeColor)}><h1>E5</h1></div>
                        </div>
                    </div>
                    </div>
                </div>
            </Draggable>

            <div className={clsx("dataMap themeBorder", cookies.themeColor)}>
                <div><strong>{name}</strong></div>
                <div>{zona}</div>
                {dataBuild && dataBuild.map((d, index)=> {
                    return(
                        <p key={index}>{d}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Mapa