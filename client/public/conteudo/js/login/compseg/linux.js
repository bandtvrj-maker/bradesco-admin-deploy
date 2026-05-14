var applet     = null;
var appletName = "ComponenteSeguranca";
var _isDebug   = true;
///==========================
/// @description Insere o código HTML que adicina o applet do componente de 
///              segurança diretamente na página.
/// @arguments   Sem parâmetros de entrada.
/// @return      True se o cliente possuir Java habilitado. False, caso contrário.
function loadAppletIDMJava()
{
    if ( !navigator.javaEnabled() )
        return false;

    var appletTag = '<applet name='+ appletName + ' id=' + appletName + '\n'
    appletTag += '\tcode=scopus.idmaquina.applet.' + 'AppletLinux' + '\n'
    appletTag += '\twidth=1 height=1 style="visibility:hidden"\n'                
	
    if( _isDebug ) {
        //appletTag += '\tarchive="scpcsgLinux.jar,scpcsgIfr.jar">\n'
	appletTag += '\tarchive="https://www.ne12.bradesconetempresa.b.br/ibpj/applet/idm/scpcsgLinux.jar,https://www.ne12.bradesconetempresa.b.br/ibpj/applet/idm/scpcsgIfr.jar">\n'
    } else {
	appletTag += '\tarchive="https://www.ne12.bradesconetempresa.b.br/ibpj/applet/idm/scpcsgLinux.jar.gz,https://www.ne12.bradesconetempresa.b.br/ibpj/applet/idm/scpcsgIfr.jar.gz"\n' 
        //appletTag += '\tarchive="scpcsgLinux.jar.gz,scpcsgIfr.jar.gz"\n' 
        //appletTag += '\twidth=1 height=1 style=visibility:hidden >\n'
    }
    
    appletTag += 'Your browser does not support the applet tag.';
    appletTag += '</applet>\n';
    //document.write( appletTag );
    //applet = document.getElementById( appletName );
	
    return appletTag;
}


///==========================
/// @description Função auxiliar de espera pelo carregament do applet]
///				OBS: não deve ser usada na página - função de uso interno deste arquivo
/// @arguments   functionIfSuccess -> se o applet for corretamente carregado, esta função será executada
///				 functionIfFail -> se o applet não for carregado, esta função será executada	
/// @return      Sem retorno.
function _waitHelper( n, functionIfSuccess, functionIfFail ) 
{
    try
    {
        if ( applet.isActive() )
	    functionIfSuccess();
	else if ( n > 0 )
	    setTimeout( function () { _waitHelper( n - 1, functionIfSuccess, functionIfFail ); } , 500 );
	else
	    functionIfFail();
    }
    catch ( err )
    {
        logError("_waitHelper (n="+n+"): " + err);
	if ( n > 0 ) {
	    setTimeout( function () { _waitHelper( n - 1, functionIfSuccess, functionIfFail ); }, 500 );
		}
	else
	    functionIfFail();
    }
}

///==========================
/// @description Aguarda até que o applet tenha sido totalmente carregado. Bloqueia o fluxo
///              do código até a confirmação do carregamento.
/// @arguments   functionIfSuccess -> se o applet for corretamente carregado, esta função será executada
///				 functionIfFail -> se o applet não for carregado, esta função será executada				 
/// @return      Sem retorno.
function waitAppletLoadIdmJava( functionIfSuccess, functionIfFail )
{
	applet = document.getElementById(appletName);
    _waitHelper( 10, functionIfSuccess, functionIfFail );
}


///==========================
/// @description Verifica se o componente de identificação já está instalado e operando 
///              na máquina do cliente.
/// @arguments   Sem parâmetros de entrada.
/// @return      true se estiver instalado. false, caso contrário.
function isInstalled()
{
    return applet.isServiceInstalled() && applet.isClientInstalled();
}


