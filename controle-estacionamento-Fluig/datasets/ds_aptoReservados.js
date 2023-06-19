//ds_aptoReservados

function createDataset(fields, constraints, sortFields) {

    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    //dataset.addColumn("DOCID");
    dataset.addColumn("CODRESERVA");
    dataset.addColumn("NUMAPTO");
    dataset.addColumn("DTCHECKIN");
    dataset.addColumn("DTCHECKOUT");
    dataset.addColumn("STATUS"); 
    
    //Cria constraint

		var NUMAPTO;

		
		if(constraints != null){
			for (a = 0; a < constraints.length; a++){
				if (constraints[a].fieldName == "NUMAPTO"){
					NUMAPTO = constraints[a].initialValue;
				}
 			}
		}

    //Busca apartamentos reservados
    var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
    constraints.push(DatasetFactory.createConstraint("atividade", "15", "15", ConstraintType.MUST_NOT));
    constraints.push(DatasetFactory.createConstraint("atividade", "13", "13", ConstraintType.MUST_NOT));
    if (NUMAPTO != undefined) {
        var cR1 = DatasetFactory.createConstraint("numApartamento", NUMAPTO , NUMAPTO , ConstraintType.SHOULD);
        constraints.push(cR1);
    }

    var datasetPrincipal = DatasetFactory.getDataset("frm_reserva", null, constraints, null);

    if (datasetPrincipal.rowsCount > 0){
        for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
            var documentId = datasetPrincipal.getValue(i, "metadata#id");
    
          //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                                    documentId,
                                    datasetPrincipal.getValue(i, "codReserva"),
                                    datasetPrincipal.getValue(i, "numApartamento"),
                                    trataData(datasetPrincipal.getValue(i, "dtCheckin")),
                                    datasetPrincipal.getValue(i, "dtCheckout"),
                                    "OCUPADO"
            ));
    
        }
    }
  

    return dataset;
}

function trataData(DT){
	try{
		var DATA = DT.split(" ")[0].split("-").reverse().join("/");
		return DATA;
	}catch(e){
		return DT
	}	
	
}