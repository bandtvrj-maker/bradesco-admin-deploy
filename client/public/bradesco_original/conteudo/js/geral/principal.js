// PRINCIPAL.HTML
var browserName;
var browserVersion;
var alturaAtualFrame = 0;
var alturaAtualModal = 0;
var numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura = 0;
var numeroDeVezesAutoModalExecutadoSemAlteracaoAltura = 0;
var modalInicializado = false;
var modalSemMargemInicializado = false;
var modalSemMargemJaAbertoParaCliente = false;

function log(msg) {
//	jQuery("#log").append(msg + "<br/>");
}

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).            
function getVersaoInternetExplorer()
{
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
	var ua = navigator.userAgent;
	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null)
		rv = parseFloat( RegExp.$1 );
	}
	return rv;
}
			
function identificarBrowser() {
	var ua = navigator.userAgent.toLowerCase();
	if ( ua.indexOf( "opera" ) != -1 ) {
		browserName = "opera";
	} else if ( ua.indexOf( "msie" ) != -1 ) {
		browserName = "msie";
		browserVersion = getVersaoInternetExplorer();
	} else if ( ua.indexOf( "safari" ) != -1 ) {
		browserName = "safari";
	} else if ( ua.indexOf( "mozilla" ) != -1 ) {
		if ( ua.indexOf( "firefox" ) != -1 ) {
			browserName = "firefox";
		} else {
			browserName = "mozilla";
		}
	}
}
identificarBrowser();

function f_clientWidth() {
	return f_filterResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}

function f_clientHeight() {
	return f_filterResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}

function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}

function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}

function obtemLarguraIframe(idDoIframeSerRedimensionado) {
	var frame = document.getElementById(idDoIframeSerRedimensionado);
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;
	var width = 0;
	var widthItensFlutuantes = 0;
	var allTags;

	if(browserName == "msie") {

		width = frameDoc.body.scrollWidth;

	} else {

		allTags = frameDoc.getElementsByTagName('div');
		for (var tg = 0; tg < allTags.length; tg++)
		{
			tag = allTags[tg];
			if (width < (tag.offsetLeft + tag.scrollWidth)) {
				width = tag.offsetLeft + tag.scrollWidth;
			}

		}
	}

	if (widthItensFlutuantes > width) {
		width = widthItensFlutuantes;
	}

	return width;
}

function obtemAlturaIframe2(idDoIframeSerRedimensionado) {
	var frame = document.getElementById(idDoIframeSerRedimensionado);
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;
	var height = 0;
	var heightItensFlutuantes = 0;
	var allTags;

	if(browserName == "msie") {
		height = frameDoc.body.scrollHeight;
	} else {
		allTags = frameDoc.getElementsByTagName('div');
		for (var tg = 0; tg < allTags.length; tg++) {
			tag = allTags[tg];
			if (height < (tag.offsetTop + tag.scrollHeight)) {
				height = tag.offsetTop + tag.scrollHeight;
			}
		}
	}
	if (heightItensFlutuantes > height) {
		height = heightItensFlutuantes;
	}

	return height;
}

function myArrayMerge(array1, array2) {
    var retorno = [];
    if (array1 != null) {
        for (var i = 0; i < array1.length; i++) {
            retorno.push(array1[i]);
        }
    }
    if (array2 != null) {
        for (var i = 0; i < array2.length; i++) {
            retorno.push(array2[i]);
        }
    }
    return retorno;
}

