var pollingIntervalId;
///==========================
/// @description Executa uma função JavaScript quando a tarefa assíncrona sendo executada pelo applet terminar.
/// @arguments   A função que será executada. Ela deve receber um argumento, do mesmo tipo que aquele retornado pelo método assíncrono do applet
///              que foi chamado.
function runOnAsyncJobDone(func) {
    pollingIntervalId = setInterval(
        function() {
            if(applet.isAsyncJobDone()) {
                clearInterval(pollingIntervalId);
                func(applet.getAsyncJobResult());
            }
        }, 300);
}
