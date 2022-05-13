// Dev 12 - Mayo - 2022

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery'
import clsx from "clsx"

// Components
import Modal from '../../components/modal/modal'
import IconDesk from '../../components/iconDesk/iconDesk'
import Draggable from 'react-draggable';

// Views in Modals
import Mapa from '../../components/mapa/mapa'
import Apuntes from '../../components/apuntes/apuntes'
import CriminalesDoc from '../../components/documentos/criminales/criminales'
import Noticias from "../../components/noticias/noticias";

// Icons
import { IoDocumentSharp } from "react-icons/io5";
import { FaCogs, FaDoorOpen, FaFingerprint, FaFileAlt, FaNewspaper } from "react-icons/fa";
import { GiCowled, GiAngelWings, GiRingedPlanet } from "react-icons/gi";

// CSS
import "./game.css"
import "./modals.css"

// Imgs
import logoIcon from "../../../media/logo.png"

// Data JSON
import criminalesJSON from "../../data/criminales.json"
import reportesJSON from "../../data/reportes.json"
import Sonidos from '../../components/sonidos/sonidos';

const G_CountMax = 10

function Game(props) {
    const [cookies, setCookie] = useCookies(['messages', 'listKill', "day", "volume"]);

    const [stateCriminales, setStateCriminales] = useState(criminalesJSON)
    // const [tempReportes, setTempReportes] = useState(reportes)

    // Carga lo necesario para continuar la partida.
    useEffect(()=>{
        const validarCoockies = () => {
            if(cookies.listKill){
                let tempCriminales = stateCriminales
                let cock = cookies.listKill
                cock.forEach(c => {
                    tempCriminales.find(x => x.archivo === c).status = "MUERTO"
                })
                setStateCriminales([...tempCriminales])
            } else{
                setCookie("listKill", [], {
                    path: "/",
                    maxAge: 99000000
                })
            }

            if(cookies.day){
                let tempDay = cookies.day
                setDay(tempDay)
            } else{
                setCookie("day", day, {
                    path: "/",
                    maxAge: 99000000
                })
            }
        }

        validarCoockies(); // eslint-disable-next-line
    }, [])

    // Estados de los Modals
    const [openLEEME, setOpenLEEME] = useState(false)
    const [openKerexe, setOpenKerexe] = useState(false)
    const [openApuntes, setOpenApuntes] = useState(false)
    const [openMapa, setOpenMapa] = useState(false)
    const [openNoticias, setOpenNoticias] = useState(false)
    const [openkerdata, setopenkerdata] = useState(false)

    // Abre modals segun el JSON
    const openModal = (modal) => {
        let tempCriminales = stateCriminales

        let findCriminal = tempCriminales.find(c => c.archivo === modal)

        if (findCriminal) {
            findCriminal.open = !findCriminal.open
            setStateCriminales([...tempCriminales])
        }
    }

    // Cambia a Muerto al criminal y lo guarda en las cookies
    const kill = (archivo) => {
        stateCriminales.find(x => x.archivo === archivo).status = "MUERTO"

        let listTemp = cookies.listKill
        listTemp.push(archivo)
        setCookie("listKill", listTemp, {
            path: "/",
            maxAge: 99000000
        })

        // console.log(tempCriminales.find(x => x.archivo === archivo));
    }

    const [kerDataList, setKerDataList] = useState([])
    const [countCommands, setcountCommands] = useState(0)

    const kerData = (data) => {
        let tempList =  kerDataList
        tempList.push(data)
        setKerDataList([...tempList])

        if(data.status === "true"){
            let tempCount = countCommands
            tempCount = +tempCount + 1
            if(tempCount <= G_CountMax){
                setcountCommands(tempCount)
            }
        } else{
            Sonidos("error", cookies.volume)
        }
    }

    const [day, setDay] = useState(1)

    const nextDay = () => {
        console.log(countCommands);
        console.log(G_CountMax);
        if(countCommands === G_CountMax){
            setcountCommands(0)
            closeAllModals()
            let tempDay = +day + 1
            setDay(tempDay)
            setCookie("day", tempDay, {
                path: "/",
                maxAge: 99000000
            })
        } else {
        }
    }

    // Cierra todas las ventanas
    const closeAllModals = () => {
        let tempStateCriminales = stateCriminales
        tempStateCriminales.filter(x => x.open === true).forEach(a => a.open = false)
        setStateCriminales([...tempStateCriminales])

        setOpenLEEME(false)
        setOpenKerexe(false)
        setOpenApuntes(false)
        setOpenMapa(false)
        setOpenNoticias(false)
        setopenkerdata(false)
    }


    return (
        <div id="game">
            <div className="logoBack">
                <img alt="background" src={logoIcon} className={"themeImg " + cookies.themeColor} />
            </div>

            <Draggable
                handle=".handleWi"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[5, 5]}
                scale={parseFloat(cookies.scale)}
                bounds="parent"
            >
                <div className={clsx("handleWi dayContent themeBorder themeFont", cookies.themeColor)}>
                    <div className="dayText">
                        <h3>Día: {day}</h3>
                    </div>
                    <div className={clsx("dayButton themeBorder", cookies.themeColor)} onClick={nextDay}>
                        <p>Fin del Día</p>
                    </div>
                    <div className={clsx("dayButton themeBorder", cookies.themeColor)} onClick={closeAllModals}>
                        <p>Cerrar todo</p>
                    </div>
                    <div className={clsx("barCount themeBorder", cookies.themeColor)}>
                        <div
                            style={{width: ((countCommands * 100)/G_CountMax) + "%" }}
                            className={clsx("barCountView themeBG", cookies.themeColor)}>
                        </div>
                    </div>
                </div>
            </Draggable>

            {/* DataKerex */}
            {openKerexe &&
                <IconDesk
                    identify="contador"
                    icon={<GiRingedPlanet />}
                    title="ker.data"
                    modal={setopenkerdata}
                    position={[(0), (0)]}
                >
                </IconDesk>
            }
            <Modal
                open={openkerdata}
                setOpen={setopenkerdata}
                identify="contador"
                icon={<GiRingedPlanet />}
                title="ker.data"
                content={
                    <div>
                        {kerDataList &&
                            kerDataList
                            .map((data, index)=>{
                            return(<div key={index} className="dataListActions">
                                <p>[status]: <strong>{data.status}</strong></p>
                                <p>[comando]: <strong>{data.command === undefined || data.command === "" ? "null" : data.command}</strong> </p>
                                <p>[accion]: <strong>{data.data === undefined || data.data === "" ? "null" : data.data}</strong></p>
                                <hr className={cookies.themeColor} />
                            </div>)
                        }).reverse()}
                    </div>
                }
                height={500}
                width={256}
                position={{ x: 0, y: 0 }}
            >
            </Modal>


            {/* Noticias */}
            <IconDesk
                identify="noticias"
                icon={<FaNewspaper />}
                title="news.paper"
                modal={setOpenNoticias}
                position={[(80*14), (72*6)]}
            >
            </IconDesk>
            <Modal
                open={openNoticias}
                setOpen={setOpenNoticias}
                identify="noticias"
                icon={<FaNewspaper />}
                title="Noticias"
                content={<Noticias></Noticias>}
                height={480}
                width={550}
                position={{ x: 365, y: 160 }}
            >
            </Modal>

            {/* KER.EXE */}
            <IconDesk
                identify="kerexe"
                icon={<GiCowled />}
                title="ker.exe"
                modal={setOpenKerexe}
                position={[(0), (72)]}
            >
            </IconDesk>
            <Modal
                open={openKerexe}
                setOpen={setOpenKerexe}
                identify="kerexe"
                icon={<GiCowled />}
                title="ker.exe"
                content={Kerexe(
                    openModal,
                    kill,
                    kerData,
                    countCommands
                )}
                height={300}
                width={450}
                position={{ x: 415, y: 210 }}
            >
            </Modal>

            {/* Criminales */}
            {stateCriminales.map((doc, index) => {
                return (
                    <Modal
                        key={index}
                        open={doc.open}
                        map={true}
                        setOpen={openModal}
                        identify={doc.archivo}
                        icon={<FaFingerprint />}
                        title={"[" + doc.archivo + "].doc"}
                        content={<CriminalesDoc doc={doc}></CriminalesDoc>}
                        height={500}
                        width={450}
                        position={{ x: 415, y: 110 }}
                    >
                    </Modal>
                )
            })}

            {/* LEEME.TXT */}
            <IconDesk
                identify="leeme"
                icon={<FaFileAlt />}
                title="LEEME.txt"
                modal={setOpenLEEME}
                position={[(80 * 3), (72 * 4)]}
            >
            </IconDesk>
            <Modal
                open={openLEEME}
                setOpen={setOpenLEEME}
                identify="leeme"
                icon={<FaFileAlt />}
                title="LEEME.txt"
                content={Leeme()}
                height={500}
                width={450}
                position={{ x: 415, y: 110 }}
            >
            </Modal>

            {/* APUNTES.N */}
            <IconDesk
                identify="apuntes"
                icon={<IoDocumentSharp />}
                title="apuntes.n"
                modal={setOpenApuntes}
                position={[(0), (72 * 2)]}
            >
            </IconDesk>
            <Modal
                open={openApuntes}
                setOpen={setOpenApuntes}
                identify="apuntes"
                icon={<IoDocumentSharp />}
                title="apuntes.n"
                content={<Apuntes></Apuntes>}
                height={350}
                width={300}
                position={{ x: (640 - 150), y: (360 - 175) }}
            >
            </Modal>

            {/* Mapa */}
            <IconDesk
                identify="map"
                icon={<GiAngelWings />}
                title="brumen.map"
                modal={setOpenMapa}
                position={[(80*14), (72*5)]}
            >
            </IconDesk>
            <Modal
                open={openMapa}
                setOpen={setOpenMapa}
                identify="map"
                icon={<GiAngelWings />}
                title="Brumen.map"
                content={<Mapa></Mapa>}
                height={460}
                width={700}
                position={{ x: 290, y: 80 }}
            >
            </Modal>

            {/* PANTALLA DE INICIO */}
            <IconDesk
                identify="inicio"
                icon={<FaDoorOpen />}
                title="Exit"
                fn={props.setState}
                param={0}
                position={[(80 * 15), (72 * 9)]}
            >
            </IconDesk>
        </div>
    )
}

