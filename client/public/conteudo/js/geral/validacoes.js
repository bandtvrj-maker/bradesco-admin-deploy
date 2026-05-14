/**
    validações de campos
    de acordo com o Novo IB.
*/

var caracteresEspeciaisSeletores = "#;&,.+*~\':\"!^$[]()=>|";
var limpouErros = 0;

(function ($) {

    // Se existirem mensagens de erro geradas pelo JSF server-side, 
    // aplica a formatação necessária
    $(document).ready(function() {
        var cont = 0;
        $(".campos_form").each(function() {
            var conteudo = $(this).find("strong").html();
            if (conteudo && conteudo != "") {
                $(this).addClass("form_erro");
                cont++;
                if (cont == 1) {
                    $(this).find("input").focus();
                }
            }
        });

        // ENQUANTO MQ ESTIVER INDISPONÍVEL PARA O SEI... ENTÃO UTILIZAMOS ESTE CÓDIGO PARA EXIBIR SISTEMA INDISPONÍVEL.
/*
        $("#formEnviarPorEmail").submit(function(){
            document.location = "sistemaIndisponivel.jsf?CTL=" + document.getElementById("CTL").value;
            return false;
        });
*/

    });
})(jQuery);

function prepararSeletor(valor) {                
    for (i = 0; i < caracteresEspeciaisSeletores.length; i++) {
        caractere = caracteresEspeciaisSeletores.substring(i, i+ 1);           
        valor = preparaCaractere(valor, caractere);
    }       
    return valor;
}

function preparaCaractere(str, caractere){    
    var pos = str.indexOf(caractere);
    var inicio = 0;
    var novoValor = str;
    while (pos > -1){
        var aux = "";                
        aux = novoValor.substring(0, pos);                
        aux += "\\";
        aux += novoValor.substring(pos);
        inicio = pos + 2;
        novoValor = aux;
        pos = novoValor.indexOf(caractere, inicio);		
	}
    return (novoValor);
}

function exibirErro(idCampo, mensagem) {        
    var nomeSeletor = prepararSeletor(idCampo);	
    (function ($) {
    	var de = $("input[name=" + nomeSeletor + "]:first");
    	$(de).parents(".campos_form").addClass("form_erro")
    	                .find(".erro_msg").html("<strong>" + mensagem + "</strong>");
        incluirErroTitle(de, mensagem);
	
	// DFERNANDES INICIO
	// FAZER IF PARA VERIFICAR SE "DE" RETORNA NULO OU NÃO
	var deSelect = $("select[name=" + nomeSeletor + "]");
    	$(deSelect).parents(".campos_form").addClass("form_erro")
    	                .find(".erro_msg").html("<strong>" + mensagem + "</strong>");
        incluirErroTitle(deSelect, mensagem);
	// DFERNANDES FINAL
	
    })(jQuery);
}

function exibirErros(campos, mensagens) {    
    for (k = 0; k < mensagens.length; k++) {        
        removerErro(campos[k]);
        exibirErro(campos[k], mensagens[k]);
    }
}

function removerErro(idCampo) {    
    var nomeSeletor = prepararSeletor(idCampo);	

    (function ($) {
    	var de = $("input[name=" + nomeSeletor + "]");
    	$(de).parents(".campos_form").removeClass("form_erro")
    	                .find(".erro_msg").html("<strong></strong>");
    	removerErroTitle(de);
	
	// DFERNANDES INICIO
	// FAZER IF PARA VERIFICAR SE "DE" RETORNA NULO OU NÃO
	var deSelect = $("select[name=" + nomeSeletor + "]");
    	$(deSelect).parents(".campos_form").removeClass("form_erro")
    	                .find(".erro_msg").html("<strong></strong>");
    	removerErroTitle(deSelect);
	// DFERNANDES FINAL
	
    })(jQuery);
}

function limparErros() {
    if (limpouErros == 0) {
        (function ($) {
            $(".campos_form").each(function() {
                $(this).removeClass("form_erro").find(".erro_msg").html("<strong></strong>");
            });
        })(jQuery);

        limpouErros = 1;
    }
}

