//Sequencia para o teclado virtual
var teclado;
var executarNoInicio = true;
var ajaxTimeOut = 100000;
var ultimoTitularSelecionado;
var valorDigitado;
$(window).load(function() {
    // Limpa a senha de 4 quando se clicar no checkbox de titulares

   // Inicia mostrando a primeira e ultima linha do box da direita
   if (executarNoInicio) {
       mostraBoxDireita();
       executarNoInicio = false;
   }
   ajustaAltura();
   $('.mioloFs12 ').removeClass('mioloFs12').addClass('miolo_noBg');

//    teclado = new TecladoVirtual(sequenciaTeclado, function() {
//      autenticarDispositivoAtual(this.senha);
//   });

//   if (flagTitularUnico) {
// processarHda(pametrosHdaSenha4UnicoTitular);
//   } else {
//      processarHda(pametrosHdaSelecaoMultiplosTitulares);
//   }
});



function obterParametrosAjaxAutenticacaoDispositivoAtual(valorEntrada) {

//   var cadastraFraseSecreta = 0;
//   try {
//        cadastraFraseSecreta = isCadastroFraseSecreta ();
//   } catch (error) {
//        cadastraFraseSecreta = 0;
//   }

//   if (cadastraFraseSecreta == 0) {
        if (typeof valorEntrada == 'undefined') {
            // Obt�m o valor de envio
            camposEnvio = jQuery(':password:enabled');
            valorDigitado = '';
            camposEnvio.each(function(index) {
                thisObj = jQuery(this);
                valorDigitado += thisObj.val();
            });
        } else {
            valorDigitado = valorEntrada;
        }

        // Criptografa o dado de envio
        jQuery('#form_cript\\:valor_dig').val(valorDigitado);
        enc_form_cript();
        var dadoCriptografado = jQuery('#form_cript\\:valor_cript').val();

        // Obten��o dos dados do plugin de seguran�a
        var aux;
        var infPlugSeg = "";
        var dynId = "";
        var bhoList = "";
//        if (netExpress3) {
//    		var comp = document.getElementById("Conexao");
//    		if (comp != null && typeof(comp) != "undefined") {
//    	        aux = comp.CompVersion;
//    	        if (typeof(aux) != "undefined" && aux != "undefined") {
//    	            infPlugSeg = aux;
//    	        }
//    	        if(typeof(comp.GetId) != 'undefined') {
//    	            aux = comp.GetId(numControle);
//    				if (typeof(aux) != "undefined" && aux != "undefined") {
//    					dynId = aux;
//    				} else {
//    					dynId = "undefined";
//    				}
//    	        }
//    	        if(typeof(comp.GetAInfo) != 'undefined') {
//    	            aux = comp.GetAInfo(numControle);
//    				if (typeof(aux) != "undefined" && aux != "undefined") {
//    					bhoList = aux;
//    				} else {
//    					bhoList = "undefined";
//    				}
//    	        }
//    		}
//        } else {
            if(VrfComp("Conexao")) {
                aux = document.applets["Conexao"].CompVersion;
                if (typeof(aux) != "undefined" && aux != "undefined") {
                    infPlugSeg = aux;
                }
                if(typeof(document.applets["Conexao"].GetId) != 'undefined') {
                    aux = document.applets["Conexao"].GetId(numControle);
                    if (typeof(aux) != "undefined" && aux != "undefined") {
                        dynId = aux;
                    } else {
                        dynId = "undefined";
                    }
                }
                if(typeof(document.applets["Conexao"].GetAInfo) != 'undefined') {
                    aux = document.applets["Conexao"].GetAInfo(numControle);
                    if (typeof(aux) != "undefined" && aux != "undefined") {
                        bhoList = aux;
                    } else {
                    	bhoList = "undefined";
                    }
                }
            }
//        }

        var dynIdJ = jQuery('#form_titular\\:idMaquinaApplet').val();

		return {'form_titular:titular': obterTitularSelecionado(), 'form_cript:valor_cript': dadoCriptografado, 'infPlugSeg': infPlugSeg, 'dynId': dynId, 'bhoList' : bhoList, 'dynIdJ': dynIdJ};
//   }
//   else
//   {
//      var primeiroParametro = 1;
//      var stringParametrosEnvio = "({";
//      if (typeof valorEntrada != 'undefined' && valorEntrada.length <= 4) {
//            // Tratamento de input de senha
//            stringParametrosEnvio += "'form_cript:valor_cript': '" + criptografarParametroEnvio(valorEntrada) + "'});";
//            ultimaSenhaDigitada = valorEntrada;
//      } else {
//        // Tratamento da �ltima senha digitada
//            if (typeof valorEntrada != 'undefined') {
//                // Tratamento de input de senha
//                stringParametrosEnvio += "'form_cript_ajax:valor_cript': '" + criptografarParametroEnvio(valorEntrada) + "'";
//                ultimaSenhaDigitada = valorEntrada;
//                primeiroParametro = 0;
//            } else if (typeof ultimaSenhaDigitada != 'undefined' && ultimaSenhaDigitada.length > 4) {
//                stringParametrosEnvio += "'form_cript_ajax:valor_cript': '" + criptografarParametroEnvio(ultimaSenhaDigitada) + "'";
//                primeiroParametro = 0;
//            }
//            // Tratamento de campos de formul�rio
//            camposEnvio = jQuery('.cadfrase');
//            camposEnvio.each(function(index) {
//                var thisObj = jQuery(this);
//
//
//                if (primeiroParametro == 0) {
//                    stringParametrosEnvio += ", ";
//                } else {
//                    primeiroParametro = 0;
//                }
//
//                stringParametrosEnvio += "'form_cript_ajax:" + thisObj.attr('name').substring(thisObj.attr('name').lastIndexOf(':') + 1) + "': '";
//                if (thisObj.hasClass('ajaxCript')) {
//                    stringParametrosEnvio += criptografarParametroEnvio(thisObj.val()) + "'";
//                } else {
//                    stringParametrosEnvio += thisObj.val() + "'";
//                }
//            });
//            stringParametrosEnvio += "});";
//      }
//      return eval(stringParametrosEnvio);
//   }
}

