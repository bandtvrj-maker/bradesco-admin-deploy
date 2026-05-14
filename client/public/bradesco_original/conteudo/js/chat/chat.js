			$(function() { 
				$( "#div1" ).draggable(); 
				$( ".abreChat, #maximizaChat" ).click(function(){
					$( "#div1" ).attr('style', 'z-index: 3; width: 1px; height: 1px; position: relative; left: 0px; top: 0px;display:table-cell;float:left;');
					$('#menuChatCab').attr('style', 'height: 20px;width: 401px;background-color: #0050A2;');
					$('#menuChatRod').attr('style', 'height: 20px;width: 401px;background-color: #0050A2;');
					$('#conteudoChat').animate({scrollTop:0}, 'slow');
					$('#conteudoChat').attr('style', 'width: 401px;height: 513px;border: none;');
					$('#maximizaChat').attr('style', 'display:none');
					$('#conteudoChat').attr('src', 'https://homologacao.nccserver.com.br/homologacao/bradescoinstitucional/bradescopj/chat/Cliente/frm_login.aspx?IdArea=3&sel=HomePage&layout=migracao');
					$('html, body').animate({scrollTop:0}, 'slow');
				});
				$('#minimizar').click(function(){
					$( "#conteudoChat, #menuChatCab, #menuChatRod").attr('style', 'display:none')
					$( "#div1" ).removeAttr('style');
					//$( "#div1" ).attr('style','color: white;text-decoration: none;');
					$( "#maximizaChat" ).attr('style','bottom: 10px;background-color: #bf0000;text-align: center;padding-top: 11px;color: white;');
					$( "#maximizaChat" ).addClass('topcontrol');
					//$( "#maximizaChat" ).addClass('style', 'display: block;bottom: 10px;background-color: #bf0000;text-align: center;padding-top: 11px;color: white;');
				})
				$('#fechar').click(function(){
					$('#div1').attr('style', 'display:none');
					$('#conteudoChat').removeAttr('src', 'https://homologacao.nccserver.com.br/homologacao/bradescoinstitucional/bradescopj/chat/Cliente/frm_login.aspx?IdArea=3&sel=HomePage&layout=migracao');
				});
				//alert($(document).width()); //largura da página
				//alert($(document).height()) //altura da página
			});