function incluirErroTitle(domElement, mensagem) {
    (function ($) {
        var funcReplaceAscii = function(text) {
            var ini = text.indexOf( '\&\#' );
            var fin = text.indexOf( ';', ini );
            while ( ini >= 0 && fin > ini ) {
                var ascii = text.substring( ini+2, fin );
                if ( ascii > 0 ) {
                    var str = String.fromCharCode( ascii );
                    text = text.replace( '\&\#'+ ascii +';', str );
                }
                ini = text.indexOf( '\&\#', ini+1 );
                fin = text.indexOf( ';', ini );
            }
            return text;
        };
        $(domElement).each(function() {
            if ($(this).attr("title") == undefined) $(this).attr("title", "");
            if ($(this).attr("title_ori") == undefined) $(this).attr("title_ori", $(this).attr("title"));

            var msgAscii = funcReplaceAscii(mensagem);
            $(this).attr("title", msgAscii + " " + $(this).attr("title_ori"));
        });
    })(jQuery);
}

function removerErroTitle(domElement) {
    (function ($) {
        $(domElement).each(function() {
            $(this).attr("title", $(this).attr("title_ori"));
        });
    })(jQuery);
}

function IbValidateRequired(form) {    

    limparErros();    

    var isValid = true;
    var focusField = null;
    var i = 0;                
    var j = 0;
    var k = 0;
    var fields = new Array();
    var messages = new Array();
    oRequired = new required();
    for (x in oRequired) {        

        var field = form[oRequired[x][0]];
       
        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'file' ||
            field.type == 'select-one' ||
            field.type == 'radio' ||
            field.type == 'password' ||
            field.type == 'hidden' ||
            ((field.type == undefined) && (field.length) && (field[0].type == 'radio'))
           ) {
            
            var value = '';
            // get field's value
            if (field.type == "select-one") {
                var si = field.selectedIndex;
                if (si >= 0) {
                    value = field.options[si].value;
                }
            } else {
                if (field.type == 'radio') {
                    value = '';
                    if (field.checked) {
                        value = field.value;
                    }
                } else if (field.type == undefined && (field.length) && (field[0].type == 'radio')) {
                    value = '';
                    for (k = 0; k < field.length; k++) {
                        if (field[k].checked) {
                            value = field[k].value;
                        }
                    }
                }
                else {
                    value = field.value;
                    if (field.className.indexOf("inputCurrency") >= 0) {
                        value = value.replace(/,/g, "").replace(/\./g, "").replace(/0/g, "");
                    }
                }
            } 
            if (value == null || trim(value).length == 0) {
                if (i == 0) {
                    if ((field.type == undefined) && (field.length) && (field[0].type == 'radio')) {
                        focusField = field[0];
                    }
                    else {
                        focusField = field;
                    }
                }
                fields[i++] = oRequired[x][0];                           
                messages[j++] = oRequired[x][1];                           
                isValid = false;
            } else {
                removerErro(oRequired[x][0]);
            }
        }
    }

    if (fields.length > 0) {
		exibirErros(fields, messages);
		
		try {
			focusField.focus();
		}
		catch (err) {
		}
    }
    return isValid;
}

// Trim whitespace from left and right sides of s.
function trim(s) {
    return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}

