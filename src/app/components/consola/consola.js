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
    })

    $(".kerexe").unbind('keydown').bind('keydown', (e) => {
        let tempconsoleCodes = consoleCodes

        let tempCriminales = criminalesJSON
        let tempReportes = reportesJSON

        if (e.which === 13 && countCommands < G_CountMax) {

            // if(tempconsoleCodes.length > 5) {tempconsoleCodes = ["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]}

            let value = $("#kerexeInputText").val()
            let viewValue = value.split(" ")

            // Valida que empieze con >
            if(viewValue[0] !== ">") return false

            // Valida que sea LOG el comando
            if (viewValue[1] === "log") {

                if(!viewValue[2]){
                    tempconsoleCodes.push("Se te olvido ingresar el nombre de la ruta.")
                    kerData({status: "false", command: viewValue[1], data: viewValue[2]})
                } else {
                    let findCriminal = tempCriminales.find(x => x.archivo === viewValue[2])
                    let findReporte = tempReportes.find(x => x.archivo === viewValue[2])

                    if (findCriminal) {
                        tempconsoleCodes.push("Persona Encontrada")
                        openModal(findCriminal.archivo)
                        kerData({status: "true", command: viewValue[1], data: viewValue[2]})
                    } else if(findReporte){
                        tempconsoleCodes.push("Reporte Encontrado")
                        kerData({status: "true", command: viewValue[1], data: viewValue[2]})
                        // console.log(findReporte);
                    } else {
                        tempconsoleCodes.push("No se encontro algun archivo con ese nombre.")
                        kerData({status: "false", command: viewValue[1], data: viewValue[2]})
                    }
                }
            // Valida que sea KIRA el comando
            } else if(viewValue[1] === "kira") {

                let findCriminal = tempCriminales.find(x => x.archivo === viewValue[2])

                if (findCriminal) {
                    tempconsoleCodes.push("Persona Encontrada")
                    kill(findCriminal.archivo)
                    kerData({status: "true", command: viewValue[1], data: viewValue[2]})
                } else if(!viewValue[2]) {
                    tempconsoleCodes.push("Se te olvido ingresar el nombre de la ruta.")
                    kerData({status: "false", command: viewValue[1], data: viewValue[2]})
                } else {
                    tempconsoleCodes.push("No se encontro algun archivo con ese nombre.")
                    kerData({status: "false", command: viewValue[1], data: viewValue[2]})
                }
            // Valida que este Vacia el commando
            } else if(!viewValue[1]) {
                tempconsoleCodes.push("Ingresa algun comando.")
                kerData({status: "false", command: viewValue[1], data: viewValue[2]})
            // Commando Invalido
            } else{
                tempconsoleCodes.push("El comando [  " + viewValue[1] + "  ] no pertenece a este sistema.")
                kerData({status: "false", command: viewValue[1], data: viewValue[2]})
            }

            setConsoleCodes([...tempconsoleCodes])
            // Limpia el input
            $("#kerexeInputText").val("> ")
        } else if(e.which === 13 && countCommands === G_CountMax) {
            Sonidos("error", cookies.volume)
            if(tempconsoleCodes.length > 1) {tempconsoleCodes = ["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]}
            tempconsoleCodes.push("La cuota de hoy se ha cumplido.")
            setConsoleCodes([...tempconsoleCodes])
            $("#kerexeInputText").val("> ")
        }
        $(".minkerexe").scrollTop($('.minkerexe').height());
        $("#kerexeInputText").focus()
    })

    $(".kerexe").unbind('keyup').bind('keyup', (e) => {
        if (e.which === 13) {
            $(".minkerexe").scrollTop($('.minkerexe').height());
            $("#kerexeInputText").focus()
        }
    })

    return(
        <div id="kerexeView">
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