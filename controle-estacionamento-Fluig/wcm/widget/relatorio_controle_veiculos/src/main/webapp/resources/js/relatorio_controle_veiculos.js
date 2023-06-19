var MyWidget = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,
    data_pie: [],
    data_pieSite: [],
    loading: FLUIGC.loading(window, {
        textMessage: 'Processando informações...',
        title: "Loading",
        css: {
            padding: 0,
            margin: 0,
            width: '30%',
            top: '40%',
            left: '35%',
            textAlign: 'center',
            color: '#000',
            border: '3px solid #aaa',
            backgroundColor: '#fff',
            cursor: 'wait'
        },
        overlayCSS: {
            opacity: 0.7,
            cursor: 'wait'
        },
        cursorReset: 'default',
        baseZ: 1000,
        centerX: true,
        centerY: true,
        bindEvents: true,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: true,
        onBlock: null,
        onUnblock: null,
        ignoreIfBlocked: false
    }),
    mat_array: new Array(),
    //método iniciado quando a widget é carregada
    init: function() {
        var that = this;
        FLUIGC.calendar('.calendario');
        that.initMain();
        that.eventRefresh();
        that.initEvents();
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction'],
            'filter': ['click_filter'],
            'search1': ['click_search1']
        },
        global: {}
    },
    search1: function() {
        var that = this;
        var dataInicio = $("#Dt_inicial1").val();
        var dataFim = $("#Dt_final1").val();


            dataInicio = dataInicio.split("-").reverse().join("/");
            dataFim = dataFim.split("-").reverse().join("/");
            that.dataTableRelatorio1(dataInicio, dataFim);
    },
    filter: function() {
        $('#quadrado_1').toggleClass('active');
    },
     executeAction: function(htmlElement, event) {}
    ,
    validaMes: function(mes) {
        var mesx = mes.split("-");
        if (mesx[1].length > 2) {
            var mesy = mesx[0] + "-" + mesx[1].substring(1, 3);
        } else {
            var mesy = mesx[0] + "-" + mesx[1].substring(0, 2);
        }
        return mesy
    },
    getStructDataset: function(DatasetFactory) {
        for (var prop in DatasetFactory) {}
    },
    mostra_filtro: function() {
        var that = this;
        if ($("#filtro_export").hasClass("hide")) {
            $("#filtro_export").removeClass("hide");
        } else {
            $("#filtro_export").addClass("hide");
        }
    },
    carrega_datas: function() {
        var that = this;
        var dt_final, dt_inicial;
        var dataF = new Date();
        var MesF = dataF.getMonth() + 1;
        var DiaF = dataF.getDate();
        if (DiaF < 10) {
            DiaF = "0" + DiaF;
        }
        if (MesF < 10) {
            MesF = "0" + MesF;
        }
        var AnoF = dataF.getFullYear();
        dt_final = AnoF + "-" + MesF + "-" + DiaF;
        dt_inicial = AnoF + "-" + MesF + "-01";
        $("#Dt_inicial").val(dt_final);
        $("#Dt_inicial_Fin").val(dt_final);
        $("#Dt_final").val(dt_final);
        $("#Dt_final_Fin").val(dt_final);
    },
    exporta_Arquivo: function(a, b) {
        var that = this;
        $("#" + a).excelexportjs({
            containerid: a,
            datatype: 'table',
            filename: 'Dados_Exportados'
        });
        b.hide();
    },
    formatTime: function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return hours + ":" + minutes + " " + ampm;
    },
    dataTableRelatorio1Html: function(d) {
        var that = this;
        var view = {
            data: d.data
        }

        var template = `
			    	<table id="relatorio1` + that.instanceId + `" class="display" style="width:100%">
				        <thead>
                            <tr>
                                <th>Cod. Reserva</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Apto</th>
                                <th>Placa</th>
                            </tr>
				        </thead>
			        <tbody>
			        {{#data}}
                        <tr  class="fs-cursor-pointer odd" role="row" >
                            <td class="col-md-1">{{CODRESERVA}}</td>
                            <td class="col-md-1">{{TIPO}}</td>
                            <td class="col-md-1">{{DATA}}</td>
                            <td class="col-md-1">{{HORA}}</td>
                            <td class="col-md-1">{{APTO}}</td>
                            <td class="col-md-1">{{PLACA}}</td> 
                        </tr>
			    	{{/data}}
			        </tbody>
			    </table>
        `
        return Mustache.render(template, view)
    },
    dataTableRelatorio1Dados: function(DT_INICIO, DT_FIM) {
        var c1 = DatasetFactory.createConstraint('DT_INICIO', DT_INICIO, DT_INICIO, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('DT_FIM', DT_FIM, DT_FIM, ConstraintType.MUST);

        var ds = DatasetFactory.getDataset('ds_movimentacaoVeiculos', null, new Array(c1, c2), null);
        if (ds != null && ds.values != null && ds.values.length > 0) {
            return ds.values
        } else {
            return false
        }
    },
    dataTableRelatorio1: function(DT_INICIO, DT_FIM) {
        var that = this;
        that.loading.show();

        var dados = that.dataTableRelatorio1Dados(DT_INICIO, DT_FIM);

        if (dados) {
            $('#relatorio1List' + that.instanceId).html(that.dataTableRelatorio1Html({
                data: dados
            }))

            $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
                var min = parseInt($('#min').val(), 10);
                var max = parseInt($('#max').val(), 10);
                var id = parseFloat(data[0]) || 0; // use data for the age column
                if ((isNaN(min) && isNaN(max)) ||
                    (isNaN(min) && age <= max) ||
                    (min <= id && isNaN(max)) ||
                    (min <= id && id <= max)) {
                    return true;
                } else {
                    return false;
                }
            });

            var table = $("#relatorio1" + that.instanceId).DataTable({
                "language": {
                    "sEmptyTable": "Não foi encontrado nenhum registo",
                    "sLoadingRecords": "A carregar...",
                    "sProcessing": "A processar...",
                    "sLengthMenu": "Mostrar _MENU_ registos",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                    "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                    "sInfoPostFix": "",
                    "sSearch": "Procurar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    {
                        extend: 'pdfHtml5',
                        orientation: 'landscape',
                        pageSize: 'TABLOID'
                    }
                ]
            });
            // Event listener to the two range filtering inputs to redraw on input
            $('#min, #max').keyup(function() {
                table.draw();
            });
        } else {
            $('#relatorio1List' + that.instanceId).html("<h2>Não foram encontrados dados para essa consulta.</h2>")
        }
        that.loading.hide();

    }
});

