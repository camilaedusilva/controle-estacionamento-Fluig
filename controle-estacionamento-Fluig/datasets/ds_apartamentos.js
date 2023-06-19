//ds_apartamentos

function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NUMAPTO");
    dataset.addColumn("NUMVAGA");

     //Cria constraint

	var NUMAPTO;
		
	if(constraints != null){
		for (a = 0; a < constraints.length; a++){
			if (constraints[a].fieldName == "NUMAPTO"){
				NUMAPTO = constraints[a].initialValue;
			}
 		}
	}

    //Busca quantidade apartartamentos
    var cAp1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var cApto = new Array(cAp1);

    var dsQtdApto = DatasetFactory.getDataset("frm_hotel", null, cApto, null);
    var qtdApto = dsQtdApto.getValue(0, "qtdApartamento");

    for (var i = 1; i <= qtdApto; i++) {
        if(NUMAPTO != undefined){
            if(NUMAPTO != i){
                var numapto = i.toString();
                dataset.addRow(new Array(numapto , numapto));
            }
        }else{
            var numapto = i.toString();
            dataset.addRow(new Array(numapto , numapto));
        }        
    }

    return dataset;
}