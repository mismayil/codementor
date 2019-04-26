const STRIKE = 'X'
const SPARE = '/'

function bowlingScore(framesString) {
  let frames = framesString.split(' ').map(function(frame) { return frame.split('')})
  let score = 0

  frames.forEach(function(rolls, frameIndex) {

    rolls.forEach(function(roll, rollIndex) {

      if (roll === STRIKE) {
        score += 10

        if (frameIndex < frames.length-1) {
          let nextRolls = frames[frameIndex+1]

          if (nextRolls.length < 2) {
            let nextRoll = nextRolls[0]
            score += nextRoll === STRIKE ? 10 : parseInt(nextRoll)

            if (frameIndex < frames.length-2) {
              nextRolls = frames[frameIndex+2]
              nextRoll = nextRolls[0]
              score += nextRoll === STRIKE ? 10 : parseInt(nextRoll)
            }
          } else {
            score += nextRolls.slice(0, 2).reduce(function(total, currentRoll, index) {
              return total + (currentRoll === STRIKE ? 10 : currentRoll === SPARE ? 10-parseInt(nextRolls[index-1]) : parseInt(currentRoll))
            }, 0)
          }
        }
      } else if (roll === SPARE) {

        score += 10-parseInt(rolls[rollIndex-1])

        if (frameIndex < frames.length-1) {
          let nextRolls = frames[frameIndex+1]
          let nextRoll = nextRolls[0]
          score += nextRoll === STRIKE ? 10 : parseInt(nextRoll)
        }
      } else {
        score += parseInt(roll)
      }
    })
  })

  return score
}

console.log(bowlingScore('X 81 54 9/ X 34 5/ 45 9/ X45'))
