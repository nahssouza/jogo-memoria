/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let abertos = [];
let matchs = 0;
let movimentos = 0;
let numestrelas = 3;
let segundos = 0;
let timer;

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
	iniciarTimer();
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
	if(movimentos === 15){
		$("#terceira").css("display","none");
		numestrelas--;
		$("#estrelas").text("estrelas");
	} else if (movimentos === 25) {
		$("#segunda").css("display","none");
		numestrelas--;
		$("#estrelas").text("estrela");
	}
}

// Função que checa se os cards são iguais para fazer o match
function checarMatch(){
	if (abertos[0].children().attr("class")===abertos[1].children().attr("class")){
	    setTimeout(match, 500)
	} else {
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
		$(".estrelas").text(numestrelas);
		$("#popup").css("display","block");
		clearInterval(timer);
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

// Função que restaura as estrelas a posição inicial
function restaurarEstrelas(){
	$("#terceira").css("display","block");
	$("#segunda").css("display","block");	
	numestrelas = 3;
}

// Função que reinicia o jogo
function reiniciarJogo(){
	clearInterval(timer);
	segundos = 0;
	$(".timer").text(segundos);
	movimentos = 0;
	$(".moves").text(movimentos);
	abertos = [];
	matchs = [];	
	restaurarEstrelas();
	$(".deck").html(" ");
	iniciarJogo();
}

// Função ativada ao clicar no botão Sim
function jogarNovamente(){
	$("#popup").css("display","none");
	reiniciarJogo();
}

// Função que fecha o popup
function naoJogar(){
	$("#popup").css("display","none");
}

// Função que inicia o timer
function iniciarTimer(){
	timer = setInterval(function(){
		segundos++;
		$(".timer").text(segundos);
	}, 1000);
}

// Executa ao carregar a página
$(document).ready(function(){
    iniciarJogo();
    $(".restart").click(reiniciarJogo);
    $(".jogar_novamente").click(jogarNovamente);
    $(".nao_jogar").click(naoJogar);
});
