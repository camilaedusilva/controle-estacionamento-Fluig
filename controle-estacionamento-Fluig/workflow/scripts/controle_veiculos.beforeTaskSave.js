function beforeTaskSave(colleagueId,nextSequenceId,userList){
    var nextAtiv  = getValue("WKNextState");

    var dataAtual = new Date();
    var dataAgora = (dataAtual.getDate()).toString() + "/" +
                    (dataAtual.getMonth() + 1).toString() + "/" +
                    (dataAtual.getFullYear().toString());

    var horaAgora = dataAtual.getHours() + ":" + dataAtual.getMinutes() + ":" + dataAtual.getSeconds();




    if (nextAtiv == 9){
        
        var childData = new java.util.HashMap();

        childData.put("tpMovimentacao", "SAIDA");
        childData.put("dtMovimentacao", dataAgora);
        childData.put("horaMovimentacao", horaAgora);

        hAPI.addCardChild("tblMovVeiculo", childData);

    }

    if (nextAtiv == 11){
        var codReserva = hAPI.getCardValue("codReserva");;

        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("codReserva", codReserva, codReserva, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("atividade", "13", "13", ConstraintType.MUST));
        var dsReserva = DatasetFactory.getDataset("frm_reserva", null, constraints, null);
        if (dsReserva.rowsCount > 0){
            hAPI.setCardValue("cliente_checkout", "SIM");
        }
        
    }

    if (nextAtiv == 5){

        var childData = new java.util.HashMap();

        childData.put("tpMovimentacao", "ENTRADA");
        childData.put("dtMovimentacao", dataAgora);
        childData.put("horaMovimentacao", horaAgora);

        hAPI.addCardChild("tblMovVeiculo", childData);

    }

    if (nextAtiv == 14){

        var childData = new java.util.HashMap();

        childData.put("tpMovimentacao", "CHECKOUT");
        childData.put("dtMovimentacao", dataAgora);
        childData.put("horaMovimentacao",horaAgora);

        hAPI.addCardChild("tblMovVeiculo", childData);

    }

  
}