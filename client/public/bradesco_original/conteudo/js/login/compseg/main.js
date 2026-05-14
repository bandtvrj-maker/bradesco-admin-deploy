///==========================
/// @description Verifica qual a plataforma que o cliente está utilizando para
///              acessar a página e insere diretamente nela o código HTML que 
///              inclui o arquivo de javascript adequado para o conjunto
///              applet + componente de identificação.
///     OBS: Utiliza o array descrito em config.js
/// @arguments   Sem parâmetros de entrada.
/// @return      Sem retorno.
function includeSpecificJS()
{
    var destination = new String();
    
    var url = window.top.location.href;
    url = url.split("/");
	
    var dominio = url[0]+"//"+url[2];
    var dominioEstatico = dominio.replace("12","13");

    for ( i = 0; i < g_platforms.length; ++i )
    {
        var regex = new RegExp( g_platforms[i][0], "i" );        
	    
        if ( navigator.platform.search( regex ) >= 0 )
        {
            document.write( '<script type="text/javascript" language="javascript"' +
                            ' charset="utf-8" src="'+ dominioEstatico +'/ibpj/conteudo/js/login/compseg/' + g_platforms[i][1] + '">\n</script>' );
            return;
        }
    }
}


///==========================
/// @description Verifica se a plataforma usada pelo cliente para acessar a 
///              página é suportado pelos conjuntos disponíveis de 
///              applet + componente de identificação.
///     OBS: Utiliza o array descrito em config.js. 
/// @arguments   Sem parâmetros de entrada.
/// @return      true se a plataforma em uso possui suporte. false, caso contrário.
function isPlatformSupported()
{
    for ( i = 0; i < g_platforms.length; ++i )
    {
        var regex = new RegExp( g_platforms[i][0], "i" );        
        if ( navigator.platform.search( regex ) >= 0 )
            return true;
    }
    
    return false;
}


///==========================
/// @description Função auxiliar que obtem o nome de uma função javascript.
/// @arguments   Função da qual se deseja o nome.
/// @return      String contendo o nome da função.
function getFunctionName( func ) 
{
	var name = null;
	
	if (  typeof func == "function" || typeof func == "object" )
		name = ("" + func).match( /function\s*([\w\$]*)\s*\(/ );
		
	if ( name !== null )
		return name[1];
}