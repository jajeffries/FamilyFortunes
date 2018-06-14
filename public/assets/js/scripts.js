function getQueryStringParameter(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//loop through all the answers and place them hidden into the dom
for(var i = 0; i<answers.length; i++){
	var answerRow = '<div class="answer" id="' + answers[i].value.replace(' ', '').toLowerCase() + '">' +
	                '    <div class="answer__number">' + parseInt(i + 1) + '</div>' +
	                '    <div class="answer__value"><span style="display: none;">' + answers[i].value + '</span></div>' +
	                '    <div class="answer__stat"><span style="display: none;">' + answers[i].stat + '</span></div>' +
	                '</div>';

	$('#answerTable').append(answerRow);
}

var questionNumber = getQueryStringParameter("index");
//create arrays for incorrect and correct guesses that are either blank or collected from local storage
var incorrectGuesses = JSON.parse(localStorage.getItem('incorrectGuesses') || '{}');
var correctGuesses = JSON.parse(localStorage.getItem('correctGuesses') || '{}');
correctGuesses[questionNumber] = [];
incorrectGuesses[questionNumber] = [];

//if there are localstorage values, display the already guessed answers on the scoreboard
if((incorrectGuesses[questionNumber].length > 0) || (correctGuesses[questionNumber].length > 0)) {
	revealGuesses();
}

$('form').submit(function(e){
	e.preventDefault();

	var $input = $('form input#guess');
	var guess = $input.val().toLowerCase();
	var correct = checkAnswer(guess);

	if(guess != ''){
		if(correct){
			correctAudio.play();
			correctGuesses[questionNumber].push(guess);
			localStorage.setItem('correctGuesses', JSON.stringify(correctGuesses));

			$('#' + guess + ' span').show(); //show guess on the scoreboard

			//check to see if top answer
			// if(answers[0].value == guess){
			// 	console.log('top answer');
			// }
			revealGuesses();
		} else {
			wrongAudio.play();
			incorrectGuesses[questionNumber].push(guess);
			localStorage.setItem('incorrectGuesses', JSON.stringify(incorrectGuesses));

			showCross();

			$('ul#guessList').append('<li>' + guess + '</li>'); //add the guess to the incorrect guess list

			//if theres more than 3 guesses, disable the form and show the 'show answers' button
			if(incorrectGuesses[questionNumber].length >= 3){
				$('form input#submit').prop("disabled", true);
				$('#showAnswers').css('display', 'block');
			}
		}
	}

	$input.val(''); //empty the input field after submit clicked
});

function checkAnswer(guess){
	var exists = false;

	//loop through the answers array to see if guess exists
	for(var i = 0; i<answers.length; i++){
		if(answers[i].value.toLowerCase() == guess){
			exists = true;
			break;
		}
	}

	return exists;
}

function showCross(number){
	if(number == null){
		//if theres no number specified show first hidden cross.
		$('#crosses img.hidden').first().removeClass('hidden').addClass('show');
	}else{
		//if there is, show the passed number of crosses
		$('#crosses img.hidden').slice(0,number).removeClass('hidden').addClass('show');
	}
}

function revealGuesses(){
	//loop through incorrect guesses and add it to the guess list
	for(var i = 0; i<incorrectGuesses[questionNumber].length; i++){
		$('ul#guessList').append('<li>' + incorrectGuesses[questionNumber][i] + '</li>');
	}

	//loop through correct guesses and show them in the scoreboard
	for(var c = 0; c<correctGuesses[questionNumber].length; c++){
		$('#' + correctGuesses[questionNumber][c].replace(' ', '').toLowerCase() + ' span').show();
	}

	//show the correct number of crosses
	showCross(incorrectGuesses[questionNumber].length);

	//disable the input and show the 'show answers' button if 3 incorrect guesses
	if(incorrectGuesses[questionNumber].length >= 3){
		$('#showAnswers').show();
		$('form input#submit').prop("disabled", true);
	}
}

//remove localstorage items and refresh the browser
$('#clear').on('click', function(){
	localStorage.removeItem('incorrectGuesses');
	localStorage.removeItem('correctGuesses');

	location.reload();
});

//show all answers
$('#showAnswers').on('click', function(){
	$('.answer span').show();
});


var wrongAudio = document.createElement('audio');
wrongAudio.setAttribute('src', 'assets/audio/wrong.mp3');

var correctAudio = document.createElement('audio');
correctAudio.setAttribute('src', 'assets/audio/correct.wav');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmdQYXJhbWV0ZXIobmFtZSkge1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiWz8mXVwiICsgbmFtZSArIFwiKD0oW14mI10qKXwmfCN8JClcIiksXG4gICAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbi8vbG9vcCB0aHJvdWdoIGFsbCB0aGUgYW5zd2VycyBhbmQgcGxhY2UgdGhlbSBoaWRkZW4gaW50byB0aGUgZG9tXG5mb3IodmFyIGkgPSAwOyBpPGFuc3dlcnMubGVuZ3RoOyBpKyspe1xuXHR2YXIgYW5zd2VyUm93ID0gJzxkaXYgY2xhc3M9XCJhbnN3ZXJcIiBpZD1cIicgKyBhbnN3ZXJzW2ldLnZhbHVlLnJlcGxhY2UoJyAnLCAnJykudG9Mb3dlckNhc2UoKSArICdcIj4nICtcblx0ICAgICAgICAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cImFuc3dlcl9fbnVtYmVyXCI+JyArIHBhcnNlSW50KGkgKyAxKSArICc8L2Rpdj4nICtcblx0ICAgICAgICAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cImFuc3dlcl9fdmFsdWVcIj48c3BhbiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JyArIGFuc3dlcnNbaV0udmFsdWUgKyAnPC9zcGFuPjwvZGl2PicgK1xuXHQgICAgICAgICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwiYW5zd2VyX19zdGF0XCI+PHNwYW4gc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicgKyBhbnN3ZXJzW2ldLnN0YXQgKyAnPC9zcGFuPjwvZGl2PicgK1xuXHQgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cblx0JCgnI2Fuc3dlclRhYmxlJykuYXBwZW5kKGFuc3dlclJvdyk7XG59XG5cbnZhciBxdWVzdGlvbk51bWJlciA9IGdldFF1ZXJ5U3RyaW5nUGFyYW1ldGVyKFwiaW5kZXhcIik7XG4vL2NyZWF0ZSBhcnJheXMgZm9yIGluY29ycmVjdCBhbmQgY29ycmVjdCBndWVzc2VzIHRoYXQgYXJlIGVpdGhlciBibGFuayBvciBjb2xsZWN0ZWQgZnJvbSBsb2NhbCBzdG9yYWdlXG52YXIgaW5jb3JyZWN0R3Vlc3NlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luY29ycmVjdEd1ZXNzZXMnKSB8fCAne30nKTtcbnZhciBjb3JyZWN0R3Vlc3NlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvcnJlY3RHdWVzc2VzJykgfHwgJ3t9Jyk7XG5jb3JyZWN0R3Vlc3Nlc1txdWVzdGlvbk51bWJlcl0gPSBbXTtcbmluY29ycmVjdEd1ZXNzZXNbcXVlc3Rpb25OdW1iZXJdID0gW107XG5cbi8vaWYgdGhlcmUgYXJlIGxvY2Fsc3RvcmFnZSB2YWx1ZXMsIGRpc3BsYXkgdGhlIGFscmVhZHkgZ3Vlc3NlZCBhbnN3ZXJzIG9uIHRoZSBzY29yZWJvYXJkXG5pZigoaW5jb3JyZWN0R3Vlc3Nlc1txdWVzdGlvbk51bWJlcl0ubGVuZ3RoID4gMCkgfHwgKGNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXS5sZW5ndGggPiAwKSkge1xuXHRyZXZlYWxHdWVzc2VzKCk7XG59XG5cbiQoJ2Zvcm0nKS5zdWJtaXQoZnVuY3Rpb24oZSl7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgJGlucHV0ID0gJCgnZm9ybSBpbnB1dCNndWVzcycpO1xuXHR2YXIgZ3Vlc3MgPSAkaW5wdXQudmFsKCkudG9Mb3dlckNhc2UoKTtcblx0dmFyIGNvcnJlY3QgPSBjaGVja0Fuc3dlcihndWVzcyk7XG5cblx0aWYoZ3Vlc3MgIT0gJycpe1xuXHRcdGlmKGNvcnJlY3Qpe1xuXHRcdFx0Y29ycmVjdEF1ZGlvLnBsYXkoKTtcblx0XHRcdGNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXS5wdXNoKGd1ZXNzKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb3JyZWN0R3Vlc3NlcycsIEpTT04uc3RyaW5naWZ5KGNvcnJlY3RHdWVzc2VzKSk7XG5cblx0XHRcdCQoJyMnICsgZ3Vlc3MgKyAnIHNwYW4nKS5zaG93KCk7IC8vc2hvdyBndWVzcyBvbiB0aGUgc2NvcmVib2FyZFxuXG5cdFx0XHQvL2NoZWNrIHRvIHNlZSBpZiB0b3AgYW5zd2VyXG5cdFx0XHQvLyBpZihhbnN3ZXJzWzBdLnZhbHVlID09IGd1ZXNzKXtcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ3RvcCBhbnN3ZXInKTtcblx0XHRcdC8vIH1cblx0XHRcdHJldmVhbEd1ZXNzZXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d3JvbmdBdWRpby5wbGF5KCk7XG5cdFx0XHRpbmNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXS5wdXNoKGd1ZXNzKTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbmNvcnJlY3RHdWVzc2VzJywgSlNPTi5zdHJpbmdpZnkoaW5jb3JyZWN0R3Vlc3NlcykpO1xuXG5cdFx0XHRzaG93Q3Jvc3MoKTtcblxuXHRcdFx0JCgndWwjZ3Vlc3NMaXN0JykuYXBwZW5kKCc8bGk+JyArIGd1ZXNzICsgJzwvbGk+Jyk7IC8vYWRkIHRoZSBndWVzcyB0byB0aGUgaW5jb3JyZWN0IGd1ZXNzIGxpc3RcblxuXHRcdFx0Ly9pZiB0aGVyZXMgbW9yZSB0aGFuIDMgZ3Vlc3NlcywgZGlzYWJsZSB0aGUgZm9ybSBhbmQgc2hvdyB0aGUgJ3Nob3cgYW5zd2VycycgYnV0dG9uXG5cdFx0XHRpZihpbmNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXS5sZW5ndGggPj0gMyl7XG5cdFx0XHRcdCQoJ2Zvcm0gaW5wdXQjc3VibWl0JykucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuXHRcdFx0XHQkKCcjc2hvd0Fuc3dlcnMnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQkaW5wdXQudmFsKCcnKTsgLy9lbXB0eSB0aGUgaW5wdXQgZmllbGQgYWZ0ZXIgc3VibWl0IGNsaWNrZWRcbn0pO1xuXG5mdW5jdGlvbiBjaGVja0Fuc3dlcihndWVzcyl7XG5cdHZhciBleGlzdHMgPSBmYWxzZTtcblxuXHQvL2xvb3AgdGhyb3VnaCB0aGUgYW5zd2VycyBhcnJheSB0byBzZWUgaWYgZ3Vlc3MgZXhpc3RzXG5cdGZvcih2YXIgaSA9IDA7IGk8YW5zd2Vycy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYoYW5zd2Vyc1tpXS52YWx1ZS50b0xvd2VyQ2FzZSgpID09IGd1ZXNzKXtcblx0XHRcdGV4aXN0cyA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZXhpc3RzO1xufVxuXG5mdW5jdGlvbiBzaG93Q3Jvc3MobnVtYmVyKXtcblx0aWYobnVtYmVyID09IG51bGwpe1xuXHRcdC8vaWYgdGhlcmVzIG5vIG51bWJlciBzcGVjaWZpZWQgc2hvdyBmaXJzdCBoaWRkZW4gY3Jvc3MuXG5cdFx0JCgnI2Nyb3NzZXMgaW1nLmhpZGRlbicpLmZpcnN0KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmFkZENsYXNzKCdzaG93Jyk7XG5cdH1lbHNle1xuXHRcdC8vaWYgdGhlcmUgaXMsIHNob3cgdGhlIHBhc3NlZCBudW1iZXIgb2YgY3Jvc3Nlc1xuXHRcdCQoJyNjcm9zc2VzIGltZy5oaWRkZW4nKS5zbGljZSgwLG51bWJlcikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmFkZENsYXNzKCdzaG93Jyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmV2ZWFsR3Vlc3Nlcygpe1xuXHQvL2xvb3AgdGhyb3VnaCBpbmNvcnJlY3QgZ3Vlc3NlcyBhbmQgYWRkIGl0IHRvIHRoZSBndWVzcyBsaXN0XG5cdGZvcih2YXIgaSA9IDA7IGk8aW5jb3JyZWN0R3Vlc3Nlc1txdWVzdGlvbk51bWJlcl0ubGVuZ3RoOyBpKyspe1xuXHRcdCQoJ3VsI2d1ZXNzTGlzdCcpLmFwcGVuZCgnPGxpPicgKyBpbmNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXVtpXSArICc8L2xpPicpO1xuXHR9XG5cblx0Ly9sb29wIHRocm91Z2ggY29ycmVjdCBndWVzc2VzIGFuZCBzaG93IHRoZW0gaW4gdGhlIHNjb3JlYm9hcmRcblx0Zm9yKHZhciBjID0gMDsgYzxjb3JyZWN0R3Vlc3Nlc1txdWVzdGlvbk51bWJlcl0ubGVuZ3RoOyBjKyspe1xuXHRcdCQoJyMnICsgY29ycmVjdEd1ZXNzZXNbcXVlc3Rpb25OdW1iZXJdW2NdLnJlcGxhY2UoJyAnLCAnJykudG9Mb3dlckNhc2UoKSArICcgc3BhbicpLnNob3coKTtcblx0fVxuXG5cdC8vc2hvdyB0aGUgY29ycmVjdCBudW1iZXIgb2YgY3Jvc3Nlc1xuXHRzaG93Q3Jvc3MoaW5jb3JyZWN0R3Vlc3Nlc1txdWVzdGlvbk51bWJlcl0ubGVuZ3RoKTtcblxuXHQvL2Rpc2FibGUgdGhlIGlucHV0IGFuZCBzaG93IHRoZSAnc2hvdyBhbnN3ZXJzJyBidXR0b24gaWYgMyBpbmNvcnJlY3QgZ3Vlc3Nlc1xuXHRpZihpbmNvcnJlY3RHdWVzc2VzW3F1ZXN0aW9uTnVtYmVyXS5sZW5ndGggPj0gMyl7XG5cdFx0JCgnI3Nob3dBbnN3ZXJzJykuc2hvdygpO1xuXHRcdCQoJ2Zvcm0gaW5wdXQjc3VibWl0JykucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuXHR9XG59XG5cbi8vcmVtb3ZlIGxvY2Fsc3RvcmFnZSBpdGVtcyBhbmQgcmVmcmVzaCB0aGUgYnJvd3NlclxuJCgnI2NsZWFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2luY29ycmVjdEd1ZXNzZXMnKTtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NvcnJlY3RHdWVzc2VzJyk7XG5cblx0bG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuLy9zaG93IGFsbCBhbnN3ZXJzXG4kKCcjc2hvd0Fuc3dlcnMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHQkKCcuYW5zd2VyIHNwYW4nKS5zaG93KCk7XG59KTtcblxuXG52YXIgd3JvbmdBdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG53cm9uZ0F1ZGlvLnNldEF0dHJpYnV0ZSgnc3JjJywgJ2Fzc2V0cy9hdWRpby93cm9uZy5tcDMnKTtcblxudmFyIGNvcnJlY3RBdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG5jb3JyZWN0QXVkaW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnYXNzZXRzL2F1ZGlvL2NvcnJlY3Qud2F2Jyk7Il19
