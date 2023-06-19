function validateForm(form){
	var msg = "";

    if(form.getValue("nome") == "" || form.getValue("nome") == null){
        msg += "O <strong>Nome</strong> não foi preenchido";
    }

    if(form.getValue("cpf") == "" || form.getValue("cpf") == null){
        msg += "O <strong>CPF</strong> não foi preenchido";
    }

    if(form.getValue("tpVeiculo") == "" || form.getValue("tpVeiculo") == null){
        msg += "O <strong>Tipo de Veiculo</strong> não foi preenchido";
    }

    if(form.getValue("tpVeiculo") != "NENHUM" && form.getValue("placaVeiculo") == ""){
        msg += "A <strong>Placa do veículo</strong> não foi preenchida";
    }

    if(form.getValue("codReserva") == "" || form.getValue("codReserva") == null){
        msg += "O <strong>Código da Reserva</strong> não foi preenchido";
    }

    if(form.getValue("numApartamento") == "" || form.getValue("numApartamento") == null){
        msg += "O <strong>Nº do Apartamento </strong> não foi preenchida";
    }


    if(form.getValue("dtCheckin") == "" || form.getValue("dtCheckin") == null){
        msg += "A <strong>Data do Check-in</strong> não foi preenchida";
    }

    if(form.getValue("dtCheckout") == "" || form.getValue("dtCheckout") == null){
        msg += "A <strong>Data do Check-out</strong> não foi preenchida";
    }

    if(form.getValue("qtdDiasH") == "" || form.getValue("qtdDiasH") == null){
        msg += "A <strong>Qtd. Dias</strong> não foi preenchida";
    }

						
	if (msg != ""){
		throw msg;
	}
	
}