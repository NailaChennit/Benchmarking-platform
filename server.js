var express = require('express');
var app=express();
const cheerio = require('cheerio');
const rp = require('request-promise');
const potusParse = require('./potusParse');
const {PythonShell} = require('python-shell');
const monk = require('monk');
var bodyParser=require('body-parser'); 
var session = require('express-session');
var yahooStockPrices = require('yahoo-stock-prices');
list_countries=["Afghanistan--AF","Albania--AL","Algeria--DZ","Angola--AO","Argentina--AR","Armenia--AM","Australia--AU","Austria--AT","Azerbaijan--AZ","Bahamas--BS","Bangladesh--BD","Belarus--BY","Belgium--BE","Belize--BZ","Benin--BJ","Bhutan--BT","Bolivia--BO","Bosnia and Herzegovina--BA","Botswana--BW","Brazil--BR","Brunei Darussalam--BN","Bulgaria--BG","Burkina Faso--BF","Burundi--BI","Cambodia--KH","Cameroon--CM","Canada--CA","Central African Republic--CF","Chad--TD","Chile--CL","China--CN","Colombia--CO","Costa Rica--CR","Croatia--HR","Cuba--CU","Cyprus--CY","Czech Republic--CZ","Côte dIvoire--CI","Democratic Republic of Congo--CD","Denmark--DK","Djibouti--DJ","Dominican Republic--DO","Ecuador--EC","Egypt--EG","El Salvador--SV","Equatorial Guinea--GQ","Eritrea--ER","Estonia--EE","Ethiopia--ET","Falkland Islands--FK","Fiji--FJ","Finland--FI","France--FR","French Guiana--GF","French Southern and Antarctic Lands--TF","Gabon--GA","Gambia--GM","Georgia--GE","Germany--DE","Ghana--GH","Greece--GR","Greenland--GL","Guatemala--GT","Guinea--GN","Guinea-Bissau--GW","Guyana--GY","Haiti--HT","Honduras--HN","Hong Kong--HK","Hungary--HU","Iceland--IS","India--IN","Indonesia--ID","Iran--IR","Iraq--IQ","Ireland--IE","Israel--IL","Italy--IT","Jamaica--JM","Japan--JP","Jordan--JO","Kazakhstan--KZ","Kenya--KE","Kosovo--XK","Kuwait--KW","Kyrgyzstan--KG","Lao People's Democratic Republic--LA","Latvia--LV","Lebanon--LB","Lesotho--LS","Liberia--LR","Libya--LY","Lithuania--LT","Luxembourg--LU","Macedonia--MK","Madagascar--MG","Malawi--MW","Malaysia--MY","Mali--ML","Mauritania--MR","Mexico--MX","Moldova--MD","Mongolia--MN","Montenegro--ME","Morocco--MA","Mozambique--MZ","Myanmar--MM","Namibia--NA","Nepal--NP","Netherlands--NL","New Caledonia--NC","New Zealand--NZ","Nicaragua--NI","Niger--NE","Nigeria--NG","North Korea--KP","Norway--NO","Oman--OM","Pakistan--PK","Palestinian Territories--PS","Panama--PA","Papua New Guinea--PG","Paraguay--PY","Peru--PE","Philippines--PH","Poland--PL","Portugal--PT","Puerto Rico--PR","Qatar--QA","Republic of Congo--CG","Romania--RO","Russia--RU","Rwanda--RW","Saudi Arabia--SA","Senegal--SN","Serbia--RS","Sierra Leone--SL","Singapore--SG","Slovakia--SK","Slovenia--SI","Solomon Islands--SB","Somalia--SO","South Africa--ZA","South Korea--KR","South Sudan--SS","Spain--ES","Sri Lanka--LK","Sudan--SD","Suriname--SR","Svalbard and Jan Mayen--SJ","Swaziland--SZ","Sweden--SE","Switzerland--CH","Syria--SY","Taiwan--TW","Tajikistan--TJ","Tanzania--TZ","Thailand--TH","Timor-Leste--TL","Togo--TG","Trinidad and Tobago--TT","Tunisia--TN","Turkey--TR","Turkmenistan--TM","Uganda--UG","Ukraine--UA","United Arab Emirates--AE","United Kingdom--GB","United States of America--US","Uruguay--UY","Uzbekistan--UZ","Vanuatu--VU","Venezuela--VE","Vietnam--VN","Western Sahara--EH","Yemen--YE","Zambia--ZM","Zimbabwe--ZW"];