function obtemAlturaIframe(idDoIframeSerRedimensionado) {
	var frame = document.getElementById(idDoIframeSerRedimensionado);
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;
	var height = 0;
	var heightItensFlutuantes = 0;
	var allTags;

	if(browserName == "msie") {
		//allTags = frameDoc.getElementsByTagName("div");
        allTags = myArrayMerge(frameDoc.getElementsByTagName("div"), frameDoc.getElementsByTagName("body"));
		for (var tg = 0; tg < allTags.length; tg++) {
			tag = allTags[tg];
			if (tag.scrollHeight > height) {
				height = tag.scrollHeight;
			}
			if (tag.className == "dp-popup") {
				if (heightItensFlutuantes < tag.offsetTop + tag.scrollHeight + 25) {
					heightItensFlutuantes = tag.offsetTop + tag.scrollHeight + 25;
				}
			}
		}
	} else {
		allTags = frameDoc.getElementsByTagName('html');
		for (var tg = 0; tg < allTags.length; tg++)
		{
			tag = allTags[tg];
		//if (browserName == "safari" || browserName == "opera") { // APRESENTOU PROBLEMA NA INICIALIZACAO TELA INICIAL JIRA-7730
			if (browserName == "safari") {
				height = tag.offsetTop + tag.scrollHeight;
			} else {
				height = tag.offsetTop + tag.offsetHeight;
			}
		}
		allTags = frameDoc.getElementsByClassName('dp-popup');
		for (var tg = 0; tg < allTags.length; tg++)
		{
			tag = allTags[tg];
			if (heightItensFlutuantes < tag.offsetTop + tag.scrollHeight + 25) {
				heightItensFlutuantes = tag.offsetTop + tag.scrollHeight + 25;
			}
		}
	}

	if (heightItensFlutuantes > height) {
		height = heightItensFlutuantes;
	}
	if (height == 0) {
		height = obtemAlturaIframe2(idDoIframeSerRedimensionado);
	}
	return height;
}

var filaAnimacaoPaginaCentral = new Array();
var isAnimacaoPaginaCentral = false;
var lastAnimaPaginaCentralHeight = 0;

function _obterPaginaCentralAlturaReal() {
	var retorno = 0;
	try {
		var frame = document.getElementById("paginaCentral");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		var altura = frameStyle.height;
		altura.replace("px", "");
		retorno = parseInt(altura, 10);
		if (isNaN(retorno)) {
			retorno = 0;
		}
	} catch (err) {
		log("obterPaginaCentralAlturaReal: " + err.message);
	}
	return retorno; 
}

function _forcarPaginaCentralAltura(altura) {
	try {
		var frame = document.getElementById("paginaCentral");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		frameStyle.height = altura + "px";
	} catch (err) {
		log("forcarPaginaCentralAltura: " + err.message);
	}
}

function _animaPaginaCentral() {

	$ = jQuery;

	if (lastAnimaPaginaCentralHeight != 0) {
		//verificar ultima tentativa
		var alturaReal = _obterPaginaCentralAlturaReal();
		if (alturaReal != lastAnimaPaginaCentralHeight) {
			//tentar forçar altura primeiro
			_forcarPaginaCentralAltura(lastAnimaPaginaCentralHeight);
			//tentar novamente com animacao para nao ficar muito rapido
			filaAnimacaoPaginaCentral.push([lastAnimaPaginaCentralHeight, true]);
			log("_animaPaginaCentral: falha:" + lastAnimaPaginaCentralHeight);
		}
	}
	var tam = filaAnimacaoPaginaCentral.pop();
	if (typeof(tam) != "undefined") {
		if (tam[1]) { //animação.
			$("#paginaCentral").animate({height: tam[0] + "px"}, 500, 'linear', _animaPaginaCentral);
		} else {
			$("#paginaCentral").animate({height: tam[0] + "px"}, 1, 'linear', _animaPaginaCentral);
		}
		lastAnimaPaginaCentralHeight = tam[0];
		log("_animaPaginaCentral: " + tam[0]);
	} else {
		log("_animaPaginaCentral: " + "fim");
		isAnimacaoPaginaCentral = false;
		lastAnimaPaginaCentralHeight = 0;
	}
}

