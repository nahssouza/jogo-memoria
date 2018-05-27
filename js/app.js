/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let abertos = [];
let matchs = 0;
let movimentos = 0;
let estrelas = 3;

// Função que insere os cards já embaralhados pela função shuffle no DOM
function inserirCards(){
	cardsEmbaralhados = shuffle(cards.concat(cards));
	for (let card of cardsEmbaralhados){
		criarCard(card);
	}
}

// Função que cria o HTML dos cards
function criarCard(classeCard){
	$("ul.deck").append(`<li class="card"><i class="fa ${classeCard}"></i></li>`);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Função que inicia o jogo
function iniciarJogo(){
	inserirCards();
	$(".card").click(clickCard);
}

// Função que verifica se o card clicado já está aberto ou possui match
function clickCard(){
	let clicado = $(this);
	if (clicado.hasClass('show') || clicado.hasClass('match')) { 
        return false; 
    } else {
    	if (abertos.length === 0) {
	        clicado.addClass("open");
        	clicado.addClass("show");
        	abertos.push(clicado);
	    } else if (abertos.length === 1) {
	        clicado.addClass("open");
        	clicado.addClass("show");
        	abertos.push(clicado);
        	movimentos++;
        	checarMovimentos();
        	checarMatch();
	    }
    }
}

// Função que checa se os movimentos antigiram os intervalos para remover estrela
function checarMovimentos(){
	$(".moves").text(movimentos);
	if(movimentos === 5){
		$("#terceira").css("display","none");
		estrelas--;
	} else if (movimentos === 25) {
		$("#segunda").css("display","none");
		estrelas--;
	}
}

// Função que checa se os cards são iguais para fazer o match
function checarMatch(){
	if (abertos[0].children().attr("class")===abertos[1].children().attr("class")){
	    console.log("deu match");
	    setTimeout(match, 500)
	} else {
	    console.log("não deu match");
	    setTimeout(resetAbertos, 500);
	}
}

// Variável que armazena função anônima que cria o match
var match = function(){
	abertos.forEach(function(card) {
		card.toggleClass("match");
	});
	abertos = [];
	matchs++;

	if (matchs === 8){
		console.log("Venceu!");
	}
}

// Variável que armazena função anônima que reseta o valor de abertos
var resetAbertos = function(){
	abertos.forEach(function(card) {
		card.toggleClass("open");
		card.toggleClass("show");
	});
	abertos = [];
}

// Executa ao carregar a página
$(document).ready(function(){
    iniciarJogo();
});
