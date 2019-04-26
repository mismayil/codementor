const Result = { "win": 1, "loss": 2, "tie": 3 }

const faces = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: 'T',
  JACK: 'J',
  QUEEN: 'Q',
  KING: 'K',
  ACE: 'A'
}

const suits = {
  SPADE: 'S',
  HEART: 'H',
  DIAMOND: 'D',
  CLUB: 'C'
}

const hands = {
  STRAIGHT_FLUSH: 10,
  FOUR_KIND: 9,
  FULL_HOUSE: 8,
  FLUSH: 7,
  STRAIGHT: 6,
  THREE_KIND: 5,
  TWO_PAIR: 4,
  ONE_PAIR: 3,
  HIGH_CARD: 2
}

function getValue(card) {
  let face = card[0]

  switch (face) {
    case faces.TEN: return 10
    case faces.JACK: return 11
    case faces.QUEEN: return 12
    case faces.KING: return 13
    case faces.ACE: return 14
    default: return parseInt(face)
  }

  return parseInt(face)
}

function getFace(card) {
  return card[0]
}

function getSuit(card) {
  return card[1]
}

function sortByValue(card1, card2) {
    let value1 = getValue(card1)
    let value2 = getValue(card2)
    return value1-value2
}

function PokerHand(hand) {
  this.hand = hand
  this.cards = hand.split(' ')
  this.cards.sort(sortByValue)
}

PokerHand.prototype.findBestHand = function() {
  let pairs = 0
  let handValue = 0

  let faceMapping = {}
  let suitMapping = {}

  this.cards.forEach(function(card, index) {
    let face = getFace(card)
    let suit = getSuit(card)

    if (!faceMapping[face]) faceMapping[face] = []
    if (!suitMapping[suit]) suitMapping[suit] = []

    faceMapping[face].push(card)
    suitMapping[suit].push(card)
  })

  if (Object.keys(suitMapping).length === 1) {
    let suitCards = suitMapping[Object.keys(suitMapping)[0]]

    suitCards.sort(sortByValue)

    for (let i = 1; i < suitCards.length; i++) {
      if (getValue(suitCards[i]) !== (getValue(suitCards[i-1])+1)) {
        return {type: hands.FLUSH, value: getValue(suitCards[suitCards.length-1])}
      }
    }

    return {type: hands.STRAIGHT_FLUSH, value: getValue(suitCards[suitCards.length-1])}
  }

  if (Object.keys(faceMapping).length === 5) {
    let isStraight = true

    for (let i = 1; i < this.cards.length; i++) {
      if (getValue(this.cards[i]) !== (getValue(this.cards[i-1])+1)) {
        isStraight = false
        break
      }
    }

    if (isStraight) return {type: hands.STRAIGHT, value: getValue(this.cards[this.cards.length-1])}
  }

  for (let face in faceMapping) {
    let faceCards = faceMapping[face]

    switch (faceCards.length) {
      case 2:
        pairs += 1
        handValue += getValue(faceCards[0])
        break
      case 3:
        if (Object.keys(faceMapping).length === 2) return {type: hands.FULL_HOUSE, value: getValue(faceCards[0])}
        else return {type: hands.THREE_KIND, value: getValue(faceCards[0])}
      case 4:
        return {type: hands.FOUR_KIND, value: getValue(faceCards[0])}
      default:
        handValue += getValue(faceCards[0])
        break
    }
  }

  if (pairs === 2) return {type: hands.TWO_PAIR, value: handValue}

  if (pairs === 1) return {type: hands.ONE_PAIR, value: handValue}

  return {type: hands.HIGH_CARD, value: handValue}
}

PokerHand.prototype.compareWith = function(hand){
   let bestHand = this.findBestHand()
   let otherBestHand = hand.findBestHand()

   if (bestHand.type > otherBestHand.type) return Result.win
   if (bestHand.type < otherBestHand.type) return Result.loss
   if (bestHand.value > otherBestHand.value) return Result.win
   if (bestHand.value < otherBestHand.value) return Result.loss

   return Result.tie;
}

var p = new PokerHand("2S 2H 4H 5S 4C");
var o = new PokerHand("AH AC 5H 6H 7S");
console.log(p.compareWith(o))
