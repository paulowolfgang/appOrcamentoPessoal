
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

			despesas.push(despesa)
		}

		return despesas
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

function carregaListaDespesas() {

	let despesas = Array()

	despesas = bd.recuperarTodosRegistros()

	let listaDespesas = document.getElementById('listaDespesas')

	/*
		<tr>
            <td>09/12/2020</td>
            <td>Lazer</td>
            <td>Teste</td>
            <td>156,90</td>
        </tr>
	*/

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
	})
}
