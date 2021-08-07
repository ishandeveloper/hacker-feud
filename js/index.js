// var team1 = window.opener.document.getElementById("team1NAME").value;
// var team2 = window.opener.document.getElementById("team2NAME").value;
var CurrentRound = 1;

// play sound object
var audio = new Audio('');
function play_sound(sound) {
  var audio = new Audio('sfx/'+sound);
  audio.play();
  if (sound == "ff-strike.wav") {
    showImage();
  }
}

var app = {
  version: 1,
  currentQ: 0,
  jsonFile:"js/FF3.json",

  // Inital function
  init: function(){
    $.getJSON(app.jsonFile, app.jsonLoaded)
    app.board.find('#next' ).on('click', app.changeQuestion)
	  window.opener.game_window_init_done();
  },  

  board: $(
    "<div class='game__wrapper'>" + 
    "<div class='text__wrapper'>" +
    "<div class='hackerfeud'><div class='highlighter'></div><div class='title'>HackerFeud</div></div>"+
   "</div>" +
    "<div id='gameBoardId' class='gameBoard'>"+

             "<!--- Question --->"+
             "<div id='questionBar' class='questionHolder'>"+
               "<span class='question'></span>"+
             "</div>"+
           
             "<!--- Answers --->"+
             "<div id='answerBar' class='colHolder'>"+
               "<div class='col1'></div>"+
               "<div class='col2'></div>"+
             "</div>"+
             "</div>"+
             "</div>"
		   ),

	
  // Utility functions
  shuffle: function(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  jsonLoaded: function(data){
    //console.clear()
    app.allData   = data
    app.questions = Object.keys(data)
    // app.shuffle(app.questions)
    app.makeQuestion(app.currentQ)
    $('body').append(app.board)
  },
  // Action functions
  makeQuestion: function(qNum){
    var qText  = app.questions[qNum]
    var qAnswr = app.allData[qText]
		
    var qNum = qAnswr.length
        qNum = (qNum<6)? 6: qNum;
        qNum = (qNum % 2 != 0) ? qNum+1: qNum;
    
    var boardScore = app.board.find("#boardScore")
    var question   = app.board.find(".question")
    var col1       = app.board.find(".col1")
    var col2       = app.board.find(".col2")
    
    boardScore.html(0)
    // question.html(qText.replace(/&x22;/gi,'"'))
    question.html(qText.slice(3,))
	col1.empty()
    col2.empty()

	//roundpoints
	//qAnswr[i][0] is the text portion of the answerBar
	//qAnswr[i][1] is the value points portion of the question

    for (var i = 0; i < qNum; i++){
      var aLI     
      if(qAnswr[i]){
        aLI = $("<div class='cardHolder' data-card-got='false' onclick='play_sound(`ff-clang.wav`)' id='answer_" + i + "'>"+
                  "<div class='card'>"+
                    "<div class='front'>"+
                      "<span class='DBG'>"+(i+1)+"</span>"+
                    "</div>"+
                    "<div class='back DBG'>"+
                      "<span>"+qAnswr[i][0]+"</span>"+
                      //"<b class='LBG'>"+(qAnswr[i][1] * CurrentRound)+"</b>"+				//roundpoints: mulitply times 2
					  // "<b class='LBG'>"+qAnswr[i][1]+"</b>"+				//roundpoints: mulitply times 2
                    "</div>"+
                  "</div>"+
                "</div>")
				
      } else {
        aLI = $("<div class='cardHolder empty'><div></div></div>")
      }
      var parentDiv = (i<(qNum/2))? col1: col2;
      $(aLI).appendTo(parentDiv)			//roundpoints: This appends it to the style sheet but I don't understand what happens after that.  
	  
	  
	  
    }  
    
	
	
    var cardHolders = app.board.find('.cardHolder')
    var cards       = app.board.find('.card')
    var backs       = app.board.find('.back')
    var cardSides   = app.board.find('.card>div')

    TweenLite.set(cardHolders , {perspective:800});
    TweenLite.set(cards       , {transformStyle:"preserve-3d"});
    TweenLite.set(backs       , {rotationX:180});
    TweenLite.set(cardSides   , {backfaceVisibility:"hidden"});

    cards.data("flipped", false)
    cards.data("gotPoint", false)
	
    function showCard(){
      var card = $('.card', this)
      var flipped = $(card).data("flipped")	  
      var cardRotate = (flipped)?0:-180;
      TweenLite.to(card, 1, {rotationX:cardRotate, ease:Back.easeOut})
      flipped = !flipped
      $(card).data("flipped", flipped)
	  
	  app.getBoardScore(this.id)
    }
	window.opener.GetQuestion(qText);
	window.opener.GetAnswers(qAnswr, app.currentQ+1, app.questions.length);	//roundpoints
    cardHolders.on('click',showCard)
  },
  getBoardScore: function(card){
	
	//var gotPointsBefore = document.getElementById(card).getAttribute("data-card-got");
	
    var cards = app.board.find('.card')
    var boardScore = app.board.find('#boardScore')
    var currentScore = {var: boardScore.html()}
    var score = 0
    function tallyScore(){
      if($(this).data("flipped")){
		var value = $(this).find("b").html()
		score += (parseInt(value) * CurrentRound);			//roundpoints
	}
    }
    $.each(cards, tallyScore)      
    TweenMax.to(currentScore, 1, {
      var: score, 
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
	
	//document.getElementById(card).setAttribute("data-card-got", "true"); 
	
  },

  awardPoints: function(num){
    var num          = $(this).attr("data-team")
    var boardScore   = app.board.find('#boardScore')
    var currentScore = {var: parseInt(boardScore.html())}
    var team         = app.board.find("#team"+num)
	
    var teamScore    = {var: parseInt(team.html())}
    var teamScoreUpdated = (teamScore.var + currentScore.var)
	
	
    TweenMax.to(teamScore, 1, {
      var: teamScoreUpdated, 
      onUpdate: function () {
        team.html(Math.round(teamScore.var));
		window.opener.document.getElementById("team1POINT").value = document.getElementById("team1").innerHTML;
		window.opener.document.getElementById("team2POINT").value = document.getElementById("team2").innerHTML;
      },
      ease: Power3.easeOut,
    });
    
    TweenMax.to(currentScore, 1, {
      var: 0, 
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
	
	
  },
  changeQuestion: function(currentround){		//roundpoints
	CurrentRound = currentround;
    app.currentQ = (app.currentQ + 1) % 29
    app.makeQuestion(app.currentQ)
	window.opener.GetAnswers(qAnswr, app.currentQ, currentQ);	//roundpoints
  },
  
}
	function teamPointChange(){		
		document.getElementById("team1").innerHTML = window.opener.document.getElementById("team1POINT").value;
		document.getElementById("team2").innerHTML = window.opener.document.getElementById("team2POINT").value;
	}

	function teamNameChange(){
		team1 = window.opener.document.getElementById("team1NAME").value;
		team2 = window.opener.document.getElementById("team2NAME").value;
		
		document.getElementById("awardTeam1").innerHTML = team1;
		document.getElementById("awardTeam2").innerHTML = team2;
	}

	function winner(){
		var winner;
		var team1Score = document.getElementById("team1").innerHTML;
		var team2Score = document.getElementById("team2").innerHTML;
		
		if(team1Score>team2Score){
			winner = "Congratulations " + team1 + "! You won!";
		}
		else if(team1Score<team2Score){
			winner = "Congratulations " + team2 + "! You won!";;
		}
		else{
			winner = "Congratulations! It is a tie!";
		}
		return winner;
	}
//app.init()
window.onload  = function (e) {
		// window.opener.hideFirework();
};
window.onbeforeunload = function (e) {
		// notify control window
		window.opener.gameClosed();
};