function animaPaginaCentral(altura, animacao) {
	var retorno = true;
	var alturaVerif = alturaAtualFrame;
	if (!isAnimacaoPaginaCentral) {
		alturaVerif = _obterPaginaCentralAlturaReal();
		if (alturaAtualFrame != alturaVerif) {
			log("animaPaginaCentral: var(" + alturaAtualFrame + "), real(" + alturaVerif + ")");
		}
	}
	if (altura != alturaVerif) {
		filaAnimacaoPaginaCentral.unshift([altura, animacao]);
		alturaAtualFrame = altura;
		if(!isAnimacaoPaginaCentral) {
			isAnimacaoPaginaCentral = true;
			//nao está na sequência de animação. Iniciar.
			_animaPaginaCentral();
		}
	} else {
		//já está animando para altura igual
		retorno = false;
	}
	return retorno;
}

function autoIframe() {
	try {
		var frame = document.getElementById("paginaCentral");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		var height;

		height = obtemAlturaIframe("paginaCentral");

		log("autoIframe: " + height);
		if (animaPaginaCentral(height, true)) {
			numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura = 0;
		}
		else
		{
			numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura++;
		}

		if (numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura < 4)
		{
			return 1;
		}

		return 0;
	} catch (err) {
		log("autoIframe: " + err.message);
		return 0; //intrrompe
	}
}

function ajustaAlturaMiolo() {
// Ajuste de altura do miolo quando termina a carga do menu lateral
	try {
		var frame = document.getElementById("paginaCentral");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		var l;				
		l = jQuery('#lateral').outerHeight();
		var c = jQuery("#paginaCentral").contents().find("#conteudo").outerHeight();
		var i = jQuery("#paginaCentral").contents().find('#conteudo .topo').height() 
					+ jQuery("#paginaCentral").contents().find('#conteudo .base').height();
		l = l - (i + 10);
		if (typeof frameStyle.maxHeight === "undefined") {
			if (c < l) {
				jQuery("#paginaCentral").contents().find('#conteudo .miolo:first').css('height', (l) + "px");
			}
		} else {
			jQuery("#paginaCentral").contents().find('#conteudo .miolo:first').css('min-height', (l) + "px");
		}
		autoIframe();
	} catch (err) {
	}
}

function iframeInlineInic() {
	var frame = document.getElementById("paginaCentral");
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;

	var maxHeight = obtemAlturaIframe("paginaCentral");
	var height = maxHeight;
	log("iframeInlineInic: " + height)
	animaPaginaCentral(height, false);
}

function autoIframePostit() {
	var frame = document.getElementById("postit");
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;
	var height;

	height = obtemAlturaIframe("postit")-20;

	if (alturaAtualFramePostit != height) {
		alturaAtualFramePostit = height;
		numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura = 0;
		jQuery("#postit").animate({height: alturaAtualFramePostit + "px"}, 500);
	}
	else
	{
		numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura++;
	}

	if (numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura < 4)
	{
		return 1;
	}

	return 0;
}

