

function verifcaQuantidades() {

    var dsApartamentos = DatasetFactory.getDataset("ds_apartamentos", null, null, null);
    var qtdTotal = dsApartamentos.values.length;
    $("#totalVagas").val(qtdTotal);

    var dsApOcupado = DatasetFactory.getDataset("ds_aptoReservados", null, null, null);
    var qtdR = dsApOcupado.values.length;
    $("#vagasOcupadas").val(qtdR);

    var dsApLivre = DatasetFactory.getDataset("ds_aptoDisponiveis", null, null, null);
    var qtdL = dsApLivre.values.length;
    $("#vagasLivres").val(qtdL);

}

function buscaDadosReserva(){

    var txtBusca = $("#buscaReserva").val();
    var paramBusca = $("#opBusca").val();
    var constraints = new Array();

    switch (paramBusca) {

        case "PLACA":
            constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("atividade", "15", "15", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("atividade", "13", "13", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("placaVeiculo", txtBusca, txtBusca, ConstraintType.MUST));
            break;

        case "CPF":
            txtBusca = txtBusca.replace(/[^0-9]/g, "");
            constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("atividade", "15", "15", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("atividade", "13", "13", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("cpf", txtBusca, txtBusca, ConstraintType.MUST));
            break;

        case "COD":
            constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
            constraints.push(DatasetFactory.createConstraint("atividade", "15", "15", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("atividade", "13", "13", ConstraintType.MUST_NOT));
            constraints.push(DatasetFactory.createConstraint("codReserva", txtBusca, txtBusca, ConstraintType.MUST));
            break;

    }

    var ds = DatasetFactory.getDataset("frm_reserva", null, constraints, null);

    if (ds.values.length > 0) {

        for (var i = 0; i < ds.values.length; i++) {
            
            $("#vagaCliente").val(ds.values[i]["numApartamento"]);
            $("#nome").val(ds.values[i]["nome"]);
            $("#cpf").val(ds.values[i]["cpf"]);
            $("#tpVeiculo").val(ds.values[i]["tpVeiculo"]);
            $("#placaVeiculo").val(ds.values[i]["placaVeiculo"]);
            $("#codReserva").val(ds.values[i]["num_process"]);
            $("#numApartamento").val(ds.values[i]["numApartamento"]);
            $("#dtCheckin").val(ds.values[i]["dtCheckin"]);
            $("#dtCheckout").val(ds.values[i]["dtCheckout"]);
            $("#qtdDiasH").val(ds.values[i]["qtdDiasH"]);
            $("#obsReserva").val(ds.values[i]["obsReserva"]);
        }

        FLUIGC.toast({
            title: 'Reserva encontrada!',
            message: '',
            type: 'success'
        });

    } else {
        FLUIGC.toast({
            title: 'Erro!',
            message: 'Reserva não encontrada!',
            type: 'danger'
        });
    }

}

function movimentacaoVeiculo(){

    var dataAtual = new Date();
    var dataAgora = (dataAtual.getDate()).toString() + "/" +
                    (dataAtual.getMonth() + 1).toString() + "/" +
                    (dataAtual.getFullYear().toString());

    var horaAgora = dataAtual.getHours() + ":" + dataAtual.getMinutes() + ":" + dataAtual.getSeconds();

    var validaTpMov = "";

    $("input[id^='tpMovimentacao']").each(function(index, value){
        validaTpMov = $(this).val();
    });

   if(validaTpMov == "SAIDA" || validaTpMov == ""){
        wdkAddChild('tblMovVeiculo');

        $('#tpMovimentacao___' + newId).val("ENTRADA");
        $('#dtMovimentacao___' + newId).val(dataAgora);
        $('#horaMovimentacao___' + newId).val(horaAgora);
   }else{
        wdkAddChild('tblMovVeiculo');

        $('#tpMovimentacao___' + newId).val("SAIDA");
        $('#dtMovimentacao___' + newId).val(dataAgora);
        $('#horaMovimentacao___' + newId).val(horaAgora);

   }
    
   
			
}