function criptografarParametroEnvio(valorParametro) {
   // Criptografa o dado de envio
   $('#form_cript\\:valor_dig').val(valorParametro);
   enc_form_cript();
   return $('#form_cript\\:valor_cript').val();
}


function obterTitularSelecionado() {
   radioTitularSelecionado = $('#form_titular :radio:checked');
   if (radioTitularSelecionado.size() <= 0) {
      // Sem radio de sele��o de titular ou titular n�o selecionado
      if (typeof ultimoTitularSelecionado == 'undefined') {
         ultimoTitularSelecionado = 1;
      }
   } else {
      // Obt�m o valor do titular selecionado
      ultimoTitularSelecionado = radioTitularSelecionado.val();
   }
   return ultimoTitularSelecionado;
}

function obterParametrosAjaxProcessarAceiteAtual(valorAceite) {
   return {'aceite': valorAceite};
}

// definido no jps var sequenciaProximoDispositivo = ${(IDENTIFICATION_BACKING.qtdTitular > 1)?3:2};
function obterParametrosAjaxProximoDispositivo() {
   return {'form_titular:titular': obterTitularSelecionado(), 'sequenciaProximoDispositivo': sequenciaProximoDispositivo};
}

function obterParametrosAjaxVerifPlugSeg(versionPlugSeg, infPlugSeg, dynId, bhoList, dynIdJ) {
   return {'versionPlugSeg': versionPlugSeg, 'infPlugSeg': infPlugSeg, 'dynId': dynId, 'bhoList' : bhoList, 'dynIdJ': dynIdJ};
}

function avancar(valorAceite) {
   // Valida��o de titular selecionado
//   if (typeof valorAceite == 'undefined') {
//	   var radioTitulares = $('#form_titular :radio:enabled');
//	   if (radioTitulares.size() > 1 && radioTitulares.filter(':checked').size() == 0) {
//	      exibirMensagemErroForm($('.erro_msg:first'));
//	      return false;
//	   }
//   }
//   if(teclado.isHabilitado()) {
//       teclado.submit();
//   }
//   else
   {
   // Obt�m o ajaxForm a ser processado
   var ajaxForm;
       if ((respAutenticacaoDispAtual != null && typeof respAutenticacaoDispAtual != 'undefined')
               && respAutenticacaoDispAtual.formaExibicaoProximaSequencia == 2) {
      ajaxForm = $('#modalContent .ajaxForm:last');
   } else {
      ajaxForm = $('.ajaxForm:last');
   }



   // Processamento de aceite e autentica��o de dispositivo
   if (ajaxForm.filter('.processarAceite').size() > 0) { // � um form de aceite
      // Verifica se houve sele��o do aceite
      if (typeof valorAceite == 'undefined') {
         exibirMensagemErroForm();
      } else {
         processarAceiteAtual(valorAceite);
      }
   } else {
	   // � um form de dispositivo de autentica��o
      // Verifica se o dispositivo atual permite submiss�o do formul�rio
      if (ajaxForm.filter('.allowSubmit').size() > 0) {
         autenticarDispositivoAtual();
      }
       }
   }
   return false;
}

function sanitizedHTMLText(str) {
   var $decoderEl = $('<textarea />');
   str = $decoderEl.html(str).text().replace(/<br((\/)|( \/))?>/gi, "\r\n");
   $decoderEl.remove();
   return str;
}