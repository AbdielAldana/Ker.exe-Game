import "./modal.css"
import { useCookies } from 'react-cookie';
import Draggable from "react-draggable";
import React, {useState} from 'react';
import $ from 'jquery'

import clsx from 'clsx';


function Modal(props) {
    const [cookies] = useCookies(["themeColor", "volume", "scale", "day", "listKill", "messages"]);

    const identify = props.data.identify


    const handleStart = ()=>{
        for (let i = 0; i < $(".modal").length; i++) {
            $($(".modal")[i]).css({"z-index": "9", "background-color": "rgb(30, 30, 30)"})
        }
        $("."+identify).css({"z-index": "10", "background-color": "rgb(20, 20, 20)"})
    }

    const handleDrag = () =>{
    }
    const handleStop = () =>{
    }


    const closeModal = () => {
        if(props.map){
            let tempData = props.data
            tempData.open = !props.data.open
            props.setOpen(tempData.identify)
        } else{
            let tempListApp = props.listApps
            let tempData = props.data

            tempData.open = !props.data.open
            tempListApp[tempData.identify] = tempData

            props.setData({...tempListApp})
        }
    }

    // Empieza con la ventana grnade
    const [min, setMin] = useState(true)

    // Minimiza la ventana
    const minModal = () => {
        if(min){
            $(".min"+identify).addClass("minModal")
            $(".min"+identify).removeClass("maxModal")
        } else {
            $(".min"+identify).addClass("maxModal")
            $(".min"+identify).removeClass("minModal")
        }
        setMin(!min)
    }

    // Doble Click
    $("#bar"+identify).unbind('dblclick').bind('dblclick', (e) => {
        minModal()
    })


    return(
        <Draggable
            handle=".handle"
            defaultPosition={{x: props.data.positionModal.x, y: props.data.positionModal.y}}
            position={null}
            grid={[5, 5]}
            scale={parseFloat(cookies.scale)}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
            // bounds="body" 
            bounds="parent"
        >
            <div
                id={"prin"+identify}
                className={clsx("modal themeBorder themeBoxShadow themeFont ", cookies.themeColor, identify,  props.data.open ? "openModal" : "closeModal")}
                style={{width: !min ? "250px" : props.data.width + 'px', filter: !min ? "opacity(.9)" : ""}}
                onClick={handleStart}
            >

                <div
                    id={"bar"+identify}
                    className={"header handle themeBorder " + cookies.themeColor}
                >
                    <div className="icon">{props.data.icon}</div>
                    <h4 className="title">{props.data.title}</h4>
                    <div className="close" onClick={closeModal}>x</div>
                    <div className="min" onClick={minModal}>{min && "-"}{!min && "+"}</div>
                </div>

                <div className={clsx("content themeScroll maxModal", cookies.themeColor,  "min"+identify)} style={{height: props.data.height + 'px'}}>
                    {props.content}
                </div>

            </div>
        </Draggable>
    )

}

export default Modal