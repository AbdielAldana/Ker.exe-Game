import { useCookies } from 'react-cookie';

// Icons
import { GiSurroundedEye, GiAngelWings } from "react-icons/gi";

// CSS
import "./noticias.css"

function Noticias(props) {
    const [cookies] = useCookies();

    return(
        <div id="noticias">
            <div className="headerNews">
                <GiSurroundedEye />
                <div>
                    <h2>Diario La Visión</h2>
                    <h4>Ciudad de Brumen</h4>
                </div>
                <GiAngelWings />
            </div>

            <hr className={cookies.themeColor} />

            <div className="fechaNews">
                <h6>Suscripcion Día 1 - Número XZ01 - Edicion Wiverland</h6>
            </div>

            <hr className={cookies.themeColor} />

            <div className="principalNews">
                <h3>Asalto a mano armada en banco principal.</h3>
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
                <hr className={cookies.themeColor} />
            </div>

            <hr className={cookies.themeColor} />

            <div className="seccionesNews">
                <div className="seccion">
                    <h5>¿Qué la leche proviene de las vacas?, usuarios desconformes.</h5>
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                </div>
                <div className="seccion">
                    <h5>Politico afirma ser corrupto, pero solo poquito.</h5>
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                    <hr className={cookies.themeColor} />
                </div>
            </div>

            <hr className={cookies.themeColor} />

            <div className="messageNews">
                <h6>511 - 143 - 515 - 116 - 165 - 121 - 412 - 143 - 165 - 121 - 116 - 121 - 165 - 113</h6>
            </div>
        </div>
    )
}

export default Noticias