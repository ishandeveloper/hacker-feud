var game = null;
var whichTeamTurn = null;
var maxMiss = 3;
var missPointTeam1 = 0;
var missPointTeam2 = 0;
var CurrentRound = 1;

	function start_game(){	
		console.log('Starting...');
		// play_sound('ff_open.mp3');
		document.getElementById("start").disabled = true;
		hideFirework();	
		CurrentRound = 1;		//start round	//roundpoints

		game.document.getElementById("counter").style.display = 'block';
		game.document.getElementById("shortly").style.display = 'none';

		play_sound('ff_dogru.mp3');

		setTimeout(() => {
			game.document.querySelector('#firework').style.display = 'none';
			game.document.querySelector('.idc').style.display = 'none';
			game.app.init();
		}, 5000);
		
	}
	
	function finish_game(){
		game.document.getElementById("idcLogo").style.width = '50%';
		game.document.getElementById("welcomePageInfo").innerHTML = "Thank you!";
		game.document.getElementById("welcomePageInfo").style.display = "";
		CurrentRound = 1;
	}
	
	function open_game_window() {
		game = window.open('game.html', 'game', 'resizable=yes');
		document.getElementById("start").disabled = false;
		document.getElementById("open").disabled = true;
		document.getElementById("restart").disabled = false;
	}
	
	function close_game_window() {
		game.close();
	}
	
	function restart_game() {
		gameCompleted();
		gameClosed();
		open_game_window();
	}
		
	function game_window_init_done() {
		// document.getElementById("question").className = "label label-success";
		document.getElementById("start").disabled = true;
		// document.getElementById("buttonAwardT1").disabled = false;
		// document.getElementById("buttonAwardT2").disabled = false;
		// document.getElementById("buttonAwardT3").disabled = false;
		
	}
	
	function game_window_closed() {
		game = null;
	}
	
	// play sound object
	var audio = new Audio('');
	function play_sound(sound) {
		var audio = new Audio('sfx/'+sound);
		audio.play();
		if (sound == "ff-strike.wav") {
			showImage();
		}
	}
	function showImage() {
		var img = game.document.getElementById('incorrect');
		img.style.visibility = 'visible';
		setTimeout(function() {img.style.visibility = 'hidden';}, 2000);  
		//img.style.visibility = 'hidden';
	}
	
	function pause_sound() {
		var audio = new Audio('');
		audio.play();
	}
	
	function printMissPoint(){
		for (i = 0; i < missPointTeam1; i++) { 
			game.document.getElementById("missTeam1_"+ (i+1)).style.visibility = "visible";
		}
		for (i = 0; i < missPointTeam2; i++) { 
			game.document.getElementById("missTeam2_"+ (i+1)).style.visibility = "visible";
		}
	}
	
	function deleteMissPoint(){
		missPointTeam1 = 0;
		missPointTeam2 = 0;
		document.getElementById("misspoint1").innerHTML = missPointTeam1;
		document.getElementById("misspoint2").innerHTML = missPointTeam2;
		game.document.getElementById("missTeam1_1").style.visibility = "hidden";
		game.document.getElementById("missTeam1_2").style.visibility = "hidden";
		game.document.getElementById("missTeam1_3").style.visibility = "hidden";
		game.document.getElementById("missTeam2_1").style.visibility = "hidden";
		game.document.getElementById("missTeam2_2").style.visibility = "hidden";
		game.document.getElementById("missTeam2_3").style.visibility = "hidden";
		
	}
	
	function showMissPoint(team){
		if (team == "1"){
			if (missPointTeam1 < maxMiss) missPointTeam1++;
			document.getElementById("misspoint1").innerHTML = missPointTeam1;
		}
		else if (team == "2") {
			if (missPointTeam2 < maxMiss) missPointTeam2++;
			document.getElementById("misspoint2").innerHTML = missPointTeam2;
		}	
		printMissPoint();
		play_sound('ff-strike.wav');
	}
	
	function nextQuestion(){
		// turnOfTeam('undecided');
		// var table = document.getElementById("tableAnswers");
		// for(var i = table.rows.length - 1; i > 0; i--)
		// {
		// 	table.deleteRow(i);
		// }
		// deleteMissPoint();
		game.app.changeQuestion(CurrentRound);	//roundpoints
	}

	function prevQuestion() {
		game.app.changeQuestion(CurrentRound-1);
	}
	
	function calculatePoints(team){
		if (team == "1"){
			game.document.getElementById("awardTeam1").click();
		}
		else if (team == "2"){
			game.document.getElementById("awardTeam2").click();
		}
		++CurrentRound;	//roundpoints  //go to next round	
	play_sound('ff_dogru.mp3');
	}
	
	function GetQuestion(questionParam){
		document.getElementById("question").innerHTML = questionParam.slice(3,);
	}
	
	//roundpoints
	function GetAnswers(answers, currentQnumber, totalQnumber){
		
		console.log(answers, currentQnumber, totalQnumber);

		var table = document.getElementById("answer-body");
		table.innerHTML="";
		row1 = document.createElement('tr');
		row2 = document.createElement('tr');
		row3 = document.createElement('tr');
		ans1 = document.createElement('td');
		ans2 = document.createElement('td');
		ans3 = document.createElement('td');
		ans4 = document.createElement('td');
		ans5 = document.createElement('td');
		ans6 = document.createElement('td');
		row1.classList.add('answer-row');
		row2.classList.add('answer-row');
		row3.classList.add('answer-row');
		ans1.classList.add('answer-cell');
		ans2.classList.add('answer-cell');
		ans3.classList.add('answer-cell');
		ans4.classList.add('answer-cell');
		ans5.classList.add('answer-cell');
		ans6.classList.add('answer-cell');
		ans1.append(answers[0][0]);
		ans2.append(answers[1][0]);
		ans3.append(answers[2][0]);
		ans4.append(answers[3][0]);
		ans5.append(answers[4][0]);
		ans6.append(answers[5][0]);
		row1.appendChild(ans1);
		row1.appendChild(ans4);
		row2.appendChild(ans2);
		row2.appendChild(ans5);
		row3.appendChild(ans3);
		row3.appendChild(ans6);
		table.appendChild(row1);
		table.appendChild(row2);
		table.appendChild(row3);
		// for (i = 0; i < answers.length; i+=2) { 
		// }
		// var row = table.insertRow(i+1);
		// var cell1 = row.insertCell(0)
		// var cell2 = row.insertCell(1)
		
		// var tempID = "answer_" + i;
		
		// row.setAttribute("id", tempID, 0);
		// row.onclick = function() { 
		// 	game.document.getElementById(this.id).click();
		// 	var tempBgColor = this.style.backgroundColor;
		// 	if(tempBgColor == ""){
		// 		this.setAttribute("style", "background-color: lightgreen;");
		// 		play_sound('ff-clang.wav');
		// 	}
		// 	else if(tempBgColor == "lightgreen"){
		// 		this.setAttribute("style", "background-color: ;");
		// 	}
		// }  
		// cell1.innerHTML = i;
		// cell2.innerHTML = answers[i][0];
		
		// document.getElementById("tableAnswers").style.display = "";
		// document.getElementById("answerInfo").style.display = "none";
		
		// document.getElementById("totalQ").innerHTML = totalQnumber;
		// document.getElementById("currentQ").innerHTML = currentQnumber;

		// REFERENCE
	// 	<table id="answer-table">
	// 	<tbody class="answer-body">
	// 		<tr class="answer-row">
	// 			<td class="answer-cell">Answer 1</td>
	// 			<td class="answer-cell">Answer 2</td>
	// 		</tr>
	// 		<tr class="answer-row">
	// 			<td class="answer-cell">Answer 3</td>
	// 			<td class="answer-cell">Answer 4</td>
	// 		</tr>
	// 		<tr class="answer-row">
	// 			<td class="answer-cell">Answer 5</td>
	// 			<td class="answer-cell">Answer 6</td>
	// 		</tr>
	// 	</tbody>
	// </table>
		
		
	}
	
	function turnOfTeam(team){
		whichTeamTurn = team;
		if (team == "team1"){
			game.document.getElementById("team1").style.border = "15px solid cornsilk";
			game.document.getElementById("awardTeam1").style.border = "15px solid cornsilk";
			game.document.getElementById("team2").style.border = "";
			game.document.getElementById("awardTeam2").style.border = "";

			document.getElementById("buttonMistakeT1").disabled = false;

			document.getElementById("buttonMistakeT2").disabled = true;
		}
		else if (team == "team2"){
			game.document.getElementById("team2").style.border = "15px solid cornsilk";
			game.document.getElementById("awardTeam2").style.border = "15px solid cornsilk";
			game.document.getElementById("team1").style.border = "";
			game.document.getElementById("awardTeam1").style.border = "";

			document.getElementById("buttonMistakeT2").disabled = false;
			
			document.getElementById("buttonMistakeT1").disabled = true;
		}
		else if (team == "undecided") {
			game.document.getElementById("team2").style.border = "";
			game.document.getElementById("awardTeam2").style.border = "";
			game.document.getElementById("team1").style.border = "";
			game.document.getElementById("awardTeam1").style.border = "";

			document.getElementById("buttonMistakeT2").disabled = true;
			document.getElementById("buttonMistakeT1").disabled = true;
		}
	}
	
	function gameClosed(){
		game = null;
		document.getElementById("question").innerHTML = "Let's start a new game!";			
		document.getElementById("buttonClose").disabled = true;
		document.getElementById("buttonMistakeT1").disabled = true;
		document.getElementById("buttonMistakeT2").disabled = true;
		document.getElementById("buttonAwardT1").disabled = true;
		document.getElementById("buttonAwardT2").disabled = true;
		document.getElementById("buttonAwardT3").disabled = true;
		document.getElementById("start").disabled = true;
		document.getElementById("open").disabled = false;
		document.getElementById("tableAnswers").style.display = "none";
		document.getElementById("answerInfo").style.display = "";

		var table = document.getElementById("tableAnswers");
		for(var i = table.rows.length - 1; i > 0; i--)
		{
			table.deleteRow(i);
		}
	}
	
	function gameCompleted(){
		var x = game.document.getElementById('firework');
		document.getElementById("buttonWinner").disabled = false;
		if (x.style.visibility === 'hidden') {
			x.style.visibility = 'visible';
			game.document.getElementById("gameBoardId").style.display = "none";
			game.document.getElementById("idcLogo").style.width = '50%';
		} else {
			x.style.visibility = 'hidden';
		}
		
		var table = document.getElementById("tableAnswers");
		for(var i = table.rows.length - 1; i > 0; i--){
			table.deleteRow(i);
		}
		announceWinner();
	}
	
	function hideFirework(){
		game.document.getElementById('firework').style.visibility = 'hidden';
	}
	
	function announceWinner(){
		game.document.getElementById("winnerId").innerHTML = game.winner();
		game.document.getElementById('winnerId').style.display = "block";
	}
	
	function changeTeamNames(){
		game.teamNameChange();
	}
	
	function changeTeamPoint(){
		game.teamPointChange();
		document.getElementById("team1POINT").innerHTML = game.document.getElementById("team1").value;
		document.getElementById("team2POINT").innerHTML = game.document.getElementById("team2").value;
	}
	
	function changeTurn(){
		if(whichTeamTurn == "team1"){
			turnOfTeam("team2");
		}
		else if (whichTeamTurn == "team2"){
			turnOfTeam("team1");
		}
	}