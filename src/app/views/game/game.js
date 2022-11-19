// Dev 12 - Mayo - 2022 hola
// Build  13 - Mayo - 2022

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
// import $ from 'jquery'
import clsx from "clsx"

// Components
import Modal from '../../components/modal/modal'
import IconDesk from '../../components/iconDesk/iconDesk'
import Draggable from 'react-draggable';
import Sonidos from '../../components/sonidos/sonidos';
import tippy from 'tippy.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import 'tippy.js/dist/backdrop.css';
// import 'tippy.js/animations/shift-away.css';

// Views in Modals
import Mapa from '../../components/mapa/mapa'
import Apuntes from '../../components/apuntes/apuntes'
import CriminalesDoc from '../../components/documentos/criminales/criminales'
import ReportesDoc from '../../components/documentos/reportes/reportes'
import Noticias from "../../components/noticias/noticias";
import Consola from '../../components/consola/consola';

// Icons
import { IoDocumentSharp } from "react-icons/io5";
import { FaCogs, FaDoorOpen, FaFingerprint, FaFileAlt, FaNewspaper, FaBook, FaHandPeace, FaCopy } from "react-icons/fa";
import { GiCowled, GiAngelWings, GiRingedPlanet } from "react-icons/gi";

// CSS
import "./game.css"
import "./modals.css"
import 'tippy.js/dist/tippy.css';

// Imgs
import logoIcon from "../../../media/logo.png"

// Data JSON
import criminalesJSON from "../../data/criminales.json"
import reportesJSON from "../../data/reportes.json"

const G_CountMax = 10

