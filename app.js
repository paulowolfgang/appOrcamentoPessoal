
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
		//dialog success
		$('#sucessoGravacao').modal('show')	
	} else {
		//dialog error
		$('#erroGravacao').modal('show')
	}

}