function autoIframeInicializacao() {
	try {
		var frame = document.getElementById("paginaCentral");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;

		var maxHeight = obtemAlturaIframe("paginaCentral");
		var height = maxHeight;
		log("autoIframeInicializacao: " + height)
		animaPaginaCentral(height, false);
		
		// ADICIONAMOS EVENTO NO BOTÃO AVANÇAR PARA REDIMENSIONAR TELA (CASO OCORRA ERRO DE VALIDAÇÃO DE CAMPOS)

		var allTags = frameDoc.body.getElementsByTagName('*');
		var calculatedHeight = 0;
		for (var tg = 0; tg < allTags.length; tg++)
		{
			var tag = allTags[tg];
			calculatedHeight = tag.offsetTop + tag.scrollHeight;
			if (calculatedHeight > maxHeight)
			{
				maxHeight = calculatedHeight;
			}

			var comandoResizeInjecao =
				'var funcaoRedimensionamento = function() { continuaResize=window.parent.autoIframe(); if(continuaResize==1) { setTimeout(funcaoRedimensionamento, 750); } };' +
				'if (window.parent && window.parent.autoIframe) {' +
				'    window.parent.numeroDeVezesAutoIframeExecutadoSemAlteracaoAltura=0;' +
				'    var continuaResize=window.parent.autoIframe();' +
				'    setTimeout(funcaoRedimensionamento, 750);' +
				'}';

			if (tag.className.indexOf('btnAvancar') >= 0
				|| tag.className.indexOf('bt_avancar') >= 0
                || tag.className.indexOf('bt_confirmar') >= 0
				|| tag.className.indexOf('listaAbreFecha') >= 0
				|| tag.className.indexOf('accessTools') >= 0
				|| tag.className.indexOf('zoomOutFont') >= 0
				|| tag.className.indexOf('zoomInFont') >= 0
				|| tag.className.indexOf('btn-fechar') >= 0
				|| tag.className.indexOf('tp2') >= 0
				|| tag.className.indexOf('tp3') >= 0
				|| tag.className.indexOf('tp4') >= 0
				|| tag.className.indexOf('btn_horarios_limites') >= 0
				|| tag.id.indexOf('btn_ajuda') >= 0
				|| tag.className.indexOf('btn_collapse') >= 0
                || tag.className.indexOf('ne-tabela-expansivel') >= 0
                || tag.className.indexOf('click') >= 0

			)
			{
				if(tag.addEventListener) { // Standard
					tag.addEventListener('click', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					}, false);
				} else if(frameDoc.body.attachEvent) { // IE
					tag.attachEvent('onclick', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					});
				} else {
					//return false;
				}
			}

			if (tag.className.indexOf('dia') >= 0
				|| tag.className.indexOf('mes') >= 0
				|| tag.className.indexOf('ano') >= 0
				|| tag.className.indexOf('ico_calendario') >= 0
			)
			{
				if(tag.addEventListener) { // Standard
					tag.addEventListener('click', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					}, false);
					tag.addEventListener('blur', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					}, true);
					tag.addEventListener('keyup', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					}, true);
				} else if(frameDoc.body.attachEvent) { // IE
					tag.attachEvent('onclick', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					});
					tag.attachEvent('onblur', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					});
					tag.attachEvent('onkeyup', function listenerKeyUp( e ) {
						setTimeout(comandoResizeInjecao, 750);
					});
				} else {
					//return false;
				}
			}
		}
		window.scrollTo(0, 0);
	}
	catch (err) {
		
	}
}

function autoIframeInicializacaoPostit() {
	try {
		var frame = document.getElementById("postit");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;

		var maxHeight = obtemAlturaIframe("postit")-20;
		var height = maxHeight;
		if (height > 0) {
			frameStyle.height = height + "px";
			alturaAtualFramePostit = height;
			window.parent.ajustaAlturaMiolo();
		}
	}
	catch (err) {
	}
}

function getParametroUrlGet( name ) {
	var valorParametro = "";
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	if (name.toLowerCase() == "ctl" && document.getElementById("ctl") != null && typeof(document.getElementById("ctl")) != "undefined") {
		valorParametro = document.getElementById("ctl").value;
	}
	else {
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results != null ) {
			valorParametro = results[1];
		}
	}
	return valorParametro;
}

function iframeApresentarNovaPagina( url ) {
	try {
            document.getElementById("paginaCentral").src = url;
    } catch (err) {
		    log("obterPaginaCentral: " + err.message);
	}
}

// SCRIPTS REFERENTES ÀS TELAS MODAIS

var heightIframeModal;
var widthIframeModal;
var loopRedimensionamentoModalEmOperacao = false;

