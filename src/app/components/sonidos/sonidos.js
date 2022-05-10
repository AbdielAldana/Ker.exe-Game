import * as Tone from 'tone'

let bassSynth;
let synth;
let on = true;

function Sonidos(music, vol) {
    bassSynth = new Tone.MembraneSynth().toDestination()
    synth = new Tone.PolySynth().toDestination();

    synth.volume.value = vol;
    bassSynth.volume.value = vol;

    const now = Tone.now()

    if(music === "tono1" && on){
        tono1(synth, now)
    }

    if(music === "tono2" && on){
        tono2(synth, now)
    }

    if(music === "error" && on){
        error(synth, now)
    }
    // return(<div></div>)
}


function tono1(synth, now) {
    // synth.triggerAttackRelease(["a3", "g3"], "16n", now)
    // synth.triggerAttackRelease(["a3", "g3"], "16n", now + .3)
    // synth.triggerAttackRelease(["a3", "g3"], "10n", now + .6)
    // synth.triggerAttackRelease(["e3", "c2"], "20n", now + .2)
    // synth.triggerAttackRelease(["g3", "c2"], "20n", now + .4)
    bassSynth.triggerAttackRelease("c1", "1n", now )
    bassSynth.triggerAttackRelease("a1", "1n", now + .1)
    bassSynth.triggerAttackRelease("d1", "2n", now + .2)
}

function tono2(synth, now) {
    synth.triggerAttackRelease("c4", "16n", now )
    // bassSynth.triggerAttackRelease("c1", "8n", now )
    synth.triggerAttackRelease("e4", "16n", now + .2)
    // bassSynth.triggerAttackRelease("e1", "8n", now + .2)
    synth.triggerAttackRelease("g4", "8n", now + .4)
    // bassSynth.triggerAttackRelease("g1", "8n", now + .4)

}

function error(synth, now) {
    synth.triggerAttackRelease("c3", "8n", now )
    bassSynth.triggerAttackRelease("c1", "2n", now)
    synth.triggerAttackRelease("c3", "8n", now +.2)
    bassSynth.triggerAttackRelease("c2", "2n", now+.2)
    // synth.triggerAttackRelease("c3", "10n", now +.3)
    // bassSynth.triggerAttackRelease("c1", "2n", now +.3)
    // synth.triggerAttackRelease("c3", "10n", now +.6)
    // bassSynth.triggerAttackRelease("c1", "2n", now +.6)
}


export default Sonidos