
import { useState } from 'react'
import "app/layouts/page.css"

function App() {

	const [command, setCommand] = useState<string>("")
	const [response, setResponse] = useState<string>("")

	const sendCommand = () => {
		const socket = new WebSocket("ws://127.0.0.1:3001/ws")

		const messageTemplate = JSON.stringify({
			"human": {
				"message": command
			}
		})

		socket.onopen = () => {
			socket.send(messageTemplate)
			setResponse("ws started")
		}

		socket.onmessage = (e) => {
			console.log(e.data)
			setResponse(e.data)
		}

		socket.onclose = () => {
			setResponse("ws closed")
			console.log("closed ws")
		}

		socket.onerror = (error) => {
			setResponse(error.toString())
			console.log(error)
		}
	}

	return (
		<>
			<div>
				{response && <span>{response}</span>}
				<br/>
				<input type="text" placeholder="Type here command" value={command} onChange={(e) => setCommand(e.target.value)} />
				<br />
				<button onClick={sendCommand}>Send command</button>
			</div>
		</>
	)
}

export default App
