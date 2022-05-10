import React from 'react';
import { useCookies } from 'react-cookie';
import clsx from "clsx"

// Icons
import {GiAngelWings, GiBrokenShield } from "react-icons/gi";

// CSS
import "./criminales.css"

// Data JSON
import huellasMap from "../../../data/huellasMap.json"

function Criminales(props) {
    const [cookies] = useCookies();

    let doc = props.doc

    return (
        <div id={doc.archivo} className={clsx("themeFont archivo", cookies.themeColor)}>

            <div className="archivoHeader">
                <GiAngelWings />
                <div>
                    <h5>Centro de Justicia</h5>
                    <h6>Ciudad de Brumen</h6>
                </div>
                <GiBrokenShield />
            </div>
            <hr className={cookies.themeColor} />

            <div className="top">
                <div className={clsx("picture themeBorder", cookies.themeColor)}>
                    <img alt="criminal" className={clsx("themeImg archivoImg", cookies.themeColor)} src={doc.img} />
                </div>
                <div className="info">
                    <p><strong>Nombre:</strong> {doc.nombre}</p>
                    <p><strong>Alias:</strong> {doc.alias}</p>
                    <p><strong>Genero:</strong> {doc.sexo}</p>
                    <p><strong>Edad:</strong> {doc.edad}</p>
                    <p><strong>Peso:</strong> {doc.peso}</p>
                    <p><strong>Altura:</strong> {doc.altura}</p>
                </div>
            </div>

            <div className={clsx("docStatus themeBorder", cookies.themeColor)}>
                <h1>{doc.status}</h1>
            </div>

            <div className="archivoText">
                <h3 className="archivoSubTitle"> = Presuntos Crimenes = </h3>
                <table className={clsx("tableDoc")}>
                    <thead>
                        <tr>
                            <th >Codigo</th>
                            <th >Crimen</th>
                            <th >Condena</th>
                            <th >Reporte</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doc.crimenes && doc.crimenes.map((c, i) => {
                            return (
                                <tr key={i}>
                                    <th className={clsx("themeBorder", cookies.themeColor)} >
                                        {c.code}
                                    </th>
                                    <th className={clsx("themeBorder", cookies.themeColor)} >
                                        {c.crimen}
                                    </th>
                                    <th className={clsx("themeBorder", cookies.themeColor)} >
                                        {c.condena}
                                    </th>
                                    <th className={clsx("themeBorder", cookies.themeColor)} >
                                        {c.reporte}
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <hr className={cookies.themeColor} />

            <div className="archivoText">
                <h3 className="archivoSubTitle"> = Registro Dactilar = </h3>
                <br />
            </div>
            <div className="huellas1">
                {doc.huellas && doc.huellas.map((h, i) => {
                    return (
                        <div key={i}>
                            <div className="huella1">
                                <img className={clsx("themeImg", cookies.themeColor)} alt="huella" src={huellasMap.find(e => e.id === h[0] && e.type === "c").img} />
                                <img className={clsx("themeImg", cookies.themeColor)} alt="huella" src={huellasMap.find(e => e.id === h[1] && e.type === "u").img} />
                                <img className={clsx("themeImg", cookies.themeColor)} alt="huella" src={huellasMap.find(e => e.id === h[2] && e.type === "d").img} />
                            </div>
                            <p>{i + 1}</p>
                        </div>
                    )
                })}
            </div>
            <br />
            <br />

        </div>
    )
}

export default Criminales