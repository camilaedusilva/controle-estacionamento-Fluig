function validateForm(form){
	var msg = "";

    if(form.getValue("nome") == "" || form.getValue("nome") == null){
        msg += "O <strong>Nome</strong> não foi preenchido";
    }

    if(form.getValue("cep") == "" || form.getValue("cep") == null){
        msg += "O <strong>CEP</strong> não foi preenchido";
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

    if(form.getValue("qtdApartamento") == "" || form.getValue("qtdApartamento") == null){
        msg += "A <strong>Qtd. de Apartamento</strong> não foi preenchida";
    }

    if(form.getValue("qtdVagasVP") == "" || form.getValue("qtdVagasVP") == null){
        msg += "A <strong>Qtd. de Vagas de Veiculo</strong> não foi preenchida";
    }

    if(form.getValue("qtdVagasM") == "" || form.getValue("qtdVagasM") == null){
        msg += "A <strong>Qtd. de Vagas de Motos</strong> não foi preenchida";
    }
						
	if (msg != ""){
		throw msg;
	}
	
}