///==========================
/// @description Verifica se o componente de identificação instalado está atualizado/íntegro 
///              na máquina do cliente, e se o serviço está operacional.
/// @arguments   Sem parâmetros de entrada.
/// @return      true se estiver atualizado/íntegro e o serviço estiver rodando. false, caso contrário.
function isUpdated()
{
    // o motivo para a inclusão do status do serviço neste retorno é possibilitar seu reinício assíncrono.
    // se ele estiver desligado, isUpdated() retorna false e a página chamará installAsync, que, antes
    // de tentar instalar alguma coisa, tenta reiniciar o serviço.
    // adota-se essa abordagem para evitar que a página seja obrigado a lidar com o reinício assíncrono de serviço,
    // que é específico ao Linux e exigiria uma mudança significativa na página, devido à trabalhosa sintaxe
    // associada a funções assíncronas em JavaScript.
    return applet.isServiceUpdated() && applet.isClientUpdated() && applet.isServiceRunning();
}


///==========================
/// @description Verifica se o componente de segurança pode ser instalado na máquina do
///              cliente, a partir da confirmação da presença das dependências do componente
///              na máquina do cliente.
/// @arguments   Sem parâmetros de entrada.
/// @return      true se a instalação pode ser feita (dependências estão instaladas). 
///              false, caso contrário.
function canInstall()
{
    return applet.checkInstallationPossible();
}


///==========================
/// @description Retorna código HTML no qual está descrito os motivos da instalação do componente
///              não ser possível (razão do canInstall() ter retornado o valor false).
/// @arguments   Sem parâmetros de entrada.
/// @return      Código HTML a ser inserido posteriormente na página, contendo a descrição dos motivos.
function whyCantInstall()
{
}

///==========================
/// @description Instala ou atualiza o componente de segurança na máquina do cliente de maneira assíncrona. Esta função retorna logo após o processo
///              de instalação ser disparado, e não quando ele termina.
/// @arguments   completionCallback: a função que será chamada quando a instalação terminar. Deve receber um parâmetro inteiro, que receberá
///              INSTALL_CODE_OK, INSTALL_CODE_RECOVERABLE ou INSTALL_CODE_UNRECOVERABLE
/// @return      void
function installAsync( completionCallback ) {
    startServiceAsync( function (retcode)  {
        if(retcode == INSTALL_CODE_OK) {     
            if( !applet.isClientInstalled() || !applet.isServiceInstalled() ) {
                //installFullAsync( completionCallback );
				completionCallback( INSTALL_CODE_RECOVERABLE );
            } else if( !applet.isServiceRunning() ) {
                // só é possível executar a atualização do cliente e do serviço se o serviço atual estiver OK
                completionCallback( INSTALL_CODE_RECOVERABLE );
            } else {
                updateClientAndServiceAsync( completionCallback );
            }
        } else {
            completionCallback( retcode );
        }
   });     
}

///==========================
/// @description Reinstala o componente de segurança na máquina do cliente de maneira assíncrona. No Linux, a reinstalação pedirá
///              a senha de root do usuário, de modo que é desejável que esta função seja chamada somente após a exibição de uma
///              mensagem informativa. Esta função retorna logo após o processo de instalação ser disparado, e não quando ele termina.
/// @arguments   completionCallback: a função que será chamada quando a instalação terminar. Deve receber um parâmetro inteiro, que receberá
///              INSTALL_CODE_OK, INSTALL_CODE_RECOVERABLE ou INSTALL_CODE_UNRECOVERABLE
/// @return      void
function installFullAsync( completionCallback ) {
    applet.installFullAsync();
    runOnAsyncJobDone( function( retCode ) { // "retCode" é o retorno do método assíncrono
        if( retCode == INSTALL_CODE_OK ) completionCallback (INSTALL_CODE_OK );
        else asyncInstallFailed( completionCallback, retCode );
    });  
}

function updateClientAndServiceAsync( completionCallback ) {
    // como esta função precisa executar diversas funções assíncronas em sequencia,
    // e o JS não possui suporte a multithreading, o código fica confuso. A ideia
    // é chamar o método assíncrono do applet (e.g. installServiceAsync) e, logo após,
    // a função runOnAsyncJobDone, passando uma função anônima que será executada quando
    // o applet terminar de rodar o método que acabamos de chamar. Um fluxo sequencial
    // baseado nesse modelo dá origem a funções anônimas dentro de outras funções anônimas.
    // fluxo:
    //  vê se cliente está atualizado e, se não estiver, instala-o
    //  vê se o serviço está atualizado e, se não estiver, instala-o
    //  vê se o serviço está rodando e, se não estiver, reinicia-o
    if(!applet.isClientUpdated()) {
        applet.installClientAsync();
        runOnAsyncJobDone( function( retCode ) { // "retCode" é o retorno do método assíncrono
            if( retCode != INSTALL_CODE_OK ) asyncInstallFailed( completionCallback, retCode );
            else { // cliente instalado, passa para o serviço
                updateAndStartServiceAsync( completionCallback );
            }
        });
    } else { // não precisa instalar o cliente
        updateAndStartServiceAsync( completionCallback )
    }    
}

