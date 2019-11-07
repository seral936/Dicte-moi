window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// -----------J'INSTANCIE new SpeechRecognition
const recognition = new SpeechRecognition
// -----------JE RECUPERE LA DIV QUI CONTIENDRA LA TEXTE QU'IL VA ME RETOURNER 
const transcription_element = document.getElementById('transcription')

// const btnStart = document.getElementById('start')
// const btnStop = document.getElementById('end')

// -----------JE CREER UNE BALISE P 
let p = document.createElement('p')
// -----------J'INSERE MA BALISE P DANS MA DIV 
transcription_element.appendChild(p)
/*
 -----------JE FAIT UN ADDEVENTLISTENER SUR recognition  QUI SE DECLANCHE AVEC L'EVENEMENT RESULT 
 (Se déclenche lorsque le service de reconnaissance vocale renvoie un résultat 
 - un mot ou une phrase a été reconnu (e) de manière positive et a été renvoyé à l'application.
 Aussi disponible via la onresultpropriété.)

*/
recognition.addEventListener('result', (e) => {
    // -----------JE VAIS RECUPERER MA TRANSCRIPTION 
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
    // -----------SI IL CAPTE LE MOT COUCOU IL SE METTRA EN ROUTE (A NOTER QUE JE LE MET EN MODE ECOUTE D'ENTRER)
    if (transcript.startsWith('coucou')) {
        // DES QU'IL A LE FEUX VERT J'INSERE MON TEXTE DANS LE MON P 
        p.textContent = transcript
        // -----------SI isFinal ME RETOURNE TRUE JE CREER UN AUTRE P PUIS JE LUI INSERE MA TRANSCRIPTION PUIS J'EFFACE MON P 
        if (e.results[0].isFinal) {
            p = document.createElement('p')
            p.textContent = transcript
            transcription_element.appendChild(p)
            p.textContent = ''
            // SI IL CAPTE LE MON SALAM IL ME REPONDRA "wa aleiykoum salam bébé"
            if (transcript.includes("salam")) {
                let command = document.createElement('p')
                command.classList.add('command')
                command.textContent = "wa aleiykoum salam bébé"
                transcription_element.appendChild(command)
            }
        }
    }
})
// -----------DEMARAGE DE L'PPLICATION 

recognition.addEventListener('end', recognition.start)
recognition.start()

// -----------POUR DEMARER L'APPLICATION AU CLICK 

// btnStart.addEventListener('click',()=>{
//     btnStop.disabled = false
//     btnStart.disabled=true

//     recognition.start()

// })

// btnStop.addEventListener('click',()=>{
//     btnStop.disabled = true
//     btnStart.disabled=false

//     recognition.stop()

// })