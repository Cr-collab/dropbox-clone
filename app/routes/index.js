var express = require('express');
var router = express.Router();
var formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',(req,res)=>
{

  let form = new formidable.IncomingForm/* recuperando o formulario*/({
       
        uploadDir:'./upload',
        keepExtensions: true

  });


  form.parse/**Nesse momento faz o parse 
   * dos dados que estão vindo*/(req/**os dados*/,(err/**erros*/,fields,files)=>
   /** esse dois parametros 
    * ele separa o que são dados
    *  enviado via post ou se são
    *  arquivos  */
  {
    res.json({
      files
      /**nossos dados como parse separou passamos os arquivos */
    });
  });



});

module.exports = router;