// LEEME.txt

function Leeme() {
    return (
        <div className="Leeme">
            <p>Hola L. Y.</p>
            <br />
            <p>Esté texto será solo un pequeño instructivo por cortecía, tu historia me conmovió lo suficiente, es una pena lo que le hicieron a tu hija.</p>
            <p>Recuerda que nadie se debe de enterar de este Sistema, cuando termines tu venganza quema con gasolina el disco duro.</p>
            <br />
            <p>En tu carta comentaste que no sabias ni como prender una computadora, por suerte me tienes a mí para medio explicarte.</p>
            <p>Por obvias razones, te enteraste que con doble click puedes abrir el contenido de los iconos.</p>
            <p>Los cuales, los puedes mover a donde se te acomoden mejor solo manteniendo el click.</p>
            <br />
            <p>Los documentos o programas que te aparezcan en pantalla los puedes hacer pequeños, dándole doble click en la barra superior o solo un click al botón de "-".</p>
            <p>Con la misma barra superior al mantener el click podras mover las ventanas.</p>
            <p>Con la "x" los podras cerrar, ten cuidado con ese, ya que los archivos no se guardan en tu computadora para no mantener evidencia en tu contra.</p>
            <br />
            <p><strong>IMPORTANTE</strong></p>
            <p>Podras ver que hay en total 5 iconos, te explico los 4 restantes.</p>
            <br />
            <p><FaDoorOpen /> - Exit</p>
            <p>Podras salir a la pantalla principal.</p>
            <br />
            <p><FaCogs /> - Opciones</p>
            <p>Aquí está la configuración básica del sistema, (Color, Volumen).</p>
            <br />
            <p><IoDocumentSharp /> - apuntes.n</p>
            <p>Es un "Bloc de Notas" encriptado, donde podras guardar apuntes para no olvidar datos importantes.</p>
            <p>Podras borrar o copiar el mensaje solo con un click.</p>
            <p>Como cortecía te deje unas pequeñas pistas para que puedas empezar tu asunto personal.</p>
            <br />
            <p><GiCowled /> - Ker.exe</p>
            <p><strong>Pon atención</strong>, ya que esta será tu herramienta principal.</p>
            <br />
            <p>KER.EXE es una consola que te ayudara a hackear el Centro de Justicia. Te da acceso a los expedientes criminales, declaraciones de testigos y otros documentos útiles para tu propósito. </p>
            <br />
            <p>Ocuparas usar comandos para las diferentes tareas en la consola.</p>
            {/* <br /> */}
            <ul>
                <li><strong>"log"</strong> - obtener un documento.
                    <p>Ocupas el nombre de dicho documento.</p>
                    <p>Ejemplo: "log nombre.del.documento"</p>
                </li>
                <br />
                <li><strong>"clean"</strong> - Limpia la consola.
                    <p>Borra todo el registro de la consola.</p>
                </li>
            </ul>


        </div>
    )
}


// Consola
function Kerexe(openModal, kill, kerData, countCommands) {
    const [cookies] = useCookies(['themeColor']);
    const [consoleCodes, setConsoleCodes] = useState(["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]);

    useEffect(()=>{
        if(countCommands === 0){ // eslint-disable-next-line
            setConsoleCodes(["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]) // eslint-disable-next-line
        } // eslint-disable-next-line
    }, [countCommands])

    $(".kerexe").unbind('click').bind('click', (e) => {
        $("#kerexeInputText").focus()
    })

    $(".kerexe").unbind('keydown').bind('keydown', (e) => {
        let tempconsoleCodes = consoleCodes

        let tempCriminales = criminalesJSON
        let tempReportes = reportesJSON

        if (e.which === 13 && countCommands < G_CountMax) {

            if(tempconsoleCodes.length > 5) {tempconsoleCodes = ["Ker.exe [Versión 1.0.1] user@desktop-11322 ~"]}

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


    return (
        <div id="kerexe">
            {consoleCodes.map((e, index) => {
                return (
                    <p key={index}>{e}</p>
                )
            })}
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
}

export default Game