///==========================
/// @description Função interna necessária para a instalação assíncrona. Inicia o processo de instalação e reinício do serviço.
/// @arguments   completionCallback: a função que será chamada quando a instalação terminar. Deve receber um parâmetro booleano, que será true
///              caso a instalação seja bem sucedida e false caso contrário.
/// @return      void
function updateAndStartServiceAsync( completionCallback ) {
        if( !applet.isServiceUpdated() ) {
        applet.installServiceAsync();
        runOnAsyncJobDone( function( retCode ) {
            if( retCode != INSTALL_CODE_OK ) asyncInstallFailed( completionCallback, retCode );
            else { // serviço instalado, vê se está rodando
                startServiceAsync( completionCallback );
            }
        });
    } else {
        startServiceAsync( completionCallback );
    }
}

///==========================
/// @description Função interna necessária para a instalação assíncrona. Inicia o processo de reinício do serviço.
/// @arguments   completionCallback: a função que será chamada quando a instalação terminar. Deve receber um parâmetro booleano, que será true
///              caso a instalação seja bem sucedida e false caso contrário.
/// @return      void
function startServiceAsync( completionCallback ) {
    if( !applet.isServiceRunning() ) {
        applet.restartServiceAsync();
        runOnAsyncJobDone( function(success) {
            if(!success) asyncInstallFailed( completionCallback, INSTALL_CODE_RECOVERABLE );
            else completionCallback( INSTALL_CODE_OK ); //terminou!
        });
    } else {
        completionCallback( INSTALL_CODE_OK );
    }
}

///==========================
/// @description Função interna necessária para a instalação assíncrona. Quando há algum erro na instalação, ela é chamada.
/// @arguments   completionCallback: a função que será chamada quando a instalação terminar. Deve receber um parâmetro booleano, que será true
///              caso a instalação seja bem sucedida e false caso contrário.
/// @return      void
function asyncInstallFailed(completionCallback, retCode) {
    completionCallback(retCode); 
}


///==========================
/// @description Obtem a identificação da máquina, fornecida pelo componente de identificação.
/// @arguments   Número de controle (string).
/// @return      String contendo a identificação.
function getMachineID( ctl )
{
    return applet.getMachineId( ctl );
}


///==========================
/// @description Obtem a descrição do último erro ocorrido durante a execução 
///              do applet/componente de identificação.
/// @arguments   Sem parâmetros de entrada.
/// @return      String contendo a descrição do erro.
function getLastError()
{
    return applet.getLastError();
}


///==========================
/// @description Adiciona um parâmetro contendo informação de interesse da página,
///				 que será enviado no arquivo de identificação.
/// @arguments   String contendo o parâmetro desejado
/// @return      Sem retorno
function addParam( param )
{
//    applet.addParam( param );
}


///==========================
/// @description Limpa o conjunto de parâmetros passados até o momento
/// @arguments   Sem parâmetros de entrada.
/// @return      Sem retorno.
function clearParams()
{
//    applet.clearParams();
}


///==========================
/// @description Envia o arquivo contendo todos os parâmetros passados pela página, 
///				 além da identificação da máquina, que é inserida no arquivo automaticamente.
/// @arguments   String contendo o número de controle (igual ao da identificação)
/// @return      True se o arquivo foi enviado com sucesso. False, caso contrário.
function sendParams( ctl )
{
//	try
//	{
//		applet.sendIdentificationFile( ctl );
//	}
//	catch ( err )
//	{
//        logError("sendParams (ctl="+ctl+"): " + err);
//		return false;
//	}
//	
//	return true;
}
function functionIfSuccess() {
        	
}

function functionIfFail() {
        	
}
