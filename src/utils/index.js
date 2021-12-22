/**
 * Helper file
 * @module index.js
 * 
 * @author Nwani Victory
 * @description Helper file containing exported functions used in the Game component 
 */

/**
 * Generates a random number between 0 - 9
 * @returns Number
 */
const guessNumber = () => Math.floor(Math.random() * 9)

/**
 * @enum {Array.<Array>} combination of possible matching patterns within a game. 
 */
const GAME_WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/**
 * 
 * @param Array exisitingArr finds a random number between 0 - 9 not in exisitingArr agument. 
 * @returns Number
 */
export const findUniqueRandomNumber = (exisitingArr) => {
    let rand = guessNumber();

    for (let i = 0; i < exisitingArr.length; i++) {
        if (exisitingArr[rand]) {
            rand = guessNumber()
        } else {
            return rand
        }
    }
}

/**
 * 
 * @param {Array} existingArray finds matching patterns within existingArray argument 
 * @returns {Object}
 */
export const getWinner = (existingArray) => {
    for (let i = 0; i <= 7; i++) {
        const winCombination = GAME_WINNING_COMBINATIONS[i];

        let a = existingArray[winCombination[0]];
        let b = existingArray[winCombination[1]];
        let c = existingArray[winCombination[2]];

        if (a === b && b === c) {
            return { winningPlayer: a, matchingTiles: [winCombination[0], winCombination[1], winCombination[2]] }
        }
    }
}