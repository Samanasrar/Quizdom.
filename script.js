let popup=document.getElementById("popup");
let main=document.querySelector(".main");
let continueBtn=document.querySelector(".continue-btn");
let quizSection=document.querySelector(".quiz-section");
let quizBox=document.querySelector(".quiz-box");
let resultBox=document.querySelector(".result-box");
let tryAgainBtn=document.querySelector(".tryAgain-btn");
let goHomeBtn=document.querySelector(".goHome-btn");
function openPopup(){
	popup.classList.add("open-popup");
	main.classList.add("active");
}
function closePopup(){
	popup.classList.remove("open-popup");
	main.classList.remove("active");
}
function quiz(){
	quizSection.classList.add("open-quiz");
	popup.classList.remove("open-popup");
	main.classList.remove("active");
	quizBox.classList.add("active");
	showQuestions(0);
	questionCounter(1);
	headerScore();
}

//At the end of quiz choose try again or go to home

tryAgainBtn.onclick = ()=>{
	quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

}
goHomeBtn.onclick = ()=>{
	quizSection.classList.remove('open-quiz');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

}
//getting questions and options from arrays
let questionCount=0;
let questionNumb=1;
let userScore=0;
const nextBtn=document.querySelector(".next-btn");
function nextQues(){
	if (questionCount < questions.length-1) {
		questionCount++;
	    showQuestions(questionCount);
	    questionNumb++;
	    questionCounter(questionNumb);
	    nextBtn.classList.remove('active');
	}
	else{
		showResultBox();
	}
}
const optionList=document.querySelector('.option-list');
function showQuestions(index){
	const questionText=document.querySelector('.question-text');
	questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
                   <div class="option"><span>${questions[index].options[1]}</span></div>
                   <div class="option"><span>${questions[index].options[2]}</span></div>
                   <div class="option"><span>${questions[index].options[3]}</span></div>`;

        optionList.innerHTML=optionTag; 
        const option=document.querySelectorAll('.option');
        for (let i =0; i<option.length; i++) {
        	option[i].setAttribute('onclick','optionSelected(this)');
        }
}
function optionSelected(answer){
	let userAnswer=answer.textContent;
	let correctAnswer=questions[questionCount].answer;
	let allOptions=optionList.children.length;
	if (userAnswer==correctAnswer) {
		answer.classList.add('correct');
		userScore += 1;
		headerScore();
	}
	else{
		answer.classList.add('incorrect');
		//if answer is incorrect, auto select the correct answer
		for (let i=0; i < allOptions; i++) {
			if (optionList.children[i].textContent==correctAnswer) {
				optionList.children[i].setAttribute('class','option-list option correct');
			}	
	}
		
	}
	//if user has selected disable all options
	for (let i=0; i < allOptions; i++) {
		optionList.children[i].classList.add('disabled');
	}

	nextBtn.classList.add('active');
}
function questionCounter(index){
	const questionTotal=document.querySelector('.question-total');
	questionTotal.textContent=`${index} of ${questions.length} Questions`;
}
function headerScore(){
	const headerScoreText=document.querySelector('.header-score');
	headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}
function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;
    const circularProgress=document.querySelector('.circular-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;
    let progress=setInterval(() =>{
    	progressStartValue++;
    	progressValue.textContent=`${progressStartValue}%`;
    	circularProgress.style.background=`conic-gradient(#FFC000 ${progressStartValue*3.6}deg, #78716C 0deg)`;
    	if(progressStartValue==progressEndValue){
    		clearInterval(progress);
    	}
    },speed);
}



