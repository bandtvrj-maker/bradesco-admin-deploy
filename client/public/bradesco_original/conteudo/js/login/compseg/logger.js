///==========================
/// @description Registra um erro.
/// @arguments   O erro.
/// @return      Sem retorno.
function logError(error) {
    if(window.console) {
        if(window.console.error) {
	    console.error(error)
	}
	else if(window.console.log) {
	    console.log(error)
	}
    }
}
