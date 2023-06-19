//ds_aptoDisponiveis

function createDataset(fields, constraints, sortFields) {

    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NUMAPTO");

    //Busca Reservados

    var cOcupados = new Array();
    var dsReserva = DatasetFactory.getDataset("ds_aptoReservados", null, null, null);

    if (dsReserva.rowsCount > 0) {
        for (var y = 0; y < dsReserva.rowsCount; y ++) {
            cOcupados.push(DatasetFactory.createConstraint("NUMAPTO", dsReserva.getValue(y, "NUMAPTO"), dsReserva.getValue(y, "NUMAPTO"), ConstraintType.MUST));
        }
    }

    //Busca apartartamentos disponiveis

    var dsApto = DatasetFactory.getDataset("ds_apartamentos", null, cOcupados, null);

    for (var i = 0; i < dsApto.rowsCount; i++) {

        dataset.addRow(new Array( dsApto.getValue(i, "NUMAPTO").toString() ));
  
    }

 
    return dataset;

}
