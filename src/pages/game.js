import { useState } from 'react'
import "../App.css"
import Button from '../components/button';
import Toast from '../components/toast';
import { getWinner, findUniqueRandomNumber } from '../utils/'

const DisplayGameStatus = ({ status, currentPlayer, gameRecord, currentWinner }) => (
    <div>
        <p className="title-text" >
            {
                status === "ONGOING" ? `${currentPlayer}'s Turn!` : status === "TIE"
                    ? "It is a Tie!" : `${currentWinner}'s Wins!`
            }
        </p>
    </div>
)

const RecordView = ({ gameRecord, currentWinner, handleClick }) => {
    const { wins, losses } = gameRecord

    return (
        <div className="App" >
            <div className="App-container" >

                <p className="title-text" > {currentWinner ? `${currentWinner} WINS` : "IT WAS A tie!"}  </p>

                <p className="title-text" > You have won {wins.length} times <br /> and lost {losses.length} times</p>

                <Button clickAction={() => handleClick()} title="Play Again" />
            </div>
        </div>
    )
}

const GameTile = ({ value, handleClick, matchedTile }) => (
    <div className="box" style={{background: matchedTile ? "#5CB85C" : "transparent"}} onClick={handleClick}>{value}</div>
)

const Game = ({ location }) => {
    const { state } = location
    const [currentPlayer, setCurrentPlayer] = useState(state.player)
    const [gameStatus, setGameStatus] = useState('ONGOING')
    const [userGameRecord, setUserGameRecord] = useState({
        wins: [],
        losses: []
    })
    const [currentWinner, setCurrentWinner] = useState(undefined)
    const [currentGameView, setCurrentGameView] = useState("IN-GAME-VIEW")
    const [matchedTiles, setMatchedTiles] = useState([])

    const [tiles, setTiles] = useState(new Array(9).fill(null))
    const [isGameDisabled, disableGame] = useState(false)

    const handleTileClick = (position) => {
        if (!tiles[position] && !isGameDisabled) {
            let tilesCopy = [...tiles]

            if (!tilesCopy.includes(null)) {
                setGameStatus("TIE")
                disableGame(true)
                return
            }

            // user move
            tilesCopy[position] = state.player

            // computer move
            const opponentPlayer = state.player === "X" ? "O" : "X"
            setCurrentPlayer(opponentPlayer)

            // A few ms waiting period is introduced to a time where the computer plays 
            setTimeout(() => {
                tilesCopy[findUniqueRandomNumber(tilesCopy)] = opponentPlayer
                const gameResult = getWinner(tilesCopy)

                if (gameResult?.winningPlayer) {
                    disableGame(true)
                    setMatchedTiles(gameResult?.matchingTiles)
                    setCurrentWinner(gameResult?.winningPlayer)
                    setGameStatus("WIN")

                    if (gameResult?.winningPlayer === state.player) {
                        handleGameRecord({ wins: gameResult?.winningPlayer })
                    } else {
                        handleGameRecord({ loss: state.player })
                    }
                }

                // return back to user
                setCurrentPlayer(state.player)
                setTiles(tilesCopy)
            }, 500)
        } else if (!tiles.includes(null)) {
            setGameStatus("TIE")
            disableGame(true)
        }
    }

    const handleGameRecord = ({ wins, loss }) => {
        let gameLosses = [...userGameRecord.losses]
        let gameWins = [...userGameRecord.wins]

        if (wins) {
            gameWins.push(wins)
        }

        if (loss) {
            gameLosses.push(loss)
        }

        setUserGameRecord({
            wins: gameWins,
            losses: gameLosses
        })
    }

    const resetGameState = () => {
        setTiles(new Array(9).fill(null))
        disableGame(false)
        setMatchedTiles([])
        setCurrentGameView("IN-GAME-VIEW")
        setGameStatus("ONGOING")
    }

    if (currentGameView === "IN-RECORD-VIEW") {
        return <RecordView gameRecord={userGameRecord} currentWinner={currentWinner} handleClick={resetGameState} />
    }

    return (
        <div className="App">
            <div className="App-container">
                <Toast title="now in game" />
                <DisplayGameStatus gameRecord={userGameRecord} currentPlayer={currentPlayer} status={gameStatus} currentWinner={currentWinner} />

                <div className="game-boxes" >
                    {tiles.map((tile, index) => <GameTile matchedTile={matchedTiles.includes(index)} key={index} value={tile} handleClick={() => handleTileClick(index)} />)}
                </div>

                {
                    isGameDisabled ? (
                        <div className="flex-column" >
                            <Button title="Play Again" clickAction={() => resetGameState()} />
                            <br />
                            <Button title="See Record" clickAction={() => setCurrentGameView("IN-RECORD-VIEW")} />
                        </div>
                    ): <br />
                }

            </div>
        </div>
    )
}

export default Game