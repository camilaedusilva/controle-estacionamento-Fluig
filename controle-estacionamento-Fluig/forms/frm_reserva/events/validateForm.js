function validateForm(form){
	var msg = "";

    if(form.getValue("nome") == "" || form.getValue("nome") == null){
        msg += "O <strong>Nome</strong> não foi preenchido";
    }

    if(form.getValue("cep") == "" || form.getValue("cep") == null){
        msg += "O <strong>CEP</strong> não foi preenchido";
    }

    if(form.getValue("tpVeiculo") == "" || form.getValue("tpVeiculo") == null){
        msg += "O <strong>Tipo de Veiculo</strong> não foi preenchido";
    }

    if(form.getValue("tpVeiculo") != "NENHUM" && form.getValue("placaVeiculo") == ""){
        msg += "A <strong>Placa do veículo</strong> não foi preenchida";
    }

    if(form.getValue("endereco") == "" || form.getValue("endereco") == null){
        msg += "O <strong>endereço</strong> não foi preenchido";
    }

    if(form.getValue("numero") == "" || form.getValue("numero") == null){
        msg += "O <strong>numero</strong> não foi preenchido";
    }
	
    if(form.getValue("bairro") == "" || form.getValue("bairro") == null){
        msg += "O <strong>bairro</strong> não foi preenchido";
    }

    if(form.getValue("cidade") == "" || form.getValue("cidade") == null){
        msg += "O <strong>Cidade</strong> não foi preenchido";
    }

    if(form.getValue("estado") == "" || form.getValue("estado") == null){
        msg += "O <strong>Estado</strong> não foi preenchido";
    }

    if(form.getValue("dtCheckin") == "" || form.getValue("dtCheckin") == null){
        msg += "A <strong>Data do Check-in</strong> não foi preenchida";
    }

    if(form.getValue("dtCheckout") == "" || form.getValue("dtCheckout") == null){
        msg += "A <strong>Data do Check-out</strong> não foi preenchida";
    }

    if(form.getValue("numApartamento") == "" || form.getValue("numApartamento") == null){
        msg += "O <strong>Nº do Apartamento </strong> não foi preenchida";
    }
						
	if (msg != ""){
		throw msg;
	}
	
}