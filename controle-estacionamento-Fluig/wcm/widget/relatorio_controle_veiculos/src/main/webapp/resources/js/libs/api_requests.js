var FLUIG_API = SuperWidget.extend({
    dataset: function(datasetRequest,fields, filtro, order, typeConstraints) {
        var _this = this;
        var endpoint = '/api/public/ecm/dataset/datasets';
        typeConstraints = (typeConstraints)?'constraints':typeConstraints;
        filtro = (filtro)?filtro:[];
        
        return new Promise(function(resolve, reject) {
            var datax = new Object();
            if (typeConstraints == 'constraints') {
            	order = (order)?order:[];
                fields = (fields)?fields:[];
                datax = {
                    "name": datasetRequest,
                    "fields": fields,
                    "order": order,
                    "constraints": filtro
                }
            } else{
            	order = (order)?order:null;
            	fields = (fields)?fields:null;
            	datax = {
                    'name': datasetRequest,
                    'fields': fields,
                    'order': order,
                    'constraints': filtro
                }
            }
            _this.request(datax, endpoint).then(
            		
                function(response) {
                    resolve(response.content);
                },
                function(rejectExec) {
                    reject(rejectExec);
                }
                
            );
        });
    },
    request: function(data,endpoint) {
        var _this = this;

        return new Promise(function(resolve, reject) {
            $.ajax({
                url: endpoint,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                reject(jqXHR);
            }).done(function(response, textStatus, jqXHR) {
            	console.log("response");
            	resolve(response);
            }).always(function() {
            	
            });
        });
    }
});