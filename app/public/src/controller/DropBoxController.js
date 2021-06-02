class DropBoxController
{
    constructor(btnSendfile)
    {
        this.btnSendfileEl = document.querySelector(btnSendfile);
        this.inputFileEL = document.querySelector("#files");
        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.initEvents();
    }

    initEvents()
    {
             
        this.btnSendfileEl.addEventListener('click',event =>
        {
              this.inputFileEL.click();
              /**
               * Estou ouvindo o click do botão enviar
               * Arquivos que força o click no input 
               * file que nâo esta visivel. 
               */
        });

        
        this.inputFileEL.addEventListener('change', event =>
        {
                /**
                 * Esta escutando o evento no input 
                 * que vai pegar os arquivos 
                 * para agir. 
                 */
                 this.uploadTask(event.target.files);
                /** aqui nesse método estamos pegando
                 *  evento selecionando alvo através
                 *  do target e pegando o dados dos 
                 * arquivos selecionados.
                 */
                

                this.snackModalEl.style.display = 'block';
                /**
                 * vamos pegar o elemento que mostra 
                 * a evolução do upload e mostra na
                 * tela .
                 */
        });
    }

    uploadTask(files/**aqui esta recebendo 
        como parametro quando esse método 
        for chamado os arquivos do usaurio*/)
    {
      /**
       * esse método vai receber nossos
       * arquivos.
       **/  

      let promises = [];
      /**
       * crimaos um array onde cada arquivo
       * vai ter uma promessa. por que ?
       * cada arquivo pode fazer upload
       * ou não.
       */
       [...files].forEach(file =>
        {
           promises.push
           /** se eu fizer um push de 5 
            * arquivos eu vou fazer um pus-
            * h de 5 promessas
            * */(new Promise((resolve,reject) => 
           {
               
                let ajax = new XMLHttpRequest();

                ajax.open('POST','/upload');
                /* aqui vamos abri nossa 
                   conexxão via post vamos 
                   mandar para pasta upload; 
                **/


                ajax.onload/** assim descrobiremos
                 se deu errado; */ = event =>
                {

                    try{
                        resolve(JSON.parse(ajax.responseText));
                    } catch
                    {
                        reject(e);
                        /**se o json vier invalido da um erro */
                    }

                };

                ajax.onerror = e =>
                {
                    reject(e);
                    /** se der algum problema */
                };

                let formData = new FormData();
                /** para ler o arquivo   */

                formData.append('input-file', file)
                /** esse metodo vai juntar , recebe 
                 * dois parametros : o nome do cmapo 
                 * que o post lá no servidor receba ,
                 * e o segundo parametro que vai receber 
                 * o arquivo que você vai enviar*/

                ajax.send(formData);
                /** aqui envia o arquivo */

           }));
        });


      return Promise.all(promises)
      /** O Promise.all() ele recebe um array de promessas.*/
    }
}