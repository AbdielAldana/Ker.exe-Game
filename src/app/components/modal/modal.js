import "./modal.css"
import { useCookies } from 'react-cookie';
import Draggable from "react-draggable";
import React, {useState} from 'react';
import $ from 'jquery'

import clsx from 'clsx';


function Modal(props) {
    const [cookies] = useCookies([]);

    const identify = props.identify


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
            props.setOpen(props.identify)
        } else{
            props.setOpen(false)
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
    $( "#"+props.identify ).dblclick(function() {
        minModal()
    })


    return(
        <Draggable
            handle=".handle"
            defaultPosition={{x: props.position.x, y: props.position.y}}
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
                className={clsx("modal themeBorder themeBoxShadow themeFont ", cookies.themeColor, identify,  props.open ? "openModal" : "closeModal")}
                style={{width: !min ? "250px" : props.width + 'px', filter: !min ? "opacity(.9)" : ""}}
                onClick={handleStart}
            >

                <div
                    id={identify}
                    className={"header handle themeBorder " + cookies.themeColor}
                >
                    <div className="icon">{props.icon}</div>
                    <h4 className="title">{props.title}</h4>
                    <div className="close" onClick={closeModal}>x</div>
                    <div className="min" onClick={minModal}>{min && "-"}{!min && "+"}</div>
                </div>

                <div className={clsx("content themeScroll maxModal", cookies.themeColor,  "min"+identify)} style={{height: props.height + 'px'}}>
                    {props.content}
                </div>

            </div>
        </Draggable>
    )

}

export default Modal