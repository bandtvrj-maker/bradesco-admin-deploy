/***************************************************************************
 *   Copyright (C) 2009 by Vladimir Kadalashvili                           *
 *   Kadalashvili.Vladimir@gmail.com                                       *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/


;(function() {

	var $ = jQuery;
	var nomeOriginal = "";

	$.fn.combo = function(config) {
        return this.each(function() {
			new $sc(this, config);
		});  
    };
    
	//default config options
    var defaults = {
        //skin name
        skin: "net",

		//Renomear o combo original com este sufixo
		suffixOrig: "__Original",
        
		//this suffix will be appended to the selectbox's name and will be text input's name
		suffix: "__sexyCombo",
		
		//the same as the previous, but for hidden input
		hiddenSuffix: "__sexyComboHidden",
		
		//initial / default hidden field value.
		//Also applied when user types something that is not in the options list
		initialHiddenValue: "",
		
		//if provided, will be the value of the text input when it has no value and focus
		emptyText: "",
		
		//if true, autofilling will be enabled
		autoFill: false,
		
		//if true, selected option of the selectbox will be the initial value of the combo
		triggerSelected: true,
		
		//function for options filtering
		filterFn: null,
		
		//if true, the options list will be placed above text input
		dropUp: false,
		
		//separator for values of multiple combos
		separator: " ",
		
		//all callback functions are called in the scope of the current sexyCombo instance
		
		//called after dropdown list appears
		showListCallback: null,
		
		//called after dropdown list disappears
		hideListCallback: null,
		
		//called at the end of constructor
		initCallback: null,
		
		//called at the end of initEvents function
		initEventsCallback: null,
		
		//called when both text and hidden inputs values are changed
		changeCallback: null,
		
		//called when text input's value is changed
		textChangeCallback: null,

		//add style in div wrapper case necessary
		styleWrapper: null,

		//add style in div wrapper case necessary
		listMultiple: [],

		//if true, allow add new items
		addNewItem: false,

		//define size of list wrapper 
		sizeListWrapper: 152,
		
		valueBegin: false
    };
    
    //constructor
    //creates initial markup and does some initialization
    $.combo = function(selectbox, config) {        
        if (selectbox.nodeName != "SELECT")
	    return;
	    
	this.config = $.extend({}, defaults, config || {}); 
	var self = this;
	var valorInicial;
	
	this.selectbox = $(selectbox);
	this.options = this.selectbox.children().filter("option");     
	var selectboxWidth = parseInt(this.selectbox.css("width"), 10);
	
	var widthComboEmpresa = parseInt(this.selectbox.css("width"), 10);
	widthComboEmpresa += 50;
	
	
	this.selectbox.find("option").each(function (){
		if ($(this).attr("selected")) {
			self.config.valueBegin = $(this).text();
		}
	});

	if (!this.config.valueBegin) {
		this.config.valueBegin = this.selectbox.find("option:first").text();
	}

	// Adiciona a div principal
	// <div class="combo"></div>
	this.wrapper = this.selectbox.wrap("<div>").
	hide().
	parent().
	addClass("combo").
	addClass(this.config.skin).
	css("width", (this.selectbox.attr("name") == 'empresaServico') ? widthComboEmpresa : selectboxWidth); 
	if (this.config.styleWrapper) this.wrapper.css(this.config.styleWrapper);
	
	this.input = $("<input type='text' />").
	appendTo(this.wrapper).
	attr("autocomplete", "off").
	attr("value", "").
	attr("class", "tabindex").
	attr("name", this.selectbox.attr("name") + this.config.suffix).
	attr("id", this.selectbox.attr("name") + this.config.suffix).
	css("width", (this.selectbox.attr("name") == 'empresaServico') ? widthComboEmpresa : selectboxWidth - 8 );    
    
    
	// Bloqueia submit quando o combo estiver com erro

	$(this.form).submit(function() { 
		if($('#divCampoComboContas').has('form_erro')){
			$('#divCampoComboContas').focus().select();
			return false; 
		}
	});

	/*
	$('.bt_avancar').click(function(){
		if($('#divCampoComboContas').has('form_erro')){

			$(this).find("input[type='image'],input[type='submit']").attr("disabled", "true");
			//$(this.form).disabled=true;
			//$('#autenticadorForm').submit(); 
			return false;
		}
	}); 
	*/
	//Realiza a validação no submit de qualquer form	
	$("form").submit(function (){
		if(!self.validaSelecao($(self.input).val())){    
			self.exibeErro();
		}
	});
	
		// Adiciona o input hidden na div.combo 
		// <div class="combo"><input type="text" /><input type="hidden" /></div>
		this.hidden = $("<input type='hidden' autocomplete='off' value='" + this.config.initialHiddenValue + "' name='" + this.selectbox.attr("name") + this.config.hiddenSuffix + "'/>").
			appendTo(this.wrapper);
		
		nomeOriginal = this.selectbox.attr("name");
		this.selectbox.attr("name", nomeOriginal + this.config.suffixOrig);
		this.hiddenOrig = $("<input type='hidden' autocomplete='off' value='" + this.config.initialHiddenValue + "' name='" + nomeOriginal + "'/>").
			appendTo(this.wrapper);
	if(selectbox.id == "conta_combo"){		
		if(nomeOriginal != "contaDebito"){
			// Adiciona o input hidden na div.combo para envio na request dos dados cdConta, cdTipoConta e tipoConta (necessarios para aplicações migradas visualmente.).
			// <div class="combo"><input type="hidden" /></div>
			this.hiddenOrigTpDeCta = $("<input type='hidden' autocomplete='off' value='' name='tipoDeConta'/>").
				appendTo(this.wrapper);
				
			this.hiddenOrigCdTpCta = $("<input type='hidden' autocomplete='off' value='' name='cdTipoConta'/>").
				appendTo(this.wrapper);
					
			this.hiddenOrigTpCta = $("<input type='hidden' autocomplete='off' value='' name='tipoConta'/>").
				appendTo(this.wrapper);
		}   
	}
