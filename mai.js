const questions = [
	{
		question: "Какое животное вам больше всего нравится?",
		answers: ["Акула", "Ястреб", "Дракон", "Бык"],
	},
	{
		question: "Какой ингредиент из перечисленных вам больше всего нравится?",
		answers: ["Персик","Мята","Перец","Морковь"],
	},
	{
		question: "Кто вы по знаку Зодиака?",
		answers: ["Рак","Весы","Овен","Козерог","Скорпион","Водолей","Лев","Телец","Рыбы","Близнецы","Стрелец","Дева",],
	},
	{
		question: "Какая роль в жизни вам больше всего нравится?",
		answers: ["Предприниматель","Доктор","Ученый","Фермер"],
	},
	{
		question: "Чем вы любите заниматься больше всего в свободное время?",
		answers: ["Путешествовать", "Медитация","Спорт", "Чтение",],
	}
];
water = 0;
fire = 0;
earth = 0;
air = 0;
qindex = 0;
let element;
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion(){
	const headerTemplate = `<h2 class="title">${questions[qindex]['question']}</h2>`
	headerContainer.innerHTML = headerTemplate

	for ([index,answertext] of questions[qindex]['answers'].entries()){
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`
		answerHTML = questionTemplate.replace('%answer%', answertext).replace('%number%',index+1)
		listContainer.innerHTML += answerHTML
}
}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
	if (!checkedRadio){
		submitBtn.blur()
		return
	}
	const userAnswer = parseInt(checkedRadio.value)
	console.log(userAnswer)
	if (userAnswer === 1 || userAnswer === 5 || userAnswer === 9) {water++}
	if (userAnswer === 2 || userAnswer === 6 || userAnswer === 10) {air++}
	if (userAnswer === 3 || userAnswer === 7 || userAnswer === 11) {fire++}
	if (userAnswer === 4 || userAnswer === 8 || userAnswer === 12) {earth++}

	if (qindex !== questions.length - 1){
			qindex++
			clearPage()
			showQuestion()
		}
	else {
		clearPage()
		showResults()
		}
}
function showResults(){
	const resultsTemplate = 
	`<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`
	let title, message;
	if (qindex === questions.length-1){
		title = 'Поздравляем!'
		message = 'Вы ответили на все вопросы!'
	}
	if (Math.max(water,fire,air,earth)===water){element="Вода"}
	if (Math.max(water,fire,air,earth)===fire){element="Огонь"}
	if (Math.max(water,fire,air,earth)===air){element="Воздух"}
	if (Math.max(water,fire,air,earth)===earth){element="Земля"}
	let result = `Ваша стихия ${element}!`
	const finalMessage = resultsTemplate.replace('%title%',title).replace('%message%',message).replace('%result%',result)
	headerContainer.innerHTML = finalMessage
	submitBtn.blur()
	submitBtn.innerHTML = 'Начать заново'
	submitBtn.onclick = () => history.go()
}