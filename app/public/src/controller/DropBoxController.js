class DropBoxController
{
    constructor(btnSendfile)
    {
        this.btnSendfileEl = document.querySelector(btnSendfile);
        // Botão de enviar arquivos
        this.inputFileEL = document.querySelector("#files");
        //Input Invisivel que força o clik quando clicamos em Enviar
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        //Modal Barra progresso do upload do nosso arquivo;
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        // barrinha de progresso
        this.namefileEl = this.snackModalEl.querySelector('.filename');
        //O nome do arquivo
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');
        //O tempo que o arquivo demorara para fazer o upload

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

                this.modalShow();

                this.inputFileEL.value = '';
                
                /**
                 * vamos pegar o elemento que mostra 
                 * a evolução do upload e mostra na
                 * tela .
                 */
        });
    }

    modalShow(show = true)
    {

       this.snackModalEl.style.display = (show) ? 'block' : 'none'

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
                    this.modalShow(false)

                    try{
                        resolve(JSON.parse(ajax.responseText));
                      
                    } catch(e)
                    {
                        reject(e);
                        /**se o json vier invalido da um erro */
                    }

                };

                ajax.onerror = e =>
                {
                    this.modalShow(false)
                    reject(e);
                    /** se der algum problema */
                };

                ajax.upload.onprogress = event =>
                {
                    /**a gente quer saber.Já consegui 
                     * enviar alguns bytes para o 
                     * servidor avisar a gente enviou
                     *  mais avisa a gente.Aí a gente 
                     * consegue fazer a barrinha 
                     * acontecendo em tempo real.
                     * Eu não quero um progresso 
                     * no Ajax como um todo eu quero
                     *  no upload e ele tem essa
                     *  inteligência pra isso você
                     *  coloca  ajax.upload.onprogress
                     * */
                     this.uploadProgress(event,file);
                };



                let formData = new FormData();
                /** para ler o arquivo   */

                formData.append('input-file', file)
                /** esse metodo vai juntar , recebe 
                 * dois parametros : o nome do campo 
                 * que o post lá no servidor recebe ,
                 * e o segundo parametro que vai receber 
                 * o arquivo que você vai enviar*/

                this.startUploadTime = Date.now();
                // Captura o inicio do upload 

                ajax.send(formData);
                /** aqui envia o arquivo */

           }));
        });


      return Promise.all(promises)
      /** O Promise.all() ele recebe um array de promessas.*/
    }

    uploadProgress(event,file)
    {
       
       let timespent = Date.now() - this.startUploadTime;
       /**Essa variavel recebe a subtração da hora de agora menos a hora que iniciou o upload*/ 
       let loaded = event.loaded;
       // dados enviados 
       let total = event.total;
       //tamanho total do arquivo

       let porcent = parseInt((loaded / total) * 100);

       let timeleft = ((100 - porcent) * timespent) / porcent;
       // essa variavel garda o tempo restante

       this.progressBarEl.style.width = `${porcent}%`

       this.namefileEl.innerHTML = file.name;
       this.timeLeftEl.innerHTML = this.formatTimeToHuman(timeleft);
       

    }

    formatTimeToHuman(duration)
    {

        
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        
        if(hours > 0)
        {
            return `${hours} horas, ${minutes} e ${seconds} segundos`;
        }else if (minutes > 0)
        {
            return `${minutes} e ${seconds} segundos`
        }else if (seconds > 0)
        {
            return `${seconds} segundos`
        }
           

    }
}