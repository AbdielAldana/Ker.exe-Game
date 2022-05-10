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
        // console.log(props.open);
        // $("."+identify).removeClass("closeModal")
        // $("."+identify).addClass("openModal")
        for (let i = 0; i < $(".modal").length; i++) {
            $($(".modal")[i]).css({"z-index": "949", "background-color": "rgb(30, 30, 30)"})
        }
        // $(".modal").css({"z-index": "949", "background-color": "rgb(30, 30, 30)"})
        $("."+identify).css({"z-index": "950", "background-color": "rgb(20, 20, 20)"})
    }

    const handleDrag = () =>{
        // $("."+identify).removeClass("closeModal")
        // $("."+identify).addClass("openModal")
    }
    const handleStop = () =>{
        // $("."+identify).removeClass("closeModal")
        // $("."+identify).addClass("openModal")
    }

    // let open = props.open
    // let setOpen = props.setOpen

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

    // useEffect(() => {
    //     const validation = () => {
    //         // if($(".min"+identify).hasClass("minModal")) return;
    //         // console.log(1);
    //         for (let i = 0; i < $(".modal").length; i++) {
    //             $($(".modal")[i]).css({"z-index": (949 - i), "background-color": "rgb(30, 30, 30)"})
    //         }
    //         $("."+identify).css({"z-index": "950", "background-color": "rgb(20, 20, 20)"})
    //         // $(".modal").css({"z-index": "949", "background-color": "rgb(30, 30, 30)"})
    //         console.log("XDDDD");
    //     }
    //     if(props.open){ // eslint-disable-next-line
    //         validation(); // eslint-disable-next-line
    //     } // eslint-disable-next-line
    // })
    //  useEffect(()=>{
    //         handleStart(); // eslint-disable-next-line
    //  },[props.setOpen])


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