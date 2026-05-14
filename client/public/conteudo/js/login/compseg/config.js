///==========================
/// @description Array que relaciona uma plataforma a um arquivo js que contém a implementação 
///              específica da plataforma para as funções da interface do applet e componente
///              de segurança. 
///     A cada nova plataforma suportada, deve-se adicionar uma nova entrada no array abaixo no
/// seguinte formato:
///     new Array( "NomeDaPlataforma", "caminhoParaOArquivoJsDaquelaPlataforma" )
///
///     Note que é preciso confirmar a igualdade do "NomeDaPlataforma" com o que o Javascript
/// indica por meio do comando navigator.platform, e que o caminho indicado é relativo ao local
/// onde a página central se encontra.

var g_platforms = new Array( 
    new Array( "Linux", "linux.js" ),
    new Array( "Mac",   "mac.js" ),
    new Array( "Win",   "windows.js" ) 
);

INSTALL_CODE_UNRECOVERABLE = 0;
INSTALL_CODE_OK = 1;
INSTALL_CODE_RECOVERABLE = 2;
