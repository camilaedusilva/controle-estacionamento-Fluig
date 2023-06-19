 //ds_responsaveisSetor_NIPS
 
 function createDataset(fields, constraints, sortFields) {
	 
	//Cria as colunas
	    var dataset = DatasetBuilder.newDataset();
        dataset.addColumn("DOCID");
	    dataset.addColumn("CODRESERVA");
        dataset.addColumn("TIPO");
	    dataset.addColumn("DATA");
	    dataset.addColumn("HORA");
		dataset.addColumn("APTO");
        dataset.addColumn("VEICULO");
	    dataset.addColumn("PLACA");

	//Cria costraint para buscar por Setor e por Tipo

    var data_inicio = "";
    var data_fim = "";
    
    if (constraints != null) {
        for (i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "DT_INICIO") {
                data_inicio = constraints[i].initialValue;
            } else if (constraints[i].fieldName == "DT_FIM") {
                data_fim = constraints[i].initialValue;
            }
        }
    }
		
	//Cria a constraint para buscar os formulários ativos
		
		var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);		
		var constraints = new Array(c1);

	    var datasetPrincipal = DatasetFactory.getDataset("frm_controle_veiculos", null, constraints, null);
	    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
	        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
	        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

	        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
	        var constraintsFilhos = new Array();
	        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tblMovVeiculo" ,"tblMovVeiculo", ConstraintType.MUST));
	        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
	        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));
			if (data_inicio != undefined && data_fim != undefined) {
				var cf1 = DatasetFactory.createConstraint("dtMovimentacao", data_inicio , data_fim , ConstraintType.SHOULD);
				constraintsFilhos.push(cf1);
			}

	        //Busca o dataset
	        var datasetFilhos = DatasetFactory.getDataset("frm_controle_veiculos", null, constraintsFilhos, null);

	        for (var j = 0; j < datasetFilhos.rowsCount ; j++) {
	            //Adiciona os valores nas colunas respectivamente.
	            dataset.addRow(new Array(
                        documentId,
                        datasetPrincipal.getValue(i, "codReserva"),
	                    datasetFilhos.getValue(j, "tpMovimentacao"),
	                    datasetFilhos.getValue(j, "dtMovimentacao"),
                        datasetFilhos.getValue(j, "horaMovimentacao"),
						datasetPrincipal.getValue(i, "tpVeiculo"),
						datasetPrincipal.getValue(i, "placaVeiculo")));
	        }
	    }

	    return dataset;

}
   