import React from 'react';
import { useCookies } from 'react-cookie';
import Draggable from "react-draggable";
import $ from 'jquery'
import clsx from "clsx"

// CSS
import "./iconDesk.css"

function IconDesk(props) {
    const [cookies] = useCookies(['messages']);

    $( "."+props.identify ).dblclick(function() {
        if(props.modal){
            props.modal(true)
            for (let i = 0; i < $(".modal").length; i++) {
                $($(".modal")[i]).css({"z-index": "9", "background-color": "rgb(30, 30, 30)"})
            }
            $("."+props.identify).css({"z-index": "10", "background-color": "rgb(20, 20, 20)"})

        }
        if(props.fn){
            props.fn(props.param)
        }
    })
    return (
        <Draggable
            handle=".handle"
            defaultPosition={{x: props.position[0], y: props.position[1]}}
            position={null}
            grid={[5, 5]}
            scale={parseFloat(cookies.scale)}
            onStart={IconDesk.handleStart}
            onDrag={IconDesk.handleDrag}
            onStop={IconDesk.handleStop}
            bounds="parent"
        >
            <div
                id="IconDesk"
                className={clsx("iconXD handle themeFont ", cookies.themeColor, props.identify)}
            >
                {props.icon}
                <p>{props.title}</p>
            </div>
        </Draggable>
    )
}

export default IconDesk