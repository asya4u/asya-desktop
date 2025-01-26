import { useState, useEffect } from "react";
import "app/layouts/page.css";
import ThreeScene from "widgets/Model/Model";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

function App() {
    const [command, setCommand] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [isListening, setIsListening] = useState(false);

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setCommand(transcript);
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Ваш браузер не поддерживает распознавание речи.</span>;
    }

    const handleVoiceInput = () => {
        if (isListening) {
            SpeechRecognition.stopListening();
            setIsListening(false);
        } else {
            resetTranscript();
            SpeechRecognition.startListening({
                continuous: true,
                language: "ru-RU",
            });
            setIsListening(true);
        }
    };

    const sendCommand = () => {
        const socket = new WebSocket("ws://127.0.0.1:3001/ws");

        const messageTemplate = JSON.stringify({
            human: {
                message: command,
            },
        });

        socket.onopen = () => {
            socket.send(messageTemplate);
            setResponse("ws started");
        };

        socket.onmessage = (e) => {
            console.log(e.data);
            setResponse(e.data);
        };

        socket.onclose = () => {
            setResponse("ws closed");
            console.log("closed ws");
        };

        socket.onerror = (error) => {
            setResponse(error.toString());
            console.log(error);
        };
    };

    return (
        <>
            <div>
                {response && <span>{response}</span>}
                {/* <div className="ModelCont">
					<ThreeScene />
				</div> */}
                <br />
                <input
                    type="text"
                    placeholder="Type here command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                />
                <button onClick={handleVoiceInput}>
                    {isListening ? "Остановить запись" : "Начать запись"}
                </button>
                <br />
                <button onClick={sendCommand}>Send command</button>
            </div>
        </>
    );
}

export default App;
