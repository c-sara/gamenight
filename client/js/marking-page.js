

let answerDivs = document.querySelectorAll('.marking-page-individual-answer-div')

var userId = null 
//add the polling function to grab up to date scores 


function addPointInPlayerTable(value, player_id){
    db.query(`UPDATE players SET score = score + $1 WHERE player_id = $2;`, [value, player_id])
}
  
  
//where game_id matches the game
function returnPlayersPoints() {
    let sql = `SELECT players_id, score FROM players;`
    return db.query(sql)
}

function getUserId(){
    axios.get('/api/marking-page')
        .then(res => {
            userId = res.data.userId
            return userId
        })
}


console.log(getUserId())

function handleAddPoint(e) {
    //increase or decrease players score in the players table
    //by default btn states are false
    //when clicked btn state goes to true
    //if btn state is false and the btn is pressed +1 in player table
    //if btn state is true and the btn is pressed -1 in player table

    // getUserId()
    


    //combine the addpoint and get user id into one single api call
    let clicked = e.target

    console.log(clicked.dataset.userId);
    if (clicked.classList.contains('marking-page-answer-btn')) {
        clicked.classList.toggle('clicked')
        if (clicked.classList.contains('clicked')){
            //adds 1 to score
            axios.put('/api/marking-page', {scoreChange: "increase"}, )
            //pass in the btn owner player id


            // addPointInPlayerTable(1, req.session.user_id)
        } else {
            //subtract by one
            axios.put('/api/marking-page', {scoreChange: "decrease"})


            // addPointInPlayerTable(-1, req.session.user_id)
        }
    }
}


// function renderPlayersScores() {
//     //this populates each players score span according to their player_id. By asking the servers for player score table




// }


// setInterval(renderPlayersScores, 1000)

answerDivs.forEach(answerDiv => {
    answerDiv.addEventListener('click', handleAddPoint)
    answerDiv.style.display = 'flex'
    answerDiv.style.flexDirection = 'column'
    answerDiv.style.textAlign = 'center'
})

let wrapper = document.querySelector('.marking-page-main')

wrapper.style.display = 'grid'
wrapper.style.gridTemplateColumns = `repeat(${answerDivs.length}, 1fr)`



