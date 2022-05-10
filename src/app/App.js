import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery'

// VIEWS
import Landing from "./views/landing/landing"
import Game from "./views/game/game"

// CSS
import "./app.css"
import "./theme.css"

function App() {
	const [cookies, setCookie] = useCookies(['scale']);

	const [state, setState] = useState(0)

	$(document).ready(function () {
		changesDimensions()
		// $("body").on("contextmenu",function(e){
			// console.log("ad");
			// return false
		// });
		// $("#target").on("contextmenu",function(e){
		// 	console.log("123");
		// 	return false
		// });
	})

	$(window).resize(function () {
		changesDimensions()
	})

	// Detecta el Cambio de Dimenciones
	function changesDimensions() {
		var width = 1280;
        var height = 720;
        var windowWidth1 = $(window).width();
        var windowHeight1 = $(window).height();
        var r = 1;
        r = Math.min(windowWidth1 / width, windowHeight1 / height)
		document.getElementById("zoom").style.zoom = 100 *(r)+ "%";
		setCookie("scale", r, {
			path: "/",
            maxAge: 99000000
		})

		// Este solo es para que no me aparezca el Warning por no usar Cookies directamente.
		if (cookies.scale) {}
    }

	return (
		<div className="App" id="app">
			<div className={"scalable"} id="zoom">
            	<div className={"entorno"} id="target">
					{state === 0 &&
						<Landing state={state} setState={setState}>
						</Landing>
					}
					{state === 1 &&
						<Game state={state} setState={setState}>
						</Game>
					}
				</div>
			</div>
		</div>
	);
}

export default App;