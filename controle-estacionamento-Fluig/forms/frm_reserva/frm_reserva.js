$(function () {
	init();
});

	
	
function init() {
	verificaVeiculo();
	formataCalendario();

}

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

function formataCalendario(){
	var calendarCheckin = FLUIGC.calendar('#div_dtCheckin');
	var calendarCheckout = FLUIGC.calendar('#div_dtCheckout');

	calendarCheckin.setMinDate(calendarCheckin.getDate());
	calendarCheckout.setMinDate(calendarCheckout.getDate());
}

function contaDiasEstadia(){
	
	var DateDiff = {

	   inDays: function(d1, d2) {
		   var t2 = d2.getTime();
		   var t1 = d1.getTime();

		   return parseInt((t1-t2)/(24*3600*1000));
	   },
   }

   /* Define a data com os valores separados */
   let dataStrCheckin = $("#dtCheckin").val().split("/");
   let dataCkeckin = new Date(dataStrCheckin[2], dataStrCheckin[1]-1, dataStrCheckin[0]);

   let dataStrCheckout = $("#dtCheckout").val().split("/");
   let dataCkeckout = new Date(dataStrCheckout[2], dataStrCheckout[1]-1, dataStrCheckout[0]);


   var d1 =  dataCkeckout;
   var d2 = dataCkeckin;
   
   $("#qtdDiasH").val(DateDiff.inDays(d1, d2)+1);
}


function verificaVeiculo(){
	var tipoveiculo = $("#tpVeiculo").val();

	if(tipoveiculo == "NENHUM" || tipoveiculo == ""){
		$("#divPlacaVeiculo").hide();
	}else{
		$("#divPlacaVeiculo").show();
	}
}


function validaCPF(strCPF) {	
	var validaCPF = true;
	var Soma;
    var Resto;
    Soma = 0;   
    strCPF = strCPF.replaceAll(".", "");
	strCPF = strCPF.replaceAll("-", ""); 
	strCPF = strCPF.replaceAll("/", ""); 
	   
    
   //console.log("CPF: ", strCPF);
    if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" ||
    	strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" ||
    	strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999"){
    	validaCPF  = false;
    }
	
    for (i=1; i<=9; i++)
	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )
	validaCPF = false;
	Soma = 0;
    for (i = 1; i <= 10; i++)
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        validaCPF = false;
		
	
	if(validaCPF == false){
		FLUIGC.toast({
					title: 'Erro!',
					message: 'CPF inválido!',
					type: 'danger'
				});
		$("#cpf").val("");
	}
}