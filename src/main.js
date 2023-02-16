console.log('test log - script running')

  ////////////////////////////
 ///// STATE VARIABLES //////
////////////////////////////

let cards = [
    {name: "Ace", value: 11},
    {name: "Two", value: 2},
    {name: "Three", value: 3},
    {name: "Four", value: 4},
    {name: "Five", value: 5},
    {name: "Six", value: 6},
    {name: "Seven", value: 7},
    {name: "Eight", value: 8},
    {name: "Nine", value: 9},
    {name: "Ten", value: 10},
    {name: "Jack", value: 10},
    {name: "Queen", value: 10},
    {name: "King", value: 10},
]

let infoCards = {
    start: 'Choose "Hit" if you want to continue or "Stand" if you want to stop',
    continue: "Are you brave enough to continue?",
    switch: "Now it's the dealer's turn!",
    failed:  "You lost!",
    win: "YOU WIN!!!",
    tie: "It's a tie, Nobody wins!",
    rematch: "Do you want a rematch?"
}

let dealerScore = 0;
let playerScore = 0;


  ////////////////////////////////////
 ///// HELPER FUNCTION SECTION //////
////////////////////////////////////

// simplyfied because chances of one game having more than 4 times the same value are close to impossible
function getRandomCard(max) {
    // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * max);
}

function rematch_info() {
    $('#rematch').show()
    $('#info').text(infoCards.rematch)
}

function autoCardIncrement(newCard) {    
    dealerScore += newCard.value
    $('#dealer_cards').append('<br />' + newCard.name)
    if (dealerScore > 21) {
        // however if Ace was last card and player failed, Ace becomes "1", value will be corrected
        if (newCard.value === "Ace" && dealerScore - 10 < 21){
            dealerScore -= 10
        } 
        else if (dealerScore === 22) {
            $('#info').text(infoCards.tie);
        }
        else {
            $('#info').text(infoCards.win);
            // source: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
            setTimeout(rematch_info, 2000);
        }
    }
    $('#dealer_total').text(`Current Score: ` + dealerScore);
}


  ///////////////////////////////////
 ///// MAIN FUNCTION SECTION //////
//////////////////////////////////

// Adds Cards for the player and does conditional checks to determine the game state
function addCards(){
    let newCard = cards[getRandomCard(12)]
    console.log("Adding Card: ", newCard.name)
    playerScore += newCard.value
    $('#player_cards').append('<br />' + newCard.name)

    // if card value > 21: fail 
    if (playerScore > 21) {
        // however if Ace was last card and player failed, Ace becomes "1", value will be corrected
        console.log(newCard.name === 'Ace')
        if (newCard.value === "Ace" && playerScore - 10 < 21){
            playerScore -= 10
            console.log('invoked the exception')
        }
        else {
            $('#info').text(infoCards.failed);
            $('#hit').prop("disabled", true)
            $('#stand').prop("disabled", true)
            // source: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
            setTimeout(rematch_info, 3000);
        }
    }
    $('#player_total').text(`Current Score: ` + playerScore);
    $('#info').text(infoCards.continue)
}


function addCardsDealer(){
    $('#info').text(infoCards.switch)
    $('#hit').prop("disabled", true)
    $('#stand').prop("disabled", true)

    let newCard = {}
    
    // We play the Soft 17 version of Black Jack
    while (dealerScore < playerScore && dealerScore < 17){
        newCard = cards[getRandomCard(12)]
        autoCardIncrement(newCard);
    }

    if (dealerScore === playerScore) {
        $('#info').text(infoCards.tie)
    }
    else if (dealerScore > playerScore) {
        $('#info').text(infoCards.failed)
    }
    else if (dealerScore < playerScore) {
        $('#info').text(infoCards.win)
    }

    setTimeout(rematch_info, 3000);
}


  //////////////////////////
 ///// INITIAL STATE //////
//////////////////////////

$(document).ready(function() {
    $('#butt').click(function() {
        console.log("intro button clicked")
        $(this).hide("slow");
        $("#intro").hide("slow", function(){
            $("#main").show()
        });
    });

    $('#dealer_total').text(`Current Score: ` + dealerScore);
    $('#player_total').text(`Current Score: ` + playerScore);
    $('#info').text(infoCards.start);

});