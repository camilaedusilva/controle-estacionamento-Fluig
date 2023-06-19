<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
	<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
	<main>
		<section id="relatorios1" class="hide-section">
			<div class="rad-body-wrapper">
				<div class="container-fluid">
					<div class="row">
						<div class="col-xs-11 col-md-11 col-lg-11">
							<header class="rad-page-title">
								<h2>Relatório de Movimentação de Veículos</h2>
								<h3>Controle de Veículos<h3>					
							</header>
						</div>
					</div>
					<!--  ==================FILTRO INICIO==================================================== -->
					<div class="row">
						<div class="col-xs-12 col-md-12 col-lg-12">
							<div id="quadrado_1" class="bloco-rep text-center img-rounded element-animation" style="padding-top:unset;">
								<div class="container-fluid">
									<div class="row"> 
										<div class="form-group col-xs-12 col-md-4 col-lg-4">
											<label class="control-label" for="Dt_inicial">Data Inicial:</label>
											<div class="input-group">									
												<span class="input-group-addon fluigicon fluigicon-calendar icon-xl"></span>
												<input type="text" name="Dt_inicial1" id="Dt_inicial1" class="form-control input-sm calendario" >								
											</div>
										</div>
										<div class="form-group col-xs-12 col-md-4 col-lg-4">
											<label class="control-label" for="Dt_final">Data Final:</label>
											<div class="input-group">									
												<span class="input-group-addon  fluigicon fluigicon-calendar icon-xl"></span>
												<input type="text" name="Dt_final1" id="Dt_final1" class="form-control input-sm calendario" >								
											</div>
										</div>
										<div class="form-group col-xs-12 col-md-4 col-lg-4">
											<label class="control-label" for="search1"></label>
											<input type="button" name="search1" id="search1" class="form-control input-sm btn btn-info btn-block" data-search1 value="Consultar" >								
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--  ==================FILTRO FIM==================================================== -->
					<div class="col-lg-12 col-md-12 col-xs-12 row">
						<div class="col-lg-12 col-md-12 col-xs-12">
							<div id="relatorio1List${instanceId}">
							</div>
						</div>
						<div class="col-lg-12 col-md-12 col-xs-12">
							<div id="relatorio1${instanceId}">
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>

