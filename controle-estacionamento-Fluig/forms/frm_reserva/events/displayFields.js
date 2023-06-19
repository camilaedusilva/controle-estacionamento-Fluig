function displayFields(form, customHTML) {

    /*CAMPOS DE CONTROLE ------------------*/

    var atividade = getValue('WKNumState');
    var modo = form.getFormMode();
    var numProcess = getValue("WKNumProces");
    var documentId = getValue("WKCardId");
    var usuarioLogado = getValue('WKUser');

    form.setValue("atividade", atividade);
    form.setValue("user_logado", usuarioLogado);
    form.setValue("modo", modo);

    var filtro = [];
    filtro.push(DatasetFactory.createConstraint('colleaguePK.colleagueId', usuarioLogado, usuarioLogado, ConstraintType.MUST));
    filtro.push(DatasetFactory.createConstraint('active', true, true, ConstraintType.MUST));
    var dsColleague = DatasetFactory.getDataset('colleague', null, filtro, null);
    form.setValue("nome_usuario_logado", dsColleague.getValue(0, 'colleagueName'));

    /*-------------------------------------*/


    //modo visualização
	
	if (getValue("WKNumState") != 0 
        && getValue("WKNumState") != 4){

        form.setShowDisabledFields(true);
        form.setHideDeleteButton(true);
        var habilitar = false;
        var mapaForm = new java.util.HashMap();
        mapaForm = form.getCardData();
        var it = mapaForm.keySet().iterator();

        while (it.hasNext()){
            var key = it.next();
            form.setEnabled(key, habilitar);
        }

    }

}