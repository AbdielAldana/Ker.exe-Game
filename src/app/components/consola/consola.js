import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery'
import clsx from "clsx"

// Components
import Sonidos from '../../components/sonidos/sonidos';

// CSS
import "./consola.css"

function Consola(props){
    const [cookies] = useCookies([]);
    const [consoleCodes, setConsoleCodes] = useState(["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]);

    let nextDay = props.data.nextDay
    let listApps = props.data.listApps
    let setListApps = props.data.setListApps
    let countCommands = props.data.countCommands
    let G_CountMax = props.data.G_CountMax
    let kerData = props.data.kerData
    let kill = props.data.kill
    let criminalesJSON = props.data.criminalesJSON
    let reportesJSON = props.data.reportesJSON
    let openModal = props.data.openModal

    useEffect(()=>{
        if(countCommands === 0){ // eslint-disable-next-line
            setConsoleCodes(["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]) // eslint-disable-next-line
        } // eslint-disable-next-line
    }, [countCommands])

    $("#kerexeView").unbind('click').bind('click', (e) => {
        $("#kerexeInputText").focus()
        $(".minkerexe").scrollTop($('#kerexeView').height());
    })
    $("#prinkerexe").unbind('click').bind('click', (e) => {
        $("#kerexeInputText").focus()
        $(".minkerexe").scrollTop($('#kerexeView').height());
    })

    $(".kerexe").unbind('keydown').bind('keydown', (e) => {
        $("#kerexeInputText").focus()
        $(".minkerexe").scrollTop($('#kerexeView').height());
        let tempconsoleCodes = consoleCodes

        let tempCriminales = criminalesJSON
        let tempReportes = reportesJSON

        if (e.which === 13 && countCommands < G_CountMax) {
            let value = $("#kerexeInputText").val()
            let viewValue = value.split(" ")

            let sintaxis = viewValue[0]
            let comando =  viewValue[1]
            let ruta = viewValue[2]

            // Valida que empieze con >
            if(sintaxis !== ">") {
                commandResult({
                    msg: "Sintaxis Incorrecta!!",
                    result: {status: "false", command: "false", data: "false"}
                })
            } else {
                // Valida que sea Get el comando
                if (comando === "get" || comando === "g") {

                    if(!ruta){ // NO tiene algo despues del comando
                        commandResult({
                            msg: "Se te olvido ingresar el nombre de la ruta.",
                            result: {status: "false", command: comando, data: "false"}
                        })
                    } else if(ruta  === "*"){ // Ver todos los archivos
                        // Muestra el nombre del archivo de todos los Criminales
                        commandResult({msg: "- C R I M I N A L E S -", result: false})
                        criminalesJSON.forEach(doc => {
                            commandResult({msg: "Archivo: " + doc.archivo, result: false})
                        });
                        commandResult({msg: "- R E P O R T E S -", result: false})
                        reportesJSON.forEach(doc => {
                            commandResult({msg: "Archivo: " + doc.archivo, result: false})
                        });
                        commandResult({
                            msg: "Lista de archivos obtenida.",
                            result: {status: "true", command: comando, data: ruta}
                        })
                        // [CUANDO ESTE] Muestra el nombre del archivo de todos los Reportes
                    } else {
                        let findCriminal = tempCriminales.find(x => x.archivo === ruta)
                        let findReporte = tempReportes.find(x => x.archivo === ruta)
                        if (findCriminal) { // si encuentra el Archivo en Criminales, lo muetra
                            commandResult({
                                msg: "Persona encontrada.",
                                result: {status: "true", command: comando, data: ruta}
                            })
                            openModal(findCriminal.archivo)
                        } else if(findReporte){ // si encuentra el Archivo en Reportes, lo muetra
                            commandResult({
                                msg: "Reporte encontrado.",
                                result: {status: "true", command: comando, data: ruta}
                            })
                            openModal(findReporte.archivo)
                        } else { // Si NO encuentra nada
                            commandResult({
                                msg: "No se encontro algún documento con ese nombre.",
                                result: {status: "false", command: comando, data: ruta}
                            })
                        }
                    }
                // Valida que sea KIRA el comando
                // } else if(viewValue[1] === "allDocuments") {
                } else if(comando === "kill" || comando === "k") {

                    let findCriminal = tempCriminales.find(x => x.archivo === ruta)

                    if(!ruta) {
                        commandResult({
                            msg: "Se te olvido ingresar el nombre de la ruta.",
                            result: {status: "false", command: comando, data: "false"}
                        })
                    } else if (findCriminal) {
                        commandResult({
                            msg: "Persona encontrada.",
                            result: {status: "true", command: comando, data: ruta}
                        })
                        kill(findCriminal.archivo)
                    } else {
                        commandResult({
                            msg: "Persona no encontrada. Ingresa una ruta valida.",
                            result: {status: "false", command: comando, data: ruta}
                        })
                    }
                // Valida que este Vacia el commando
                } else if(comando === "unlock" || comando === "ul") {
                    if(!ruta){
                        commandResult({
                            msg: "Se te olvido ingresar el nombre de la ruta.",
                            result: {status: "false", command: comando, data: "false"}
                        })
                    }else{
                        if(ruta  === "dataker"){
                            commandResult({
                                msg: "Software encontrado.",
                                result: {status: "true", command: comando, data: ruta}
                            })
                            let tempListApp = listApps
                            let tempData = listApps.dataker

                            tempData.iconView = !tempData.iconView
                            tempListApp[tempData.identify] = tempData

                            setListApps({...tempListApp})

                        } else {
                            commandResult({
                                msg: "Ingresa una ruta valida.",
                                result: {status: "false", command: comando, data: ruta}
                            })
                        }
                    }
                } else if(comando === "clear" || comando === "c") {
                    tempconsoleCodes = []
                    tempconsoleCodes.push("Ker.exe [Versión 1.0.1] user@desktop-11322 ~")
                    kerData({status: "true", command: "clear", data: "---"})
                    setConsoleCodes([...tempconsoleCodes])
                } else if(!comando) {
                    commandResult({
                        msg: "Ingresa un comando valido.",
                        result: {status: "false", command: "false", data: "false"}
                    })
                // Commando Invalido
                } else{
                    commandResult({
                        msg: "El comando [  " + comando + "  ] no pertenece a este sistema.",
                        result: {status: "false", command: comando, data: "false"}
                    })
                }
            }

            // Limpia el input
            $("#kerexeInputText").val("> ")
        } else if(e.which === 13 && countCommands === G_CountMax) {
            let value = $("#kerexeInputText").val()
            let viewValue = value.split(" ")

            if(viewValue[1] === "end"){
                commandResult({msg: "Terminando día.", result: false, clear: true})
                setTimeout(() => {
                    commandResult({msg: "Terminando día.", result: false, clear: true})
                }, 1000);
                setTimeout(() => {
                    commandResult({msg: "Cerrando sesion...", result: false, clear: true})
                }, 1500);
                setTimeout(() => {
                    commandResult({msg: "Borrando cache...", result: false, clear: true})
                }, 2000);
                setTimeout(() => {
                    commandResult({msg: "Muchotexto a lo loco <br/> Reiniciando Sistema...", result: false, clear: true})
                }, 2500);
                setTimeout(() => {
                    nextDay()
                }, 6000);
            }else {
                Sonidos("error", cookies.volume)
                if(tempconsoleCodes.length > 1) {tempconsoleCodes = ["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]}
                tempconsoleCodes.push("La cuota de hoy se ha cumplido.")
                setConsoleCodes([...tempconsoleCodes])
            }
            $("#kerexeInputText").val("> ")
        }
        // $(".minkerexe").scrollTop($('.minkerexe').height());
    })

    const commandResult = (data) => {
        if(data.result === false){
            let tempconsoleCodes = consoleCodes
            if(data.clear) tempconsoleCodes = ["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]
            tempconsoleCodes.push(data.msg)
            setConsoleCodes([...tempconsoleCodes])
        }else {
            let tempconsoleCodes = consoleCodes
            tempconsoleCodes.push(data.msg)
            kerData(data.result)
            setConsoleCodes([...tempconsoleCodes])
        }
    }

    $("#kerexeView").unbind('keyup').bind('keyup', (e) => {
        $("#kerexeInputText").focus()
        $(".minkerexe").scrollTop($('#kerexeView').height());
    })

    return(
        <div id="kerexeView">
            <div className="contentUse">
                <div className={clsx("barCount themeBorder", cookies.themeColor)}>
                    <div
                        style={{width: ((countCommands * 100)/G_CountMax) + "%" }}
                        className={clsx("barCountView themeBG", cookies.themeColor)}>
                    </div>
                </div>
            </div>
            {consoleCodes.map((e, index) => {
                return (
                    <p key={index}>{e}</p>
                )
            })}
            {/* <button onClick={prueba}>sss</button> */}
            <input
                type="text"
                defaultValue="> "
                autoComplete="off"
                id="kerexeInputText"
                spellCheck="false"
                className={clsx("inputText themeFont", cookies.themeColor)}
            />
        </div>
    )
};

export default Consola