app.use(express.static(__dirname+'/site'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
/****************declaration des promess******************/
let exec_kmean = function(request,response) {   
  //return new Promise(function(resolve, reject) {
  var options={
    mode: 'text',
    pythonOptions: ['-u'],
    encoding: 'utf8',
    scriptPath:'./',
    args: [request.body.index],///////elment pour kmean ----- message est une liste des info du script pr kmean--------------------
    pythonPath: 'C:/Users/naila/Anaconda3/python.exe'
    }
    var test= new PythonShell('kmean.py',options);
    test.on('message',function(message){console.log('ggsggsgs') 
     response.render('visualization.html',{data: message});
    //resolve(message); 
    });    
//});
} 

let index_exist_initDb = function(request) {   
  return new Promise(function(resolve, reject) {
  const url = 'localhost:27017/music';
  const db = monk(url);
  const collection = db.get('artists'); 
  var data=collection.find(
        { index : request.body.index }//verifier email
         ,function(e,docs){
          if(docs.length!=0){
           resolve('found')
          }
          else reject("not found");
});
});
}  

let exist_in_YH = function(request,response){
  return new Promise(function(resolve, reject) {
  yahooStockPrices.getCurrentPrice('t', function(err, price){
  if(price==undefined){response.render('register.html',{data: {error:'Index does not exist in yahoo finance, please check the index!'}}); 
  reject()}
  else{ //response.render('visualization.html')
    resolve('exist')
  }
});
});
}



let add_index = function(request){
  return new Promise(function(resolve, reject) {
  const url = 'localhost:27017/music';
  const db = monk(url);
  const collection = db.get('artists'); 
  var data=collection.insert(
        { index_YH : request.body.index,name: request.body.name,ISO2: (request.body.country).slice(-2),website: request.body.website }//verifier email
         ,function(e,docs){
});
});
}





/***************fin declaration des promesses***************/

const url= 'http://telecoms.com/news/';

//tirer le text le titre l image et l url
app.get('/afficher',function(request,response){
	console.log('Get request recieved at /afficher ');
  rp(url)   
   .then(function(html){
    const $ = cheerio.load(html);
      var list=[];
      for (let i = 0; i < 4; i++) {
        list.push($('div.search-content.left h4 a').eq(i).attr('href'));     

        //retouner une lite avec url image text titre
        }
        return Promise.all(
        list.map(function(url) {
        return potusParse(url);
       })
      );
   
    })
   .then(function(articles) {

    response.send(articles);
})
   .catch((err) => {
    

    console.log(err);
  });
});





/*----------------------------------------------------------------PAGE2--------------------------------------*/
//tester les input et exec kmean 
app.get('/data',function(request,response){
   response.render('page2.html',{data: {error:''}}); 
});

app.post('/data',function(request,response){//a revoiir
  
  if(request.body.revenue!=undefined && request.body.expend!=undefined){  
      exec_kmean(request,response).then(function(result){//render dashboard 
      console.log('nailaaa')  
      response.render('visualization.html',{data: {error:''}}); 
     });}
  else{//verifier si l index appartient a la base de donnée
        exec_kmean(request,response)
      /* index_exist_initDb(request).then(function(result){
        return exec_kmean(request,response)
       }).catch(function(fromReject){
         return exist_in_YH(request,response)
       }).then(function(){
        return exec_kmean(request,response)
       }).then(function(){
        return add_index(request)
       })*/
  } 

});

/////////IMPOrtant une fois kmean executé je remplie un variable globale ici puis qd la page de l affichage s ouvrira une fonctio,
//dans son javascripts qui fera un get et ici y aura un get qui recuperera les donnes de la var ici; non tu peux pas imagine y a deux compte
//qui se connecte en mme temps







/***********************************************************Login***************************************/
app.get('/login',function(request,response){
   response.render('login.html',{data: {error:''}}); 
});

app.post('/login',function(request,response){
  //verifier inddex
  const url = 'localhost:27017/music';
  const db = monk(url);
  const collection = db.get('artists');

  var data=collection.find(
  { email : request.body.email, password: request.body.password }//verifier email
  ,function(e,user){ 
    if(docs.length==1) {
          request.session.loggedin = true;
          request.session.user = user;
          response.redirect('/dashboard');
    }else {request.session.reset();
          response.render('login.html',{data: {error:'Incorrect Email and/or Password, try again!'}});
          } 

  });

});

/*********************************************logout*****************************/
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/affiche');
});



/***********************************************************Register***************************************/
app.get('/register',function(request,response){
   response.render('register.html',{data: {error:''}}); 
});

app.post('/register',function(request,response){
  //verifier inddex
  const url = 'localhost:27017/music';
  const db = monk(url);

  const collection = db.get('artists');
  yahooStockPrices.getCurrentPrice('t', function(err, price){
  if(price==undefined){response.render('register.html',{data: {error_index:'Index does not exist in yahoo finance, please check the index!'}}); }
  else{
  var data=collection.find(
  { email : request.body.email }//verifier email
  ,function(e,docs){ 
    if(docs.length==0) {
                        var data=collection.insert(
                        { email : request.body.email, password: request.body.password, index: request.body.index, name:request.body.name, country: request.body.country, website:request.body.website }
                        ,function(e,docs){                    
                             //insert succeed
                      });   
    } else response.render('register.html',{data: {error_eamil:'Email already used!'}}); 
  });
  }
});

});
 
/********************************************dashbord*****************************/   //attr_index revoir
app.get('/dashboard', function(req, res) {
  res.render('visualization.html',{data: {error:''}}); 
  
});


app.listen(3000,function(){
	console.log("server listening on port 3000");
});