function Game(props) {
    const [cookies, setCookie] = useCookies(['messages', 'listKill', "day", "volume"]);

    const [stateCriminales, setStateCriminales] = useState(criminalesJSON)
    const [stateReportes, setStateReportes] = useState(reportesJSON)

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

    // Abre modals segun el JSON
    const openModal = (modal) => {
        let tempCriminales = stateCriminales
        let tempReportes = stateReportes

        let findCriminal = tempCriminales.find(c => c.archivo === modal)
        let findReporte = tempReportes.find(c => c.archivo === modal)

        if (findCriminal) {
            findCriminal.open = !findCriminal.open
            setStateCriminales([...tempCriminales])
        } else if(findReporte){
            findReporte.open = !findReporte.open
            setStateReportes([...tempReportes])
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

        let tempStateReportes = stateReportes
        tempStateReportes.filter(x => x.open === true).forEach(a => a.open = false)
        setStateReportes([...tempStateReportes])

        // setOpenLEEME(false)
        // setOpenKerexe(false)
        // setOpenApuntes(false)
        // setOpenMapa(false)
        // setOpenNoticias(false)
        // setopenkerdata(false)

        let tempListApps = listApps
        const objectsKeys = Object.keys(tempListApps)
        objectsKeys.forEach(key => {
            tempListApps[key].open = false
        })
        setListApps({...tempListApps})
    }

    tippy('[data-tippy-content]', {
        // content: 'Prueba Rara de texto largo para entender algo interesante del juego',
        // ignoreAttributes: true,
        // followCursor: true,
        allowHTML: true,
        arrow: false,
        getReferenceClientRect: () => ({
            // width: 200,
            // height: 100,
            left: 0,
            bottom: 0,
        }),
        theme: cookies.themeColor,
        appendTo: document.getElementById("game"),
    })

    const [listApps, setListApps] = useState({
        kerexe: {
            open: false,
            iconView: true,
            identify: "kerexe",
            title: "ker.exe",
            dtc: "Consola Magica",
            icon: <GiCowled />,
            position: [(0), (72)],
            positionModal: { x: 415, y: 210 },
            height: 300,
            width: 450
        },
        dataker: {
            open: false,
            iconView: false,
            identify: "dataker",
            title: "data.ker",
            dtc: "Lista de comandos utilizados.",
            icon: <GiRingedPlanet />,
            position: [(0), (0)],
            positionModal: { x: 200, y: 0 },
            height: 500,
            width: 256
        },
        noticiaspaper: {
            open: false,
            iconView: true,
            identify: "noticiaspaper",
            title: "news.paper",
            dtc: "Noticias del día actual",
            icon: <FaNewspaper />,
            position: [(80*14), (72*6)],
            positionModal: { x: 365, y: 160 },
            height: 480,
            width: 550
        },
        leemetxt: {
            open: false,
            iconView: true,
            identify: "leemetxt",
            title: "LEEME.txt",
            dtc: "Nota con instrucciones básicas.",
            icon: <FaFileAlt />,
            position: [(80 * 3), (72 * 4)],
            positionModal: { x: 415, y: 110 },
            height: 500,
            width: 450
        },
        apuntesnote: {
            open: false,
            iconView: true,
            identify: "apuntesnote",
            title: "apuntes.note",
            dtc: "Software para guardar datos, que permaneceran siempre.",
            icon: <IoDocumentSharp />,
            position: [(0), (72 * 2)],
            positionModal: { x: (640 - 150), y: (360 - 175) },
            height: 350,
            width: 300
        },
        brumenmap: {
            open: false,
            iconView: true,
            identify: "brumenmap",
            title: "Brumen.map",
            dtc: "Mapa general de la Ciudad de Brumen.",
            icon: <GiAngelWings />,
            position: [(80*14), (72*5)],
            positionModal: { x: 290, y: 80 },
            height: 460,
            width: 700
        },
        inicio: {
            open: false,
            iconView: true,
            identify: "inicio",
            title: "Exit",
            dtc: "Salir a la pantalla principal.",
            icon: <FaDoorOpen />,
            position: [(80 * 15), (72 * 9)],
        },
    })

    return (
        <div id="game">
            <div className="logoBack">
                <img alt="background" src={logoIcon} className={"themeImg " + cookies.themeColor} />
            </div>

            <Draggable
                handle=".handleWi"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[2, 2]}
                scale={parseFloat(cookies.scale)}
                bounds="parent"
            >
                <div
                    data-tippy-content={`Progreso general del día.<br/> - Día Actual <br /> - Usos de la Consola`}
                    className={clsx("dayContent themeBorder themeFont", cookies.themeColor)}
                >

                    <div className={clsx("handleWi themeBorder", cookies.themeColor)}>
                        <h5 id="myButton"
                        > <FaHandPeace /> Estado General</h5>
                    </div>

                    <div className="dayBox">
                        <div className="dayText"
                        >
                            <h3>Día: {day}</h3>
                        </div>
                        {/* <div className={clsx("dayButton themeBorder", cookies.themeColor)} onClick={nextDay}>
                            <p>Fin del Día</p>
                            </div>
                            <div className={clsx("dayButton themeBorder", cookies.themeColor)} onClick={closeAllModals}>
                            <p>Cerrar todo</p>
                        </div> */}
                        {/* <div className="contentUse">
                            <h4>Usos:</h4>
                            <div className={clsx("barCount themeBorder", cookies.themeColor)}>
                                <div
                                    style={{width: ((countCommands * 100)/G_CountMax) + "%" }}
                                    className={clsx("barCountView themeBG", cookies.themeColor)}>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Draggable>

            {/* DataKerex */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.dataker}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.dataker}
                setData = {setListApps}
                content={
                    <div>
                        {kerDataList &&
                            kerDataList
                            .map((data, index)=>{
                            return(
                                <div key={index}>
                                    <div className="dataListActions" >
                                        <div>
                                            <p>[success]: <strong>{data.status}</strong></p>
                                            <p>[command]: <strong>{data.command === undefined || data.command === "" ? "null" : data.command}</strong> </p>
                                            <p>[param]: <strong>{data.data === undefined || data.data === "" ? "null" : data.data}</strong></p>
                                        </div>
                                        <div>
                                            {data.status === "true" &&
                                                <div className="dataIcons">
                                                    <div className="dataCopy">
                                                        <CopyToClipboard text={`${data.command} ${data.data}`}>
                                                            <FaCopy />
                                                        </CopyToClipboard>
                                                    </div>
                                                    {/* <FaHeart /> */}
                                                </div>
                                            }
                                            {/* {data.status === "false" && <FaTimes/>} */}
                                        </div>
                                    </div>
                                    <hr className={cookies.themeColor} />
                                </div>
                            )
                        }).reverse()}
                    </div>
                }
            >
            </Modal>

            {/* Noticias */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.noticiaspaper}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.noticiaspaper}
                setData = {setListApps}
                content={<Noticias></Noticias>}
            >
            </Modal>

            {/* KER.EXE */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.kerexe}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.kerexe}
                setData = {setListApps}
                content={
                    <Consola data={
                        {
                            "listApps": listApps,
                            "setListApps": setListApps,
                            "nextDay": nextDay,
                            // "openKerexe": openKerexe,
                            // "setOpenKerexe": setOpenKerexe,
                            "openModal": openModal,
                            "countCommands": countCommands,
                            "G_CountMax": G_CountMax,
                            "kerData": kerData,
                            "kill": kill,
                            "criminalesJSON": stateCriminales,
                            "reportesJSON": stateReportes,
                        }
                    } />
                }
            >
            </Modal>

            {/* Criminales */}
            {stateCriminales.map((doc, index) => {
                return (
                    <Modal
                        key={index}
                        data = {{
                            open: doc.open,
                            identify: doc.archivo,
                            title: "[" + doc.archivo + "].doc",
                            icon: <FaFingerprint />,
                            positionModal: { x: 415, y: 110 },
                            height: 500,
                            width: 450
                        }}
                        map={true}
                        setOpen={openModal}
                        content={<CriminalesDoc doc={doc}></CriminalesDoc>}
                    >
                    </Modal>
                )
            })}

            {/* Reportes */}
            {stateReportes.map((doc, index) => {
                return (
                    <Modal
                        key={index}
                        data = {{
                            open: doc.open,
                            identify: doc.archivo,
                            title: "[" + doc.archivo + "].doc",
                            icon: <FaBook />,
                            positionModal: { x: 415, y: 110 },
                            height: 500,
                            width: 450
                        }}
                        map={true}
                        setOpen={openModal}
                        content={<ReportesDoc doc={doc}></ReportesDoc>}
                    >
                    </Modal>
                )
            })}

            {/* LEEME.TXT */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.leemetxt}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.leemetxt}
                setData = {setListApps}
                content={Leeme()}
            >
            </Modal>

            {/* APUNTES.N */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.apuntesnote}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.apuntesnote}
                setData = {setListApps}
                content={<Apuntes></Apuntes>}
            >
            </Modal>

            {/* Mapa */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.brumenmap}
                setData = {setListApps}
            >
            </IconDesk>
            <Modal
                listApps = {listApps}
                data = {listApps.brumenmap}
                setData = {setListApps}
                content={<Mapa></Mapa>}
            >
            </Modal>

            {/* PANTALLA DE INICIO */}
            <IconDesk
                listApps = {listApps}
                data = {listApps.inicio}
                setData = {setListApps}
                fn={props.setState}
                param={0}
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


export default Game