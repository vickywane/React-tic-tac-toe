import { useState } from 'react'
import '../App.css'
import Button from '../components/button'
import { navigate } from '@reach/router'

const players = ["X", "O"]

const Welcome = () => {
    const [selectedOpponnent, setSelectedOponnent] = useState(null)
    const [matchStatus, setMatchStatus] = useState("UN-MATCHED")

    const matchUser = () => {
        setMatchStatus("WAITING")
        setTimeout(() => navigate('/game', { state: { player: selectedOpponnent } }), 1000)
    }

    if (matchStatus === "UN-MATCHED") {
        return (
            <div className="App" >
                <div className="App-container" >
                    <h1> Welcome </h1>

                    <p className="title-text" > PICK YOUR PLAYER </p>
                    
                    <div className="player-options" >
                        {
                            players.map((player) =>
                                <div key={player} onClick={() => setSelectedOponnent(player)} className="flex-column"  >
                                    <p className="player" > {player} </p>
                                    <span className="divider"
                                        style={{
                                            background: selectedOpponnent === player ? "#5CB85C" : "#fff"
                                        }}
                                    />
                                </div>
                            )
                        }
                    </div>

                    <Button isDisabled={!selectedOpponnent} clickAction={matchUser} title={"Match me with my oppponent"} />
                </div>
            </div>
        )
    }

    if (matchStatus === "WAITING") {
        return (
            <div className="App" >
                <div className="App-container" >

                    <p className="title-text" > Waiting to find your <br /> opponent ... </p>

                    <div className="player-options" >
                        {players.map((player) => <p key={player} className="player" > {player} </p>)}
                    </div>
                </div>
            </div>
        )
    }

    return <div />
}

export default Welcome