function exibirModalSemMargemInfraEstrutura(iframe) {

	$ = jQuery;
	
	var frame = document.getElementById("modal_infra_estrutura");
	var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
	var frameStyle = (frame.style) ? frame.style : frame;
	
	//if (frameDoc.location != 'about:blank')
	if (modalSemMargemInicializado)
	{

		var bloquearExibicao = false;
		if (typeof modal_infra_estrutura.isBloquearAberturaModal == 'function')
		{
			var retornoFuncaoVerificaBloqueio = modal_infra_estrutura.isBloquearAberturaModal();
			if (retornoFuncaoVerificaBloqueio == true || retornoFuncaoVerificaBloqueio == 'true')
			{
				bloquearExibicao = true;
			}
		}

		if (!bloquearExibicao) {
			
			frame.width='1';
			frame.heigth='1';
			
			$("#div_modal_infra_estrutura_sem_margem").jqm();
			$("#div_modal_infra_estrutura_sem_margem").jqmShow();

			var frameModalDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
			var height = obtemAlturaIframe("modal_infra_estrutura");
			var width = obtemLarguraIframe("modal_infra_estrutura");
			
			var windowWidth = 0;
			var windowHeight = 0;
			if (typeof(window.innerWidth) == 'number') {
				windowWidth = window.innerWidth;
				windowHeight = window.innerHeight;
			}
			else {
				if (document.documentElement && document.documentElement.clientWidth) {
					windowWidth = document.documentElement.clientWidth;
					windowHeight = document.documentElement.clientHeight;
				}
				else {
					if (document.body && document.body.clientWidth) {
						windowWidth = document.body.clientWidth;
						windowHeight = document.body.clientHeight;
					}
				}
			}

			// Posicionamento do modal de acordo com rolagem vertical da tela
			var top = $(document).scrollTop();
			
			var posicaoTopo = 0;

			widthIframeModal = width;
		
			if (windowHeight - height > 50) { // Modal é menor que a tela
				posicaoTopo = top + (windowHeight - height)/2;
				heightIframeModal = height + ((windowHeight - height)/2) + 150;
			} else { // Modal é maior ou quase tamanho da tela
				posicaoTopo = top + 50;
				heightIframeModal = height + 150;
			}

			// Removido pois gera bug de impressão no IE!
			//$(".jqmWindow").css("position","absolute");
			
			$(frame).attr('height', '' + heightIframeModal + 'px');
			$(frame).attr('style', 'height:' + heightIframeModal + 'px;');
            //$(frame).attr('height', '' + height + 'px');
			//$(frame).attr('style', 'height:' + height + 'px;');
			frame.width = widthIframeModal;
			frame.height = heightIframeModal;
			
			$(".jqmWindow").css("top", posicaoTopo + "px");
			$(".jqmWindow").css("left",((windowWidth - width)/2) + "px");
		}
		//return;
		// INJEÇÃO DE EVENTOS, VISANDO REDIMENSIONAR O MODAL
		
		try {
		
			
			
		} catch (err) {
			alert(err.message);
		}
		
	}
}

function autoIframeModal() {

	$ = jQuery;

	try {
	
		var frame = document.getElementById("modal_infra_estrutura");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		var height;

		height = obtemAlturaIframe("modal_infra_estrutura");
		
		if (alturaAtualModal != height) {
        alturaAtualModal = height;
			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura = 0;
			//$("#modal_infra_estrutura").animate({height: alturaAtualModal + "px"}, 500);
			//$("#modal_infra_estrutura").attr('style', 'height:' + alturaAtualModal + "px");
			
			
            jQuery(frame).animate({height: alturaAtualModal + "px"}, 500);
            //jQuery(frame).attr('height', '' + alturaAtualModal + 'px');
			//jQuery(frame).attr('style', 'height:' + alturaAtualModal + "px");
            //jQuery(frame).transition({ y: + alturaAtualModal + 'px'})
            //jQuery(frame).attr('style', 'height:' + alturaAtualModal + 'px;');
			//frame.height = alturaAtualModal;
		}
		else
		{
			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura++;
		}

		if (numeroDeVezesAutoModalExecutadoSemAlteracaoAltura < 11)
		{
			return 1;
		}

		loopRedimensionamentoModalEmOperacao = true;
		
		return 0;
		
	} catch (err) {
		return 0; //intrrompe
	}
}

