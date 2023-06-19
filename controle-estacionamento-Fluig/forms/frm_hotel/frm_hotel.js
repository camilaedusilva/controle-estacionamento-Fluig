function validaCep(){
	var dadosCep;
	var valor = $("#cep").val();
	var cep = valor.replace(/\D/g, '');
	var validacep = true;
	
	if(cep.length != 8){
		validacep = false;
	
		FLUIGC.toast({
		title: 'Erro!',
		message: 'CEP inválido!',
		type: 'danger'});
		
	}else{
		var findcep = {
		  "url": "https://viacep.com.br/ws/"+cep+"/json/",
		  "method": "GET",
		  "timeout": 0,
		  "headers": {
			"Referer": "example.com"
		  },
		};


		$.ajax(findcep).done(function (response) {
			validacep = (response.erro == true ) ? false : true;
			console.log(response);
			console.log(validacep);
			
			if (validacep == true){
				dadosCep = response;
				
				$("#endereco").val(dadosCep.logradouro);
				$("#bairro").val(dadosCep.bairro);
				$("#cidade").val(dadosCep.localidade);
				$("#estado").val(dadosCep.uf);
			}else{
				$("#endereco").val("");
				$("#bairro").val("");
				$("#cidade").val("");
				$("#estado").val("");
				
				FLUIGC.toast({
					title: 'Erro!',
					message: 'CEP não encontrado!',
					type: 'danger'
				});
			}
		});
	}

}