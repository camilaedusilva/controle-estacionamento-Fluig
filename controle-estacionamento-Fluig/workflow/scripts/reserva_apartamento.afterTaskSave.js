function afterTaskSave(colleagueId,nextSequenceId,userList){

	//popula campos do formulário para controle
	var ativAtual = getValue("WKNumState");
	
	if (ativAtual == 4) {
        	
        var cs1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
        var filtro = new Array(cs1)
        var dsColleague = DatasetFactory.getDataset("colleague", null, filtro, null);
        var nomeUsuario = dsColleague.getValue(0, "colleagueName");	
        var documentId = getValue("WKCardId");
        
        hAPI.setCardValue("num_documento", documentId );
        hAPI.setCardValue("user_start", getValue("WKUser"));
        hAPI.setCardValue("responsavel", nomeUsuario);
        hAPI.setCardValue("num_process", getValue("WKNumProces"));
        hAPI.setCardValue("codReserva", getValue("WKNumProces"));
        
        var codReserva =  getValue("WKNumProces");
        var nome =  hAPI.getCardValue("nome");
        var cpfR =  hAPI.getCardValue("cpf");
        
        
        var campoDescritor = codReserva + " - " + nome + " | " + cpfR ;	
        hAPI.setCardValue("campoDescritor", campoDescritor);
	}
	
}