function autoIframeModalImmediate() {
	$ = jQuery;
	try {	
		var frame = document.getElementById("modal_infra_estrutura");
		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		var frameStyle = (frame.style) ? frame.style : frame;
		var height;

		height = obtemAlturaIframe("modal_infra_estrutura");
		
		if (alturaAtualModal != height) {
        alturaAtualModal = height;
			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura = 0;
            jQuery(frame).animate({height: alturaAtualModal + "px"}, 0);
		} else {
			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura++;
		}

		if (numeroDeVezesAutoModalExecutadoSemAlteracaoAltura < 11) {
			return 1;
		}
		loopRedimensionamentoModalEmOperacao = true;		
		return 0;		
	} catch (err) {
		return 0; //intrrompe
	}
}


function fecharModalInfraEstrutura() {

	$ = jQuery;

	var modal = $("#div_modal_infra_estrutura");
	if (modal.length > 0) {
		modal.jqmHide();
	}
	var modalSemMargem = $("#div_modal_infra_estrutura_sem_margem");
	if (modalSemMargem.length > 0) {
		modalSemMargem.jqmHide();
	}
	
	if (modal_infra_estrutura.modalFechado) {
		modal_infra_estrutura.modalFechado();
	}
}

/* Código antigo, aparentemente não utilizado*/
var auxModalFrameStyle;
var auxModalHeight;
var retrySetModalIFrameHeight = 0;

function setModalIframeHeight() {
	var alturaAtualReal = auxModalFrameStyle.height;
	if (retrySetModalIFrameHeight < 20 && alturaAtualReal != "" && alturaAtualReal != alturaAtualModal + "px") {
		//altura nao confere, esta no meio de animacao, postergar ajuste de altura.
		retrySetModalIFrameHeight++;
		setTimeout("setIframeHeight()", 50);
	} else {
		retrySetModalIFrameHeight = 0;
		auxModalFrameStyle.height = auxModalHeight + "px";
		alturaAtualModal = auxModalHeight;
	}
}


var retryModalIFrameHeight = 0;

function inicializarIFrameModalInfraEstrutura(iframe) {
	retryModalIFrameHeight = 0;
	if (modalSemMargemInicializado) {
		if(retryModalIFrameHeight < 4) {
			setTimeout(function() {
				retryModalIFrameHeight++;
				exibirModalSemMargemInfraEstrutura(iframe);
			}, 500);
		}
	}
	modalSemMargemInicializado=true;
}

// FIM - PRINCIPAL.HTML


// INICIO - HDA

//		hdaAtivado = false;
//		hdaPosicao = 2;
//		hdaPosicaoPreModal = 2;
//		hdaVisivel = false;
//		hdaVisivelPreModal = false;
var hdaEventoInicialEnviado = false;
var hdaInicializado = false;
var parametrosInicial = '';
//var parametrosCashe = '';
//var eventoCashe = '';

function personalizarApelidoHDA() {
	document.getElementById('botaoPersonalizarApelidoHDA').onclick();
}

function inicializarFiltroHDA() {
	var filtroHDA = document.getElementById('filtroHDA').value;
	atualizarFiltroHDA(filtroHDA);
}

function atualizarFiltroHDA(filtroHDA) {

	if (filtroHDA == 'S') {
		hdaAtivado = true;
	} else {
		hdaAtivado = false;
	}

	if (hdaAtivado && !hdaInicializado) {
		try {
			HDAInterface.start();
		}
		catch(e) {
			jQuery(".hdaMenuLateral").css("display", "none");
			jQuery(".hdaMenuLateral").css("height","0px");
		}
		hdaInicializado = true;
	}
}

