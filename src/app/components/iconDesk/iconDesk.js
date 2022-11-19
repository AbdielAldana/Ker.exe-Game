import React from 'react';
import { useCookies } from 'react-cookie';
import Draggable from "react-draggable";
import $, { type } from 'jquery'
import clsx from "clsx"

// CSS
import "./iconDesk.css"

function IconDesk(props) {
    const [cookies] = useCookies(['messages']);

    $(".icon"+props.data.identify ).unbind('dblclick').bind('dblclick', (e) => {
        if(props.data){
            let tempListApp = props.listApps
            let tempData = props.data

            tempData.open = !props.data.open
            tempListApp[tempData.identify] = tempData

            props.setData({...tempListApp})
        }
        if(props.fn){
            props.fn(props.param)
        }
    })
    return (
        <Draggable
            handle=".handle"
            defaultPosition={{x: props.data.position[0], y: props.data.position[1]}}
            position={null}
            grid={[5, 5]}
            scale={parseFloat(cookies.scale)}
            onStart={IconDesk.handleStart}
            onDrag={IconDesk.handleDrag}
            onStop={IconDesk.handleStop}
            bounds="parent"
        >
            <div
                data-tippy-content={props.data.dtc}
                id="IconDesk"
                className={clsx(
                    "iconXD handle themeFont ",
                    cookies.themeColor,
                    "icon"+props.data.identify,
                    props.data.iconView ? "showIcon" : "hideIcon"
                )}
                // style={{
                //     left: props.data.position[0] + "px",
                //     top: props.data.position[1] +"px"
                // }}
            >
                {props.data.icon}
                <p>{props.data.title}</p>
            </div>
        </Draggable>
    )
}

export default IconDesk