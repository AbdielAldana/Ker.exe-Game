import { useCookies } from 'react-cookie';

// Icons
import {GiAngelWings, GiBrokenShield } from "react-icons/gi";


// CSS
import "./reportes.css"

function Reportes(props) {
    const [cookies] = useCookies();

    let archivo = props.doc.archivo
    let informe = props.doc.informe

    return(
        <div id="reportes">
            <div className="archivoHeader">
                <GiAngelWings />
                <div>
                    <h5>Centro de Justicia</h5>
                    <h6>Ciudad de Brumen</h6>
                </div>
                <GiBrokenShield />
            </div>
            <hr className={cookies.themeColor} />
            <div>
                <h4>Reporte {archivo}</h4>
            </div>
            {informe && informe.map((txt, index)=>{
                return(
                    <div key={index}>
                        <p>{txt}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Reportes