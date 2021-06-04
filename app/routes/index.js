var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/file',(req,res)=>
{
  let path = './' + req.query.path;

  if(fs.existsSync(path))
  {
    fs.readFile(path, (err, data) =>
    {
      if(err)
      {
        console.error(err);
        res.status(400).json(
          {
            error:err
          }
        );
      }else{
         res.status(200).end(data);
      }
    })

  }else
  {
    res.status(404).json({
      err: 'File not found'
    })
  }
})





router.delete('/file',(req,res)=>
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

    let path = './' + fields.path;
    if(fs.existsSync(path))
    {
            
          fs.unlink(path, err =>
            {
              if(err)
              {
                res.status(400).json({
                  err
                });
              }else
              {
                                
              res.json({
                fields
                /**nossos dados como parse separou passamos os arquivos */
              });   
              } 
            });

    } 
  });



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
