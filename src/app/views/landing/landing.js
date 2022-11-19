import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import clsx from "clsx"
import $ from 'jquery'

// Icons
import { FaQuestion, FaSkull } from "react-icons/fa";
import { RiWifiOffFill, RiWifiFill} from "react-icons/ri";

// Component
import Modal from '../../components/modal/modal'
import Options from '../../components/options/options'

// CSS
import "./styleLanding.css"

// Imgs
import logo from "../../../media/logoGame.png"


function Landing(props) {
    const [cookies, setCookie] = useCookies(['themeColor', "volume", "scale", "users"]);
    const [users, setUsers] = useState(cookies.users ? cookies.users : [
        {slot: 1, active: false, user:"Select Name", day: 1, exp: 0, faults: 0},
        {slot: 2, active: false, user:"Select Name", day: 1, exp: 0, faults: 0},
        {slot: 3, active: false, user:"Select Name", day: 1, exp: 0, faults: 0}
    ])

    // Setea Cookies si no existen
    useEffect(() => {
        const checkCookies = () => {
            if(!cookies.themeColor) {
                setCookie('themeColor', 'white', {
                    path: "/",
                    maxAge: 99000000
                })
            }
            if(!cookies.volume) {
                setCookie('volume', '-20', {
                    path: "/",
                    maxAge: 99000000
                })
            }
            if(!cookies.users) {
                setCookie('users', users, {
                    path: "/",
                    maxAge: 99000000
                })
            }
        }

        checkCookies(); // eslint-disable-next-line
    }, [])

    // Empieza el Juego
    const PlayGame = (status) => {
        // props.setState(1)
        let tempListApps = listApps
        // tempListApps.startgame.open = !tempListApps.startgame.open
        tempListApps.startgame.open = status
        setListApps({...tempListApps})
    }

    // Open and Close Options
    const [openOptions, setOpenOptions] = useState(false)
    const fnOptions = ()=>{
        setOpenOptions(!openOptions);
        PlayGame(false);
    }

    // Texto
    let menu1 = "<entrar/>"
    let menu2 = "<opciones/>"


    // Modal Select Users
    const [listApps, setListApps] = useState({
        startgame: {
            open: false,
            // iconView: true,
            identify: "startgame",
            title: "kerexe.game",
            // dtc: "Consola Magica",
            icon: <FaSkull />,
            // position: [(0), (72)],
            positionModal: { x: 415, y: 200 },
            height: 225,
            width: 450
        }
    })

    // const [user, setUser] = useState(cookies.user ? cookies.user : "")

    // const getUser = (e) => {
    //     setUser(e.target.value);
    // }

    const startGamewithUser = (user) => {
        console.log(user)
    }
    
    const saveUser = (i) => {
        let tempuser = users
        let name = $("#slot"+i).val()
        tempuser[i].user = name+""
        tempuser[i].active = true
        setUsers([...tempuser])
        // console.log(document.getElementById("slot"+i).value);
        console.log("user");
        // setCookie('user', user, {
        //     path: "/",
        //     maxAge: 99000000
        // })
    }

    // console.log(users);

    return(
        <div id="landing">
            <div className="landing_content">
                <div className="landingLogo_content">
                    <img src={logo} alt="logo1" className={"landingLogo noGlitch themeImg "+cookies.themeColor} />
                    <img src={logo} alt="logo2" className="landingLogo glitch1" />
                    <img src={logo} alt="logo3" className="landingLogo glitch2" />
                </div>
                <h2 className={"landingMenu themeFont " + cookies.themeColor} onClick={()=>PlayGame(true)}>{menu1}</h2>
                <h2 className={"landingMenu themeFont green " + cookies.themeColor} onClick={fnOptions}>{menu2}</h2>
            </div>
            <div className={"landingHelp themeFont green " + cookies.themeColor}>
                <h2><FaQuestion/></h2>
            </div>
            <div className={"landingVer themeFont green " + cookies.themeColor}>
                <h5>v. 1.0.3</h5>
            </div>

            <Modal
                listApps = {listApps}
                data = {listApps.startgame}
                setData = {setListApps}
                content={
                    <div className={clsx("themeFont", cookies.themeColor)}>
                        {users && users.map((u, i) => {
                            if(u.active){
                                return(
                                    <div key={i} className={clsx("slotUser")}>
                                        <RiWifiFill className="iconUser" />
                                        <div className="dataUser">
                                            <div>
                                                <h3>{u.slot}.- {u.user}</h3>
                                                <div className="extraDataUser">
                                                    <p>Días: {u.day}</p>
                                                    <p>Faltas: {u.faults}</p>
                                                </div>
                                            </div>
                                            <button onClick={()=>{startGamewithUser(u)}}>Entrar</button>
                                        </div>
                                        {/* {u.active+""} */}
                                    </div>
                                )
                            } else {
                                return(
                                    <div key={i} className={clsx("slotUser")}>
                                        <RiWifiOffFill className="iconUser" />
                                        <div className="dataUser">
                                            <div>
                                                <h3>{u.slot}.- <input
                                                    id={"slot"+i}
                                                    placeholder="Selecciona tu nombre"
                                                    className={clsx("themeInput themeFont", cookies.themeColor)}
                                                    type="text" />
                                                </h3>
                                            </div>
                                            <button onClick={()=>{saveUser(i)}}>Guardar</button>
                                        </div>
                                        {/* {u.active+""} */}
                                    </div>
                                )
                            }
                        })}
                        {/* <h4>Nombre de usuario:</h4>
                        <input value={user} onChange={getUser} className={clsx("themeInput themeFont", cookies.themeColor)} type="text" />
                        <button onClick={okUser}>Ok</button> */}
                    </div>
                }
            ></Modal>


            <Options
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
            ></Options>
        </div>
    )
}

export default Landing


// Opciones
// Color de letra