import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import { useCookies } from 'react-cookie';

import { IoSaveSharp } from "react-icons/io5";
import { FaCopy, FaTrashAlt} from "react-icons/fa";

import clsx from "clsx"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Apuntes = () => {
    const [cookies, setCookie] = useCookies(['messages']);
    const [messageState, setMessageState] = useState([])

    useEffect(() => {
        const validarCookiesApuntes = () => {
            if (!cookies.messages) {
                let msg = ["log", "superman"]

                setCookie("messages", JSON.stringify(msg), {
                    path: "/",
                    maxAge: 99000000
                })
                setMessageState(msg)
            } else {
                setMessageState(cookies.messages)
            }
        }

        validarCookiesApuntes(); // eslint-disable-next-line
    }, [])

    $("#boxMessage").unbind('keydown').bind('keydown', (e) => {
        if (e.which === 13) {
            saveMessage()
        }
    })

    const saveMessage = () => {
        if ($("#boxMessage").val() === "") return
        let tempMessageState = messageState
        tempMessageState.push($("#boxMessage").val())
        setMessageState([...tempMessageState])
        setCookie("messages", JSON.stringify(tempMessageState), {
            path: "/",
            maxAge: 99000000
        })
        $("#boxMessage").val("")
        $("#viewMessage").animate({ scrollTop: $('#viewMessage').prop("scrollHeight") }, 1000);
    }

    const borrar = (i) => {
        let tempmessageState = messageState
        tempmessageState.splice(i, 1)
        setMessageState([...tempmessageState])
        setCookie("messages", JSON.stringify(tempmessageState), {
            path: "/",
            maxAge: 99000000
        })
    }


    return (
        <div id="modalMessage">
            <div id="viewMessage" className={clsx("viewMessage themeScroll", cookies.themeColor)}>
                {messageState && messageState.map((e, index) => {
                    return (
                        <div key={index} className="msgText">
                            <div>
                                <p>{e}</p>
                            </div>
                            <div className="msgIcons">
                                <CopyToClipboard text={e}>
                                    <div className="msgIcon" ><FaCopy /></div>
                                </CopyToClipboard>
                                <div className="msgIcon" onClick={() => { borrar(index) }}>
                                    <FaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="addMessage">
                <input type="text" autoComplete="off" maxLength="50" className={clsx("boxMessage themeFont themeBorder", cookies.themeColor)} id="boxMessage" />
                <div className="saveMessage" onClick={saveMessage}><IoSaveSharp /></div>
            </div>
        </div>
    )
}

export default Apuntes