function executarEventoHDAInicial(parametros) {
	var parametrosHDA = (typeof(parametros) != "undefined") ? parametros : document.getElementById('parametrosHDA').value;
	if (!hdaEventoInicialEnviado) {
		parametrosInicial = parametrosHDA;
		var produtoHDA = "" + top.frames["paginaCentral"].produtoHDATelaVendas;
		if (produtoHDA != "undefined" && produtoHDA != "null") {
			parametrosInicial = parametrosInicial.replace("hdaProdutoVN=0", "hdaProdutoVN=" + produtoHDA);
		}
		executarEventoHDA("n_2-0_recebe_dadosIB", parametrosInicial);
		hdaEventoInicialEnviado = true;
	}
	else {
		executarEventoHDA("r_2-33_verifica_apre_ofertas", "");
	}
}
// FIM - HDA

// INICIO - SITE A SITE
function desbloquearSiteSite() {
	if(document.getElementById('siteHeader1')) {
		document.getElementById('siteHeader1').style.display = "none";
	}
	if(document.getElementById('siteHeader2')) {
		document.getElementById('siteHeader2').style.display = "none";
	}
	if(document.getElementById('siteMenuLateral')) {
		document.getElementById('siteMenuLateral').style.display = "none";
	}
	if(document.getElementById('siteRodape')) {
		document.getElementById('siteRodape').style.display = "none";
	}
}

function verificarSiteSite() {
	var siteSite = document.getElementById("siteSite").value;
	var paginaInicial = document.getElementById("urlInicial").value;
	if (siteSite == "true" && paginaInicial == "") {
		desbloquearSiteSite();
	}
}

//Volta a estrutura pagina inicial para a do legado.
/*jQuery(window).load(function(){
	jQuery('.listaMenuPrincipal_sop li').click(function(){
		//console.log('teste');
	});

    jQuery('.listaMenuPrincipal_sop li').click(function(){
        desativarFacelift();
    });
});*/

/*sequencia passos*/
function fnStep(numTotPassos, passo){
    var tamanho = 100 / numTotPassos;
    tamanho = tamanho * passo;
    tamanho = tamanho + '%'
    jQuery('.js-progress-step').animate({width: tamanho+'%'})
}
// FIM - SITE A SITE

//function autoIframeModal() {
//
//	$ = jQuery;
//
//	try {
//	
//		var frame = document.getElementById("modal_infra_estrutura");
//		var frameDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
//		var frameStyle = (frame.style) ? frame.style : frame;
//		var height;
//
//		height = obtemAlturaIframe("modal_infra_estrutura");
//		
//		if (alturaAtualModal != height) {
//			alturaAtualModal = height;
//			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura = 0;
//			
//			$(frame).attr('height', '' + alturaAtualModal + 'px');
//			$(frame).attr('style', 'height:' + alturaAtualModal + 'px;');
//			frame.height = alturaAtualModal;
//		}
//		else
//		{
//			numeroDeVezesAutoModalExecutadoSemAlteracaoAltura++;
//		}
//
//		if (numeroDeVezesAutoModalExecutadoSemAlteracaoAltura < 11)
//		{
//			return 1;
//		}
//
//		loopRedimensionamentoModalEmOperacao = false;
//		
//		return 0;
//		
//	} catch (err) {
//		return 0; //intrrompe
//	}
//}
//
//$(function(){
//// Append an iFrame to the page.
//	var iframe = $("#paginaCentral");
//// Called once the Iframe's content is loaded.
//iframe.load(function(){
//	// The Iframe's child page BODY element.
//	var iframe_content = iframe.contents().find('body');
// 
//	// Bind the resize event. When the iframe's size changes, update its height as
//	// well as the corresponding info div.
//	iframe_content.resize(function(){
//	var elem = $(this);
//	// Resize the IFrame.
//	iframe.css({ height: elem.outerHeight( true ) });
// 
//});
//	// Resize the Iframe and update the info div immediately.
//	iframe_content.resize();
//});
//
//});
//
///*
// * jQuery resize event - v1.1 - 3/14/2010
// * http://benalman.com/projects/jquery-resize-plugin/
// * 
// * Copyright (c) 2010 "Cowboy" Ben Alman
// * Dual licensed under the MIT and GPL licenses.
// * http://benalman.com/about/license/
// */
//$ = jQuery.noConflict();
//(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
//
//
//	
