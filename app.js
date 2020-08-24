
class Despesa {

	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {

		for(let i in this){
			//console.log(i, this[i])
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}

class Bd {	

	constructor() {
		let id = localStorage.getItem('id')
		
		if(id === null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) +1
	}

	gravar(d){
		
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){

		//console.log('Ok!')
		
		let despesas = Array()

		let id = localStorage.getItem('id')
		
		//Recupera todos os registros do localstorage
		for(let i = 1; i<= id; i++){

			let despesa = JSON.parse(localStorage.getItem(i))

			//verifica índices removidos
			if(despesa === null){
				continue
			}

			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa) {

		//console.log(despesa)

		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarTodosRegistros()
		
		console.log(despesa)
		console.log(despesasFiltradas)

		//ano
		if(despesa.ano != ''){
			console.log('Filtro de ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		//mes
		if(despesa.mes != ''){
			console.log('Filtro de mês')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}		

		//dia
		if(despesa.dia != ''){
			console.log('Filtro de dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}		

		//tipo
		if(despesa.tipo != ''){
			console.log('Filtro de tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}		

		//descrição
		if(despesa.descricao != ''){
			console.log('Filtro de descrição')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}		

		//valor
		if(despesa.valor != ''){
			console.log('Filtro de valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id){

		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if(despesa.validarDados()){
		bd.gravar(despesa)

		document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modalTituloDiv').className = 'modal-header text-success'
		document.getElementById('modalConteudo').innerHTML = 'Despesa cadastrada com sucesso!'
		document.getElementById('modalBtn').innerHTML = 'Voltar'
		document.getElementById('modalBtn').className = 'btn btn-success'

		//dialog success
		$('#modalRegistraDespesa').modal('show')

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {

		document.getElementById('modalTitulo').innerHTML = 'Erro na gravação dos dados!'
		document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
		document.getElementById('modalConteudo').innerHTML = 'Preencha todos os campos!'
		document.getElementById('modalBtn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modalBtn').className = 'btn btn-danger'

		//dialog error
		$('#modalRegistraDespesa').modal('show')
	}

}

function carregaListaDespesas(despesas = Array(), filtro = false) {

	if(despesas.length == 0 && filtro == false){
		
		despesas = bd.recuperarTodosRegistros()		
	}

	let listaDespesas = document.getElementById('listaDespesas')
	
	listaDespesas.innerHTML = ''
	
	despesas.forEach(function(d) {

		console.log(d)

		//linha dos elementos
		let linha = listaDespesas.insertRow()
		
		//coluna dos elementos
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

		//ajuste de tipo
		switch(d.tipo){

			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}

		//tipo sobreposto com a estrutura CASE
		linha.insertCell(1).innerHTML = d.tipo

		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//botão para excluir registro
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`

		btn.onclick = function() {
			//remove o registro do local storage
			//alert('Teste do botão')
			//alert(this.id)

			let id = this.id.replace('id_despesa_', '')

			bd.remover(id)

			//recarregar a página
			window.location.reload()

		}
		linha.insertCell(4).append(btn)

		console.log(d)
	})
}

function pesquisarDespesa() {

	//console.log('Teste do botão de pesquisa...')

	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	//console.log(despesa)

	//////////////////////////////////////////////////////////

	carregaListaDespesas(despesas, true)
}