//=================================================================================================


	// Adiciona o link na div principal 
	// <div class="combo"><input type="text" /><input type="hidden" /><a class="icon" /></div>
    this.icon = $("<a href='javascript:;' />").
	appendTo(this.wrapper).
	addClass("icon").
	css("left", (this.selectbox.attr("name") == 'empresaServico__Original') ? widthComboEmpresa - 9 : selectboxWidth - 17);
	
	// Adiciona a div onde ira conter os items do select a div principal 
	// <div class="combo"><input type="text" /><input type="hidden" /><a class="icon" /><div class="list-wrapper" /></div>
	this.listWrapper = $("<div />").
	appendTo(this.wrapper).
	addClass("invisible").
	addClass("list-wrapper").css("width", (this.selectbox.attr("name") == 'empresaServico__Original') ? widthComboEmpresa + 6 : selectboxWidth - 2); 
    //addClass("list-wrapper").css("width", "auto"); 
	this.updateDrop();
    
	// Adiciona a lista onde ira conter os items do select a div list-wrapper
	// <div class="combo"><input type="text" /><input type="hidden" /><a class="icon" /><div class="list-wrapper"><ul class="after" /></div></div>
	this.list = $('<ul />').appendTo(this.listWrapper); 

	this.form = $('<form action="" class="after" method="post" />');
	this.label = $('<label>Criar novo:</label>');
	this.inputAdd = $('<input type="text" class="frmText txtAddContato" name="txtNovoItem" maxlength="50" />');
	this.inputOk = $('<input type="button" title="OK" name="btnOk" class="btnOkHome" />');

	if (this.config.addNewItem) {
		this.form.append(this.label, this.inputAdd, this.inputOk);
		this.listWrapper.append(this.form);
	};

	this.options.each(function() {
	    var optionText = $.trim($(this).text());
        $("<li />").appendTo(self.list).text(optionText).addClass("visible");
	});  
	
	this.listItems = this.list.children();

	if ($.browser.opera) {
	    this.wrapper.css({position: "relative", left: 0, top: 0});
	} 
	
	this.filterFn = ("function" == typeof(this.config.filterFn)) ? this.config.filterFn : this.filterFn;
	
	this.lastKey = null;
	this.overflowCSS = $.browser.opera ? "overflow" : "overflowX";

	this.multiple = this.selectbox.attr("multiple");
	this.notify("init");
	this.initEvents();
    
    if((navigator.userAgent).indexOf("MPVV4") != -1){    
        this.icon.hide();
        this.input.hide();
        this.wrapper.show();
        this.selectbox.show();        
        
        this.selectbox.attr("title","Selecione a Agência e Conta")
        
        this.selectbox.change(function(){            
            self.setHiddenValue(self.selectbox.find('option').filter(':selected').text());            
            $(".ctaPadrao").fadeIn();            
            
            if (window.parent && window.parent.autoIframe) {
				window.parent.autoIframe();
			}
			self.callAtualizaItensDinamicos(this);
        });
        
        this.selectbox.keydown(function (){
            $(".ctaPadrao").fadeIn(); 
        });
        
        return;
    }    
    };
    
    //shortcuts
    $sc = $.combo;
    $sc.fn = $sc.prototype = {};
    $sc.fn.extend = $sc.extend = $.extend;
    
    $sc.fn.extend({
    //TOC of our plugin
	//initializes all event listeners
	//it would be more correct to call it initEvents
		
        initEvents: function() {
	    var self = this;
	    
		this.icon.bind("focus click", function() {
			valorInicial = self.input.val();

			if (self.listItems.filter(".visible").length) {
				self.listItems.each(function() {
					$(this).removeClass("visible").addClass("invisible").html($(this).html().replace(/<strong>|<\/strong>/gi,""));
				});
				self.hideList();
			} else {
				self.listItems.each(function() {
					$(this).removeClass("invisible").addClass("visible").html($(this).html().replace(/<strong>|<\/strong>/gi,""));
				});
				self.showList();
			}
	    }); 
	    
	    this.listItems.bind("mouseover", function(e) {
	    	self.highlight(e.target);
	    });
	    
	    this.listItems.bind("click", function(e) {
			self.listItemClick(e.target.tagName.toLowerCase() == "li" ? $(e.target) : $(e.target).parent());
			self.accountShow(self.input);
	    });
	    
	    this.input.bind("keyup", function(e) {
	        self.keyUp(e);
	    });

		this.input.bind("focus click", function() {
			valorInicial = self.input.val();

			$(this).select();
			
			self.listItems.each(function() {
				$(this).removeClass("invisible").addClass("visible").html($(this).html().replace(/<strong>|<\/strong>/gi,""));
			});
			self.showList();
	    });
		this.input.bind("blur", function() {
			self.accountShow(self.input);
		});
	    this.input.bind("keypress", function(e) {
	        if ($sc.KEY.RETURN == e.keyCode)
	            e.preventDefault();
		    
			if ($sc.KEY.TAB == e.keyCode)
				self.hideList();   
	    });

		this.form.bind("submit", function(){
			var optionText = $.trim(self.inputAdd.val());
			var liNew = $("<li />").
			appendTo(self.list).
			text(optionText).
			addClass("visible");
			
			self.listItems = self.list.children();
			self.listItems.filter(":odd").addClass("odd");
			self.setOverflow();
			self.setListHeight();

			self.listItems.bind("mouseover", function(e) {
				self.highlight(e.target);
			});
			
			self.listItems.bind("click", function(e) {
				self.listItemClick(e.target.tagName.toLowerCase() == "li" ? $(e.target) : $(e.target).parent());
				self.accountShow(self.input);
			});

			return false;
		});

		$(document).bind("click", function(e) {
	        if ((self.icon.get(0) == e.target) || (self.input.get(0) == e.target) || (self.form.get(0) == e.target) || (self.label.get(0) == e.target)  || (self.inputAdd.get(0) == e.target) || (self.inputOk.get(0) == e.target))
		    return;
			
			self.hideList();    
	    });
	    
	    this.triggerSelected();
	    this.applyEmptyText();
	    
	    this.notify("initEvents")
	},

	accountShow: function(t) {         
        var $parentTable = $(".ctaPadrao"),
            $tabHide = $('.tabHide'),
            $tabShow = $('.tabShow'),
            valorInput = $(t).val();            
	    if(!this.validaSelecao(valorInput)){            
		if(this.listWrapper.hasClass("invisible")){
			this.exibeErro();
		}
		return false;
	     }else{
		if (valorInicial != valorInput) {
			$parentTable.find("input:checkbox").attr("checked",false);
			$parentTable.fadeIn();
			$tabHide.hide();
			$tabShow.fadeIn();
			if (window.parent && window.parent.autoIframe) {
			    window.parent.autoIframe();
			}
			this.callAtualizaItensDinamicos(this);
		} else {
			$parentTable.fadeOut();
			$tabShow.hide();
			$tabHide.fadeIn();	
		    }
		}
	},
    
    callAtualizaItensDinamicos: function() {
		if((this.selectbox.attr("name") == 'empresaServico__Original') || this.selectbox.attr("name") == 'empresaServico__Original__Original'){			
			if(typeof atualizaItensDinamicosEmpresa == 'function'){
				atualizaItensDinamicosEmpresa();
			}
		}else{
			if(typeof atualizaItensDinamicos == 'function'){
				atualizaItensDinamicos();
			}
		}
		if (typeof iniciarLote == 'function') {
			iniciarLote();
		}
	},
	
	getTextValue: function(v) {
            return this.__getValue("input");
	},
	
	getCurrentTextValue: function() {
            return this.__getCurrentValue("input");
	},
	
	getHiddenValue: function() {

            return this.__getValue("hidden");
	},
	
	getCurrentHiddenValue: function() {
	    
	    return this.__getCurrentValue("hidden");
	},
	
	__getValue: function(prop) {
	    prop = this[prop];
	    if (!this.multiple)
	        return $.trim(prop.val());
		
	    var tmpVals = prop.val().split(this.config.separator);
	    var vals = [];
	    
	    for (var i = 0, len = tmpVals.length; i < len; ++i) {
	        vals.push($.trim(tmpVals[i]));
	    }	
	    
	    vals = $sc.normalizeArray(vals);
	    
	    return vals;
	},
	
	__getCurrentValue: function(prop) {
	     prop = this[prop];
	     if (!this.multiple)
	         return $.trim(prop.val());
		 
             return $.trim(prop.val().split(this.config.separator).pop());		 
	},
	
	//icon click event listener
	iconClick: function() {
	    if (this.listVisible()) {
	        this.hideList();
	    }
	    else 
	        this.showList();
		
            this.input.focus();
	},
	
	//returns true when dropdown list is visible
	listVisible: function() {
	    return this.listWrapper.hasClass("visible");
	},
	
	//shows dropdown list
	showList: function() {
	    if (!this.listItems.filter(".visible").length)
	        return;
		
	    this.listWrapper.removeClass("invisible").addClass("visible");
		this.wrapper.css("zIndex", "99999");
	    this.listWrapper.css("zIndex", "99999");
	    this.setOverflow();
	    this.setListHeight();
	    if (!this.listItems.filter(".active").length)
	    	this.highlightFirst();
	    this.listWrapper.scrollTop(0);
	    this.notify("showList");
	},
	
	//hides dropdown list
	hideList: function() {
	    if (this.listWrapper.hasClass("invisible")) {
	        return;
	    }
	    this.listWrapper.removeClass("visible").
	    addClass("invisible");
	    this.wrapper.css("zIndex", "0");
	    this.listWrapper.css("zIndex", "99999");	
	    
	    this.notify("hideList");
	},
	
	//returns sum of all visible items height
	getListItemsHeight: function() {
	    return this.listItems.height() * this.liLen();
	},

	//changes list wrapper's overflow from hidden to scroll and vice versa (depending on list items height))
	setOverflow: function() {
		if (this.getListItemsHeight() > this.getListMaxHeight()) {
			/*if (!this.config.addNewItem)*/ this.list.css(this.overflowCSS, "scroll");
		} else {
			this.list.css(this.overflowCSS, "hidden");	
		}
	},
	
	//highlights active item of the dropdown list
	highlight: function(activeItem) {
	    if (($sc.KEY.DOWN == this.lastKey) || ($sc.KEY.UP == this.lastKey))
	        return;
		
	    this.listItems.removeClass("active");   
	    $(activeItem).addClass("active");
	},
	
    //realiza a validação do valor selecionado
    validaSelecao: function(val){
        var retorno = false;
        this.options.each(function() {
			var optionText = '';
			if($(this).text() !== null){
				optionText = $.trim($(this).text());
			}
            if(optionText == $.trim(val) || optionText == ''){
                retorno = true;
            }
	    });
        return retorno;
    },
    
    //Exibe erro no combo
    exibeErro: function (){
        var msgErro = 'A conta informada &#233; inv&#225;lida.';
        if(typeof exibirErro == 'function'){
            exibirErro($(this.input).attr('name'),msgErro); 
        }else if(typeof setColorBad == 'function'){          
            setColorBad(msgErro,'divCampoComboContas','msgErroCampoComboContas');    
            alert('2');
        }               
    },
    
	//sets text and hidden inputs value
	setComboValue: function(val, pop, hideList) {        
        var oldVal = this.input.val(); 
	    
	    var v = "";
	    if (this.multiple) {
	       
	        v = this.getTextValue();
		if (pop) 
		    v.pop();
		v.push($.trim(val));
		v = $sc.normalizeArray(v);
		v = v.join(this.config.separator) + this.config.separator;   
		 
	    }
	    else {
	        v = $.trim(val);
	    }
	    this.input.val(v);

		//DIEGO
		/*
		this.input.focus(function (){
			valorInicial = $(this).val();
		});

		this.input.blur(function (){
			if ($(this).val() != valorInicial) {
				$(".ctaPadrao").fadeIn();
			} else {
				$(".ctaPadrao").fadeOut();
			}
		});
		*/
	    this.setHiddenValue(val);
	    this.filter();
	    if (hideList)
	        this.hideList();
	    this.input.removeClass("empty");

	    
	    if (this.multiple)
	        this.input.focus();
		
	    if (this.input.val() != oldVal)
	        this.notify("textChange");	
	},
	
	//sets hidden inputs value
	//takes text input's value as a param
	setHiddenValue: function(val) {
	    var set = false;
	    val = $.trim(val);
	    var oldVal = this.hidden.val();
   	    nomeOriginal = this.selectbox.attr("name");
   	    var nmCampo = this.selectbox.attr("name").split("__");
        if (!this.multiple) {
            for (var i = 0, len = this.options.length; i < len; ++i) {                
				if (val == this.options.eq(i).text().replace(/^\s+|\s+$/g,"")) {
					
					if(nmCampo[0] == "contaDebito" || nmCampo[0] == "empresaServico"){
					    this.hidden.val(this.options.eq(i).val());
					    this.hiddenOrig.val(this.options.eq(i).val());
                    }else{
                        var cdCta = this.options.eq(i).val().split("-");
                        this.hidden.val(cdCta[0]);
                        this.hiddenOrig.val(cdCta[0]);
                        this.hiddenOrigTpCta.val(cdCta[1]);
	
						if(cdCta[1] == "C"){
							this.hiddenOrigCdTpCta.val(1);
							this.hiddenOrigTpDeCta.val("Conta Corrente");
						}else if(cdCta[1] == "P"){
							this.hiddenOrigCdTpCta.val(2);
                            this.hiddenOrigTpDeCta.val("Conta Poupan&ccedil;a");
						}else if(cdCta[1] == "I"){
							this.hiddenOrigCdTpCta.val(1);
							this.hiddenOrigTpDeCta.val("Conta Investimento");
						}else if(cdCta[1] == "E"){						
                            this.hiddenOrigCdTpCta.val(1);
							this.hiddenOrigTpDeCta.val("Conta Empresa");
                        }
                    }
					set = true;
					break;
				}
			}
	    } else {
	        var comboVals = this.getTextValue();
			var hiddenVals = [];
			for (var i = 0, len = comboVals.length; i < len; ++i) {
				for (var j = 0, len1 = this.options.length; j < len1; ++j) {
					if (comboVals[i] == this.options.eq(j).text()) {
						hiddenVals.push(this.options.eq(j).val());
					}      
				}
			}
			
			if (hiddenVals.length) {
				set = true;
				this.hidden.val(hiddenVals.join(this.config.separator));
				this.hiddenOrig.val(hiddenVals.join(this.config.separator));
			}
	    }
	    
	    if (!set) {
	        this.hidden.val(this.config.initialHiddenValue);
	        this.hiddenOrig.val(this.config.initialHiddenValue);
	    }
	    if (oldVal != this.hidden.val())
	        this.notify("change");
	},
	
	listItemClick: function(item) {
	    this.setComboValue(item.text(), true, true);		
		if (typeof trocarTabela != "undefined") 
            trocarTabela(item.text());
	    this.inputFocus();
	},
	
	//adds / removes items to / from the dropdown list depending on combo's current value
	filter: function() {
	    var comboValue = this.input.val();
	    var self = this;
	    
	    this.listItems.each(function() {
	        var $this = $(this);
	        var itemValue = $this.text();
			var itemTitle = $this.attr('title');
			var text = self.filterFn.call(self, self.getCurrentTextValue(), itemValue, self.getTextValue() , itemTitle);
		if (text) {
		    $this.html(text);
			$this.removeClass("invisible").
		    addClass("visible");
		} else {
		    $this.removeClass("visible").
		    addClass("invisible");
		}
	    });

		this.listItems.filter(":odd").addClass("odd");
		this.setOverflow();
	    this.setListHeight();
	},

	//default dropdown list filtering function
	filterFn: function(currentComboValue, itemValue, allComboValues , itemTitle) {		
		try{
			if (!this.multiple) {
				var arr = itemTitle.split("=");
				if(currentComboValue.toLowerCase() == arr[0].toLowerCase())
					return itemValue.toLowerCase().search(arr[1].toLowerCase()) != -1 ? $.highLight(itemValue, arr[1]) : false;
				else
					return itemValue.toLowerCase().search(currentComboValue.toLowerCase()) != -1 ? $.highLight(itemValue, currentComboValue) : false;
			} else {
			   
			}
		}catch(err){
			//console.log(err);
		}
	},
	
	//just returns integer value of list wrapper's max-height property
	getListMaxHeight: function() {
	    return parseInt(this.listWrapper.css("maxHeight") || this.listWrapper.css("height"), 10);
	},

	//corrects list wrapper's height depending on list items height
	setListHeight: function() {
	    var liHeight = this.getListItemsHeight();
	    var maxHeight = this.getListMaxHeight();
	    var listHeight = this.listWrapper.height();

	    if (liHeight < listHeight && !this.config.addNewItem) {
			this.listWrapper.height(liHeight);   
	    } else if (liHeight > listHeight) {
			if (this.config.addNewItem) {
				this.list.height(90);
			} else {
				//DIEGO
				this.listWrapper.height(Math.min(maxHeight || liHeight, liHeight));
			}
	    }

		//if (this.config.addNewItem) this.listWrapper.height(this.config.sizeListWrapper);
	},

	//returns active (hovered) element of the dropdown list
	getActive: function() {
	    return this.listItems.filter(".active");
	},
	
	keyUp: function(e) {
	    this.lastKey = e.keyCode;
	    var k = $sc.KEY;
	    switch (e.keyCode) {
	        case k.RETURN:
		    this.setComboValue(this.getActive().text(), true, true);
		    if (!this.multiple)
		        this.input.blur();
			break;
			case k.DOWN:
				this.highlightNext();
			break;
			case k.UP:
				this.highlightPrev();
			break;
			case k.ESC:
				this.hideList();
			break;
			default:
				this.inputChanged();
			break;
	    }
	},
	
	//returns number of currently visible list items
	liLen: function() {
	    return this.listItems.filter(".visible").length;
	},
	
	//triggered when the user changes combo value by typing
	inputChanged: function() {
	    this.filter();

	    if (this.liLen()) {
	        this.showList();
			this.setOverflow();
			this.setListHeight();
	    } else {
	        this.hideList();
	    }
	    this.setHiddenValue(this.input.val());
	    this.notify("textChange");
	    
	},
	
	//highlights first item of the dropdown list
	highlightFirst: function() {
	    this.listItems.removeClass("active").filter(".visible:eq(0)").addClass("active");
	    this.autoFill();
	},
	
	//highlights item of the dropdown list next to the currently active item
	highlightNext: function() {
	    var $next = this.getActive().next();
	    
	    while ($next.hasClass("invisible") && $next.length) {
	        $next = $next.next();
	    }
	    
	    if ($next.length) {
	        this.listItems.removeClass("active");
		$next.addClass("active");
		this.scrollDown();
	    }
	},
	
	//scrolls list wrapper down when needed
	scrollDown: function() {
	    //if ("scroll" != this.listWrapper.css(this.overflowCSS))
	      //  return;
		
            var beforeActive = this.getActiveIndex() + 1;
			if ($.browser.opera)
			    ++beforeActive;
	    
	    var minScroll = this.listItems.height() * beforeActive - this.listWrapper.height();
        
		if ($.browser.msie)
            minScroll += beforeActive;
	    
	    if (this.listWrapper.scrollTop() < minScroll)
	        this.listWrapper.scrollTop(minScroll);
	},
	
	//highlights list item before currently active item
	highlightPrev: function() {
	    var $prev = this.getActive().prev();
	    
	    while ($prev.length && $prev.hasClass("invisible"))
	        $prev = $prev.prev();
		
            if ($prev.length) {
	        this.getActive().removeClass("active");
		$prev.addClass("active");
		this.scrollUp();
	    }
	},
	
	//returns index of currently active list item
	getActiveIndex: function() {
	    return $.inArray(this.getActive().get(0), this.listItems.filter(".visible").get());
	},
	
	//scrolls list wrapper up when needed
	scrollUp: function() {
	    
	    if ("scroll" != this.listWrapper.css(this.overflowCSS))
	        return;
		
	    var maxScroll = this.getActiveIndex() * this.listItems.height();
	    
	    if (this.listWrapper.scrollTop() > maxScroll) {
	        this.listWrapper.scrollTop(maxScroll);
	    }     
	},
	
	//emptyText stuff
	applyEmptyText: function() {
	    if (!this.config.emptyText.length)
	        return;
		
	    var self = this;	
	    this.input.bind("focus", function() {
                self.inputFocus();
	    }).
	    bind("blur", function() {
                self.inputBlur();
	    });	
	    
	    if ("" == this.input.val()) {
	        this.input.addClass("empty").val(this.config.emptyText);
	    }
	},
	
	inputFocus: function() {
	    if (this.input.hasClass("empty")) {
		this.input.removeClass("empty").
		val("");
            }	
	},
	
	inputBlur: function() {
	    if ("" == this.input.val()) {
		this.input.addClass("empty").
		val(this.config.emptyText);
	    }
	    
	},
	
	//triggerSelected stuff
	triggerSelected: function() {
	    if (!this.config.triggerSelected)
	        return;
		
	    var self = this;	
	    this.options.each(function() {
	        if ($(this).attr("selected")) {		    
		    self.setComboValue($(this).text(), false, true);   
		}
	    });	
	},
	
	//autofill stuff
	autoFill: function() {
	    if (!this.config.autoFill || ($sc.KEY.BACKSPACE == this.lastKey) || this.multiple)
	        return;
		    	
	    var curVal = this.input.val();
	    var newVal = this.getActive().text();
	    this.input.val(newVal);
	    this.selection(this.input.get(0), curVal.length, newVal.length);
	},
	
	//provides selection for autofilling
	//borrowed from jCarousel
	selection: function(field, start, end) {
	    if( field.createTextRange ){
		var selRange = field.createTextRange();
		selRange.collapse(true);
		selRange.moveStart("character", start);
		selRange.moveEnd("character", end);
		selRange.select();
	    } else if( field.setSelectionRange ){
		field.setSelectionRange(start, end);
	    } else {
		if( field.selectionStart ){
			field.selectionStart = start;
			field.selectionEnd = end;
		}
	    }
	   // field.focus();	
	},
	
	//for internal use
	updateDrop: function() {
	    if (this.config.dropUp)
	        this.listWrapper.addClass("list-wrapper-up");
	    else 
	        this.listWrapper.removeClass("list-wrapper-up");		
	},
	
	//updates dropUp config option
	setDropUp: function(drop) {
            this.config.dropUp = drop;   
	    this.updateDrop(); 
	},
	
	notify: function(evt) {
	    if (!$.isFunction(this.config[evt + "Callback"]))
	        return;
		
	    this.config[evt + "Callback"].call(this);	
	}
    });
    
    $sc.extend({
        //key codes
	//from jCarousel
	KEY: {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8	
	},
	
	//for debugging
	log: function(msg) {
	    var $log = $("#log");
	    $log.html($log.html() + msg + "<br />");
	},
	
        createSelectbox: function(config) {
	    var $selectbox = $("<select />").
	    appendTo(config.container).
	    attr({name: config.name, id: config.id, size: "1"});
	    
	    if (config.multiple)
	        $selectbox.attr("multiple", true);
	    
	    var data = config.data;
	    var selected = false;
	    
	    for (var i = 0, len = data.length; i < len; ++i) {
	        selected = data[i].selected || false;
	        $("<option />").appendTo($selectbox).
		attr("value", data[i].value).
		text(data[i].text).
		attr("selected", selected);
	    }
	    
	    return $selectbox.get(0);
	},
	
	create: function(config) {
		var defaults = {
		//the name of the selectbox
		name: "",
		//the ID of the selectbox
		id: "",
		//data for the options
		/*
		This is an array of objects. The objects should contain the following properties:
		(string)value - the value of the <option>
		(string) text - text of the <option>
		(bool) selected - if set to true, "selected" attribute of this <option> will be set to true
		*/
		data: [],
		
		//if true, combo with multiple choice will be created
		multiple: false,
		
		//an element that will contain the widget
		container: $(document),
		//url that contains JSON object for options data
		//format is the same as in data config option
		//if passed, "data" config option will be ignored
		url: "",
		//params for AJAX request
		ajaxData: {}
	};
	    
	config = $.extend({}, defaults, config || {});
	    
	if (config.url) {
		
		return $.getJSON(config.url, config.ajaxData, function(data) {
			delete config.url;
			delete config.ajaxData;
			config.data = data;
			return $sc.create(config);
		});
	}
	
	config.container = $(config.container);
	
	var selectbox = $sc.createSelectbox(config);
	return new $sc(selectbox, config);	    
	},
	
	normalizeArray: function(arr) {
	    var result = [];
	    for (var i = 0, len =arr.length; i < len; ++i) {
	        if ("" == arr[i])
				continue;
		    
			result.push(arr[i]);    
	    }
	    
	    return result;
	}
    });
})(jQuery); 
