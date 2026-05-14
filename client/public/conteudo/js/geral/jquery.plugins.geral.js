(function (JQuery) {


/** $.calendario();
* Função para calendário de mês e ano.
* Autor: Diego Oliveira
*/

$.fn.calendario = function(v) {              
		var load = false,
			visible = false,
			$calendario, $table,
			data = new Date(),
			mes = data.getMonth(),
			ano = data.getFullYear(),
            startDate = null,
            endDate = null,
            mesIni = 0,
            mesFim = 0;

		return this.each(function() {            
			if (!load) init($(this)); 
	// Eventos
		// Evento de 
			$(this).bind("click", function(){
				if (!visible) display($(this));
			});

			$(".mes2, .ano2")
				.bind("focus click", function(){
					if (!visible) display($(this));
				})
				.bind("keypress", function(e){
					if (e.which != 9) end();
				})
				.bind("keyup", function(e){
					if (e.which != 13) {
						var bErroAnterior = false;
						var erro = "";
						var erroMes = false;
						var erroAno = false;
						var contErro = 0;

						if ($(this).closest(".campos_form").hasClass("form_erro"))
							bErroAnterior = true;
						
						var elMes = $(this).closest(".dataCalendario").find(".mes2");
						var elAno = $(this).closest(".dataCalendario").find(".ano2");
						
						var mes = $(elMes).val();
						var ano = $(elAno).val();
			
						if ($(this).hasClass("mes2") && (mes == "0")) mes = "";
						if ($(this).hasClass("ano2") && (ano.length < 4)) ano = "";
			
						if (mes != "") mes = parseInt(mes, 10); else mes = -1;
						if (ano != "") ano = parseInt(ano, 10); else ano = -1;
			
						// Identifica os campos com erro               

                        var aceitaMais12Mes = aceitaMais12(elMes);
						if ((!erroMes) && ((mes == 0) || (mes > 12 && !aceitaMais12Mes) || (aceitaMais12Mes && mes > 13))) {
							erroMes = true;
							contErro++;
						}
						
						if ((!erroAno) && (ano == 0)) {
							erroAno = true;
							contErro++;
						}
				
						// Formata a mensagem de erro
						if (erroMes) {
							erro = "O mês";
						}
						if (erroAno) {
							if (erro != "") erro = erro + " e o ano";
							else erro = "O ano";
						}
						if (contErro > 1) erro = erro + " informados são inválidos.";
						else erro = erro + " informado é inválido.";

						// Aplica a formatação e a mensagem de erro nos campos individuais                    
						if (erroMes) {
							incluirErroCampoCal(elMes, erro);
							if ($(this).hasClass("mes2")) e.stopImmediatePropagation();
						}
						else {
							removerErroCampoCal(elMes);
						}
				
						if (erroAno) {
							incluirErroCampoCal(elAno, erro);
							if ($(this).hasClass("ano2")) e.stopImmediatePropagation();
						}
						else {
							removerErroCampoCal(elAno);
						}
				
						// Aplica a formatação e a mensagem de erro no grupo de campos
						if (contErro > 0) {
							$(this).closest(".campos_form").addClass("form_erro")
									.find(".erro_msg").html("<strong>" + erro + "</strong>");
							if (!bErroAnterior)
								$(this).closest(".dataCalendario").find(".ico_calendario2").dpClose();
						}
						else {
							$(this).closest(".campos_form").removeClass("form_erro")
									.find(".erro_msg").html("<strong></strong>");
							if (bErroAnterior)
								$(this).closest(".dataCalendario").find(".ico_calendario2").dpClose();
						}
					}
				});

			$("body").bind("focus click", function(e){
			
				if (!($(e.target).closest("#calendario").length || /mes2|ano2|icoCalendario2/g.test(e.target.className))) {
					end();
				}
			});

			$calendario.find("td").click(function(){
                if (!$(this).find("a").is(".disabled")) {
                    $td = $(this);
                    $table.find(":text:first").val($td.attr("class"));
                    $table.find(":text:last").val($calendario.find(".ano").text());
                    $("body").click();
                }
			});

			$calendario.find("a.voltar").click(function(){
				ponteiro(this, 0);
			});

			$calendario.find("a.avancar").click(function(){
				ponteiro(this, 1);
			});
            
            function aceitaMais12(elMes) {
                var attrAceitaMais12 = elMes.attr("aceitaMais12");
                var temMesesEsp = false;
                if (attrAceitaMais12 != "") {
                    temMesesEsp = eval(attrAceitaMais12);
                }
                return temMesesEsp;
            }

			function ponteiro(obj, attr){
                if (!$(obj).is(".disabled")) {
                    var ano = parseInt($calendario.find(".ano").text(),10);
                    attr ? ano++ : ano--;
                    $calendario.find(".ano").text(ano);
                    setVisibility(ano);
					
					//var inputMes = $table.find(":text:first").val();
					var inputAno = $table.find(":text:last").val();
					$calendario.find("td a").removeClass("sel");
					if(ano == parseInt(inputAno)){
						$calendario.find("td:eq(" + mes + ") a").addClass("sel");
					}
                }
			};
            function setVisibility(anoExibido) {
                if (anoExibido <= startDate.getFullYear()) {
                    $calendario.find(".voltar").addClass("disabled");
                } else {
                    $calendario.find(".voltar").removeClass("disabled");
                }
                if (anoExibido >= endDate.getFullYear()) {
                    $calendario.find(".avancar").addClass("disabled");
                } else {
                    $calendario.find(".avancar").removeClass("disabled");
                }
                for (i = 0; i < 12; i++) {
                    var mesRef = anoExibido * 100 + i;
                    if (mesRef < mesIni || mesRef > mesFim) {
                        $calendario.find("td:eq(" + i + ") a").addClass("disabled");
                        $calendario.find("td:eq(" + i + ") a").removeClass("sel");
                    } else {
                        $calendario.find("td:eq(" + i + ") a").removeClass("disabled");
                    }
                }
            }
			function display($obj) {
				var inputMes = $table.find(":text:first");
				var inputAno = $table.find(":text:last");
				$table = $obj.closest("table");
				visible = true;
				if(parseInt($table.find(":text:first").val(),10) != 1) {
					mes = parseInt($table.find(":text:first").val(),10) - 1 || mes;
                    if (aceitaMais12(inputMes) && mes > 11) {
                        mes = 11;
                    }
                } else
					mes = 0;
				ano = parseInt($table.find(":text:last").val(),10) || ano;
				
				var offset = $table.find(".icoCalendario2").offset();

				$calendario.find("td a").removeClass("sel");
				$calendario.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario.find(".ano").text(ano);
                setVisibility(ano);
				
				
				if (inputMes.val() == "" || inputAno.val()  == "" || inputMes.hasClass("erro_input") || inputAno.hasClass("erro_input")){
					
					$calendario.find("td a").removeClass("sel");
					var atual = new Date();
					mes = parseInt(atual.getDate());
					ano = parseInt(atual.getFullYear());
					$calendario.find(".ano").text(ano);
					setVisibility(ano);
				}
					
				$calendario.css({
					top: offset.top,
					left: offset.left
				}).show();
			}
			
            function setStartDate(data) {
                if (data) {
                    startDate = Date.fromString("01/" + data);
                }
                if (!startDate) {
                    startDate = Date.fromString("01/01/1970");
                }
                mesIni = startDate.getFullYear() * 100 + startDate.getMonth();
            }
            function setEndDate(data) {
                if (data) {
                    endDate = Date.fromString("01/" + data);
                }
                if (!endDate) {
                    endDate = Date.fromString("31/12/2999");
                }
                if (endDate.getTime() < startDate.getTime()) {
                    endDate = startDate;
                }
                mesFim = endDate.getFullYear() * 100 + endDate.getMonth();
            }
			function init($obj) {
				load = true;
    			var dataInicial = $obj.closest(".dataCalendario").find(".dataInicial").val();
    			var dataFinal = $obj.closest(".dataCalendario").find(".dataFinal").val();
   				setStartDate(dataInicial);
   				setEndDate(dataFinal);
				$table = $obj.closest("table");
				
				var calendarioHtml = '\
								<div class="topo after">\
									<a class="voltar" href="javascript:;" title="Voltar">Voltar</a>\
									<span class="ano">' + ano + '</span>\
									<a class="avancar" href="javascript:;" title="Avançar">Avançar</a>\
								</div>\
								<table>\
									<colgroup>\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
									</colgroup>\
									<tbody>\
									<tr>\
									<td class="01">\
										<a href="javascript:;" title="Janeiro">\
											<abbr lang="pt-br" title="Janeiro">Jan</abbr>\
										</a>\
									</td>\
									<td class="02">\
										<a href="javascript:;" title="Fevereiro">\
											<abbr lang="pt-br" title="Fevereiro">Fev</abbr>\
										</a>\
									</td>\
									<td class="03">\
										<a href="javascript:;" title="Março">\
											<abbr lang="pt-br" title="Março">Mar</abbr>\
										</a>\
									</td>\
									<td class="04">\
										<a href="javascript:;" title="Abril">\
											<abbr lang="pt-br" title="Abril">Abr</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="05">\
										<a href="javascript:;" title="Maio">\
											<abbr lang="pt-br" title="Maio">Mai</abbr>\
										</a>\
									</td>\
									<td class="06">\
										<a href="javascript:;" title="Junho">\
											<abbr lang="pt-br" title="Junho">Jun</abbr>\
										</a>\
									</td>\
									<td class="07">\
										<a href="javascript:;" title="Julho">\
											<abbr lang="pt-br" title="Julho">Jul</abbr>\
										</a>\
									</td>\
									<td class="08">\
										<a href="javascript:;" title="Agosto">\
											<abbr lang="pt-br" title="Agosto">Ago</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="09">\
										<a href="javascript:;" title="Setembro">\
											<abbr lang="pt-br" title="Setembro">Set</abbr>\
										</a>\
									</td>\
									<td class="10">\
										<a href="javascript:;" title="Outubro">\
											<abbr lang="pt-br" title="Outubro">Out</abbr>\
										</a>\
									</td>\
									<td class="11">\
										<a href="javascript:;" title="Novembro">\
											<abbr lang="pt-br" title="Novembro">Nov</abbr>\
										</a>\
									</td>\
									<td class="12">\
										<a href="javascript:;" title="Dezembro">\
											<abbr lang="pt-br" title="Dezembro">Dez</abbr>\
										</a>\
									</td>\
									</tr>\
									</tbody>\
								</table>';
						
				$calendario = $("<div id=\"calendario\" class=\"calendario\"></div>");
				$calendario.append(calendarioHtml);
				$calendario.find("td a").removeClass("sel");
				$calendario.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario.find(".ano").text(ano);
                setVisibility(ano);
				$("body").append($calendario);
			}

			function end() {
				$calendario.hide();
				visible = false;
			}
		});
	};

	function incluirErroCampoCal(domElement, mensagem) {
		$(domElement).each(function() {
			$(this).addClass("erro_input");
			if ($(this).attr("title") == undefined) $(this).attr("title", "");
			if ($(this).attr("title_ori") == undefined) $(this).attr("title_ori", $(this).attr("title"));
			$(this).attr("title", mensagem + " " + $(this).attr("title_ori"));
		});
	}
	
	function removerErroCampoCal(domElement) {
		$(domElement).each(function() {
			$(this).removeClass("erro_input");
			$(this).attr("title", $(this).attr("title_ori"));
		});
	}
	

$.fn.calendario_2 = function(v) {              
		var load = false,
			visible = false,
			$calendario_2, $table_2,
			data = new Date(),
			mes = data.getMonth(),
			ano = data.getFullYear(),
            startDate = null,
            endDate = null,
            mesIni = 0,
            mesFim = 0;

		return this.each(function() {            
			if (!load) init($(this)); 
	// Eventos
		// Evento de 
			$(this).bind("click", function(){
				if (!visible) display($(this));
			});


			$(this).closest(".boxData").find(".mes2_2, .ano2_2")
			//$(".mes2, .ano2")
				.bind("focus click", function(){
					if (!visible) display($(this));
				})
				.bind("keypress", function(e){
					if (e.which != 9) end();
				});

			
			$("body").bind("focus click", function(e){
			
				if (!($(e.target).closest("#calendario_2").length || /mes2_2|ano2_2|icoCalendario2/g.test(e.target.className))) {
					end();
				}
				
			});

			$calendario_2.find("td").click(function(){
                if (!$(this).find("a").is(".disabled")) {
                    $td = $(this);
                    $table_2.find(":text:first").val($td.attr("class"));
                    $table_2.find(":text:last").val($calendario_2.find(".ano").text());
                    $("body").click();
                }
			});

			$calendario_2.find("a.voltar").click(function(){
				ponteiro(this, 0);
			});

			$calendario_2.find("a.avancar").click(function(){
				ponteiro(this, 1);
			});

			function ponteiro(obj, attr){
                if (!$(obj).is(".disabled")) {
                    var ano = parseInt($calendario_2.find(".ano").text(),10);
                    attr ? ano++ : ano--;
                    $calendario_2.find(".ano").text(ano);
                    setVisibility(ano);
                }
			};
            function setVisibility(anoExibido) {
                if (anoExibido <= startDate.getFullYear()) {
                    $calendario_2.find(".voltar").addClass("disabled");
                } else {
                    $calendario_2.find(".voltar").removeClass("disabled");
                }
                if (anoExibido >= endDate.getFullYear()) {
                    $calendario_2.find(".avancar").addClass("disabled");
                } else {
                    $calendario_2.find(".avancar").removeClass("disabled");
                }
                for (i = 0; i < 12; i++) {
                    var mesRef = anoExibido * 100 + i;
                    if (mesRef < mesIni || mesRef > mesFim) {
                        $calendario_2.find("td:eq(" + i + ") a").addClass("disabled");
                        $calendario_2.find("td:eq(" + i + ") a").removeClass("sel");
                    } else {
                        $calendario_2.find("td:eq(" + i + ") a").removeClass("disabled");
                    }
                }
            }
			function display($obj) {
				visible = true,
				mes = parseInt($table_2.find(":text:first").val(),10) - 1 || mes,
				ano = parseInt($table_2.find(":text:last").val(),10) || ano,
				$table_2 = $obj.closest("table");
				var offset = $table_2.find(".icoCalendario2_2").offset();

				$calendario_2.find("td a").removeClass("sel");
				$calendario_2.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario_2.find(".ano").text(ano);
                setVisibility(ano);
				$calendario_2.css({
					top: offset.top,
					left: offset.left
				}).show();
			}
			
            function setStartDate(data) {
                if (data) {
                    startDate = Date.fromString("01/" + data);
                }                
                if (!startDate) {
                    startDate = Date.fromString("01/01/1970");
                }
                mesIni = startDate.getFullYear() * 100 + startDate.getMonth();
            }
            function setEndDate(data) {
                if (data) {
                    endDate = Date.fromString("01/" + data);
                }
                if (!endDate) {
                    endDate = Date.fromString("31/12/2999");
                }
                if (endDate.getTime() < startDate.getTime()) {
                    endDate = startDate;
                }
                mesFim = endDate.getFullYear() * 100 + endDate.getMonth();
            }
			function init($obj) {
				load = true;
				$table_2 = $obj.closest("table");
    			var dataInicial = $obj.closest(".dataCalendario").find(".dataInicial").val();
    			var dataFinal = $obj.closest(".dataCalendario").find(".dataFinal").val();
   				setStartDate(dataInicial);
   				setEndDate(dataFinal);
				
				var calendarioHtml = '\
								<div class="topo after">\
									<a class="voltar" href="javascript:;" title="Voltar">Voltar</a>\
									<span class="ano">' + ano + '</span>\
									<a class="avancar" href="javascript:;" title="Avançar">Avançar</a>\
								</div>\
								<table>\
									<colgroup>\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
									</colgroup>\
									<tbody>\
									<tr>\
									<td class="01">\
										<a href="javascript:;" title="Janeiro">\
											<abbr lang="pt-br" title="Janeiro">Jan</abbr>\
										</a>\
									</td>\
									<td class="02">\
										<a href="javascript:;" title="Fevereiro">\
											<abbr lang="pt-br" title="Fevereiro">Fev</abbr>\
										</a>\
									</td>\
									<td class="03">\
										<a href="javascript:;" title="Março">\
											<abbr lang="pt-br" title="Março">Mar</abbr>\
										</a>\
									</td>\
									<td class="04">\
										<a href="javascript:;" title="Abril">\
											<abbr lang="pt-br" title="Abril">Abr</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="05">\
										<a href="javascript:;" title="Maio">\
											<abbr lang="pt-br" title="Maio">Mai</abbr>\
										</a>\
									</td>\
									<td class="06">\
										<a href="javascript:;" title="Junho">\
											<abbr lang="pt-br" title="Junho">Jun</abbr>\
										</a>\
									</td>\
									<td class="07">\
										<a href="javascript:;" title="Julho">\
											<abbr lang="pt-br" title="Julho">Jul</abbr>\
										</a>\
									</td>\
									<td class="08">\
										<a href="javascript:;" title="Agosto">\
											<abbr lang="pt-br" title="Agosto">Ago</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="09">\
										<a href="javascript:;" title="Setembro">\
											<abbr lang="pt-br" title="Setembro">Set</abbr>\
										</a>\
									</td>\
									<td class="10">\
										<a href="javascript:;" title="Outubro">\
											<abbr lang="pt-br" title="Outubro">Out</abbr>\
										</a>\
									</td>\
									<td class="11">\
										<a href="javascript:;" title="Novembro">\
											<abbr lang="pt-br" title="Novembro">Nov</abbr>\
										</a>\
									</td>\
									<td class="12">\
										<a href="javascript:;" title="Dezembro">\
											<abbr lang="pt-br" title="Dezembro">Dez</abbr>\
										</a>\
									</td>\
									</tr>\
									</tbody>\
								</table>';
						
				$calendario_2 = $("<div id=\"calendario_2\" class=\"calendario\"></div>");
				$calendario_2.append(calendarioHtml);
				$calendario_2.find("td a").removeClass("sel");
				$calendario_2.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario_2.find(".ano").text(ano);
                setVisibility(ano);
				$("body").append($calendario_2);
			}

			function end() {
				$calendario_2.hide();
				visible = false;
			}
		});
	};

/* Implementação do Calendário com o mês 13
 * 22/11/2011	
 */
	
	$.fn.calendario_13 = function(v) {              
		var load = false,
			visible = false,
			$calendario, $table,
			data = new Date(),
			mes = data.getMonth(),
			ano = data.getFullYear(),
            startDate = null,
            endDate = null,
            mesIni = 0,
            mesFim = 0;

		return this.each(function() {            
			if (!load) init($(this)); 
	// Eventos
		// Evento de 
			$(this).bind("click", function(){
				if (!visible) display($(this));
			});

/*
*	MODIFICADO O CAMPO QUE RECEBE O mes2 PARA A CHAMADA DOS ENVENTOS DO CALENDARIO13
*/			
			$(".mes13, .ano13")
				.bind("focus click", function(){
					if (!visible) display($(this));
				})
				.bind("keypress", function(e){
					if (e.which != 9) end();
				})
				.bind("keyup", function(e){
					if (e.which != 13) {
						var bErroAnterior = false;
						var erro = "";
						var erroMes = false;
						var erroAno = false;
						var contErro = 0;

						if ($(this).closest(".campos_form").hasClass("form_erro"))
							bErroAnterior = true;
						
						var elMes = $(this).closest(".dataCalendario").find(".mes13");
						var elAno = $(this).closest(".dataCalendario").find(".ano13");
						
						var mes = $(elMes).val();
						var ano = $(elAno).val();
			
						if ($(this).hasClass("mes13") && (mes == "0")) mes = "";
						if ($(this).hasClass("ano13") && (ano.length < 4)) ano = "";
			
						if (mes != "") mes = parseInt(mes, 10); else mes = -1;
						if (ano != "") ano = parseInt(ano, 10); else ano = -1;
			
						// Identifica os campos com erro               

                        var aceitaMais12Mes = aceitaMais12(elMes);
						if ((!erroMes) && ((mes == 0) || (mes > 13 && !aceitaMais12Mes) || (aceitaMais12Mes && mes > 14))) {
							erroMes = true;
							contErro++;
						}
						
						if ((!erroAno) && (ano == 0)) {
							erroAno = true;
							contErro++;
						}
				
						// Formata a mensagem de erro
						if (erroMes) {
							erro = "O mês";
						}
						if (erroAno) {
							if (erro != "") erro = erro + " e o ano";
							else erro = "O ano";
						}
						if (contErro > 1) erro = erro + " informados são inválidos.";
						else erro = erro + " informado é inválido.";

						// Aplica a formatação e a mensagem de erro nos campos individuais                    
						if (erroMes) {
							incluirErroCampoCal(elMes, erro);
							if ($(this).hasClass("mes13")) e.stopImmediatePropagation();
						}
						else {
							removerErroCampoCal(elMes);
						}
				
						if (erroAno) {
							incluirErroCampoCal(elAno, erro);
							if ($(this).hasClass("ano13")) e.stopImmediatePropagation();
						}
						else {
							removerErroCampoCal(elAno);
						}
				
						// Aplica a formatação e a mensagem de erro no grupo de campos
						if (contErro > 0) {
							$(this).closest(".campos_form").addClass("form_erro")
									.find(".erro_msg").html("<strong>" + erro + "</strong>");
							if (!bErroAnterior)
								$(this).closest(".dataCalendario").find(".ico_calendario13").dpClose();
						}
						else {
							$(this).closest(".campos_form").removeClass("form_erro")
									.find(".erro_msg").html("<strong></strong>");
							if (bErroAnterior)
								$(this).closest(".dataCalendario").find(".ico_calendario13").dpClose();
						}
					}
				});

			$("body").bind("focus click", function(e){
			
				if (!($(e.target).closest("#calendario").length || /mes13|ano13|icoCalendario13/g.test(e.target.className))) {
					end();
				}
			});

			$calendario.find("td").click(function(){
                if (!$(this).find("a").is(".disabled")) {
                    $td = $(this);
                    $table.find(":text:first").val($td.attr("class"));
                    $table.find(":text:last").val($calendario.find(".ano").text());
                    $("body").click();
                }
			});

			$calendario.find("a.voltar").click(function(){
				ponteiro(this, 0);
			});

			$calendario.find("a.avancar").click(function(){
				ponteiro(this, 1);
			});
            
            function aceitaMais12(elMes) {
                var attrAceitaMais12 = elMes.attr("aceitaMais12");
                var temMesesEsp = false;
                if (attrAceitaMais12 != "") {
                    temMesesEsp = eval(attrAceitaMais12);
                }
                return temMesesEsp;
            }

			function ponteiro(obj, attr){
                if (!$(obj).is(".disabled")) {
                    var ano = parseInt($calendario.find(".ano").text(),10);
                    attr ? ano++ : ano--;
                    $calendario.find(".ano").text(ano);
                    setVisibility(ano);
					
					//var inputMes = $table.find(":text:first").val();
					var inputAno = $table.find(":text:last").val();
					$calendario.find("td a").removeClass("sel");
					if(ano == parseInt(inputAno)){
						$calendario.find("td:eq(" + mes + ") a").addClass("sel");
					}
                }
			};
            function setVisibility(anoExibido) {
                if (anoExibido <= startDate.getFullYear()) {
                    $calendario.find(".voltar").addClass("disabled");
                } else {
                    $calendario.find(".voltar").removeClass("disabled");
                }
                if (anoExibido >= endDate.getFullYear()) {
                    $calendario.find(".avancar").addClass("disabled");
                } else {
                    $calendario.find(".avancar").removeClass("disabled");
                }
                for (i = 0; i < 12; i++) {
                    var mesRef = anoExibido * 100 + i;
                    if (mesRef < mesIni || mesRef > mesFim) {
                        $calendario.find("td:eq(" + i + ") a").addClass("disabled");
                        $calendario.find("td:eq(" + i + ") a").removeClass("sel");
                    } else {
                        $calendario.find("td:eq(" + i + ") a").removeClass("disabled");
                    }
                }
            }
			function display($obj) {
				var inputMes = $table.find(":text:first");
				var inputAno = $table.find(":text:last");
				$table = $obj.closest("table");
				visible = true;
				if(parseInt($table.find(":text:first").val(),10) != 1) {
					mes = parseInt($table.find(":text:first").val(),10) - 1 || mes;
                    if (aceitaMais12(inputMes) && mes > 11) {
                        mes = 11;
                    }
                } else
					mes = 0;
				ano = parseInt($table.find(":text:last").val(),10) || ano;
				
				var offset = $table.find(".icoCalendario13").offset();

				$calendario.find("td a").removeClass("sel");
				$calendario.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario.find(".ano").text(ano);
                setVisibility(ano);
				
				
				if (inputMes.val() == "" || inputAno.val()  == "" || inputMes.hasClass("erro_input") || inputAno.hasClass("erro_input")){
					
					$calendario.find("td a").removeClass("sel");
					var atual = new Date();
					mes = parseInt(atual.getDate());
					ano = parseInt(atual.getFullYear());
					$calendario.find(".ano").text(ano);
					setVisibility(ano);
				}
					
				$calendario.css({
					top: offset.top,
					left: offset.left
				}).show();
			}
			
            function setStartDate(data) {
                if (data) {
                    startDate = Date.fromString("01/" + data);
                }
                if (!startDate) {
                    startDate = Date.fromString("01/01/1970");
                }
                mesIni = startDate.getFullYear() * 100 + startDate.getMonth();
            }
            function setEndDate(data) {
                if (data) {
                    endDate = Date.fromString("01/" + data);
                }
                if (!endDate) {
                    endDate = Date.fromString("31/12/2999");
                }
                if (endDate.getTime() < startDate.getTime()) {
                    endDate = startDate;
                }
                mesFim = endDate.getFullYear() * 100 + endDate.getMonth();
            }
			function init($obj) {
				load = true;
    			var dataInicial = $obj.closest(".dataCalendario").find(".dataInicial").val();
    			var dataFinal = $obj.closest(".dataCalendario").find(".dataFinal").val();
   				setStartDate(dataInicial);
   				setEndDate(dataFinal);
				$table = $obj.closest("table");

/*
*		INSERIDO MAIS UMA LINHA NA TABELA P/ O CAMPO DO 13º MÊS
*/				
				var calendarioHtml = '\
								<div class="topo after">\
									<a class="voltar" href="javascript:;" title="Voltar">Voltar</a>\
									<span class="ano">' + ano + '</span>\
									<a class="avancar" href="javascript:;" title="Avançar">Avançar</a>\
								</div>\
								<table>\
									<colgroup>\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
										<col width="20" />\
									</colgroup>\
									<tbody>\
									<tr>\
									<td class="01">\
										<a href="javascript:;" title="Janeiro">\
											<abbr lang="pt-br" title="Janeiro">Jan</abbr>\
										</a>\
									</td>\
									<td class="02">\
										<a href="javascript:;" title="Fevereiro">\
											<abbr lang="pt-br" title="Fevereiro">Fev</abbr>\
										</a>\
									</td>\
									<td class="03">\
										<a href="javascript:;" title="Março">\
											<abbr lang="pt-br" title="Março">Mar</abbr>\
										</a>\
									</td>\
									<td class="04">\
										<a href="javascript:;" title="Abril">\
											<abbr lang="pt-br" title="Abril">Abr</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="05">\
										<a href="javascript:;" title="Maio">\
											<abbr lang="pt-br" title="Maio">Mai</abbr>\
										</a>\
									</td>\
									<td class="06">\
										<a href="javascript:;" title="Junho">\
											<abbr lang="pt-br" title="Junho">Jun</abbr>\
										</a>\
									</td>\
									<td class="07">\
										<a href="javascript:;" title="Julho">\
											<abbr lang="pt-br" title="Julho">Jul</abbr>\
										</a>\
									</td>\
									<td class="08">\
										<a href="javascript:;" title="Agosto">\
											<abbr lang="pt-br" title="Agosto">Ago</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="09">\
										<a href="javascript:;" title="Setembro">\
											<abbr lang="pt-br" title="Setembro">Set</abbr>\
										</a>\
									</td>\
									<td class="10">\
										<a href="javascript:;" title="Outubro">\
											<abbr lang="pt-br" title="Outubro">Out</abbr>\
										</a>\
									</td>\
									<td class="11">\
										<a href="javascript:;" title="Novembro">\
											<abbr lang="pt-br" title="Novembro">Nov</abbr>\
										</a>\
									</td>\
									<td class="12">\
										<a href="javascript:;" title="Dezembro">\
											<abbr lang="pt-br" title="Dezembro">Dez</abbr>\
										</a>\
									</td>\
									</tr>\
									<tr>\
									<td class="13" colspan="4" style="text-align:center">\
										<a href="javascript:;" title="13º mês">\
											<abbr lang="pt-br" title="13º mês">13º mês</abbr>\
										</a>\
									</td>\
									</tr>\
									</tbody>\
								</table>';
						
				$calendario = $("<div id=\"calendario\" class=\"calendario\"></div>");
				$calendario.append(calendarioHtml);
				$calendario.find("td a").removeClass("sel");
				$calendario.find("td:eq(" + mes + ") a").addClass("sel");
				$calendario.find(".ano").text(ano);
                setVisibility(ano);
				$("body").append($calendario);
			}

			function end() {
				$calendario.hide();
				visible = false;
			}
		});
	};	
	
})(jQuery);


