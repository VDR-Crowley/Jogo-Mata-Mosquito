
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var combo = 50

var pontuacao = 0

var criaMosquitoTempo = 1500

// Dificuldade do jogo
var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'facil') {
	tempo = 20
	criaMosquitoTempo = 2000

} else if(nivel === 'normal') {
	tempo = 30
	criaMosquitoTempo = 1500

}	else if(nivel === 'dificil') {
	tempo = 40
	criaMosquitoTempo = 1000

} else if(nivel === 'chucknorris') {
	tempo = 60
	criaMosquitoTempo = 750

}


function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)	
}

ajustaTamanhoPalcoJogo()


// O tempo do jogo
var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo  // inseri um texto dentro da tag
	}

}, 1000)


// Area do gameplay
function posicaoRandomica() {

	//remover o mosquito anterior (caso exista)
	var remove_mosquito = document.getElementById('mosquito')
	
	// verifica se existe (true)
	if(remove_mosquito) {
		
		document.getElementById('mosquito').remove()
		
		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('vida' + vidas).src="imagens/coracao_vazio.png"
			vidas++
		}

	}

	// Para não passar do tamanho da tela
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	// diminui a problabilidade de ser criado posições negativas
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	// Criando elementos html
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() 
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	
	
	mosquito.onclick = function() {
		var tamanhoMosquito = document.getElementsByClassName('ladoA')
		console.log(tamanhoMosquito)
		this.remove()
		document.getElementById('cronometro').innerHTML = tempo + 1
		pontuacao += 10
		localStorage.setItem('pontuacao', pontuacao)
		document.getElementById('pontuacao').innerHTML = pontuacao

	}


	document.body.appendChild(mosquito)

}


// Muda o tamanho do mosquito
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)

	switch (classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'
		
		case 2:
			return 'mosquito3'

		case 3:
			return 'mosquito4'

	}

}


// Muda de lado a imagem do mosquito
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	switch (classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'
	}

}