function IBValidateMinLength(form) {
    limparErros();
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oMinLength = new minlength();
    for (x in oMinLength) {
        var field = form[oMinLength[x][0]];
                    

        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'password') {
                        
            var iMin = parseInt(parseFloat(oMinLength[x][2]("minlength")));
            if ((trim(field.value).length > 0) && (field.value.length < iMin)) {
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oMinLength[x][0];
                messages[j++] = oMinLength[x][1];
                isValid = false;
            } else {
                removerErro(oMinLength[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateMaxLength(form) {
    limparErros();
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;    
    var fields = new Array();
    var messages = new Array();
    oMaxLength = new maxlength();
    for (x in oMaxLength) {
        var field = form[oMaxLength[x][0]];
        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'password') {
                        
            var iMax = parseInt(parseFloat(oMaxLength[x][2]("maxlength")));         
            if (field.value.length > iMax) {                
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oMaxLength[x][0];
                messages[j++] = oMaxLength[x][1];
                isValid = false;
            } else {
                removerErro(oMaxLength[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateMask(form) {
    limparErros();
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oMasked = new mask();
    for (x in oMasked) {
        
        var field = form[oMasked[x][0]];
        if ((field.type == 'text' || 
             field.type == 'textarea' ||
             field.type == 'password') && 
             (field.value.length > 0)) {
                      
            if (!matchPattern(field.value, oMasked[x][2]("mask"))) {
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oMasked[x][0];                
                messages[j++] = oMasked[x][1];
                isValid = false;
            } else {
                removerErro(oMasked[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function matchPattern(value, mask) {
    return mask.exec(value);
}

function IBValidateByte(form) {
    limparErros();
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oByte = new ByteValidations();
    for (x in oByte) {
        var field = form[oByte[x][0]];
        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'select-one' ||
            field.type == 'radio' ||
            field.type == 'password') {

            var value = '';
            // get field's value
            if (field.type == "select-one") {
                var si = field.selectedIndex;
                if (si >= 0) {
                    value = field.options[si].value;
                }
            } else {
                value = field.value;
            }
            if (value.length > 0) {
                if (!isAllDigits(value)) {
                    bValid = false;
                    if (i == 0) {
                        focusField = field;
                    }
                    fields[i++] = oByte[x][0];
                    messages[j++] = oByte[x][1];
                } else {
                    var iValue = parseInt(parseFloat(value));
                    if (isNaN(iValue) || !(iValue >= -128 && iValue <= 127)) {
                        if (i == 0) {
                            focusField = field;
                        }
                        fields[i++] = oByte[x][0];
                        messages[j++] = oByte[x][1];
                        bValid = false;
                    } else {
                        removerErro(oByte[x][0]);
                    }
                }
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return bValid;
}

function IBValidateShort(form) {
    limparErros();
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oShort = new ShortValidations();
    for (x in oShort) {
        var field = form[oShort[x][0]];
        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'select-one' ||
            field.type == 'radio' ||
            field.type == 'password') {
                        
            var value = '';
            // get field's value
            if (field.type == "select-one") {
                var si = field.selectedIndex;
                if (si >= 0) {
                    value = field.options[si].value;
                }
            } else {
                value = field.value;
            }
            if (value.length > 0) {
                if (!isAllDigits(value)) {
                bValid = false;
                if (i == 0) {
                    focusField = field;
                }
                    fields[i++] = oShort[x][0];
                    messages[j++] = oShort[x][1];
                } else {
                    var iValue = parseInt(parseFloat(value));
                    if (isNaN(iValue) || !(iValue >= -32768 && iValue <= 32767)) {
                        if (i == 0) {
                            focusField = field;
                        }
                        fields[i++] = oShort[x][0];
                        messages[j++] = oShort[x][1];
                        bValid = false;
                    } else {
                        removerErro(oShort[x][0]);
                    }
                }
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return bValid;
}

function IBValidateInteger(form) {
    limparErros();
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oInteger = new IntegerValidations();
    for (x in oInteger) {
        var field = form[oInteger[x][0]];

        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'select-one' ||
            field.type == 'radio' ||
            field.type == 'password') {
                        
            var value = '';
            // get field's value
            if (field.type == "select-one") {
                var si = field.selectedIndex;
                if (si >= 0) {
                    value = field.options[si].value;
                }
            } else {
                value = field.value;
            }
            if (value.length > 0) {
                if (!isAllDigits(value)) {
                    bValid = false;
                    if (i == 0) {
                        focusField = field;
                    }
                    fields[i++] = oInteger[x][0];
                    messages[j++] = oInteger[x][1];
                } else {
                    var iValue = parseInt(parseFloat(value));
                    if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)) {
                        if (i == 0) {
                            focusField = field;
                        }
                        fields[i++] = oInteger[x][0];
                        messages[j++] = oInteger[x][1];
                        bValid = false;
                    } else {
                        removerErro(oInteger[x][0]);
                    }
                }
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return bValid;
}

function isAllDigits(argvalue) {
    argvalue = argvalue.toString();
    var validChars = "0123456789";
    var startFrom = 0;
    if (argvalue.substring(0, 2) == "0x") {
        validChars = "0123456789abcdefABCDEF";
        startFrom = 2;
    } else if (argvalue.charAt(0) == "0") {
       //validChars = "01234567";
       // Checking of octal numbers is not common, so it's removed for that generic validator.
       // For a checking of octal numbers, write another validator.
       startFrom = 1;
    } else if (argvalue.charAt(0) == "-") {
       startFrom = 1;
    }
    for (var n = startFrom; n < argvalue.length; n++) {
        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
    }
    return true;
}

function IBValidateFloat(form) {
    limparErros();
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oFloat = new FloatValidations();
    for (x in oFloat) {
        var field = form[oFloat[x][0]];
        if (field.type == 'text' ||
            field.type == 'textarea' ||
            field.type == 'select-one' ||
            field.type == 'radio' ||
            field.type == 'password') {
                       
            var value = '';
            // get field's value
            if (field.type == "select-one") {
                var si = field.selectedIndex;
                if (si >= 0) {
                    value = field.options[si].value;
                }
            } else {
                value = field.value;
            }
            if (value.length > 0) {
                // remove '.' before checking digits
                var tempArray = value.split('.');
                var joinedString= tempArray.join('');

                if (!isAllDigits(joinedString)) {
                    bValid = false;
                    if (i == 0) {
                        focusField = field;
                    }
                    fields[i++] = oFloat[x][0];
                    messages[j++] = oFloat[x][1];

                } else {
                    var iValue = parseFloat(value);
                    if (isNaN(iValue)) {
                        if (i == 0) {
                            focusField = field;
                        }
                        fields[i++] = oFloat[x][0];
                        messages[j++] = oFloat[x][1];
                        bValid = false;
                    } else {
                        removerErro(oFloat[x][0]);
                    }
                }
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return bValid;
}

function IBValidateIntRange(form) {
    limparErros();
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRange = new intRange();
    for (x in oRange) {
        var field = form[oRange[x][0]];
                   
        if ((field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'password') &&
            (field.value.length > 0)) {
                        
            var iMin = parseInt(parseFloat(oRange[x][2]("min")));
            var iMax = parseInt(parseFloat(oRange[x][2]("max")));
            var iValue = parseInt(parseFloat(field.value));
            if (!(iValue >= iMin && iValue <= iMax)) {
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oRange[x][0];
                messages[j++] = oRange[x][1];
                isValid = false;
            } else {
                removerErro(oRange[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateFloatRange(form) {
    limparErros();
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRange = new floatRange();
    for (x in oRange) {
        var field = form[oRange[x][0]];
        if ((field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'password') &&
             (field.value.length > 0)) {
                        
            var fMin = parseFloat(oRange[x][2]("min"));
            var fMax = parseFloat(oRange[x][2]("max"));
            var fValue = parseFloat(field.value);
            if (!(fValue >= fMin && fValue <= fMax)) {
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oRange[x][0];
                messages[j++] = oRange[x][1];
                isValid = false;
            } else {
                removerErro(oRange[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateEmail(form) {
    limparErros();
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oEmail = new email();
    for (x in oEmail) {
        if ((form[oEmail[x][0]].type == 'text' ||
             form[oEmail[x][0]].type == 'textarea' || 
             form[oEmail[x][0]].type == 'password') &&
            (form[oEmail[x][0]].value.length > 0)) {
            if (!checkEmail(form[oEmail[x][0]].value)) {
                if (i == 0) {
                    focusField = form[oEmail[x][0]];
                }
                fields[i++] = oEmail[x][0];
                messages[j++] = oEmail[x][1];
                bValid = false;
            } else {
                removerErro(oEmail[x][0]);
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return bValid;
}

function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                return false;
            }
        }
        return true;
    }
    var domainArray=domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat=new RegExp(atom,"g");
    var domArr=domain.match(atomPat);
    var len=domArr.length;
    
	var tamTotal = 0;
    for (var t = 0; t < len-1; t++) {
    	tamTotal = tamTotal + domArr[t].length;
    }
    tamTotal = tamTotal + user.length + 1 + len-1;
    tamTotal = 50 - tamTotal;
    
    if ((domArr[domArr.length-1].length < 2) ||
         (domArr[domArr.length-1].length > tamTotal)) {
        return false;
    }
	
    if (len < 2) {
        return false;
    }
	if (domArr[domArr.length-1].match(/\d/)) {
		return false;
	}
    return true;
}

function IBValidateTwoFields(form) {
    limparErros();
    var isValid = true;
    //var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oTwoFields = new twoFields();
    for (x in oTwoFields) {
    var field = form[oTwoFields[x][0]];
                  
    if ((field != null) && (field.type == 'text' ||
         field.type == 'textarea' ||
         field.type == 'file' ||
         field.type == 'select-one' ||
         field.type == 'radio' ||
         field.type == 'password')) {
                        
        var value = '';
	// get field's value
	if (field.type == "select-one") {
            var si = field.selectedIndex;
            if (si >= 0) {
		value = field.options[si].value;
            }
	} else {
	    value = field.value;
        }
        var field2 = form[oTwoFields[x][2]("compareFieldId")];
        var comparator = oTwoFields[x][2]("comparator");                        
        if (comparator == null) { comparator = "equals"; }
                        
            if ((field2 != null) && (field2.type == 'text' ||
              	field2.type == 'textarea' ||
               	field2.type == 'file' ||
               	field2.type == 'select-one' ||
              	field2.type == 'radio' ||
               	field2.type == 'password')) {
                        
	        var value2 = '';
		// get field2's value
		if (field2.type == "select-one") {
                    var si2 = field2.selectedIndex;
                    if (si2 >= 0) {
			value2 = field2.options[si2].value;
                    }
                } else {
		    value2 = field2.value;
		}
                if (((comparator=='equals') && (value2 != value))
	                || ((comparator=='distinct') && (value2 == value))) {
                    if (i == 0) {
	                //focusField = field;
	            }
	            fields[i++] = oTwoFields[x][0];
                    messages[j++] = oTwoFields[x][1];
	            isValid = false;
                } else {
                    removerErro(oTwoFields[x][0]);
                }
            }
        }
    }
    if (fields.length > 0) {
        //focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateModulo11(form) {
    var isValid = true;
    //var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oModulo11 = new modulo11();
    for (x in oModulo11) {
        var field = form[oModulo11[x][0]];
        if ((field != null) && 
            (field.type == 'text' ||
             field.type == 'textarea' ||
             field.type == 'password')
           ) {
                        
            // get field's value
            var value = field.value;                        
            var field2 = form[oModulo11[x][2]("compareFieldId")];                        
            if ((field2 != null) && 
                (field2.type == 'text' ||
                 field2.type == 'textarea' ||
                 field2.type == 'password')
               ) {
                        
                try {
                    var valueInt = parseInt(parseFloat(field.value));
		            var value2 = parseInt(parseFloat(field2.value));
		            var pesoMax = parseInt(parseFloat(oModulo11[x][2]("max")));				                
                    var validValue = calculaModulo11(value2,pesoMax);
				                
                    if ((pesoMax!=null) && (valueInt!=validValue)) {
		                if (i == 0) {
                            focusField = field;
                        }
		                fields[i++] = oModulo11[x][0];
                        messages[j++] = oModulo11[x][1];
                        isValid = false;
                    } else {
                        removerErro(oModulo11[x][0]);
                    }
                } catch (e) { 
		            fields[i++] = oModulo11[x][0];
                    messages[j++] = oModulo11[x][1];
                    isValid = false;
                }
            }
        }
    }
    if (fields.length > 0) {
        focusField.focus();
        exibirErros(fields, messages);
    }
    return isValid;
}
            
function calculaModulo11(numeroValue, peso) {
    var lsoma = 0;
    var ipeso = 2;
    for (var valor = numeroValue; valor > 0;) {
    	var digito = intToByte(valor % 10);
    	valor = Math.floor(valor/10);
        if ((digito >= 0) && (digito <= 9)) {
            lsoma += digito * ipeso;
            if (++ipeso > peso) {
    		    ipeso = 2;
            }
    	}
    }
    lsoma %= 11;
    lsoma = 11 - lsoma;
    if (lsoma == 11) {
	    lsoma = 0;
    }
    else {
        if (lsoma == 10) {
	        lsoma = 0;
        }
    }
    return lsoma;
}
            
function intToByte(x){
    if (x > 128){
	    return x - 256;
    }
    return x;
}

function IBValidateCalendarioDtInicio(form) {    
    limparErros();    
    var isValid = true;
    var focusField = null;
    var i = 0;                
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRequired = new validaDataInicio();
    for (x in oRequired) {        
        var field = form[oRequired[x][0]];
        var value = '';
        value = field.value;
        if (value != "") {
	        if (validaIntervaloData(value, field.name) == -1) {
	            if (i == 0) {
	                focusField = form[oRequired[x][0]+"Dia"];
	            }
	            fields[i++] = oRequired[x][0];                           
	            messages[j++] = oRequired[x][1];                           
	            isValid = false;
	        } else {
	            removerErro(oRequired[x][0]);
	        }
		}
    }
    if (fields.length > 0) { 
        focusField.focus();                                      
        exibirErros(fields, messages);
    }
    return isValid; 
}

function IBValidateCalendarioDtFim(form) {    
    limparErros();    
    var isValid = true;
    var focusField = null;
    var i = 0;                
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRequired = new validaDataFim();
    for (x in oRequired) {        
        var field = form[oRequired[x][0]];
         var value = '';
         value = field.value;
        if (value != "") {
	         if (validaIntervaloData(value, field.name) == 1) {
	             if (i == 0) {
	                focusField = form[oRequired[x][0]+"Dia"];
	             }
	             fields[i++] = oRequired[x][0];                           
	             messages[j++] = oRequired[x][1];                           
	             isValid = false;
	         } else {
		             removerErro(oRequired[x][0]);
		     }
		}
    }
    if (fields.length > 0) { 
       focusField.focus();                                      
       exibirErros(fields, messages);
    }
    return isValid; 
}

function validaIntervaloData(value, nmCalendario) {
	dtini =  document.getElementById(nmCalendario + "DtInicio").value;
	dtfim =  document.getElementById(nmCalendario + "DtFim").value;
	dd = parseInt(value.substr(0, 2), 10);
	mm = parseInt(value.substr(3, 2), 10);
	yy = parseInt(value.substr(6, 4), 10);
	dtForm = new Date(yy, mm - 1, dd);
	if (dtini != "") {
		dtini = dtini.split("/");
		dtini[0] = parseInt(dtini[0], 10);
		dtini[1] = parseInt(dtini[1], 10);
		dtini[2] = parseInt(dtini[2], 10);
		dtini = new Date(dtini[2], dtini[1] - 1, dtini[0]);
		if (dtForm.getTime() < dtini.getTime()) {
			return -1;
		}
	}
	if (dtfim != "") {
		dtfim = dtfim.split("/");
		dtfim[0] = parseInt(dtfim[0], 10);
		dtfim[1] = parseInt(dtfim[1], 10);
		dtfim[2] = parseInt(dtfim[2], 10);
		dtfim = new Date(dtfim[2], dtfim[1] - 1, dtfim[0]);
		if (dtForm.getTime() > dtfim.getTime() ) {
			return 1;
		}
	}
	return 0;
}

function IBValidateDate(form) {
    var bValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oDate = new DateValidations();
    for (x in oDate) {
        var value = form[oDate[x][0]].value;
        var datePattern = oDate[x][2]("datePatternStrict");
        if ((form[oDate[x][0]].type == 'text' ||
             form[oDate[x][0]].type == 'hidden' ||
             form[oDate[x][0]].type == 'textarea' ||
             form[oDate[x][0]].type == 'password') &&
            (value.length > 0) &&
            (datePattern.length > 0)) {
          var MONTH = "MM";
          var DAY = "dd";
          var YEAR = "yyyy";
          var orderMonth = datePattern.indexOf(MONTH);
          var orderDay = datePattern.indexOf(DAY);
          var orderYear = datePattern.indexOf(YEAR);
          if ((orderDay < orderYear && orderDay > orderMonth)) {
              var iDelim1 = orderMonth + MONTH.length;
              var iDelim2 = orderDay + DAY.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderDay && iDelim2 == orderYear) {
                 dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
              } else if (iDelim1 == orderDay) {
                 dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
              } else if (iDelim2 == orderYear) {
                 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
              } else {
                 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                 if (!isValidDate(matched[2], matched[1], matched[3])) {
                    if (i == 0) {
                        focusField = form[oDate[x][0]];
                    }
		            fields[i++] = oDate[x][0];                           
		            messages[j++] = oDate[x][1];   
                    bValid =  false;
                 }
              } else {
                 if (i == 0) {
                     focusField = form[oDate[x][0]];
                 }
	            fields[i++] = oDate[x][0];                           
	            messages[j++] = oDate[x][1];   
                 bValid =  false;
              }
          } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
              var iDelim1 = orderDay + DAY.length;
              var iDelim2 = orderMonth + MONTH.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderMonth && iDelim2 == orderYear) {
                  dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
              } else if (iDelim1 == orderMonth) {
                  dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
              } else if (iDelim2 == orderYear) {
                  dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
              } else {
                  dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                  if (!isValidDate(matched[1], matched[2], matched[3])) {
                      if (i == 0) {
                          focusField = form[oDate[x][0]];
                      }
						fields[i++] = oDate[x][0];                           
						messages[j++] = oDate[x][1];   
                      bValid =  false;
                   }
              } else {
                  if (i == 0) {
                      focusField = form[oDate[x][0]];
                  }
		            fields[i++] = oDate[x][0];                           
		            messages[j++] = oDate[x][1];   
                  bValid =  false;
              }
          } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
              var iDelim1 = orderYear + YEAR.length;
              var iDelim2 = orderMonth + MONTH.length;
              var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
              var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
              if (iDelim1 == orderMonth && iDelim2 == orderDay) {
                  dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
              } else if (iDelim1 == orderMonth) {
                  dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
              } else if (iDelim2 == orderDay) {
                  dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
              } else {
                  dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
              }
              var matched = dateRegexp.exec(value);
              if(matched != null) {
                  if (!isValidDate(matched[3], matched[2], matched[1])) {
                      if (i == 0) {
                          focusField = form[oDate[x][0]];
                       }
		            fields[i++] = oDate[x][0];                           
		            messages[j++] = oDate[x][1];   
                       bValid =  false;
                   }
               } else {
                   if (i == 0) {
                       focusField = form[oDate[x][0]];
                   }
		            fields[i++] = oDate[x][0];                           
		            messages[j++] = oDate[x][1];   
                   bValid =  false;
               }
          } else {
              if (i == 0) {
                  focusField = form[oDate[x][0]];
              }
		            fields[i++] = oDate[x][0];                           
		            messages[j++] = oDate[x][1];   
              bValid =  false;
          }
       }
    }
    if (fields.length > 0) {
       exibirErros(fields, messages);
       if (jQuery(focusField).filter(":visible").length > 0) {
          focusField.focus();
       } else {
          var diaMesAno = jQuery("#" + prepararSeletor(oDate[x][0] + "Dia") + ",#" + prepararSeletor(oDate[x][0] + "Mes") + ",#" + prepararSeletor(oDate[x][0] + "Ano")).filter(":visible");
          if (diaMesAno.length > 0) {
             diaMesAno.first().focus();
          }
       }
    }
    return bValid;
}
    
function isValidDate(day, month, year) {
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && 
        (day == 31)) {
         return false;
    }
    if (month == 2) {
        var leap = (year % 4 == 0 && 
                    (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !leap)) {
            return false;
        }
    }
    return true;
}

function IBValidateRequiredSelectLista(form) {
	
	limparErros();
	
	var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRequired = new requiredSelectLista();
    
    var anyChecked = false;
    
    for (x in oRequired) {
    
      var aRadio = document.getElementsByName(oRequired[x][0]);
      if (aRadio != null) {
          for (var z=0; z<aRadio.length; z++) {
		  	if (aRadio[z].checked == true) {
		  		anyChecked = true;
		  	}
		  }
	  }

      if (anyChecked == false) {
      	if (i == 0) {
        	focusField = aRadio[0];
        }
        fields[i++] = oRequired[x][0];
        messages[j++] = oRequired[x][1];
      	isValid = false;
      } else {
    	removerErro(oRequired[x][0]);
      }
    }
    if (fields.length > 0) {
       exibirErros(fields, messages);
       focusField.focus();
       // alert(fields.join('\n'));
    }
    return isValid;
}

function IBValidateMaskIfEnabled(form) {
    
    var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oMasked = new maskIfEnabled();
    for (x in oMasked) {
    
        var field = form[oMasked[x][0]];
        
        if ((field.type == 'text' || 
             field.type == 'textarea' ||
             field.type == 'password') && 
             (field.value.length > 0) && (field.disabled==false)) {
             
            if (!matchPattern(field.value, oMasked[x][2]("mask"))) {
                if (i == 0) {
                    focusField = field;
                }
                fields[i++] = oMasked[x][0];
                messages[j++] = oMasked[x][1];
                isValid = false;
            } else {
            	removerErro(oMasked[x][0]);
            }
        }
    }
    
    if (fields.length > 0) {
       focusField.focus();
       exibirErros(fields, messages);
    }
    return isValid;
}

function IBValidateRequiredSelectOneRadio(form) {
	var isValid = true;
    var focusField = null;
    var i = 0;
    var j = 0;
    var fields = new Array();
    var messages = new Array();
    oRequired = new requiredSelectOneRadio();
    
    var anyChecked = false;
    
    for (x in oRequired) {
    
      var aRadio=document.getElementsByName(oRequired[x][0]);
      if (aRadio != null) {
          for (var z=0; z<aRadio.length; z++) {
		  	if (aRadio[z].checked == true) {
		  		anyChecked = true;
		  	}
		  }
	  }

      if (anyChecked == false) {
      	if (i == 0) {
        	//focusField = field;
        }
        fields[i++] = oRequired[x][0];
        messages[j++] = oRequired[x][1];
      	isValid = false;
      } else {
      	removerErro(oRequired[x][0]);
      }
    }
    if (fields.length > 0) {
       //focusField.focus();
    	exibirErros(fields, messages);
    }
    return isValid;
}



function DigitOver (sCPF, iPesoIni, iPesoFim) {

   var iSoma, iPeso, iPos, iResto;
  
   iSoma = 0;
   iPeso = iPesoIni;
   iPos = sCPF.length - 1;
   while (iPos >= 0) {
   	iSoma = iSoma + parseInt(sCPF.substr(iPos, 1), 10) * iPeso;
   	iPeso = iPeso + 1;
   	if (iPeso > iPesoFim)
   		iPeso = iPesoIni;
   	iPos = iPos - 1;
   }
   iResto = iSoma % 11;
   iResto = 11 - iResto;
   return iResto;
}


function validaCPF(e) {
  
   var  iLen, iDig0, iDig1, iAux;

    
    var regex = /(^00*0$)|(^11*1$)|(^22*2$)|(^33*3$)|(^44*4$)|(^55*5$)|(^66*6$)|(^77*7$)|(^88*8$)|(^99*9$)/;
    if (regex.test(e)) {
        return false;
    }
		
   iLen = e.length;
	
   if (iLen < 2) {
   	return false;
   }
   else {
   	iDig0 = parseInt(e.substr(iLen - 2, 1), 10);
   	iDig1 = parseInt(e.substr(iLen - 1, 1), 10);
   	// Segundo digito:
   	e = e.substr(0, iLen - 1);
   	iAux = DigitOver(e, 2, 999);
   	if (iAux > 9)
   		iAux = 0;
   	if (iDig1 != iAux) {
   		return false;
   	}
   	else {
   		// Primeiro digito:
   		e = e.substr(0, iLen - 2);
   		iAux = DigitOver(e, 2, 999);
   		if (iAux > 9)
   			iAux = 0;
   		if (iDig0 != iAux) {
   			return false;
   		}
   		else
   			return true;
   	}
   }
}

function validaCNPJ(e) {
  
   var iLen, iDig0, iDig1, iAux;
   
    var regex = /(^00*0$)|(^11*1$)|(^22*2$)|(^33*3$)|(^44*4$)|(^55*5$)|(^66*6$)|(^77*7$)|(^88*8$)|(^99*9$)/;
    if (regex.test(e)) {
        return false;
    }

		
   iLen = e.length;
	
   if (iLen < 2) {
   	return false;
   }
   else {
    
   	iDig0 = parseInt(e.substr(iLen - 2, 1), 10);
   	iDig1 = parseInt(e.substr(iLen - 1, 1), 10);
   	// Segundo digito:
   	e = e.substr(0, iLen - 1);
   	iAux = DigitOver(e, 2, 9);
   	if (iAux > 9)
   		iAux = 0;
   	if (iDig1 != iAux) {
   		return false;
   	}
   	else {
   		// Primeiro digito:
   		e = e.substr(0, iLen - 2);
   		iAux = DigitOver(e, 2, 9);
   		if (iAux > 9)
   			iAux = 0;
   		if (iDig0 != iAux) {
   			return false;
   		}
   		else
   			return true;
   	}
   }
}


