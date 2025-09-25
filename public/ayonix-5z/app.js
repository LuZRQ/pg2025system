/*******************************************************************************************************
**                                                                                                    **
**                  **  **    **    **    **   **  ****  **    **                                     **
**                 ***   **  **   *****   ***  **   **    **  **                                      **
**                ****    ****   **   **  **** **   **     ****                                       **
**               ** **     **    **   **  *******   **     ****                                       **
**              ******    **     ******   **  ***   **    **  **                                      **
**             **   **   **       ****    **   **  ****  **    **                                     **
**                     DESARROLLADO POR SAYLORD   VERSION  5                                          **
** Referencias: www.ayonix.globalnex.com                                                                **
** Contacto:    76748126                                                                              **
** Programador: Jhonny Stanley Lima Mamani                                                            **                     **
*******************************************************************************************************/
var appweb='';
SHELLOBJ=``;

//APLICAR THEMA A GRAFICAS
if(getComputedStyle(document.documentElement).getPropertyValue('--colpri'))
{	//console.log('Existen colores.');
	var colpri=getComputedStyle(document.documentElement).getPropertyValue('--colpri');
	var colsec=getComputedStyle(document.documentElement).getPropertyValue('--colsec');
	var colter=getComputedStyle(document.documentElement).getPropertyValue('--colter');
	var colok =getComputedStyle(document.documentElement).getPropertyValue('--colok');
	var colwar=getComputedStyle(document.documentElement).getPropertyValue('--colwar');
	var colblk=getComputedStyle(document.documentElement).getPropertyValue('--colblk');
	var colfoc=getComputedStyle(document.documentElement).getPropertyValue('--colfoc');
}
else
{	//console.log('No, existe colores');
	axtheme('purple','white','black','yellow','#008800','#dddddd','#880000');
	axfont('arial');
	//ESTAS VARIABLES NO PUEDEN SER DEFINIDAS DENTRO DE UN PROCEDIMIENTO
	var colpri='purple';
	var colsec='white';
	var colter='black';
	var colfoc='yellow';
	var colok ='#008800';
	var colblk='#dddddd';
	var colwar='#880000';

	var tex='arial';
}

// ESTILO DE TEXTO
if(getComputedStyle(document.documentElement).getPropertyValue('--tex'))
{	var tex=getComputedStyle(document.documentElement).getPropertyValue('--tex');
}
else
{	axfont('arial');
}

/*=== @THEMA - CAMBIO DE COLORES ===================================================*/

function axtheme(pri,sec,ter,foc,ok,blk,war)
{	document.documentElement.style.setProperty('--colpri',pri);
	document.documentElement.style.setProperty('--colsec',sec);
	document.documentElement.style.setProperty('--colter',ter);
	document.documentElement.style.setProperty('--colfoc',foc);
	document.documentElement.style.setProperty('--colok',ok);
	document.documentElement.style.setProperty('--colblk',blk);
	document.documentElement.style.setProperty('--colwar',war);
	var colpri=pri;
	var colsec=sec;
	var colter=ter;
	var colfoc=foc;
	var colok =ok;
	var colblk=blk;
	var colwar=war;
	//var colpri=getComputedStyle(document.documentElement).getPropertyValue('--colpri');
	//document.querySelector("meta[name='theme-color']").setAttribute("content",colpri);
}

function axcolpri(colpri)
{	document.documentElement.style.setProperty('--colpri',colpri);
	var colpri=colpri;
}

function axcolsec(colsec)
{	document.documentElement.style.setProperty('--colsec',colsec);
	var colsec=colsec;
}

function axcolter(colter)
{	document.documentElement.style.setProperty('--colter',colter);
	var colter=colter;
}

function axfont(tx)
{	document.documentElement.style.setProperty('--tex',tx);
	var tex=tx;
}

function axthemestyle()
{	//document.documentElement.style.setproperty('--nombreVariable', 'valor');
	var colpri=getComputedStyle(document.documentElement).getPropertyValue('--colpri');
	document.querySelector("meta[name='theme-color']").setAttribute("content",colpri);
	//console.log(colpri);
}

/*=== @ajax - ENVIO AJAX ====================================*/

/*=== CARGA UN DIV CON UN DOC PHP =======EJ:  load('IDDIV','arch.php');            */
function axajaxload(IdObj,Url)
{ // El XMLHttpRequest object
	var Ajax;
	document.getElementById(IdObj).innerHTML = '<center><img  src=ayonix/load.gif></center>';
	try { Ajax = new XMLHttpRequest(); } // Firefox, Opera 8.0+, Safari 
	catch (e)
	{	try { Ajax = new ActiveXObject("Msxml2.XMLHTTP");} // Internet Explorer
		catch (e)
		{	try{ Ajax=new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e)
			{ alert("Tu explorador no soporta AJAX.");
			return false;
			}
		}
	}
	Ajax.onreadystatechange=function()
	{ if(Ajax.readyState==4 && Ajax.status == 200)
		{	document.getElementById(IdObj).innerHTML = Ajax.responseText; }
	}
	Ajax.open("GET",Url,true);
	Ajax.send(null);
}


/*=== FUNCION PARA CARGAR ARCHIVOS ===        onclick="loadform('IDDIV','arch.php','NAMEFORM');"        */
function axajaxloadform(IdConte,Url,NameForm)
{ 	//No se puede poner load pues se requiere que el formulario este activo los objetos
	//document.getElementById(IdConte).innerHTML='<br><br><center><img  src=ayonix/load.gif></center>';
	OBJFD = new FormData( document.forms.namedItem(NameForm) );
	//OBJFD.append("Nom" ,"Stanley");
	//OBJFD.append("Edad",25);
	Ajax = new XMLHttpRequest();
	Ajax.open("POST",Url,true);
	Ajax.onreadystatechange=function()
	{	if(Ajax.readyState==4 && Ajax.status==200)
		{	document.getElementById(IdConte).innerHTML = Ajax.responseText;	}
	}
	Ajax.send(OBJFD);
}

function axblkload(obj,limt)
{	let CNT=document.getElementById(obj);
	TXM=`
	<section  class='axload'>
		<h2>Cargando...</h2>
		<article>
			<label  id='${obj}TI'>0 %</label>
			<aside  id='${obj}LO'></aside>
		</article>
	</section>
	`;
	CNT.innerHTML=TXM;

	let	T=0;
	let	S=0;
	let	I=axredo( 100/(limt*60),2);
	let BRRC=document.getElementById(`${obj}LO`);
	let BRRT=document.getElementById(`${obj}TI`);

	var axloadt=setInterval(()=>
	{	T=axredo(T+I+S*2,2);
		if(S!=0)
		{	S--;	}

		BRRC.style.width=`${T}%`;
		BRRT.innerHTML=`${T} %`;

		//CERRAMOS
		if(T>=99){	clearInterval(axloadt);	}
		//console.log(`Timer... ${T}`);
	},1000);
}
/*===  FUNCION QUE ACTUALIZA UN CONTENIDO ===  onload=\"refresh('IDDIV','PersonOnLine.php',15000);\"
																DETENERLO ===  clearTimeout(IdObj);*/
function refresh(IdObj,Arch,TimeC)
{	aload(IdObj,Arch);
	IdObj = setTimeout("refresh('"+IdObj+"','"+Arch+"',"+TimeC+")",TimeC) 
} 

function aload(IdObj,Url)
{ // El XMLHttpRequest object
	var Ajax;
	try { Ajax = new XMLHttpRequest();} // Firefox, Opera 8.0+, Safari 
	catch (e)
	{ try { Ajax = new ActiveXObject("Msxml2.XMLHTTP");} // Internet Explorer
		catch (e)
		{ try { Ajax=new ActiveXObject("Microsoft.XMLHTTP"); }
		catch (e)
		{ alert("Tu explorador no soporta AJAX.");
			return false;
		}
	}
	}
	Ajax.onreadystatechange=function()
	{	if(Ajax.readyState==4 && Ajax.status == 200)
		{	document.getElementById(IdObj).innerHTML = Ajax.responseText; }
	}
	Ajax.open("GET",Url,true);
	Ajax.send(null);
}

function loadjson(IdObj,Url,NumRen)
{ // El XMLHttpRequest object
	var Ajax;
	var MATZ;
	document.getElementById(IdObj).innerHTML = '<center><img  src=ayonix/load.gif></center>';
	try { Ajax = new XMLHttpRequest(); } // Firefox, Opera 8.0+, Safari 
	catch (e)
	{	try { Ajax = new ActiveXObject("Msxml2.XMLHTTP");} // Internet Explorer
		catch (e)
		{ try { Ajax=new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e)
			{ alert("Tu explorador no soporta AJAX.");
				return false;
			}
		}
	}
	Ajax.onreadystatechange=function()
	{	if(Ajax.readyState==4 && Ajax.status == 200)
		{	//document.getElementById(IdObj).innerHTML = Ajax.responseText;
			var MATZ=JSON.parse(Ajax.responseText);
			document.getElementById(IdObj).innerHTML='';
			render(IdObj,MATZ,NumRen);
		}
	}
	Ajax.open("GET",Url,true);
	Ajax.send(null);
}

/*=== CARGA ARCHIVOS CUANDO EL CONTENEDOR ESTE VACIO =======EJ:  vload('IDDIV','arch.php');            */
function vload(IdObj,Url)
{ // El XMLHttpRequest object
	if(document.getElementById(IdObj).innerHTML=='')
	{	var Ajax;
		document.getElementById(IdObj).innerHTML = '<br><br><center><img  src=ayonix/load.gif></center>';
		try
		{	Ajax = new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari
		}  
		catch(e)
		{	try
			{	Ajax = new ActiveXObject("Msxml2.XMLHTTP");	} // Internet Explorer
			catch(e)
			{	try
				{	Ajax=new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(e)
				{	alert("Tu explorador no soporta AJAX.");
					return false;
				}
			}
		}
		Ajax.onreadystatechange=function()
		{	if(Ajax.readyState==4 && Ajax.status==200)
			{ document.getElementById(IdObj).innerHTML = Ajax.responseText; }
		}
		Ajax.open("GET",Url,true);
		Ajax.send(null);
	}
}

function axload(obj,tk)
{	document.getElementById(obj).innerHTML=tk;
}

function axloadadd(obj,tk)
{	let tpl=document.createElement('template');
	tpl.innerHTML=tk;
	document.getElementById(obj).appendChild(tpl.content);
}

function axloadtop(obj,tk)
{	let tpl=document.createElement('template');
	tpl.innerHTML=tk;
	document.getElementById(obj).prepend(tpl.content);
}

async function axdataget(endpoint)
{	try
	{	let resp = await fetch(endpoint);
		let json = await resp.json();
		//console.log(resp.status);
		//console.log(resp.statusText);
		//console.log(resp.ok);
		if(json.length!=0)
		{	return json;	}
		else
		{	return {msg:'none'};	}
	}
	catch(err)
	{	return {msg:'error de endpoint'}
	}
}

async function axdatapost(endpoint,idf)
{	let FD,resp,json,T;
	try
	{	switch(typeof idf)
		{	case "string":
				FD=new FormData(document.getElementById(idf));
				resp = await fetch(endpoint,{method:'POST',body:FD});
				json = await resp.json();
				if(json.length!=0)
				{	return json;	}
				else
				{	return {resp:false,msg:'none'};	}
			break;

			case "undefined":
				resp = await fetch(endpoint,{method:'POST'});
				json = await resp.json();
				if(json.length!=0)
				{	return json;	}
				else
				{	return {resp:false,msg:'none'};	}
			break;

			case "object":
				//T=Object.keys(idf).length;
				let T = 0;
				for (const key in idf)
				{	if (idf.hasOwnProperty(key))
					{	T++;
						if (typeof idf[key] === 'object' && !Array.isArray(idf[key]))
						{	T += contarPropiedades(idf[key]);
						}
					}
				}
				console.log(T);
			break;
			case "boolean": 	axmsg('Es Booleano'); 	break;
			case "function": 	axmsg('Es funcion'); 	break;
			case "number": 		axmsg('Es numero'); 	break;
			default: 			axmsg('Desconocido'); 	break;
		}
	}
	catch(err)
	{	return {"resp":false,"msg":'error in endpoint'}
	}
}

function axfrmeventsend(endpoint,idf)
{	let FRM=document.getElementById(idf);
	FRM.addEventListener('submit',e=>
	{	e.preventDefault();
		let FD=new FormData(FRM);
		fetch(endpoint,{method:'POST',body:FD})
		.then(resp=>resp.json())
		.then(data=>
		{	axmsgok('Se registro');
		})
		.catch(err=>
		{	axmsgerr('No, se registro');
			console.log(err);
		})
	})
}

// @num - FUNCIONES PARA NUMEROS 

// onkeyup="axvalupp(this)"
function axvalupp(obj)
{	obj.value=obj.value.toUpperCase();
}

// onkeyup="axvallow(this)"
function axvallow(obj)
{	obj.value=obj.value.toLowerCase();
}

/*=== VALIDAR NUMEROS ===    onkeypress="return axvalnum(event)"    ======*/
function axvalnum(tecla)
{	sw=false;
	if(tecla.which != 0)
	{ 	VecTecl = [13,8,32,46,48,49,50,51,52,53,54,55,56,57];
		for(var i in VecTecl)
		{ 	if(tecla.which == VecTecl[i])
			{ sw = true;
				break;
			}
		}
	}
	else
	{	VecEsp = [37,39,9,46];
		for(var i in VecEsp)
		{ 	if(tecla.keyCode == VecEsp[i])
			{	sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{ //alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	} 
}

/*=== VALIDAR NUMEROS ENTEROS ===    onkeypress="return axvalint(event)"    ======*/
function axvalint(tecla)
{	sw = false;
	if(tecla.which!=0)
	{ VecTecl=[13,8,48,49,50,51,52,53,54,55,56,57];
		for(var i in VecTecl)
		{ if(tecla.which == VecTecl[i])
			{ sw = true;
				break;
			}
		}
	}
	else
	{ VecEsp = [37,39,9,46];
		for(var i in VecEsp)
		{ if(tecla.keyCode == VecEsp[i])
			{ sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{	//alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	} 
}


/*=== VALIDAR Letras ===     onkeypress="return let(event)"      ======*/
function axlet(tecla)
{ sw = false;
	if(tecla.which != 0)
	{	
		VecTecl = [13,8,32,46,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,241,209,193,225,201,233,237,205,243,211,250,218];
		for(var i in VecTecl)
		{ if(tecla.which == VecTecl[i])
			{ sw = true;
				break;
			}
		}
	}
	else
	{ VecEsp = [37,39,9,189];
		for(var i in VecEsp)
		{ if(tecla.keyCode == VecEsp[i])
			{ sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{ //alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	}
}

/*=== VALIDAR  ===           onkeypress="return numlet(event)"      ======*/
function axvallet(tecla)
{	sw=false;
	if(tecla.which != 0)
	{	// 		  [ENTER,BACK SPACIO,SPACIO,A ,B ,C ,D ,E ,F ,G ,H ,I ,J ,K ,L ,M ,N ,O ,P ,K ,R ,S ,T ,U ,V ,W ,X ,Y ,Z ,a ,b ,c ,d  ,e  ,f  ,g  ,h  ,i  ,j  ,k  ,l  ,m  ,n  ,o  ,p  ,q  ,r  ,s  ,t  ,u  ,v  ,w  ,x  ,y  ,z  ,ñ  ,Ñ  ,Á  ,á  ,É  ,é  ,í  ,Í  ,ó  ,Ó  ,ú  ,Ú  ];
		VecTecl = [13   ,8          ,32    ,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,241,209,193,225,201,233,237,205,243,211,250,218];
		for(var i in VecTecl)
		{	if(tecla.which == VecTecl[i])
			{	sw = true;
				break;
			}
		}
	}
	else
	{	//[FECHA IZ,FECHA DE,TAB]
		VecEsp = [37      ,39      ,9  ];
		for(var i in VecEsp)
		{ if(tecla.keyCode == VecEsp[i])
			{ sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{ //alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	}
}

/*=== VALIDAR  ===           onkeypress="return numlet(event)"      ======*/
function axvalnumlet(tecla)
{	sw=false;
	if(tecla.which != 0)
	{	// 		  [ENTER,BACK SPACIO,SPACIO,0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,A ,B ,C ,D ,E ,F ,G ,H ,I ,J ,K ,L ,M ,N ,O ,P ,K ,R ,S ,T ,U ,V ,W ,X ,Y ,Z ,a ,b ,c ,d  ,e  ,f  ,g  ,h  ,i  ,j  ,k  ,l  ,m  ,n  ,o  ,p  ,q  ,r  ,s  ,t  ,u  ,v  ,w  ,x  ,y  ,z  ,ñ  ,Ñ  ,Á  ,á  ,É  ,é  ,í  ,Í  ,ó  ,Ó  ,ú  ,Ú  ];
		VecTecl = [13   ,8          ,32    ,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,241,209,193,225,201,233,237,205,243,211,250,218];
		for(var i in VecTecl)
		{	if(tecla.which == VecTecl[i])
			{	sw = true;
				break;
			}
		}
	}
	else
	{	//[FECHA IZ,FECHA DE,TAB]
		VecEsp = [37      ,39      ,9  ];
		for(var i in VecEsp)
		{ if(tecla.keyCode == VecEsp[i])
			{ sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{ //alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	}
}

//OLD axnumletesp(tecla)
function axvalnumletesp(tecla)
{	sw=false;
	if(tecla.which != 0)
	{	
			   // [ENTER,BACK SPACIO,SPACIO,0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,A ,B ,C ,D ,E ,F ,G ,H ,I ,J ,K ,L ,M ,N ,O ,P ,K ,R ,S ,T ,U ,V ,W ,X ,Y ,Z ,a ,b ,c ,d  ,e  ,f  ,g  ,h  ,i  ,j  ,k  ,l  ,m  ,n  ,o  ,p  ,q  ,r  ,s  ,t  ,u  ,v  ,w  ,x  ,y  ,z  ,ñ  ,Ñ  ,Á  ,á  ,É  ,é  ,í  ,Í  ,ó  ,Ó  ,ú  ,Ú  ,. ,'];
		VecTecl = [13   ,8          ,32    ,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,241,209,193,225,201,233,237,205,243,211,250,218,46,39];
		for(var i in VecTecl)
		{ if(tecla.which == VecTecl[i])
			{ sw = true;
				break;
			}
		}
	}
	else
	{	
			   //[FECHA IZ,FECHA DE,TAB]
		VecEsp = [37      ,39      ,9  ];
		for(var i in VecEsp)
		{ if(tecla.keyCode == VecEsp[i])
			{ sw = true;
				break;
			}
		} 
	}
	if(!sw)
	{ //alert("which: "+tecla.which+"     KeyCode: "+tecla.keyCode);
		return false;
	}
}

//Redondear valores con cantidad definida de decimales
function axredo(valor,deci)
{	if(deci==undefined){deci=0;}
	let R,A;
	
	R=Math.floor(valor*Math.pow(10,deci) );
	R=R/Math.pow(10,deci);
	
	//A=new Decimal(valor);
	//R=A.toDecimalPlaces(deci).toNumber();
	return R;
}

function axcalcpor(valor,porcen,deci)
{	//Math.round(axredo(Number(totalbs${pack.list[P].numav}.value)*0.03
	if(deci==undefined){deci=0;}
	let R,A;
	A=new Decimal(valor);
	R=A.mul(porcen).toDecimalPlaces(deci).toNumber();
	return R;
}

// BARRA DE PROGRESO

function axbarpro(obj,vlr)
{	let por;
	//por=axredo(vlr);
	ART=axelem(obj).getElementsByTagName('article')[0];
	DIV=ART.getElementsByTagName('div')[0];
	DIV.style.width=`${vlr}%`;
}


/*========== @pes CONTROL DE PESTAÑAS ==========*/
function axpalact(pes,nump,numc)
{	let PAL,NAV,BOT,ART,CNT,P;
	PAL=document.getElementById(pes);

	//SI EN NUMERO
	NAV=PAL.getElementsByTagName('nav')[0];
	for(P=0; P<NAV.children.length; P++)
	{	BOT=NAV.getElementsByTagName('a')[P];
		//console.log(BOT);
		if(Number.isInteger(nump))
		{	if(P==nump-1)
			{	BOT.className='act';	}
			else
			{	BOT.className='';	}
		}
		else
		{	//DEBE SER OBJETO
			BOT.className='';
		}
	}

	if(!Number.isInteger(nump))
	{	nump.className='act';	}

	if(numc!=undefined)
	{	ART=PAL.querySelector('article');
		//console.log(ART.childElementCount);
		for(P=0; P<ART.children.length; P++)
		{	CNT=ART.querySelectorAll('palconte')[P]; //OJO Seleccionara los palconte pero si hubiese mas palconte ahi causara error
			if(P==numc-1)
			{	CNT.className="act";
			}
			else
			{	CNT.className="";
			}
		}
	}
}

function axact(obj,eleact,eleshow)
{	let OBJ,NAV,BOT,ART,CNT,P;
	console.log('Afectar a: '+obj);
	OBJ=document.getElementById(obj);

	//SI EN NUMERO
	for(P=0; P<OBJ.children.length; P++)
	{	BOT=OBJ.getElementsByTagName('strong')[P];
		//console.log(BOT);
		if(Number.isInteger(eleact))
		{	if(P==eleact-1)
			{	BOT.className='act';	}
			else
			{	BOT.className='';	}
		}
		else
		{	//DEBE SER OBJETO
			BOT.className='';
		}
	}
	eleact.className='act';
/*
	if(!Number.isInteger(nump))
	{	nump.className='act';	}

	if(numc!=undefined)
	{	ART=OBJ.querySelector('article');
		//console.log(ART.childElementCount);
		for(P=0; P<ART.children.length; P++)
		{	CNT=ART.querySelectorAll('palconte')[P]; //OJO Seleccionara los palconte pero si hubiese mas palconte ahi causara error
			if(P==numc-1)
			{	CNT.className="act";
			}
			else
			{	CNT.className="";
			}
		}
	}
	*/
}

/*******************************************************************************\
****** @tex - FUNCIONES PARA TEXTOS *********************************************
\*******************************************************************************/

function axtexenriq(tex)
{	//env=tex;
	// COLOCAR A * A </b>
	let env='';
	let swb=true;
	let tam=tex.length;
	let car,P;
	//console.log(tam);
	for(P=0; P<tam; P++)
	{	car=tex.charAt(P);
		//console.log(car);
		switch(car)
		{	case '*':
				if(swb)
				{	env+=`<b>`;
					swb=false;
				}
				else
				{	env+=`</b>`;
					swb=true;
				}
				//console.log(`si en ${P}`);
			break;
			default: env+=car; 	break;
		}
	}
	//COLOCAMOS <br>
	env=env.replace(/\r\n/gi,'<br>');
	return String(env);
}


// CAMBIAMOS A TEXTO SIMPLE 
function axtexsmpl(tex)
{ 	let output=String(tex);
	output=output.replace(/\r\n/g,' '); 	//SIN SALTO DE LINEA
	output=output.replace(/\"/g,''); 		//SIN COMLILLAS DOBLES
	return output;
}

//FECHA - DATE - TIME
function axfech(fecha,mod)
{	let fecht;

	// ANALISIS DE FECHA
	if(fecha=='' || fecha==null || fecha==undefined)
	{	DD='00';
		MD='00';
		YD='0000';
		HD='00';
		mD='00';
	}
	else
	{	/*// METODO DE OBJETOS PARA DESFRACMENTAR
		let D=new Date(fecha);
		YD=D.getFullYear();
		MD=D.getMonth()+1;
		DD=D.getDate()+1;
		HD=D.getHours();
		mD=D.getMinutes();*/

		//METODO CADENA PARA DESFRACMENTAR
		VFT=fecha.split('T');
		VF=VFT[0].split('-');
		YD=VF[0];
		MD=VF[1];
		DD=VF[2];
		//Desfracmentamos hora y minuto
		if(VFT[1]!=null && VFT[1]!=undefined)
		{	VH=VFT[1].split(':');
			HD=VH[0];
			mD=VH[1];
		}
		else
		{	HD='00';
			mD='00';
		}
	}

	switch(mod)
	{	case 'date': 		fecht=`${DD}/${MD}/${YD}`; 					break;
		case 'datetime': 	fecht=`${DD}/${MD}/${YD} (${HD}:${mD})`;	break;
		case 'now':
			let D=new Date();
			YD=D.getFullYear();
			MD=D.getMonth()+1;
			DD=D.getDate()+1;
			HD=D.getHours();
			mD=D.getMinutes();
			fecht=`${YD}-${MD}-${DD}`;
		break;
		default: 		 	fecht=`${DD}/${MD}/${YD}`; 					break;
	}
	return fecht;
}

// CODIFICADOR BASE64  OLD code64(input)
function axencode64(input)
{ 	input=String(input);
	var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output="";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i=0;
	input = axencodeutf8(input);
	while(i<input.length)
	{ chr1=input.charCodeAt(i++);
		chr2=input.charCodeAt(i++);
		chr3=input.charCodeAt(i++);
		enc1=chr1>>2;
		enc2=((chr1 & 3) << 4) | (chr2 >> 4);
		enc3=((chr2 & 15) << 2) | (chr3 >> 6);
		enc4=chr3 & 63;
		if (isNaN(chr2))
		{ enc3 = enc4 = 64; }
		else
		{ if(isNaN(chr3))
			{ enc4 = 64;  }
		}
		output=output+keyStr.charAt(enc1)+keyStr.charAt(enc2)+keyStr.charAt(enc3)+keyStr.charAt(enc4);
	}
	return output;
}

//OLD decode64(input)
function axdecode64(input)
{ 	input==String(input);
	var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while(i<input.length)
	{ enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if(enc3!=64)
		{ output=output + String.fromCharCode(chr2);  }
		if(enc4!=64)
		{ output=output + String.fromCharCode(chr3);  }
	}
	output=axdecodeutf8(output);
	return output;
}

// OLD utf8_encode(string)
function axencodeutf8(string)
{ 	var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	string=string.replace(/\r\n/g,"\n");
	var utftext = "";
	for(var n=0; n<string.length; n++)
	{ var c=string.charCodeAt(n);
		if(c<128)
		{ utftext += String.fromCharCode(c);  }
		else
			if((c > 127) && (c < 2048))
			{ utftext+=String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else
			{ utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
	}
	return utftext;
}

//OLD utf8_decode(utftext)
function axdecodeutf8(utftext)
{ 	var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	while(i<utftext.length)
	{ c=utftext.charCodeAt(i);
		if(c<128)
		{ string+=String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224))
		{ c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i+=2;
		}
		else
		{ c2=utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}


function axtokenset(sub,name,exp,aud)
{	let min,vecstr,iat;
	let D = new Date();

	vecstr=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','45','46','47','48','49','50','51','52','53','54','56','57','58','59','60'];
	//iss: creator del token
	if(sub ==undefined){sub ='';} 	//sujeto del token
	if(name==undefined){name='';} 	//Nombre de usuario
	if(exp ==undefined){exp ='';} 	//Fecha de experacion
	if(aud ==undefined){aud =[];} 	//Datos extra

	iat=D.getFullYear()+'-'+vecstr[D.getMonth()+1]+'-'+vecstr[D.getDate()]+'T'+vecstr[D.getHours()]+':'+vecstr[D.getMinutes()];
	if(Number.isInteger(exp))
	{	let min=new Decimal(exp);
		hrs=min.dividedBy(60).toNumber();
		//console.log(hrs);
		exp=D.getFullYear()+'-'+vecstr[D.getMonth()+1]+'-'+vecstr[D.getDate()]+'T'+vecstr[D.getHours()]+':'+vecstr[D.getMinutes()];
	}
	//console.log(exp);
	//console.log(iat);

	let header={"alg":"code64","typ":"jwt"};
	let payload={"sub":sub,"name":name,"exp":exp,"aud":aud,"iat":iat};
	let sign={};
	let jwt=axencode64(JSON.stringify(header))+"."+axencode64(JSON.stringify(payload));
	localStorage.setItem('jwt',jwt);
}

function axtokenget(cod)
{	let jwt=localStorage.getItem('jwt');
	let VEC=jwt.split('.');
	let pay,re='';
	//console.log(axdecode64(VEC[1]));
	pay=JSON.parse(axdecode64(VEC[1]));
	switch(cod)
	{	case 'sub': 	re=pay.sub;		break;
		case 'name': 	re=pay.name;	break;
		case 'exp': 	re=pay.exp;		break;
		case 'aud': 	re=pay.aud;		break;
	}
	return re;
}

function axtoken()
{	let re;
	if(localStorage.getItem('jwt'))
	{	re=true;	}
	else
	{	re=false;	}
	return re;
}

function axtokendel(lnk)
{	localStorage.removeItem('jwt');
	if(lnk!=undefined || lnk!='')
	{	location.href=lnk;
	}
}

// @elem - EFECTOS A ELEMENTOS ===========================================

function axelem(obj)
{	return document.getElementById(obj);
}

function axelemhide(obj)
{	//No colocar !important - Hace que deje de funcionar
	document.getElementById(obj).style.display='none';
}

function axelemshow(obj)
{	//No colocar !important - Hace que deje de funcionar
	document.getElementById(obj).style.display='block';
}

function axelemflex(obj)
{	//No colocar !important - Hace que deje de funcionar
	document.getElementById(obj).style.display='flex';
}	

function axelemsw(obj,elem,ico1,ico2)
{	let OBJ=document.getElementById(obj);
	if(axelemisshow(obj))
	{	OBJ.style.display='none';
		if(elem!=undefined)
		{	elem.className=ico1;	}
		
	}
	else
	{	OBJ.style.display='block';
		if(elem!=undefined)
		{	elem.className=ico2;	}
	}
}

function axelembg(obj,val)
{	switch(val)
	{	case'pri':	document.getElementById(obj).style.backgroundColor="var(--colpri)";	break;
		case'foc':	document.getElementById(obj).style.backgroundColor="var(--colfoc)";	break;
	}
}

function axelemopaci(obj,val)
{	document.getElementById(obj).style.opacity=(val/100);
}

function axelemisshow(obj)
{	let OBJ=document.getElementById(obj);
	if(OBJ.style.display=='inline' || OBJ.style.display=='block' || OBJ.style.display=='inline-block' || OBJ.style.display=='flex' || OBJ.style.display=='inline-flex' || OBJ.style.display=='grid' || OBJ.style.display=='inline-grid' || OBJ.style.display=='table' || OBJ.style.display=='inline-table')
	{	return true;	}
	else
	{	return false;	}
}


function axelemtran(obj,clas)
{	if(clas==undefined || clas=='')
	{	document.getElementById(obj).className='';
	}
	else
	{	document.getElementById(obj).className=clas;
	}
}

function axelembusq(basename,cant,busq)
{	let P;
	for(P=0; P<cant; P++)
	{	//console.log(axelem(`${basename}${P}`).title);
		if(axelem(`${basename}${P}`).title.includes(busq))
		{	axelemshow(`${basename}${P}`);  }
		else
		{	axelemhide(`${basename}${P}`);	}
	}
}

//@axfrm

function axfrmget(idf,name)
{	let FD=new FormData(document.getElementById(idf));
	return FD.get(name);
}

function axfrmreset(idf)
{	let FD=document.getElementById(idf);
	FD.reset();
}

// @est - FUNCIONES ESTADISTICAS ===========================================

function axstdmedia(VEC)
{	let S=0,P,R;
	for(P=0; P<VEC.length; P++)
	{	S=S+VEC[P];	}
	R=S/VEC.length;
	return R;
}

//Variancia poblacional
function axstdvarpob(VEC)
{	let SDC=0,P,X,R;
	M=axstdmedia(VEC);
	for(P=0; P<VEC.length; P++)
	{	X=VEC[P];
		SDC=SDC+Math.pow(X-M,2);
	}
	R=SDC/VEC.length;
	return R;
}
//varianza muestral

//Desviacion estandar poblacional
function axstddesestpob(VEC)
{	let V2,R;
	V2=axstdvarpob(VEC);
	R=Math.sqrt(V2);
	return R;
}

// Covariansa de a y b
function axstdcovar(VA,VB)
{	let MA,MB,R,S=0,A,B,N;
	N=VA.length;
	MA=axstdmedia(VA);
	MB=axstdmedia(VB);
	for(P=0; P<N; P++)
	{	A=VA[P];
		B=VB[P];
		S=S+(A-MA)*(B-MB);
		//console.log(S);
	}
	R=S/N;
	return R;
}

//=== @hablar - SINTETIZADORES DE SONIDO ===

function axsay(texto,idiom)
{	//VERIFICAMOS SI ENVIO EL IDIOMA
	if(idiom=='' || idiom==undefined)
	{	idiom='es-ES';	}
	//Preguntamos si esta en pause para continuar la reproduccion
	if(speechSynthesis.speaking)
	{	//CONTINUAMOS VOZ
		speechSynthesis.resume();
	}
	else
	{	//INCIAMOS VOZ
		var objvoz = new SpeechSynthesisUtterance(texto);
		objvoz.rate=1; 		//velocidad de la voz 0.1 a 10
		objvoz.volume=1; 	//volumen de la voz 0 a 1
		objvoz.pitch=1; 	//0 a 2
		objvoz.voiceURI='Google español';
		objvoz.lang=idiom;

		objvoz.addEventListener('end',()=>
		{	//console.log('Finalizo la voz');
		});
		speechSynthesis.speak(objvoz);
	}
}

function axsaypause()
{	//Preguntamos si esta hablando si es TRUE colocamos pause
	if(speechSynthesis.speaking)
	{	speechSynthesis.pause();	}
}

function axsaystop()
{	speechSynthesis.resume();
	speechSynthesis.cancel();
}

//VOCES QUE ESTAN HABILITADAS
function axsaylist()
{	if(typeof speechSynthesis === 'undefined'){return;}
	var voices = speechSynthesis.getVoices();
	//console.log(`Cantidad de voces ${voices.length}`);
	MTEX=``;
	for(C=0; C<voices.length; C++)
	{	MTEX+=`${C}:${voices[C].name} [${voices[C].lang}]\n`;
	}
	//console.log(MTEX);
	sele=1;
	//console.log(`name:${voices[sele].name} y lang:${voices[sele].lang}`);
}



//PARA ESCUCHAR EN DESARROLLO
//SOLO EN FIRE FOX NO FUNCIONA ASI QUE LO DETECTAMOS POR allVersion
//console.log(navigator.appVersion.length);

if(navigator.appVersion.length>20)
{	var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
	var objre = new SpeechRecognition();
	//objre.grammars = speechRecognitionList;
	objre.continuous=false; 	//Mantendra el microfono activo
	objre.lang="es-bo"; //	es-bo  en-US   es
	objre.interimResults = false;
	objre.maxAlternatives = 1;
	objre.conte=''; 	//de axonix
	objre.conta=0; 		//de axonix

	objre.addEventListener("result",(event) =>
	{	//console.log('result');
		document.getElementById(objre.conte).value+=event.results[objre.conta][0].transcript;
		objre.conta=objre.conta+1;
		//console.log(objre.conta);
		if(!objre.continuous)
		{	//console.log('stop micro');
			objre.conta=0;
			objre.stop();
		}
	});

	//Evento que se activa cuando se detiene
	objre.onspeechend = () =>
	{	//objre.stop();
		//axmsgmin('Escucha','Se detuvo');
		objre.conta=0; 	//de axonix
	}

	/*
	objre.onresult = (event) =>
	{	console.log('onresult');
		document.getElementById('T1').textContent=event.results[0][0].transcript;
	}
	*/
}

function axlisten(obj,continuo)
{	if(continuo=='' || continuo==undefined)
	{	continuo=false;	}

	if(navigator.appVersion.length>20)
	{	objre.conte=obj;
		objre.continuous=continuo;
		objre.start();
	}
	else
	{	axmsgerr('No soportado por firefox');	}
}

function axlistenstop()
{	if(navigator.appVersion.length>20)
	{	objre.stop();
	}
	else
	{	axmsgerr('No soportado por firefox');	}
}


/*******************************************************************************\
****** @load - IMAGENES DE CARGA MOVIBLES ***************************************
\*******************************************************************************/

 function axpreloadmin(obj)
 {	let TEX=`
	<section  class='axpreloadmin'>
		<article>
			<div  class='p1'></div>
			<div  class='p2'></div>
			<div  class='p3'></div>
			<div  class='p4'></div>
			<div  class='p5'></div>
			<div  class='p6'></div>
		</article>
	</section>`;
	axload(obj,TEX);
 }


 function axpreloadmed(obj)
 {	let TEX=`
	<section  class='axpreloadmed'>
		<article>
			<div  style="--i:1;"></div>
			<div  style="--i:2;"></div>
			<div  style="--i:3;"></div>
			<div  style="--i:4;"></div>
			<div  style="--i:5;"></div>
			<div  style="--i:6;"></div>
			<div  style="--i:7;"></div>
			<div  style="--i:8;"></div>
			<div  style="--i:9;"></div>
			<div  style="--i:10;"></div>
			<div  style="--i:11;"></div>
			<div  style="--i:12;"></div>
			<div  style="--i:13;"></div>
			<div  style="--i:14;"></div>
			<div  style="--i:15;"></div>
			<div  style="--i:16;"></div>
			<div  style="--i:17;"></div>
			<div  style="--i:18;"></div>
			<div  style="--i:19;"></div>
			<div  style="--i:20;"></div>
		</article>
	</section>`;
	axload(obj,TEX);
 }


 function axpreloadmax(obj)
 {	let TEX=`
	<section  class='axpreloadmax'>
		<article>
			<div  style="--i:1;"></div>
			<div  style="--i:2;"></div>
			<div  style="--i:3;"></div>
			<div  style="--i:4;"></div>
			<div  style="--i:5;"></div>
			<div  style="--i:6;"></div>
			<div  style="--i:7;"></div>
			<div  style="--i:8;"></div>
			<div  style="--i:9;"></div>
			<div  style="--i:10;"></div>
			<div  style="--i:11;"></div>
			<div  style="--i:12;"></div>
			<div  style="--i:13;"></div>
			<div  style="--i:14;"></div>
			<div  style="--i:15;"></div>
			<div  style="--i:16;"></div>
			<div  style="--i:17;"></div>
			<div  style="--i:18;"></div>
			<div  style="--i:19;"></div>
			<div  style="--i:20;"></div>
		</article>
	</section>`;
	axload(obj,TEX);
 }

/*******************************************************************************\
****** @sonic - FUNCIONES PARA SONIDOS *******************************************
\*******************************************************************************/

/*=== SONIDOS ===    OnClick=\"AudioPlay('Arch.mp3');\"
Inserta al Inicio de Body esta Etiqueta
<Audio  Id="REPRO">HTML5 audio not supported</Audio>
*/
function play(Arch)
{ if (window.HTMLAudioElement)
	{ var ObjR = document.getElementById('REPRO');
		ObjR.src = Arch;
		ObjR.play();
	}
}

/*******************************************************************************\
****** @social - FUNCIONES META DATOS Y COMPARTIR *******************************
\*******************************************************************************/

/*  SOCIAL MEDIA */
function compartir(name)
{ const titu = document.title;
	const lnk = encodeURIComponent(window.location.href);
	let metas=document.getElementsByTagName('meta');
	for (F=0; F<metas.length; F++)
	{ if(metas[F].getAttribute('property')=='og:image')
		{ lnkimg=encodeURIComponent(metas[F].content);
			break;
		}
	}
	//alert(`titu: ${titu} lnk: ${lnk} lnkimg: ${lnkimg}`);
	if(name=='whatsapp')
	{	url=lnk+'&name='+titu+'&description='+titu;
		location.href='https://api.whatsapp.com/send?text='+url+',Mira%20esto';
	}
	else
	{	switch(name)
		{	case 'facebook': url='http://www.facebook.com/sharer/sharer.php?u='+lnk; break;
			case 'twitter': url='http://twitter.com/share?url='+lnk; break; 
			case 'google': url='https://plus.google.com/share?url='+lnk; break;
			case 'linkedin': url='https://www.linkedin.com/shareArticle?mini=true&url='+lnk+'&title='+titu+'&summary=&source='; break;
			case 'pinterest': url='https://pinterest.com/pin/create/button/?url='+lnk+'&media='+lnkimg+'&description='+titu; break;
			case 'tumblr': url='http://www.tumblr.com/share/link?url='+lnk+'&name='+titu+'&description='+titu; break;
		}
		window.open(url, name, 'height=320, width=640, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=no');
	}
}


/*******************************************************************************\
****** @cua - CUADROS EMERGENTES ************************************************
\*******************************************************************************/

//UNICO OPEN
function axwinopen(idobj)
{	let OBJ=document.getElementById(idobj);
	switch(OBJ.className)
	{	case 'axwinmin':
			OBJ.style.display='block';
			AR=OBJ.getElementsByTagName('article')[0];
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	BT.style.display='block';
				setTimeout(function()
				{	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
					BT.style.opacity='1';
				},10);
			}
			else
			{	setTimeout(function()
				{	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
				},10);
			}
		break;

		case 'axwinmed':
			OBJ.style.display='block';
			OBJ.style.background='rgba(0,0,0,0.5)';
			AR=OBJ.getElementsByTagName('article')[0];
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	setTimeout(function()
				{ 	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
					BT.style.opacity='1';
				},10);
			}
			else
			{	setTimeout(function()
				{ 	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
				},10);
			}
		break;

		case 'axwinmax':
			OBJ.style.display='block';
			AR=OBJ.getElementsByTagName('article')[0];
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	BT.style.display='block';
				setTimeout(function()
				{	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
					BT.style.opacity='1';
				},10);
			}
			else
			{	setTimeout(function()
				{	AR.style.opacity='1';
					AR.style.transform='scale(1,1)';
				},10);
			}
		break;

		case 'axwintin':
			OBJ.style.bottom='0px';
		break;

		case 'axwinleft':
			OBJ.style.display='block';
			setTimeout(()=>
			{	AR=OBJ.getElementsByTagName('article')[0];
				AR.style.left='0px';
			},200);
		break;

		case 'axwinright':
			OBJ.style.display='block';
			setTimeout(()=>
			{	AR=OBJ.getElementsByTagName('article')[0];
				AR.style.right='0px';
			},200);
		break;

		default:
			axmsgerr('Este objeto no esta definido como ventana.');
		break;
	}
}

//UNICO CLOSE
function axwinclose(idobj)
{	let OBJ=document.getElementById(idobj);
	switch(OBJ.className)
	{	case 'axwinmin':
			AR=OBJ.getElementsByTagName('article')[0];
			AR.style.opacity='0';
			AR.style.transform='scale(2,2)';
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	BT.style.display='none';
				BT.style.opacity='0';
			}
			setTimeout(function()
			{	OBJ.style.display='none';
			},500);
		break;

		case 'axwinmed':
			OBJ.style.background='rgba(0,0,0,0.5)';
			AR=OBJ.getElementsByTagName('article')[0];
			AR.style.opacity='0';
			AR.style.transform='scale(2,2)';
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	BT.style.opacity='0';
			}
			setTimeout(function()
			{ OBJ.style.display='none';
			},500);
		break;

		case 'axwinmax':
			AR=OBJ.getElementsByTagName('article')[0];
			AR.style.opacity='0';
			AR.style.transform='scale(2,2)';
			if(BT=OBJ.getElementsByTagName('button')[0])
			{	BT.style.display='none';
				BT.style.opacity='0';
			}
			setTimeout(function()
			{	OBJ.style.display='none';
			},500);
		break;

		case 'axwintin':
			OBJ.style.bottom='-560px';
		break;

		case 'axwinright':
			//NOTA: si usamos AR sale error en electro
			let ART=OBJ.getElementsByTagName('article')[0];
			ART.style.right='-450px';
			setTimeout(()=>
			{	OBJ.style.display='none';
			},200);
		break;

		case 'axwinleft':
			AR=OBJ.getElementsByTagName('article')[0];
			AR.style.left='-450px';
			setTimeout(()=>
			{	OBJ.style.display='none';
			},200);
		break;

		default:
			axmsgerr('Este objeto no esta definido como ventana.');
		break;
	}
}

//  CUADRO FEADED - ANTERIOR ERA feaded_open
function axventfeadopen(IdObj)
{	//document.body.style.filter='blur(2px)';
	let OBJ=document.getElementById(IdObj);
	OBJ.style.display='block';
	AR=OBJ.getElementsByTagName('article')[0];
	BT=OBJ.getElementsByTagName('button')[0];
	//SOBJ.style.opacity='1';
	setTimeout(function()
	{ //OBJ.style.filter='blur(0px)';
		AR.style.opacity='1';
		BT.style.opacity='1';
	},100);
}

//ANTERIOR ERA feaded_closed
function axventfeadclose(IdObj)
{	//document.body.style.filter='blur(0px)';
	let OBJ=document.getElementById(IdObj);
	AR=OBJ.getElementsByTagName('article')[0];
	BT=OBJ.getElementsByTagName('button')[0];
	AR.style.opacity='0';
	BT.style.opacity='0';
	setTimeout(function()
	{ OBJ.style.display='none';
	},500);
}

function axwinmaxsimopen(obj)
{	let CON=document.getElementById(obj);
	CON.style.display='flex';
}

function axwinmaxsimclose(obj)
{	let CON=document.getElementById(obj);
	CON.style.display='none';
}

function axventsenopen(obj)
{	document.getElementById(obj).style.display='block';
}

function axventsenclose(obj)
{	document.getElementById(obj).style.display='none';
}

/*******************************************************************************\
****** @pes *********************************************************************
\*******************************************************************************/

function axpesimpleinit(idobj)
{	let OBJ,P;
	OBJ=document.getElementById(idobj);
	ARS=OBJ.getElementsByTagName('article');
	for(P=0; P<ARS.length; P++)
	{	ARS[P].style.border='1px solid blue';
	}
	NVS=OBJ.getElementsByTagName('nav');
	AS=NVS[0].getElementsByTagName('a');
	for(P=0; P<AS.length; P++)
	{	AS[P].title=`${P}`;
		AS[P].onclick=()=>{axpesimpleshow(idobj,`${P}`);}
	}
}

function axpesimpleshow(idobj,pes)
{	alert(`obj:${idobj} y pes:${pes}`);
	/*
	setTimeout(function()
	{	OBJ.style.display='none';
	},500);
	*/
}


/*******************************************************************************\
****** @acciones de menu ********************************************************
\*******************************************************************************/

function axlaymen(obj)
{	let OBJ=document.getElementById(obj);
	let ELEM = window.getComputedStyle(OBJ);
	let R = ELEM.getPropertyValue('right');
	let L = ELEM.getPropertyValue('left');
	//console.log(`D:${R} I:${L}`);
	if(R=='0px' && L=='0px')
	{	console.log('Sin accion');	}
	else
	{	if(R=='-350px' || R=='0px')
		{	//DERECHA
			if(OBJ.style.right=='0px')
			{	//OCULTAMOS MENU
				OBJ.style.right='-350px';
			}
			else
			{	//MOSTRAMOS MENU
				OBJ.style.right='0px';
			}
		}
		else
		{	if(L=='-350px' || L=='0px')
			{	//IZQUIERDA
				if(OBJ.style.left=='0px')
				{	//OCULTAMOS MENU
					OBJ.style.left='-350px';
				}
				else
				{	//MOSTRAMOS MENU
					OBJ.style.left='0px';
				}
			}
		}
	}
}

function axsetnavsaybmen(obj)
{	let OBJ=document.getElementById(obj);
	if(OBJ.style.right=='0px')
	{	//OCULTAMOS MENU
		OBJ.style.right='-350px';
	}
	else
	{	//MOSTRAMOS MENU
		OBJ.style.right='0px';
	}
}

//MUEVE EL BOTON DEL SW
function axmenbotsw(obj)
{	let BT=document.getElementById(obj);
	if(BT.className=='axno' || BT.className=='')
	{	BT.className='axyes';
	}
	else
	{	BT.className='axno';
	}
	//console.log('cambiando '+BT.className);
}


/*******************************************************************************\
****** @slider - SLIDERS ********************************************************
\*******************************************************************************/

function genban(IdObj,VecF,tim,AutoMov,IrA,Mod)
{	T=VecF.length;
	var BAN=document.getElementById(IdObj);
	BAN.className='genban';
	for(C=0; C<T ; C++)
	{	switch(VecF[C][1])
		{	case 'vid':
				var IFR=document.createElement('iframe');
				IFR.style.opacity='0';
				IFR.id=IdObj+C;
				IFR.setAttribute('src',VecF[C][0]);
				IFR.setAttribute('frameborder','0');
				IFR.setAttribute('allow','accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
				IFR.setAttribute('allowfullscreen','');
				BAN.appendChild(IFR);
			break;

			default:
				var AR=document.createElement('article');
				AR.style.opacity='0';
				AR.id=IdObj+C;
				AR.style.backgroundImage="url('"+VecF[C][0]+"')";
				AR.style.backgroundSize=Mod;
				BAN.appendChild(AR);
			break;
		}
	}
	// FUNCION GO A
	function goa(cuad)
	{	INP=document.getElementById(IdObj+'PO');
		INX=document.getElementById(IdObj+'MX');
		document.getElementById(IdObj+INP.value).style.opacity='0';
		document.getElementById(IdObj+'C'+INP.value).style.background=null;
		INP.value=cuad;
		document.getElementById(IdObj+INP.value).style.opacity='1';
		document.getElementById(IdObj+'C'+INP.value).style.background='rgba(255,255,255,1)';
	}
	//CIRCULOS
	var AS=document.createElement('aside');
	for(C=0; C<T ; C++)
	{ var DV=document.createElement('div');
		DV.id=IdObj+'C'+C;
		if(C==0)
		{ DV.style.background='rgba(255,255,255,1)';  }
		DV.textContent=C;
		DV.onclick=function()
		{ goa(this.innerHTML);  };
		AS.appendChild(DV);
	}
	BAN.appendChild(AS);
	//BOTON DERECHO
	var BO=document.createElement('button');
	BO.style.right='0px';
	BO.textContent='>'; 
	BO.onclick=function()
	{ if(Number(INP.value)<Number(INX.value)-1)
		{ goa(Number(INP.value)+1); }
		else
		{ goa(0);  }
	};
	BAN.appendChild(BO);
	//BOTON IZQUIERDO
	var BO=document.createElement('button');
	BO.style.left='0px';
	BO.textContent='<';
	BO.onclick=function()
	{ if(Number(INP.value)==0)
		{ goa(Number(INX.value)-1); }
		else
		{ goa(Number(INP.value)-1);  }
	};
	BAN.appendChild(BO);
	//INFO POS
	var IN=document.createElement('input');
	IN.id=IdObj+'PO';
	IN.style.display='none';
	IN.style.zIndex='20';
	IN.value='0';
	BAN.appendChild(IN);
	//INFO MAX
	var IN=document.createElement('input');
	IN.id=IdObj+'MX';
	IN.style.display='none';
	IN.style.zIndex='20';
	IN.value=T;
	BAN.appendChild(IN);
	//AUTOMATICO
	if(AutoMov)
	{ let TI=setInterval(function()
		{ if(Number(INP.value)<Number(INX.value)-1)
			{ goa(Number(INP.value)+1); }
			else
			{ goa(0);  }
		},tim);
	}
	// IR POR DEFECTO AL CUARO
	if(IrA==undefined)
	{ goa(0); }
	else
	{ goa(IrA-1); }
}

function slidmov(IdObj,VecF,TimL)
{	var T=VecF.length;
	if(T>5)
	{ POCN=20;  }
	else
	{ POCN=Math.round((100/T)*10)/10; }
	//alert(POCN);
		var BAN=document.getElementById(IdObj);
	for(C=0; C<T ; C++)
	{ var AR=document.createElement('a'); 
		AR.id=IdObj+C;
		AR.setAttribute('href',VecF[C][1]);
		AR.style.left=(C*POCN)+'%';
		AR.style.width=POCN+'%';
		if((C*POCN)==((T-1)*POCN))
		{ AR.style.zIndex='1';  }
		else
		{ AR.style.zIndex='2';  }
		AR.style.background="url('"+VecF[C][0]+"') center center";
		AR.style.backgroundSize='cover';
		BAN.appendChild(AR);
	}
	//INFO POS
	var IN=document.createElement('input');
	IN.id=IdObj+'PO';
	IN.value='0';
	IN.style.display='none';
	BAN.appendChild(IN);
	//INFO MAX
	var IN=document.createElement('input');
	IN.id=IdObj+'MX';
	IN.value=T;
	IN.style.display='none';
	BAN.appendChild(IN);
	/* MOVIMIENTO */
	function movde()
	{ for(C=0; C<T ; C++)
		{ var IM=document.getElementById(IdObj+C);
				var LEF=IM.style.left.split('%',2);
				var leftc=Number(LEF[0]);
				//MOVEMOS
				if(leftc==((T-1)*POCN))
			{ IM.style.left='0%'; }
			else
			{ IM.style.left=(Number(LEF[0])+POCN)+'%'; }
		}
		for(C=0; C<T ; C++)
		{ var IM=document.getElementById(IdObj+C);
				var LEF=IM.style.left.split('%',2);
				var leftc=Number(LEF[0]);
				//ADELAMTE
				if(leftc==((T-1)*POCN))
				{ IM.style.zIndex='1';  }
			//ATRAS
			if(leftc==0)
			{ IM.style.zIndex='2';  }
		}
	}
		//BOTON DERECHO
	var BO=document.createElement('button');
	BO.style.right='0px';
	BO.textContent='>'; 
	BO.onclick=function(){  movde();  };
	BAN.appendChild(BO);
	//BOTON IZQUIERDO
	var BO=document.createElement('button');
	BO.style.left='0px';
	BO.textContent='<'; 
	BO.onclick=function()
	{ for(C=0; C<T ; C++)
		var IM=document.getElementById(IdObj+C);
				var LEF=IM.style.left.split('%',2);
				var leftc=Number(LEF[0]);
				//MOVEMOS
				if(leftc==((T-1)*POCN))
			{ IM.style.left='0%'; }

			if(leftc==((T-1)*POCN))
			{ IM.style.left=(Number(LEF[0])+POCN)+'%'; }
	};
	BAN.appendChild(BO);
	/* EJECUCION AUTOMATICA */
	var TIM=setInterval(function(){movde()},TimL);
}


/*
	<section  class='slidg'  id='BAN1'  style='width:100%;  height:350px;'>
	</section>
	<script>
		var VECB=
		[
			['ARROZ','Bolivianos / Quintal','Bolivia','res/ban1.jpg','Brasil','res/ban1.jpg'],
			['AZUCAR','Bolivianos / Quintal','Bolivia','res/ban1.jpg','Brasil','res/ban1.jpg'],
			['HARINA BLANCA','Bolivianos / Quintal',Bolivia','res/ban1.jpg','Brasil','res/ban1.jpg'],
			['POLLO ENTERO EVISCERADO','Bolivianos / Quintal',Bolivia','res/ban1.jpg','Brasil','res/ban1.jpg'],
			['CARNE DE RES CORTE CHULETA','Bolivianos / Quintal',Bolivia','res/ban1.jpg','Brasil','res/ban1.jpg']
		];
		slidtbl('BAN1',VECB,5000);
	</script>
*/
function slidtbl(IdObj,VecF,tim,AutoMov)
{	T=VecF.length;
	var BAN=document.getElementById(IdObj);
	/* CREAMOS LA TABLA */
	for(C=0; C<T ; C++)
	{	TBL=document.createElement('table');
				if(C==0)
				{ TBL.style.opacity='1'; }
				else
				{ TBL.style.opacity='0'; } 
				TBL.id=IdObj+C;
				TBL.style.width='100%';
				//TBL.style.background='red';
					FIL=document.createElement('tr');
						CEL=document.createElement('td');
						CEL.style.width='50px';
						CEL.style.height='50px';
						CEL.style.background="url('"+VecF[C][3]+"') center center";
						CEL.style.backgroundSize='cover';
						FIL.appendChild(CEL);

						CEL=document.createElement('td');
						CEL.style.textAlign='center';
						CEL.textContent=VecF[C][0];
						FIL.appendChild(CEL);

						CEL=document.createElement('td');
						CEL.style.width='50px';
						CEL.style.height='50px';
						CEL.style.background="url('"+VecF[C][5]+"') center center";
						CEL.style.backgroundSize='cover';
						FIL.appendChild(CEL);
					TBL.appendChild(FIL);

					FIL=document.createElement('tr');
						CEL=document.createElement('td');
						CEL.style.textAlign='center';
						CEL.textContent=VecF[C][2];
						FIL.appendChild(CEL);

						CEL=document.createElement('td');
						CEL.style.textAlign='center';
						CEL.textContent=VecF[C][1];
						FIL.appendChild(CEL);

						CEL=document.createElement('td');
						CEL.style.textAlign='center';
						CEL.textContent=VecF[C][4];
						FIL.appendChild(CEL);
					TBL.appendChild(FIL);

					FIL=document.createElement('tr');
							CEL=document.createElement('td');
							CEL.setAttribute('colspan',3);
							/* INSERTAMOS LA TABLA */
							TF=VecF[C][6].length;
							TBLS=document.createElement('table');
							TBLS.setAttribute('border','1');
							TBLS.setAttribute('cellpadding','0');
							TBLS.setAttribute('cellspacing','0');
							TBLS.style.width='100%';
							for(I=0; I<TF; I++)
							{	TC=VecF[C][6][I].length;
								FI=document.createElement('tr');
								for(D=0; D<TC; D++)
								{ CE=document.createElement('td');
									CE.style.textAlign='left';
									CE.textContent=VecF[C][6][I][D];
									FI.appendChild(CE);
								}
								TBLS.appendChild(FI);
							}
							CEL.appendChild(TBLS);
							/* FIN TABLA */
							FIL.appendChild(CEL);
					TBL.appendChild(FIL);
				BAN.appendChild(TBL);
		}
		//BOTON DERECHO
		var BO=document.createElement('button');
		BO.style.right='0px';
		BO.textContent='>'; 
		BO.onclick=function()
		{ INP=document.getElementById(IdObj+'PO');
			INX=document.getElementById(IdObj+'MX');
			document.getElementById(IdObj+INP.value).style.opacity='0';
			if(Number(INP.value)<Number(INX.value)-1)
			{ INP.value=Number(INP.value)+1;  }
			else
			{ INP.value=0;  }
			document.getElementById(IdObj+INP.value).style.opacity='1';
		};
		BAN.appendChild(BO);
		//BOTON IZQUIERDO
		var BO=document.createElement('button');
		BO.style.left='0px';
		BO.textContent='<';
		BO.onclick=function()
		{ INP=document.getElementById(IdObj+'PO');
			INX=document.getElementById(IdObj+'MX');
			document.getElementById(IdObj+INP.value).style.opacity='0';
			if(Number(INP.value)==0)
			{ INP.value=Number(INX.value)-1;  }
			else
			{ INP.value=Number(INP.value)-1;  }
			document.getElementById(IdObj+INP.value).style.opacity='1';
		};
		BAN.appendChild(BO);
		//INFO POS
		var IN=document.createElement('input');
		IN.id=IdObj+'PO';
		IN.style.display='none';
		IN.value='0';
		BAN.appendChild(IN);
		//INFO MAX
		var IN=document.createElement('input');
		IN.id=IdObj+'MX';
		IN.style.display='none';
		IN.value=T;
		BAN.appendChild(IN);
		//AUTOMATICO
		if(AutoMov)
		{ var TI=setInterval(function(){
			INP=document.getElementById(IdObj+'PO');
			INX=document.getElementById(IdObj+'MX');
			document.getElementById(IdObj+INP.value).style.opacity='0';
			if(Number(INP.value)<Number(INX.value)-1)
			{ INP.value=Number(INP.value)+1;  }
			else
			{ INP.value=0;  }
			document.getElementById(IdObj+INP.value).style.opacity='1';
			},tim);
		}
}

// SLIDER ANIMADO MANTENIEDO TAMAÑO DE IMAGEN JS 
function sliderani(IdObj,Dats,Tim)
{ 	CON=document.getElementById(IdObj);
	CON.className='sliderani';

	let TK=`
	<ul  id='${IdObj}ID'  style="width:${Dats.length*100}%;">`;
		for(C=0; C<Dats.length; C++)
		{	switch(Dats[C][1])
			{	case 1: 	imgcla='screnbig'; break;
				case 2: 	imgcla='screngiro'; break;
				default: 	imgcla=''; break;
			}
			TK+=`
			<li>
				<img  class='${imgcla}'  src="${Dats[C][0]}"  style="animation-duration:${Tim/1000}s;">`;
				if(Dats[C][2]!=''  ||  Dats[C][3]!='')
				{ 	// TEXTO ANIMADO
					switch(Dats[C][4])
					{	case 1: texclas='aparup'; break;
						case 2: texclas='apardown'; break;
						case 3: texclas='aparight'; break;
						case 4: texclas='aparleft'; break;
						case 5: texclas='terradown'; break;
						default: texclas='aparup'; break;
					}
					TK+=`
					<article  class='${texclas}'  style="animation-duration:${Tim/1000}s">
						<h2>${Dats[C][2]}</h2>
						<p>${Dats[C][3]}</p>
					</article>`;
				}
				TK+=`
			</li>`;
		}
		TK+=`
	</ul>`;
	CON.innerHTML=TK;

	let OBJ=document.getElementById(`${IdObj}ID`);
	DIS=1;
	setInterval(function()
	{ 	OBJ.style.marginLeft=(DIS*100*-1)+'%';
		if(DIS<Dats.length-1)
		{ DIS++;  }
		else
		{ DIS=0;  }
	},Tim);
}

// SLIDER ANIMADO MANTENIEDO CON OPCION DE CORTE
function axslideraniclip(IdObj,Dats,Tim,backsize,fond)
{	CON=document.getElementById(IdObj);
	CON.className='axslidclip';
	let TX=`
	<article  id='AXC${IdObj}'  style="width:${Dats.length*100}%;">`;
		//console.log(Dats.length);
		for(C=0; C<Dats.length; C++)
		{	switch(Dats[C][1])
			{	case 2:  cla='screngiro'; break;
				default: cla='screnbig';  break;
			}

			TX+=`
			<aside  style="background-color:${fond};">
				<div  class='${cla}'  title='${cla}'  style="background-color:${fond};  background-image:url('${Dats[C][0]}');  background-size:${backsize};  animation-duration:${Tim/1000}s;">
				</div>`;
				if(Dats[C][2]!='' || Dats[C][3]!='')
				{	// TEXTO ANIMADO
					switch(Dats[C][4])
					{	case 1:  clat='aparup';    break;
						case 2:  clat='apardown';  break;
						case 3:  clat='aparight';  break;
						case 4:  clat='aparleft';  break;
						case 5:  clat='terradown'; break;
						default: clat='aparup';    break;
					}
					TX+=`
					<article  class='${clat}'  style="animation-duration:${Tim/1000}s;">
						<h2>${Dats[C][2]}</h2>
						<p>${Dats[C][3]}</p>
					</article>`;
				}
				TX+=`
			</aside>`;
		}
		TX+=`
	</article>`;
	CON.innerHTML=TX;

	DIS=1;
	let TIMSLID=setInterval(function()
	{	if(document.getElementById(`AXC${IdObj}`))
		{	//console.log('Cambiar banner...');
			document.getElementById(`AXC${IdObj}`).style.marginLeft=(DIS*100*-1)+'%';
			if(DIS<Dats.length-1)
			{ DIS++;  }
			else
			{ DIS=0;  }
		}
		else
		{	//console.log('No hay banner');
			clearInterval(TIMSLID);
		}
	},Tim);
}

/*******************************************************************************\
****** @grafi - GRAFICA LIB *****************************************************
\*******************************************************************************/


//highcharts.js
(function(Q,K){"object"===typeof module&&module.exports?(K["default"]=K,module.exports=Q.document?K(Q):K):"function"===typeof define&&define.amd?define("highcharts/highcharts",function(){return K(Q)}):(Q.Highcharts&&Q.Highcharts.error(16,!0),Q.Highcharts=K(Q))})("undefined"!==typeof window?window:this,function(Q){function K(a,C,I,F){a.hasOwnProperty(C)||(a[C]=F.apply(null,I))}var G={};K(G,"parts/Globals.js",[],function(){var a="undefined"===typeof Q?"undefined"!==typeof window?window:{}:Q,C=a.document,
I=a.navigator&&a.navigator.userAgent||"",F=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,k=/(edge|msie|trident)/i.test(I)&&!a.opera,e=-1!==I.indexOf("Firefox"),q=-1!==I.indexOf("Chrome"),t=e&&4>parseInt(I.split("Firefox/")[1],10);return{product:"Highcharts",version:"7.1.1",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:t,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:k,isWebKit:-1!==I.indexOf("AppleWebKit"),isFirefox:e,isChrome:q,isSafari:!q&&-1!==I.indexOf("Safari"),
isTouchDevice:/(Mobile|Android|Windows Phone)/.test(I),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:F,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});K(G,"parts/Utilities.js",[G["parts/Globals.js"]],function(a){a.timers=[];var C=a.charts,I=a.doc,F=a.win;a.error=function(k,e,q){var t=a.isNumber(k)?"Error:"+k+":"+appweb+k:k,u=function(){if(e)throw Error(t);F.console&&
console.log(t)};q?a.fireEvent(q,"displayError",{code:k,message:t},u):u()};a.Fx=function(a,e,q){this.options=e;this.elem=a;this.prop=q};a.Fx.prototype={dSetter:function(){var a=this.paths[0],e=this.paths[1],q=[],t=this.now,u=a.length,v;if(1===t)q=this.toD;else if(u===e.length&&1>t)for(;u--;)v=parseFloat(a[u]),q[u]=isNaN(v)?e[u]:t*parseFloat(e[u]-v)+v;else q=e;this.elem.attr("d",q,null,!0)},update:function(){var a=this.elem,e=this.prop,q=this.now,t=this.options.step;if(this[e+"Setter"])this[e+"Setter"]();
else a.attr?a.element&&a.attr(e,q,null,!0):a.style[e]=q+this.unit;t&&t.call(a,q,this)},run:function(k,e,q){var t=this,u=t.options,v=function(a){return v.stopped?!1:t.step(a)},p=F.requestAnimationFrame||function(a){setTimeout(a,13)},h=function(){for(var d=0;d<a.timers.length;d++)a.timers[d]()||a.timers.splice(d--,1);a.timers.length&&p(h)};k!==e||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=k,this.end=e,this.unit=q,this.now=this.start,this.pos=0,v.elem=this.elem,v.prop=
this.prop,v()&&1===a.timers.push(v)&&p(h)):(delete u.curAnim[this.prop],u.complete&&0===Object.keys(u.curAnim).length&&u.complete.call(this.elem))},step:function(k){var e=+new Date,q,t=this.options,u=this.elem,v=t.complete,p=t.duration,h=t.curAnim;u.attr&&!u.element?k=!1:k||e>=p+this.startTime?(this.now=this.end,this.pos=1,this.update(),q=h[this.prop]=!0,a.objectEach(h,function(a){!0!==a&&(q=!1)}),q&&v&&v.call(u),k=!1):(this.pos=t.easing((e-this.startTime)/p),this.now=this.start+(this.end-this.start)*
this.pos,this.update(),k=!0);return k},initPath:function(k,e,q){function t(a){var b,g;for(c=a.length;c--;)b="M"===a[c]||"L"===a[c],g=/[a-zA-Z]/.test(a[c+3]),b&&g&&a.splice(c+1,0,a[c+1],a[c+2],a[c+1],a[c+2])}function u(a,d){for(;a.length<g;){a[0]=d[g-a.length];var n=a.slice(0,b);[].splice.apply(a,[0,0].concat(n));w&&(n=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(n)),c--)}a[0]="M"}function v(a,c){for(var d=(g-a.length)/b;0<d&&d--;)l=a.slice().splice(a.length/z-b,b*z),l[0]=c[g-b-d*b],m&&
(l[b-6]=l[b-2],l[b-5]=l[b-1]),[].splice.apply(a,[a.length/z,0].concat(l)),w&&d--}e=e||"";var p,h=k.startX,d=k.endX,m=-1<e.indexOf("C"),b=m?7:3,g,l,c;e=e.split(" ");q=q.slice();var w=k.isArea,z=w?2:1,J;m&&(t(e),t(q));if(h&&d){for(c=0;c<h.length;c++)if(h[c]===d[0]){p=c;break}else if(h[0]===d[d.length-h.length+c]){p=c;J=!0;break}void 0===p&&(e=[])}e.length&&a.isNumber(p)&&(g=q.length+p*z*b,J?(u(e,q),v(q,e)):(u(q,e),v(e,q)));return[e,q]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments)},
strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)}};a.merge=function(){var k,e=arguments,q,t={},u=function(e,p){"object"!==typeof e&&(e={});a.objectEach(p,function(h,d){!a.isObject(h,!0)||a.isClass(h)||a.isDOMElement(h)?e[d]=p[d]:e[d]=u(e[d]||{},h)});return e};!0===e[0]&&(t=e[1],e=Array.prototype.slice.call(e,2));q=e.length;for(k=0;k<q;k++)t=u(t,e[k]);return t};a.pInt=function(a,e){return parseInt(a,e||10)};a.isString=function(a){return"string"===
typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(k,e){return!!k&&"object"===typeof k&&(!e||!a.isArray(k))};a.isDOMElement=function(k){return a.isObject(k)&&"number"===typeof k.nodeType};a.isClass=function(k){var e=k&&k.constructor;return!(!a.isObject(k,!0)||a.isDOMElement(k)||!e||!e.name||"Object"===e.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=
function(a,e){for(var k=a.length;k--;)if(a[k]===e){a.splice(k,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(k,e,q){var t;a.isString(e)?a.defined(q)?k.setAttribute(e,q):k&&k.getAttribute&&((t=k.getAttribute(e))||"class"!==e||(t=k.getAttribute(e+"Name"))):a.defined(e)&&a.isObject(e)&&a.objectEach(e,function(a,e){k.setAttribute(e,a)});return t};a.splat=function(k){return a.isArray(k)?k:[k]};a.syncTimeout=function(a,e,q){if(e)return setTimeout(a,e,q);a.call(0,q)};a.clearTimeout=
function(k){a.defined(k)&&clearTimeout(k)};a.extend=function(a,e){var k;a||(a={});for(k in e)a[k]=e[k];return a};a.pick=function(){var a=arguments,e,q,t=a.length;for(e=0;e<t;e++)if(q=a[e],void 0!==q&&null!==q)return q};a.css=function(k,e){a.isMS&&!a.svg&&e&&void 0!==e.opacity&&(e.filter="alpha(opacity\x3d"+100*e.opacity+")");a.extend(k.style,e)};a.createElement=function(k,e,q,t,u){k=I.createElement(k);var v=a.css;e&&a.extend(k,e);u&&v(k,{padding:0,border:"none",margin:0});q&&v(k,q);t&&t.appendChild(k);
return k};a.extendClass=function(k,e){var q=function(){};q.prototype=new k;a.extend(q.prototype,e);return q};a.pad=function(a,e,q){return Array((e||2)+1-String(a).replace("-","").length).join(q||0)+a};a.relativeLength=function(a,e,q){return/%$/.test(a)?e*parseFloat(a)/100+(q||0):parseFloat(a)};a.wrap=function(a,e,q){var k=a[e];a[e]=function(){var a=Array.prototype.slice.call(arguments),e=arguments,p=this;p.proceed=function(){k.apply(p,arguments.length?arguments:e)};a.unshift(k);a=q.apply(this,a);
p.proceed=null;return a}};a.datePropsToTimestamps=function(k){a.objectEach(k,function(e,q){a.isObject(e)&&"function"===typeof e.getTime?k[q]=e.getTime():(a.isObject(e)||a.isArray(e))&&a.datePropsToTimestamps(e)})};a.formatSingle=function(k,e,q){var t=/\.([0-9])/,u=a.defaultOptions.lang;/f$/.test(k)?(q=(q=k.match(t))?q[1]:-1,null!==e&&(e=a.numberFormat(e,q,u.decimalPoint,-1<k.indexOf(",")?u.thousandsSep:""))):e=(q||a.time).dateFormat(k,e);return e};a.format=function(k,e,q){for(var t="{",u=!1,v,p,h,
d,m=[],b;k;){t=k.indexOf(t);if(-1===t)break;v=k.slice(0,t);if(u){v=v.split(":");p=v.shift().split(".");d=p.length;b=e;for(h=0;h<d;h++)b&&(b=b[p[h]]);v.length&&(b=a.formatSingle(v.join(":"),b,q));m.push(b)}else m.push(v);k=k.slice(t+1);t=(u=!u)?"}":"{"}m.push(k);return m.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(k,e,q,t,u){var v,p=k;q=a.pick(q,1);v=k/q;e||(e=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===
q?e=e.filter(function(a){return 0===a%1}):.1>=q&&(e=[1/q])));for(t=0;t<e.length&&!(p=e[t],u&&p*q>=k||!u&&v<=(e[t]+(e[t+1]||e[t]))/2);t++);return p=a.correctFloat(p*q,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,e){var k=a.length,t,u;for(u=0;u<k;u++)a[u].safeI=u;a.sort(function(a,p){t=e(a,p);return 0===t?a.safeI-p.safeI:t});for(u=0;u<k;u++)delete a[u].safeI};a.arrayMin=function(a){for(var e=a.length,k=a[0];e--;)a[e]<k&&(k=a[e]);return k};a.arrayMax=function(a){for(var e=a.length,
k=a[0];e--;)a[e]>k&&(k=a[e]);return k};a.destroyObjectProperties=function(k,e){a.objectEach(k,function(a,t){a&&a!==e&&a.destroy&&a.destroy();delete k[t]})};a.discardElement=function(k){var e=a.garbageBin;e||(e=a.createElement("div"));k&&e.appendChild(k);e.innerHTML=""};a.correctFloat=function(a,e){return parseFloat(a.toPrecision(e||14))};a.setAnimation=function(k,e){e.renderer.globalAnimation=a.pick(k,e.options.chart.animation,!0)};a.animObject=function(k){return a.isObject(k)?a.merge(k):{duration:k?
500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(k,e,q,t){k=+k||0;e=+e;var u=a.defaultOptions.lang,v=(k.toString().split(".")[1]||"").split("e")[0].length,p,h,d=k.toString().split("e");-1===e?e=Math.min(v,20):a.isNumber(e)?e&&d[1]&&0>d[1]&&(p=e+ +d[1],0<=p?(d[0]=(+d[0]).toExponential(p).split("e")[0],e=p):(d[0]=d[0].split(".")[0]||0,k=20>e?(d[0]*Math.pow(10,d[1])).toFixed(e):0,d[1]=0)):e=2;h=(Math.abs(d[1]?
d[0]:k)+Math.pow(10,-Math.max(e,v)-1)).toFixed(e);v=String(a.pInt(h));p=3<v.length?v.length%3:0;q=a.pick(q,u.decimalPoint);t=a.pick(t,u.thousandsSep);k=(0>k?"-":"")+(p?v.substr(0,p)+t:"");k+=v.substr(p).replace(/(\d{3})(?=\d)/g,"$1"+t);e&&(k+=q+h.slice(-e));d[1]&&0!==+k&&(k+="e"+d[1]);return k};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(k,e,q){if("width"===e)return Math.max(0,Math.min(k.offsetWidth,k.scrollWidth,k.getBoundingClientRect&&"none"===a.getStyle(k,
"transform",!1)?Math.floor(k.getBoundingClientRect().width):Infinity)-a.getStyle(k,"padding-left")-a.getStyle(k,"padding-right"));if("height"===e)return Math.max(0,Math.min(k.offsetHeight,k.scrollHeight)-a.getStyle(k,"padding-top")-a.getStyle(k,"padding-bottom"));F.getComputedStyle||a.error(27,!0);if(k=F.getComputedStyle(k,void 0))k=k.getPropertyValue(e),a.pick(q,"opacity"!==e)&&(k=a.pInt(k));return k};a.inArray=function(a,e,q){return e.indexOf(a,q)};a.find=Array.prototype.find?function(a,e){return a.find(e)}:
function(a,e){var k,t=a.length;for(k=0;k<t;k++)if(e(a[k],k))return a[k]};a.keys=Object.keys;a.offset=function(a){var e=I.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(F.pageYOffset||e.scrollTop)-(e.clientTop||0),left:a.left+(F.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}};a.stop=function(k,e){for(var q=a.timers.length;q--;)a.timers[q].elem!==k||e&&e!==a.timers[q].prop||(a.timers[q].stopped=!0)};a.objectEach=function(a,e,q){for(var k in a)a.hasOwnProperty(k)&&
e.call(q||a[k],a[k],k,a)};a.objectEach({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(k,e){a[e]=function(a){return Array.prototype[k].apply(a,[].slice.call(arguments,1))}});a.addEvent=function(k,e,q,t){var u,v=k.addEventListener||a.addEventListenerPolyfill;u="function"===typeof k&&k.prototype?k.prototype.protoEvents=k.prototype.protoEvents||{}:k.hcEvents=k.hcEvents||{};a.Point&&k instanceof a.Point&&k.series&&k.series.chart&&(k.series.chart.runTrackerClick=!0);v&&v.call(k,
e,q,!1);u[e]||(u[e]=[]);u[e].push(q);t&&a.isNumber(t.order)&&(q.order=t.order,u[e].sort(function(a,h){return a.order-h.order}));return function(){a.removeEvent(k,e,q)}};a.removeEvent=function(k,e,q){function t(h,d){var m=k.removeEventListener||a.removeEventListenerPolyfill;m&&m.call(k,h,d,!1)}function u(h){var d,m;k.nodeName&&(e?(d={},d[e]=!0):d=h,a.objectEach(d,function(a,d){if(h[d])for(m=h[d].length;m--;)t(d,h[d][m])}))}var v,p;["protoEvents","hcEvents"].forEach(function(a){var d=k[a];d&&(e?(v=
d[e]||[],q?(p=v.indexOf(q),-1<p&&(v.splice(p,1),d[e]=v),t(e,q)):(u(d),d[e]=[])):(u(d),k[a]={}))})};a.fireEvent=function(k,e,q,t){var u,v,p,h,d;q=q||{};I.createEvent&&(k.dispatchEvent||k.fireEvent)?(u=I.createEvent("Events"),u.initEvent(e,!0,!0),a.extend(u,q),k.dispatchEvent?k.dispatchEvent(u):k.fireEvent(e,u)):["protoEvents","hcEvents"].forEach(function(m){if(k[m])for(v=k[m][e]||[],p=v.length,q.target||a.extend(q,{preventDefault:function(){q.defaultPrevented=!0},target:k,type:e}),h=0;h<p;h++)(d=v[h])&&
!1===d.call(k,q)&&q.preventDefault()});t&&!q.defaultPrevented&&t.call(k,q)};a.animate=function(k,e,q){var t,u="",v,p,h;a.isObject(q)||(h=arguments,q={duration:h[2],easing:h[3],complete:h[4]});a.isNumber(q.duration)||(q.duration=400);q.easing="function"===typeof q.easing?q.easing:Math[q.easing]||Math.easeInOutSine;q.curAnim=a.merge(e);a.objectEach(e,function(d,h){a.stop(k,h);p=new a.Fx(k,q,h);v=null;"d"===h?(p.paths=p.initPath(k,k.d,e.d),p.toD=e.d,t=0,v=1):k.attr?t=k.attr(h):(t=parseFloat(a.getStyle(k,
h))||0,"opacity"!==h&&(u="px"));v||(v=d);v&&v.match&&v.match("px")&&(v=v.replace(/px/g,""));p.run(t,v,u)})};a.seriesType=function(k,e,q,t,u){var v=a.getOptions(),p=a.seriesTypes;v.plotOptions[k]=a.merge(v.plotOptions[e],q);p[k]=a.extendClass(p[e]||function(){},t);p[k].prototype.type=k;u&&(p[k].prototype.pointClass=a.extendClass(a.Point,u));return p[k]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),e=0;return function(){return"highcharts-"+a+"-"+e++}}();a.isFunction=function(a){return"function"===
typeof a};F.jQuery&&(F.jQuery.fn.highcharts=function(){var k=[].slice.call(arguments);if(this[0])return k[0]?(new (a[a.isString(k[0])?k.shift():"Chart"])(this[0],k[0],k[1]),this):C[a.attr(this[0],"data-highcharts-chart")]})});K(G,"parts/Color.js",[G["parts/Globals.js"]],function(a){var C=a.isNumber,I=a.merge,F=a.pInt;a.Color=function(k){if(!(this instanceof a.Color))return new a.Color(k);this.init(k)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
parse:function(a){return[F(a[1]),F(a[2]),F(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[F(a[1]),F(a[2]),F(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(k){var e,q,t,u;if((this.input=k=this.names[k&&k.toLowerCase?k.toLowerCase():""]||k)&&k.stops)this.stops=k.stops.map(function(e){return new a.Color(e[1])});else if(k&&k.charAt&&"#"===k.charAt()&&(e=k.length,k=parseInt(k.substr(1),16),7===e?q=[(k&16711680)>>
16,(k&65280)>>8,k&255,1]:4===e&&(q=[(k&3840)>>4|(k&3840)>>8,(k&240)>>4|k&240,(k&15)<<4|k&15,1])),!q)for(t=this.parsers.length;t--&&!q;)u=this.parsers[t],(e=u.regex.exec(k))&&(q=u.parse(e));this.rgba=q||[]},get:function(a){var e=this.input,k=this.rgba,t;this.stops?(t=I(e),t.stops=[].concat(t.stops),this.stops.forEach(function(e,k){t.stops[k]=[t.stops[k][0],e.get(a)]})):t=k&&C(k[0])?"rgb"===a||!a&&1===k[3]?"rgb("+k[0]+","+k[1]+","+k[2]+")":"a"===a?k[3]:"rgba("+k.join(",")+")":e;return t},brighten:function(a){var e,
k=this.rgba;if(this.stops)this.stops.forEach(function(e){e.brighten(a)});else if(C(a)&&0!==a)for(e=0;3>e;e++)k[e]+=F(255*a),0>k[e]&&(k[e]=0),255<k[e]&&(k[e]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,e){var k=this.rgba,t=a.rgba;t.length&&k&&k.length?(a=1!==t[3]||1!==k[3],e=(a?"rgba(":"rgb(")+Math.round(t[0]+(k[0]-t[0])*(1-e))+","+Math.round(t[1]+(k[1]-t[1])*(1-e))+","+Math.round(t[2]+(k[2]-t[2])*(1-e))+(a?","+(t[3]+(k[3]-t[3])*(1-e)):"")+")"):e=a.input||
"none";return e}};a.color=function(k){return new a.Color(k)}});K(G,"parts/SvgRenderer.js",[G["parts/Globals.js"]],function(a){var C,I,F=a.addEvent,k=a.animate,e=a.attr,q=a.charts,t=a.color,u=a.css,v=a.createElement,p=a.defined,h=a.deg2rad,d=a.destroyObjectProperties,m=a.doc,b=a.extend,g=a.erase,l=a.hasTouch,c=a.isArray,w=a.isFirefox,z=a.isMS,J=a.isObject,D=a.isString,A=a.isWebKit,n=a.merge,x=a.noop,B=a.objectEach,E=a.pick,H=a.pInt,f=a.removeEvent,r=a.splat,N=a.stop,M=a.svg,L=a.SVG_NS,P=a.symbolSizes,
O=a.win;C=a.SVGElement=function(){return this};b(C.prototype,{opacity:1,SVG_NS:L,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),init:function(y,f){this.element="span"===f?v(f):m.createElementNS(this.SVG_NS,f);this.renderer=y;a.fireEvent(this,"afterInit")},animate:function(y,f,b){var c=a.animObject(E(f,this.renderer.globalAnimation,!0));E(m.hidden,m.msHidden,m.webkitHidden,!1)&&(c.duration=0);
0!==c.duration?(b&&(c.complete=b),k(this,y,c)):(this.attr(y,null,b),a.objectEach(y,function(a,y){c.step&&c.step.call(this,a,{prop:y,pos:1})},this));return this},complexColor:function(y,f,b){var r=this.renderer,d,g,l,h,S,m,L,w,x,e,z,M=[],N;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){y.radialGradient?g="radialGradient":y.linearGradient&&(g="linearGradient");g&&(l=y[g],S=r.gradients,L=y.stops,e=b.radialReference,c(l)&&(y[g]=l={x1:l[0],y1:l[1],x2:l[2],y2:l[3],gradientUnits:"userSpaceOnUse"}),
"radialGradient"===g&&e&&!p(l.gradientUnits)&&(h=l,l=n(l,r.getRadialAttr(e,h),{gradientUnits:"userSpaceOnUse"})),B(l,function(a,y){"id"!==y&&M.push(y,a)}),B(L,function(a){M.push(a)}),M=M.join(","),S[M]?z=S[M].attr("id"):(l.id=z=a.uniqueKey(),S[M]=m=r.createElement(g).attr(l).add(r.defs),m.radAttr=h,m.stops=[],L.forEach(function(y){0===y[1].indexOf("rgba")?(d=a.color(y[1]),w=d.get("rgb"),x=d.get("a")):(w=y[1],x=1);y=r.createElement("stop").attr({offset:y[0],"stop-color":w,"stop-opacity":x}).add(m);
m.stops.push(y)})),N="url("+r.url+"#"+z+")",b.setAttribute(f,N),b.gradient=M,y.toString=function(){return N})})},applyTextOutline:function(y){var f=this.element,b,c,r;-1!==y.indexOf("contrast")&&(y=y.replace(/contrast/g,this.renderer.getContrast(f.style.fill)));y=y.split(" ");b=y[y.length-1];(c=y[0])&&"none"!==c&&a.svg&&(this.fakeTS=!0,y=[].slice.call(f.getElementsByTagName("tspan")),this.ySetter=this.xSetter,c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,y,f){return 2*y+f}),this.removeTextOutline(y),
r=f.firstChild,y.forEach(function(a,y){0===y&&(a.setAttribute("x",f.getAttribute("x")),y=f.getAttribute("y"),a.setAttribute("y",y||0),null===y&&f.setAttribute("y",0));a=a.cloneNode(1);e(a,{"class":"highcharts-text-outline",fill:b,stroke:b,"stroke-width":c,"stroke-linejoin":"round"});f.insertBefore(a,r)}))},removeTextOutline:function(a){for(var y=a.length,f;y--;)f=a[y],"highcharts-text-outline"===f.getAttribute("class")&&g(a,this.element.removeChild(f))},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),
attr:function(y,f,b,c){var r,d=this.element,g,l=this,n,h,m=this.symbolCustomAttribs;"string"===typeof y&&void 0!==f&&(r=y,y={},y[r]=f);"string"===typeof y?l=(this[y+"Getter"]||this._defaultGetter).call(this,y,d):(B(y,function(f,b){n=!1;c||N(this,b);this.symbolName&&-1!==a.inArray(b,m)&&(g||(this.symbolAttr(y),g=!0),n=!0);!this.rotation||"x"!==b&&"y"!==b||(this.doTransform=!0);n||(h=this[b+"Setter"]||this._defaultSetter,h.call(this,f,b,d),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b)&&
this.updateShadows(b,f,h))},this),this.afterSetters());b&&b.call(this);return l},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,f,b){for(var y=this.shadows,c=y.length;c--;)b.call(y[c],"height"===a?Math.max(f-(y[c].cutHeight||0),0):"d"===a?this.d:f,a,y[c])},addClass:function(a,f){var y=this.attr("class")||"";f||(a=(a||"").split(/ /g).reduce(function(a,f){-1===y.indexOf(f)&&a.push(f);return a},y?[y]:[]).join(" "));a!==y&&this.attr("class",
a);return this},hasClass:function(a){return-1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var y=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(f){y[f]=E(a[f],y[f])});y.attr({d:y.renderer.symbols[y.symbolName](y.x,y.y,y.width,y.height,y)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},
crisp:function(a,f){var y;f=f||a.strokeWidth||0;y=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+y;a.y=Math.floor(a.y||this.y||0)+y;a.width=Math.floor((a.width||this.width||0)-2*y);a.height=Math.floor((a.height||this.height||0)-2*y);p(a.strokeWidth)&&(a.strokeWidth=f);return a},css:function(a){var y=this.styles,f={},c=this.element,r,d="",g,l=!y,n=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);y&&B(a,function(a,b){a!==y[b]&&(f[b]=a,l=!0)});l&&(y&&(a=b(y,f)),a&&(null===a.width||
"auto"===a.width?delete this.textWidth:"text"===c.nodeName.toLowerCase()&&a.width&&(r=this.textWidth=H(a.width))),this.styles=a,r&&!M&&this.renderer.forExport&&delete a.width,c.namespaceURI===this.SVG_NS?(g=function(a,y){return"-"+y.toLowerCase()},B(a,function(a,y){-1===n.indexOf(y)&&(d+=y.replace(/([A-Z])/g,g)+":"+a+";")}),d&&e(c,"style",d)):u(c,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return O.getComputedStyle(this.element||
this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var a=this.getStyle("stroke-width"),f;a.indexOf("px")===a.length-2?a=H(a):(f=m.createElementNS(L,"rect"),e(f,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(f),a=f.getBBox().width,f.parentNode.removeChild(f));return a},on:function(a,f){var y=this,b=y.element;l&&"click"===a?(b.ontouchstart=function(a){y.touchEventFired=Date.now();a.preventDefault();f.call(b,a)},b.onclick=
function(a){(-1===O.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&f.call(b,a)}):b["on"+a]=f;return this},setRadialReference:function(a){var y=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;y&&y.radAttr&&y.animate(this.renderer.getRadialAttr(a,y.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,f=this.translateY||0,b=this.scaleX,c=this.scaleY,r=this.inverted,d=this.rotation,g=this.matrix,l=this.element;r&&(a+=this.width,f+=this.height);a=["translate("+a+","+f+")"];p(g)&&a.push("matrix("+g.join(",")+")");r?a.push("rotate(90) scale(-1,1)"):d&&a.push("rotate("+d+" "+E(this.rotationOriginX,l.getAttribute("x"),0)+" "+E(this.rotationOriginY,l.getAttribute("y")||0)+")");(p(b)||p(c))&&a.push("scale("+E(b,1)+" "+E(c,1)+")");a.length&&l.setAttribute("transform",a.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,f,b){var y,c,r,d,l={};c=this.renderer;r=c.alignedObjects;var n,h;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!b||D(b))this.alignTo=y=b||"renderer",g(r,this),r.push(this),b=null}else a=this.alignOptions,f=this.alignByTranslate,y=this.alignTo;b=E(b,c[y],c);y=a.align;c=a.verticalAlign;r=(b.x||0)+(a.x||0);d=(b.y||0)+(a.y||0);"right"===y?n=1:"center"===y&&(n=2);n&&(r+=(b.width-(a.width||0))/n);l[f?"translateX":"x"]=Math.round(r);
"bottom"===c?h=1:"middle"===c&&(h=2);h&&(d+=(b.height-(a.height||0))/h);l[f?"translateY":"y"]=Math.round(d);this[this.placed?"animate":"attr"](l);this.placed=!0;this.alignAttr=l;return this},getBBox:function(a,f){var y,c=this.renderer,r,d=this.element,l=this.styles,g,n=this.textStr,m,L=c.cache,w=c.cacheKeys,x=d.namespaceURI===this.SVG_NS,B;f=E(f,this.rotation);r=f*h;g=c.styledMode?d&&C.prototype.getStyle.call(d,"font-size"):l&&l.fontSize;p(n)&&(B=n.toString(),-1===B.indexOf("\x3c")&&(B=B.replace(/[0-9]/g,
"0")),B+=["",f||0,g,this.textWidth,l&&l.textOverflow].join());B&&!a&&(y=L[B]);if(!y){if(x||c.forExport){try{(m=this.fakeTS&&function(a){[].forEach.call(d.querySelectorAll(".highcharts-text-outline"),function(y){y.style.display=a})})&&m("none"),y=d.getBBox?b({},d.getBBox()):{width:d.offsetWidth,height:d.offsetHeight},m&&m("")}catch(Z){}if(!y||0>y.width)y={width:0,height:0}}else y=this.htmlGetBBox();c.isSVG&&(a=y.width,c=y.height,x&&(y.height=c={"11px,17":14,"13px,20":16}[l&&l.fontSize+","+Math.round(c)]||
c),f&&(y.width=Math.abs(c*Math.sin(r))+Math.abs(a*Math.cos(r)),y.height=Math.abs(c*Math.cos(r))+Math.abs(a*Math.sin(r))));if(B&&0<y.height){for(;250<w.length;)delete L[w.shift()];L[B]||w.push(B);L[B]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var y=this;y.animate({opacity:0},{duration:a||150,complete:function(){y.attr({y:-9999})}})},add:function(a){var y=this.renderer,f=this.element,
b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&y.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:y.box).appendChild(f);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var y=a.parentNode;y&&y.removeChild(a)},destroy:function(){var a=this,f=a.element||{},b=a.renderer,c=b.isSVG&&"SPAN"===f.nodeName&&a.parentGroup,r=f.ownerSVGElement,d=a.clipPath;f.onclick=f.onmouseout=f.onmouseover=f.onmousemove=
f.point=null;N(a);d&&r&&([].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){-1<a.getAttribute("clip-path").indexOf(d.element.id)&&a.removeAttribute("clip-path")}),a.clipPath=d.destroy());if(a.stops){for(r=0;r<a.stops.length;r++)a.stops[r]=a.stops[r].destroy();a.stops=null}a.safeRemoveChild(f);for(b.styledMode||a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)f=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=f;a.alignTo&&g(b.alignedObjects,a);B(a,function(f,y){delete a[y]});
return null},shadow:function(a,f,b){var y=[],c,r,d=this.element,l,g,n,h;if(!a)this.destroyShadows();else if(!this.shadows){g=E(a.width,3);n=(a.opacity||.15)/g;h=this.parentInverted?"(-1,-1)":"("+E(a.offsetX,1)+", "+E(a.offsetY,1)+")";for(c=1;c<=g;c++)r=d.cloneNode(0),l=2*g+1-2*c,e(r,{stroke:a.color||"#000000","stroke-opacity":n*c,"stroke-width":l,transform:"translate"+h,fill:"none"}),r.setAttribute("class",(r.getAttribute("class")||"")+" highcharts-shadow"),b&&(e(r,"height",Math.max(e(r,"height")-
l,0)),r.cutHeight=l),f?f.element.appendChild(r):d.parentNode&&d.parentNode.insertBefore(r,d),y.push(r);this.shadows=y}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=E(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));
return a},dSetter:function(a,f,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[f]!==a&&(b.setAttribute(f,a),this[f]=a)},dashstyleSetter:function(a){var f,y=this["stroke-width"];"inherit"===y&&(y=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=a.length;f--;)a[f]=
H(a[f])*y;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){var f={left:"start",center:"middle",right:"end"};f[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",f[a]))},opacitySetter:function(a,f,b){this[f]=a;b.setAttribute(f,a)},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=m.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(m.createTextNode(String(E(a),
"").replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},setTextPath:function(f,b){var y=this.element,c={textAnchor:"text-anchor"},r,d=!1,l,g=this.textPathWrapper,h=!g;b=n(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},b);r=b.attributes;if(f&&b&&b.enabled){this.options&&this.options.padding&&(r.dx=-this.options.padding);g||(this.textPathWrapper=
g=this.renderer.createElement("textPath"),d=!0);l=g.element;(b=f.element.getAttribute("id"))||f.element.setAttribute("id",b=a.uniqueKey());if(h)for(f=y.getElementsByTagName("tspan");f.length;)f[0].setAttribute("y",0),l.appendChild(f[0]);d&&g.add({element:this.text?this.text.element:y});l.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);p(r.dy)&&(l.parentNode.setAttribute("dy",r.dy),delete r.dy);p(r.dx)&&(l.parentNode.setAttribute("dx",r.dx),delete r.dx);a.objectEach(r,
function(a,f){l.setAttribute(c[f]||f,a)});y.removeAttribute("transform");this.removeTextOutline.call(g,[].slice.call(y.getElementsByTagName("tspan")));this.applyTextOutline=this.updateTransform=x}else g&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(y,f));return this},destroyTextPath:function(a,f){var y;f.element.setAttribute("id","");for(y=this.textPathWrapper.element.childNodes;y.length;)a.firstChild.appendChild(y[0]);a.firstChild.removeChild(this.textPathWrapper.element);
delete f.textPathWrapper},fillSetter:function(a,f,b){"string"===typeof a?b.setAttribute(f,a):a&&this.complexColor(a,f,b)},visibilitySetter:function(a,f,b){"inherit"===a?b.removeAttribute(f):this[f]!==a&&b.setAttribute(f,a);this[f]=a},zIndexSetter:function(a,f){var b=this.renderer,y=this.parentGroup,c=(y||b).element||b.box,r,d=this.element,l,g,b=c===b.box;r=this.added;var n;p(a)?(d.setAttribute("data-z-index",a),a=+a,this[f]===a&&(r=!1)):p(this[f])&&d.removeAttribute("data-z-index");this[f]=a;if(r){(a=
this.zIndex)&&y&&(y.handleZ=!0);f=c.childNodes;for(n=f.length-1;0<=n&&!l;n--)if(y=f[n],r=y.getAttribute("data-z-index"),g=!p(r),y!==d)if(0>a&&g&&!b&&!n)c.insertBefore(d,f[n]),l=!0;else if(H(r)<=a||g&&(!p(a)||0<=a))c.insertBefore(d,f[n+1]||null),l=!0;l||(c.insertBefore(d,f[b?3:0]||null),l=!0)}return l},_defaultSetter:function(a,f,b){b.setAttribute(f,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=C.prototype.rotationSetter=C.prototype.verticalAlignSetter=
C.prototype.rotationOriginXSetter=C.prototype.rotationOriginYSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=C.prototype.matrixSetter=function(a,f){this[f]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,f,b){this[f]=a;this.stroke&&this["stroke-width"]?(C.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),
this.hasStroke=!1)};I=a.SVGRenderer=function(){this.init.apply(this,arguments)};b(I.prototype,{Element:C,SVG_NS:L,init:function(a,f,b,c,r,d,l){var y;y=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});l||y.css(this.getStyle(c));c=y.element;a.appendChild(c);e(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&e(c,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=c;this.boxWrapper=y;this.alignedObjects=[];this.url=(w||A)&&m.getElementsByTagName("base").length?O.location.href.split("#")[0].replace(/<[^>]*>/g,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.1.1"));this.defs=this.createElement("defs").add();this.allowHTML=d;this.forExport=r;this.styledMode=l;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,b,!1);var g;w&&a.getBoundingClientRect&&(f=function(){u(a,{left:0,top:0});g=a.getBoundingClientRect();u(a,{left:Math.ceil(g.left)-g.left+"px",top:Math.ceil(g.top)-g.top+
"px"})},f(),this.unSubPixelFix=F(O,"resize",f))},definition:function(a){function f(a,c){var y;r(a).forEach(function(a){var r=b.createElement(a.tagName),d={};B(a,function(a,f){"tagName"!==f&&"children"!==f&&"textContent"!==f&&(d[f]=a)});r.attr(d);r.add(c||b.defs);a.textContent&&r.element.appendChild(m.createTextNode(a.textContent));f(a.children||[],r);y=r});return y}var b=this;return f(a)},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:x,getRadialAttr:function(a,f){return{cx:a[0]-a[2]/
2+f.cx*a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},truncate:function(a,f,b,c,r,d,l){var y=this,g=a.rotation,n,h=c?1:0,L=(b||c).length,w=L,x=[],B=function(a){f.firstChild&&f.removeChild(f.firstChild);a&&f.appendChild(m.createTextNode(a))},p=function(d,g){g=g||d;if(void 0===x[g])if(f.getSubStringLength)try{x[g]=r+f.getSubStringLength(0,c?g+1:g)}catch(aa){}else y.getSpanWidth&&(B(l(b||c,d)),x[g]=r+y.getSpanWidth(a,f));return x[g]},e,z;a.rotation=0;e=p(f.textContent.length);if(z=r+e>d){for(;h<=L;)w=Math.ceil((h+
L)/2),c&&(n=l(c,w)),e=p(w,n&&n.length-1),h===L?h=L+1:e>d?L=w-1:h=w;0===L?B(""):b&&L===b.length-1||B(n||l(b||c,w))}c&&c.splice(0,w);a.actualWidth=e;a.rotation=g;return z},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var f=a.element,b=this,c=b.forExport,r=E(a.textStr,"").toString(),y=-1!==r.indexOf("\x3c"),d=f.childNodes,g,l=e(f,"x"),n=a.styles,h=a.textWidth,w=n&&n.lineHeight,x=n&&n.textOutline,p=n&&"ellipsis"===n.textOverflow,z=
n&&"nowrap"===n.whiteSpace,N=n&&n.fontSize,P,A,D=d.length,n=h&&!a.added&&this.box,k=function(a){var c;b.styledMode||(c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:N||b.style.fontSize||12);return w?H(w):b.fontMetrics(c,a.getAttribute("style")?a:f).h},J=function(a,f){B(b.escapes,function(b,c){f&&-1!==f.indexOf(b)||(a=a.toString().replace(new RegExp(b,"g"),c))});return a},O=function(a,f){var b;b=a.indexOf("\x3c");a=a.substring(b,a.indexOf("\x3e")-b);b=a.indexOf(f+"\x3d");if(-1!==b&&(b=b+f.length+
1,f=a.charAt(b),'"'===f||"'"===f))return a=a.substring(b+1),a.substring(0,a.indexOf(f))};P=[r,p,z,w,x,N,h].join();if(P!==a.textCache){for(a.textCache=P;D--;)f.removeChild(d[D]);y||x||p||h||-1!==r.indexOf(" ")?(n&&n.appendChild(f),y?(r=b.styledMode?r.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e'):r.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e'),
r=r.replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g)):r=[r],r=r.filter(function(a){return""!==a}),r.forEach(function(r,y){var d,n=0,w=0;r=r.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");d=r.split("|||");d.forEach(function(r){if(""!==r||1===d.length){var x={},B=m.createElementNS(b.SVG_NS,"tspan"),P,E;(P=O(r,"class"))&&e(B,"class",P);if(P=O(r,"style"))P=P.replace(/(;| |^)color([ :])/,"$1fill$2"),e(B,"style",
P);(E=O(r,"href"))&&!c&&(e(B,"onclick",'location.href\x3d"'+E+'"'),e(B,"class","highcharts-anchor"),b.styledMode||u(B,{cursor:"pointer"}));r=J(r.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==r){B.appendChild(m.createTextNode(r));n?x.dx=0:y&&null!==l&&(x.x=l);e(B,x);f.appendChild(B);!n&&A&&(!M&&c&&u(B,{display:"block"}),e(B,"dy",k(B)));if(h){var D=r.replace(/([^\^])-/g,"$1- ").split(" "),x=!z&&(1<d.length||y||1<D.length);E=0;var H=k(B);if(p)g=b.truncate(a,B,r,void 0,0,Math.max(0,h-parseInt(N||
12,10)),function(a,f){return a.substring(0,f)+"\u2026"});else if(x)for(;D.length;)D.length&&!z&&0<E&&(B=m.createElementNS(L,"tspan"),e(B,{dy:H,x:l}),P&&e(B,"style",P),B.appendChild(m.createTextNode(D.join(" ").replace(/- /g,"-"))),f.appendChild(B)),b.truncate(a,B,null,D,0===E?w:0,h,function(a,f){return D.slice(0,f).join(" ").replace(/- /g,"-")}),w=a.actualWidth,E++}n++}}});A=A||f.childNodes.length}),p&&g&&a.attr("title",J(a.textStr,["\x26lt;","\x26gt;"])),n&&n.removeChild(f),x&&a.applyTextOutline&&
a.applyTextOutline(x)):f.appendChild(m.createTextNode(J(r)))}},getContrast:function(a){a=t(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,f,r,c,d,g,l,h,L,w){var y=this.label(a,f,r,L,null,null,w,null,"button"),m=0,B=this.styledMode;y.attr(n({padding:8,r:2},d));if(!B){var x,p,e,M;d=n({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},d);x=d.style;delete d.style;g=n(d,{fill:"#e6e6e6"},g);
p=g.style;delete g.style;l=n(d,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},l);e=l.style;delete l.style;h=n(d,{style:{color:"#cccccc"}},h);M=h.style;delete h.style}F(y.element,z?"mouseover":"mouseenter",function(){3!==m&&y.setState(1)});F(y.element,z?"mouseout":"mouseleave",function(){3!==m&&y.setState(m)});y.setState=function(a){1!==a&&(y.state=m=a);y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||
0]);B||y.attr([d,g,l,h][a||0]).css([x,p,e,M][a||0])};B||y.attr(d).css(b({cursor:"default"},x));return y.on("click",function(a){3!==m&&c.call(y,a)})},crispLine:function(a,f){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f=this.styledMode?{}:{fill:"none"};c(a)?f.d=a:J(a)&&b(f,a);return this.createElement("path").attr(f)},circle:function(a,f,b){a=J(a)?a:void 0===a?{}:{x:a,y:f,r:b};f=this.createElement("circle");f.xSetter=
f.ySetter=function(a,f,b){b.setAttribute("c"+f,a)};return f.attr(a)},arc:function(a,f,b,r,c,d){J(a)?(r=a,f=r.y,b=r.r,a=r.x):r={innerR:r,start:c,end:d};a=this.symbol("arc",a,f,b,b,r);a.r=b;return a},rect:function(a,f,b,r,c,d){c=J(a)?a.r:c;var g=this.createElement("rect");a=J(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(b,0),height:Math.max(r,0)};this.styledMode||(void 0!==d&&(a.strokeWidth=d,a=g.crisp(a)),a.fill="none");c&&(a.r=c);g.rSetter=function(a,f,b){g.r=a;e(b,{rx:a,ry:a})};g.rGetter=function(){return g.r};
return g.attr(a)},setSize:function(a,f,b){var r=this.alignedObjects,c=r.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:E(b,!0)?void 0:0});c--;)r[c].align()},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,r,c,d,g){var l={preserveAspectRatio:"none"},n,y=function(a,f){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink",
"href",f):a.setAttribute("hc-svg-href",f)},h=function(f){y(n.element,a);g.call(n,f)};1<arguments.length&&b(l,{x:f,y:r,width:c,height:d});n=this.createElement("image").attr(l);g?(y(n.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),l=new O.Image,F(l,"load",h),l.src=a,l.complete&&h({})):y(n.element,a);return n},symbol:function(a,f,r,c,d,g){var l=this,n,y=/^url\((.*?)\)$/,h=y.test(a),L=!h&&(this.symbols[a]?a:"circle"),w=L&&this.symbols[L],B=p(f)&&w&&w.call(this.symbols,
Math.round(f),Math.round(r),c,d,g),x,e;w?(n=this.path(B),l.styledMode||n.attr("fill","none"),b(n,{symbolName:L,x:f,y:r,width:c,height:d}),g&&b(n,g)):h&&(x=a.match(y)[1],n=this.image(x),n.imgwidth=E(P[x]&&P[x].width,g&&g.width),n.imgheight=E(P[x]&&P[x].height,g&&g.height),e=function(){n.attr({width:n.width,height:n.height})},["width","height"].forEach(function(a){n[a+"Setter"]=function(a,f){var b={},r=this["img"+f],c="width"===f?"translateX":"translateY";this[f]=a;p(r)&&(g&&"within"===g.backgroundSize&&
this.width&&this.height&&(r=Math.round(r*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(f,r),this.alignByTranslate||(b[c]=((this[f]||0)-r)/2,this.attr(b)))}}),p(f)&&n.attr({x:f,y:r}),n.isImg=!0,p(n.imgwidth)&&p(n.imgheight)?e():(n.attr({width:0,height:0}),v("img",{onload:function(){var a=q[l.chartIndex];0===this.width&&(u(this,{position:"absolute",top:"-999em"}),m.body.appendChild(this));P[x]={width:this.width,height:this.height};n.imgwidth=
this.width;n.imgheight=this.height;n.element&&e();this.parentNode&&this.parentNode.removeChild(this);l.imgCount--;if(!l.imgCount&&a&&a.onload)a.onload()},src:x}),this.imgCount++));return n},symbols:{circle:function(a,f,b,r){return this.arc(a+b/2,f+r/2,b/2,r/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,f,b,r){return["M",a,f,"L",a+b,f,a+b,f+r,a,f+r,"Z"]},triangle:function(a,f,b,r){return["M",a+b/2,f,"L",a+b,f+r,a,f+r,"Z"]},"triangle-down":function(a,f,b,r){return["M",a,f,"L",a+b,
f,a+b/2,f+r,"Z"]},diamond:function(a,f,b,r){return["M",a+b/2,f,"L",a+b,f+r/2,a+b/2,f+r,a,f+r/2,"Z"]},arc:function(a,f,b,r,c){var d=c.start,g=c.r||b,l=c.r||r||b,n=c.end-.001;b=c.innerR;r=E(c.open,.001>Math.abs(c.end-c.start-2*Math.PI));var y=Math.cos(d),h=Math.sin(d),L=Math.cos(n),n=Math.sin(n),d=.001>c.end-d-Math.PI?0:1;c=["M",a+g*y,f+l*h,"A",g,l,0,d,E(c.clockwise,1),a+g*L,f+l*n];p(b)&&c.push(r?"M":"L",a+b*L,f+b*n,"A",b,b,0,d,0,a+b*y,f+b*h);c.push(r?"":"Z");return c},callout:function(a,f,b,r,c){var d=
Math.min(c&&c.r||0,b,r),g=d+6,l=c&&c.anchorX;c=c&&c.anchorY;var n;n=["M",a+d,f,"L",a+b-d,f,"C",a+b,f,a+b,f,a+b,f+d,"L",a+b,f+r-d,"C",a+b,f+r,a+b,f+r,a+b-d,f+r,"L",a+d,f+r,"C",a,f+r,a,f+r,a,f+r-d,"L",a,f+d,"C",a,f,a,f,a+d,f];l&&l>b?c>f+g&&c<f+r-g?n.splice(13,3,"L",a+b,c-6,a+b+6,c,a+b,c+6,a+b,f+r-d):n.splice(13,3,"L",a+b,r/2,l,c,a+b,r/2,a+b,f+r-d):l&&0>l?c>f+g&&c<f+r-g?n.splice(33,3,"L",a,c+6,a-6,c,a,c-6,a,f+d):n.splice(33,3,"L",a,r/2,l,c,a,r/2,a,f+d):c&&c>r&&l>a+g&&l<a+b-g?n.splice(23,3,"L",l+6,f+
r,l,f+r+6,l-6,f+r,a+d,f+r):c&&0>c&&l>a+g&&l<a+b-g&&n.splice(3,3,"L",l-6,f,l,f-6,l+6,f,b-d,f);return n}},clipRect:function(f,b,r,c){var d=a.uniqueKey()+"-",g=this.createElement("clipPath").attr({id:d}).add(this.defs);f=this.rect(f,b,r,c,0).add(g);f.id=d;f.clipPath=g;f.count=0;return f},text:function(a,f,b,r){var c={};if(r&&(this.allowHTML||!this.forExport))return this.html(a,f,b);c.x=Math.round(f||0);b&&(c.y=Math.round(b));p(a)&&(c.text=a);a=this.createElement("text").attr(c);r||(a.xSetter=function(a,
f,b){var r=b.getElementsByTagName("tspan"),c,d=b.getAttribute(f),g;for(g=0;g<r.length;g++)c=r[g],c.getAttribute(f)===d&&c.setAttribute(f,a);b.setAttribute(f,a)});return a},fontMetrics:function(a,f){a=!this.styledMode&&/px/.test(a)||!O.getComputedStyle?a||f&&f.style&&f.style.fontSize||this.style&&this.style.fontSize:f&&C.prototype.getStyle.call(f,"font-size");a=/px/.test(a)?H(a):12;f=24>a?a+3:Math.round(1.2*a);return{h:f,b:Math.round(.8*f),f:a}},rotCorr:function(a,f,b){var r=a;f&&b&&(r=Math.max(r*
Math.cos(f*h),4));return{x:-a/3*Math.sin(f*h),y:r}},label:function(r,c,d,g,l,h,L,w,m){var y=this,B=y.styledMode,x=y.g("button"!==m&&"label"),e=x.text=y.text("",0,0,L).attr({zIndex:1}),z,M,P=0,N=3,E=0,A,D,H,k,J,O={},v,t,q=/^url\((.*?)\)$/.test(g),u=B||q,S=function(){return B?z.strokeWidth()%2/2:(v?parseInt(v,10):0)%2/2},U,R,T;m&&x.addClass("highcharts-"+m);U=function(){var a=e.element.style,f={};M=(void 0===A||void 0===D||J)&&p(e.textStr)&&e.getBBox();x.width=(A||M.width||0)+2*N+E;x.height=(D||M.height||
0)+2*N;t=N+Math.min(y.fontMetrics(a&&a.fontSize,e).b,M?M.height:Infinity);u&&(z||(x.box=z=y.symbols[g]||q?y.symbol(g):y.rect(),z.addClass(("button"===m?"":"highcharts-label-box")+(m?" highcharts-"+m+"-box":"")),z.add(x),a=S(),f.x=a,f.y=(w?-t:0)+a),f.width=Math.round(x.width),f.height=Math.round(x.height),z.attr(b(f,O)),O={})};R=function(){var a=E+N,f;f=w?0:t;p(A)&&M&&("center"===J||"right"===J)&&(a+={center:.5,right:1}[J]*(A-M.width));if(a!==e.x||f!==e.y)e.attr("x",a),e.hasBoxWidthChanged&&(M=e.getBBox(!0),
U()),void 0!==f&&e.attr("y",f);e.x=a;e.y=f};T=function(a,f){z?z.attr(a,f):O[a]=f};x.onAdd=function(){e.add(x);x.attr({text:r||0===r?r:"",x:c,y:d});z&&p(l)&&x.attr({anchorX:l,anchorY:h})};x.widthSetter=function(f){A=a.isNumber(f)?f:null};x.heightSetter=function(a){D=a};x["text-alignSetter"]=function(a){J=a};x.paddingSetter=function(a){p(a)&&a!==N&&(N=x.padding=a,R())};x.paddingLeftSetter=function(a){p(a)&&a!==E&&(E=a,R())};x.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==P&&(P=a,M&&x.attr({x:H}))};
x.textSetter=function(a){void 0!==a&&e.attr({text:a});U();R()};x["stroke-widthSetter"]=function(a,f){a&&(u=!0);v=this["stroke-width"]=a;T(f,a)};B?x.rSetter=function(a,f){T(f,a)}:x.strokeSetter=x.fillSetter=x.rSetter=function(a,f){"r"!==f&&("fill"===f&&a&&(u=!0),x[f]=a);T(f,a)};x.anchorXSetter=function(a,f){l=x.anchorX=a;T(f,Math.round(a)-S()-H)};x.anchorYSetter=function(a,f){h=x.anchorY=a;T(f,a-k)};x.xSetter=function(a){x.x=a;P&&(a-=P*((A||M.width)+2*N),x["forceAnimate:x"]=!0);H=Math.round(a);x.attr("translateX",
H)};x.ySetter=function(a){k=x.y=Math.round(a);x.attr("translateY",k)};var F=x.css;L={css:function(a){if(a){var f={};a=n(a);x.textProps.forEach(function(b){void 0!==a[b]&&(f[b]=a[b],delete a[b])});e.css(f);"width"in f&&U();"fontSize"in f&&(U(),R())}return F.call(x,a)},getBBox:function(){return{width:M.width+2*N,height:M.height+2*N,x:M.x-N,y:M.y-N}},destroy:function(){f(x.element,"mouseenter");f(x.element,"mouseleave");e&&(e=e.destroy());z&&(z=z.destroy());C.prototype.destroy.call(x);x=y=U=R=T=null}};
B||(L.shadow=function(a){a&&(U(),z&&z.shadow(a));return x});return b(x,L)}});a.Renderer=I});K(G,"parts/Html.js",[G["parts/Globals.js"]],function(a){var C=a.attr,I=a.createElement,F=a.css,k=a.defined,e=a.extend,q=a.isFirefox,t=a.isMS,u=a.isWebKit,v=a.pick,p=a.pInt,h=a.SVGElement,d=a.SVGRenderer,m=a.win;e(h.prototype,{htmlCss:function(a){var b="SPAN"===this.element.tagName&&a&&"width"in a,d=v(b&&a.width,void 0),c;b&&(delete a.width,this.textWidth=d,c=!0);a&&"ellipsis"===a.textOverflow&&(a.whiteSpace=
"nowrap",a.overflow="hidden");this.styles=e(this.styles,a);F(this.element,a);c&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,d=this.element,l=this.translateX||0,c=this.translateY||0,h=this.x||0,m=this.y||0,e=this.textAlign||"left",D={left:0,center:.5,right:1}[e],A=this.styles,n=A&&A.whiteSpace;F(d,{marginLeft:l,marginTop:c});
!a.styledMode&&this.shadows&&this.shadows.forEach(function(a){F(a,{marginLeft:l+1,marginTop:c+1})});this.inverted&&[].forEach.call(d.childNodes,function(b){a.invertChild(b,d)});if("SPAN"===d.tagName){var A=this.rotation,x=this.textWidth&&p(this.textWidth),B=[A,e,d.innerHTML,this.textWidth,this.textAlign].join(),E;(E=x!==this.oldTextWidth)&&!(E=x>this.oldTextWidth)&&((E=this.textPxLength)||(F(d,{width:"",whiteSpace:n||"nowrap"}),E=d.offsetWidth),E=E>x);E&&(/[ \-]/.test(d.textContent||d.innerText)||
"ellipsis"===d.style.textOverflow)?(F(d,{width:x+"px",display:"block",whiteSpace:n||"normal"}),this.oldTextWidth=x,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;B!==this.cTT&&(n=a.fontMetrics(d.style.fontSize,d).b,!k(A)||A===(this.oldRotation||0)&&e===this.oldAlign||this.setSpanRotation(A,D,n),this.getSpanCorrection(!k(A)&&this.textPxLength||d.offsetWidth,n,D,A,e));F(d,{left:h+(this.xCorr||0)+"px",top:m+(this.yCorr||0)+"px"});this.cTT=B;this.oldRotation=A;this.oldAlign=e}}else this.alignOnAdd=
!0},setSpanRotation:function(a,d,l){var b={},g=this.renderer.getTransformKey();b[g]=b.transform="rotate("+a+"deg)";b[g+(q?"Origin":"-origin")]=b.transformOrigin=100*d+"% "+l+"px";F(this.element,b)},getSpanCorrection:function(a,d,l){this.xCorr=-a*l;this.yCorr=-d}});e(d.prototype,{getTransformKey:function(){return t&&!/Edge/.test(m.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":q?"MozTransform":m.opera?"-o-transform":""},html:function(b,d,l){var c=this.createElement("span"),g=c.element,
m=c.renderer,p=m.isSVG,D=function(a,b){["opacity","visibility"].forEach(function(c){a[c+"Setter"]=function(d,l,f){var r=a.div?a.div.style:b;h.prototype[c+"Setter"].call(this,d,l,f);r&&(r[l]=d)}});a.addedSetters=!0},A=a.charts[m.chartIndex],A=A&&A.styledMode;c.textSetter=function(a){a!==g.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;g.innerHTML=v(a,"");c.doTransform=!0};p&&D(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b=
"textAlign");c[b]=a;c.doTransform=!0};c.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};c.attr({text:b,x:Math.round(d),y:Math.round(l)}).css({position:"absolute"});A||c.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});g.style.whiteSpace="nowrap";c.css=c.htmlCss;p&&(c.add=function(a){var b,d=m.box.parentNode,l=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)l.push(a),a=a.parentGroup;l.reverse().forEach(function(a){function f(f,b){a[b]=
f;"translateX"===b?r.left=f+"px":r.top=f+"px";a.doTransform=!0}var r,g=C(a.element,"class");g&&(g={className:g});b=a.div=a.div||I("div",g,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);r=b.style;e(a,{classSetter:function(a){return function(f){this.element.setAttribute("class",f);a.className=f}}(b),on:function(){l[0].div&&c.on.apply({element:l[0].div},arguments);return a},translateXSetter:f,
translateYSetter:f});a.addedSetters||D(a)})}}else b=d;b.appendChild(g);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})});K(G,"parts/Time.js",[G["parts/Globals.js"]],function(a){var C=a.defined,I=a.extend,F=a.merge,k=a.pick,e=a.timeUnits,q=a.win;a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(a){var e=k(a&&a.useUTC,!0),v=this;this.options=a=F(!0,this.options||{},a);this.Date=a.Date||q.Date||Date;this.timezoneOffset=(this.useUTC=e)&&
a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(e&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,h){var d=h.getTime(),m=d-v.getTimezoneOffset(h);h.setTime(m);a=h["getUTC"+a]();h.setTime(d);return a},this.set=function(a,h,d){var m;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===h.getTimezoneOffset()%60)h["set"+a](d);else m=v.getTimezoneOffset(h),m=h.getTime()-m,h.setTime(m),h["setUTC"+a](d),a=v.getTimezoneOffset(h),
m=h.getTime()+a,h.setTime(m)}):e?(this.get=function(a,h){return h["getUTC"+a]()},this.set=function(a,h,d){return h["setUTC"+a](d)}):(this.get=function(a,h){return h["get"+a]()},this.set=function(a,h,d){return h["set"+a](d)})},makeTime:function(e,q,v,p,h,d){var m,b,g;this.useUTC?(m=this.Date.UTC.apply(0,arguments),b=this.getTimezoneOffset(m),m+=b,g=this.getTimezoneOffset(m),b!==g?m+=g-b:b-36E5!==this.getTimezoneOffset(m-36E5)||a.isSafari||(m-=36E5)):m=(new this.Date(e,q,k(v,1),k(p,0),k(h,0),k(d,0))).getTime();
return m},timezoneOffsetFunction:function(){var e=this,k=this.options,v=q.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(k.timezone){if(v)return function(a){return 6E4*-v.tz(a,k.timezone).utcOffset()};a.error(25)}return this.useUTC&&k.getTimezoneOffset?function(a){return 6E4*k.getTimezoneOffset(a)}:function(){return 6E4*(e.timezoneOffset||0)}},dateFormat:function(e,k,v){if(!a.defined(k)||isNaN(k))return a.defaultOptions.lang.invalidDate||"";e=a.pick(e,"%Y-%m-%d %H:%M:%S");
var p=this,h=new this.Date(k),d=this.get("Hours",h),m=this.get("Day",h),b=this.get("Date",h),g=this.get("Month",h),l=this.get("FullYear",h),c=a.defaultOptions.lang,w=c.weekdays,z=c.shortWeekdays,J=a.pad,h=a.extend({a:z?z[m]:w[m].substr(0,3),A:w[m],d:J(b),e:J(b,2," "),w:m,b:c.shortMonths[g],B:c.months[g],m:J(g+1),o:g+1,y:l.toString().substr(2,2),Y:l,H:J(d),k:d,I:J(d%12||12),l:d%12||12,M:J(p.get("Minutes",h)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:J(h.getSeconds()),L:J(Math.floor(k%1E3),3)},a.dateFormats);
a.objectEach(h,function(a,b){for(;-1!==e.indexOf("%"+b);)e=e.replace("%"+b,"function"===typeof a?a.call(p,k):a)});return v?e.substr(0,1).toUpperCase()+e.substr(1):e},resolveDTLFormat:function(e){return a.isObject(e,!0)?e:(e=a.splat(e),{main:e[0],from:e[1],to:e[2]})},getTimeTicks:function(a,q,v,p){var h=this,d=[],m,b={},g;m=new h.Date(q);var l=a.unitRange,c=a.count||1,w;p=k(p,1);if(C(q)){h.set("Milliseconds",m,l>=e.second?0:c*Math.floor(h.get("Milliseconds",m)/c));l>=e.second&&h.set("Seconds",m,l>=
e.minute?0:c*Math.floor(h.get("Seconds",m)/c));l>=e.minute&&h.set("Minutes",m,l>=e.hour?0:c*Math.floor(h.get("Minutes",m)/c));l>=e.hour&&h.set("Hours",m,l>=e.day?0:c*Math.floor(h.get("Hours",m)/c));l>=e.day&&h.set("Date",m,l>=e.month?1:Math.max(1,c*Math.floor(h.get("Date",m)/c)));l>=e.month&&(h.set("Month",m,l>=e.year?0:c*Math.floor(h.get("Month",m)/c)),g=h.get("FullYear",m));l>=e.year&&h.set("FullYear",m,g-g%c);l===e.week&&(g=h.get("Day",m),h.set("Date",m,h.get("Date",m)-g+p+(g<p?-7:0)));g=h.get("FullYear",
m);p=h.get("Month",m);var z=h.get("Date",m),J=h.get("Hours",m);q=m.getTime();h.variableTimezone&&(w=v-q>4*e.month||h.getTimezoneOffset(q)!==h.getTimezoneOffset(v));q=m.getTime();for(m=1;q<v;)d.push(q),q=l===e.year?h.makeTime(g+m*c,0):l===e.month?h.makeTime(g,p+m*c):!w||l!==e.day&&l!==e.week?w&&l===e.hour&&1<c?h.makeTime(g,p,z,J+m*c):q+l*c:h.makeTime(g,p,z+m*c*(l===e.day?1:7)),m++;d.push(q);l<=e.hour&&1E4>d.length&&d.forEach(function(a){0===a%18E5&&"000000000"===h.dateFormat("%H%M%S%L",a)&&(b[a]="day")})}d.info=
I(a,{higherRanks:b,totalRange:l*c});return d}}});K(G,"parts/Options.js",[G["parts/Globals.js"]],function(a){var C=a.color,I=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",
plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",
textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',backgroundColor:C("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,
style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},

credits:{enabled:!0,href:appweb,position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"10px"},

text:appweb}};a.setOptions=function(C){a.defaultOptions=I(!0,a.defaultOptions,C);a.time.update(I(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};
a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(I(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(C,k,e){return a.time.dateFormat(C,k,e)}});K(G,"parts/Tick.js",[G["parts/Globals.js"]],function(a){var C=a.correctFloat,I=a.defined,F=a.destroyObjectProperties,k=a.fireEvent,e=a.isNumber,q=a.merge,t=a.pick,u=a.deg2rad;a.Tick=function(a,e,h,d,m){this.axis=a;this.pos=e;this.type=h||"";this.isNewLabel=this.isNew=!0;this.parameters=m||{};this.tickmarkOffset=this.parameters.tickmarkOffset;
this.options=this.parameters.options;h||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var e=this,p=e.axis,h=p.options,d=p.chart,m=p.categories,b=p.names,g=e.pos,l=t(e.options&&e.options.labels,h.labels),c=p.tickPositions,w=g===c[0],z=g===c[c.length-1],m=this.parameters.category||(m?t(m[g],b[g],g):g),k=e.label,c=c.info,D,A,n,x;p.isDatetimeAxis&&c&&(A=d.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid&&c.higherRanks[g]||c.unitName]),D=A.main);e.isFirst=w;e.isLast=z;e.formatCtx={axis:p,
chart:d,isFirst:w,isLast:z,dateTimeLabelFormat:D,tickPositionInfo:c,value:p.isLog?C(p.lin2log(m)):m,pos:g};h=p.labelFormatter.call(e.formatCtx,this.formatCtx);if(x=A&&A.list)e.shortenLabel=function(){for(n=0;n<x.length;n++)if(k.attr({text:p.labelFormatter.call(a.extend(e.formatCtx,{dateTimeLabelFormat:x[n]}))}),k.getBBox().width<p.getSlotWidth(e)-2*t(l.padding,5))return;k.attr({text:""})};if(I(k))k&&k.textStr!==h&&(!k.textWidth||l.style&&l.style.width||k.styles.width||k.css({width:null}),k.attr({text:h}));
else{if(e.label=k=I(h)&&l.enabled?d.renderer.text(h,0,0,l.useHTML).add(p.labelGroup):null)d.styledMode||k.css(q(l.style)),k.textPxLength=k.getBBox().width;e.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var e=this.axis,h=e.options.labels,d=a.x,m=e.chart.chartWidth,b=e.chart.spacing,g=t(e.labelLeft,Math.min(e.pos,b[3])),b=t(e.labelRight,Math.max(e.isRadial?0:e.pos+e.len,m-b[1])),l=this.label,c=this.rotation,
w={left:0,center:.5,right:1}[e.labelAlign||l.attr("align")],z=l.getBBox().width,k=e.getSlotWidth(this),D=k,A=1,n,x={};if(c||"justify"!==t(h.overflow,"justify"))0>c&&d-w*z<g?n=Math.round(d/Math.cos(c*u)-g):0<c&&d+w*z>b&&(n=Math.round((m-d)/Math.cos(c*u)));else if(m=d+(1-w)*z,d-w*z<g?D=a.x+D*(1-w)-g:m>b&&(D=b-a.x+D*w,A=-1),D=Math.min(k,D),D<k&&"center"===e.labelAlign&&(a.x+=A*(k-D-w*(k-Math.min(z,D)))),z>D||e.autoRotation&&(l.styles||{}).width)n=D;n&&(this.shortenLabel?this.shortenLabel():(x.width=
Math.floor(n),(h.style||{}).textOverflow||(x.textOverflow="ellipsis"),l.css(x)))},getPosition:function(e,p,h,d){var m=this.axis,b=m.chart,g=d&&b.oldChartHeight||b.chartHeight;e={x:e?a.correctFloat(m.translate(p+h,null,null,d)+m.transB):m.left+m.offset+(m.opposite?(d&&b.oldChartWidth||b.chartWidth)-m.right-m.left:0),y:e?g-m.bottom+m.offset-(m.opposite?m.height:0):a.correctFloat(g-m.translate(p+h,null,null,d)-m.transB)};k(this,"afterGetPosition",{pos:e});return e},getLabelPosition:function(a,e,h,d,
m,b,g,l){var c=this.axis,w=c.transA,z=c.reversed,p=c.staggerLines,D=c.tickRotCorr||{x:0,y:0},A=m.y,n=d||c.reserveSpaceDefault?0:-c.labelOffset*("center"===c.labelAlign?.5:1),x={};I(A)||(A=0===c.side?h.rotation?-8:-h.getBBox().height:2===c.side?D.y+8:Math.cos(h.rotation*u)*(D.y-h.getBBox(!1,0).height/2));a=a+m.x+n+D.x-(b&&d?b*w*(z?-1:1):0);e=e+A-(b&&!d?b*w*(z?1:-1):0);p&&(h=g/(l||1)%p,c.opposite&&(h=p-h-1),e+=c.labelOffset/p*h);x.x=a;x.y=Math.round(e);k(this,"afterGetLabelPosition",{pos:x,tickmarkOffset:b,
index:g});return x},getMarkPath:function(a,e,h,d,m,b){return b.crispLine(["M",a,e,"L",a+(m?0:-h),e+(m?h:0)],d)},renderGridLine:function(a,e,h){var d=this.axis,m=d.options,b=this.gridLine,g={},l=this.pos,c=this.type,w=t(this.tickmarkOffset,d.tickmarkOffset),z=d.chart.renderer,p=c?c+"Grid":"grid",k=m[p+"LineWidth"],A=m[p+"LineColor"],m=m[p+"LineDashStyle"];b||(d.chart.styledMode||(g.stroke=A,g["stroke-width"]=k,m&&(g.dashstyle=m)),c||(g.zIndex=1),a&&(e=0),this.gridLine=b=z.path().attr(g).addClass("highcharts-"+
(c?c+"-":"")+"grid-line").add(d.gridGroup));if(b&&(h=d.getPlotLinePath(l+w,b.strokeWidth()*h,a,"pass")))b[a||this.isNew?"attr":"animate"]({d:h,opacity:e})},renderMark:function(a,e,h){var d=this.axis,m=d.options,b=d.chart.renderer,g=this.type,l=g?g+"Tick":"tick",c=d.tickSize(l),w=this.mark,z=!w,p=a.x;a=a.y;var k=t(m[l+"Width"],!g&&d.isXAxis?1:0),m=m[l+"Color"];c&&(d.opposite&&(c[0]=-c[0]),z&&(this.mark=w=b.path().addClass("highcharts-"+(g?g+"-":"")+"tick").add(d.axisGroup),d.chart.styledMode||w.attr({stroke:m,
"stroke-width":k})),w[z?"attr":"animate"]({d:this.getMarkPath(p,a,c[0],w.strokeWidth()*h,d.horiz,b),opacity:e}))},renderLabel:function(a,p,h,d){var m=this.axis,b=m.horiz,g=m.options,l=this.label,c=g.labels,w=c.step,m=t(this.tickmarkOffset,m.tickmarkOffset),z=!0,k=a.x;a=a.y;l&&e(k)&&(l.xy=a=this.getLabelPosition(k,a,l,b,c,m,d,w),this.isFirst&&!this.isLast&&!t(g.showFirstLabel,1)||this.isLast&&!this.isFirst&&!t(g.showLastLabel,1)?z=!1:!b||c.step||c.rotation||p||0===h||this.handleOverflow(a),w&&d%w&&
(z=!1),z&&e(a.y)?(a.opacity=h,l[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(l.attr("y",-9999),this.isNewLabel=!0))},render:function(e,p,h){var d=this.axis,m=d.horiz,b=this.pos,g=t(this.tickmarkOffset,d.tickmarkOffset),b=this.getPosition(m,b,g,p),g=b.x,l=b.y,d=m&&g===d.pos+d.len||!m&&l===d.pos?-1:1;h=t(h,1);this.isActive=!0;this.renderGridLine(p,h,d);this.renderMark(b,h,d);this.renderLabel(b,p,h,e);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){F(this,this.axis)}}});
K(G,"parts/Axis.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.animObject,F=a.arrayMax,k=a.arrayMin,e=a.color,q=a.correctFloat,t=a.defaultOptions,u=a.defined,v=a.deg2rad,p=a.destroyObjectProperties,h=a.extend,d=a.fireEvent,m=a.format,b=a.getMagnitude,g=a.isArray,l=a.isNumber,c=a.isString,w=a.merge,z=a.normalizeTickInterval,J=a.objectEach,D=a.pick,A=a.removeEvent,n=a.seriesTypes,x=a.splat,B=a.syncTimeout,E=a.Tick,H=function(){this.init.apply(this,arguments)};a.extend(H.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",
range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",
style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",
textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},init:function(a,b){var f=b.isX,r=this;r.chart=a;r.horiz=a.inverted&&!r.isZAxis?!f:f;r.isXAxis=f;r.coll=r.coll||(f?"xAxis":"yAxis");d(this,"init",{userOptions:b});
r.opposite=b.opposite;r.side=b.side||(r.horiz?r.opposite?0:2:r.opposite?1:3);r.setOptions(b);var c=this.options,l=c.type;r.labelFormatter=c.labels.formatter||r.defaultLabelFormatter;r.userOptions=b;r.minPixelPadding=0;r.reversed=c.reversed;r.visible=!1!==c.visible;r.zoomEnabled=!1!==c.zoomEnabled;r.hasNames="category"===l||!0===c.categories;r.categories=c.categories||r.hasNames;r.names||(r.names=[],r.names.keys={});r.plotLinesAndBandsGroups={};r.isLog="logarithmic"===l;r.isDatetimeAxis="datetime"===
l;r.positiveValuesOnly=r.isLog&&!r.allowNegativeLog;r.isLinked=u(c.linkedTo);r.ticks={};r.labelEdge=[];r.minorTicks={};r.plotLinesAndBands=[];r.alternateBands={};r.len=0;r.minRange=r.userMinRange=c.minRange||c.maxZoom;r.range=c.range;r.offset=c.offset||0;r.stacks={};r.oldStacks={};r.stacksTouched=0;r.max=null;r.min=null;r.crosshair=D(c.crosshair,x(a.options.tooltip.crosshairs)[f?0:1],!1);b=r.options.events;-1===a.axes.indexOf(r)&&(f?a.axes.splice(a.xAxis.length,0,r):a.axes.push(r),a[r.coll].push(r));
r.series=r.series||[];a.inverted&&!r.isZAxis&&f&&void 0===r.reversed&&(r.reversed=!0);J(b,function(a,f){C(r,f,a)});r.lin2log=c.linearToLogConverter||r.lin2log;r.isLog&&(r.val2lin=r.log2lin,r.lin2val=r.lin2log);d(this,"afterInit")},setOptions:function(a){this.options=w(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],w(t[this.coll],a));d(this,"afterSetOptions",
{userOptions:a})},defaultLabelFormatter:function(){var f=this.axis,b=this.value,c=f.chart.time,d=f.categories,l=this.dateTimeLabelFormat,g=t.lang,n=g.numericSymbols,g=g.numericSymbolMagnitude||1E3,e=n&&n.length,h,x=f.options.labels.format,f=f.isLog?Math.abs(b):f.tickInterval;if(x)h=m(x,this,c);else if(d)h=b;else if(l)h=c.dateFormat(l,b);else if(e&&1E3<=f)for(;e--&&void 0===h;)c=Math.pow(g,e+1),f>=c&&0===10*b%c&&null!==n[e]&&0!==b&&(h=a.numberFormat(b/c,-1)+n[e]);void 0===h&&(h=1E4<=Math.abs(b)?a.numberFormat(b,
-1):a.numberFormat(b,-1,void 0,""));return h},getSeriesExtremes:function(){var a=this,b=a.chart,c;d(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(f){if(f.visible||!b.options.chart.ignoreHiddenSeries){var r=f.options,d=r.threshold,g,n;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=d&&(d=null);if(a.isXAxis)r=f.xData,r.length&&(c=f.getXExtremes(r),g=c.min,n=c.max,
l(g)||g instanceof Date||(r=r.filter(l),c=f.getXExtremes(r),g=c.min,n=c.max),r.length&&(a.dataMin=Math.min(D(a.dataMin,g),g),a.dataMax=Math.max(D(a.dataMax,n),n)));else if(f.getExtremes(),n=f.dataMax,g=f.dataMin,u(g)&&u(n)&&(a.dataMin=Math.min(D(a.dataMin,g),g),a.dataMax=Math.max(D(a.dataMax,n),n)),u(d)&&(a.threshold=d),!r.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});d(this,"afterGetSeriesExtremes")},translate:function(a,b,c,d,g,n){var f=this.linkedParent||this,r=1,e=0,h=d?f.oldTransA:
f.transA;d=d?f.oldMin:f.min;var x=f.minPixelPadding;g=(f.isOrdinal||f.isBroken||f.isLog&&g)&&f.lin2val;h||(h=f.transA);c&&(r*=-1,e=f.len);f.reversed&&(r*=-1,e-=r*(f.sector||f.len));b?(a=(a*r+e-x)/h+d,g&&(a=f.lin2val(a))):(g&&(a=f.val2lin(a)),a=l(d)?r*(a-d)*h+e+r*x+(l(n)?h*n:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,g,
n){var f=this,r=f.chart,e=f.left,h=f.top,x,m,B,w,L=c&&r.oldChartHeight||r.chartHeight,z=c&&r.oldChartWidth||r.chartWidth,p,k=f.transB,A,E=function(a,f,b){if("pass"!==g&&a<f||a>b)g?a=Math.min(Math.max(f,a),b):p=!0;return a};A={value:a,lineWidth:b,old:c,force:g,translatedValue:n};d(this,"getPlotLinePath",A,function(d){n=D(n,f.translate(a,null,null,c));n=Math.min(Math.max(-1E5,n),1E5);x=B=Math.round(n+k);m=w=Math.round(L-n-k);l(n)?f.horiz?(m=h,w=L-f.bottom,x=B=E(x,e,e+f.width)):(x=e,B=z-f.right,m=w=
E(m,h,h+f.height)):(p=!0,g=!1);d.path=p&&!g?null:r.renderer.crispLine(["M",x,m,"L",B,w],b||1)});return A.path},getLinearTickPositions:function(a,b,c){var f,r=q(Math.floor(b/a)*a);c=q(Math.ceil(c/a)*a);var d=[],g;q(r+a)===r&&(g=20);if(this.single)return[b];for(b=r;b<=c;){d.push(b);b=q(b+a,g);if(b===f)break;f=b}return d},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?D(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=
this,b=a.options,c=a.tickPositions,d=a.minorTickInterval,g=[],l=a.pointRangePadding||0,n=a.min-l,l=a.max+l,e=l-n;if(e&&e/d<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(f,b,r){b&&g.push.apply(g,a.getLogTickPositions(d,r[b-1],r[b],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())g=g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),n,l,b.startOfWeek));else for(b=n+(c[0]-n)%d;b<=l&&b!==g[0];b+=d)g.push(b);0!==g.length&&a.trimTicks(g);return g},adjustForMinRange:function(){var a=
this.options,b=this.min,c=this.max,d,g,l,n,e,h,x,m;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(u(a.min)||u(a.max)?this.minRange=null:(this.series.forEach(function(a){h=a.xData;for(n=x=a.xIncrement?1:h.length-1;0<n;n--)if(e=h[n]-h[n-1],void 0===l||e<l)l=e}),this.minRange=Math.min(5*l,this.dataMax-this.dataMin)));c-b<this.minRange&&(g=this.dataMax-this.dataMin>=this.minRange,m=this.minRange,d=(m-c+b)/2,d=[b-d,D(a.min,b-d)],g&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=F(d),
c=[b+m,D(a.max,b+m)],g&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=k(c),c-b<m&&(d[0]=c-m,d[1]=D(a.min,c-m),b=F(d)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(f){var b=f.closestPointRange,r=f.visible||!f.chart.options.chart.ignoreHiddenSeries;!f.noSharedTooltip&&u(b)&&r&&(a=u(a)?Math.min(a,b):b)});return a},nameToX:function(a){var f=g(this.categories),b=f?this.categories:this.names,c=a.options.x,d;a.series.requireSorting=!1;
u(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():f?b.indexOf(a.name):D(b.keys[a.name],-1));-1===c?f||(d=b.length):d=c;void 0!==d&&(this.names[d]=a.name,this.names.keys[a.name]=d);return d},updateNames:function(){var a=this,b=this.names;0<b.length&&(Object.keys(b.keys).forEach(function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(f){f.xIncrement=null;if(!f.points||f.isDirtyData)a.max=Math.max(a.max,f.xData.length-1),f.processData(),
f.generatePoints();f.data.forEach(function(b,c){var r;b&&b.options&&void 0!==b.name&&(r=a.nameToX(b),void 0!==r&&r!==b.x&&(b.x=r,f.xData[c]=r))})}))},setAxisTranslation:function(a){var f=this,b=f.max-f.min,g=f.axisPointRange||0,l,e=0,h=0,x=f.linkedParent,m=!!f.categories,B=f.transA,w=f.isXAxis;if(w||m||g)l=f.getClosest(),x?(e=x.minPointOffset,h=x.pointRangePadding):f.series.forEach(function(a){var b=m?1:w?D(a.options.pointRange,l,0):f.axisPointRange||0,r=a.options.pointPlacement;g=Math.max(g,b);if(!f.single||
m)a=n.xrange&&a instanceof n.xrange?!w:w,e=Math.max(e,a&&c(r)?0:b/2),h=Math.max(h,a&&"on"===r?0:b)}),x=f.ordinalSlope&&l?f.ordinalSlope/l:1,f.minPointOffset=e*=x,f.pointRangePadding=h*=x,f.pointRange=Math.min(g,b),w&&(f.closestPointRange=l);a&&(f.oldTransA=B);f.translationSlope=f.transA=B=f.staticScale||f.len/(b+h||1);f.transB=f.horiz?f.left:f.bottom;f.minPixelPadding=B*e;d(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(f){var c=this,
g=c.chart,n=c.options,e=c.isLog,h=c.isDatetimeAxis,x=c.isXAxis,m=c.isLinked,B=n.maxPadding,w=n.minPadding,p,k=n.tickInterval,A=n.tickPixelInterval,E=c.categories,H=l(c.threshold)?c.threshold:null,J=c.softThreshold,t,v,C;h||E||m||this.getTickAmount();v=D(c.userMin,n.min);C=D(c.userMax,n.max);m?(c.linkedParent=g[c.coll][n.linkedTo],p=c.linkedParent.getExtremes(),c.min=D(p.min,p.dataMin),c.max=D(p.max,p.dataMax),n.type!==c.linkedParent.options.type&&a.error(11,1,g)):(!J&&u(H)&&(c.dataMin>=H?(p=H,w=0):
c.dataMax<=H&&(t=H,B=0)),c.min=D(v,p,c.dataMin),c.max=D(C,t,c.dataMax));e&&(c.positiveValuesOnly&&!f&&0>=Math.min(c.min,D(c.dataMin,c.min))&&a.error(10,1,g),c.min=q(c.log2lin(c.min),15),c.max=q(c.log2lin(c.max),15));c.range&&u(c.max)&&(c.userMin=c.min=v=Math.max(c.dataMin,c.minFromRange()),c.userMax=C=c.max,c.range=null);d(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(E||c.axisPointRange||c.usePercentage||m)&&u(c.min)&&u(c.max)&&(g=c.max-c.min)&&(!u(v)&&w&&(c.min-=
g*w),!u(C)&&B&&(c.max+=g*B));l(n.softMin)&&!l(c.userMin)&&n.softMin<c.min&&(c.min=v=n.softMin);l(n.softMax)&&!l(c.userMax)&&n.softMax>c.max&&(c.max=C=n.softMax);l(n.floor)&&(c.min=Math.min(Math.max(c.min,n.floor),Number.MAX_VALUE));l(n.ceiling)&&(c.max=Math.max(Math.min(c.max,n.ceiling),D(c.userMax,-Number.MAX_VALUE)));J&&u(c.dataMin)&&(H=H||0,!u(v)&&c.min<H&&c.dataMin>=H?c.min=c.options.minRange?Math.min(H,c.max-c.minRange):H:!u(C)&&c.max>H&&c.dataMax<=H&&(c.max=c.options.minRange?Math.max(H,c.min+
c.minRange):H));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:m&&!k&&A===c.linkedParent.options.tickPixelInterval?k=c.linkedParent.tickInterval:D(k,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,E?1:(c.max-c.min)*A/Math.max(c.len,A));x&&!f&&c.series.forEach(function(a){a.processData(c.min!==c.oldMin||c.max!==c.oldMax)});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&(c.tickInterval=c.postProcessTickInterval(c.tickInterval));
c.pointRange&&!k&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));f=D(n.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!k&&c.tickInterval<f&&(c.tickInterval=f);h||e||k||(c.tickInterval=z(c.tickInterval,null,b(c.tickInterval),D(n.allowDecimals,!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&9999>c.max)),!!this.tickAmount));this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions()},setTickPositions:function(){var f=this.options,c,b=f.tickPositions;c=this.getMinorTickInterval();
var g=f.tickPositioner,l=f.startOnTick,n=f.endOnTick;this.tickmarkOffset=this.categories&&"between"===f.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===c&&this.tickInterval?this.tickInterval/5:c;this.single=this.min===this.max&&u(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==f.allowDecimals);this.tickPositions=c=b&&b.slice();!c&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(c=[this.min,this.max],a.error(19,
!1,this.chart)):c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,f.units),this.min,this.max,f.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()],c[0]===c[1]&&(c.length=1)),this.tickPositions=c,g&&(g=g.apply(this,[this.min,this.max])))&&(this.tickPositions=c=g);this.paddedTicks=
c.slice(0);this.trimTicks(c,l,n);this.isLinked||(this.single&&2>c.length&&!this.categories&&(this.min-=.5,this.max+=.5),b||g||this.adjustTickAmount());d(this,"afterSetTickPositions")},trimTicks:function(a,c,b){var f=a[0],g=a[a.length-1],l=this.minPointOffset||0;d(this,"trimTicks");if(!this.isLinked){if(c&&-Infinity!==f)this.min=f;else for(;this.min-l>a[0];)a.shift();if(b)this.max=g;else for(;this.max+l<a[a.length-1];)a.pop();0===a.length&&u(f)&&!this.options.tickPositions&&a.push((g+f)/2)}},alignToOthers:function(){var a=
{},c,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||!1===b.startOnTick||!1===b.endOnTick||this.isLog||this.chart[this.coll].forEach(function(f){var b=f.options,b=[f.horiz?b.left:b.top,b.width,b.height,b.pane].join();f.series.length&&(a[b]?c=!0:a[b]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!u(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/
b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=c},adjustTickAmount:function(){var a=this.options,c=this.tickInterval,b=this.tickPositions,d=this.tickAmount,g=this.finalTickAmt,l=b&&b.length,n=D(this.threshold,this.softThreshold?0:null),e;if(this.hasData()){if(l<d){for(e=this.min;b.length<d;)b.length%2||e===n?b.push(q(b[b.length-1]+c)):b.unshift(q(b[0]-c));this.transA*=(l-1)/(d-1);this.min=a.startOnTick?b[0]:Math.min(this.min,b[0]);this.max=a.endOnTick?b[b.length-1]:Math.max(this.max,b[b.length-
1])}else l>d&&(this.tickInterval*=2,this.setTickPositions());if(u(g)){for(c=a=b.length;c--;)(3===g&&1===c%2||2>=g&&0<c&&c<a-1)&&b.splice(c,1);this.finalTickAmt=void 0}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||a.isDirty||a.xAxis.isDirty}),c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();(c=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||
this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();d(this,"afterSetScale")},setExtremes:function(a,c,b,g,l){var f=this,n=f.chart;b=D(b,!0);f.series.forEach(function(a){delete a.kdTree});l=h(l,{min:a,max:c});d(f,"setExtremes",l,function(){f.userMin=a;
f.userMax=c;f.eventArgs=l;b&&n.redraw(g)})},zoom:function(a,c){var f=this.dataMin,b=this.dataMax,g=this.options,l=Math.min(f,D(g.min,f)),n=Math.max(b,D(g.max,b));a={newMin:a,newMax:c};d(this,"zoom",a,function(a){var c=a.newMin,d=a.newMax;if(c!==this.min||d!==this.max)this.allowZoomOutside||(u(f)&&(c<l&&(c=l),c>n&&(c=n)),u(b)&&(d<l&&(d=l),d>n&&(d=n))),this.displayBtn=void 0!==c||void 0!==d,this.setExtremes(c,d,!1,void 0,{trigger:"zoom"});a.zoomed=!0});return a.zoomed},setAxisSize:function(){var f=
this.chart,c=this.options,b=c.offsets||[0,0,0,0],d=this.horiz,g=this.width=Math.round(a.relativeLength(D(c.width,f.plotWidth-b[3]+b[1]),f.plotWidth)),l=this.height=Math.round(a.relativeLength(D(c.height,f.plotHeight-b[0]+b[2]),f.plotHeight)),n=this.top=Math.round(a.relativeLength(D(c.top,f.plotTop+b[0]),f.plotHeight,f.plotTop)),c=this.left=Math.round(a.relativeLength(D(c.left,f.plotLeft+b[3]),f.plotWidth,f.plotLeft));this.bottom=f.chartHeight-l-n;this.right=f.chartWidth-g-c;this.len=Math.max(d?g:
l,0);this.pos=d?c:n},getExtremes:function(){var a=this.isLog;return{min:a?q(this.lin2log(this.min)):this.min,max:a?q(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var f=this.isLog,c=f?this.lin2log(this.min):this.min,f=f?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=c:Infinity===a?a=f:c>a?a=c:f<a&&(a=f);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var f=(D(a,0)-90*this.side+
720)%360;a={align:"center"};d(this,"autoLabelAlign",a,function(a){15<f&&165>f?a.align="right":195<f&&345>f&&(a.align="left")});return a.align},tickSize:function(a){var f=this.options,c=f[a+"Length"],b=D(f[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0),g;b&&c&&("inside"===f[a+"Position"]&&(c=-c),g=[c,b]);a={tickSize:g};d(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,b=this.tickInterval,d=b,g=this.len/(((this.categories?1:0)+this.max-this.min)/b),l,n=a.rotation,e=this.labelMetrics(),h,x=Number.MAX_VALUE,m,B=this.max-this.min,w=function(a){var f=a/(g||1),f=1<f?Math.ceil(f):1;f*b>B&&Infinity!==a&&Infinity!==g&&(f=Math.ceil(B/b));return q(f*b)};c?(m=!a.staggerLines&&!a.step&&(u(n)?[n]:g<D(a.autoRotationLimit,80)&&a.autoRotation))&&m.forEach(function(a){var f;
if(a===n||a&&-90<=a&&90>=a)h=w(Math.abs(e.h/Math.sin(v*a))),f=h+Math.abs(a/360),f<x&&(x=f,l=a,d=h)}):a.step||(d=w(e.h));this.autoRotation=m;this.labelRotation=D(l,n);return d},getSlotWidth:function(a){var f=this.chart,c=this.horiz,b=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),g=f.margin[3];return a&&a.slotWidth||c&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/d||!c&&(b.style&&parseInt(b.style.width,10)||g&&g-f.spacing[3]||.33*f.chartWidth)},renderUnsquish:function(){var a=
this.chart,b=a.renderer,d=this.tickPositions,g=this.ticks,l=this.options.labels,n=l&&l.style||{},e=this.horiz,h=this.getSlotWidth(),x=Math.max(1,Math.round(h-2*(l.padding||5))),m={},B=this.labelMetrics(),w=l.style&&l.style.textOverflow,z,p,k=0,A;c(l.rotation)||(m.rotation=l.rotation||0);d.forEach(function(a){(a=g[a])&&a.label&&a.label.textPxLength>k&&(k=a.label.textPxLength)});this.maxLabelLength=k;if(this.autoRotation)k>x&&k>B.h?m.rotation=this.labelRotation:this.labelRotation=0;else if(h&&(z=x,
!w))for(p="clip",x=d.length;!e&&x--;)if(A=d[x],A=g[A].label)A.styles&&"ellipsis"===A.styles.textOverflow?A.css({textOverflow:"clip"}):A.textPxLength>h&&A.css({width:h+"px"}),A.getBBox().height>this.len/d.length-(B.h-B.f)&&(A.specificTextOverflow="ellipsis");m.rotation&&(z=k>.5*a.chartHeight?.33*a.chartHeight:k,w||(p="ellipsis"));if(this.labelAlign=l.align||this.autoLabelAlign(this.labelRotation))m.align=this.labelAlign;d.forEach(function(a){var f=(a=g[a])&&a.label,c=n.width,b={};f&&(f.attr(m),a.shortenLabel?
a.shortenLabel():z&&!c&&"nowrap"!==n.whiteSpace&&(z<f.textPxLength||"SPAN"===f.element.tagName)?(b.width=z,w||(b.textOverflow=f.specificTextOverflow||p),f.css(b)):f.styles&&f.styles.width&&!b.width&&!c&&f.css({width:null}),delete f.specificTextOverflow,a.rotation=m.rotation)},this);this.tickRotCorr=b.rotCorr(B.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&u(this.min)&&u(this.max)},addTitle:function(a){var f=
this.chart.renderer,c=this.horiz,b=this.opposite,d=this.options.title,g,l=this.chart.styledMode;this.axisTitle||((g=d.textAlign)||(g=(c?{low:"left",middle:"center",high:"right"}:{low:b?"right":"left",middle:"center",high:b?"left":"right"})[d.align]),this.axisTitle=f.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:g}).addClass("highcharts-axis-title"),l||this.axisTitle.css(w(d.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);l||d.style.width||this.isRadial||
this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var f=this.ticks;f[a]?f[a].addLabel():f[a]=new E(this,a)},getOffset:function(){var a=this,c=a.chart,b=c.renderer,g=a.options,l=a.tickPositions,n=a.ticks,e=a.horiz,h=a.side,x=c.inverted&&!a.isZAxis?[1,0,3,2][h]:h,m,B,w=0,z,p=0,k=g.title,A=g.labels,E=0,H=c.axisOffset,c=c.clipOffset,q=[-1,1,1,-1][h],t=g.className,v=a.axisParent;m=a.hasData();a.showAxis=B=m||D(g.showEmpty,!0);a.staggerLines=a.horiz&&A.staggerLines;
a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:g.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(v),a.axisGroup=b.g("axis").attr({zIndex:g.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(v),a.labelGroup=b.g("axis-labels").attr({zIndex:A.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(t||"")).add(v));m||a.isLinked?(l.forEach(function(c,b){a.generateTick(c,b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===h||2===
h||{1:"left",3:"right"}[h]===a.labelAlign,D(A.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&l.forEach(function(a){E=Math.max(n[a].getLabelSize(),E)}),a.staggerLines&&(E*=a.staggerLines),a.labelOffset=E*(a.opposite?-1:1)):J(n,function(a,c){a.destroy();delete n[c]});k&&k.text&&!1!==k.enabled&&(a.addTitle(B),B&&!1!==k.reserveSpace&&(a.titleOffset=w=a.axisTitle.getBBox()[e?"height":"width"],z=k.offset,p=u(z)?0:D(k.margin,e?5:10)));a.renderLine();a.offset=q*D(g.offset,H[h]?H[h]+
(g.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===h?-a.labelMetrics().h:2===h?a.tickRotCorr.y:0;p=Math.abs(E)+p;E&&(p=p-b+q*(e?D(A.y,a.tickRotCorr.y+8*q):A.x));a.axisTitleMargin=D(z,p);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(n,l));e=this.tickSize("tick");H[h]=Math.max(H[h],a.axisTitleMargin+w+q*a.offset,p,l&&l.length&&e?e[0]+q*a.offset:0);g=g.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[x]=Math.max(c[x],g);d(this,"afterGetOffset")},getLinePath:function(a){var c=
this.chart,b=this.opposite,f=this.offset,d=this.horiz,g=this.left+(b?this.width:0)+f,f=c.chartHeight-this.bottom-(b?this.height:0)+f;b&&(a*=-1);return c.renderer.crispLine(["M",d?this.left:g,d?f:this.top,"L",d?c.chartWidth-this.right:g,d?f:c.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,
zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,g=this.len,l=this.options.title,n=a?c:b,e=this.opposite,h=this.offset,x=l.x||0,m=l.y||0,B=this.axisTitle,w=this.chart.renderer.fontMetrics(l.style&&l.style.fontSize,B),B=Math.max(B.getBBox(null,0).height-w.h-1,0),g={low:n+(a?0:g),middle:n+g/2,high:n+(a?g:0)}[l.align],c=(a?b+this.height:c)+(a?1:-1)*(e?-1:1)*this.axisTitleMargin+[-B,B,w.f,-B][this.side],a={x:a?g+x:c+(e?this.width:0)+h+x,y:a?c+m-(e?this.height:0)+h:g+m};
d(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var c=this.chart.hasRendered&&l(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new E(this,a,"minor"));c&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,c){var b=this.isLinked,f=this.ticks,d=this.chart.hasRendered&&l(this.oldMin);if(!b||a>=this.min&&a<=this.max)f[a]||(f[a]=new E(this,a)),d&&f[a].isNew&&f[a].render(c,!0,-1),f[a].render(c)},render:function(){var c=this,b=c.chart,g=c.options,
n=c.isLog,e=c.isLinked,h=c.tickPositions,x=c.axisTitle,m=c.ticks,w=c.minorTicks,z=c.alternateBands,p=g.stackLabels,k=g.alternateGridColor,A=c.tickmarkOffset,H=c.axisLine,D=c.showAxis,q=I(b.renderer.globalAnimation),t,v;c.labelEdge.length=0;c.overlap=!1;[m,w,z].forEach(function(a){J(a,function(a){a.isActive=!1})});if(c.hasData()||e)c.minorTickInterval&&!c.categories&&c.getMinorTickPositions().forEach(function(a){c.renderMinorTick(a)}),h.length&&(h.forEach(function(a,b){c.renderTick(a,b)}),A&&(0===
c.min||c.single)&&(m[-1]||(m[-1]=new E(c,-1,null,!0)),m[-1].render(-1))),k&&h.forEach(function(f,d){v=void 0!==h[d+1]?h[d+1]+A:c.max-A;0===d%2&&f<c.max&&v<=c.max+(b.polar?-A:A)&&(z[f]||(z[f]=new a.PlotLineOrBand(c)),t=f+A,z[f].options={from:n?c.lin2log(t):t,to:n?c.lin2log(v):v,color:k},z[f].render(),z[f].isActive=!0)}),c._addedPlotLB||((g.plotLines||[]).concat(g.plotBands||[]).forEach(function(a){c.addPlotBandOrLine(a)}),c._addedPlotLB=!0);[m,w,z].forEach(function(a){var c,f=[],d=q.duration;J(a,function(a,
c){a.isActive||(a.render(c,!1,0),a.isActive=!1,f.push(c))});B(function(){for(c=f.length;c--;)a[f[c]]&&!a[f[c]].isActive&&(a[f[c]].destroy(),delete a[f[c]])},a!==z&&b.hasRendered&&d?d:0)});H&&(H[H.isPlaced?"animate":"attr"]({d:this.getLinePath(H.strokeWidth())}),H.isPlaced=!0,H[D?"show":"hide"](!0));x&&D&&(g=c.getTitlePosition(),l(g.y)?(x[x.isNew?"attr":"animate"](g),x.isNew=!1):(x.attr("y",-9999),x.isNew=!0));p&&p.enabled&&c.renderStackTotals();c.isDirty=!1;d(this,"afterRender")},redraw:function(){this.visible&&
(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,b=c.stacks,f=c.plotLinesAndBands,g;d(this,"destroy",{keepEvents:a});a||A(c);J(b,function(a,c){p(a);b[c]=null});[c.ticks,c.minorTicks,c.alternateBands].forEach(function(a){p(a)});if(f)for(a=f.length;a--;)f[a].destroy();"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){c[a]&&
(c[a]=c[a].destroy())});for(g in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[g]=c.plotLinesAndBandsGroups[g].destroy();J(c,function(a,b){-1===c.keepProps.indexOf(b)&&delete c[b]})},drawCrosshair:function(a,c){var b,f=this.crosshair,g=D(f.snap,!0),l,n=this.cross;d(this,"drawCrosshair",{e:a,point:c});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(u(c)||!g)){g?u(c)&&(l=D(c.crosshairPos,this.isXAxis?c.plotX:this.len-c.plotY)):l=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);
u(l)&&(b=this.getPlotLinePath(c&&(this.isXAxis?c.x:D(c.stackY,c.y)),null,null,null,l)||null);if(!u(b)){this.hideCrosshair();return}g=this.categories&&!this.isRadial;n||(this.cross=n=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(g?"category ":"thin ")+f.className).attr({zIndex:D(f.zIndex,2)}).add(),this.chart.styledMode||(n.attr({stroke:f.color||(g?e("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":D(f.width,1)}).css({"pointer-events":"none"}),f.dashStyle&&
n.attr({dashstyle:f.dashStyle})));n.show().attr({d:b});g&&!f.width&&n.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();d(this,"afterDrawCrosshair",{e:a,point:c})},hideCrosshair:function(){this.cross&&this.cross.hide();d(this,"afterHideCrosshair")}});return a.Axis=H});K(G,"parts/DateTimeAxis.js",[G["parts/Globals.js"]],function(a){var C=a.Axis,I=a.getMagnitude,F=a.normalizeTickInterval,k=a.timeUnits;C.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,
arguments)};C.prototype.normalizeTimeTickInterval=function(a,q){var e=q||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];q=e[e.length-1];var u=k[q[0]],v=q[1],p;for(p=0;p<e.length&&!(q=e[p],u=k[q[0]],v=q[1],e[p+1]&&a<=(u*v[v.length-1]+k[e[p+1][0]])/2);p++);u===k.year&&a<5*u&&(v=[1,2,5]);a=F(a/u,v,"year"===q[0]?Math.max(I(a/u),1):1);return{unitRange:u,
count:a,unitName:q[0]}}});K(G,"parts/LogarithmicAxis.js",[G["parts/Globals.js"]],function(a){var C=a.Axis,I=a.getMagnitude,F=a.normalizeTickInterval,k=a.pick;C.prototype.getLogTickPositions=function(a,q,t,u){var e=this.options,p=this.len,h=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),h=this.getLinearTickPositions(a,q,t);else if(.08<=a)for(var p=Math.floor(q),d,m,b,g,l,e=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];p<t+1&&!l;p++)for(m=e.length,d=0;d<m&&!l;d++)b=this.log2lin(this.lin2log(p)*
e[d]),b>q&&(!u||g<=t)&&void 0!==g&&h.push(g),g>t&&(l=!0),g=b;else q=this.lin2log(q),t=this.lin2log(t),a=u?this.getMinorTickInterval():e.tickInterval,a=k("auto"===a?null:a,this._minorAutoInterval,e.tickPixelInterval/(u?5:1)*(t-q)/((u?p/this.tickPositions.length:p)||1)),a=F(a,null,I(a)),h=this.getLinearTickPositions(a,q,t).map(this.log2lin),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return h};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,
a)}});K(G,"parts/PlotLineOrBand.js",[G["parts/Globals.js"],G["parts/Axis.js"]],function(a,C){var I=a.arrayMax,F=a.arrayMin,k=a.defined,e=a.destroyObjectProperties,q=a.erase,t=a.merge,u=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){a.fireEvent(this,"render");var e=this,p=e.axis,h=p.horiz,d=e.options,m=d.label,b=e.label,g=d.to,l=d.from,c=d.value,w=k(l)&&k(g),z=k(c),q=e.svgElem,D=!q,A=[],n=d.color,x=u(d.zIndex,0),B=d.events,
A={"class":"highcharts-plot-"+(w?"band ":"line ")+(d.className||"")},E={},H=p.chart.renderer,f=w?"bands":"lines";p.isLog&&(l=p.log2lin(l),g=p.log2lin(g),c=p.log2lin(c));p.chart.styledMode||(z?(A.stroke=n,A["stroke-width"]=d.width,d.dashStyle&&(A.dashstyle=d.dashStyle)):w&&(n&&(A.fill=n),d.borderWidth&&(A.stroke=d.borderColor,A["stroke-width"]=d.borderWidth)));E.zIndex=x;f+="-"+x;(n=p.plotLinesAndBandsGroups[f])||(p.plotLinesAndBandsGroups[f]=n=H.g("plot-"+f).attr(E).add());D&&(e.svgElem=q=H.path().attr(A).add(n));
if(z)A=p.getPlotLinePath(c,q.strokeWidth());else if(w)A=p.getPlotBandPath(l,g,d);else return;(D||!q.d)&&A&&A.length?(q.attr({d:A}),B&&a.objectEach(B,function(a,c){q.on(c,function(a){B[c].apply(e,[a])})})):q&&(A?(q.show(!0),q.animate({d:A})):q.d&&(q.hide(),b&&(e.label=b=b.destroy())));m&&k(m.text)&&A&&A.length&&0<p.width&&0<p.height&&!A.isFlat?(m=t({align:h&&w&&"center",x:h?!w&&4:10,verticalAlign:!h&&w&&"middle",y:h?w?16:10:w?6:-4,rotation:h&&!w&&90},m),this.renderLabel(m,A,w,x)):b&&b.hide();return e},
renderLabel:function(a,e,h,d){var m=this.label,b=this.axis.chart.renderer;m||(m={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(h?"band":"line")+"-label "+(a.className||"")},m.zIndex=d,this.label=m=b.text(a.text,0,0,a.useHTML).attr(m).add(),this.axis.chart.styledMode||m.css(a.style));d=e.xBounds||[e[1],e[4],h?e[6]:e[1]];e=e.yBounds||[e[2],e[5],h?e[7]:e[2]];h=F(d);b=F(e);m.align(a,!1,{x:h,y:b,width:I(d)-h,height:I(e)-b});m.show(!0)},destroy:function(){q(this.axis.plotLinesAndBands,
this);delete this.axis;e(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,e){var h=this.getPlotLinePath(e,null,null,!0),d=this.getPlotLinePath(a,null,null,!0),m=[],b=this.horiz,g=1,l;a=a<this.min&&e<this.min||a>this.max&&e>this.max;if(d&&h)for(a&&(l=d.toString()===h.toString(),g=0),a=0;a<d.length;a+=6)b&&h[a+1]===d[a+1]?(h[a+1]+=g,h[a+4]+=g):b||h[a+2]!==d[a+2]||(h[a+2]+=g,h[a+5]+=g),m.push("M",d[a+1],d[a+2],"L",d[a+4],d[a+5],h[a+4],h[a+5],h[a+1],h[a+2],"z"),m.isFlat=l;return m},addPlotBand:function(a){return this.addPlotBandOrLine(a,
"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(e,p){var h=(new a.PlotLineOrBand(this,e)).render(),d=this.userOptions;h&&(p&&(d[p]=d[p]||[],d[p].push(e)),this.plotLinesAndBands.push(h));return h},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,h=this.options,d=this.userOptions,m=e.length;m--;)e[m].id===a&&e[m].destroy();[h.plotLines||[],d.plotLines||[],h.plotBands||[],d.plotBands||[]].forEach(function(b){for(m=b.length;m--;)b[m].id===
a&&q(b,b[m])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})});K(G,"parts/Tooltip.js",[G["parts/Globals.js"]],function(a){var C=a.doc,I=a.extend,F=a.format,k=a.isNumber,e=a.merge,q=a.pick,t=a.splat,u=a.syncTimeout,v=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;
this.shared=e.shared||this.split;this.outside=e.outside&&!this.split},cleanSplit:function(a){this.chart.series.forEach(function(e){var d=e&&e.tt;d&&(!d.isActive||a?e.tt=d.destroy():d.isActive=!1)})},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},
{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode","in":"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"})},getLabel:function(){var e=this,h=this.chart.renderer,d=this.chart.styledMode,m=this.options,b,g;this.label||(this.outside&&(this.container=b=a.doc.createElement("div"),b.className="highcharts-tooltip-container",a.css(b,{position:"absolute",top:"1px",pointerEvents:m.style&&
m.style.pointerEvents}),a.doc.body.appendChild(b),this.renderer=h=new a.Renderer(b,0,0)),this.split?this.label=h.g("tooltip"):(this.label=h.label("",0,0,m.shape||"callout",null,null,m.useHTML,null,"tooltip").attr({padding:m.padding,r:m.borderRadius}),d||this.label.attr({fill:m.backgroundColor,"stroke-width":m.borderWidth}).css(m.style).shadow(m.shadow)),d&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index)),this.outside&&(g={x:this.label.xSetter,y:this.label.ySetter},
this.label.xSetter=function(a,c){g[c].call(this.label,e.distance);b.style.left=a+"px"},this.label.ySetter=function(a,c){g[c].call(this.label,e.distance);b.style.top=a+"px"}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();e(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,e(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&
(this.renderer=this.renderer.destroy(),a.discardElement(this.container));a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout)},move:function(e,h,d,m){var b=this,g=b.now,l=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(e-g.x)||1<Math.abs(h-g.y)),c=b.followPointer||1<b.len;I(g,{x:l?(2*g.x+e)/3:e,y:l?(g.y+h)/2:h,anchorX:c?void 0:l?(2*g.anchorX+d)/3:d,anchorY:c?void 0:l?(g.anchorY+m)/2:m});b.getLabel().attr(g);l&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&
b.move(e,h,d,m)},32))},hide:function(e){var h=this;a.clearTimeout(this.hideTimer);e=q(e,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){h.getLabel()[e?"fadeOut":"hide"]();h.isHidden=!0},e))},getAnchor:function(a,e){var d=this.chart,h=d.pointer,b=d.inverted,g=d.plotTop,l=d.plotLeft,c=0,w=0,z,k;a=t(a);this.followPointer&&e?(void 0===e.chartX&&(e=h.normalize(e)),a=[e.chartX-d.plotLeft,e.chartY-g]):a[0].tooltipPos?a=a[0].tooltipPos:(a.forEach(function(a){z=a.series.yAxis;k=a.series.xAxis;
c+=a.plotX+(!b&&k?k.left-l:0);w+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!b&&z?z.top-g:0)}),c/=a.length,w/=a.length,a=[b?d.plotWidth-w:c,this.shared&&!b&&1<a.length&&e?e.chartY-g:b?d.plotHeight-c:w]);return a.map(Math.round)},getPosition:function(a,e,d){var h=this.chart,b=this.distance,g={},l=h.inverted&&d.h||0,c,w=this.outside,z=w?C.documentElement.clientWidth-2*b:h.chartWidth,k=w?Math.max(C.body.scrollHeight,C.documentElement.scrollHeight,C.body.offsetHeight,C.documentElement.offsetHeight,
C.documentElement.clientHeight):h.chartHeight,p=h.pointer.chartPosition,A=["y",k,e,(w?p.top-b:0)+d.plotY+h.plotTop,w?0:h.plotTop,w?k:h.plotTop+h.plotHeight],n=["x",z,a,(w?p.left-b:0)+d.plotX+h.plotLeft,w?0:h.plotLeft,w?z:h.plotLeft+h.plotWidth],x=!this.followPointer&&q(d.ttBelow,!h.inverted===!!d.negative),B=function(a,c,f,d,n,e){var h=f<d-b,m=d+b+f<c,B=d-b-f;d+=b;if(x&&m)g[a]=d;else if(!x&&h)g[a]=B;else if(h)g[a]=Math.min(e-f,0>B-l?B:B-l);else if(m)g[a]=Math.max(n,d+l+f>c?d:d+l);else return!1},E=
function(a,c,f,d){var l;d<b||d>c-b?l=!1:g[a]=d<f/2?1:d>c-f/2?c-f-2:d-f/2;return l},H=function(a){var b=A;A=n;n=b;c=a},f=function(){!1!==B.apply(0,A)?!1!==E.apply(0,n)||c||(H(!0),f()):c?g.x=g.y=0:(H(!0),f())};(h.inverted||1<this.len)&&H();f();return g},defaultFormatter:function(a){var e=this.points||t(this),d;d=[a.tooltipFooterHeaderFormatter(e[0])];d=d.concat(a.bodyFormatter(e));d.push(a.tooltipFooterHeaderFormatter(e[0],!0));return d},refresh:function(e,h){var d=this.chart,m=this.options,b,g=e,l,
c={},w,z=[];w=m.formatter||this.defaultFormatter;var c=this.shared,k=d.styledMode,p=[];m.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=t(g)[0].series.tooltipOptions.followPointer,l=this.getAnchor(g,h),h=l[0],b=l[1],!c||g.series&&g.series.noSharedTooltip?c=g.getLabelConfig():(p=d.pointer.getActiveSeries(g),d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===p.indexOf(a))&&a.setState("inactive",!0)}),g.forEach(function(a){a.setState("hover");z.push(a.getLabelConfig())}),
c={x:g[0].category,y:g[0].y},c.points=z,g=g[0]),this.len=z.length,w=w.call(c,this),c=g.series,this.distance=q(c.tooltipOptions.distance,16),!1===w?this.hide():(d=this.getLabel(),this.isHidden&&d.attr({opacity:1}).show(),this.split?this.renderSplit(w,t(e)):(m.style.width&&!k||d.css({width:this.chart.spacingBox.width}),d.attr({text:w&&w.join?w.join(""):w}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+q(g.colorIndex,c.colorIndex)),k||d.attr({stroke:m.borderColor||g.color||c.color||
"#666666"}),this.updatePosition({plotX:h,plotY:b,negative:g.negative,ttBelow:g.ttBelow,h:l[2]||0})),this.isHidden=!1),a.fireEvent(this,"refresh"))},renderSplit:function(e,h){var d=this,m=[],b=this.chart,g=b.renderer,l=!0,c=this.options,w=0,z,k=this.getLabel(),p=b.plotTop;a.isString(e)&&(e=[!1,e]);e.slice(0,h.length+1).forEach(function(a,n){if(!1!==a&&""!==a){n=h[n-1]||{isHeader:!0,plotX:h[0].plotX,plotY:b.plotHeight};var e=n.series||d,B=e.tt,A=n.series||{},H="highcharts-color-"+q(n.colorIndex,A.colorIndex,
"none");B||(B={padding:c.padding,r:c.borderRadius},b.styledMode||(B.fill=c.backgroundColor,B.stroke=c.borderColor||n.color||A.color||"#333333",B["stroke-width"]=c.borderWidth),e.tt=B=g.label(null,null,null,(n.isHeader?c.headerShape:c.shape)||"callout",null,null,c.useHTML).addClass("highcharts-tooltip-box "+H).attr(B).add(k));B.isActive=!0;B.attr({text:a});b.styledMode||B.css(c.style).shadow(c.shadow);a=B.getBBox();A=a.width+B.strokeWidth();n.isHeader?(w=a.height,b.xAxis[0].opposite&&(z=!0,p-=w),A=
Math.max(0,Math.min(n.plotX+b.plotLeft-A/2,b.chartWidth+(b.scrollablePixels?b.scrollablePixels-b.marginRight:0)-A))):A=n.plotX+b.plotLeft-q(c.distance,16)-A;0>A&&(l=!1);a=(n.series&&n.series.yAxis&&n.series.yAxis.pos)+(n.plotY||0);a-=p;n.isHeader&&(a=z?-w:b.plotHeight+w);m.push({target:a,rank:n.isHeader?1:0,size:e.tt.getBBox().height+1,point:n,x:A,tt:B})}});this.cleanSplit();c.positioner&&m.forEach(function(a){var b=c.positioner.call(d,a.tt.getBBox().width,a.size,a.point);a.x=b.x;a.align=0;a.target=
b.y;a.rank=q(b.rank,a.rank)});a.distribute(m,b.plotHeight+w);m.forEach(function(a){var g=a.point,e=g.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:l||g.isHeader||c.positioner?a.x:g.plotX+b.plotLeft+d.distance,y:a.pos+p,anchorX:g.isHeader?g.plotX+b.plotLeft:g.plotX+e.xAxis.pos,anchorY:g.isHeader?b.plotTop+b.plotHeight/2:g.plotY+e.yAxis.pos})})},updatePosition:function(a){var e=this.chart,d=this.getLabel(),m=(this.options.positioner||this.getPosition).call(this,d.width,d.height,a),
b=a.plotX+e.plotLeft;a=a.plotY+e.plotTop;var g;this.outside&&(g=(this.options.borderWidth||0)+2*this.distance,this.renderer.setSize(d.width+g,d.height+g,!1),b+=e.pointer.chartPosition.left-m.x,a+=e.pointer.chartPosition.top-m.y);this.move(Math.round(m.x),Math.round(m.y||0),b,a)},getDateFormat:function(a,e,d,m){var b=this.chart.time,g=b.dateFormat("%m-%d %H:%M:%S.%L",e),l,c,h={millisecond:15,second:12,minute:9,hour:6,day:3},z="millisecond";for(c in v){if(a===v.week&&+b.dateFormat("%w",e)===d&&"00:00:00.000"===
g.substr(6)){c="week";break}if(v[c]>a){c=z;break}if(h[c]&&g.substr(h[c])!=="01-01 00:00:00.000".substr(h[c]))break;"week"!==c&&(z=c)}c&&(l=b.resolveDTLFormat(m[c]).main);return l},getXDateFormat:function(a,e,d){e=e.dateTimeLabelFormats;var h=d&&d.closestPointRange;return(h?this.getDateFormat(h,a.x,d.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(e,h){var d=h?"footer":"header",m=e.series,b=m.tooltipOptions,g=b.xDateFormat,l=m.xAxis,c=l&&"datetime"===l.options.type&&k(e.key),
w=b[d+"Format"];h={isFooter:h,labelConfig:e};a.fireEvent(this,"headerFormatter",h,function(a){c&&!g&&(g=this.getXDateFormat(e,b,l));c&&g&&(e.point&&e.point.tooltipDateKeys||["key"]).forEach(function(a){w=w.replace("{point."+a+"}","{point."+a+":"+g+"}")});m.chart.styledMode&&(w=this.styledModeFormat(w));a.text=F(w,{point:e,series:m},this.chart.time)});return h.text},bodyFormatter:function(a){return a.map(function(a){var d=a.series.tooltipOptions;return(d[(a.point.formatPrefix||"point")+"Formatter"]||
a.point.tooltipFormatter).call(a.point,d[(a.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(a){return a.replace('style\x3d"font-size: 10px"','class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class\x3d"highcharts-color-{$1.colorIndex}"')}}});K(G,"parts/Pointer.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.attr,F=a.charts,k=a.color,e=a.css,q=a.defined,t=a.extend,u=a.find,v=a.fireEvent,p=a.isNumber,h=a.isObject,d=a.offset,m=a.pick,
b=a.splat,g=a.Tooltip;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=c.chart.events&&!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};g&&(a.tooltip=new g(a,c.tooltip),this.followTouchMove=m(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var c=this.chart,b=c.options.chart,d=b.zoomType||"",c=c.inverted;/touch/.test(a.type)&&(d=m(b.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=
d=/y/.test(d);this.zoomHor=a&&!c||d&&c;this.zoomVert=d&&!c||a&&c;this.hasZoom=a||d},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;c||(this.chartPosition=c=d(this.chart.container));return t(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var c={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(b){c[b.isXAxis?"xAxis":"yAxis"].push({axis:b,value:b.toValue(a[b.horiz?"chartX":"chartY"])})});return c},
findNearestKDPoint:function(a,c,b){var d;a.forEach(function(a){var g=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(b,g);if((g=h(a,!0))&&!(g=!h(d,!0)))var g=d.distX-a.distX,l=d.dist-a.dist,e=(a.series.group&&a.series.group.zIndex)-(d.series.group&&d.series.group.zIndex),g=0<(0!==g&&c?g:0!==l?l:0!==e?e:d.series.index>a.series.index?-1:1);g&&(d=a)});return d},getPointFromEvent:function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c},getChartCoordinatesFromPoint:function(a,
c){var b=a.series,d=b.xAxis,b=b.yAxis,g=m(a.clientX,a.plotX),e=a.shapeArgs;if(d&&b)return c?{chartX:d.len+d.pos-g,chartY:b.len+b.pos-a.plotY}:{chartX:g+d.pos,chartY:a.plotY+b.pos};if(e&&e.x&&e.y)return{chartX:e.x,chartY:e.y}},getHoverData:function(a,c,b,d,g,e){var l,n=[];d=!(!d||!a);var x=c&&!c.stickyTracking?[c]:b.filter(function(a){return a.visible&&!(!g&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(l=d?a:this.findNearestKDPoint(x,g,e))&&l.series;l&&(g&&!c.noSharedTooltip?
(x=b.filter(function(a){return a.visible&&!(!g&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),x.forEach(function(a){var c=u(a.points,function(a){return a.x===l.x&&!a.isNull});h(c)&&(a.chart.isBoosting&&(c=a.getPoint(c)),n.push(c))})):n.push(l));return{hoverPoint:l,hoverSeries:c,hoverPoints:n}},runPointActions:function(b,c){var d=this.chart,g=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,e=g?g.shared:!1,l=c||d.hoverPoint,h=l&&l.series||d.hoverSeries,h=this.getHoverData(l,
h,d.series,"touchmove"!==b.type&&(!!c||h&&h.directTouch&&this.isDirectTouch),e,b),n=[],x,l=h.hoverPoint;x=h.hoverPoints;c=(h=h.hoverSeries)&&h.tooltipOptions.followPointer;e=e&&h&&!h.noSharedTooltip;if(l&&(l!==d.hoverPoint||g&&g.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===x.indexOf(a)&&a.setState()});if(d.hoverSeries!==h)h.onMouseOver();n=this.getActiveSeries(x);d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===n.indexOf(a))&&a.setState("inactive",!0)});(x||[]).forEach(function(a){a.setState("hover")});
d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!l.series)return;l.firePointEvent("mouseOver");d.hoverPoints=x;d.hoverPoint=l;g&&g.refresh(e?x:l,b)}else c&&g&&!g.isHidden&&(l=g.getAnchor([{}],b),g.updatePosition({plotX:l[0],plotY:l[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(d.container.ownerDocument,"mousemove",function(c){var b=F[a.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(c)}));d.axes.forEach(function(c){var d=m(c.crosshair.snap,!0),g=d?a.find(x,function(a){return a.series[c.coll]===
c}):void 0;g||!d?c.drawCrosshair(b,g):c.hideCrosshair()})},getActiveSeries:function(a){var c=[],b;(a||[]).forEach(function(a){b=a.series;c.push(b);b.linkedParent&&c.push(b.linkedParent);b.linkedSeries&&(c=c.concat(b.linkedSeries));b.navigatorSeries&&c.push(b.navigatorSeries)});return c},reset:function(a,c){var d=this.chart,g=d.hoverSeries,e=d.hoverPoint,l=d.hoverPoints,h=d.tooltip,n=h&&h.shared?l:e;a&&n&&b(n).forEach(function(c){c.series.isCartesian&&void 0===c.plotX&&(a=!1)});if(a)h&&n&&b(n).length&&
(h.refresh(n),h.shared&&l?l.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):e&&(e.setState(e.state,!0),d.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();l&&l.forEach(function(a){a.setState()});if(g)g.onMouseOut();h&&h.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());d.axes.forEach(function(a){a.hideCrosshair()});
this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,d;b.series.forEach(function(g){d=a||g.getPlotBox();g.xAxis&&g.xAxis.zoomEnabled&&g.group&&(g.group.attr(d),g.markerGroup&&(g.markerGroup.attr(d),g.markerGroup.clip(c?b.clipRect:null)),g.dataLabelsGroup&&g.dataLabelsGroup.attr(d))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY},
drag:function(a){var c=this.chart,b=c.options.chart,d=a.chartX,g=a.chartY,e=this.zoomHor,l=this.zoomVert,n=c.plotLeft,h=c.plotTop,m=c.plotWidth,E=c.plotHeight,p,f=this.selectionMarker,r=this.mouseDownX,q=this.mouseDownY,t=b.panKey&&a[b.panKey+"Key"];f&&f.touch||(d<n?d=n:d>n+m&&(d=n+m),g<h?g=h:g>h+E&&(g=h+E),this.hasDragged=Math.sqrt(Math.pow(r-d,2)+Math.pow(q-g,2)),10<this.hasDragged&&(p=c.isInsidePlot(r-n,q-h),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&p&&!t&&!f&&(this.selectionMarker=f=c.renderer.rect(n,
h,e?1:m,l?1:E,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),c.styledMode||f.attr({fill:b.selectionMarkerFill||k("#335cad").setOpacity(.25).get()})),f&&e&&(d-=r,f.attr({width:Math.abs(d),x:(0<d?0:d)+r})),f&&l&&(d=g-q,f.attr({height:Math.abs(d),y:(0<d?0:d)+q})),p&&!f&&b.panning&&c.pan(a,b.panning)))},drop:function(a){var c=this,b=this.chart,d=this.hasPinched;if(this.selectionMarker){var g={originalEvent:a,xAxis:[],yAxis:[]},l=this.selectionMarker,h=l.attr?l.attr("x"):l.x,n=l.attr?
l.attr("y"):l.y,m=l.attr?l.attr("width"):l.width,B=l.attr?l.attr("height"):l.height,k;if(this.hasDragged||d)b.axes.forEach(function(b){if(b.zoomEnabled&&q(b.min)&&(d||c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var f=b.horiz,e="touchend"===a.type?b.minPixelPadding:0,l=b.toValue((f?h:n)+e),f=b.toValue((f?h+m:n+B)-e);g[b.coll].push({axis:b,min:Math.min(l,f),max:Math.max(l,f)});k=!0}}),k&&v(b,"selection",g,function(a){b.zoom(t(a,d?{animation:!1}:null))});p(b.index)&&(this.selectionMarker=this.selectionMarker.destroy());
d&&this.scaleGroups()}b&&p(b.index)&&(e(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var c=this.chart,b=this.chartPosition;a=this.normalize(a,b);!b||
this.inClass(a.target,"highcharts-tracker")||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=F[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;q(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.preventDefault||(b.returnValue=!1);"mousedown"===c.mouseIsDown&&
this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=I(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,
"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()},onContainerClick:function(a){var c=this.chart,b=c.hoverPoint,d=c.plotLeft,g=c.plotTop;a=this.normalize(a);c.cancelClick||(b&&this.inClass(a.target,"highcharts-tracker")?(v(b.series,"click",t(a,{point:b})),c.hoverPoint&&b.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-d,a.chartY-g)&&v(c,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container,d=c.ownerDocument;c.onmousedown=
function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=C(c,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=C(d,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=C(d,"touchend",b.onDocumentTouchEnd)))},
destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,d){b[d]=null})}}});K(G,"parts/TouchPointer.js",[G["parts/Globals.js"]],function(a){var C=a.charts,I=a.extend,F=a.noop,k=a.pick;I(a.Pointer.prototype,{pinchTranslate:function(a,
k,t,u,v,p){this.zoomHor&&this.pinchTranslateDirection(!0,a,k,t,u,v,p);this.zoomVert&&this.pinchTranslateDirection(!1,a,k,t,u,v,p)},pinchTranslateDirection:function(a,k,t,u,v,p,h,d){var e=this.chart,b=a?"x":"y",g=a?"X":"Y",l="chart"+g,c=a?"width":"height",w=e["plot"+(a?"Left":"Top")],z,q,D=d||1,A=e.inverted,n=e.bounds[a?"h":"v"],x=1===k.length,B=k[0][l],E=t[0][l],H=!x&&k[1][l],f=!x&&t[1][l],r;t=function(){!x&&20<Math.abs(B-H)&&(D=d||Math.abs(E-f)/Math.abs(B-H));q=(w-E)/D+B;z=e["plot"+(a?"Width":"Height")]/
D};t();k=q;k<n.min?(k=n.min,r=!0):k+z>n.max&&(k=n.max-z,r=!0);r?(E-=.8*(E-h[b][0]),x||(f-=.8*(f-h[b][1])),t()):h[b]=[E,f];A||(p[b]=q-w,p[c]=z);p=A?1/D:D;v[c]=z;v[b]=k;u[A?a?"scaleY":"scaleX":"scale"+g]=D;u["translate"+g]=p*w+(E-p*B)},pinch:function(a){var e=this,t=e.chart,u=e.pinchDown,v=a.touches,p=v.length,h=e.lastValidTouch,d=e.hasZoom,m=e.selectionMarker,b={},g=1===p&&(e.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||e.runChartClick),l={};1<p&&(e.initiated=!0);d&&e.initiated&&!g&&
a.preventDefault();[].map.call(v,function(a){return e.normalize(a)});"touchstart"===a.type?([].forEach.call(v,function(a,b){u[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[u[0].chartX,u[1]&&u[1].chartX],h.y=[u[0].chartY,u[1]&&u[1].chartY],t.axes.forEach(function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(k(a.options.min,a.dataMin)),g=a.toPixels(k(a.options.max,a.dataMax)),e=Math.max(d,g);b.min=Math.min(a.pos,Math.min(d,g)-c);b.max=Math.max(a.pos+a.len,e+c)}}),
e.res=!0):e.followTouchMove&&1===p?this.runPointActions(e.normalize(a)):u.length&&(m||(e.selectionMarker=m=I({destroy:F,touch:!0},t.plotBox)),e.pinchTranslate(u,v,b,m,l,h),e.hasPinched=d,e.scaleGroups(b,l),e.res&&(e.res=!1,this.reset(!1,0)))},touch:function(e,q){var t=this.chart,u,v;if(t.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=t.index;1===e.touches.length?(e=this.normalize(e),(v=t.isInsidePlot(e.chartX-t.plotLeft,e.chartY-t.plotTop))&&!t.openMenu?
(q&&this.runPointActions(e),"touchmove"===e.type&&(q=this.pinchDown,u=q[0]?4<=Math.sqrt(Math.pow(q[0].chartX-e.chartX,2)+Math.pow(q[0].chartY-e.chartY,2)):!1),k(u,!0)&&this.pinch(e)):q&&this.reset()):2===e.touches.length&&this.pinch(e)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(e){C[a.hoverChartIndex]&&C[a.hoverChartIndex].pointer.drop(e)}})});K(G,"parts/MSPointer.js",[G["parts/Globals.js"]],function(a){var C=
a.addEvent,I=a.charts,F=a.css,k=a.doc,e=a.extend,q=a.noop,t=a.Pointer,u=a.removeEvent,v=a.win,p=a.wrap;if(!a.hasTouch&&(v.PointerEvent||v.MSPointerEvent)){var h={},d=!!v.PointerEvent,m=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(h,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,d,c,e){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!I[a.hoverChartIndex]||(e(b),e=I[a.hoverChartIndex].pointer,e[d]({type:c,target:b.currentTarget,
preventDefault:q,touches:m()}))};e(t.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){h[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){h[a.pointerId]={pageX:a.pageX,pageY:a.pageY};h[a.pointerId].target||(h[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,"onDocumentTouchEnd","touchend",function(a){delete h[a.pointerId]})},
batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(k,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});p(t.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&F(b.container,{"-ms-touch-action":"none","touch-action":"none"})});p(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});
p(t.prototype,"destroy",function(a){this.batchMSEvents(u);a.call(this)})}});K(G,"parts/Legend.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.css,F=a.discardElement,k=a.defined,e=a.fireEvent,q=a.isFirefox,t=a.marginNames,u=a.merge,v=a.pick,p=a.setAnimation,h=a.stableSort,d=a.win,m=a.wrap;a.Legend=function(a,d){this.init(a,d)};a.Legend.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),
this.proximate?this.unchartrender=C(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(a){var b=v(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=u(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=v(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&
!this.chart.inverted},update:function(a,d){var b=this.chart;this.setOptions(u(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;v(d,!0)&&b.redraw();e(this,"afterUpdate")},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var b=this.options,c=a.legendItem,g=a.legendLine,h=a.legendSymbol,m=this.itemHiddenStyle.color,b=d?b.itemStyle.color:m,k=d?a.color||m:m,p=a.options&&a.options.marker,n={fill:k};c&&c.css({fill:b,
color:b});g&&g.attr({stroke:k});h&&(p&&h.isMarker&&(n=a.pointAttribs(),d||(n.stroke=n.fill=m)),h.attr(n))}e(this,"afterColorizeItem",{item:a,visible:d})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,c=a._legendItemPos,e=c[0],c=c[1],h=a.checkbox;if((a=a.legendGroup)&&a.element)a[k(a.translateY)?"animate":"attr"]({translateX:b?e:this.legendWidth-e-2*d-4,
translateY:c});h&&(h.x=e,h.y=c)},destroyItem:function(a){var b=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(a,b)});"clipRect up down pager nav box title group".split(" ").forEach(a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,
d,e=this.clipHeight||this.legendHeight,c=this.titleHeight;a&&(d=a.translateY,this.allItems.forEach(function(b){var g=b.checkbox,h;g&&(h=d+c+g.y+(this.scrollOffset||0)+3,I(g,{left:a.translateX+b.checkboxOffset+g.x-20+"px",top:h+"px",display:this.proximate||h>d-6&&h<d+e-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,d=this.padding,e=a.title,c=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),
this.chart.styledMode||this.title.css(e.style),this.title.add(this.group)),e.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),c=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c},setText:function(b){var d=this.options;b.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,b,this.chart.time):d.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,d=b.renderer,c=this.options,e=this.symbolWidth,h=c.symbolPadding,
m=this.itemStyle,k=this.itemHiddenStyle,p="horizontal"===c.layout?v(c.itemDistance,20):0,n=!c.rtl,x=a.legendItem,B=!a.series,E=!B&&a.series.drawLegendSymbol?a.series:a,H=E.options,H=this.createCheckboxForItem&&H&&H.showCheckbox,p=e+h+p+(H?20:0),f=c.useHTML,r=a.options.className;x||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+E.type+"-series highcharts-color-"+a.colorIndex+(r?" "+r:"")+(B?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=x=d.text("",
n?e+h:-h,this.baseline||0,f),b.styledMode||x.css(u(a.visible?m:k)),x.attr({align:n?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=d.fontMetrics(b.styledMode?12:m.fontSize,x),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,x.attr("y",this.baseline)),this.symbolHeight=c.symbolHeight||this.fontMetrics.f,E.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,x,f));H&&!a.checkbox&&this.createCheckboxForItem(a);this.colorizeItem(a,a.visible);!b.styledMode&&
m.width||x.css({width:(c.itemWidth||this.widthOption||b.spacingBox.width)-p});this.setText(a);b=x.getBBox();a.itemWidth=a.checkboxOffset=c.itemWidth||a.legendItemWidth||b.width+p;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(a){var b=this.options,d=this.padding,c="horizontal"===b.layout,e=a.itemHeight,h=b.itemMarginBottom||0,m=this.itemMarginTop,
k=c?v(b.itemDistance,20):0,p=this.maxLegendWidth,b=b.alignColumns&&this.totalItemWidth>p?this.maxItemWidth:a.itemWidth;c&&this.itemX-d+b>p&&(this.itemX=d,this.lastLineHeight&&(this.itemY+=m+this.lastLineHeight+h),this.lastLineHeight=0);this.lastItemY=m+this.itemY+h;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];c?this.itemX+=b:(this.itemY+=m+e+h,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((c?this.itemX-d-(a.checkbox?0:k):b)+d,this.offsetWidth)},
getAllItems:function(){var a=[];this.chart.series.forEach(function(b){var d=b&&b.options;b&&v(d.showInLegend,k(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===d.legendType?b.data:b)))});e(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,d){var b=this.chart,c=this.options,g=this.getAlignment(),
e=void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0;g&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(h,l){h.test(g)&&!k(a[l])&&(b[t[l]]=Math.max(b[t[l]],b.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*c[l%2?"x":"y"]+v(c.margin,12)+d[l]+(0===l&&(0===b.titleOffset?0:e))))})},proximatePositions:function(){var b=this.chart,d=[],e="left"===this.options.align;this.allItems.forEach(function(c){var g,h;h=e;var l;c.yAxis&&c.points&&(c.xAxis.options.reversed&&
(h=!h),g=a.find(h?c.points:c.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),h=c.legendGroup.getBBox().height,l=c.yAxis.top-b.plotTop,c.visible?(g=g?g.plotY:c.yAxis.height,g+=l-.3*h):g=l+c.yAxis.height,d.push({target:g,size:h,item:c}))},this);a.distribute(d,b.plotHeight);d.forEach(function(a){a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos})},render:function(){var b=this.chart,d=b.renderer,l=this.group,c,m,k,p=this.box,q=this.options,A=this.padding;this.itemX=A;this.itemY=
this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=a.relativeLength(q.width,b.spacingBox.width-A);c=b.spacingBox.width-2*A-q.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(c/=2);this.maxLegendWidth=this.widthOption||c;l||(this.group=l=d.g("legend").attr({zIndex:7}).add(),this.contentGroup=d.g().attr({zIndex:1}).add(l),this.scrollGroup=d.g().add(this.contentGroup));this.renderTitle();c=this.getAllItems();h(c,function(a,b){return(a.options&&a.options.legendIndex||0)-
(b.options&&b.options.legendIndex||0)});q.reversed&&c.reverse();this.allItems=c;this.display=m=!!c.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;c.forEach(this.renderItem,this);c.forEach(this.layoutItem,this);c=(this.widthOption||this.offsetWidth)+A;k=this.lastItemY+this.lastLineHeight+this.titleHeight;k=this.handleOverflow(k);k+=A;p||(this.box=p=d.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(l),p.isNew=!0);b.styledMode||p.attr({stroke:q.borderColor,
"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<c&&0<k&&(p[p.isNew?"attr":"animate"](p.crisp.call({},{x:0,y:0,width:c,height:k},p.strokeWidth())),p.isNew=!1);p[m?"show":"hide"]();b.styledMode&&"none"===l.getStyle("display")&&(c=k=0);this.legendWidth=c;this.legendHeight=k;m&&(d=b.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(p=d.y+b.titleOffset,d=u(d,{y:0<b.titleOffset?p+=b.options.title.margin:p})),l.align(u(q,{width:c,height:k,verticalAlign:this.proximate?
"top":q.verticalAlign}),!0,d));this.proximate||this.positionItems();e(this,"afterRender")},handleOverflow:function(a){var b=this,d=this.chart,c=d.renderer,e=this.options,h=e.y,m=this.padding,h=d.spacingBox.height+("top"===e.verticalAlign?-h:h)-m,k=e.maxHeight,p,n=this.clipRect,x=e.navigation,B=v(x.animation,!0),E=x.arrowSize||12,H=this.nav,f=this.pages,r,q=this.allItems,t=function(a){"number"===typeof a?n.attr({height:a}):n&&(b.clipRect=n.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=
a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto")},L=function(a){b[a]=c.circle(0,0,1.3*E).translate(E/2,E/2).add(H);d.styledMode||b[a].attr("fill","rgba(0,0,0,0.0001)");return b[a]};"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(h/=2);k&&(h=Math.min(h,k));f.length=0;a>h&&!1!==x.enabled?(this.clipHeight=p=Math.max(h-20-this.titleHeight-m,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,q.forEach(function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),
e=f.length;if(!e||c-f[e-1]>p&&(r||c)!==f[e-1])f.push(r||c),e++;a.pageIx=e-1;r&&(q[b-1].pageIx=e-1);b===q.length-1&&c+d-f[e-1]>p&&c!==r&&(f.push(c),a.pageIx=e);c!==r&&(r=c)}),n||(n=b.clipRect=c.clipRect(0,m,9999,0),b.contentGroup.clip(n)),t(p),H||(this.nav=H=c.g().attr({zIndex:1}).add(this.group),this.up=c.symbol("triangle",0,0,E,E).add(H),L("upTracker").on("click",function(){b.scroll(-1,B)}),this.pager=c.text("",15,10).addClass("highcharts-legend-navigation"),d.styledMode||this.pager.css(x.style),
this.pager.add(H),this.down=c.symbol("triangle-down",0,0,E,E).add(H),L("downTracker").on("click",function(){b.scroll(1,B)})),b.scroll(0),a=h):H&&(t(),this.nav=H.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var b=this.pages,c=b.length,e=this.currentPage+a;a=this.clipHeight;var g=this.options.navigation,h=this.pager,m=this.padding;e>c&&(e=c);0<e&&(void 0!==d&&p(d,this.chart),this.nav.attr({translateX:m,translateY:a+this.padding+7+this.titleHeight,
visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),h.attr({text:e+"/"+c}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":e===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),this.chart.styledMode||(this.up.attr({fill:1===e?g.inactiveColor:g.activeColor}),this.upTracker.css({cursor:1===e?"default":"pointer"}),this.down.attr({fill:e===
c?g.inactiveColor:g.activeColor}),this.downTracker.css({cursor:e===c?"default":"pointer"})),this.scrollOffset=-b[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=e,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,d){var b=a.symbolHeight,c=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-b)/2:0,a.baseline-b+1,c?b:a.symbolWidth,b,v(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup)},
drawLineMarker:function(a){var b=this.options,d=b.marker,c=a.symbolWidth,e=a.symbolHeight,h=e/2,m=this.chart.renderer,k=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var p={};this.chart.styledMode||(p={"stroke-width":b.lineWidth||0},b.dashStyle&&(p.dashstyle=b.dashStyle));this.legendLine=m.path(["M",0,a,"L",c,a]).addClass("highcharts-graph").attr(p).add(k);d&&!1!==d.enabled&&c&&(b=Math.min(v(d.radius,h),h),0===this.symbol.indexOf("url")&&(d=u(d,{width:e,height:e}),b=0),this.legendSymbol=
d=m.symbol(this.symbol,c/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(k),d.isMarker=!0)}};(/Trident\/7\.0/.test(d.navigator&&d.navigator.userAgent)||q)&&m(a.Legend.prototype,"positionItem",function(a,d){var b=this,c=function(){d._legendItemPos&&a.call(b,d)};c();b.bubbleLegend||setTimeout(c)})});K(G,"parts/Chart.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.animate,F=a.animObject,k=a.attr,e=a.doc,q=a.Axis,t=a.createElement,u=a.defaultOptions,v=a.discardElement,p=a.charts,h=a.css,
d=a.defined,m=a.extend,b=a.find,g=a.fireEvent,l=a.isNumber,c=a.isObject,w=a.isString,z=a.Legend,J=a.marginNames,D=a.merge,A=a.objectEach,n=a.Pointer,x=a.pick,B=a.pInt,E=a.removeEvent,H=a.seriesTypes,f=a.splat,r=a.syncTimeout,N=a.win,M=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new M(a,b,c)};m(M.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(w(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,
d){var f,e=b.series,n=b.plotOptions||{};g(this,"init",{args:arguments},function(){b.series=null;f=D(u,b);A(f.plotOptions,function(a,b){c(a)&&(a.tooltip=n[b]&&D(n[b].tooltip)||void 0)});f.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;f.series=b.series=e;this.userOptions=b;var h=f.chart,m=h.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=d;this.isResizing=0;this.options=f;this.axes=[];this.series=[];this.time=b.time&&
Object.keys(b.time).length?new a.Time(b.time):a.time;this.styledMode=h.styledMode;this.hasCartesianSeries=h.showAxes;var l=this;l.index=p.length;p.push(l);a.chartCount++;m&&A(m,function(a,b){C(l,b,a)});l.xAxis=[];l.yAxis=[];l.pointCount=l.colorCounter=l.symbolCounter=0;g(l,"afterInit");l.firstRender()})},initSeries:function(b){var c=this.options.chart;(c=H[b.type||c.type||c.defaultSeriesType])||a.error(17,!0,this);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||
0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){g(this,"beforeRedraw");var c=this.axes,d=this.series,f=this.pointer,e=this.legend,n=this.userOptions.legend,h=this.isDirtyLegend,l,x,r=this.hasCartesianSeries,B=this.isDirtyBox,k,p=this.renderer,E=p.isHidden(),w=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);E&&this.temporaryDisplay();this.layOutTitles();
for(b=d.length;b--;)if(k=d[b],k.options.stacking&&(l=!0,k.isDirty)){x=!0;break}if(x)for(b=d.length;b--;)k=d[b],k.options.stacking&&(k.isDirty=!0);d.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),h=!0):n&&(n.labelFormatter||n.labelFormat)&&(h=!0));a.isDirtyData&&g(a,"updatedData")});h&&e&&e.options.enabled&&(e.render(),this.isDirtyLegend=!1);l&&this.getStacks();r&&c.forEach(function(a){a.updateNames();a.setScale()});this.getMargins();r&&(c.forEach(function(a){a.isDirty&&
(B=!0)}),c.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,w.push(function(){g(a,"afterSetExtremes",m(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(B||l)&&a.redraw()}));B&&this.drawChartBox();g(this,"predraw");d.forEach(function(a){(B||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});f&&f.reset(!0);p.draw();g(this,"redraw");g(this,"render");E&&this.temporaryDisplay(!0);w.forEach(function(a){a.call()})},get:function(a){function c(b){return b.id===a||b.options&&b.options.id===
a}var d,f=this.series,e;d=b(this.axes,c)||b(this.series,c);for(e=0;!d&&e<f.length;e++)d=b(f[e].points||[],c);return d},getAxes:function(){var a=this,b=this.options,c=b.xAxis=f(b.xAxis||{}),b=b.yAxis=f(b.yAxis||{});g(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});b.forEach(function(a,b){a.index=b});c.concat(b).forEach(function(b){new q(a,b)});g(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=a.concat((b[b.hasGroupedData?"points":"data"]||
[]).filter(function(a){return a.selected}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,b,c){var d=this,f=d.options,e=d.styledMode,g;g=f.title=D(!e&&{style:{color:"#333333",fontSize:f.isStock?"16px":"18px"}},f.title,a);f=f.subtitle=D(!e&&{style:{color:"#666666"}},f.subtitle,b);[["title",a,g],["subtitle",b,f]].forEach(function(a,b){var c=a[0],f=d[c],g=a[1];a=a[2];f&&g&&(d[c]=f=f.destroy());a&&!f&&(d[c]=d.renderer.text(a.text,
0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},e||d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,f=this.spacingBox;["title","subtitle"].forEach(function(a){var c=this[a],e=this.options[a];a="title"===a?-3:e.verticalAlign?0:b+2;var g;c&&(this.styledMode||(g=e.style.fontSize),g=d.fontMetrics(g,c).b,c.css({width:(e.width||f.width+e.widthAdjust)+"px"}).align(m({y:a+g},e),
!1,"spacingBox"),e.floating||e.verticalAlign||(b=Math.ceil(b+c.getBBox(e.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&x(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,f=this.renderTo;d(c)||(this.containerWidth=a.getStyle(f,"width"));d(b)||(this.containerHeight=a.getStyle(f,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);
this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(e.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){e.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,e.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,
height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===e.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,f,n;b=this.renderTo;var x=a.uniqueKey(),r,E;b||(this.renderTo=b=d.renderTo);w(b)&&(this.renderTo=b=e.getElementById(b));b||a.error(13,
!0,this);f=B(k(b,"data-highcharts-chart"));l(f)&&p[f]&&p[f].hasRendered&&p[f].destroy();k(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();f=this.chartWidth;n=this.chartHeight;h(b,{overflow:"hidden"});this.styledMode||(r=m({position:"relative",overflow:"hidden",width:f+"px",height:n+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style));this.container=b=t("div",{id:x},r,
b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||a.Renderer)(b,f,n,null,d.forExport,c.exporting&&c.exporting.allowHTML,this.styledMode);this.setClassName(d.className);if(this.styledMode)for(E in c.defs)this.renderer.definition(c.defs[E]);else this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index;g(this,"afterGetContainer")},getMargins:function(a){var b=this.spacing,c=this.margin,f=this.titleOffset;this.resetMargins();f&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,f+
this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);g(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&a.axes.forEach(function(a){a.visible&&a.getOffset()});J.forEach(function(f,e){d(c[e])||(a[f]+=b[e])});a.setChartSize()},reflow:function(b){var c=this,f=c.options.chart,g=c.renderTo,n=d(f.width)&&d(f.height),h=f.width||a.getStyle(g,"width"),f=f.height||a.getStyle(g,
"height"),g=b?b.target:N;if(!n&&!c.isPrinting&&h&&f&&(g===N||g===e)){if(h!==c.containerWidth||f!==c.containerHeight)a.clearTimeout(c.reflowTimeout),c.reflowTimeout=r(function(){c.container&&c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=h;c.containerHeight=f}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=C(N,"resize",function(a){b.reflow(a)}),C(this,"destroy",this.unbindReflow))},setSize:function(b,
c,d){var f=this,e=f.renderer,n;f.isResizing+=1;a.setAnimation(d,f);f.oldChartHeight=f.chartHeight;f.oldChartWidth=f.chartWidth;void 0!==b&&(f.options.chart.width=b);void 0!==c&&(f.options.chart.height=c);f.getChartSize();f.styledMode||(n=e.globalAnimation,(n?I:h)(f.container,{width:f.chartWidth+"px",height:f.chartHeight+"px"},n));f.setChartSize(!0);e.setSize(f.chartWidth,f.chartHeight,d);f.axes.forEach(function(a){a.isDirty=!0;a.setScale()});f.isDirtyLegend=!0;f.isDirtyBox=!0;f.layOutTitles();f.getMargins();
f.redraw(d);f.oldChartHeight=null;g(f,"resize");r(function(){f&&g(f,"endResize",null,function(){--f.isResizing})},F(n).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,f=this.chartWidth,d=this.chartHeight,e=this.options.chart,n=this.spacing,h=this.clipOffset,l,m,x,r;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=m=Math.round(this.plotTop);this.plotWidth=x=Math.max(0,Math.round(f-l-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(d-m-this.marginBottom));this.plotSizeX=
b?r:x;this.plotSizeY=b?x:r;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:n[3],y:n[0],width:f-n[3]-n[1],height:d-n[0]-n[2]};this.plotBox=c.plotBox={x:l,y:m,width:x,height:r};f=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(f,h[3])/2);c=Math.ceil(Math.max(f,h[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(f,h[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,h[2])/2-c))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});
g(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){g(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(f){var d=b[f],e=c(d)?d:[d,d,d,d];["Top","Right","Bottom","Left"].forEach(function(c,d){a[f][d]=x(b[f+c],e[d])})});J.forEach(function(b,c){a[b]=x(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,f=this.chartHeight,d=this.chartBackground,
e=this.plotBackground,n=this.plotBorder,h,l=this.styledMode,m=this.plotBGImage,x=a.backgroundColor,r=a.plotBackgroundColor,B=a.plotBackgroundImage,k,p=this.plotLeft,E=this.plotTop,w=this.plotWidth,H=this.plotHeight,z=this.plotBox,A=this.clipRect,q=this.clipBox,t="animate";d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),t="attr");if(l)h=k=d.strokeWidth();else{h=a.borderWidth||0;k=h+(a.shadow?8:0);x={fill:x||"none"};if(h||d["stroke-width"])x.stroke=a.borderColor,x["stroke-width"]=
h;d.attr(x).shadow(a.shadow)}d[t]({x:k/2,y:k/2,width:c-k-h%2,height:f-k-h%2,r:a.borderRadius});t="animate";e||(t="attr",this.plotBackground=e=b.rect().addClass("highcharts-plot-background").add());e[t](z);l||(e.attr({fill:r||"none"}).shadow(a.plotShadow),B&&(m?m.animate(z):this.plotBGImage=b.image(B,p,E,w,H).add()));A?A.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);t="animate";n||(t="attr",this.plotBorder=n=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
l||n.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});n[t](n.crisp({x:p,y:E,width:w,height:H},-n.strokeWidth()));this.isDirtyBox=!1;g(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,c,f=a.options.series,d,e;["inverted","angular","polar"].forEach(function(g){c=H[b.type||b.defaultSeriesType];e=b[g]||c&&c.prototype[g];for(d=f&&f.length;!e&&d--;)(c=H[f[d].type])&&c.prototype[g]&&(e=!0);a[g]=e})},linkSeries:function(){var a=this,b=a.series;
b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var c=b.options.linkedTo;w(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=x(b.options.visible,c.options.visible,b.visible))});g(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(c){var f=m(b.style,c.style),
d=B(f.left)+a.plotLeft,e=B(f.top)+a.plotTop+12;delete f.left;delete f.top;a.renderer.text(c.html,d,e).attr({zIndex:2}).css(f).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,f=0,d,e,g;this.setTitle();this.legend=new z(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return f=21,!0});d=this.plotHeight=Math.max(this.plotHeight-f,0);a.forEach(function(a){a.setScale()});
this.getAxisMargins();e=1.1<c/this.plotWidth;g=1.05<d/this.plotHeight;if(e||g)a.forEach(function(a){(a.horiz&&e||!a.horiz&&g)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&a.forEach(function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=D(!0,
this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,f=b.series,d=b.container,e,n=d&&d.parentNode;g(b,"destroy");
b.renderer.forExport?a.erase(p,b):p[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");E(b);for(e=c.length;e--;)c[e]=c[e].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(e=f.length;e--;)f[e]=f[e].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});
d&&(d.innerHTML="",E(d),n&&v(d));A(b,function(a,c){delete b[c]})},firstRender:function(){var b=this,c=b.options;if(!b.isReadyToRender||b.isReadyToRender()){b.getContainer();b.resetMargins();b.setChartSize();b.propFromSeries();b.getAxes();(a.isArray(c.series)?c.series:[]).forEach(function(a){b.initSeries(a)});b.linkSeries();g(b,"beforeRender");n&&(b.pointer=new n(b,c));b.render();if(!b.renderer.imgCount&&b.onload)b.onload();b.temporaryDisplay(!0)}},onload:function(){[this.callback].concat(this.callbacks).forEach(function(a){a&&
void 0!==this.index&&a.apply(this,[this])},this);g(this,"load");g(this,"render");d(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})});K(G,"parts/ScrollablePlotArea.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.Chart;C(I,"afterSetChartSize",function(C){var k=this.options.chart.scrollablePlotArea;(k=k&&k.minWidth)&&!this.renderer.forExport&&(this.scrollablePixels=k=Math.max(0,k-this.chartWidth))&&(this.plotWidth+=k,this.clipBox.width+=k,C.skipAxes||this.axes.forEach(function(e){1===
e.side?e.getPlotLinePath=function(){var k=this.right,t;this.right=k-e.chart.scrollablePixels;t=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=k;return t}:(e.setAxisSize(),e.setAxisTranslation())}))});C(I,"render",function(){this.scrollablePixels?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});I.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},
this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};I.prototype.moveFixedElements=function(){var a=this.container,k=this.fixedRenderer;[this.inverted?".highcharts-xaxis":".highcharts-yaxis",this.inverted?".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-reset-zoom",
".highcharts-subtitle",".highcharts-title",".highcharts-legend-checkbox"].forEach(function(e){[].forEach.call(a.querySelectorAll(e),function(a){(a.namespaceURI===k.SVG_NS?k.box:k.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})})};I.prototype.applyFixed=function(){var F,k=!this.fixedDiv,e=this.options.chart.scrollablePlotArea;k&&(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,
this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=F=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=F.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(a.pick(e.opacity,.85)).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),C(this,"afterShowResetZoom",this.moveFixedElements));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);F=this.chartWidth+this.scrollablePixels;a.stop(this.container);
this.container.style.width=F+"px";this.renderer.boxWrapper.attr({width:F,height:this.chartHeight,viewBox:[0,0,F,this.chartHeight].join(" ")});this.chartBackground.attr({width:F});k&&e.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixels*e.scrollPositionX);e=this.axisOffset;k=this.plotTop-e[0]-1;e=this.plotTop+this.plotHeight+e[2];F=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?["M",0,k,"L",this.plotLeft-1,k,"L",this.plotLeft-
1,e,"L",0,e,"Z","M",F,k,"L",this.chartWidth,k,"L",this.chartWidth,e,"L",F,e,"Z"]:["M",0,0]})}});K(G,"parts/Point.js",[G["parts/Globals.js"]],function(a){var C,I=a.extend,F=a.erase,k=a.fireEvent,e=a.format,q=a.isArray,t=a.isNumber,u=a.pick,v=a.uniqueKey,p=a.defined,h=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,e,b){this.series=a;this.applyOptions(e,b);this.id=p(this.id)?this.id:v();this.resolveColor();a.chart.pointCount++;k(this,"afterInit");return this},resolveColor:function(){var a=
this.series,e;e=a.chart.options.chart.colorCount;var b=a.chart.styledMode;b||this.options.color||(this.color=a.color);a.options.colorByPoint?(b||(e=a.options.colors||a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length),b=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):b=a.colorIndex;this.colorIndex=u(this.colorIndex,b)},applyOptions:function(a,e){var b=this.series,d=b.options.pointValKey||b.pointValKey;a=C.prototype.optionsToObject.call(this,a);I(this,
a);this.options=this.options?I(this.options,a):a;a.group&&delete this.group;a.dataLabels&&delete this.dataLabels;d&&(this.y=this[d]);if(this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!t(this.y,!0)))this.formatPrefix="null";this.selected&&(this.state="select");"name"in this&&void 0===e&&b.xAxis&&b.xAxis.hasNames&&(this.x=b.xAxis.nameToX(this));void 0===this.x&&b&&(this.x=void 0===e?b.autoIncrement(this):e);return this},setNestedProperty:function(d,e,b){b.split(".").reduce(function(b,d,
c,h){b[d]=h.length-1===c?e:a.isObject(b[d],!0)?b[d]:{};return b[d]},d);return d},optionsToObject:function(d){var e={},b=this.series,g=b.options.keys,h=g||b.pointArrayMap||["y"],c=h.length,k=0,p=0;if(t(d)||null===d)e[h[0]]=d;else if(q(d))for(!g&&d.length>c&&(b=typeof d[0],"string"===b?e.name=d[0]:"number"===b&&(e.x=d[0]),k++);p<c;)g&&void 0===d[k]||(0<h[p].indexOf(".")?a.Point.prototype.setNestedProperty(e,d[k],h[p]):e[h[p]]=d[k]),k++,p++;else"object"===typeof d&&(e=d,d.dataLabels&&(b._hasPointLabels=
!0),d.marker&&(b._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||
"y",b=0,g;for(g=e[b];this[a]>=g.value;)g=e[++b];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=g&&g.color&&!this.options.color?g.color:this.nonZonedColor;return g},destroy:function(){var a=this.series.chart,e=a.hoverPoints,b;a.pointCount--;e&&(this.setState(),F(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)h(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(b in this)this[b]=
null},destroyElements:function(a){var d=this,b=[],e,h;a=a||{graphic:1,dataLabel:1};a.graphic&&b.push("graphic","shadowGroup");a.dataLabel&&b.push("dataLabel","dataLabelUpper","connector");for(h=b.length;h--;)e=b[h],d[e]&&(d[e]=d[e].destroy());["dataLabel","connector"].forEach(function(b){var c=b+"s";a[b]&&d[c]&&(d[c].forEach(function(a){a.element&&a.destroy()}),delete d[c])})},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,
series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,b=d.tooltipOptions,g=u(b.valueDecimals,""),h=b.valuePrefix||"",c=b.valueSuffix||"";d.chart.styledMode&&(a=d.chart.tooltip.styledModeFormat(a));(d.pointArrayMap||["y"]).forEach(function(b){b="{point."+b;if(h||c)a=a.replace(RegExp(b+"}","g"),h+b+"}"+c);a=a.replace(RegExp(b+"}","g"),b+":,."+g+"f}")});return e(a,{point:this,series:this.series},d.chart.time)},firePointEvent:function(a,
e,b){var d=this,h=this.series.options;(h.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&h.allowPointSelect&&(b=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});k(this,a,e,b)},visible:!0}});K(G,"parts/Series.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.animObject,F=a.arrayMax,k=a.arrayMin,e=a.correctFloat,q=a.defaultOptions,t=a.defaultPlotOptions,u=a.defined,v=a.erase,p=a.extend,h=a.fireEvent,d=a.isArray,m=
a.isNumber,b=a.isString,g=a.merge,l=a.objectEach,c=a.pick,w=a.removeEvent,z=a.splat,J=a.SVGElement,D=a.syncTimeout,A=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",
formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},
{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",cropShoulder:1,init:function(a,b){h(this,"init",{options:b});var d=this,e,g=a.series,f;d.chart=a;d.options=b=d.setOptions(b);d.linkedSeries=[];d.bindAxes();p(d,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;l(e,function(a,b){d.hcEvents&&d.hcEvents[b]&&-1!==d.hcEvents[b].indexOf(a)||C(d,b,a)});if(e&&e.click||
b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;d.getColor();d.getSymbol();d.parallelArrays.forEach(function(a){d[a+"Data"]||(d[a+"Data"]=[])});d.points||d.setData(b.data,!1);d.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(f=g[g.length-1]);d._i=c(f&&f._i,-1)+1;a.orderSeries(this.insert(g));h(this,"afterInit")},insert:function(a){var b=this.options.index,d;if(m(b)){for(d=a.length;d--;)if(b>=c(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&
a.unshift(this);d+=1}else a.push(this);return c(d,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;h(this,"bindAxes",null,function(){(b.axisTypes||[]).forEach(function(g){d[g].forEach(function(a){e=a.options;if(c[g]===e.index||void 0!==c[g]&&c[g]===e.id||void 0===c[g]&&0===e.index)b.insert(a.series),b[g]=a,a.isDirty=!0});b[g]||b.optionalAxis===g||a.error(18,!0,d)})})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,e=m(b)?function(d){var f="y"===d&&c.toYData?c.toYData(a):
a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};c.parallelArrays.forEach(e)},hasData:function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,e=a.pointIntervalUnit,g=this.chart.time,b=c(b,a.pointStart,0);this.pointInterval=d=c(this.pointInterval,a.pointInterval,1);e&&(a=new g.Date(b),"day"===e?g.set("Date",a,g.get("Date",
a)+d):"month"===e?g.set("Month",a,g.get("Month",a)+d):"year"===e&&g.set("FullYear",a,g.get("FullYear",a)+d),d=a.getTime()-b);this.xIncrement=b+d;return b},setOptions:function(a){var b=this.chart,d=b.options,e=d.plotOptions,n=(b.userOptions||{}).plotOptions||{},f=e[this.type],l=g(a);a=b.styledMode;h(this,"setOptions",{userOptions:l});this.userOptions=l;b=g(f,e.series,l);this.tooltipOptions=g(q.tooltip,q.plotOptions.series&&q.plotOptions.series.tooltip,q.plotOptions[this.type].tooltip,d.tooltip.userOptions,
e.series&&e.series.tooltip,e[this.type].tooltip,l.tooltip);this.stickyTracking=c(l.stickyTracking,n[this.type]&&n[this.type].stickyTracking,n.series&&n.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===f.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;d=this.zones=(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||(e={value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative"},a||(e.color=b.negativeColor,
e.fillColor=b.negativeFillColor),d.push(e));d.length&&u(d[d.length-1].value)&&d.push(a?{}:{color:this.color,fillColor:this.fillColor});h(this,"afterSetOptions",{options:b});return b},getName:function(){return c(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,b,d){var e,g=this.chart,f=this.userOptions,h=a+"Index",n=a+"Counter",l=d?d.length:c(g.options.chart[a+"Count"],g[a+"Count"]);b||(e=c(f[h],f["_"+h]),u(e)||(g.series.length||(g[n]=0),f["_"+h]=e=g[n]%l,g[n]+=1),d&&(b=d[e]));void 0!==
e&&(this[h]=e);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,b){var c=a.id;a=a.x;var d=this.points,e,f;c&&(f=(c=this.chart.get(c))&&c.index,void 0!==f&&(e=!0));void 0===f&&m(a)&&(f=this.xData.indexOf(a,b));
-1!==f&&void 0!==f&&this.cropped&&(f=f>=this.cropStart?f-this.cropStart:f);!e&&d[f]&&d[f].touched&&(f=void 0);return f},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,e=[],g,f,h,n=this.requireSorting,l=b.length===d.length,k=!0;this.xIncrement=null;b.forEach(function(b,f){var r,k=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b)||{};r=k.x;if(k.id||m(r))if(r=this.findPointIndex(k,h),-1===r||void 0===r?e.push(b):
d[r]&&b!==c.data[r]?(d[r].update(b,!1,null,!1),d[r].touched=!0,n&&(h=r+1)):d[r]&&(d[r].touched=!0),!l||f!==r||this.hasDerivedData)g=!0},this);if(g)for(b=d.length;b--;)(f=d[b])&&!f.touched&&f.remove(!1);else l?b.forEach(function(a,b){d[b].update&&a!==d[b].y&&d[b].update(a,!1,null,!1)}):k=!1;d.forEach(function(a){a&&(a.touched=!1)});if(!k)return!1;e.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);return!0},setData:function(e,g,h,l){var n=this,f=n.points,r=f&&f.length||0,k,x=n.options,p=
n.chart,B=null,w=n.xAxis,z=x.turboThreshold,E=this.xData,A=this.yData,q=(k=n.pointArrayMap)&&k.length,t=x.keys,D=0,u=1,v;e=e||[];k=e.length;g=c(g,!0);!1!==l&&k&&r&&!n.cropped&&!n.hasGroupedData&&n.visible&&!n.isSeriesBoosting&&(v=this.updateData(e));if(!v){n.xIncrement=null;n.colorCounter=0;this.parallelArrays.forEach(function(a){n[a+"Data"].length=0});if(z&&k>z){for(h=0;null===B&&h<k;)B=e[h],h++;if(m(B))for(h=0;h<k;h++)E[h]=this.autoIncrement(),A[h]=e[h];else if(d(B))if(q)for(h=0;h<k;h++)B=e[h],
E[h]=B[0],A[h]=B.slice(1,q+1);else for(t&&(D=t.indexOf("x"),u=t.indexOf("y"),D=0<=D?D:0,u=0<=u?u:1),h=0;h<k;h++)B=e[h],E[h]=B[D],A[h]=B[u];else a.error(12,!1,p)}else for(h=0;h<k;h++)void 0!==e[h]&&(B={series:n},n.pointClass.prototype.applyOptions.apply(B,[e[h]]),n.updateParallelArrays(B,h));A&&b(A[0])&&a.error(14,!0,p);n.data=[];n.options.data=n.userOptions.data=e;for(h=r;h--;)f[h]&&f[h].destroy&&f[h].destroy();w&&(w.minRange=w.userMinRange);n.isDirty=p.isDirtyBox=!0;n.isDirtyData=!!f;h=!1}"point"===
x.legendType&&(this.processData(),this.generatePoints());g&&p.redraw(h)},processData:function(b){var c=this.xData,d=this.yData,e=c.length,g;g=0;var f,h,n=this.xAxis,l,m=this.options;l=m.cropThreshold;var k=this.getExtremesFromAll||m.getExtremesFromAll,p=this.isCartesian,m=n&&n.val2lin,w=n&&n.isLog,z=this.requireSorting,A,q;if(p&&!this.isDirty&&!n.isDirty&&!this.yAxis.isDirty&&!b)return!1;n&&(b=n.getExtremes(),A=b.min,q=b.max);p&&this.sorted&&!k&&(!l||e>l||this.forceCrop)&&(c[e-1]<A||c[0]>q?(c=[],
d=[]):this.yData&&(c[0]<A||c[e-1]>q)&&(g=this.cropData(this.xData,this.yData,A,q),c=g.xData,d=g.yData,g=g.start,f=!0));for(l=c.length||1;--l;)e=w?m(c[l])-m(c[l-1]):c[l]-c[l-1],0<e&&(void 0===h||e<h)?h=e:0>e&&z&&(a.error(15,!1,this.chart),z=!1);this.cropped=f;this.cropStart=g;this.processedXData=c;this.processedYData=d;this.closestPointRange=h},cropData:function(a,b,d,e,g){var f=a.length,h=0,n=f,l;g=c(g,this.cropShoulder);for(l=0;l<f;l++)if(a[l]>=d){h=Math.max(0,l-g);break}for(d=l;d<f;d++)if(a[d]>
e){n=d+g;break}return{xData:a.slice(h,n),yData:b.slice(h,n),start:h,end:n}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,e=this.processedXData,f=this.processedYData,g=this.pointClass,l=e.length,m=this.cropStart||0,k,w=this.hasGroupedData,a=a.keys,A,q=[],t;c||w||(c=[],c.length=b.length,c=this.data=c);a&&w&&(this.options.keys=!1);for(t=0;t<l;t++)k=m+t,w?(A=(new g).init(this,[e[t]].concat(z(f[t]))),A.dataGroup=this.groupMap[t],A.dataGroup.options&&(A.options=A.dataGroup.options,
p(A,A.dataGroup.options),delete A.dataLabels)):(A=c[k])||void 0===b[k]||(c[k]=A=(new g).init(this,b[k],e[t])),A&&(A.index=k,q[t]=A);this.options.keys=a;if(c&&(l!==(d=c.length)||w))for(t=0;t<d;t++)t!==m||w||(t+=l),c[t]&&(c[t].destroyElements(),c[t].plotX=void 0);this.data=c;this.points=q;h(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:k(a),max:F(a)}},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,e,g=[],f=0;e=this.xAxis.getExtremes();var n=e.min,l=e.max,p,w,A=this.requireSorting?
this.cropShoulder:0,z,q;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(q=0;q<e;q++)if(w=c[q],z=a[q],p=(m(z,!0)||d(z))&&(!b.positiveValuesOnly||z.length||0<z),w=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[q+A]||w)>=n&&(c[q-A]||w)<=l,p&&w)if(p=z.length)for(;p--;)"number"===typeof z[p]&&(g[f++]=z[p]);else g[f++]=z;this.dataMin=k(g);this.dataMax=F(g);h(this,"afterGetExtremes")},translate:function(){this.processedXData||this.processData();this.generatePoints();
var a=this.options,b=a.stacking,g=this.xAxis,l=g.categories,k=this.yAxis,f=this.points,r=f.length,p=!!this.modifyValue,w,A=this.pointPlacementToXValue(),z=m(A),q=a.threshold,t=a.startFromThreshold?q:0,D,v,J,C,F=this.zoneAxis||"y",I=Number.MAX_VALUE;for(w=0;w<r;w++){var G=f[w],K=G.x;v=G.y;var V=G.low,Q=b&&k.stacks[(this.negStacks&&v<(t?0:q)?"-":"")+this.stackKey],W,X;k.positiveValuesOnly&&null!==v&&0>=v&&(G.isNull=!0);G.plotX=D=e(Math.min(Math.max(-1E5,g.translate(K,0,0,0,1,A,"flags"===this.type)),
1E5));b&&this.visible&&!G.isNull&&Q&&Q[K]&&(C=this.getStackIndicator(C,K,this.index),W=Q[K],X=W.points[C.key]);d(X)&&(V=X[0],v=X[1],V===t&&C.key===Q[K].base&&(V=c(m(q)&&q,k.min)),k.positiveValuesOnly&&0>=V&&(V=null),G.total=G.stackTotal=W.total,G.percentage=W.total&&G.y/W.total*100,G.stackY=v,W.setOffset(this.pointXOffset||0,this.barW||0));G.yBottom=u(V)?Math.min(Math.max(-1E5,k.translate(V,0,1,0,1)),1E5):null;p&&(v=this.modifyValue(v,G));G.plotY=v="number"===typeof v&&Infinity!==v?Math.min(Math.max(-1E5,
k.translate(v,0,1,0,1)),1E5):void 0;G.isInside=void 0!==v&&0<=v&&v<=k.len&&0<=D&&D<=g.len;G.clientX=z?e(g.translate(K,0,0,0,1,A)):D;G.negative=G[F]<(a[F+"Threshold"]||q||0);G.category=l&&void 0!==l[G.x]?l[G.x]:G.x;G.isNull||(void 0!==J&&(I=Math.min(I,Math.abs(D-J))),J=D);G.zone=this.zones.length&&G.getZone()}this.closestPointRangePx=I;h(this,"afterTranslate")},getValidPoints:function(a,b,c){var d=this.chart;return(a||this.points||[]).filter(function(a){return b&&!d.isInsidePlot(a.plotX,a.plotY,d.inverted)?
!1:c||!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,g=f||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(),n=b[h],l=b[h+"m"];n||(a&&(g.width=0,e&&(g.x=b.plotSizeX),b[h+"m"]=l=d.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[h]=n=d.clipRect(g),n.count={length:0});a&&!n.count[this.index]&&(n.count[this.index]=!0,n.count.length+=1);!1!==c.clip&&
(this.group.clip(a||f?n:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=h);a||(n.count[this.index]&&(delete n.count[this.index],--n.count.length),0===n.count.length&&h&&b[h]&&(f||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,c=I(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX,x:0},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99,x:b.inverted?0:-99},c),this.animate=null)},afterAnimate:function(){this.setClip();
h(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,d,e,g,f,h,l=this.options.marker,m,k,p,w=this[this.specialGroup]||this.markerGroup;d=this.xAxis;var A,z=c(l.enabled,!d||d.isRadial?!0:null,this.closestPointRangePx>=l.enabledThreshold*l.radius);if(!1!==l.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)if(e=a[d],h=(f=e.graphic)?"animate":"attr",m=e.marker||{},k=!!e.marker,g=z&&void 0===m.enabled||m.enabled,p=!1!==e.isInside,g&&!e.isNull){g=c(m.symbol,
this.symbol);A=this.markerAttribs(e,e.selected&&"select");f?f[p?"show":"hide"](!0).animate(A):p&&(0<A.width||e.hasImage)&&(e.graphic=f=b.renderer.symbol(g,A.x,A.y,A.width,A.height,k?m:l).add(w));if(f&&!b.styledMode)f[h](this.pointAttribs(e,e.selected&&"select"));f&&f.addClass(e.getClassName(),!0)}else f&&(e.graphic=f.destroy())},markerAttribs:function(a,b){var d=this.options.marker,e=a.marker||{},g=e.symbol||d.symbol,f=c(e.radius,d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],f=c(b&&b.radius,
d&&d.radius,f+(d&&d.radiusPlus||0)));a.hasImage=g&&0===g.indexOf("url");a.hasImage&&(f=0);a={x:Math.floor(a.plotX)-f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a},pointAttribs:function(a,b){var d=this.options.marker,e=a&&a.options,g=e&&e.marker||{},f=this.color,h=e&&e.color,n=a&&a.color,e=c(g.lineWidth,d.lineWidth),l=a&&a.zone&&a.zone.color;a=1;f=h||l||n||f;h=g.fillColor||d.fillColor||f;f=g.lineColor||d.lineColor||f;b&&(d=d.states[b],b=g.states&&g.states[b]||{},e=c(b.lineWidth,d.lineWidth,e+c(b.lineWidthPlus,
d.lineWidthPlus,0)),h=b.fillColor||d.fillColor||h,f=b.lineColor||d.lineColor||f,a=c(b.opacity,d.opacity,a));return{stroke:f,"stroke-width":e,fill:h,opacity:a}},destroy:function(b){var c=this,d=c.chart,e=/AppleWebKit\/533/.test(A.navigator.userAgent),g,f,n=c.data||[],m,k;h(c,"destroy");b||w(c);(c.axisTypes||[]).forEach(function(a){(k=c[a])&&k.series&&(v(k.series,c),k.isDirty=k.forceRedraw=!0)});c.legendItem&&c.chart.legend.destroyItem(c);for(f=n.length;f--;)(m=n[f])&&m.destroy&&m.destroy();c.points=
null;a.clearTimeout(c.animationTimeout);l(c,function(a,b){a instanceof J&&!a.survive&&(g=e&&"group"===b?"hide":"destroy",a[g]())});d.hoverSeries===c&&(d.hoverSeries=null);v(d.series,c);d.orderSeries();l(c,function(a,d){b&&"hcEvents"===d||delete c[d]})},getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,g,h=[],n=[],l;a=a||d.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);!e.connectNulls||b||c||(a=this.getValidPoints(a));a.forEach(function(g,m){var k=g.plotX,
r=g.plotY,p=a[m-1];(g.leftCliff||p&&p.rightCliff)&&!c&&(l=!0);g.isNull&&!u(b)&&0<m?l=!e.connectNulls:g.isNull&&!b?l=!0:(0===m||l?m=["M",g.plotX,g.plotY]:d.getPointSpline?m=d.getPointSpline(a,g,m):f?(m=1===f?["L",p.plotX,r]:2===f?["L",(p.plotX+k)/2,p.plotY,"L",(p.plotX+k)/2,r]:["L",k,p.plotY],m.push("L",k,r)):m=["L",k,r],n.push(g.x),f&&(n.push(g.x),2===f&&n.push(g.x)),h.push.apply(h,m),l=!1)});h.xMap=n;return d.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),
d=this.chart.styledMode,e=[["graph","highcharts-graph"]];d||e[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);e=a.getZonesGraphs(e);e.forEach(function(f,e){var g=f[0],h=a[g],n=h?"animate":"attr";h?(h.endX=a.preventGraphAnimation?null:c.xMap,h.animate({d:c})):c.length&&(a[g]=h=a.chart.renderer.path(c).addClass(f[1]).attr({zIndex:1}).add(a.group));h&&!d&&(g={stroke:f[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?g.dashstyle=f[3]:"square"!==b.linecap&&(g["stroke-linecap"]=
g["stroke-linejoin"]="round"),h[n](g).shadow(2>e&&b.shadow));h&&(h.startX=c.xMap,h.isArea=c.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,c){c=["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||"")];this.chart.styledMode||c.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(c)},this);return a},applyZones:function(){var a=this,b=this.chart,d=b.renderer,e=this.zones,g,f,h=this.clips||[],l,m=this.graph,k=this.area,p=Math.max(b.chartWidth,
b.chartHeight),w=this[(this.zoneAxis||"y")+"Axis"],A,z,q=b.inverted,t,D,u,v,J=!1;e.length&&(m||k)&&w&&void 0!==w.min&&(z=w.reversed,t=w.horiz,m&&!this.showLine&&m.hide(),k&&k.hide(),A=w.getExtremes(),e.forEach(function(e,n){g=z?t?b.plotWidth:0:t?0:w.toPixels(A.min)||0;g=Math.min(Math.max(c(f,g),0),p);f=Math.min(Math.max(Math.round(w.toPixels(c(e.value,A.max),!0)||0),0),p);J&&(g=f=w.toPixels(A.max));D=Math.abs(g-f);u=Math.min(g,f);v=Math.max(g,f);w.isXAxis?(l={x:q?v:u,y:0,width:D,height:p},t||(l.x=
b.plotHeight-l.x)):(l={x:0,y:q?v:u,width:p,height:D},t&&(l.y=b.plotWidth-l.y));q&&d.isVML&&(l=w.isXAxis?{x:0,y:z?u:v,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,y:0,width:l.height,height:b.chartHeight});h[n]?h[n].animate(l):(h[n]=d.clipRect(l),m&&a["zone-graph-"+n].clip(h[n]),k&&a["zone-area-"+n].clip(h[n]));J=e.value>A.max;a.resetZones&&0===f&&(f=void 0)}),this.clips=h)},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(d.renderer.isVML&&
c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,e;c.xAxis&&(e=C(d,"resize",b),C(c,"destroy",e),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g().attr({zIndex:d||.1}).add(e));f.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(u(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||
"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&I(d.animation).duration,f=a.visible?"inherit":"hidden",g=d.zIndex,l=a.hasRendered,m=b.seriesGroup,
k=b.inverted;h(this,"render");c=a.plotGroup("group","series",f,g,m);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,m);e&&a.animate(!0);c.inverted=a.isCartesian||a.invertable?k:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(k);!1===d.clip||a.sharedClipKey||l||c.clip(b.clipRect);e&&a.animate();l||(a.animationTimeout=
D(function(){a.afterAnimate()},e));a.isDirty=!1;a.hasRendered=!0;h(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,e=this.xAxis,g=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:c(e&&e.left,a.plotLeft),translateY:c(g&&g.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;
return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b,a)},buildKDTree:function(a){function b(a,d,e){var f,g;if(g=a&&a.length)return f=c.kdAxisArray[d%e],a.sort(function(a,b){return a[f]-b[f]}),g=Math.floor(g/2),{point:a[g],left:b(a.slice(0,g),d+1,e),right:b(a.slice(g+1),d+1,e)}}this.buildingKdTree=!0;var c=this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;D(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),
d,d);c.buildingKdTree=!1},c.options.kdNow||a&&"touchstart"===a.type?0:1)},searchKDTree:function(a,b,c){function d(a,b,c,l){var n=b.point,m=e.kdAxisArray[c%l],k,r,p=n;r=u(a[f])&&u(n[f])?Math.pow(a[f]-n[f],2):null;k=u(a[g])&&u(n[g])?Math.pow(a[g]-n[g],2):null;k=(r||0)+(k||0);n.dist=u(k)?Math.sqrt(k):Number.MAX_VALUE;n.distX=u(r)?Math.sqrt(r):Number.MAX_VALUE;m=a[m]-n[m];k=0>m?"left":"right";r=0>m?"right":"left";b[k]&&(k=d(a,b[k],c+1,l),p=k[h]<p[h]?k:n);b[r]&&Math.sqrt(m*m)<p[h]&&(a=d(a,b[r],c+1,l),
p=a[h]<p[h]?a:p);return p}var e=this,f=this.kdAxisArray[0],g=this.kdAxisArray[1],h=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return d(a,this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.options.pointPlacement;"between"===a&&(a=.5);m(a)&&(a*=c(this.options.pointRange||this.xAxis.pointRange));return a}})});K(G,"parts/Stacking.js",[G["parts/Globals.js"]],function(a){var C=a.Axis,I=a.Chart,F=a.correctFloat,
k=a.defined,e=a.destroyObjectProperties,q=a.format,t=a.objectEach,u=a.pick,v=a.Series;a.StackItem=function(a,e,d,m,b){var g=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=e;this.x=m;this.total=null;this.points={};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(g?d?"left":"right":"center"),verticalAlign:e.verticalAlign||(g?"middle":d?"bottom":"top"),y:u(e.y,g?4:d?14:-6),x:u(e.x,g?d?-6:6:0)};this.textAlign=e.textAlign||(g?d?"right":"left":"center")};a.StackItem.prototype=
{destroy:function(){e(this,this.axis)},render:function(a){var e=this.axis.chart,d=this.options,m=d.format,m=m?q(m,this,e.time):d.formatter.call(this);this.label?this.label.attr({text:m,visibility:"hidden"}):this.label=e.renderer.text(m,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a);this.label.labelrank=e.plotHeight},setOffset:function(a,e){var d=this.axis,h=d.chart,b=d.translate(d.usePercentage?100:this.total,0,0,0,1),g=d.translate(0),
g=k(b)&&Math.abs(b-g);a=h.xAxis[0].translate(this.x)+a;d=k(b)&&this.getStackBox(h,this,a,b,e,g,d);(e=this.label)&&d&&(e.align(this.alignOptions,null,d),d=e.alignAttr,e[!1===this.options.crop||h.isInsidePlot(d.x,d.y)?"show":"hide"](!0))},getStackBox:function(a,e,d,m,b,g,l){var c=e.axis.reversed,h=a.inverted;a=l.height+l.pos-(h?a.plotLeft:a.plotTop);e=e.isNegative&&!c||!e.isNegative&&c;return{x:h?e?m:m-g:d,y:h?a-d-b:e?a-m-g:a-m,width:h?g:b,height:h?b:g}}};I.prototype.getStacks=function(){var a=this;
a.yAxis.forEach(function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});a.series.forEach(function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,e=u(this.options.reversedStacks,!0),d=a.length,m;if(!this.isXAxis){this.usePercentage=!1;for(m=d;m--;)a[e?m:d-m-1].setStackedPoints();for(m=0;m<d;m++)a[m].modifyStacks()}};C.prototype.renderStackTotals=function(){var a=
this.chart,e=a.renderer,d=this.stacks,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);t(d,function(a){t(a,function(a){a.render(m)})})};C.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||t(e,function(d){t(d,function(e,b){e.touched<a.stacksTouched?(e.destroy(),delete d[b]):(e.total=null,e.cumulative=null)})})};C.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=
this.stacks=this.oldStacks),t(a,function(a){t(a,function(a){a.cumulative=a.total})}))};v.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,h=this.processedYData,d=[],m=h.length,b=this.options,g=b.threshold,l=u(b.startFromThreshold&&g,0),c=b.stack,b=b.stacking,w=this.stackKey,z="-"+w,q=this.negStacks,t=this.yAxis,A=t.stacks,n=t.oldStacks,x,B,E,v,f,r,C;t.stacksTouched+=1;for(f=0;f<m;f++)r=
e[f],C=h[f],x=this.getStackIndicator(x,r,this.index),v=x.key,E=(B=q&&C<(l?0:g))?z:w,A[E]||(A[E]={}),A[E][r]||(n[E]&&n[E][r]?(A[E][r]=n[E][r],A[E][r].total=null):A[E][r]=new a.StackItem(t,t.options.stackLabels,B,r,c)),E=A[E][r],null!==C?(E.points[v]=E.points[this.index]=[u(E.cumulative,l)],k(E.cumulative)||(E.base=v),E.touched=t.stacksTouched,0<x.index&&!1===this.singleStacks&&(E.points[v][0]=E.points[this.index+","+r+",0"][0])):E.points[v]=E.points[this.index]=null,"percent"===b?(B=B?w:z,q&&A[B]&&
A[B][r]?(B=A[B][r],E.total=B.total=Math.max(B.total,E.total)+Math.abs(C)||0):E.total=F(E.total+(Math.abs(C)||0))):E.total=F(E.total+(C||0)),E.cumulative=u(E.cumulative,l)+(C||0),null!==C&&(E.points[v].push(E.cumulative),d[f]=E.cumulative);"percent"===b&&(t.usePercentage=!0);this.stackedYData=d;t.oldStacks={}}};v.prototype.modifyStacks=function(){var a=this,e=a.stackKey,d=a.yAxis.stacks,m=a.processedXData,b,g=a.options.stacking;a[g+"Stacker"]&&[e,"-"+e].forEach(function(e){for(var c=m.length,h,l;c--;)if(h=
m[c],b=a.getStackIndicator(b,h,a.index,e),l=(h=d[e]&&d[e][h])&&h.points[b.key])a[g+"Stacker"](l,h,c)})};v.prototype.percentStacker=function(a,e,d){e=e.total?100/e.total:0;a[0]=F(a[0]*e);a[1]=F(a[1]*e);this.stackedYData[d]=a[1]};v.prototype.getStackIndicator=function(a,e,d,m){!k(a)||a.x!==e||m&&a.key!==m?a={x:e,index:0,key:m}:a.index++;a.key=[d,e,a.index].join();return a}});K(G,"parts/Dynamics.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.animate,F=a.Axis,k=a.Chart,e=a.createElement,
q=a.css,t=a.defined,u=a.erase,v=a.extend,p=a.fireEvent,h=a.isNumber,d=a.isObject,m=a.isArray,b=a.merge,g=a.objectEach,l=a.pick,c=a.Point,w=a.Series,z=a.seriesTypes,J=a.setAnimation,D=a.splat;a.cleanRecursively=function(b,c){var e={};g(b,function(g,h){if(d(b[h],!0)&&c[h])g=a.cleanRecursively(b[h],c[h]),Object.keys(g).length&&(e[h]=g);else if(d(b[h])||b[h]!==c[h])e[h]=b[h]});return e};v(k.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=l(b,!0),p(e,"addSeries",{options:a},function(){d=e.initSeries(a);
e.isDirtyLegend=!0;e.linkSeries();p(e,"afterAddSeries",{series:d});b&&e.redraw(c)}));return d},addAxis:function(a,c,d,e){var g=c?"xAxis":"yAxis",h=this.options;a=b(a,{index:this[g].length,isX:c});c=new F(this,a);h[g]=D(h[g]||{});h[g].push(a);l(d,!0)&&this.redraw(e);return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,g=c.loading,h=function(){d&&q(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=e("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,b.container),b.loadingSpan=e("span",{className:"highcharts-loading-inner"},null,d),C(b,"redraw",h));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;b.styledMode||(q(d,v(g.style,{zIndex:10})),q(b.loadingSpan,g.labelStyle),b.loadingShown||(q(d,{opacity:0,display:""}),I(d,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));b.loadingShown=!0;h()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",
this.styledMode||I(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){q(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(c,d,e,m){var k=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},f,r,w,z,q=[];p(k,"update",{options:c});c.isResponsiveOptions||k.setResponsive(!1,!0);c=a.cleanRecursively(c,k.options);if(f=c.chart){b(!0,k.options.chart,f);"className"in f&&k.setClassName(f.className);"reflow"in f&&k.setReflow(f.reflow);if("inverted"in f||"polar"in f||"type"in f)k.propFromSeries(),r=!0;"alignTicks"in f&&(r=
!0);g(f,function(a,b){-1!==k.propsRequireUpdateSeries.indexOf("chart."+b)&&(w=!0);-1!==k.propsRequireDirtyBox.indexOf(b)&&(k.isDirtyBox=!0);-1!==k.propsRequireReflow.indexOf(b)&&(z=!0)});!k.styledMode&&"style"in f&&k.renderer.setStyle(f.style)}!k.styledMode&&c.colors&&(this.options.colors=c.colors);c.plotOptions&&b(!0,this.options.plotOptions,c.plotOptions);g(c,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[n[b]])k[n[b]](a);"chart"!==b&&-1!==
k.propsRequireUpdateSeries.indexOf(b)&&(w=!0)});this.collectionsWithUpdate.forEach(function(a){var b;c[a]&&("series"===a&&(b=[],k[a].forEach(function(a,c){a.options.isInternal||b.push(l(a.options.index,c))})),D(c[a]).forEach(function(c,d){(d=t(c.id)&&k.get(c.id)||k[a][b?b[d]:d])&&d.coll===a&&(d.update(c,!1),e&&(d.touched=!0));if(!d&&e)if("series"===a)k.addSeries(c,!1).touched=!0;else if("xAxis"===a||"yAxis"===a)k.addAxis(c,"xAxis"===a,!1).touched=!0}),e&&k[a].forEach(function(a){a.touched||a.options.isInternal?
delete a.touched:q.push(a)}))});q.forEach(function(a){a.remove&&a.remove(!1)});r&&k.axes.forEach(function(a){a.update({},!1)});w&&k.series.forEach(function(a){a.update({},!1)});c.loading&&b(!0,k.options.loading,c.loading);r=f&&f.width;f=f&&f.height;a.isString(f)&&(f=a.relativeLength(f,r||k.chartWidth));z||h(r)&&r!==k.chartWidth||h(f)&&f!==k.chartHeight?k.setSize(r,f,m):l(d,!0)&&k.redraw(m);p(k,"afterUpdate",{options:c,redraw:d,animation:m})},setSubtitle:function(a){this.setTitle(void 0,a)}});v(c.prototype,
{update:function(a,b,c,e){function g(){h.applyOptions(a);null===h.y&&k&&(h.graphic=k.destroy());d(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(h.graphic=k.destroy()),a&&a.dataLabels&&h.dataLabel&&(h.dataLabel=h.dataLabel.destroy()),h.connector&&(h.connector=h.connector.destroy()));m=h.index;f.updateParallelArrays(h,m);p.data[m]=d(p.data[m],!0)||d(a,!0)?h.options:l(a,p.data[m]);f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===p.legendType&&
(n.isDirtyLegend=!0);b&&n.redraw(c)}var h=this,f=h.series,k=h.graphic,m,n=f.chart,p=f.options;b=l(b,!0);!1===e?g():h.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b)}});v(w.prototype,{addPoint:function(a,b,c,d,e){var g=this.options,f=this.data,h=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,m=g.data,n,w,z=this.xData,q,x;b=l(b,!0);n={series:this};this.pointClass.prototype.applyOptions.apply(n,[a]);x=n.x;q=z.length;if(this.requireSorting&&
x<z[q-1])for(w=!0;q&&z[q-1]>x;)q--;this.updateParallelArrays(n,"splice",q,0,0);this.updateParallelArrays(n,q);k&&n.name&&(k[x]=n.name);m.splice(q,0,a);w&&(this.data.splice(q,0,null),this.processData());"point"===g.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(n,"shift"),m.shift()));!1!==e&&p(this,"addPoint",{point:n});this.isDirtyData=this.isDirty=!0;b&&h.redraw(d)},removePoint:function(a,b,c){var d=this,e=d.data,g=e[a],f=d.points,h=d.chart,
k=function(){f&&f.length===e.length&&f.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(g||{series:d},"splice",a,1);g&&g.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};J(c,h);b=l(b,!0);g?g.firePointEvent("remove",null,k):k()},remove:function(a,b,c,d){function e(){g.destroy(d);g.remove=null;f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();l(a,!0)&&f.redraw(b)}var g=this,f=g.chart;!1!==c?p(g,"remove",null,e):e()},update:function(c,d){c=a.cleanRecursively(c,this.userOptions);
p(this,"update",{options:c});var e=this,g=e.chart,h=e.userOptions,k,f=e.initialType||e.type,m=c.type||h.type||g.options.chart.type,n=!(this.hasDerivedData||c.dataGrouping||m&&m!==this.type||void 0!==c.pointStart||c.pointInterval||c.pointIntervalUnit||c.keys),w=z[f].prototype,q,t=["group","markerGroup","dataLabelsGroup"],A=["navigatorSeries","baseSeries"],D=e.finishedAnimating&&{animation:!1},u={};n&&(A.push("data","isDirtyData","points","processedXData","processedYData","xIncrement"),!1!==c.visible&&
A.push("area","graph"),e.parallelArrays.forEach(function(a){A.push(a+"Data")}),c.data&&this.setData(c.data,!1));c=b(h,D,{index:void 0===h.index?e.index:h.index,pointStart:l(h.pointStart,e.xData[0])},!n&&{data:e.options.data},c);A=t.concat(A);A.forEach(function(a){A[a]=e[a];delete e[a]});e.remove(!1,null,!1,!0);for(q in w)e[q]=void 0;z[m||f]?v(e,z[m||f].prototype):a.error(17,!0,g);A.forEach(function(a){e[a]=A[a]});e.init(g,c);n&&this.points&&(k=e.options,!1===k.visible?(u.graphic=1,u.dataLabel=1):
(k.marker&&!1===k.marker.enabled&&(u.graphic=1),k.dataLabels&&!1===k.dataLabels.enabled&&(u.dataLabel=1)),this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(u).length&&a.destroyElements(u),!1===k.showInLegend&&a.legendItem&&g.legend.destroyItem(a))},this));c.zIndex!==h.zIndex&&t.forEach(function(a){e[a]&&e[a].attr({zIndex:c.zIndex})});e.initialType=f;g.linkSeries();p(this,"afterUpdate");l(d,!0)&&g.redraw(n?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=
a;this.chart.isDirtyLegend=!0}});v(F.prototype,{update:function(a,c){var d=this.chart,e=a&&a.events||{};a=b(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);g(d.options[this.coll].events,function(a,b){"undefined"===typeof e[b]&&(e[b]=void 0)});this.destroy(!0);this.init(d,v(a,{events:e}));d.isDirtyBox=!0;l(c,!0)&&d.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);
u(b.axes,this);u(b[c],this);m(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];b[c].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;l(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})});K(G,"parts/AreaSeries.js",[G["parts/Globals.js"]],function(a){var C=a.color,I=a.pick,F=a.Series,k=a.seriesType;k("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,
getStackPoints:function(e){var k=[],t=[],u=this.xAxis,v=this.yAxis,p=v.stacks[this.stackKey],h={},d=this.index,m=v.series,b=m.length,g,l=I(v.options.reversedStacks,!0)?1:-1,c;e=e||this.points;if(this.options.stacking){for(c=0;c<e.length;c++)e[c].leftNull=e[c].rightNull=null,h[e[c].x]=e[c];a.objectEach(p,function(a,b){null!==a.total&&t.push(b)});t.sort(function(a,b){return a-b});g=m.map(function(a){return a.visible});t.forEach(function(a,e){var m=0,w,z;if(h[a]&&!h[a].isNull)k.push(h[a]),[-1,1].forEach(function(k){var m=
1===k?"rightNull":"leftNull",n=0,q=p[t[e+k]];if(q)for(c=d;0<=c&&c<b;)w=q.points[c],w||(c===d?h[a][m]=!0:g[c]&&(z=p[a].points[c])&&(n-=z[1]-z[0])),c+=l;h[a][1===k?"rightCliff":"leftCliff"]=n});else{for(c=d;0<=c&&c<b;){if(w=p[a].points[c]){m=w[1];break}c+=l}m=v.translate(m,0,1,0,1);k.push({isNull:!0,plotX:u.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m})}})}return k},getGraphPath:function(a){var e=F.prototype.getGraphPath,k=this.options,u=k.stacking,v=this.yAxis,p,h,d=[],m=[],b=this.index,g,l=v.stacks[this.stackKey],
c=k.threshold,w=v.getThreshold(k.threshold),z,k=k.connectNulls||"percent"===u,J=function(e,h,k){var n=a[e];e=u&&l[n.x].points[b];var p=n[k+"Null"]||0;k=n[k+"Cliff"]||0;var z,q,n=!0;k||p?(z=(p?e[0]:e[1])+k,q=e[0]+k,n=!!p):!u&&a[h]&&a[h].isNull&&(z=q=c);void 0!==z&&(m.push({plotX:g,plotY:null===z?w:v.getThreshold(z),isNull:n,isCliff:!0}),d.push({plotX:g,plotY:null===q?w:v.getThreshold(q),doCurve:!1}))};a=a||this.points;u&&(a=this.getStackPoints(a));for(p=0;p<a.length;p++)if(h=a[p].isNull,g=I(a[p].rectPlotX,
a[p].plotX),z=I(a[p].yBottom,w),!h||k)k||J(p,p-1,"left"),h&&!u&&k||(m.push(a[p]),d.push({x:p,plotX:g,plotY:z})),k||J(p,p+1,"right");p=e.call(this,m,!0,!0);d.reversed=!0;h=e.call(this,d,!0,!0);h.length&&(h[0]="L");h=p.concat(h);e=e.call(this,m,!1,k);h.xMap=p.xMap;this.areaPath=h;return e},drawGraph:function(){this.areaPath=[];F.prototype.drawGraph.apply(this);var a=this,k=this.areaPath,t=this.options,u=[["area","highcharts-area",this.color,t.fillColor]];this.zones.forEach(function(e,k){u.push(["zone-area-"+
k,"highcharts-area highcharts-zone-area-"+k+" "+e.className,e.color||a.color,e.fillColor||t.fillColor])});u.forEach(function(e){var p=e[0],h=a[p],d=h?"animate":"attr",m={};h?(h.endX=a.preventGraphAnimation?null:k.xMap,h.animate({d:k})):(m.zIndex=0,h=a[p]=a.chart.renderer.path(k).addClass(e[1]).add(a.group),h.isArea=!0);a.chart.styledMode||(m.fill=I(e[3],C(e[2]).setOpacity(I(t.fillOpacity,.75)).get()));h[d](m);h.startX=k.xMap;h.shiftUnit=t.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})});
K(G,"parts/SplineSeries.js",[G["parts/Globals.js"]],function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,F,k){var e=F.plotX,q=F.plotY,t=a[k-1];k=a[k+1];var u,v,p,h;if(t&&!t.isNull&&!1!==t.doCurve&&!F.isCliff&&k&&!k.isNull&&!1!==k.doCurve&&!F.isCliff){a=t.plotY;p=k.plotX;k=k.plotY;var d=0;u=(1.5*e+t.plotX)/2.5;v=(1.5*q+a)/2.5;p=(1.5*e+p)/2.5;h=(1.5*q+k)/2.5;p!==u&&(d=(h-v)*(p-e)/(p-u)+q-h);v+=d;h+=d;v>a&&v>q?(v=Math.max(a,q),h=2*q-v):v<a&&v<q&&(v=Math.min(a,q),h=
2*q-v);h>k&&h>q?(h=Math.max(k,q),v=2*q-h):h<k&&h<q&&(h=Math.min(k,q),v=2*q-h);F.rightContX=p;F.rightContY=h}F=["C",C(t.rightContX,t.plotX),C(t.rightContY,t.plotY),C(u,e),C(v,q),e,q];t.rightContX=t.rightContY=null;return F}})});K(G,"parts/AreaSplineSeries.js",[G["parts/Globals.js"]],function(a){var C=a.seriesTypes.area.prototype,I=a.seriesType;I("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})});
K(G,"parts/ColumnSeries.js",[G["parts/Globals.js"]],function(a){var C=a.animObject,I=a.color,F=a.extend,k=a.defined,e=a.isNumber,q=a.merge,t=a.pick,u=a.Series,v=a.seriesType,p=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,
tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){u.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,e=a.xAxis,b=a.yAxis,g=e.options.reversedStacks,g=e.reversed&&!g||!e.reversed&&g,k,c={},p=0;!1===d.grouping?p=1:a.chart.series.forEach(function(d){var e=d.options,
g=d.yAxis,h;d.type!==a.type||!d.visible&&a.chart.options.chart.ignoreHiddenSeries||b.len!==g.len||b.pos!==g.pos||(e.stacking?(k=d.stackKey,void 0===c[k]&&(c[k]=p++),h=c[k]):!1!==e.grouping&&(h=p++),d.columnIndex=h)});var z=Math.min(Math.abs(e.transA)*(e.ordinalSlope||d.pointRange||e.closestPointRange||e.tickInterval||1),e.len),q=z*d.groupPadding,u=(z-2*q)/(p||1),d=Math.min(d.maxPointWidth||e.len,t(d.pointWidth,u*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(u-d)/2+(q+((a.columnIndex||0)+
(g?1:0))*u-z/2)*(g?-1:1)};return a.columnMetrics},crispCol:function(a,d,e,b){var g=this.chart,h=this.borderWidth,c=-(h%2?.5:0),h=h%2?.5:1;g.inverted&&g.renderer.isVML&&(h+=1);this.options.crisp&&(e=Math.round(a+e)+c,a=Math.round(a)+c,e-=a);b=Math.round(d+b)+h;c=.5>=Math.abs(d)&&.5<b;d=Math.round(d)+h;b-=d;c&&b&&(--d,b+=1);return{x:a,y:d,width:e,height:b}},translate:function(){var a=this,d=a.chart,e=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=t(e.borderWidth,b?0:1),g=a.yAxis,
l=e.threshold,c=a.translatedThreshold=g.getThreshold(l),p=t(e.minPointLength,5),z=a.getColumnMetrics(),q=z.width,D=a.barW=Math.max(q,1+2*b),A=a.pointXOffset=z.offset;d.inverted&&(c-=.5);e.pointPadding&&(D=Math.ceil(D));u.prototype.translate.apply(a);a.points.forEach(function(b){var e=t(b.yBottom,c),h=999+Math.abs(e),m=q,h=Math.min(Math.max(-h,b.plotY),g.len+h),n=b.plotX+A,f=D,r=Math.min(h,e),z,w=Math.max(h,e)-r;p&&Math.abs(w)<p&&(w=p,z=!g.reversed&&!b.negative||g.reversed&&b.negative,b.y===l&&a.dataMax<=
l&&g.min<l&&(z=!z),r=Math.abs(r-c)>p?e-p:c-(z?p:0));k(b.options.pointWidth)&&(m=f=Math.ceil(b.options.pointWidth),n-=Math.round((m-q)/2));b.barX=n;b.pointWidth=m;b.tooltipPos=d.inverted?[g.len+g.pos-d.plotLeft-h,a.xAxis.len-n-f/2,w]:[n+f/2,h+g.pos-d.plotTop,w];b.shapeType=a.pointClass.prototype.shapeType||"rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[n,c,f,0]:[n,r,f,w])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},
pointAttribs:function(a,d){var e=this.options,b,g=this.pointAttrToOptions||{};b=g.stroke||"borderColor";var h=g["stroke-width"]||"borderWidth",c=a&&a.color||this.color,k=a&&a[b]||e[b]||this.color||c,p=a&&a[h]||e[h]||this[h]||0,g=a&&a.dashStyle||e.dashStyle,u=t(e.opacity,1),D;a&&this.zones.length&&(D=a.getZone(),c=a.options.color||D&&D.color||this.color,D&&(k=D.borderColor||k,g=D.dashStyle||g,p=D.borderWidth||p));d&&(a=q(e.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,c=a.color||
void 0!==d&&I(c).brighten(a.brightness).get()||c,k=a[b]||k,p=a[h]||p,g=a.dashStyle||g,u=t(a.opacity,u));b={fill:c,stroke:k,"stroke-width":p,opacity:u};g&&(b.dashstyle=g);return b},drawPoints:function(){var a=this,d=this.chart,k=a.options,b=d.renderer,g=k.animationLimit||250,l;a.points.forEach(function(c){var h=c.graphic,m=h&&d.pointCount<g?"animate":"attr";if(e(c.plotY)&&null!==c.y){l=c.shapeArgs;h&&h.element.nodeName!==c.shapeType&&(h=h.destroy());if(h)h[m](q(l));else c.graphic=h=b[c.shapeType](l).add(c.group||
a.group);if(k.borderRadius)h[m]({r:k.borderRadius});d.styledMode||h[m](a.pointAttribs(c,c.selected&&"select")).shadow(!1!==c.allowShadow&&k.shadow,null,k.stacking&&!k.borderRadius);h.addClass(c.getClassName(),!0)}else h&&(c.graphic=h.destroy())})},animate:function(a){var d=this,e=this.yAxis,b=d.options,g=this.chart.inverted,h={},c=g?"translateX":"translateY",k;p&&(a?(h.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(b.threshold))),g?h.translateX=a-e.len:h.translateY=a,d.clipBox&&d.setClip(),
d.group.attr(h)):(k=d.group.attr(c),d.group.animate({scaleY:1},F(C(d.options.animation),{step:function(a,b){h[c]=k+b.pos*(e.pos-k);d.group.attr(h)}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0)});u.prototype.remove.apply(a,arguments)}})});K(G,"parts/BarSeries.js",[G["parts/Globals.js"]],function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})});K(G,"parts/ScatterSeries.js",[G["parts/Globals.js"]],function(a){var C=
a.Series,I=a.seriesType;I("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,
drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)},applyJitter:function(){var a=this,k=this.options.jitter,e=this.points.length;k&&this.points.forEach(function(q,t){["x","y"].forEach(function(u,v){var p,h="plot"+u.toUpperCase(),d,m;k[u]&&!q.isNull&&(p=a[u+"Axis"],m=k[u]*p.transA,p&&!p.isLog&&(d=Math.max(0,q[h]-m),p=Math.min(p.len,q[h]+m),v=1E4*Math.sin(t+v*e),q[h]=d+(p-d)*(v-Math.floor(v)),"x"===u&&(q.clientX=q.plotX)))})})}});a.addEvent(C,"afterTranslate",function(){this.applyJitter&&
this.applyJitter()})});K(G,"mixins/centered-series.js",[G["parts/Globals.js"]],function(a){var C=a.deg2rad,I=a.isNumber,F=a.pick,k=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,q=this.chart,t=2*(a.slicedOffset||0),u=q.plotWidth-2*t,q=q.plotHeight-2*t,v=a.center,v=[F(v[0],"50%"),F(v[1],"50%"),a.size||"100%",a.innerSize||0],p=Math.min(u,q),h,d;for(h=0;4>h;++h)d=v[h],a=2>h||2===h&&/%$/.test(d),v[h]=k(d,[u,q,p,v[2]][h])+(a?t:0);v[3]>v[2]&&(v[3]=v[2]);return v},getStartAndEndRadians:function(a,
k){a=I(a)?a:0;k=I(k)&&k>a&&360>k-a?k:a+360;return{start:C*(a+-90),end:C*(k+-90)}}}});K(G,"parts/PieSeries.js",[G["parts/Globals.js"]],function(a){var C=a.addEvent,I=a.CenteredSeriesMixin,F=a.defined,k=I.getStartAndEndRadians,e=a.merge,q=a.noop,t=a.pick,u=a.Point,v=a.Series,p=a.seriesType,h=a.setAnimation;p("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},
softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=
this,b=d.points,e=d.startAngleRad;a||(b.forEach(function(a){var b=a.graphic,g=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:e,end:e}),b.animate({r:g.r,start:g.start,end:g.end},d.options.animation))}),d.animate=null)},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var a,e=0,b=this.points,g=b.length,h,c=this.options.ignoreHiddenPoint;for(a=0;a<g;a++)h=b[a],e+=c&&!h.visible?0:h.isNull?0:h.y;this.total=e;for(a=0;a<g;a++)h=b[a],h.percentage=0<e&&(h.visible||!c)?
h.y/e*100:0,h.total=e},generatePoints:function(){v.prototype.generatePoints.call(this);this.updateTotals()},getX:function(a,e,b){var d=this.center,h=this.radii?this.radii[b.index]:d[2]/2;return d[0]+(e?-1:1)*Math.cos(Math.asin(Math.max(Math.min((a-d[1])/(h+b.labelDistance),1),-1)))*(h+b.labelDistance)+(0<b.labelDistance?(e?-1:1)*this.options.dataLabels.padding:0)},translate:function(a){this.generatePoints();var d=0,b=this.options,e=b.slicedOffset,h=e+(b.borderWidth||0),c,p,z=k(b.startAngle,b.endAngle),
q=this.startAngleRad=z.start,z=(this.endAngleRad=z.end)-q,u=this.points,A,n,x=b.dataLabels.distance,b=b.ignoreHiddenPoint,v,E=u.length,H;a||(this.center=a=this.getCenter());for(v=0;v<E;v++){H=u[v];H.labelDistance=t(H.options.dataLabels&&H.options.dataLabels.distance,x);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,H.labelDistance);c=q+d*z;if(!b||H.visible)d+=H.percentage/100;p=q+d*z;H.shapeType="arc";H.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*c)/1E3,end:Math.round(1E3*
p)/1E3};p=(p+c)/2;p>1.5*Math.PI?p-=2*Math.PI:p<-Math.PI/2&&(p+=2*Math.PI);H.slicedTranslation={translateX:Math.round(Math.cos(p)*e),translateY:Math.round(Math.sin(p)*e)};A=Math.cos(p)*a[2]/2;n=Math.sin(p)*a[2]/2;H.tooltipPos=[a[0]+.7*A,a[1]+.7*n];H.half=p<-Math.PI/2||p>Math.PI/2?1:0;H.angle=p;c=Math.min(h,H.labelDistance/5);H.labelPosition={natural:{x:a[0]+A+Math.cos(p)*H.labelDistance,y:a[1]+n+Math.sin(p)*H.labelDistance},"final":{},alignment:0>H.labelDistance?"center":H.half?"right":"left",connectorPosition:{breakAt:{x:a[0]+
A+Math.cos(p)*c,y:a[1]+n+Math.sin(p)*c},touchingSliceAt:{x:a[0]+A,y:a[1]+n}}}}},drawGraph:null,redrawPoints:function(){var a=this,h=a.chart,b=h.renderer,g,k,c,p,z=a.options.shadow;!z||a.shadowGroup||h.styledMode||(a.shadowGroup=b.g("shadow").attr({zIndex:-1}).add(a.group));a.points.forEach(function(d){var l={};k=d.graphic;if(!d.isNull&&k){p=d.shapeArgs;g=d.getTranslate();if(!h.styledMode){var m=d.shadowGroup;z&&!m&&(m=d.shadowGroup=b.g("shadow").add(a.shadowGroup));m&&m.attr(g);c=a.pointAttribs(d,
d.selected&&"select")}d.delayedRendering?(k.setRadialReference(a.center).attr(p).attr(g),h.styledMode||k.attr(c).attr({"stroke-linejoin":"round"}).shadow(z,m),d.delayRendering=!1):(k.setRadialReference(a.center),h.styledMode||e(!0,l,c),e(!0,l,p,g),k.animate(l));k.attr({visibility:d.visible?"inherit":"hidden"});k.addClass(d.getClassName())}else k&&(d.graphic=k.destroy())})},drawPoints:function(){var a=this.chart.renderer;this.points.forEach(function(d){d.graphic||(d.graphic=a[d.shapeType](d.shapeArgs).add(d.series.group),
d.delayedRendering=!0)})},searchPoint:q,sortByAngle:function(a,e){a.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:I.getCenter,getSymbol:q},{init:function(){u.prototype.init.apply(this,arguments);var a=this,e;a.name=t(a.name,"Slice");e=function(b){a.slice("select"===b.type)};C(a,"select",e);C(a,"unselect",e);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,e){var b=this,d=b.series,
h=d.chart,c=d.options.ignoreHiddenPoint;e=t(e,c);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,d.options.data[d.data.indexOf(b)]=b.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(c){if(b[c])b[c][a?"show":"hide"](!0)}),b.legendItem&&h.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),c&&(d.isDirty=!0),e&&h.redraw())},slice:function(a,e,b){var d=this.series;h(b,d.chart);t(e,!0);this.sliced=this.options.sliced=F(a)?a:!this.sliced;d.options.data[d.data.indexOf(this)]=
this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r-1,start:d.start,end:d.end})},connectorShapes:{fixedOffset:function(a,e,b){var d=e.breakAt;e=e.touchingSliceAt;return["M",a.x,
a.y].concat(b.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*d.x-e.x,2*d.y-e.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",e.x,e.y])},straight:function(a,e){e=e.touchingSliceAt;return["M",a.x,a.y,"L",e.x,e.y]},crookedLine:function(d,e,b){e=e.touchingSliceAt;var g=this.series,h=g.center[0],c=g.chart.plotWidth,k=g.chart.plotLeft,g=d.alignment,m=this.shapeArgs.r;b=a.relativeLength(b.crookDistance,1);b="left"===g?h+m+(c+k-h-m)*(1-b):k+(h-m)*b;h=["L",b,d.y];if("left"===g?b>d.x||b<e.x:b<d.x||b>e.x)h=
[];return["M",d.x,d.y].concat(h).concat(["L",e.x,e.y])}},getConnectorPath:function(){var a=this.labelPosition,e=this.series.options.dataLabels,b=e.connectorShape,g=this.connectorShapes;g[b]&&(b=g[b]);return b.call(this,{x:a.final.x,y:a.final.y,alignment:a.alignment},a.connectorPosition,e)}})});K(G,"parts/DataLabels.js",[G["parts/Globals.js"]],function(a){var C=a.arrayMax,I=a.defined,F=a.extend,k=a.format,e=a.merge,q=a.noop,t=a.pick,u=a.relativeLength,v=a.Series,p=a.seriesTypes,h=a.stableSort,d=a.isArray,
m=a.splat;a.distribute=function(b,d,e){function c(a,b){return a.target-b.target}var g,k=!0,l=b,m=[],p;p=0;var n=l.reducedLen||d;for(g=b.length;g--;)p+=b[g].size;if(p>n){h(b,function(a,b){return(b.rank||0)-(a.rank||0)});for(p=g=0;p<=n;)p+=b[g].size,g++;m=b.splice(g-1,b.length)}h(b,c);for(b=b.map(function(a){return{size:a.size,targets:[a.target],align:t(a.align,.5)}});k;){for(g=b.length;g--;)k=b[g],p=(Math.min.apply(0,k.targets)+Math.max.apply(0,k.targets))/2,k.pos=Math.min(Math.max(0,p-k.size*k.align),
d-k.size);g=b.length;for(k=!1;g--;)0<g&&b[g-1].pos+b[g-1].size>b[g].pos&&(b[g-1].size+=b[g].size,b[g-1].targets=b[g-1].targets.concat(b[g].targets),b[g-1].align=.5,b[g-1].pos+b[g-1].size>d&&(b[g-1].pos=d-b[g-1].size),b.splice(g,1),k=!0)}l.push.apply(l,m);g=0;b.some(function(b){var c=0;if(b.targets.some(function(){l[g].pos=b.pos+c;if(Math.abs(l[g].pos-l[g].target)>e)return l.slice(0,g+1).forEach(function(a){delete a.pos}),l.reducedLen=(l.reducedLen||d)-.1*d,l.reducedLen>.1*d&&a.distribute(l,d,e),!0;
c+=l[g].size;g++}))return!0});h(l,c)};v.prototype.drawDataLabels=function(){function b(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}function g(a,b){var c=[],f;if(d(a)&&!d(b))c=a.map(function(a){return e(a,b)});else if(d(b)&&!d(a))c=b.map(function(b){return e(a,b)});else if(d(a)||d(b))for(f=Math.max(a.length,b.length);f--;)c[f]=e(a[f],b[f]);
else c=e(a,b);return c}var h=this,c=h.chart,p=h.options,q=p.dataLabels,u=h.points,D,A=h.hasRendered||0,n,x=a.animObject(p.animation).duration,v=Math.min(x,200),E=t(q.defer,0<v),H=c.renderer,q=g(g(c.options.plotOptions&&c.options.plotOptions.series&&c.options.plotOptions.series.dataLabels,c.options.plotOptions&&c.options.plotOptions[h.type]&&c.options.plotOptions[h.type].dataLabels),q);a.fireEvent(this,"drawDataLabels");if(d(q)||q.enabled||h._hasPointLabels)n=h.plotGroup("dataLabelsGroup","data-labels",
E&&!A?"hidden":"inherit",q.zIndex||6),E&&(n.attr({opacity:+A}),A||setTimeout(function(){var a=h.dataLabelsGroup;a&&(h.visible&&n.show(!0),a[p.animation?"animate":"attr"]({opacity:1},{duration:v}))},x-v)),u.forEach(function(d){D=m(g(q,d.dlOptions||d.options&&d.options.dataLabels));D.forEach(function(e,f){var g=e.enabled&&(!d.isNull||d.dataLabelOnNull)&&b(d,e),l,m,r,q,z=d.dataLabels?d.dataLabels[f]:d.dataLabel,x=d.connectors?d.connectors[f]:d.connector,u=!z;g&&(l=d.getLabelConfig(),m=t(e[d.formatPrefix+
"Format"],e.format),l=I(m)?k(m,l,c.time):(e[d.formatPrefix+"Formatter"]||e.formatter).call(l,e),m=e.style,r=e.rotation,c.styledMode||(m.color=t(e.color,m.color,h.color,"#000000"),"contrast"===m.color&&(d.contrastColor=H.getContrast(d.color||h.color),m.color=e.inside||0>t(e.distance,d.labelDistance)||p.stacking?d.contrastColor:"#000000"),p.cursor&&(m.cursor=p.cursor)),q={r:e.borderRadius||0,rotation:r,padding:e.padding,zIndex:1},c.styledMode||(q.fill=e.backgroundColor,q.stroke=e.borderColor,q["stroke-width"]=
e.borderWidth),a.objectEach(q,function(a,b){void 0===a&&delete q[b]}));!z||g&&I(l)?g&&I(l)&&(z?q.text=l:(d.dataLabels=d.dataLabels||[],z=d.dataLabels[f]=r?H.text(l,0,-9999).addClass("highcharts-data-label"):H.label(l,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),f||(d.dataLabel=z),z.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(e.className||"")+(e.useHTML?" highcharts-tracker":""))),z.options=e,z.attr(q),c.styledMode||z.css(m).shadow(e.shadow),z.added||z.add(n),e.textPath&&z.setTextPath(d.getDataLabelPath&&
d.getDataLabelPath(z)||d.graphic,e.textPath),h.alignDataLabel(d,z,e,null,u)):(d.dataLabel=d.dataLabel&&d.dataLabel.destroy(),d.dataLabels&&(1===d.dataLabels.length?delete d.dataLabels:delete d.dataLabels[f]),f||delete d.dataLabel,x&&(d.connector=d.connector.destroy(),d.connectors&&(1===d.connectors.length?delete d.connectors:delete d.connectors[f])))})});a.fireEvent(this,"afterDrawDataLabels")};v.prototype.alignDataLabel=function(a,d,e,c,h){var b=this.chart,g=this.isCartesian&&b.inverted,k=t(a.dlBox&&
a.dlBox.centerX,a.plotX,-9999),l=t(a.plotY,-9999),n=d.getBBox(),m,p=e.rotation,q=e.align,u=this.visible&&(a.series.forceDL||b.isInsidePlot(k,Math.round(l),g)||c&&b.isInsidePlot(k,g?c.x+1:c.y+c.height-1,g)),f="justify"===t(e.overflow,"justify");if(u&&(m=b.renderer.fontMetrics(b.styledMode?void 0:e.style.fontSize,d).b,c=F({x:g?this.yAxis.len-l:k,y:Math.round(g?this.xAxis.len-k:l),width:0,height:0},c),F(e,{width:n.width,height:n.height}),p?(f=!1,k=b.renderer.rotCorr(m,p),k={x:c.x+e.x+c.width/2+k.x,y:c.y+
e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*c.height},d[h?"attr":"animate"](k).attr({align:q}),l=(p+720)%360,l=180<l&&360>l,"left"===q?k.y-=l?n.height:0:"center"===q?(k.x-=n.width/2,k.y-=n.height/2):"right"===q&&(k.x-=n.width,k.y-=l?0:n.height),d.placed=!0,d.alignAttr=k):(d.align(e,null,c),k=d.alignAttr),f&&0<=c.height?a.isLabelJustified=this.justifyDataLabel(d,e,k,n,c,h):t(e.crop,!0)&&(u=b.isInsidePlot(k.x,k.y)&&b.isInsidePlot(k.x+n.width,k.y+n.height)),e.shape&&!p))d[h?"attr":"animate"]({anchorX:g?
b.plotWidth-a.plotY:a.plotX,anchorY:g?b.plotHeight-a.plotX:a.plotY});u||(d.attr({y:-9999}),d.placed=!1)};v.prototype.justifyDataLabel=function(a,d,e,c,h,k){var b=this.chart,g=d.align,l=d.verticalAlign,n,m,p=a.box?0:a.padding||0;n=e.x+p;0>n&&("right"===g?d.align="left":d.x=-n,m=!0);n=e.x+c.width-p;n>b.plotWidth&&("left"===g?d.align="right":d.x=b.plotWidth-n,m=!0);n=e.y+p;0>n&&("bottom"===l?d.verticalAlign="top":d.y=-n,m=!0);n=e.y+c.height-p;n>b.plotHeight&&("top"===l?d.verticalAlign="bottom":d.y=b.plotHeight-
n,m=!0);m&&(a.placed=!k,a.align(d,null,h));return m};p.pie&&(p.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,d,e,c){return a.getX(e<d.top+2||e>d.bottom-2?c:e,d.half,d)},justify:function(a,d,e){return e[0]+(a.half?-1:1)*(d+a.labelDistance)},alignToPlotEdges:function(a,d,e,c){a=a.getBBox().width;return d?a+c:e-a-c},alignToConnectors:function(a,d,e,c){var b=0,g;a.forEach(function(a){g=a.dataLabel.getBBox().width;g>
b&&(b=g)});return d?b+c:e-b-c}},p.pie.prototype.drawDataLabels=function(){var b=this,d=b.data,h,c=b.chart,k=b.options.dataLabels,m=k.connectorPadding,p,q=c.plotWidth,u=c.plotHeight,n=c.plotLeft,x=Math.round(c.chartWidth/3),B,E=b.center,H=E[2]/2,f=E[1],r,F,G,L,K=[[],[]],O,y,S,Q,R=[0,0,0,0],T=b.dataLabelPositioners,Y;b.visible&&(k.enabled||b._hasPointLabels)&&(d.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),
a.dataLabel.shortened=!1)}),v.prototype.drawDataLabels.apply(b),d.forEach(function(a){a.dataLabel&&(a.visible?(K[a.half].push(a),a.dataLabel._pos=null,!I(k.style.width)&&!I(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>x&&(a.dataLabel.css({width:.7*x}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),K.forEach(function(d,e){var g,l,p=d.length,z=[],x;if(p)for(b.sortByAngle(d,
e-.5),0<b.maxLabelDistance&&(g=Math.max(0,f-H-b.maxLabelDistance),l=Math.min(f+H+b.maxLabelDistance,c.plotHeight),d.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,f-H-a.labelDistance),a.bottom=Math.min(f+H+a.labelDistance,c.plotHeight),x=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+x/2,size:x,rank:a.y},z.push(a.distributeBox))}),g=l+x-g,a.distribute(z,g,g/5)),Q=0;Q<p;Q++){h=d[Q];G=h.labelPosition;r=h.dataLabel;S=!1===h.visible?"hidden":
"inherit";y=g=G.natural.y;z&&I(h.distributeBox)&&(void 0===h.distributeBox.pos?S="hidden":(L=h.distributeBox.size,y=T.radialDistributionY(h)));delete h.positionIndex;if(k.justify)O=T.justify(h,H,E);else switch(k.alignTo){case "connectors":O=T.alignToConnectors(d,e,q,n);break;case "plotEdges":O=T.alignToPlotEdges(r,e,q,n);break;default:O=T.radialDistributionX(b,h,y,g)}r._attr={visibility:S,align:G.alignment};r._pos={x:O+k.x+({left:m,right:-m}[G.alignment]||0),y:y+k.y-10};G.final.x=O;G.final.y=y;t(k.crop,
!0)&&(F=r.getBBox().width,g=null,O-F<m&&1===e?(g=Math.round(F-O+m),R[3]=Math.max(g,R[3])):O+F>q-m&&0===e&&(g=Math.round(O+F-q+m),R[1]=Math.max(g,R[1])),0>y-L/2?R[0]=Math.max(Math.round(-y+L/2),R[0]):y+L/2>u&&(R[2]=Math.max(Math.round(y+L/2-u),R[2])),r.sideOverflow=g)}}),0===C(R)||this.verifyDataLabelOverflow(R))&&(this.placeDataLabels(),this.points.forEach(function(a){Y=e(k,a.options.dataLabels);if(p=t(Y.connectorWidth,1)){var d;B=a.connector;if((r=a.dataLabel)&&r._pos&&a.visible&&0<a.labelDistance){S=
r._attr.visibility;if(d=!B)a.connector=B=c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(b.dataLabelsGroup),c.styledMode||B.attr({"stroke-width":p,stroke:Y.connectorColor||a.color||"#666666"});B[d?"attr":"animate"]({d:a.getConnectorPath()});B.attr("visibility",S)}else B&&(a.connector=B.destroy())}}))},p.pie.prototype.placeDataLabels=function(){this.points.forEach(function(a){var b=a.dataLabel,d;b&&a.visible&&((d=b._pos)?
(b.sideOverflow&&(b._attr.width=Math.max(b.getBBox().width-b.sideOverflow,0),b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](d),b.moved=!0):b&&b.attr({y:-9999}));delete a.distributeBox},this)},p.pie.prototype.alignDataLabel=q,p.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,c=d.center,e=d.minSize||80,h,k=null!==d.size;k||(null!==c[0]?h=Math.max(b[2]-
Math.max(a[1],a[3]),e):(h=Math.max(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2),null!==c[1]?h=Math.max(Math.min(h,b[2]-Math.max(a[0],a[2])),e):(h=Math.max(Math.min(h,b[2]-a[0]-a[2]),e),b[1]+=(a[0]-a[2])/2),h<b[2]?(b[2]=h,b[3]=Math.min(u(d.innerSize||0,h),h),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):k=!0);return k});p.column&&(p.column.prototype.alignDataLabel=function(a,d,h,c,k){var b=this.chart.inverted,g=a.series,l=a.dlBox||a.shapeArgs,m=t(a.below,a.plotY>t(this.translatedThreshold,
g.yAxis.len)),n=t(h.inside,!!this.options.stacking);l&&(c=e(l),0>c.y&&(c.height+=c.y,c.y=0),l=c.y+c.height-g.yAxis.len,0<l&&(c.height-=l),b&&(c={x:g.yAxis.len-c.y-c.height,y:g.xAxis.len-c.x-c.width,width:c.height,height:c.width}),n||(b?(c.x+=m?0:c.width,c.width=0):(c.y+=m?c.height:0,c.height=0)));h.align=t(h.align,!b||n?"center":m?"right":"left");h.verticalAlign=t(h.verticalAlign,b||n?"middle":m?"top":"bottom");v.prototype.alignDataLabel.call(this,a,d,h,c,k);a.isLabelJustified&&a.contrastColor&&d.css({color:a.contrastColor})})});
K(G,"modules/overlapping-datalabels.src.js",[G["parts/Globals.js"]],function(a){var C=a.Chart,G=a.isArray,F=a.objectEach,k=a.pick,e=a.addEvent,q=a.fireEvent;e(C,"render",function(){var a=[];(this.labelCollectors||[]).forEach(function(e){a=a.concat(e())});(this.yAxis||[]).forEach(function(e){e.options.stackLabels&&!e.options.stackLabels.allowOverlap&&F(e.stacks,function(e){F(e,function(e){a.push(e.label)})})});(this.series||[]).forEach(function(e){var q=e.options.dataLabels;e.visible&&(!1!==q.enabled||
e._hasPointLabels)&&e.points.forEach(function(e){e.visible&&(G(e.dataLabels)?e.dataLabels:e.dataLabel?[e.dataLabel]:[]).forEach(function(h){var d=h.options;h.labelrank=k(d.labelrank,e.labelrank,e.shapeArgs&&e.shapeArgs.height);d.allowOverlap||a.push(h)})})});this.hideOverlappingLabels(a)});C.prototype.hideOverlappingLabels=function(a){var e=this,k=a.length,p=e.renderer,h,d,m,b,g,l,c=function(a,b,c,d,e,g,h,k){return!(e>a+c||e+h<a||g>b+d||g+k<b)};m=function(a){var b,c,d,e=a.box?0:a.padding||0;d=0;if(a&&
(!a.alignAttr||a.placed))return b=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},c=a.parentGroup,a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,d=p.fontMetrics(null,a.element).h),{x:b.x+(c.translateX||0)+e,y:b.y+(c.translateY||0)+e-d,width:a.width-2*e,height:a.height-2*e}};for(d=0;d<k;d++)if(h=a[d])h.oldOpacity=h.opacity,h.newOpacity=1,h.absoluteBox=m(h);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(d=0;d<k;d++)for(l=(m=a[d])&&m.absoluteBox,h=d+1;h<k;++h)if(g=(b=a[h])&&
b.absoluteBox,l&&g&&m!==b&&0!==m.newOpacity&&0!==b.newOpacity&&(g=c(l.x,l.y,l.width,l.height,g.x,g.y,g.width,g.height)))(m.labelrank<b.labelrank?m:b).newOpacity=0;a.forEach(function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&(a.alignAttr&&a.placed?(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),q(e,"afterHideOverlappingLabels")):a.attr({opacity:c})),a.isOld=!0)})}});K(G,"parts/Interaction.js",[G["parts/Globals.js"]],function(a){var C=
a.addEvent,G=a.Chart,F=a.createElement,k=a.css,e=a.defaultOptions,q=a.defaultPlotOptions,t=a.extend,u=a.fireEvent,v=a.hasTouch,p=a.isObject,h=a.Legend,d=a.merge,m=a.pick,b=a.Point,g=a.Series,l=a.seriesTypes,c=a.svg,w;w=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a))};a.points.forEach(function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=
a:a.dataLabel.element.point=a)});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(v)a[e].on("touchstart",d);!b.styledMode&&a.options.cursor&&a[e].css(k).css({cursor:a.options.cursor})}}),a._hasTracking=!0);u(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,d=b.trackByArea,e=[].concat(d?a.areaPath:a.graphPath),g=e.length,h=a.chart,k=h.pointer,l=h.renderer,
m=h.options.tooltip.snap,f=a.tracker,p,q=function(){if(h.hoverSeries!==a)a.onMouseOver()},t="rgba(192,192,192,"+(c?.0001:.002)+")";if(g&&!d)for(p=g+1;p--;)"M"===e[p]&&e.splice(p+1,0,e[p+1]-m,e[p+2],"L"),(p&&"M"===e[p]||p===g)&&e.splice(p,0,"L",e[p-2]+m,e[p-1]);f?f.attr({d:e}):a.graph&&(a.tracker=l.path(e).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(d?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),h.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:t,
fill:d?t:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*m)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",q).on("mouseout",function(a){k.onTrackerMouseOut(a)});b.cursor&&!h.styledMode&&a.css({cursor:b.cursor});if(v)a.on("touchstart",q)}));u(this,"afterDrawTracker")}};l.column&&(l.column.prototype.drawTracker=w.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=w.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=w.drawTrackerPoint);
t(h.prototype,{setItemEvents:function(a,c,e){var h=this,g=h.chart.renderer.boxWrapper,k=a instanceof b,l="highcharts-legend-"+(k?"point":"series")+"-active",m=h.chart.styledMode;(e?c:a.legendGroup).on("mouseover",function(){h.allItems.forEach(function(b){a!==b&&b.setState("inactive",!k)});a.setState("hover");a.visible&&g.addClass(l);m||c.css(h.options.itemHoverStyle)}).on("mouseout",function(){h.styledMode||c.css(d(a.visible?h.itemStyle:h.itemHiddenStyle));h.allItems.forEach(function(b){a!==b&&b.setState("",
!k)});g.removeClass(l);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};g.removeClass(l);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):u(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",
{checked:b.target.checked,item:a},function(){a.select()})})}});t(G.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=e.lang,d=b.options.chart.resetZoomButton,h=d.theme,g=h.states,k="chart"===d.relativeTo||"spaceBox"===d.relativeTo?null:"plotBox";u(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,h,g&&g.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,
k)});u(this,"afterShowResetZoom")},zoomOut:function(){u(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(b){var c=this,d,e=c.pointer,h=!1,g=c.inverted?e.mouseDownX:e.mouseDownY,k;!b||b.resetSelection?(c.axes.forEach(function(a){d=a.zoom()}),e.initiated=!1):b.xAxis.concat(b.yAxis).forEach(function(b){var k=b.axis,f=c.inverted?k.left:k.top,l=c.inverted?f+k.width:f+k.height,m=k.isXAxis,n=!1;if(!m&&g>=f&&g<=l||m||!a.defined(g))n=!0;e[m?"zoomX":"zoomY"]&&n&&(d=k.zoom(b.min,b.max),k.displayBtn&&
(h=!0))});k=c.resetZoomButton;h&&!k?c.showResetZoom():!h&&p(k)&&(c.resetZoomButton=k.destroy());d&&c.redraw(m(c.options.chart.animation,b&&b.animation,100>c.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;u(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState()});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,h=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=c[d],f=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&
c.inverted?-1:1,l=b.getExtremes(),m=b.toValue(g-h,!0)+f*k,k=b.toValue(g+b.len-h,!0)-f*k,n=k<m,g=n?k:m,m=n?m:k,k=Math.min(l.dataMin,f?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding)),f=Math.max(l.dataMax,f?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding)),n=k-g;0<n&&(m+=n,g=k);n=m-f;0<n&&(m=f,g-=n);b.series.length&&g!==l.min&&m!==l.max&&(b.setExtremes(g,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=h});e&&c.redraw(!1);k(c.container,{cursor:"move"})})}});t(b.prototype,{select:function(a,b){var c=this,
d=c.series,e=d.chart;a=m(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[d.data.indexOf(c)]=c.options;c.setState(a&&"select");b||e.getSelectedPoints().forEach(function(a){var b=a.series;a.selected&&a!==c&&(a.selected=a.options.selected=!1,b.options.data[b.data.indexOf(a)]=a.options,a.setState(e.hoverPoints&&b.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,
c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=d(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){C(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,
b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,h=this.state,g=e.options.states[a||"normal"]||{},k=q[e.type].marker&&e.options.marker,l=k&&!1===k.enabled,f=k&&k.states&&k.states[a||"normal"]||{},p=!1===f.enabled,v=e.stateMarkerGraphic,z=this.marker||{},w=e.chart,C=e.halo,F,y,G,I=k&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===g.enabled||a&&(p||l&&!1===f.enabled)||a&&z.states&&z.states[a]&&!1===z.states[a].enabled)){this.state=a;I&&(F=e.markerAttribs(this,
a));if(this.graphic)h&&this.graphic.removeClass("highcharts-point-"+h),a&&this.graphic.addClass("highcharts-point-"+a),w.styledMode||(y=e.pointAttribs(this,a),G=m(w.options.chart.animation,g.animation),e.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:y.opacity},G)}),this.connector&&this.connector.animate({opacity:y.opacity},G)),this.graphic.animate(y,G)),F&&this.graphic.animate(F,m(w.options.chart.animation,f.animation,k.animation)),v&&v.hide();else{if(a&&
f){h=z.symbol||e.symbol;v&&v.currentSymbol!==h&&(v=v.destroy());if(v)v[b?"animate":"attr"]({x:F.x,y:F.y});else h&&(e.stateMarkerGraphic=v=w.renderer.symbol(h,F.x,F.y,F.width,F.height).add(e.markerGroup),v.currentSymbol=h);!w.styledMode&&v&&v.attr(e.pointAttribs(this,a))}v&&(v[a&&w.isInsidePlot(c,d,w.inverted)?"show":"hide"](),v.element.point=this)}(a=g.halo)&&a.size?(C||(e.halo=C=w.renderer.path().add((this.graphic||v).parentGroup)),C.show()[b?"animate":"attr"]({d:this.haloPath(a.size)}),C.attr({"class":"highcharts-halo highcharts-color-"+
m(this.colorIndex,e.colorIndex)+(this.className?" "+this.className:""),zIndex:-1}),C.point=this,w.styledMode||C.attr(t({fill:this.color||e.color,"fill-opacity":a.opacity},a.attributes))):C&&C.point&&C.point.haloPath&&C.animate({d:C.point.haloPath(0)},null,C.hide);u(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});t(g.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();
this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})},setState:function(a,b){var c=this,d=c.options,e=c.graph,h=d.inactiveOtherPoints,g=d.states,k=d.lineWidth,l=d.opacity,f=m(g[a||
"normal"]&&g[a||"normal"].animation,c.chart.options.chart.animation),d=0;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(g[a]&&!1===g[a].enabled)return;a&&(k=g[a].lineWidth||k+(g[a].lineWidthPlus||0),l=m(g[a].opacity,l));if(e&&!e.dashstyle)for(g={"stroke-width":k},e.animate(g,f);c["zone-graph-"+d];)c["zone-graph-"+d].attr(g),d+=
1;h||[c.group,c.markerGroup,c.dataLabelsGroup,c.labelBySeries].forEach(function(a){a&&a.animate({opacity:l},f)})}b&&h&&c.points&&c.points.forEach(function(b){b.setState&&b.setState(a)})},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,g,h=d.options.chart.ignoreHiddenSeries,k=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][g]()});if(d.hoverSeries===
c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});h&&(d.isDirtyBox=!0);u(c,g);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);
u(this,a?"select":"unselect")},drawTracker:w.drawTrackerGraph})});K(G,"parts/Responsive.js",[G["parts/Globals.js"]],function(a){var C=a.Chart,G=a.isArray,F=a.isObject,k=a.pick,e=a.splat;C.prototype.setResponsive=function(e,k){var q=this.options.responsive,t=[],p=this.currentResponsive;!k&&q&&q.rules&&q.rules.forEach(function(h){void 0===h._id&&(h._id=a.uniqueKey());this.matchResponsiveRule(h,t,e)},this);k=a.merge.apply(0,t.map(function(e){return a.find(q.rules,function(a){return a._id===e}).chartOptions}));
k.isResponsiveOptions=!0;t=t.toString()||void 0;t!==(p&&p.ruleIds)&&(p&&this.update(p.undoOptions,e),t?(p=this.currentOptions(k),p.isResponsiveOptions=!0,this.currentResponsive={ruleIds:t,mergedOptions:k,undoOptions:p},this.update(k,e)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,e){var q=a.condition;(q.callback||function(){return this.chartWidth<=k(q.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=k(q.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=k(q.minWidth,0)&&this.chartHeight>=
k(q.minHeight,0)}).call(this)&&e.push(a._id)};C.prototype.currentOptions=function(q){function t(q,p,h,d){var m;a.objectEach(q,function(a,g){if(!d&&-1<["series","xAxis","yAxis"].indexOf(g))for(a=e(a),h[g]=[],m=0;m<a.length;m++)p[g][m]&&(h[g][m]={},t(a[m],p[g][m],h[g][m],d+1));else F(a)?(h[g]=G(a)?[]:{},t(a,p[g]||{},h[g],d+1)):h[g]=k(p[g],null)})}var u={};t(q,this.options,u,0);return u}});K(G,"masters/highcharts.src.js",[G["parts/Globals.js"]],function(a){return a});G["masters/highcharts.src.js"]._modules=
G;return G["masters/highcharts.src.js"]});



//exporting.js
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/exporting",["highcharts"],function(h){f(h);f.Highcharts=h;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function h(c,C,f,n){c.hasOwnProperty(C)||(c[C]=n.apply(null,f))}f=f?f._modules:{};h(f,"modules/full-screen.src.js",[f["parts/Globals.js"]],function(c){c.FullScreen=function(c){this.init(c.parentNode)};c.FullScreen.prototype=
{init:function(c){c.requestFullscreen?c.requestFullscreen():c.mozRequestFullScreen?c.mozRequestFullScreen():c.webkitRequestFullscreen?c.webkitRequestFullscreen():c.msRequestFullscreen&&c.msRequestFullscreen()}}});h(f,"mixins/navigation.js",[],function(){return{initUpdate:function(c){c.navigation||(c.navigation={updates:[],update:function(c,f){this.updates.forEach(function(n){n.update.call(n.context,c,f)})}})},addUpdate:function(c,f){f.navigation||this.initUpdate(f);f.navigation.updates.push({update:c,
context:f})}}});h(f,"modules/exporting.src.js",[f["parts/Globals.js"],f["mixins/navigation.js"]],function(c,f){var h=c.defaultOptions,n=c.doc,A=c.Chart,v=c.addEvent,C=c.removeEvent,D=c.fireEvent,r=c.createElement,E=c.discardElement,w=c.css,p=c.merge,t=c.pick,F=c.objectEach,y=c.extend,J=c.isTouchDevice,z=c.win,H=z.navigator.userAgent,G=c.SVGRenderer,I=c.Renderer.prototype.symbols,K=/Edge\/|Trident\/|MSIE /.test(H),L=/firefox/i.test(H);y(h.lang,{viewFullscreen:"View in full screen",printChart:"Print chart",
downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});h.navigation||(h.navigation={});p(!0,h.navigation,{buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}});p(!0,h.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",
color:"#333333",background:"none",fontSize:J?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{padding:5}}});

h.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:1024,scale:2,

buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",titleKey:"contextButtonTitle",menuItems:"viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},
menuItemDefinitions:{viewFullscreen:{textKey:"viewFullscreen",onclick:function(){this.fullscreen=new c.FullScreen(this.container)}},printChart:{textKey:"printChart",onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},downloadSVG:{textKey:"downloadSVG",
onclick:function(){this.exportChart({type:"image/svg+xml"})}}}};c.post=function(b,a,c){var d=r("form",p({method:"post",action:b,enctype:"multipart/form-data"},c),{display:"none"},n.body);F(a,function(a,b){r("input",{type:"hidden",name:b,value:a},null,d)});d.submit();E(d)};y(A.prototype,{sanitizeSVG:function(b,a){var c=b.indexOf("\x3c/svg\x3e")+6,d=b.substr(c);b=b.substr(0,c);a&&a.exporting&&a.exporting.allowHTML&&d&&(d='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+a.chart.width+'" height\x3d"'+
a.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+d+"\x3c/body\x3e\x3c/foreignObject\x3e",b=b.replace("\x3c/svg\x3e",d+"\x3c/svg\x3e"));b=b.replace(/zIndex="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+\:)href=/g," xlink:href\x3d").replace(/\n/," ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,
'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");this.ieSanitizeSVG&&(b=this.ieSanitizeSVG(b));return b},getChartHTML:function(){this.styledMode&&this.inlineStyles();return this.container.innerHTML},getSVG:function(b){var a,u,d,f,m,k=p(this.options,b);u=r("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},n.body);d=this.renderTo.style.width;m=this.renderTo.style.height;d=k.exporting.sourceWidth||k.chart.width||
/px$/.test(d)&&parseInt(d,10)||(k.isGantt?800:600);m=k.exporting.sourceHeight||k.chart.height||/px$/.test(m)&&parseInt(m,10)||400;y(k.chart,{animation:!1,renderTo:u,forExport:!0,renderer:"SVGRenderer",width:d,height:m});k.exporting.enabled=!1;delete k.data;k.series=[];this.series.forEach(function(a){f=p(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});f.isInternal||k.series.push(f)});this.axes.forEach(function(a){a.userOptions.internalKey||(a.userOptions.internalKey=
c.uniqueKey())});a=new c.Chart(k,this.callback);b&&["xAxis","yAxis","series"].forEach(function(d){var c={};b[d]&&(c[d]=b[d],a.update(c))});this.axes.forEach(function(b){var d=c.find(a.axes,function(a){return a.options.internalKey===b.userOptions.internalKey}),e=b.getExtremes(),u=e.userMin,e=e.userMax;d&&(void 0!==u&&u!==d.min||void 0!==e&&e!==d.max)&&d.setExtremes(u,e,!0,!1)});d=a.getChartHTML();D(this,"getSVG",{chartCopy:a});d=this.sanitizeSVG(d,k);k=null;a.destroy();E(u);return d},getSVGForExport:function(b,
a){var c=this.options.exporting;return this.getSVG(p({chart:{borderRadius:0}},c.chartOptions,a,{exporting:{sourceWidth:b&&b.sourceWidth||c.sourceWidth,sourceHeight:b&&b.sourceHeight||c.sourceHeight}}))},getFilename:function(){var b=this.userOptions.title&&this.userOptions.title.text,a=this.options.exporting.filename;if(a)return a;"string"===typeof b&&(a=b.toLowerCase().replace(/<\/?[^>]+(>|$)/g,"").replace(/[\s_]+/g,"-").replace(/[^a-z0-9\-]/g,"").replace(/^[\-]+/g,"").replace(/[\-]+/g,"-").substr(0,
24).replace(/[\-]+$/g,""));if(!a||5>a.length)a="chart";return a},exportChart:function(b,a){a=this.getSVGForExport(b,a);b=p(this.options.exporting,b);c.post(b.url,{filename:b.filename||this.getFilename(),type:b.type,width:b.width||0,scale:b.scale,svg:a},b.formAttributes)},print:function(){function b(b){(a.fixedDiv?[a.fixedDiv,a.scrollingContainer]:[a.container]).forEach(function(a){b.appendChild(a)})}var a=this,c=[],d=n.body,f=d.childNodes,m=a.options.exporting.printMaxWidth,k,e;if(!a.isPrinting){a.isPrinting=
!0;a.pointer.reset(null,0);D(a,"beforePrint");if(e=m&&a.chartWidth>m)k=[a.options.chart.width,void 0,!1],a.setSize(m,void 0,!1);[].forEach.call(f,function(a,b){1===a.nodeType&&(c[b]=a.style.display,a.style.display="none")});b(d);setTimeout(function(){z.focus();z.print();setTimeout(function(){b(a.renderTo);[].forEach.call(f,function(a,b){1===a.nodeType&&(a.style.display=c[b])});a.isPrinting=!1;e&&a.setSize.apply(a,k);D(a,"afterPrint")},1E3)},1)}},contextMenu:function(b,a,u,d,f,m,k){var e=this,x=e.options.navigation,
l=e.chartWidth,q=e.chartHeight,h="cache-"+b,g=e[h],B=Math.max(f,m),p;g||(e.exportContextMenu=e[h]=g=r("div",{className:b},{position:"absolute",zIndex:1E3,padding:B+"px",pointerEvents:"auto"},e.fixedDiv||e.container),p=r("div",{className:"highcharts-menu"},null,g),e.styledMode||w(p,y({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},x.menuStyle)),g.hideMenu=function(){w(g,{display:"none"});k&&k.setState(0);e.openMenu=!1;c.clearTimeout(g.hideTimer);
D(e,"exportMenuHidden")},e.exportEvents.push(v(g,"mouseleave",function(){g.hideTimer=setTimeout(g.hideMenu,500)}),v(g,"mouseenter",function(){c.clearTimeout(g.hideTimer)}),v(n,"mouseup",function(a){e.pointer.inClass(a.target,b)||g.hideMenu()}),v(g,"click",function(){e.openMenu&&g.hideMenu()})),a.forEach(function(a){"string"===typeof a&&(a=e.options.exporting.menuItemDefinitions[a]);if(c.isObject(a,!0)){var b;a.separator?b=r("hr",null,null,p):(b=r("div",{className:"highcharts-menu-item",onclick:function(b){b&&
b.stopPropagation();g.hideMenu();a.onclick&&a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},null,p),e.styledMode||(b.onmouseover=function(){w(this,x.menuItemHoverStyle)},b.onmouseout=function(){w(this,x.menuItemStyle)},w(b,y({cursor:"pointer"},x.menuItemStyle))));e.exportDivElements.push(b)}}),e.exportDivElements.push(p,g),e.exportMenuWidth=g.offsetWidth,e.exportMenuHeight=g.offsetHeight);a={display:"block"};u+e.exportMenuWidth>l?a.right=l-u-f-B+"px":a.left=u-B+"px";d+m+
e.exportMenuHeight>q&&"top"!==k.alignOptions.verticalAlign?a.bottom=q-d-B+"px":a.top=d+m-B+"px";w(g,a);e.openMenu=!0},addButton:function(b){var a=this,c=a.renderer,d=p(a.options.navigation.buttonOptions,b),f=d.onclick,m=d.menuItems,k,e,h=d.symbolSize||12;a.btnCount||(a.btnCount=0);a.exportDivElements||(a.exportDivElements=[],a.exportSVGElements=[]);if(!1!==d.enabled){var l=d.theme,q=l.states,n=q&&q.hover,q=q&&q.select,g;a.styledMode||(l.fill=t(l.fill,"#ffffff"),l.stroke=t(l.stroke,"none"));delete l.states;
f?g=function(b){b&&b.stopPropagation();f.call(a,b)}:m&&(g=function(b){b&&b.stopPropagation();a.contextMenu(e.menuClassName,m,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});d.text&&d.symbol?l.paddingLeft=t(l.paddingLeft,25):d.text||y(l,{width:d.width,height:d.height,padding:0});a.styledMode||(l["stroke-linecap"]="round",l.fill=t(l.fill,"#ffffff"),l.stroke=t(l.stroke,"none"));e=c.button(d.text,0,0,g,l,n,q).addClass(b.className).attr({title:t(a.options.lang[d._titleKey||d.titleKey],"")});
e.menuClassName=b.menuClassName||"highcharts-menu-"+a.btnCount++;d.symbol&&(k=c.symbol(d.symbol,d.symbolX-h/2,d.symbolY-h/2,h,h,{width:h,height:h}).addClass("highcharts-button-symbol").attr({zIndex:1}).add(e),a.styledMode||k.attr({stroke:d.symbolStroke,fill:d.symbolFill,"stroke-width":d.symbolStrokeWidth||1}));e.add(a.exportingGroup).align(y(d,{width:e.width,x:t(d.x,a.buttonOffset)}),!0,"spacingBox");a.buttonOffset+=(e.width+d.buttonSpacing)*("right"===d.align?-1:1);a.exportSVGElements.push(e,k)}},
destroyExport:function(b){var a=b?b.target:this;b=a.exportSVGElements;var f=a.exportDivElements,d=a.exportEvents,h;b&&(b.forEach(function(b,d){b&&(b.onclick=b.ontouchstart=null,h="cache-"+b.menuClassName,a[h]&&delete a[h],a.exportSVGElements[d]=b.destroy())}),b.length=0);a.exportingGroup&&(a.exportingGroup.destroy(),delete a.exportingGroup);f&&(f.forEach(function(b,d){c.clearTimeout(b.hideTimer);C(b,"mouseleave");a.exportDivElements[d]=b.onmouseout=b.onmouseover=b.ontouchstart=b.onclick=null;E(b)}),
f.length=0);d&&(d.forEach(function(b){b()}),d.length=0)}});G.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");G.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/,/^length$/];G.prototype.unstyledElements=["clipPath","defs","desc"];A.prototype.inlineStyles=function(){function b(b){return b.replace(/([A-Z])/g,function(b,a){return"-"+a.toLowerCase()})}
function a(c){function u(a,g){q=v=!1;if(h){for(r=h.length;r--&&!v;)v=h[r].test(g);q=!v}"transform"===g&&"none"===a&&(q=!0);for(r=f.length;r--&&!q;)q=f[r].test(g)||"function"===typeof a;q||m[g]===a&&"svg"!==c.nodeName||e[c.nodeName][g]===a||(-1!==d.indexOf(g)?c.setAttribute(b(g),a):n+=b(g)+":"+a+";")}var g,m,n="",t,q,v,r;if(1===c.nodeType&&-1===k.indexOf(c.nodeName)){g=z.getComputedStyle(c,null);m="svg"===c.nodeName?{}:z.getComputedStyle(c.parentNode,null);e[c.nodeName]||(x=l.getElementsByTagName("svg")[0],
t=l.createElementNS(c.namespaceURI,c.nodeName),x.appendChild(t),e[c.nodeName]=p(z.getComputedStyle(t,null)),"text"===c.nodeName&&delete e.text.fill,x.removeChild(t));if(L||K)for(var w in g)u(g[w],w);else F(g,u);n&&(g=c.getAttribute("style"),c.setAttribute("style",(g?g+";":"")+n));"svg"===c.nodeName&&c.setAttribute("stroke-width","1px");"text"!==c.nodeName&&[].forEach.call(c.children||c.childNodes,a)}}var c=this.renderer,d=c.inlineToAttributes,f=c.inlineBlacklist,h=c.inlineWhitelist,k=c.unstyledElements,
e={},x,l,c=n.createElement("iframe");w(c,{width:"1px",height:"1px",visibility:"hidden"});n.body.appendChild(c);l=c.contentWindow.document;l.open();l.write('\x3csvg xmlns\x3d"http://www.w3.org/2000/svg"\x3e\x3c/svg\x3e');l.close();a(this.container.querySelector("svg"));x.parentNode.removeChild(x)};I.menu=function(b,a,c,d){return["M",b,a+2.5,"L",b+c,a+2.5,"M",b,a+d/2+.5,"L",b+c,a+d/2+.5,"M",b,a+d-1.5,"L",b+c,a+d-1.5]};I.menuball=function(b,a,c,d){b=[];d=d/3-2;return b=b.concat(this.circle(c-d,a,d,d),
this.circle(c-d,a+d+4,d,d),this.circle(c-d,a+2*(d+4),d,d))};A.prototype.renderExporting=function(){var b=this,a=b.options.exporting,c=a.buttons,d=b.isDirtyExporting||!b.exportSVGElements;b.buttonOffset=0;b.isDirtyExporting&&b.destroyExport();d&&!1!==a.enabled&&(b.exportEvents=[],b.exportingGroup=b.exportingGroup||b.renderer.g("exporting-group").attr({zIndex:3}).add(),F(c,function(a){b.addButton(a)}),b.isDirtyExporting=!1);v(b,"destroy",b.destroyExport)};v(A,"init",function(){var b=this;b.exporting=
{update:function(a,c){b.isDirtyExporting=!0;p(!0,b.options.exporting,a);t(c,!0)&&b.redraw()}};f.addUpdate(function(a,c){b.isDirtyExporting=!0;p(!0,b.options.navigation,a);t(c,!0)&&b.redraw()},b)});A.prototype.callbacks.push(function(b){b.renderExporting();v(b,"redraw",b.renderExporting)})});h(f,"masters/modules/exporting.src.js",[],function(){})});


/*******************************************************************************\
****** @genbarr - CODIGO DE BARRAS ********************************************************
\*******************************************************************************/

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(e.toString()).default:"object"==typeof exports?exports.Quagga=e(e.toString()).default:t.Quagga=e(e.toString()).default}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=166)}([function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(t,e,n){"use strict";function r(t,e){return this._row=[],this.config=t||{},this.supplements=e,this}var o=n(3);r.prototype._nextUnset=function(t,e){var n;for(void 0===e&&(e=0),n=e;n<t.length;n++)if(!t[n])return n;return t.length},r.prototype._matchPattern=function(t,e,n){var r,o,i,a,u=0,c=0,s=0,f=0;for(n=n||this.SINGLE_CODE_ERROR||1,r=0;r<t.length;r++)s+=t[r],f+=e[r];if(s<f)return Number.MAX_VALUE;for(o=s/f,n*=o,r=0;r<t.length;r++){if(i=t[r],a=e[r]*o,(c=Math.abs(i-a)/a)>n)return Number.MAX_VALUE;u+=c}return u/f},r.prototype._nextSet=function(t,e){var n;for(e=e||0,n=e;n<t.length;n++)if(t[n])return n;return t.length},r.prototype._correctBars=function(t,e,n){for(var r=n.length,o=0;r--;)(o=t[n[r]]*(1-(1-e)/2))>1&&(t[n[r]]=o)},r.prototype._matchTrace=function(t,e){var n,r,o=[],i=this,a=i._nextSet(i._row),u=!i._row[a],c=0,s={error:Number.MAX_VALUE,code:-1,start:0};if(t){for(n=0;n<t.length;n++)o.push(0);for(n=a;n<i._row.length;n++)if(i._row[n]^u)o[c]++;else{if(c===o.length-1)return r=i._matchPattern(o,t),r<e?(s.start=n-a,s.end=n,s.counter=o,s):null;c++,o[c]=1,u=!u}}else for(o.push(0),n=a;n<i._row.length;n++)i._row[n]^u?o[c]++:(c++,o.push(0),o[c]=1,u=!u);return s.start=a,s.end=i._row.length-1,s.counter=o,s},r.prototype.decodePattern=function(t){var e,n=this;return n._row=t,e=n._decode(),null===e?(n._row.reverse(),(e=n._decode())&&(e.direction=r.DIRECTION.REVERSE,e.start=n._row.length-e.start,e.end=n._row.length-e.end)):e.direction=r.DIRECTION.FORWARD,e&&(e.format=n.FORMAT),e},r.prototype._matchRange=function(t,e,n){var r;for(t=t<0?0:t,r=t;r<e;r++)if(this._row[r]!==n)return!1;return!0},r.prototype._fillCounters=function(t,e,n){var r,o=this,i=0,a=[];for(n=void 0===n||n,t=void 0!==t?t:o._nextUnset(o._row),e=e||o._row.length,a[i]=0,r=t;r<e;r++)o._row[r]^n?a[i]++:(i++,a[i]=1,n=!n);return a},r.prototype._toCounters=function(t,e){var n,r=this,i=e.length,a=r._row.length,u=!r._row[t],c=0;for(o.a.init(e,0),n=t;n<a;n++)if(r._row[n]^u)e[c]++;else{if(++c===i)break;e[c]=1,u=!u}return e},Object.defineProperty(r.prototype,"FORMAT",{value:"unknown",writeable:!1}),r.DIRECTION={FORWARD:1,REVERSE:-1},r.Exception={StartNotFoundException:"Start-Info was not found!",CodeNotFoundException:"Code could not be found!",PatternNotFoundException:"Pattern could not be found!"},r.CONFIG_KEYS={},e.a=r},function(t,e){var n=Array.isArray;t.exports=n},function(t,e,n){"use strict";e.a={init:function(t,e){for(var n=t.length;n--;)t[n]=e},shuffle:function(t){var e,n,r=t.length-1;for(r;r>=0;r--)e=Math.floor(Math.random()*r),n=t[r],t[r]=t[e],t[e]=n;return t},toPointList:function(t){var e,n,r=[],o=[];for(e=0;e<t.length;e++){for(r=[],n=0;n<t[e].length;n++)r[n]=t[e][n];o[e]="["+r.join(",")+"]"}return"["+o.join(",\r\n")+"]"},threshold:function(t,e,n){var r,o=[];for(r=0;r<t.length;r++)n.apply(t,[t[r]])>=e&&o.push(t[r]);return o},maxIndex:function(t){var e,n=0;for(e=0;e<t.length;e++)t[e]>t[n]&&(n=e);return n},max:function t(e){var n,t=0;for(n=0;n<e.length;n++)e[n]>t&&(t=e[n]);return t},sum:function t(e){for(var n=e.length,t=0;n--;)t+=e[n];return t}}},function(t,e,n){"use strict";function r(t,e){t=a()(o(),t),u.a.call(this,t,e)}function o(){var t={};return Object.keys(r.CONFIG_KEYS).forEach(function(e){t[e]=r.CONFIG_KEYS[e].default}),t}var i=n(28),a=n.n(i),u=n(1),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},s={CODE_L_START:{value:0},CODE_G_START:{value:10},START_PATTERN:{value:[1,1,1]},STOP_PATTERN:{value:[1,1,1]},MIDDLE_PATTERN:{value:[1,1,1,1,1]},EXTENSION_START_PATTERN:{value:[1,1,2]},CODE_PATTERN:{value:[[3,2,1,1],[2,2,2,1],[2,1,2,2],[1,4,1,1],[1,1,3,2],[1,2,3,1],[1,1,1,4],[1,3,1,2],[1,2,1,3],[3,1,1,2],[1,1,2,3],[1,2,2,2],[2,2,1,2],[1,1,4,1],[2,3,1,1],[1,3,2,1],[4,1,1,1],[2,1,3,1],[3,1,2,1],[2,1,1,3]]},CODE_FREQUENCY:{value:[0,11,13,14,19,25,28,21,22,26]},SINGLE_CODE_ERROR:{value:.7},AVG_CODE_ERROR:{value:.48},FORMAT:{value:"ean_13",writeable:!1}};r.prototype=Object.create(u.a.prototype,s),r.prototype.constructor=r,r.prototype._decodeCode=function(t,e){var n,r,o,i=[0,0,0,0],a=this,u=t,c=!a._row[u],s=0,f={error:Number.MAX_VALUE,code:-1,start:t,end:t};for(e||(e=a.CODE_PATTERN.length),n=u;n<a._row.length;n++)if(a._row[n]^c)i[s]++;else{if(s===i.length-1){for(r=0;r<e;r++)(o=a._matchPattern(i,a.CODE_PATTERN[r]))<f.error&&(f.code=r,f.error=o);return f.end=n,f.error>a.AVG_CODE_ERROR?null:f}s++,i[s]=1,c=!c}return null},r.prototype._findPattern=function(t,e,n,r,o){var i,a,u,c,s=[],f=this,l=0,d={error:Number.MAX_VALUE,code:-1,start:0,end:0};for(e||(e=f._nextSet(f._row)),void 0===n&&(n=!1),void 0===r&&(r=!0),void 0===o&&(o=f.AVG_CODE_ERROR),i=0;i<t.length;i++)s[i]=0;for(i=e;i<f._row.length;i++)if(f._row[i]^n)s[l]++;else{if(l===s.length-1){for(c=0,u=0;u<s.length;u++)c+=s[u];if((a=f._matchPattern(s,t))<o)return d.error=a,d.start=i-c,d.end=i,d;if(!r)return null;for(u=0;u<s.length-2;u++)s[u]=s[u+2];s[s.length-2]=0,s[s.length-1]=0,l--}else l++;s[l]=1,n=!n}return null},r.prototype._findStart=function(){for(var t,e,n=this,r=n._nextSet(n._row);!e;){if(!(e=n._findPattern(n.START_PATTERN,r)))return null;if((t=e.start-(e.end-e.start))>=0&&n._matchRange(t,e.start,0))return e;r=e.end,e=null}},r.prototype._verifyTrailingWhitespace=function(t){var e,n=this;return e=t.end+(t.end-t.start),e<n._row.length&&n._matchRange(t.end,e,0)?t:null},r.prototype._findEnd=function(t,e){var n=this,r=n._findPattern(n.STOP_PATTERN,t,e,!1);return null!==r?n._verifyTrailingWhitespace(r):null},r.prototype._calculateFirstDigit=function(t){var e,n=this;for(e=0;e<n.CODE_FREQUENCY.length;e++)if(t===n.CODE_FREQUENCY[e])return e;return null},r.prototype._decodePayload=function(t,e,n){var r,o,i=this,a=0;for(r=0;r<6;r++){if(!(t=i._decodeCode(t.end)))return null;t.code>=i.CODE_G_START?(t.code=t.code-i.CODE_G_START,a|=1<<5-r):a|=0<<5-r,e.push(t.code),n.push(t)}if(null===(o=i._calculateFirstDigit(a)))return null;if(e.unshift(o),null===(t=i._findPattern(i.MIDDLE_PATTERN,t.end,!0,!1)))return null;for(n.push(t),r=0;r<6;r++){if(!(t=i._decodeCode(t.end,i.CODE_G_START)))return null;n.push(t),e.push(t.code)}return t},r.prototype._decode=function(){var t,e,n=this,r=[],o=[],i={};if(!(t=n._findStart()))return null;if(e={code:t.code,start:t.start,end:t.end},o.push(e),!(e=n._decodePayload(e,r,o)))return null;if(!(e=n._findEnd(e.end,!1)))return null;if(o.push(e),!n._checksum(r))return null;if(this.supplements.length>0){var a=this._decodeExtensions(e.end);if(!a)return null;var u=a.decodedCodes[a.decodedCodes.length-1],s={start:u.start+((u.end-u.start)/2|0),end:u.end};if(!n._verifyTrailingWhitespace(s))return null;i={supplement:a,code:r.join("")+a.code}}return c({code:r.join(""),start:t.start,end:e.end,codeset:"",startInfo:t,decodedCodes:o},i)},r.prototype._decodeExtensions=function(t){var e,n,r=this._nextSet(this._row,t),o=this._findPattern(this.EXTENSION_START_PATTERN,r,!1,!1);if(null===o)return null;for(e=0;e<this.supplements.length;e++)if(null!==(n=this.supplements[e].decode(this._row,o.end)))return{code:n.code,start:r,startInfo:o,end:n.end,codeset:"",decodedCodes:n.decodedCodes};return null},r.prototype._checksum=function(t){var e,n=0;for(e=t.length-2;e>=0;e-=2)n+=t[e];for(n*=3,e=t.length-1;e>=0;e-=2)n+=t[e];return n%10==0},r.CONFIG_KEYS={supplements:{type:"arrayOf(string)",default:[],description:"Allowed extensions to be decoded (2 and/or 5)"}},e.a=r},function(t,e,n){var r=n(38),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e){function n(t){var e=new Float32Array(2);return e[0]=t[0],e[1]=t[1],e}t.exports=n},function(t,e,n){function r(t){return null==t?void 0===t?c:u:s&&s in Object(t)?i(t):a(t)}var o=n(11),i=n(119),a=n(146),u="[object Null]",c="[object Undefined]",s=o?o.toStringTag:void 0;t.exports=r},function(t,e,n){"use strict";e.a={drawRect:function(t,e,n,r){n.strokeStyle=r.color,n.fillStyle=r.color,n.lineWidth=1,n.beginPath(),n.strokeRect(t.x,t.y,e.x,e.y)},drawPath:function(t,e,n,r){n.strokeStyle=r.color,n.fillStyle=r.color,n.lineWidth=r.lineWidth,n.beginPath(),n.moveTo(t[0][e.x],t[0][e.y]);for(var o=1;o<t.length;o++)n.lineTo(t[o][e.x],t[o][e.y]);n.closePath(),n.stroke()},drawImage:function(t,e,n){var r,o=n.getImageData(0,0,e.x,e.y),i=o.data,a=t.length,u=i.length;if(u/a!=4)return!1;for(;a--;)r=t[a],i[--u]=255,i[--u]=r,i[--u]=r,i[--u]=r;return n.putImageData(o,0,0),!0}}},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(133),i=n(134),a=n(135),u=n(136),c=n(137);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=u,r.prototype.set=c,t.exports=r},function(t,e,n){var r=n(5),o=r.Symbol;t.exports=o},function(t,e,n){function r(t,e){for(var n=t.length;n--;)if(o(t[n][0],e))return n;return-1}var o=n(17);t.exports=r},function(t,e,n){function r(t,e){return o(t)?t:i(t,e)?[t]:a(u(t))}var o=n(2),i=n(130),a=n(154),u=n(165);t.exports=r},function(t,e,n){function r(t,e){var n=t.__data__;return o(e)?n["string"==typeof e?"string":"hash"]:n.map}var o=n(131);t.exports=r},function(t,e){function n(t,e){return!!(e=null==e?r:e)&&("number"==typeof t||o.test(t))&&t>-1&&t%1==0&&t<e}var r=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=n},function(t,e,n){var r=n(22),o=r(Object,"create");t.exports=o},function(t,e){function n(t,e){return t===e||t!==t&&e!==e}t.exports=n},function(t,e,n){var r=n(96),o=n(6),i=Object.prototype,a=i.hasOwnProperty,u=i.propertyIsEnumerable,c=r(function(){return arguments}())?r:function(t){return o(t)&&a.call(t,"callee")&&!u.call(t,"callee")};t.exports=c},function(t,e,n){"use strict";function r(t,e){return{x:t,y:e,toVec2:function(){return b.clone([this.x,this.y])},toVec3:function(){return E.clone([this.x,this.y,1])},round:function(){return this.x=this.x>0?Math.floor(this.x+.5):Math.floor(this.x-.5),this.y=this.y>0?Math.floor(this.y+.5):Math.floor(this.y-.5),this}}}function o(t,e,n){n||(n=t);for(var r=t.data,o=r.length,i=n.data;o--;)i[o]=r[o]<e?1:0}function i(t,e){e||(e=8);for(var n=t.data,r=n.length,o=8-e,i=1<<e,a=new Int32Array(i);r--;)a[n[r]>>o]++;return a}function a(t,e){function n(t,e){var n,r=0;for(n=t;n<=e;n++)r+=a[n];return r}function r(t,e){var n,r=0;for(n=t;n<=e;n++)r+=n*a[n];return r}function o(){var o,u,c,s,f,l,d,h=[0],p=(1<<e)-1;for(a=i(t,e),s=1;s<p;s++)o=n(0,s),u=n(s+1,p),c=o*u,0===c&&(c=1),f=r(0,s)*u,l=r(s+1,p)*o,d=f-l,h[s]=d*d/c;return x.a.maxIndex(h)}e||(e=8);var a,u=8-e;return o()<<u}function u(t,e){var n=a(t);return o(t,n,e),n}function c(t,e,n){function r(t){var e=!1;for(i=0;i<c.length;i++)a=c[i],a.fits(t)&&(a.add(t),e=!0);return e}var o,i,a,u,c=[];for(n||(n="rad"),o=0;o<t.length;o++)u=m.a.createPoint(t[o],o,n),r(u)||c.push(m.a.create(u,e));return c}function s(t,e,n){var r,o,i,a,u=0,c=0,s=[];for(r=0;r<e;r++)s[r]={score:0,item:null};for(r=0;r<t.length;r++)if((o=n.apply(this,[t[r]]))>c)for(i=s[u],i.score=o,i.item=t[r],c=Number.MAX_VALUE,a=0;a<e;a++)s[a].score<c&&(c=s[a].score,u=a);return s}function f(t,e,n){for(var r,o=0,i=e.x,a=Math.floor(t.length/4),u=e.x/2,c=0,s=e.x;i<a;){for(r=0;r<u;r++)n[c]=(.299*t[4*o+0]+.587*t[4*o+1]+.114*t[4*o+2]+(.299*t[4*(o+1)+0]+.587*t[4*(o+1)+1]+.114*t[4*(o+1)+2])+(.299*t[4*i+0]+.587*t[4*i+1]+.114*t[4*i+2])+(.299*t[4*(i+1)+0]+.587*t[4*(i+1)+1]+.114*t[4*(i+1)+2]))/4,c++,o+=2,i+=2;o+=s,i+=s}}function l(t,e,n){var r,o=t.length/4|0;if(n&&n.singleChannel===!0)for(r=0;r<o;r++)e[r]=t[4*r+0];else for(r=0;r<o;r++)e[r]=.299*t[4*r+0]+.587*t[4*r+1]+.114*t[4*r+2]}function d(t,e){for(var n=t.data,r=t.size.x,o=e.data,i=0,a=r,u=n.length,c=r/2,s=0;a<u;){for(var f=0;f<c;f++)o[s]=Math.floor((n[i]+n[i+1]+n[a]+n[a+1])/4),s++,i+=2,a+=2;i+=r,a+=r}}function h(t,e){var n=t[0],r=t[1],o=t[2],i=o*r,a=i*(1-Math.abs(n/60%2-1)),u=o-i,c=0,s=0,f=0;return e=e||[0,0,0],n<60?(c=i,s=a):n<120?(c=a,s=i):n<180?(s=i,f=a):n<240?(s=a,f=i):n<300?(c=a,f=i):n<360&&(c=i,f=a),e[0]=255*(c+u)|0,e[1]=255*(s+u)|0,e[2]=255*(f+u)|0,e}function p(t){var e,n=[],r=[];for(e=1;e<Math.sqrt(t)+1;e++)t%e==0&&(r.push(e),e!==t/e&&n.unshift(Math.floor(t/e)));return r.concat(n)}function v(t,e){for(var n=0,r=0,o=[];n<t.length&&r<e.length;)t[n]===e[r]?(o.push(t[n]),n++,r++):t[n]>e[r]?r++:n++;return o}function _(t,e){function n(t){for(var e=0,n=t[Math.floor(t.length/2)];e<t.length-1&&t[e]<d;)e++;return e>0&&(n=Math.abs(t[e]-d)>Math.abs(t[e-1]-d)?t[e-1]:t[e]),d/n<c[f+1]/c[f]&&d/n>c[f-1]/c[f]?{x:n,y:n}:null}var r,o=p(e.x),i=p(e.y),a=Math.max(e.x,e.y),u=v(o,i),c=[8,10,15,20,32,60,80],s={"x-small":5,small:4,medium:3,large:2,"x-large":1},f=s[t]||s.medium,l=c[f],d=Math.floor(a/l);return r=n(u),r||(r=n(p(a)))||(r=n(p(d*l))),r}function g(t){return{value:parseFloat(t),unit:(t.indexOf("%"),t.length,"%")}}function y(t,e,n){var r={width:t,height:e},o=Object.keys(n).reduce(function(t,e){var o=n[e],i=g(o),a=C[e](i,r);return t[e]=a,t},{});return{sx:o.left,sy:o.top,sw:o.right-o.left,sh:o.bottom-o.top}}var m=n(50),x=n(3);e.b=r,e.f=u,e.g=c,e.h=s,e.c=f,e.d=l,e.i=d,e.a=h,e.e=_,e.j=y;var b={clone:n(7)},E={clone:n(83)},C={top:function(t,e){if("%"===t.unit)return Math.floor(e.height*(t.value/100))},right:function(t,e){if("%"===t.unit)return Math.floor(e.width-e.width*(t.value/100))},bottom:function(t,e){if("%"===t.unit)return Math.floor(e.height-e.height*(t.value/100))},left:function(t,e){if("%"===t.unit)return Math.floor(e.width*(t.value/100))}}},function(t,e,n){"use strict";function r(t,e,n,r){e?this.data=e:n?(this.data=new n(t.x*t.y),n===Array&&r&&a.a.init(this.data,0)):(this.data=new Uint8Array(t.x*t.y),Uint8Array===Array&&r&&a.a.init(this.data,0)),this.size=t}var o=n(53),i=n(19),a=n(3),u={clone:n(7)};r.prototype.inImageWithBorder=function(t,e){return t.x>=e&&t.y>=e&&t.x<this.size.x-e&&t.y<this.size.y-e},r.sample=function(t,e,n){var r=Math.floor(e),o=Math.floor(n),i=t.size.x,a=o*t.size.x+r,u=t.data[a+0],c=t.data[a+1],s=t.data[a+i],f=t.data[a+i+1],l=u-c;return e-=r,n-=o,Math.floor(e*(n*(l-s+f)-l)+n*(s-u)+u)},r.clearArray=function(t){for(var e=t.length;e--;)t[e]=0},r.prototype.subImage=function(t,e){return new o.a(t,e,this)},r.prototype.subImageAsCopy=function(t,e){var n,r,o=t.size.y,i=t.size.x;for(n=0;n<i;n++)for(r=0;r<o;r++)t.data[r*i+n]=this.data[(e.y+r)*this.size.x+e.x+n]},r.prototype.copyTo=function(t){for(var e=this.data.length,n=this.data,r=t.data;e--;)r[e]=n[e]},r.prototype.get=function(t,e){return this.data[e*this.size.x+t]},r.prototype.getSafe=function(t,e){var n;if(!this.indexMapping){for(this.indexMapping={x:[],y:[]},n=0;n<this.size.x;n++)this.indexMapping.x[n]=n,this.indexMapping.x[n+this.size.x]=n;for(n=0;n<this.size.y;n++)this.indexMapping.y[n]=n,this.indexMapping.y[n+this.size.y]=n}return this.data[this.indexMapping.y[e+this.size.y]*this.size.x+this.indexMapping.x[t+this.size.x]]},r.prototype.set=function(t,e,n){return this.data[e*this.size.x+t]=n,this},r.prototype.zeroBorder=function(){var t,e=this.size.x,n=this.size.y,r=this.data;for(t=0;t<e;t++)r[t]=r[(n-1)*e+t]=0;for(t=1;t<n-1;t++)r[t*e]=r[t*e+(e-1)]=0},r.prototype.invert=function(){for(var t=this.data,e=t.length;e--;)t[e]=t[e]?0:1},r.prototype.convolve=function(t){var e,n,r,o,i=t.length/2|0,a=0;for(n=0;n<this.size.y;n++)for(e=0;e<this.size.x;e++){for(a=0,o=-i;o<=i;o++)for(r=-i;r<=i;r++)a+=t[o+i][r+i]*this.getSafe(e+r,n+o);this.data[n*this.size.x+e]=a}},r.prototype.moments=function(t){var e,n,r,o,i,a,c,s,f,l,d,h,p=this.data,v=this.size.y,_=this.size.x,g=[],y=[],m=Math.PI,x=m/4;if(t<=0)return y;for(i=0;i<t;i++)g[i]={m00:0,m01:0,m10:0,m11:0,m02:0,m20:0,theta:0,rad:0};for(n=0;n<v;n++)for(o=n*n,e=0;e<_;e++)(r=p[n*_+e])>0&&(a=g[r-1],a.m00+=1,a.m01+=n,a.m10+=e,a.m11+=e*n,a.m02+=o,a.m20+=e*e);for(i=0;i<t;i++)a=g[i],isNaN(a.m00)||0===a.m00||(l=a.m10/a.m00,d=a.m01/a.m00,c=a.m11/a.m00-l*d,s=a.m02/a.m00-d*d,f=a.m20/a.m00-l*l,h=(s-f)/(2*c),h=.5*Math.atan(h)+(c>=0?x:-x)+m,a.theta=(180*h/m+90)%180-90,a.theta<0&&(a.theta+=180),a.rad=h>m?h-m:h,a.vec=u.clone([Math.cos(h),Math.sin(h)]),y.push(a));return y},r.prototype.show=function(t,e){var n,r,o,i,a,u,c;for(e||(e=1),n=t.getContext("2d"),t.width=this.size.x,t.height=this.size.y,r=n.getImageData(0,0,t.width,t.height),o=r.data,i=0,c=0;c<this.size.y;c++)for(u=0;u<this.size.x;u++)a=c*this.size.x+u,i=this.get(u,c)*e,o[4*a+0]=i,o[4*a+1]=i,o[4*a+2]=i,o[4*a+3]=255;n.putImageData(r,0,0)},r.prototype.overlay=function(t,e,r){(!e||e<0||e>360)&&(e=360);for(var o=[0,1,1],a=[0,0,0],u=[255,255,255],c=[0,0,0],s=[],f=t.getContext("2d"),l=f.getImageData(r.x,r.y,this.size.x,this.size.y),d=l.data,h=this.data.length;h--;)o[0]=this.data[h]*e,s=o[0]<=0?u:o[0]>=360?c:n.i(i.a)(o,a),d[4*h+0]=s[0],d[4*h+1]=s[1],d[4*h+2]=s[2],d[4*h+3]=255;f.putImageData(l,r.x,r.y)},e.a=r},function(t,e,n){function r(t,e,n){"__proto__"==e&&o?o(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}var o=n(37);t.exports=r},function(t,e,n){function r(t,e){var n=i(t,e);return o(n)?n:void 0}var o=n(97),i=n(120);t.exports=r},function(t,e,n){function r(t){if("string"==typeof t||o(t))return t;var e=t+"";return"0"==e&&1/t==-i?"-0":e}var o=n(27),i=1/0;t.exports=r},function(t,e,n){function r(t){return null!=t&&i(t.length)&&!o(t)}var o=n(25),i=n(26);t.exports=r},function(t,e,n){function r(t){if(!i(t))return!1;var e=o(t);return e==u||e==c||e==a||e==s}var o=n(8),i=n(0),a="[object AsyncFunction]",u="[object Function]",c="[object GeneratorFunction]",s="[object Proxy]";t.exports=r},function(t,e){function n(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}var r=9007199254740991;t.exports=n},function(t,e,n){function r(t){return"symbol"==typeof t||i(t)&&o(t)==a}var o=n(8),i=n(6),a="[object Symbol]";t.exports=r},function(t,e,n){var r=n(100),o=n(116),i=o(function(t,e,n){r(t,e,n)});t.exports=i},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";var r={searchDirections:[[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]],create:function(t,e){function n(t,e,n,r){var o,f,l;for(o=0;o<7;o++){if(f=t.cy+c[t.dir][0],l=t.cx+c[t.dir][1],i=f*s+l,a[i]===e&&(0===u[i]||u[i]===n))return u[i]=n,t.cy=f,t.cx=l,!0;0===u[i]&&(u[i]=r),t.dir=(t.dir+1)%8}return!1}function r(t,e,n){return{dir:n,x:t,y:e,next:null,prev:null}}function o(t,e,o,i,a){var u,c,s,f=null,l={cx:e,cy:t,dir:0};if(n(l,i,o,a)){f=r(e,t,l.dir),u=f,s=l.dir,c=r(l.cx,l.cy,0),c.prev=u,u.next=c,c.next=null,u=c;do l.dir=(l.dir+6)%8,n(l,i,o,a),s!==l.dir?(u.dir=l.dir,c=r(l.cx,l.cy,0),c.prev=u,u.next=c,c.next=null,u=c):(u.dir=s,u.x=l.cx,u.y=l.cy),s=l.dir;while(l.cx!==e||l.cy!==t);f.prev=u.prev,u.prev.next=f}return f}var i,a=t.data,u=e.data,c=this.searchDirections,s=t.size.x;return{trace:function(t,e,r,o){return n(t,e,r,o)},contourTracing:function(t,e,n,r,i){return o(t,e,n,r,i)}}}};e.a=r},function(t,e,n){"use strict";function r(){o.a.call(this)}var o=n(1),i=n(3),a={ALPHABETH_STRING:{value:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%"},ALPHABET:{value:[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,46,32,42,36,47,43,37]},CHARACTER_ENCODINGS:{value:[52,289,97,352,49,304,112,37,292,100,265,73,328,25,280,88,13,268,76,28,259,67,322,19,274,82,7,262,70,22,385,193,448,145,400,208,133,388,196,148,168,162,138,42]},ASTERISK:{value:148},FORMAT:{value:"code_39",writeable:!1}};r.prototype=Object.create(o.a.prototype,a),r.prototype.constructor=r,r.prototype._decode=function(){var t,e,n,r,o=this,a=[0,0,0,0,0,0,0,0,0],u=[],c=o._findStart();if(!c)return null;r=o._nextSet(o._row,c.end);do{if(a=o._toCounters(r,a),(n=o._toPattern(a))<0)return null;if((t=o._patternToChar(n))<0)return null;u.push(t),e=r,r+=i.a.sum(a),r=o._nextSet(o._row,r)}while("*"!==t);return u.pop(),u.length&&o._verifyTrailingWhitespace(e,r,a)?{code:u.join(""),start:c.start,end:r,startInfo:c,decodedCodes:u}:null},r.prototype._verifyTrailingWhitespace=function(t,e,n){var r=i.a.sum(n);return 3*(e-t-r)>=r},r.prototype._patternToChar=function(t){var e,n=this;for(e=0;e<n.CHARACTER_ENCODINGS.length;e++)if(n.CHARACTER_ENCODINGS[e]===t)return String.fromCharCode(n.ALPHABET[e]);return-1},r.prototype._findNextWidth=function(t,e){var n,r=Number.MAX_VALUE;for(n=0;n<t.length;n++)t[n]<r&&t[n]>e&&(r=t[n]);return r},r.prototype._toPattern=function(t){for(var e,n,r=t.length,o=0,i=r,a=0,u=this;i>3;){for(o=u._findNextWidth(t,o),i=0,e=0,n=0;n<r;n++)t[n]>o&&(e|=1<<r-1-n,i++,a+=t[n]);if(3===i){for(n=0;n<r&&i>0;n++)if(t[n]>o&&(i--,2*t[n]>=a))return-1;return e}}return-1},r.prototype._findStart=function(){var t,e,n,r=this,o=r._nextSet(r._row),i=o,a=[0,0,0,0,0,0,0,0,0],u=0,c=!1;for(t=o;t<r._row.length;t++)if(r._row[t]^c)a[u]++;else{if(u===a.length-1){if(r._toPattern(a)===r.ASTERISK&&(n=Math.floor(Math.max(0,i-(t-i)/4)),r._matchRange(n,i,0)))return{start:i,end:t};for(i+=a[0]+a[1],e=0;e<7;e++)a[e]=a[e+2];a[7]=0,a[8]=0,u--}else u++;a[u]=1,c=!c}return null},e.a=r},function(t,e){function n(t,e){return t[0]*e[0]+t[1]*e[1]}t.exports=n},function(t,e,n){var r=n(22),o=n(5),i=r(o,"Map");t.exports=i},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(138),i=n(139),a=n(140),u=n(141),c=n(142);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=u,r.prototype.set=c,t.exports=r},function(t,e,n){function r(t,e,n){(void 0===n||i(t[e],n))&&(void 0!==n||e in t)||o(t,e,n)}var o=n(21),i=n(17);t.exports=r},function(t,e,n){function r(t,e,n){var r=t[e];u.call(t,e)&&i(r,n)&&(void 0!==n||e in t)||o(t,e,n)}var o=n(21),i=n(17),a=Object.prototype,u=a.hasOwnProperty;t.exports=r},function(t,e,n){var r=n(22),o=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(47))},function(t,e,n){var r=n(147),o=r(Object.getPrototypeOf,Object);t.exports=o},function(t,e){function n(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||r)}var r=Object.prototype;t.exports=n},function(t,e,n){function r(t,e,n){return e=i(void 0===e?t.length-1:e,0),function(){for(var r=arguments,a=-1,u=i(r.length-e,0),c=Array(u);++a<u;)c[a]=r[e+a];a=-1;for(var s=Array(e+1);++a<e;)s[a]=r[a];return s[e]=n(c),o(t,this,s)}}var o=n(87),i=Math.max;t.exports=r},function(t,e,n){var r=n(106),o=n(148),i=o(r);t.exports=i},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){(function(t){var r=n(5),o=n(163),i="object"==typeof e&&e&&!e.nodeType&&e,a=i&&"object"==typeof t&&t&&!t.nodeType&&t,u=a&&a.exports===i,c=u?r.Buffer:void 0,s=c?c.isBuffer:void 0,f=s||o;t.exports=f}).call(e,n(29)(t))},function(t,e,n){var r=n(98),o=n(109),i=n(145),a=i&&i.isTypedArray,u=a?o(a):r;t.exports=u},function(t,e,n){function r(t){return a(t)?o(t,!0):i(t)}var o=n(88),i=n(99),a=n(24);t.exports=r},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(e,n,r){"use strict";function o(t){f(t),P=k.a.create($.decoder,S)}function i(t){var e;if("VideoStream"===$.inputStream.type)e=document.createElement("video"),R=H.a.createVideoStream(e);else if("ImageStream"===$.inputStream.type)R=H.a.createImageStream();else if("LiveStream"===$.inputStream.type){var n=a();n&&((e=n.querySelector("video"))||(e=document.createElement("video"),n.appendChild(e))),R=H.a.createLiveStream(e),F.a.request(e,$.inputStream.constraints).then(function(){R.trigger("canrecord")}).catch(function(e){return t(e)})}R.setAttribute("preload","auto"),R.setInputStream($.inputStream),R.addEventListener("canrecord",u.bind(void 0,t))}function a(){var t=$.inputStream.target;if(t&&t.nodeName&&1===t.nodeType)return t;var e="string"==typeof t?t:"#interactive.viewport";return document.querySelector(e)}function u(t){U.a.checkImageConstraints(R,$.locator),s($),w=V.a.create(R,K.dom.image),A($.numOfWorkers,function(){0===$.numOfWorkers&&o(),c(t)})}function c(t){R.play(),t()}function s(){if("undefined"!=typeof document){var t=a();if(K.dom.image=document.querySelector("canvas.imgBuffer"),K.dom.image||(K.dom.image=document.createElement("canvas"),K.dom.image.className="imgBuffer",t&&"ImageStream"===$.inputStream.type&&t.appendChild(K.dom.image)),K.ctx.image=K.dom.image.getContext("2d"),K.dom.image.width=R.getCanvasSize().x,K.dom.image.height=R.getCanvasSize().y,K.dom.overlay=document.querySelector("canvas.drawingBuffer"),!K.dom.overlay){K.dom.overlay=document.createElement("canvas"),K.dom.overlay.className="drawingBuffer",t&&t.appendChild(K.dom.overlay);var e=document.createElement("br");e.setAttribute("clear","all"),t&&t.appendChild(e)}K.ctx.overlay=K.dom.overlay.getContext("2d"),K.dom.overlay.width=R.getCanvasSize().x,K.dom.overlay.height=R.getCanvasSize().y}}function f(t){S=t?t:new j.a({x:R.getWidth(),y:R.getHeight()}),D=[q.clone([0,0]),q.clone([0,S.size.y]),q.clone([S.size.x,S.size.y]),q.clone([S.size.x,0])],U.a.init(S,$.locator)}function l(){return $.locate?U.a.locate():[[q.clone(D[0]),q.clone(D[1]),q.clone(D[2]),q.clone(D[3])]]}function d(t){function e(t){for(var e=t.length;e--;)t[e][0]+=i,t[e][1]+=a}function n(t){t[0].x+=i,t[0].y+=a,t[1].x+=i,t[1].y+=a}var r,o=R.getTopRight(),i=o.x,a=o.y;if(0!==i||0!==a){if(t.barcodes)for(r=0;r<t.barcodes.length;r++)d(t.barcodes[r]);if(t.line&&2===t.line.length&&n(t.line),t.box&&e(t.box),t.boxes&&t.boxes.length>0)for(r=0;r<t.boxes.length;r++)e(t.boxes[r])}}function h(t,e){e&&I&&(t.barcodes?t.barcodes.filter(function(t){return t.codeResult}).forEach(function(t){return h(t,e)}):t.codeResult&&I.addResult(e,R.getCanvasSize(),t.codeResult))}function p(t){return t&&(t.barcodes?t.barcodes.some(function(t){return t.codeResult}):t.codeResult)}function v(t,e){var n=t;t&&Q&&(d(t),h(t,e),n=t.barcodes||t),L.a.publish("processed",n),p(t)&&L.a.publish("detected",n)}function _(){var t,e;e=l(),e?(t=P.decodeFromBoundingBoxes(e),t=t||{},t.boxes=e,v(t,S.data)):v()}function g(){var t;if(Q){if(Y.length>0){if(!(t=Y.filter(function(t){return!t.busy})[0]))return;w.attachData(t.imageData)}else w.attachData(S.data);w.grab()&&(t?(t.busy=!0,t.worker.postMessage({cmd:"process",imageData:t.imageData},[t.imageData.buffer])):_())}else _()}function y(){var t=null,e=1e3/($.frequency||60);T=!1,function n(r){t=t||r,T||(r>=t&&(t+=e,g()),window.requestAnimFrame(n))}(performance.now())}function m(){Q&&"LiveStream"===$.inputStream.type?y():g()}function x(t){var e,n={worker:void 0,imageData:new Uint8Array(R.getWidth()*R.getHeight()),busy:!0};e=C(),n.worker=new Worker(e),n.worker.onmessage=function(r){if("initialized"===r.data.event)return URL.revokeObjectURL(e),n.busy=!1,n.imageData=new Uint8Array(r.data.imageData),t(n);"processed"===r.data.event?(n.imageData=new Uint8Array(r.data.imageData),n.busy=!1,v(r.data.result,n.imageData)):r.data.event},n.worker.postMessage({cmd:"init",size:{x:R.getWidth(),y:R.getHeight()},imageData:n.imageData,config:b($)},[n.imageData.buffer])}function b(t){return X({},t,{inputStream:X({},t.inputStream,{target:null})})}function E(t){function e(t){self.postMessage({event:"processed",imageData:o.data,result:t},[o.data.buffer])}function n(){self.postMessage({event:"initialized",imageData:o.data},[o.data.buffer])}if(t){var r=t().default;if(!r)return void self.postMessage({event:"error",message:"Quagga could not be created"})}var o;self.onmessage=function(t){if("init"===t.data.cmd){var i=t.data.config;i.numOfWorkers=0,o=new r.ImageWrapper({x:t.data.size.x,y:t.data.size.y},new Uint8Array(t.data.imageData)),r.init(i,n,o),r.onProcessed(e)}else"process"===t.data.cmd?(o.data=new Uint8Array(t.data.imageData),r.start()):"setReaders"===t.data.cmd&&r.setReaders(t.data.readers)}}function C(){var e,n;return void 0!==t&&(n=t),e=new Blob(["("+E.toString()+")("+n+");"],{type:"text/javascript"}),window.URL.createObjectURL(e)}function O(t){P?P.setReaders(t):Q&&Y.length>0&&Y.forEach(function(e){e.worker.postMessage({cmd:"setReaders",readers:t})})}function A(t,e){var n=t-Y.length;if(0===n)return e&&e();if(n<0){return Y.slice(n).forEach(function(t){t.worker.terminate()}),Y=Y.slice(0,n),e&&e()}for(var r=function(n){Y.push(n),Y.length>=t&&e&&e()},o=0;o<n;o++)x(r)}Object.defineProperty(n,"__esModule",{value:!0});var R,w,T,S,D,P,I,M=r(28),N=r.n(M),z=r(54),j=(r.n(z),r(20)),U=r(64),k=r(57),L=r(51),F=r(59),W=r(9),B=r(49),G=r(55),H=r(63),V=r(61),X=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},q={clone:r(7)},K={ctx:{image:null,overlay:null},dom:{image:null,overlay:null}},Y=[],Q=!0,$={};n.default={init:function(t,e,n){if($=N()({},G.a,t),n)return Q=!1,o(n),e();i(e)},start:function(){m()},stop:function(){T=!0,A(0),"LiveStream"===$.inputStream.type&&(F.a.release(),R.clearEventHandlers())},pause:function(){T=!0},onDetected:function(t){L.a.subscribe("detected",t)},offDetected:function(t){L.a.unsubscribe("detected",t)},onProcessed:function(t){L.a.subscribe("processed",t)},offProcessed:function(t){L.a.unsubscribe("processed",t)},setReaders:function(t){O(t)},registerResultCollector:function(t){t&&"function"==typeof t.addResult&&(I=t)},canvas:K,decodeSingle:function(t,e){var n=this;t=N()({inputStream:{type:"ImageStream",sequence:!1,size:800,src:t.src},numOfWorkers:1,locator:{halfSample:!1}},t),this.init(t,function(){L.a.once("processed",function(t){n.stop(),e.call(null,t)},!0),m()})},ImageWrapper:j.a,ImageDebug:W.a,ResultCollector:B.a,CameraAccess:F.a}},function(t,e,n){"use strict";function r(t,e){return!!e&&e.some(function(e){return Object.keys(e).every(function(n){return e[n]===t[n]})})}function o(t,e){return"function"!=typeof e||e(t)}var i=n(9);e.a={create:function(t){function e(e){return c&&e&&!r(e,t.blacklist)&&o(e,t.filter)}var n=document.createElement("canvas"),a=n.getContext("2d"),u=[],c=t.capacity||20,s=t.capture===!0;return{addResult:function(t,r,o){var f={};e(o)&&(c--,f.codeResult=o,s&&(n.width=r.x,n.height=r.y,i.a.drawImage(t,r,a),f.frame=n.toDataURL()),u.push(f))},getResults:function(){return u}}}}},function(t,e,n){"use strict";var r={clone:n(7),dot:n(32)};e.a={create:function(t,e){function n(){o(t),i()}function o(t){c[t.id]=t,a.push(t)}function i(){var t,e=0;for(t=0;t<a.length;t++)e+=a[t].rad;u.rad=e/a.length,u.vec=r.clone([Math.cos(u.rad),Math.sin(u.rad)])}var a=[],u={rad:0,vec:r.clone([0,0])},c={};return n(),{add:function(t){c[t.id]||(o(t),i())},fits:function(t){return Math.abs(r.dot(t.point.vec,u.vec))>e},getPoints:function(){return a},getCenter:function(){return u}}},createPoint:function(t,e,n){return{rad:t[n],point:t,id:e}}}},function(t,e,n){"use strict";e.a=function(){function t(t){return o[t]||(o[t]={subscribers:[]}),o[t]}function e(){o={}}function n(t,e){t.async?setTimeout(function(){t.callback(e)},4):t.callback(e)}function r(e,n,r){var o;if("function"==typeof n)o={callback:n,async:r};else if(o=n,!o.callback)throw"Callback was not specified on options";t(e).subscribers.push(o)}var o={};return{subscribe:function(t,e,n){return r(t,e,n)},publish:function(e,r){var o=t(e),i=o.subscribers;i.filter(function(t){return!!t.once}).forEach(function(t){n(t,r)}),o.subscribers=i.filter(function(t){return!t.once}),o.subscribers.forEach(function(t){n(t,r)})},once:function(t,e,n){r(t,{callback:e,async:n,once:!0})},unsubscribe:function(n,r){var o;n?(o=t(n),o.subscribers=o&&r?o.subscribers.filter(function(t){return t.callback!==r}):[]):e()}}}()},function(t,e,n){"use strict";function r(){return navigator.mediaDevices&&"function"==typeof navigator.mediaDevices.enumerateDevices?navigator.mediaDevices.enumerateDevices():Promise.reject(new Error("enumerateDevices is not defined"))}function o(t){return navigator.mediaDevices&&"function"==typeof navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia(t):Promise.reject(new Error("getUserMedia is not defined"))}e.b=r,e.a=o},function(t,e,n){"use strict";function r(t,e,n){n||(n={data:null,size:e}),this.data=n.data,this.originalSize=n.size,this.I=n,this.from=t,this.size=e}r.prototype.show=function(t,e){var n,r,o,i,a,u,c;for(e||(e=1),n=t.getContext("2d"),t.width=this.size.x,t.height=this.size.y,r=n.getImageData(0,0,t.width,t.height),o=r.data,i=0,a=0;a<this.size.y;a++)for(u=0;u<this.size.x;u++)c=a*this.size.x+u,i=this.get(u,a)*e,o[4*c+0]=i,o[4*c+1]=i,o[4*c+2]=i,o[4*c+3]=255;r.data=o,n.putImageData(r,0,0)},r.prototype.get=function(t,e){return this.data[(this.from.y+e)*this.originalSize.x+this.from.x+t]},r.prototype.updateData=function(t){this.originalSize=t.size,this.data=t.data},r.prototype.updateFrom=function(t){return this.from=t,this},e.a=r},function(t,e){"undefined"!=typeof window&&(window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}()),Math.imul=Math.imul||function(t,e){var n=t>>>16&65535,r=65535&t,o=e>>>16&65535,i=65535&e;return r*i+(n*i+r*o<<16>>>0)|0},"function"!=typeof Object.assign&&(Object.assign=function(t){"use strict";if(null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(null!==r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e})},function(t,e,n){"use strict";var r=void 0;r=n(56),e.a=r},function(t,e){t.exports={inputStream:{name:"Live",type:"LiveStream",constraints:{width:640,height:480,facingMode:"environment"},area:{top:"0%",right:"0%",left:"0%",bottom:"0%"},singleChannel:!1},locate:!0,numOfWorkers:4,decoder:{readers:["code_128_reader"]},locator:{halfSample:!0,patchSize:"medium"}}},function(t,e,n){"use strict";var r=n(58),o=(n(9),n(69)),i=n(4),a=n(31),u=n(70),c=n(68),s=n(77),f=n(74),l=n(72),d=n(73),h=n(76),p=n(75),v=n(67),_=n(71),g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y={code_128_reader:o.a,ean_reader:i.a,ean_5_reader:d.a,ean_2_reader:l.a,ean_8_reader:f.a,code_39_reader:a.a,code_39_vin_reader:u.a,codabar_reader:c.a,upc_reader:s.a,upc_e_reader:h.a,i2of5_reader:p.a,"2of5_reader":v.a,code_93_reader:_.a};e.a={create:function(t,e){function n(){}function o(){t.readers.forEach(function(t){var e,n={},r=[];"object"===(void 0===t?"undefined":g(t))?(e=t.format,n=t.config):"string"==typeof t&&(e=t),n.supplements&&(r=n.supplements.map(function(t){return new y[t]})),h.push(new y[e](n,r))})}function i(){}function a(t,n,r){function o(e){var r={y:e*Math.sin(n),x:e*Math.cos(n)};t[0].y-=r.y,t[0].x-=r.x,t[1].y+=r.y,t[1].x+=r.x}for(o(r);r>1&&(!e.inImageWithBorder(t[0],0)||!e.inImageWithBorder(t[1],0));)r-=Math.ceil(r/2),o(-r);return t}function u(t){return[{x:(t[1][0]-t[0][0])/2+t[0][0],y:(t[1][1]-t[0][1])/2+t[0][1]},{x:(t[3][0]-t[2][0])/2+t[2][0],y:(t[3][1]-t[2][1])/2+t[2][1]}]}function c(t){var n,o=null,i=r.a.getBarcodeLine(e,t[0],t[1]);for(r.a.toBinaryLine(i),n=0;n<h.length&&null===o;n++)o=h[n].decodePattern(i.line);return null===o?null:{codeResult:o,barcodeLine:i}}function s(t,e,n){var r,o,i,a=Math.sqrt(Math.pow(t[1][0]-t[0][0],2)+Math.pow(t[1][1]-t[0][1],2)),u=16,s=null,f=Math.sin(n),l=Math.cos(n);for(r=1;r<u&&null===s;r++)o=a/u*r*(r%2==0?-1:1),i={y:o*f,x:o*l},e[0].y+=i.x,e[0].x-=i.y,e[1].y+=i.x,e[1].x-=i.y,s=c(e);return s}function f(t){return Math.sqrt(Math.pow(Math.abs(t[1].y-t[0].y),2)+Math.pow(Math.abs(t[1].x-t[0].x),2))}function l(t){var e,n,r,o;d.ctx.overlay;return e=u(t),o=f(e),n=Math.atan2(e[1].y-e[0].y,e[1].x-e[0].x),null===(e=a(e,n,Math.floor(.1*o)))?null:(r=c(e),null===r&&(r=s(t,e,n)),null===r?null:{codeResult:r.codeResult,line:e,angle:n,pattern:r.barcodeLine.line,threshold:r.barcodeLine.threshold})}var d={ctx:{frequency:null,pattern:null,overlay:null},dom:{frequency:null,pattern:null,overlay:null}},h=[];return n(),o(),i(),{decodeFromBoundingBox:function(t){return l(t)},decodeFromBoundingBoxes:function(e){var n,r,o=[],i=t.multiple;for(n=0;n<e.length;n++){var a=e[n];if(r=l(a)||{},r.box=a,i)o.push(r);else if(r.codeResult)return r}if(i)return{barcodes:o}},setReaders:function(e){t.readers=e,h.length=0,o()}}}}},function(t,e,n){"use strict";var r=(n(20),{}),o={DIR:{UP:1,DOWN:-1}};r.getBarcodeLine=function(t,e,n){function r(t,e){l=y[e*m+t],x+=l,b=l<b?l:b,E=l>E?l:E,g.push(l)}var o,i,a,u,c,s,f,l,d=0|e.x,h=0|e.y,p=0|n.x,v=0|n.y,_=Math.abs(v-h)>Math.abs(p-d),g=[],y=t.data,m=t.size.x,x=0,b=255,E=0;for(_&&(s=d,d=h,h=s,s=p,p=v,v=s),d>p&&(s=d,d=p,p=s,s=h,h=v,v=s),o=p-d,i=Math.abs(v-h),a=o/2|0,c=h,u=h<v?1:-1,f=d;f<p;f++)_?r(c,f):r(f,c),(a-=i)<0&&(c+=u,a+=o);return{line:g,min:b,max:E}},r.toBinaryLine=function(t){var e,n,r,i,a,u,c=t.min,s=t.max,f=t.line,l=c+(s-c)/2,d=[],h=(s-c)/12,p=-h;for(r=f[0]>l?o.DIR.UP:o.DIR.DOWN,d.push({pos:0,val:f[0]}),a=0;a<f.length-2;a++)e=f[a+1]-f[a],n=f[a+2]-f[a+1],i=e+n<p&&f[a+1]<1.5*l?o.DIR.DOWN:e+n>h&&f[a+1]>.5*l?o.DIR.UP:r,r!==i&&(d.push({pos:a,val:f[a]}),r=i);for(d.push({pos:f.length,val:f[f.length-1]}),u=d[0].pos;u<d[1].pos;u++)f[u]=f[u]>l?0:1;for(a=1;a<d.length-1;a++)for(h=d[a+1].val>d[a].val?d[a].val+(d[a+1].val-d[a].val)/3*2|0:d[a+1].val+(d[a].val-d[a+1].val)/3|0,u=d[a].pos;u<d[a+1].pos;u++)f[u]=f[u]>h?0:1;return{line:f,threshold:h}},r.debug={printFrequency:function(t,e){var n,r=e.getContext("2d");for(e.width=t.length,e.height=256,r.beginPath(),r.strokeStyle="blue",n=0;n<t.length;n++)r.moveTo(n,255),r.lineTo(n,255-t[n]);r.stroke(),r.closePath()},printPattern:function(t,e){var n,r=e.getContext("2d");for(e.width=t.length,r.fillColor="black",n=0;n<t.length;n++)1===t[n]&&r.fillRect(n,0,1,100)}},e.a=r},function(t,e,n){"use strict";function r(t){return new Promise(function(e,n){function r(){o>0?t.videoWidth>10&&t.videoHeight>10?e():window.setTimeout(r,500):n("Unable to play video stream. Is webcam working?"),o--}var o=10;r()})}function o(t,e){return n.i(d.a)(e).then(function(e){return new Promise(function(n){s=e,t.setAttribute("autoplay",!0),t.setAttribute("muted",!0),t.setAttribute("playsinline",!0),t.srcObject=e,t.addEventListener("loadedmetadata",function(){t.play(),n()})})}).then(r.bind(null,t))}function i(t){var e=l()(t,["width","height","facingMode","aspectRatio","deviceId"]);return void 0!==t.minAspectRatio&&t.minAspectRatio>0&&(e.aspectRatio=t.minAspectRatio,console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead")),void 0!==t.facing&&(e.facingMode=t.facing,console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'")),e}function a(t){var e={audio:!1,video:i(t)};return e.video.deviceId&&e.video.facingMode&&delete e.video.facingMode,Promise.resolve(e)}function u(){return n.i(d.b)().then(function(t){return t.filter(function(t){return"videoinput"===t.kind})})}function c(){if(s){var t=s.getVideoTracks();if(t&&t.length)return t[0]}}var s,f=n(162),l=n.n(f),d=n(52);e.a={request:function(t,e){return a(e).then(o.bind(null,t))},release:function(){var t=s&&s.getVideoTracks();t&&t.length&&t[0].stop(),s=null},enumerateVideoDevices:u,getActiveStreamLabel:function(){var t=c();return t?t.label:""},getActiveTrack:c}},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;return/^blob\:/i.test(t)?i(t).then(o).then(function(t){return a(t,e)}):Promise.resolve(null)}function o(t){return new Promise(function(e){var n=new FileReader;n.onload=function(t){return e(t.target.result)},n.readAsArrayBuffer(t)})}function i(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t,!0),r.responseType="blob",r.onreadystatechange=function(){r.readyState!==XMLHttpRequest.DONE||200!==r.status&&0!==r.status||e(this.response)},r.onerror=n,r.send()})}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d,n=new DataView(t),r=t.byteLength,o=e.reduce(function(t,e){var n=Object.keys(l).filter(function(t){return l[t]===e})[0];return n&&(t[n]=e),t},{}),i=2;if(255!==n.getUint8(0)||216!==n.getUint8(1))return!1;for(;i<r;){if(255!==n.getUint8(i))return!1;if(225===n.getUint8(i+1))return u(n,i+4,o);i+=2+n.getUint16(i+2)}}function u(t,e,n){if("Exif"!==f(t,e,4))return!1;var r=e+6,o=void 0;if(18761===t.getUint16(r))o=!1;else{if(19789!==t.getUint16(r))return!1;o=!0}if(42!==t.getUint16(r+2,!o))return!1;var i=t.getUint32(r+4,!o);return!(i<8)&&c(t,r,r+i,n,o)}function c(t,e,n,r,o){for(var i=t.getUint16(n,!o),a={},u=0;u<i;u++){var c=n+12*u+2,f=r[t.getUint16(c,!o)];f&&(a[f]=s(t,c,e,n,o))}return a}function s(t,e,n,r,o){var i=t.getUint16(e+2,!o),a=t.getUint32(e+4,!o);switch(i){case 3:if(1===a)return t.getUint16(e+8,!o)}}function f(t,e,n){for(var r="",o=e;o<e+n;o++)r+=String.fromCharCode(t.getUint8(o));return r}e.a=r;var l={274:"orientation"},d=Object.keys(l).map(function(t){return l[t]})},function(t,e,n){"use strict";function r(t,e){t.width!==e.x&&(t.width=e.x),t.height!==e.y&&(t.height=e.y)}var o=n(19),i=Math.PI/180,a={};a.create=function(t,e){var a,u={},c=t.getConfig(),s=(n.i(o.b)(t.getRealWidth(),t.getRealHeight()),t.getCanvasSize()),f=n.i(o.b)(t.getWidth(),t.getHeight()),l=t.getTopRight(),d=l.x,h=l.y,p=null,v=null;return a=e?e:document.createElement("canvas"),a.width=s.x,a.height=s.y,p=a.getContext("2d"),v=new Uint8Array(f.x*f.y),u.attachData=function(t){v=t},u.getData=function(){return v},u.grab=function(){var e,u=c.halfSample,l=t.getFrame(),_=l,g=0;if(_){if(r(a,s),"ImageStream"===c.type&&(_=l.img,l.tags&&l.tags.orientation))switch(l.tags.orientation){case 6:g=90*i;break;case 8:g=-90*i}return 0!==g?(p.translate(s.x/2,s.y/2),p.rotate(g),p.drawImage(_,-s.y/2,-s.x/2,s.y,s.x),p.rotate(-g),p.translate(-s.x/2,-s.y/2)):p.drawImage(_,0,0,s.x,s.y),e=p.getImageData(d,h,f.x,f.y).data,u?n.i(o.c)(e,f,v):n.i(o.d)(e,v,c),!0}return!1},u.getSize=function(){return f},u},e.a=a},function(t,e,n){"use strict";function r(t,e){t.onload=function(){e.loaded(this)}}var o=n(60),i={};i.load=function(t,e,i,a,u){var c,s,f,l=new Array(a),d=new Array(l.length);if(u===!1)l[0]=t;else for(c=0;c<l.length;c++)f=i+c,l[c]=t+"image-"+("00"+f).slice(-3)+".jpg";for(d.notLoaded=[],d.addImage=function(t){d.notLoaded.push(t)},d.loaded=function(r){for(var i=d.notLoaded,a=0;a<i.length;a++)if(i[a]===r){i.splice(a,1);for(var c=0;c<l.length;c++){var s=l[c].substr(l[c].lastIndexOf("/"));if(r.src.lastIndexOf(s)!==-1){d[c]={img:r};break}}break}0===i.length&&(u===!1?n.i(o.a)(t,["orientation"]).then(function(t){d[0].tags=t,e(d)}).catch(function(t){console.log(t),e(d)}):e(d))},c=0;c<l.length;c++)s=new Image,d.addImage(s),r(s,d),s.src=l[c]},e.a=i},function(t,e,n){"use strict";var r=n(62),o={};o.createVideoStream=function(t){function e(){var e=t.videoWidth,o=t.videoHeight;n=i.size?e/o>1?i.size:Math.floor(e/o*i.size):e,r=i.size?e/o>1?Math.floor(o/e*i.size):i.size:o,s.x=n,s.y=r}var n,r,o={},i=null,a=["canrecord","ended"],u={},c={x:0,y:0},s={x:0,y:0};return o.getRealWidth=function(){return t.videoWidth},o.getRealHeight=function(){return t.videoHeight},o.getWidth=function(){return n},o.getHeight=function(){return r},o.setWidth=function(t){n=t},o.setHeight=function(t){r=t},o.setInputStream=function(e){i=e,t.src=void 0!==e.src?e.src:""},o.ended=function(){return t.ended},o.getConfig=function(){return i},o.setAttribute=function(e,n){t.setAttribute(e,n)},o.pause=function(){t.pause()},o.play=function(){t.play()},o.setCurrentTime=function(e){"LiveStream"!==i.type&&(t.currentTime=e)},o.addEventListener=function(e,n,r){a.indexOf(e)!==-1?(u[e]||(u[e]=[]),u[e].push(n)):t.addEventListener(e,n,r)},o.clearEventHandlers=function(){a.forEach(function(e){var n=u[e];n&&n.length>0&&n.forEach(function(n){t.removeEventListener(e,n)})})},o.trigger=function(t,n){var r,i=u[t];if("canrecord"===t&&e(),i&&i.length>0)for(r=0;r<i.length;r++)i[r].apply(o,n)},o.setTopRight=function(t){c.x=t.x,c.y=t.y},o.getTopRight=function(){return c},o.setCanvasSize=function(t){s.x=t.x,s.y=t.y},o.getCanvasSize=function(){return s},o.getFrame=function(){return t},o},o.createLiveStream=function(t){t.setAttribute("autoplay",!0);var e=o.createVideoStream(t);return e.ended=function(){return!1},e},o.createImageStream=function(){function t(){l=!1,r.a.load(v,function(t){if(d=t,t[0].tags&&t[0].tags.orientation)switch(t[0].tags.orientation){case 6:case 8:u=t[0].img.height,c=t[0].img.width;break;default:u=t[0].img.width,c=t[0].img.height}else u=t[0].img.width,c=t[0].img.height;n=a.size?u/c>1?a.size:Math.floor(u/c*a.size):u,o=a.size?u/c>1?Math.floor(c/u*a.size):a.size:c,x.x=n,x.y=o,l=!0,s=0,setTimeout(function(){e("canrecord",[])},0)},p,h,a.sequence)}function e(t,e){var n,r=y[t];if(r&&r.length>0)for(n=0;n<r.length;n++)r[n].apply(i,e)}var n,o,i={},a=null,u=0,c=0,s=0,f=!0,l=!1,d=null,h=0,p=1,v=null,_=!1,g=["canrecord","ended"],y={},m={x:0,y:0},x={x:0,y:0};return i.trigger=e,i.getWidth=function(){return n},i.getHeight=function(){return o},i.setWidth=function(t){n=t},i.setHeight=function(t){o=t},i.getRealWidth=function(){return u},i.getRealHeight=function(){return c},i.setInputStream=function(e){a=e,e.sequence===!1?(v=e.src,h=1):(v=e.src,h=e.length),t()},i.ended=function(){return _},i.setAttribute=function(){},i.getConfig=function(){return a},i.pause=function(){f=!0},i.play=function(){f=!1},i.setCurrentTime=function(t){s=t},i.addEventListener=function(t,e){g.indexOf(t)!==-1&&(y[t]||(y[t]=[]),y[t].push(e))},i.setTopRight=function(t){m.x=t.x,m.y=t.y},i.getTopRight=function(){return m},i.setCanvasSize=function(t){x.x=t.x,x.y=t.y},i.getCanvasSize=function(){return x},i.getFrame=function(){var t;return l?(f||(t=d[s],s<h-1?s++:setTimeout(function(){_=!0,e("ended",[])},0)),t):null},i},e.a=o},function(t,e,n){"use strict";(function(t){function r(){var e;v=p.halfSample?new R.a({x:O.size.x/2|0,y:O.size.y/2|0}):O,C=n.i(w.e)(p.patchSize,v.size),z.x=v.size.x/C.x|0,z.y=v.size.y/C.y|0,E=new R.a(v.size,void 0,Uint8Array,!1),y=new R.a(C,void 0,Array,!0),e=new ArrayBuffer(65536),g=new R.a(C,new Uint8Array(e,0,C.x*C.y)),_=new R.a(C,new Uint8Array(e,C.x*C.y*3,C.x*C.y),void 0,!0),A=n.i(P.a)("undefined"!=typeof window?window:"undefined"!=typeof self?self:t,{size:C.x},e),b=new R.a({x:v.size.x/g.size.x|0,y:v.size.y/g.size.y|0},void 0,Array,!0),m=new R.a(b.size,void 0,void 0,!0),x=new R.a(b.size,void 0,Int32Array,!0)}function o(){p.useWorker||"undefined"==typeof document||(N.dom.binary=document.createElement("canvas"),N.dom.binary.className="binaryBuffer",N.ctx.binary=N.dom.binary.getContext("2d"),N.dom.binary.width=E.size.x,N.dom.binary.height=E.size.y)}function i(t){var e,n,r,o,i,a,u,c=E.size.x,s=E.size.y,f=-E.size.x,l=-E.size.y;for(e=0,n=0;n<t.length;n++)o=t[n],e+=o.rad;for(e/=t.length,e=(180*e/Math.PI+90)%180-90,e<0&&(e+=180),e=(180-e)*Math.PI/180,i=M.copy(M.create(),[Math.cos(e),Math.sin(e),-Math.sin(e),Math.cos(e)]),n=0;n<t.length;n++)for(o=t[n],r=0;r<4;r++)I.transformMat2(o.box[r],o.box[r],i);for(n=0;n<t.length;n++)for(o=t[n],r=0;r<4;r++)o.box[r][0]<c&&(c=o.box[r][0]),o.box[r][0]>f&&(f=o.box[r][0]),o.box[r][1]<s&&(s=o.box[r][1]),o.box[r][1]>l&&(l=o.box[r][1]);for(a=[[c,s],[f,s],[f,l],[c,l]],u=p.halfSample?2:1,i=M.invert(i,i),r=0;r<4;r++)I.transformMat2(a[r],a[r],i);for(r=0;r<4;r++)I.scale(a[r],a[r],u);return a}function a(){n.i(w.f)(v,E),E.zeroBorder()}function u(){var t,e,n,r,o,i,a,u=[];for(t=0;t<z.x;t++)for(e=0;e<z.y;e++)n=g.size.x*t,r=g.size.y*e,l(n,r),_.zeroBorder(),T.a.init(y.data,0),i=S.a.create(_,y),a=i.rasterize(0),o=y.moments(a.count),u=u.concat(d(o,[t,e],n,r));return u}function c(t){var e,n,r=[];for(e=0;e<t;e++)r.push(0);for(n=x.data.length;n--;)x.data[n]>0&&r[x.data[n]-1]++;return r=r.map(function(t,e){return{val:t,label:e+1}}),r.sort(function(t,e){return e.val-t.val}),r.filter(function(t){return t.val>=5})}function s(t,e){var n,r,o,a,u=[],c=[];for(n=0;n<t.length;n++){for(r=x.data.length,u.length=0;r--;)x.data[r]===t[n].label&&(o=b.data[r],u.push(o));a=i(u),a&&c.push(a)}return c}function f(t){var e=n.i(w.g)(t,.9),r=n.i(w.h)(e,1,function(t){return t.getPoints().length}),o=[],i=[];if(1===r.length){o=r[0].item.getPoints();for(var a=0;a<o.length;a++)i.push(o[a].point)}return i}function l(t,e){E.subImageAsCopy(g,n.i(w.b)(t,e)),A.skeletonize()}function d(t,e,n,r){var o,i,a,u,c=[],s=[],l=Math.ceil(C.x/3);if(t.length>=2){for(o=0;o<t.length;o++)t[o].m00>l&&c.push(t[o]);if(c.length>=2){for(a=f(c),i=0,o=0;o<a.length;o++)i+=a[o].rad;a.length>1&&a.length>=c.length/4*3&&a.length>t.length/4&&(i/=a.length,u={index:e[1]*z.x+e[0],pos:{x:n,y:r},box:[I.clone([n,r]),I.clone([n+g.size.x,r]),I.clone([n+g.size.x,r+g.size.y]),I.clone([n,r+g.size.y])],moments:a,rad:i,vec:I.clone([Math.cos(i),Math.sin(i)])},s.push(u))}}return s}function h(t){function e(){var t;for(t=0;t<x.data.length;t++)if(0===x.data[t]&&1===m.data[t])return t;return x.length}function n(t){var e,r,o,u,c,s={x:t%x.size.x,y:t/x.size.x|0};if(t<x.data.length)for(o=b.data[t],x.data[t]=i,c=0;c<D.a.searchDirections.length;c++)r=s.y+D.a.searchDirections[c][0],e=s.x+D.a.searchDirections[c][1],u=r*x.size.x+e,0!==m.data[u]?0===x.data[u]&&Math.abs(I.dot(b.data[u].vec,o.vec))>a&&n(u):x.data[u]=Number.MAX_VALUE}var r,o,i=0,a=.95,u=0;for(T.a.init(m.data,0),T.a.init(x.data,0),T.a.init(b.data,null),r=0;r<t.length;r++)o=t[r],b.data[o.index]=o,m.data[o.index]=1;for(m.zeroBorder();(u=e())<x.data.length;)i++,n(u);return i}var p,v,_,g,y,m,x,b,E,C,O,A,R=n(20),w=n(19),T=n(3),S=(n(9),n(65)),D=n(30),P=n(66),I={clone:n(7),dot:n(32),scale:n(81),transformMat2:n(82)},M={copy:n(78),create:n(79),invert:n(80)},N={ctx:{binary:null},dom:{binary:null}},z={x:0,y:0};e.a={init:function(t,e){p=e,O=t,r(),o()},locate:function(){var t,e;if(p.halfSample&&n.i(w.i)(O,v),a(),t=u(),t.length<z.x*z.y*.05)return null;var r=h(t);return r<1?null:(e=c(r),0===e.length?null:s(e,r))},checkImageConstraints:function(t,e){var r,o,i,a=t.getWidth(),u=t.getHeight(),c=e.halfSample?.5:1;if(t.getConfig().area&&(i=n.i(w.j)(a,u,t.getConfig().area),t.setTopRight({x:i.sx,y:i.sy}),t.setCanvasSize({x:a,y:u}),a=i.sw,u=i.sh),o={x:Math.floor(a*c),y:Math.floor(u*c)},r=n.i(w.e)(e.patchSize,o),t.setWidth(Math.floor(Math.floor(o.x/r.x)*(1/c)*r.x)),t.setHeight(Math.floor(Math.floor(o.y/r.y)*(1/c)*r.y)),t.getWidth()%r.x==0&&t.getHeight()%r.y==0)return!0;throw new Error("Image dimensions do not comply with the current settings: Width ("+a+" )and height ("+u+") must a multiple of "+r.x)}}}).call(e,n(47))},function(t,e,n){"use strict";var r=n(30),o={createContour2D:function(){return{dir:null,index:null,firstVertex:null,insideContours:null,nextpeer:null,prevpeer:null}},CONTOUR_DIR:{CW_DIR:0,CCW_DIR:1,UNKNOWN_DIR:2},DIR:{OUTSIDE_EDGE:-32767,INSIDE_EDGE:-32766},create:function(t,e){var n=t.data,i=e.data,a=t.size.x,u=t.size.y,c=r.a.create(t,e);return{rasterize:function(t){var e,r,s,f,l,d,h,p,v,_,g,y,m=[],x=0;for(y=0;y<400;y++)m[y]=0;for(m[0]=n[0],v=null,d=1;d<u-1;d++)for(f=0,r=m[0],l=1;l<a-1;l++)if(g=d*a+l,0===i[g])if((e=n[g])!==r){if(0===f)s=x+1,m[s]=e,r=e,null!==(h=c.contourTracing(d,l,s,e,o.DIR.OUTSIDE_EDGE))&&(x++,f=s,p=o.createContour2D(),p.dir=o.CONTOUR_DIR.CW_DIR,p.index=f,p.firstVertex=h,p.nextpeer=v,p.insideContours=null,null!==v&&(v.prevpeer=p),v=p);else if(null!==(h=c.contourTracing(d,l,o.DIR.INSIDE_EDGE,e,f))){for(p=o.createContour2D(),p.firstVertex=h,p.insideContours=null,p.dir=0===t?o.CONTOUR_DIR.CCW_DIR:o.CONTOUR_DIR.CW_DIR,p.index=t,_=v;null!==_&&_.index!==f;)_=_.nextpeer;null!==_&&(p.nextpeer=_.insideContours,null!==_.insideContours&&(_.insideContours.prevpeer=p),_.insideContours=p)}}else i[g]=f;else i[g]===o.DIR.OUTSIDE_EDGE||i[g]===o.DIR.INSIDE_EDGE?(f=0,r=i[g]===o.DIR.INSIDE_EDGE?n[g]:m[0]):(f=i[g],r=m[f]);for(_=v;null!==_;)_.index=t,_=_.nextpeer;return{cc:v,count:x}},debug:{drawContour:function(t,e){var n,r,i,a=t.getContext("2d"),u=e;for(a.strokeStyle="red",a.fillStyle="red",a.lineWidth=1,n=null!==u?u.insideContours:null;null!==u;){switch(null!==n?(r=n,n=n.nextpeer):(r=u,u=u.nextpeer,n=null!==u?u.insideContours:null),r.dir){case o.CONTOUR_DIR.CW_DIR:a.strokeStyle="red";break;case o.CONTOUR_DIR.CCW_DIR:a.strokeStyle="blue";break;case o.CONTOUR_DIR.UNKNOWN_DIR:a.strokeStyle="green"}i=r.firstVertex,a.beginPath(),a.moveTo(i.x,i.y);do i=i.next,a.lineTo(i.x,i.y);while(i!==r.firstVertex);a.stroke()}}}}}};e.a=o},function(module, __webpack_exports__, __webpack_require__) {"use strict";function Skeletonizer(stdlib, foreign, buffer) {"use asm";var images=new stdlib.Uint8Array(buffer),size=foreign.size|0,imul=stdlib.Math.imul;function erode(inImagePtr, outImagePtr) {inImagePtr=inImagePtr|0;outImagePtr=outImagePtr|0;var v=0,u=0,sum=0,yStart1=0,yStart2=0,xStart1=0,xStart2=0,offset=0;for (v=1; (v|0)<(size - 1|0); v=v+1|0) {offset=offset+size|0;for (u=1; (u|0)<(size - 1|0); u=u+1|0) {yStart1=offset - size|0;yStart2=offset+size|0;xStart1=u - 1|0;xStart2=u+1|0;sum=(images[inImagePtr+yStart1+xStart1|0]|0)+(images[inImagePtr+yStart1+xStart2|0]|0)+(images[inImagePtr+offset+u|0]|0)+(images[inImagePtr+yStart2+xStart1|0]|0)+(images[inImagePtr+yStart2+xStart2|0]|0)|0;if ((sum|0) == (5|0)) {images[outImagePtr+offset+u|0]=1;} else {images[outImagePtr+offset+u|0]=0;}}}return;}function subtract(aImagePtr, bImagePtr, outImagePtr) {aImagePtr=aImagePtr|0;bImagePtr=bImagePtr|0;outImagePtr=outImagePtr|0;var length=0;length=imul(size, size)|0;while ((length|0)>0) {length=length - 1|0;images[outImagePtr+length|0]=(images[aImagePtr+length|0]|0) - (images[bImagePtr+length|0]|0)|0;}}function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {aImagePtr=aImagePtr|0;bImagePtr=bImagePtr|0;outImagePtr=outImagePtr|0;var length=0;length=imul(size, size)|0;while ((length|0)>0) {length=length - 1|0;images[outImagePtr+length|0]=images[aImagePtr+length|0]|0|(images[bImagePtr+length|0]|0)|0;}}function countNonZero(imagePtr) {imagePtr=imagePtr|0;var sum=0,length=0;length=imul(size, size)|0;while ((length|0)>0) {length=length - 1|0;sum=(sum|0)+(images[imagePtr+length|0]|0)|0;}return sum|0;}function init(imagePtr, value) {imagePtr=imagePtr|0;value=value|0;var length=0;length=imul(size, size)|0;while ((length|0)>0) {length=length - 1|0;images[imagePtr+length|0]=value;}}function dilate(inImagePtr, outImagePtr) {inImagePtr=inImagePtr|0;outImagePtr=outImagePtr|0;var v=0,u=0,sum=0,yStart1=0,yStart2=0,xStart1=0,xStart2=0,offset=0;for (v=1; (v|0)<(size - 1|0); v=v+1|0) {offset=offset+size|0;for (u=1; (u|0)<(size - 1|0); u=u+1|0) {yStart1=offset - size|0;yStart2=offset+size|0;xStart1=u - 1|0;xStart2=u+1|0;sum=(images[inImagePtr+yStart1+xStart1|0]|0)+(images[inImagePtr+yStart1+xStart2|0]|0)+(images[inImagePtr+offset+u|0]|0)+(images[inImagePtr+yStart2+xStart1|0]|0)+(images[inImagePtr+yStart2+xStart2|0]|0)|0;if ((sum|0)>(0|0)) {images[outImagePtr+offset+u|0]=1;} else {images[outImagePtr+offset+u|0]=0;}}}return;}function memcpy(srcImagePtr, dstImagePtr) {srcImagePtr=srcImagePtr|0;dstImagePtr=dstImagePtr|0;var length=0;length=imul(size, size)|0;while ((length|0)>0) {length=length - 1|0;images[dstImagePtr+length|0]=images[srcImagePtr+length|0]|0;}}function zeroBorder(imagePtr) {imagePtr=imagePtr|0;var x=0,y=0;for (x=0; (x|0)<(size - 1|0); x=x+1|0) {images[imagePtr+x|0]=0;images[imagePtr+y|0]=0;y=y+size - 1|0;images[imagePtr+y|0]=0;y=y+1|0;}for (x=0; (x|0)<(size|0); x=x+1|0) {images[imagePtr+y|0]=0;y=y+1|0;}}function skeletonize() {var subImagePtr=0,erodedImagePtr=0,tempImagePtr=0,skelImagePtr=0,sum=0,done=0;erodedImagePtr=imul(size, size)|0;tempImagePtr=erodedImagePtr+erodedImagePtr|0;skelImagePtr=tempImagePtr+erodedImagePtr|0;init(skelImagePtr, 0);zeroBorder(subImagePtr);do {erode(subImagePtr, erodedImagePtr);dilate(erodedImagePtr, tempImagePtr);subtract(subImagePtr, tempImagePtr, tempImagePtr);bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);memcpy(erodedImagePtr, subImagePtr);sum=countNonZero(subImagePtr)|0;done=(sum|0) == 0|0;} while (!done);}return {skeletonize: skeletonize};} __webpack_exports__["a"]=Skeletonizer; },function(t,e,n){"use strict";function r(t){o.a.call(this,t),this.barSpaceRatio=[1,1]}var o=n(1),i=1,a=3,u={START_PATTERN:{value:[a,i,a,i,i,i]},STOP_PATTERN:{value:[a,i,i,i,a]},CODE_PATTERN:{value:[[i,i,a,a,i],[a,i,i,i,a],[i,a,i,i,a],[a,a,i,i,i],[i,i,a,i,a],[a,i,a,i,i],[i,a,a,i,i],[i,i,i,a,a],[a,i,i,a,i],[i,a,i,a,i]]},SINGLE_CODE_ERROR:{value:.78,writable:!0},AVG_CODE_ERROR:{value:.3,writable:!0},FORMAT:{value:"2of5"}},c=u.START_PATTERN.value.reduce(function(t,e){return t+e},0);r.prototype=Object.create(o.a.prototype,u),r.prototype.constructor=r,r.prototype._findPattern=function(t,e,n,r){var o,i,a,u,c=[],s=this,f=0,l={error:Number.MAX_VALUE,code:-1,start:0,end:0},d=s.AVG_CODE_ERROR;for(n=n||!1,r=r||!1,e||(e=s._nextSet(s._row)),o=0;o<t.length;o++)c[o]=0;for(o=e;o<s._row.length;o++)if(s._row[o]^n)c[f]++;else{if(f===c.length-1){for(u=0,a=0;a<c.length;a++)u+=c[a];if((i=s._matchPattern(c,t))<d)return l.error=i,l.start=o-u,l.end=o,l;if(!r)return null;for(a=0;a<c.length-2;a++)c[a]=c[a+2];c[c.length-2]=0,c[c.length-1]=0,f--}else f++;c[f]=1,n=!n}return null},r.prototype._findStart=function(){for(var t,e,n=this,r=n._nextSet(n._row),o=1;!e;){if(!(e=n._findPattern(n.START_PATTERN,r,!1,!0)))return null;if(o=Math.floor((e.end-e.start)/c),(t=e.start-5*o)>=0&&n._matchRange(t,e.start,0))return e;r=e.end,e=null}},r.prototype._verifyTrailingWhitespace=function(t){var e,n=this;return e=t.end+(t.end-t.start)/2,e<n._row.length&&n._matchRange(t.end,e,0)?t:null},r.prototype._findEnd=function(){var t,e,n,r=this;return r._row.reverse(),n=r._nextSet(r._row),t=r._findPattern(r.STOP_PATTERN,n,!1,!0),r._row.reverse(),null===t?null:(e=t.start,t.start=r._row.length-t.end,t.end=r._row.length-e,null!==t?r._verifyTrailingWhitespace(t):null)},r.prototype._decodeCode=function(t){var e,n,r,o=this,i=0,a=o.AVG_CODE_ERROR,u={error:Number.MAX_VALUE,code:-1,start:0,end:0};for(e=0;e<t.length;e++)i+=t[e];for(r=0;r<o.CODE_PATTERN.length;r++)(n=o._matchPattern(t,o.CODE_PATTERN[r]))<u.error&&(u.code=r,u.error=n);if(u.error<a)return u},r.prototype._decodePayload=function(t,e,n){for(var r,o,i=this,a=0,u=t.length,c=[0,0,0,0,0];a<u;){for(r=0;r<5;r++)c[r]=t[a]*this.barSpaceRatio[0],a+=2;if(!(o=i._decodeCode(c)))return null;e.push(o.code+""),n.push(o)}return o},r.prototype._verifyCounterLength=function(t){return t.length%10==0},r.prototype._decode=function(){var t,e,n,r=this,o=[],i=[];return(t=r._findStart())?(i.push(t),(e=r._findEnd())?(n=r._fillCounters(t.end,e.start,!1),r._verifyCounterLength(n)&&r._decodePayload(n,o,i)?o.length<5?null:(i.push(e),{code:o.join(""),start:t.start,end:e.end,startInfo:t,decodedCodes:i}):null):null):null},e.a=r},function(t,e,n){"use strict";function r(){o.a.call(this),this._counters=[]}var o=n(1),i={ALPHABETH_STRING:{value:"0123456789-$:/.+ABCD"},ALPHABET:{value:[48,49,50,51,52,53,54,55,56,57,45,36,58,47,46,43,65,66,67,68]},CHARACTER_ENCODINGS:{value:[3,6,9,96,18,66,33,36,48,72,12,24,69,81,84,21,26,41,11,14]},START_END:{value:[26,41,11,14]},MIN_ENCODED_CHARS:{value:4},MAX_ACCEPTABLE:{value:2},PADDING:{value:1.5},FORMAT:{value:"codabar",writeable:!1}};r.prototype=Object.create(o.a.prototype,i),r.prototype.constructor=r,r.prototype._decode=function(){var t,e,n,r,o,i=this,a=[];if(this._counters=i._fillCounters(),!(t=i._findStart()))return null;r=t.startCounter;do{if((n=i._toPattern(r))<0)return null;if((e=i._patternToChar(n))<0)return null;if(a.push(e),r+=8,a.length>1&&i._isStartEnd(n))break}while(r<i._counters.length);return a.length-2<i.MIN_ENCODED_CHARS||!i._isStartEnd(n)?null:i._verifyWhitespace(t.startCounter,r-8)&&i._validateResult(a,t.startCounter)?(r=r>i._counters.length?i._counters.length:r,o=t.start+i._sumCounters(t.startCounter,r-8),{code:a.join(""),start:t.start,end:o,startInfo:t,decodedCodes:a}):null},r.prototype._verifyWhitespace=function(t,e){return(t-1<=0||this._counters[t-1]>=this._calculatePatternLength(t)/2)&&(e+8>=this._counters.length||this._counters[e+7]>=this._calculatePatternLength(e)/2)},r.prototype._calculatePatternLength=function(t){var e,n=0;for(e=t;e<t+7;e++)n+=this._counters[e];return n},r.prototype._thresholdResultPattern=function(t,e){var n,r,o,i,a,u=this,c={space:{narrow:{size:0,counts:0,min:0,max:Number.MAX_VALUE},wide:{size:0,counts:0,min:0,max:Number.MAX_VALUE}},bar:{narrow:{size:0,counts:0,min:0,max:Number.MAX_VALUE},wide:{size:0,counts:0,min:0,max:Number.MAX_VALUE}}},s=e;for(o=0;o<t.length;o++){for(a=u._charToPattern(t[o]),i=6;i>=0;i--)n=2==(1&i)?c.bar:c.space,r=1==(1&a)?n.wide:n.narrow,r.size+=u._counters[s+i],r.counts++,a>>=1;s+=8}return["space","bar"].forEach(function(t){var e=c[t];e.wide.min=Math.floor((e.narrow.size/e.narrow.counts+e.wide.size/e.wide.counts)/2),e.narrow.max=Math.ceil(e.wide.min),e.wide.max=Math.ceil((e.wide.size*u.MAX_ACCEPTABLE+u.PADDING)/e.wide.counts)}),c},r.prototype._charToPattern=function(t){var e,n=this,r=t.charCodeAt(0);for(e=0;e<n.ALPHABET.length;e++)if(n.ALPHABET[e]===r)return n.CHARACTER_ENCODINGS[e];return 0},r.prototype._validateResult=function(t,e){var n,r,o,i,a,u,c=this,s=c._thresholdResultPattern(t,e),f=e;for(n=0;n<t.length;n++){for(u=c._charToPattern(t[n]),r=6;r>=0;r--){if(o=0==(1&r)?s.bar:s.space,i=1==(1&u)?o.wide:o.narrow,(a=c._counters[f+r])<i.min||a>i.max)return!1;u>>=1}f+=8}return!0},r.prototype._patternToChar=function(t){var e,n=this;for(e=0;e<n.CHARACTER_ENCODINGS.length;e++)if(n.CHARACTER_ENCODINGS[e]===t)return String.fromCharCode(n.ALPHABET[e]);return-1},r.prototype._computeAlternatingThreshold=function(t,e){var n,r,o=Number.MAX_VALUE,i=0;for(n=t;n<e;n+=2)r=this._counters[n],r>i&&(i=r),r<o&&(o=r);return(o+i)/2|0},r.prototype._toPattern=function(t){var e,n,r,o,i=7,a=t+i,u=1<<i-1,c=0;if(a>this._counters.length)return-1;for(e=this._computeAlternatingThreshold(t,a),n=this._computeAlternatingThreshold(t+1,a),r=0;r<i;r++)o=0==(1&r)?e:n,this._counters[t+r]>o&&(c|=u),u>>=1;return c},r.prototype._isStartEnd=function(t){var e;for(e=0;e<this.START_END.length;e++)if(this.START_END[e]===t)return!0;return!1},r.prototype._sumCounters=function(t,e){var n,r=0;for(n=t;n<e;n++)r+=this._counters[n];return r},r.prototype._findStart=function(){var t,e,n,r=this,o=r._nextUnset(r._row);for(t=1;t<this._counters.length;t++)if((e=r._toPattern(t))!==-1&&r._isStartEnd(e))return o+=r._sumCounters(0,t),n=o+r._sumCounters(t,t+8),{start:o,end:n,startCounter:t,endCounter:t+8}},e.a=r},function(t,e,n){"use strict";function r(){i.a.call(this)}function o(t,e,n){for(var r=n.length,o=0,i=0;r--;)i+=t[n[r]],o+=e[n[r]];return i/o}var i=n(1),a={CODE_SHIFT:{value:98},CODE_C:{value:99},CODE_B:{value:100},CODE_A:{value:101},START_CODE_A:{value:103},START_CODE_B:{value:104},START_CODE_C:{value:105},STOP_CODE:{value:106},CODE_PATTERN:{value:[[2,1,2,2,2,2],[2,2,2,1,2,2],[2,2,2,2,2,1],[1,2,1,2,2,3],[1,2,1,3,2,2],[1,3,1,2,2,2],[1,2,2,2,1,3],[1,2,2,3,1,2],[1,3,2,2,1,2],[2,2,1,2,1,3],[2,2,1,3,1,2],[2,3,1,2,1,2],[1,1,2,2,3,2],[1,2,2,1,3,2],[1,2,2,2,3,1],[1,1,3,2,2,2],[1,2,3,1,2,2],[1,2,3,2,2,1],[2,2,3,2,1,1],[2,2,1,1,3,2],[2,2,1,2,3,1],[2,1,3,2,1,2],[2,2,3,1,1,2],[3,1,2,1,3,1],[3,1,1,2,2,2],[3,2,1,1,2,2],[3,2,1,2,2,1],[3,1,2,2,1,2],[3,2,2,1,1,2],[3,2,2,2,1,1],[2,1,2,1,2,3],[2,1,2,3,2,1],[2,3,2,1,2,1],[1,1,1,3,2,3],[1,3,1,1,2,3],[1,3,1,3,2,1],[1,1,2,3,1,3],[1,3,2,1,1,3],[1,3,2,3,1,1],[2,1,1,3,1,3],[2,3,1,1,1,3],[2,3,1,3,1,1],[1,1,2,1,3,3],[1,1,2,3,3,1],[1,3,2,1,3,1],[1,1,3,1,2,3],[1,1,3,3,2,1],[1,3,3,1,2,1],[3,1,3,1,2,1],[2,1,1,3,3,1],[2,3,1,1,3,1],[2,1,3,1,1,3],[2,1,3,3,1,1],[2,1,3,1,3,1],[3,1,1,1,2,3],[3,1,1,3,2,1],[3,3,1,1,2,1],[3,1,2,1,1,3],[3,1,2,3,1,1],[3,3,2,1,1,1],[3,1,4,1,1,1],[2,2,1,4,1,1],[4,3,1,1,1,1],[1,1,1,2,2,4],[1,1,1,4,2,2],[1,2,1,1,2,4],[1,2,1,4,2,1],[1,4,1,1,2,2],[1,4,1,2,2,1],[1,1,2,2,1,4],[1,1,2,4,1,2],[1,2,2,1,1,4],[1,2,2,4,1,1],[1,4,2,1,1,2],[1,4,2,2,1,1],[2,4,1,2,1,1],[2,2,1,1,1,4],[4,1,3,1,1,1],[2,4,1,1,1,2],[1,3,4,1,1,1],[1,1,1,2,4,2],[1,2,1,1,4,2],[1,2,1,2,4,1],[1,1,4,2,1,2],[1,2,4,1,1,2],[1,2,4,2,1,1],[4,1,1,2,1,2],[4,2,1,1,1,2],[4,2,1,2,1,1],[2,1,2,1,4,1],[2,1,4,1,2,1],[4,1,2,1,2,1],[1,1,1,1,4,3],[1,1,1,3,4,1],[1,3,1,1,4,1],[1,1,4,1,1,3],[1,1,4,3,1,1],[4,1,1,1,1,3],[4,1,1,3,1,1],[1,1,3,1,4,1],[1,1,4,1,3,1],[3,1,1,1,4,1],[4,1,1,1,3,1],[2,1,1,4,1,2],[2,1,1,2,1,4],[2,1,1,2,3,2],[2,3,3,1,1,1,2]]},SINGLE_CODE_ERROR:{value:.64},AVG_CODE_ERROR:{value:.3},FORMAT:{value:"code_128",writeable:!1},MODULE_INDICES:{value:{bar:[0,2,4],space:[1,3,5]}}};r.prototype=Object.create(i.a.prototype,a),r.prototype.constructor=r,r.prototype._decodeCode=function(t,e){var n,r,i,a=[0,0,0,0,0,0],u=this,c=t,s=!u._row[c],f=0,l={error:Number.MAX_VALUE,code:-1,start:t,end:t,correction:{bar:1,space:1}};for(n=c;n<u._row.length;n++)if(u._row[n]^s)a[f]++;else{if(f===a.length-1){for(e&&u._correct(a,e),r=0;r<u.CODE_PATTERN.length;r++)(i=u._matchPattern(a,u.CODE_PATTERN[r]))<l.error&&(l.code=r,l.error=i);return l.end=n,l.code===-1||l.error>u.AVG_CODE_ERROR?null:(u.CODE_PATTERN[l.code]&&(l.correction.bar=o(u.CODE_PATTERN[l.code],a,this.MODULE_INDICES.bar),l.correction.space=o(u.CODE_PATTERN[l.code],a,this.MODULE_INDICES.space)),l)}f++,a[f]=1,s=!s}return null},r.prototype._correct=function(t,e){this._correctBars(t,e.bar,this.MODULE_INDICES.bar),this._correctBars(t,e.space,this.MODULE_INDICES.space)},r.prototype._findStart=function(){var t,e,n,r,i,a=[0,0,0,0,0,0],u=this,c=u._nextSet(u._row),s=!1,f=0,l={error:Number.MAX_VALUE,code:-1,start:0,end:0,correction:{bar:1,space:1}};for(t=c;t<u._row.length;t++)if(u._row[t]^s)a[f]++;else{if(f===a.length-1){for(i=0,r=0;r<a.length;r++)i+=a[r];for(e=u.START_CODE_A;e<=u.START_CODE_C;e++)(n=u._matchPattern(a,u.CODE_PATTERN[e]))<l.error&&(l.code=e,l.error=n);if(l.error<u.AVG_CODE_ERROR)return l.start=t-i,l.end=t,l.correction.bar=o(u.CODE_PATTERN[l.code],a,this.MODULE_INDICES.bar),l.correction.space=o(u.CODE_PATTERN[l.code],a,this.MODULE_INDICES.space),l;for(r=0;r<4;r++)a[r]=a[r+2];a[4]=0,a[5]=0,f--}else f++;a[f]=1,s=!s}return null},r.prototype._decode=function(){var t,e,n=this,r=n._findStart(),o=null,i=!1,a=[],u=0,c=0,s=[],f=[],l=!1,d=!0;if(null===r)return null;switch(o={code:r.code,start:r.start,end:r.end,correction:{bar:r.correction.bar,space:r.correction.space}},f.push(o),c=o.code,o.code){case n.START_CODE_A:t=n.CODE_A;break;case n.START_CODE_B:t=n.CODE_B;break;case n.START_CODE_C:t=n.CODE_C;break;default:return null}for(;!i;){if(e=l,l=!1,null!==(o=n._decodeCode(o.end,o.correction)))switch(o.code!==n.STOP_CODE&&(d=!0),o.code!==n.STOP_CODE&&(s.push(o.code),u++,c+=u*o.code),f.push(o),t){case n.CODE_A:if(o.code<64)a.push(String.fromCharCode(32+o.code));else if(o.code<96)a.push(String.fromCharCode(o.code-64));else switch(o.code!==n.STOP_CODE&&(d=!1),o.code){case n.CODE_SHIFT:l=!0,t=n.CODE_B;break;case n.CODE_B:t=n.CODE_B;break;case n.CODE_C:t=n.CODE_C;break;case n.STOP_CODE:i=!0}break;case n.CODE_B:if(o.code<96)a.push(String.fromCharCode(32+o.code));else switch(o.code!==n.STOP_CODE&&(d=!1),o.code){case n.CODE_SHIFT:l=!0,t=n.CODE_A;break;case n.CODE_A:t=n.CODE_A;break;case n.CODE_C:t=n.CODE_C;break;case n.STOP_CODE:i=!0}break;case n.CODE_C:if(o.code<100)a.push(o.code<10?"0"+o.code:o.code);else switch(o.code!==n.STOP_CODE&&(d=!1),o.code){case n.CODE_A:t=n.CODE_A;break;case n.CODE_B:t=n.CODE_B;break;case n.STOP_CODE:i=!0}}else i=!0;e&&(t=t===n.CODE_A?n.CODE_B:n.CODE_A)}return null===o?null:(o.end=n._nextUnset(n._row,o.end),n._verifyTrailingWhitespace(o)?(c-=u*s[s.length-1])%103!==s[s.length-1]?null:a.length?(d&&a.splice(a.length-1,1),{code:a.join(""),start:r.start,end:o.end,codeset:t,startInfo:r,decodedCodes:f,endInfo:o}):null:null)},i.a.prototype._verifyTrailingWhitespace=function(t){var e,n=this;return e=t.end+(t.end-t.start)/2,e<n._row.length&&n._matchRange(t.end,e,0)?t:null},e.a=r},function(t,e,n){"use strict";function r(){o.a.call(this)}var o=n(31),i={IOQ:/[IOQ]/g,AZ09:/[A-Z0-9]{17}/};r.prototype=Object.create(o.a.prototype),r.prototype.constructor=r,r.prototype._decode=function(){var t=o.a.prototype._decode.apply(this);if(!t)return null;var e=t.code;return e?(e=e.replace(i.IOQ,""),e.match(i.AZ09)&&this._checkChecksum(e)?(t.code=e,t):null):null},r.prototype._checkChecksum=function(t){return!!t},e.a=r},function(t,e,n){"use strict";function r(){o.a.call(this)}var o=n(1),i=n(3),a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*",u={ALPHABETH_STRING:{value:a},ALPHABET:{value:a.split("").map(function(t){return t.charCodeAt(0)})},CHARACTER_ENCODINGS:{value:[276,328,324,322,296,292,290,336,274,266,424,420,418,404,402,394,360,356,354,308,282,344,332,326,300,278,436,434,428,422,406,410,364,358,310,314,302,468,466,458,366,374,430,294,474,470,306,350]},ASTERISK:{value:350},FORMAT:{value:"code_93",writeable:!1}};r.prototype=Object.create(o.a.prototype,u),r.prototype.constructor=r,r.prototype._decode=function(){var t,e,n,r,o=this,a=[0,0,0,0,0,0],u=[],c=o._findStart();if(!c)return null;r=o._nextSet(o._row,c.end);do{if(a=o._toCounters(r,a),(n=o._toPattern(a))<0)return null;if((t=o._patternToChar(n))<0)return null;u.push(t),e=r,r+=i.a.sum(a),r=o._nextSet(o._row,r)}while("*"!==t);return u.pop(),u.length&&o._verifyEnd(e,r,a)&&o._verifyChecksums(u)?(u=u.slice(0,u.length-2),null===(u=o._decodeExtended(u))?null:{code:u.join(""),start:c.start,end:r,startInfo:c,decodedCodes:u}):null},r.prototype._verifyEnd=function(t,e){return!(t===e||!this._row[e])},r.prototype._patternToChar=function(t){var e,n=this;for(e=0;e<n.CHARACTER_ENCODINGS.length;e++)if(n.CHARACTER_ENCODINGS[e]===t)return String.fromCharCode(n.ALPHABET[e]);return-1},r.prototype._toPattern=function(t){for(var e=t.length,n=0,r=0,o=0;o<e;o++)r+=t[o];for(var i=0;i<e;i++){var a=Math.round(9*t[i]/r);if(a<1||a>4)return-1;if(0==(1&i))for(var u=0;u<a;u++)n=n<<1|1;else n<<=a}return n},r.prototype._findStart=function(){var t,e,n,r=this,o=r._nextSet(r._row),i=o,a=[0,0,0,0,0,0],u=0,c=!1;for(t=o;t<r._row.length;t++)if(r._row[t]^c)a[u]++;else{if(u===a.length-1){if(r._toPattern(a)===r.ASTERISK&&(n=Math.floor(Math.max(0,i-(t-i)/4)),r._matchRange(n,i,0)))return{start:i,end:t};for(i+=a[0]+a[1],e=0;e<4;e++)a[e]=a[e+2];a[4]=0,a[5]=0,u--}else u++;a[u]=1,c=!c}return null},r.prototype._decodeExtended=function(t){for(var e=t.length,n=[],r=0;r<e;r++){var o=t[r];if(o>="a"&&o<="d"){if(r>e-2)return null;var i=t[++r],a=i.charCodeAt(0),u=void 0;switch(o){case"a":if(!(i>="A"&&i<="Z"))return null;u=String.fromCharCode(a-64);break;case"b":if(i>="A"&&i<="E")u=String.fromCharCode(a-38);else if(i>="F"&&i<="J")u=String.fromCharCode(a-11);else if(i>="K"&&i<="O")u=String.fromCharCode(a+16);else if(i>="P"&&i<="S")u=String.fromCharCode(a+43);else{if(!(i>="T"&&i<="Z"))return null;u=String.fromCharCode(127)}break;case"c":if(i>="A"&&i<="O")u=String.fromCharCode(a-32);else{if("Z"!==i)return null;u=":"}break;case"d":if(!(i>="A"&&i<="Z"))return null;u=String.fromCharCode(a+32)}n.push(u)}else n.push(o)}return n},r.prototype._verifyChecksums=function(t){return this._matchCheckChar(t,t.length-2,20)&&this._matchCheckChar(t,t.length-1,15)},r.prototype._matchCheckChar=function(t,e,n){var r=this,o=t.slice(0,e),i=o.length,a=o.reduce(function(t,e,o){return t+((o*-1+(i-1))%n+1)*r.ALPHABET.indexOf(e.charCodeAt(0))},0);return this.ALPHABET[a%47]===t[e].charCodeAt(0)},e.a=r},function(t,e,n){"use strict";function r(){o.a.call(this)}var o=n(4),i={FORMAT:{value:"ean_2",writeable:!1}};r.prototype=Object.create(o.a.prototype,i),r.prototype.constructor=r,r.prototype.decode=function(t,e){this._row=t;var n,r=0,o=0,i=e,a=this._row.length,u=[],c=[];for(o=0;o<2&&i<a;o++){if(!(n=this._decodeCode(i)))return null;c.push(n),u.push(n.code%10),n.code>=this.CODE_G_START&&(r|=1<<1-o),1!=o&&(i=this._nextSet(this._row,n.end),i=this._nextUnset(this._row,i))}return 2!=u.length||parseInt(u.join(""))%4!==r?null:{code:u.join(""),decodedCodes:c,end:n.end}},e.a=r},function(t,e,n){"use strict";function r(){a.a.call(this)}function o(t){var e;for(e=0;e<10;e++)if(t===c[e])return e;return null}function i(t){var e,n=t.length,r=0;for(e=n-2;e>=0;e-=2)r+=t[e];for(r*=3,e=n-1;e>=0;e-=2)r+=t[e];return(r*=3)%10}var a=n(4),u={FORMAT:{value:"ean_5",writeable:!1}},c=[24,20,18,17,12,6,3,10,9,5];r.prototype=Object.create(a.a.prototype,u),r.prototype.constructor=r,r.prototype.decode=function(t,e){this._row=t;var n,r=0,a=0,u=e,c=this._row.length,s=[],f=[];for(a=0;a<5&&u<c;a++){if(!(n=this._decodeCode(u)))return null;f.push(n),s.push(n.code%10),n.code>=this.CODE_G_START&&(r|=1<<4-a),4!=a&&(u=this._nextSet(this._row,n.end),u=this._nextUnset(this._row,u))}return 5!=s.length?null:i(s)!==o(r)?null:{code:s.join(""),decodedCodes:f,end:n.end}},e.a=r},function(t,e,n){"use strict";function r(t,e){o.a.call(this,t,e)}var o=n(4),i={FORMAT:{value:"ean_8",writeable:!1}};r.prototype=Object.create(o.a.prototype,i),r.prototype.constructor=r,r.prototype._decodePayload=function(t,e,n){var r,o=this;for(r=0;r<4;r++){if(!(t=o._decodeCode(t.end,o.CODE_G_START)))return null;e.push(t.code),n.push(t)}if(null===(t=o._findPattern(o.MIDDLE_PATTERN,t.end,!0,!1)))return null;for(n.push(t),r=0;r<4;r++){if(!(t=o._decodeCode(t.end,o.CODE_G_START)))return null;n.push(t),e.push(t.code)}return t},e.a=r},function(t,e,n){"use strict";function r(t){t=a()(o(),t),u.a.call(this,t),this.barSpaceRatio=[1,1],t.normalizeBarSpaceWidth&&(this.SINGLE_CODE_ERROR=.38,this.AVG_CODE_ERROR=.09)}function o(){var t={};return Object.keys(r.CONFIG_KEYS).forEach(function(e){t[e]=r.CONFIG_KEYS[e].default}),t}var i=n(28),a=n.n(i),u=n(1),c=1,s=3,f={START_PATTERN:{value:[c,c,c,c]},STOP_PATTERN:{value:[c,c,s]},CODE_PATTERN:{value:[[c,c,s,s,c],[s,c,c,c,s],[c,s,c,c,s],[s,s,c,c,c],[c,c,s,c,s],[s,c,s,c,c],[c,s,s,c,c],[c,c,c,s,s],[s,c,c,s,c],[c,s,c,s,c]]},SINGLE_CODE_ERROR:{value:.78,writable:!0},AVG_CODE_ERROR:{value:.38,writable:!0},MAX_CORRECTION_FACTOR:{value:5},FORMAT:{value:"i2of5"}};r.prototype=Object.create(u.a.prototype,f),r.prototype.constructor=r,r.prototype._matchPattern=function(t,e){if(this.config.normalizeBarSpaceWidth){var n,r=[0,0],o=[0,0],i=[0,0],a=this.MAX_CORRECTION_FACTOR,c=1/a;for(n=0;n<t.length;n++)r[n%2]+=t[n],o[n%2]+=e[n];for(i[0]=o[0]/r[0],i[1]=o[1]/r[1],i[0]=Math.max(Math.min(i[0],a),c),i[1]=Math.max(Math.min(i[1],a),c),this.barSpaceRatio=i,n=0;n<t.length;n++)t[n]*=this.barSpaceRatio[n%2]}return u.a.prototype._matchPattern.call(this,t,e)},r.prototype._findPattern=function(t,e,n,r){var o,i,a,u,c=[],s=this,f=0,l={error:Number.MAX_VALUE,code:-1,start:0,end:0},d=s.AVG_CODE_ERROR;for(n=n||!1,r=r||!1,e||(e=s._nextSet(s._row)),o=0;o<t.length;o++)c[o]=0;for(o=e;o<s._row.length;o++)if(s._row[o]^n)c[f]++;else{if(f===c.length-1){for(u=0,a=0;a<c.length;a++)u+=c[a];if((i=s._matchPattern(c,t))<d)return l.error=i,l.start=o-u,l.end=o,l;if(!r)return null;for(a=0;a<c.length-2;a++)c[a]=c[a+2];c[c.length-2]=0,c[c.length-1]=0,f--}else f++;c[f]=1,n=!n}return null},r.prototype._findStart=function(){for(var t,e,n=this,r=n._nextSet(n._row),o=1;!e;){if(!(e=n._findPattern(n.START_PATTERN,r,!1,!0)))return null;if(o=Math.floor((e.end-e.start)/4),(t=e.start-10*o)>=0&&n._matchRange(t,e.start,0))return e;r=e.end,e=null}},r.prototype._verifyTrailingWhitespace=function(t){var e,n=this;return e=t.end+(t.end-t.start)/2,e<n._row.length&&n._matchRange(t.end,e,0)?t:null},r.prototype._findEnd=function(){var t,e,n=this;return n._row.reverse(),t=n._findPattern(n.STOP_PATTERN),n._row.reverse(),null===t?null:(e=t.start,t.start=n._row.length-t.end,t.end=n._row.length-e,null!==t?n._verifyTrailingWhitespace(t):null)},r.prototype._decodePair=function(t){var e,n,r=[],o=this;for(e=0;e<t.length;e++){if(!(n=o._decodeCode(t[e])))return null;r.push(n)}return r},r.prototype._decodeCode=function(t){var e,n,r,o=this,i=0,a=o.AVG_CODE_ERROR,u={error:Number.MAX_VALUE,code:-1,start:0,end:0};for(e=0;e<t.length;e++)i+=t[e];for(r=0;r<o.CODE_PATTERN.length;r++)(n=o._matchPattern(t,o.CODE_PATTERN[r]))<u.error&&(u.code=r,u.error=n);if(u.error<a)return u},r.prototype._decodePayload=function(t,e,n){for(var r,o,i=this,a=0,u=t.length,c=[[0,0,0,0,0],[0,0,0,0,0]];a<u;){for(r=0;r<5;r++)c[0][r]=t[a]*this.barSpaceRatio[0],c[1][r]=t[a+1]*this.barSpaceRatio[1],a+=2;if(!(o=i._decodePair(c)))return null;for(r=0;r<o.length;r++)e.push(o[r].code+""),n.push(o[r])}return o},r.prototype._verifyCounterLength=function(t){return t.length%10==0},r.prototype._decode=function(){var t,e,n,r=this,o=[],i=[];return(t=r._findStart())?(i.push(t),(e=r._findEnd())?(n=r._fillCounters(t.end,e.start,!1),r._verifyCounterLength(n)&&r._decodePayload(n,o,i)?o.length%2!=0||o.length<6?null:(i.push(e),{code:o.join(""),start:t.start,end:e.end,startInfo:t,decodedCodes:i}):null):null):null},r.CONFIG_KEYS={normalizeBarSpaceWidth:{type:"boolean",default:!1,description:"If true, the reader tries to normalize thewidth-difference between bars and spaces"}},e.a=r},function(t,e,n){"use strict";function r(t,e){o.a.call(this,t,e)}var o=n(4),i={CODE_FREQUENCY:{value:[[56,52,50,49,44,38,35,42,41,37],[7,11,13,14,19,25,28,21,22,26]]},STOP_PATTERN:{value:[1/6*7,1/6*7,1/6*7,1/6*7,1/6*7,1/6*7]},FORMAT:{value:"upc_e",writeable:!1}};r.prototype=Object.create(o.a.prototype,i),r.prototype.constructor=r,r.prototype._decodePayload=function(t,e,n){var r,o=this,i=0;for(r=0;r<6;r++){if(!(t=o._decodeCode(t.end)))return null;t.code>=o.CODE_G_START&&(t.code=t.code-o.CODE_G_START,i|=1<<5-r),e.push(t.code),n.push(t)}return o._determineParity(i,e)?t:null},r.prototype._determineParity=function(t,e){var n,r;for(r=0;r<this.CODE_FREQUENCY.length;r++)for(n=0;n<this.CODE_FREQUENCY[r].length;n++)if(t===this.CODE_FREQUENCY[r][n])return e.unshift(r),e.push(n),!0;return!1},r.prototype._convertToUPCA=function(t){var e=[t[0]],n=t[t.length-2];return e=n<=2?e.concat(t.slice(1,3)).concat([n,0,0,0,0]).concat(t.slice(3,6)):3===n?e.concat(t.slice(1,4)).concat([0,0,0,0,0]).concat(t.slice(4,6)):4===n?e.concat(t.slice(1,5)).concat([0,0,0,0,0,t[5]]):e.concat(t.slice(1,6)).concat([0,0,0,0,n]),e.push(t[t.length-1]),e},r.prototype._checksum=function(t){return o.a.prototype._checksum.call(this,this._convertToUPCA(t))},r.prototype._findEnd=function(t,e){return e=!0,o.a.prototype._findEnd.call(this,t,e)},r.prototype._verifyTrailingWhitespace=function(t){var e,n=this;if((e=t.end+(t.end-t.start)/2)<n._row.length&&n._matchRange(t.end,e,0))return t},e.a=r},function(t,e,n){"use strict";function r(t,e){o.a.call(this,t,e)}var o=n(4),i={FORMAT:{value:"upc_a",writeable:!1}};r.prototype=Object.create(o.a.prototype,i),r.prototype.constructor=r,r.prototype._decode=function(){var t=o.a.prototype._decode.call(this);return t&&t.code&&13===t.code.length&&"0"===t.code.charAt(0)?(t.code=t.code.substring(1),t):null},e.a=r},function(t,e){function n(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}t.exports=n},function(t,e){function n(){var t=new Float32Array(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t}t.exports=n},function(t,e){function n(t,e){var n=e[0],r=e[1],o=e[2],i=e[3],a=n*i-o*r;return a?(a=1/a,t[0]=i*a,t[1]=-r*a,t[2]=-o*a,t[3]=n*a,t):null}t.exports=n},function(t,e){function n(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t}t.exports=n},function(t,e){function n(t,e,n){var r=e[0],o=e[1];return t[0]=n[0]*r+n[2]*o,t[1]=n[1]*r+n[3]*o,t}t.exports=n},function(t,e){function n(t){var e=new Float32Array(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}t.exports=n},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(122),i=n(123),a=n(124),u=n(125),c=n(126);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=u,r.prototype.set=c,t.exports=r},function(t,e,n){function r(t){var e=this.__data__=new o(t);this.size=e.size}var o=n(10),i=n(149),a=n(150),u=n(151),c=n(152),s=n(153);r.prototype.clear=i,r.prototype.delete=a,r.prototype.get=u,r.prototype.has=c,r.prototype.set=s,t.exports=r},function(t,e,n){var r=n(5),o=r.Uint8Array;t.exports=o},function(t,e){function n(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}t.exports=n},function(t,e,n){function r(t,e){var n=a(t),r=!n&&i(t),f=!n&&!r&&u(t),d=!n&&!r&&!f&&s(t),h=n||r||f||d,p=h?o(t.length,String):[],v=p.length;for(var _ in t)!e&&!l.call(t,_)||h&&("length"==_||f&&("offset"==_||"parent"==_)||d&&("buffer"==_||"byteLength"==_||"byteOffset"==_)||c(_,v))||p.push(_);return p}var o=n(107),i=n(18),a=n(2),u=n(44),c=n(15),s=n(45),f=Object.prototype,l=f.hasOwnProperty;t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}t.exports=n},function(t,e,n){var r=n(0),o=Object.create,i=function(){function t(){}return function(e){if(!r(e))return{};if(o)return o(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();t.exports=i},function(t,e,n){function r(t,e,n,a,u){var c=-1,s=t.length;for(n||(n=i),u||(u=[]);++c<s;){var f=t[c];e>0&&n(f)?e>1?r(f,e-1,n,a,u):o(u,f):a||(u[u.length]=f)}return u}var o=n(90),i=n(128);t.exports=r},function(t,e,n){var r=n(117),o=r();t.exports=o},function(t,e,n){function r(t,e){e=o(e,t);for(var n=0,r=e.length;null!=t&&n<r;)t=t[i(e[n++])];return n&&n==r?t:void 0}var o=n(13),i=n(23);t.exports=r},function(t,e){function n(t,e){return null!=t&&e in Object(t)}t.exports=n},function(t,e,n){function r(t){return i(t)&&o(t)==a}var o=n(8),i=n(6),a="[object Arguments]";t.exports=r},function(t,e,n){function r(t){return!(!a(t)||i(t))&&(o(t)?p:s).test(u(t))}var o=n(25),i=n(132),a=n(0),u=n(155),c=/[\\^$.*+?()[\]{}|]/g,s=/^\[object .+?Constructor\]$/,f=Function.prototype,l=Object.prototype,d=f.toString,h=l.hasOwnProperty,p=RegExp("^"+d.call(h).replace(c,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t,e,n){function r(t){return a(t)&&i(t.length)&&!!u[o(t)]}var o=n(8),i=n(26),a=n(6),u={};u["[object Float32Array]"]=u["[object Float64Array]"]=u["[object Int8Array]"]=u["[object Int16Array]"]=u["[object Int32Array]"]=u["[object Uint8Array]"]=u["[object Uint8ClampedArray]"]=u["[object Uint16Array]"]=u["[object Uint32Array]"]=!0,u["[object Arguments]"]=u["[object Array]"]=u["[object ArrayBuffer]"]=u["[object Boolean]"]=u["[object DataView]"]=u["[object Date]"]=u["[object Error]"]=u["[object Function]"]=u["[object Map]"]=u["[object Number]"]=u["[object Object]"]=u["[object RegExp]"]=u["[object Set]"]=u["[object String]"]=u["[object WeakMap]"]=!1,t.exports=r},function(t,e,n){function r(t){if(!o(t))return a(t);var e=i(t),n=[];for(var r in t)("constructor"!=r||!e&&c.call(t,r))&&n.push(r);return n}var o=n(0),i=n(40),a=n(144),u=Object.prototype,c=u.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e,n,f,l){t!==e&&a(e,function(a,s){if(c(a))l||(l=new o),u(t,e,s,n,r,f,l);else{var d=f?f(t[s],a,s+"",t,e,l):void 0;void 0===d&&(d=a),i(t,s,d)}},s)}var o=n(85),i=n(35),a=n(93),u=n(101),c=n(0),s=n(46);t.exports=r},function(t,e,n){function r(t,e,n,r,y,m,x){var b=t[n],E=e[n],C=x.get(E);if(C)return void o(t,n,C);var O=m?m(b,E,n+"",t,e,x):void 0,A=void 0===O;if(A){var R=f(E),w=!R&&d(E),T=!R&&!w&&_(E);O=E,R||w||T?f(b)?O=b:l(b)?O=u(b):w?(A=!1,O=i(E,!0)):T?(A=!1,O=a(E,!0)):O=[]:v(E)||s(E)?(O=b,s(b)?O=g(b):(!p(b)||r&&h(b))&&(O=c(E))):A=!1}A&&(x.set(E,O),y(O,E,r,m,x),x.delete(E)),o(t,n,O)}var o=n(35),i=n(111),a=n(112),u=n(113),c=n(127),s=n(18),f=n(2),l=n(159),d=n(44),h=n(25),p=n(0),v=n(160),_=n(45),g=n(164);t.exports=r},function(t,e,n){function r(t,e){return o(t,e,function(e,n){return i(t,n)})}var o=n(103),i=n(158);t.exports=r},function(t,e,n){function r(t,e,n){for(var r=-1,u=e.length,c={};++r<u;){var s=e[r],f=o(t,s);n(f,s)&&i(c,a(s,t),f)}return c}var o=n(94),i=n(105),a=n(13);t.exports=r},function(t,e,n){function r(t,e){return a(i(t,e,o),t+"")}var o=n(43),i=n(41),a=n(42);t.exports=r},function(t,e,n){function r(t,e,n,r){if(!u(t))return t;e=i(e,t);for(var s=-1,f=e.length,l=f-1,d=t;null!=d&&++s<f;){var h=c(e[s]),p=n;if(s!=l){var v=d[h];p=r?r(v,h,d):void 0,void 0===p&&(p=u(v)?v:a(e[s+1])?[]:{})}o(d,h,p),d=d[h]}return t}var o=n(36),i=n(13),a=n(15),u=n(0),c=n(23);t.exports=r},function(t,e,n){var r=n(156),o=n(37),i=n(43),a=o?function(t,e){return o(t,"toString",{configurable:!0,enumerable:!1,value:r(e),writable:!0})}:i;t.exports=a},function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}t.exports=n},function(t,e,n){function r(t){if("string"==typeof t)return t;if(a(t))return i(t,r)+"";if(u(t))return f?f.call(t):"";var e=t+"";return"0"==e&&1/t==-c?"-0":e}var o=n(11),i=n(89),a=n(2),u=n(27),c=1/0,s=o?o.prototype:void 0,f=s?s.toString:void 0;t.exports=r},function(t,e){function n(t){return function(e){return t(e)}}t.exports=n},function(t,e,n){function r(t){var e=new t.constructor(t.byteLength);return new o(e).set(new o(t)),e}var o=n(86);t.exports=r},function(t,e,n){(function(t){function r(t,e){if(e)return t.slice();var n=t.length,r=s?s(n):new t.constructor(n);return t.copy(r),r}var o=n(5),i="object"==typeof e&&e&&!e.nodeType&&e,a=i&&"object"==typeof t&&t&&!t.nodeType&&t,u=a&&a.exports===i,c=u?o.Buffer:void 0,s=c?c.allocUnsafe:void 0;t.exports=r}).call(e,n(29)(t))},function(t,e,n){function r(t,e){var n=e?o(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}var o=n(110);t.exports=r},function(t,e){function n(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}t.exports=n},function(t,e,n){function r(t,e,n,r){var a=!n;n||(n={});for(var u=-1,c=e.length;++u<c;){var s=e[u],f=r?r(n[s],t[s],s,n,t):void 0;void 0===f&&(f=t[s]),a?i(n,s,f):o(n,s,f)}return n}var o=n(36),i=n(21);t.exports=r},function(t,e,n){var r=n(5),o=r["__core-js_shared__"];t.exports=o},function(t,e,n){function r(t){return o(function(e,n){var r=-1,o=n.length,a=o>1?n[o-1]:void 0,u=o>2?n[2]:void 0;for(a=t.length>3&&"function"==typeof a?(o--,a):void 0,u&&i(n[0],n[1],u)&&(a=o<3?void 0:a,o=1),e=Object(e);++r<o;){var c=n[r];c&&t(e,c,r,a)}return e})}var o=n(104),i=n(129);t.exports=r},function(t,e){function n(t){return function(e,n,r){for(var o=-1,i=Object(e),a=r(e),u=a.length;u--;){var c=a[t?u:++o];if(n(i[c],c,i)===!1)break}return e}}t.exports=n},function(t,e,n){function r(t){return a(i(t,void 0,o),t+"")}var o=n(157),i=n(41),a=n(42);t.exports=r},function(t,e,n){function r(t){var e=a.call(t,c),n=t[c];try{t[c]=void 0;var r=!0}catch(t){}var o=u.call(t);return r&&(e?t[c]=n:delete t[c]),o}var o=n(11),i=Object.prototype,a=i.hasOwnProperty,u=i.toString,c=o?o.toStringTag:void 0;t.exports=r},function(t,e){function n(t,e){return null==t?void 0:t[e]}t.exports=n},function(t,e,n){function r(t,e,n){e=o(e,t);for(var r=-1,f=e.length,l=!1;++r<f;){var d=s(e[r]);if(!(l=null!=t&&n(t,d)))break;t=t[d]}return l||++r!=f?l:!!(f=null==t?0:t.length)&&c(f)&&u(d,f)&&(a(t)||i(t))}var o=n(13),i=n(18),a=n(2),u=n(15),c=n(26),s=n(23);t.exports=r},function(t,e,n){function r(){this.__data__=o?o(null):{},this.size=0}var o=n(16);t.exports=r},function(t,e){function n(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}t.exports=n},function(t,e,n){function r(t){var e=this.__data__;if(o){var n=e[t];return n===i?void 0:n}return u.call(e,t)?e[t]:void 0}var o=n(16),i="__lodash_hash_undefined__",a=Object.prototype,u=a.hasOwnProperty;t.exports=r},function(t,e,n){function r(t){var e=this.__data__;return o?void 0!==e[t]:a.call(e,t)}var o=n(16),i=Object.prototype,a=i.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=o&&void 0===e?i:e,this}var o=n(16),i="__lodash_hash_undefined__";t.exports=r},function(t,e,n){function r(t){return"function"!=typeof t.constructor||a(t)?{}:o(i(t))}var o=n(91),i=n(39),a=n(40);t.exports=r},function(t,e,n){function r(t){return a(t)||i(t)||!!(u&&t&&t[u])}var o=n(11),i=n(18),a=n(2),u=o?o.isConcatSpreadable:void 0;t.exports=r},function(t,e,n){function r(t,e,n){if(!u(n))return!1;var r=typeof e;return!!("number"==r?i(n)&&a(e,n.length):"string"==r&&e in n)&&o(n[e],t)}var o=n(17),i=n(24),a=n(15),u=n(0);t.exports=r},function(t,e,n){function r(t,e){if(o(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!i(t))||(u.test(t)||!a.test(t)||null!=e&&t in Object(e))}var o=n(2),i=n(27),a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,u=/^\w*$/;t.exports=r},function(t,e){function n(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}t.exports=n},function(t,e,n){function r(t){return!!i&&i in t}var o=n(115),i=function(){var t=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=r},function(t,e){function n(){this.__data__=[],this.size=0}t.exports=n},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);return!(n<0)&&(n==e.length-1?e.pop():a.call(e,n,1),--this.size,!0)}var o=n(12),i=Array.prototype,a=i.splice;t.exports=r},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);return n<0?void 0:e[n][1]}var o=n(12);t.exports=r},function(t,e,n){function r(t){return o(this.__data__,t)>-1}var o=n(12);t.exports=r},function(t,e,n){function r(t,e){var n=this.__data__,r=o(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}var o=n(12);t.exports=r},function(t,e,n){function r(){this.size=0,this.__data__={hash:new o,map:new(a||i),string:new o}}var o=n(84),i=n(10),a=n(33);t.exports=r},function(t,e,n){function r(t){var e=o(this,t).delete(t);return this.size-=e?1:0,e}var o=n(14);t.exports=r},function(t,e,n){function r(t){return o(this,t).get(t)}var o=n(14);t.exports=r},function(t,e,n){function r(t){return o(this,t).has(t)}var o=n(14);t.exports=r},function(t,e,n){function r(t,e){var n=o(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}var o=n(14);t.exports=r},function(t,e,n){function r(t){var e=o(t,function(t){return n.size===i&&n.clear(),t}),n=e.cache;return e}var o=n(161),i=500;t.exports=r},function(t,e){function n(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}t.exports=n},function(t,e,n){(function(t){var r=n(38),o="object"==typeof e&&e&&!e.nodeType&&e,i=o&&"object"==typeof t&&t&&!t.nodeType&&t,a=i&&i.exports===o,u=a&&r.process,c=function(){try{return u&&u.binding&&u.binding("util")}catch(t){}}();t.exports=c}).call(e,n(29)(t))},function(t,e){function n(t){return o.call(t)}var r=Object.prototype,o=r.toString;t.exports=n},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},function(t,e){function n(t){var e=0,n=0;return function(){var a=i(),u=o-(a-n);if(n=a,u>0){if(++e>=r)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var r=800,o=16,i=Date.now;t.exports=n},function(t,e,n){function r(){this.__data__=new o,this.size=0}var o=n(10);t.exports=r},function(t,e){function n(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}t.exports=n},function(t,e){function n(t){return this.__data__.get(t)}t.exports=n},function(t,e){function n(t){return this.__data__.has(t)}t.exports=n},function(t,e,n){function r(t,e){var n=this.__data__;if(n instanceof o){var r=n.__data__;if(!i||r.length<u-1)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new a(r)}return n.set(t,e),this.size=n.size,this}var o=n(10),i=n(33),a=n(34),u=200;t.exports=r},function(t,e,n){var r=n(143),o=/^\./,i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,a=/\\(\\)?/g,u=r(function(t){var e=[];return o.test(t)&&e.push(""),t.replace(i,function(t,n,r,o){e.push(r?o.replace(a,"$1"):n||t)}),e});t.exports=u},function(t,e){function n(t){if(null!=t){try{return o.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var r=Function.prototype,o=r.toString;t.exports=n},function(t,e){function n(t){return function(){return t}}t.exports=n},function(t,e,n){function r(t){return(null==t?0:t.length)?o(t,1):[]}var o=n(92);t.exports=r},function(t,e,n){function r(t,e){return null!=t&&i(t,e,o)}var o=n(95),i=n(121);t.exports=r},function(t,e,n){function r(t){return i(t)&&o(t)}var o=n(24),i=n(6);t.exports=r},function(t,e,n){function r(t){if(!a(t)||o(t)!=u)return!1;var e=i(t);if(null===e)return!0;var n=l.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&f.call(n)==d}var o=n(8),i=n(39),a=n(6),u="[object Object]",c=Function.prototype,s=Object.prototype,f=c.toString,l=s.hasOwnProperty,d=f.call(Object);t.exports=r},function(t,e,n){function r(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(i);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var a=t.apply(this,r);return n.cache=i.set(o,a)||i,a};return n.cache=new(r.Cache||o),n}var o=n(34),i="Expected a function";r.Cache=o,t.exports=r},function(t,e,n){var r=n(102),o=n(118),i=o(function(t,e){return null==t?{}:r(t,e)});t.exports=i},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t){return o(t,i(t))}var o=n(114),i=n(46);t.exports=r},function(t,e,n){function r(t){return null==t?"":o(t)}var o=n(108);t.exports=r},function(t,e,n){t.exports=n(48)}])});

/*=======================================================================================*\
========== @BARRAS - GENERADOR DE BARRAS ==================================================
\*=======================================================================================*/
//genera codigo UNIX
function axcodunix()
{	let datetime=new Date();
	return datetime.getTime();
}

function axcodqr(obj,dat,ancho,alto,colp,cols)
{	document.getElementById(obj).innerHTML='';
	if(ancho=='' || ancho==undefined || ancho==null){ancho=256;}
	if(alto=='' || alto==undefined || alto==null){alto=256;}
	if(colp==undefined || colp==''){colp=getComputedStyle(document.documentElement).getPropertyValue('--colpri');}
	if(cols==undefined || cols==''){cols=getComputedStyle(document.documentElement).getPropertyValue('--colsec');}
	var qrcode = new QRCode(obj,
	{	text: dat,
		width: ancho,
		height: alto,
		colorDark: colp,
		colorLight: cols,
		correctLevel : QRCode.CorrectLevel.H
	});			
}

function axcodbar(obj,cod,alto,colr,mosv)
{	if(alto==undefined){alto=40}
	if(mosv==undefined){mosv=false}
	if(colr==undefined){colr=getComputedStyle(document.documentElement).getPropertyValue('--colpri');}
	//colsec=getComputedStyle(document.documentElement).getPropertyValue('--colsec');
	JsBarcode(`#${obj}`,cod,
	{	format: "codabar",
		lineColor:colr,
		width: 4,
		height:alto,
		displayValue: mosv
	});
	document.getElementById(obj).style.fill='yellow';
}

!function(t)
{	var e={};
	function n(r)
	{	if(e[r])return e[r].exports;
		var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=15)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=e,this.text=n.text||e,this.options=n}},function(t,e,n){"use strict";var r;function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0});var i=e.SET_A=0,a=e.SET_B=1,u=e.SET_C=2,f=(e.SHIFT=98,e.START_A=103),c=e.START_B=104,s=e.START_C=105;e.MODULO=103,e.STOP=106,e.FNC1=207,e.SET_BY_CODE=(o(r={},f,i),o(r,c,a),o(r,s,u),r),e.SWAP={101:i,100:a,99:u},e.A_START_CHAR=String.fromCharCode(208),e.B_START_CHAR=String.fromCharCode(209),e.C_START_CHAR=String.fromCharCode(210),e.A_CHARS="[\0-_È-Ï]",e.B_CHARS="[ -È-Ï]",e.C_CHARS="(Ï*[0-9]{2}Ï*)",e.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SIDE_BIN="101",e.MIDDLE_BIN="01010",e.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},e.EAN2_STRUCTURE=["LL","LG","GL","GG"],e.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],e.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);e.default=function(t,e,n){var o=t.split("").map((function(t,n){return r.BINARIES[e[n]]})).map((function(e,n){return e?e[t[n]]:""}));if(n){var i=t.length-1;o=o.map((function(t,e){return e<i?t+n:t}))}return o.join("")}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);var a=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var n=parseInt(this.data[e]).toString(2);n=u(n,4-n.length);for(var r=0;r<n.length;r++)t+="0"==n[r]?"100":"110"}return{data:t+="1001",text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),e}(((r=i)&&r.__esModule?r:{default:r}).default);function u(t,e){for(var n=0;n<e;n++)t="0"+t;return t}e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0),a=(r=i)&&r.__esModule?r:{default:r},u=n(1);var f=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.substring(1),n));return r.bytes=t.split("").map((function(t){return t.charCodeAt(0)})),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var t=this.bytes,n=t.shift()-105,r=u.SET_BY_CODE[n];if(void 0===r)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&t.unshift(u.FNC1);var o=e.next(t,1,r);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:e.getBar(n)+o.result+e.getBar((o.checksum+n)%u.MODULO)+e.getBar(u.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return u.BARS[t]?u.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===u.SET_A){var n=t.shift();return n<32?n+64:n-32}return e===u.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(t,n,r){if(!t.length)return{result:"",checksum:0};var o=void 0,i=void 0;if(t[0]>=200){i=t.shift()-105;var a=u.SWAP[i];void 0!==a?o=e.next(t,n+1,a):(r!==u.SET_A&&r!==u.SET_B||i!==u.SHIFT||(t[0]=r===u.SET_A?t[0]>95?t[0]-96:t[0]:t[0]<32?t[0]+96:t[0]),o=e.next(t,n+1,r))}else i=e.correctIndex(t,r),o=e.next(t,n+1,r);var f=i*n;return{result:e.getBar(i)+o.result,checksum:f+o.checksum}}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.mod10=function(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);(n+t.length)%2==0?e+=r:e+=2*r%10+Math.floor(2*r/10)}return(10-e%10)%10},e.mod11=function(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){var o=parseInt(t[t.length-1-r]);e+=n[r%n.length]*o}return(11-e%11)%11}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.default=function(t,e){return r({},t,e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=n(2),i=a(n(3));function a(t){return t&&t.__esModule?t:{default:t}}var u=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.fontSize=!n.flat&&n.fontSize>10*n.width?10*n.width:n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,i.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,i.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:o.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:o.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:o.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[o.SIDE_BIN,this.leftEncode(),o.MIDDLE_BIN,this.rightEncode(),o.SIDE_BIN].join(""),text:this.text}}}]),e}(a(n(0)).default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.checksum=u;var o=i(n(3));function i(t){return t&&t.__esModule?t:{default:t}}var a=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),-1!==t.search(/^[0-9]{11}$/)&&(t+=u(t));var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==u(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,o.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,o.default)(this.data.substr(6,6),"RRRRRR"),{data:t+="101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,o.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,o.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,o.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,o.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),e}(i(n(0)).default);function u(t){var e,n=0;for(e=1;e<11;e+=2)n+=parseInt(t[e]);for(e=0;e<11;e+=2)n+=3*parseInt(t[e]);return(10-n%10)%10}e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(31),a=n(0);function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var c=function(t){function e(){return u(this,e),f(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){var t=this,e=this.data.match(/.{2}/g).map((function(e){return t.encodePair(e)})).join("");return{data:i.START_BIN+e+i.END_BIN,text:this.text}}},{key:"encodePair",value:function(t){var e=i.BINARIES[t[1]];return i.BINARIES[t[0]].split("").map((function(t,n){return("1"===t?"111":"1")+("1"===e[n]?"000":"0")})).join("")}}]),e}(((r=a)&&r.__esModule?r:{default:r}).default);e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var n in e)e.hasOwnProperty(n)&&(n=e[n],"string"==typeof t[n]&&(t[n]=parseInt(t[n],10)));"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue);return t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTotalWidthOfEncodings=e.calculateEncodingAttributes=e.getBarcodePadding=e.getEncodingHeight=e.getMaximumHeightOfEncodings=void 0;var r,o=n(7),i=(r=o)&&r.__esModule?r:{default:r};function a(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function u(t,e,n){if(n.displayValue&&e<t){if("center"==n.textAlign)return Math.floor((t-e)/2);if("left"==n.textAlign)return 0;if("right"==n.textAlign)return Math.floor(t-e)}return 0}function f(t,e,n){var r;if(n)r=n;else{if("undefined"==typeof document)return 0;r=document.createElement("canvas").getContext("2d")}return r.font=e.fontOptions+" "+e.fontSize+"px "+e.font,r.measureText(t).width}e.getMaximumHeightOfEncodings=function(t){for(var e=0,n=0;n<t.length;n++)t[n].height>e&&(e=t[n].height);return e},e.getEncodingHeight=a,e.getBarcodePadding=u,e.calculateEncodingAttributes=function(t,e,n){for(var r=0;r<t.length;r++){var o,c=t[r],s=(0,i.default)(e,c.options);o=s.displayValue?f(c.text,s,n):0;var l=c.data.length*s.width;c.width=Math.ceil(Math.max(o,l)),c.height=a(c,s),c.barcodePadding=u(o,l,s)}},e.getTotalWidthOfEncodings=function(t){for(var e=0,n=0;n<t.length;n++)e+=t[n].width;return e}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="InvalidInputException",i.symbology=t,i.input=n,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return i(e,Error),e}(),u=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="InvalidElementException",t.message="Not supported type to render on",t}return i(e,Error),e}(),f=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="NoElementException",t.message="No element to render on.",t}return i(e,Error),e}();e.InvalidInputException=a,e.InvalidElementException=u,e.NoElementException=f},function(t,e,n){"use strict";var r=p(n(16)),o=p(n(7)),i=p(n(41)),a=p(n(42)),u=p(n(43)),f=p(n(11)),c=p(n(49)),s=n(14),l=p(n(12));function p(t){return t&&t.__esModule?t:{default:t}}var d=function(){},h=function(t,e,n){var r=new d;if(void 0===t)throw Error("No element to render on was provided.");return r._renderProperties=(0,u.default)(t),r._encodings=[],r._options=l.default,r._errorHandler=new c.default(r),void 0!==e&&((n=n||{}).format||(n.format=_()),r.options(n)[n.format](e,n).render()),r};for(var y in h.getModule=function(t){return r.default[t]},r.default)r.default.hasOwnProperty(y)&&b(r.default,y);function b(t,e){d.prototype[e]=d.prototype[e.toUpperCase()]=d.prototype[e.toLowerCase()]=function(n,r){var i=this;return i._errorHandler.wrapBarcodeCall((function(){r.text=void 0===r.text?void 0:""+r.text;var a=(0,o.default)(i._options,r);a=(0,f.default)(a);var u=t[e],c=v(n,u,a);return i._encodings.push(c),i}))}}function v(t,e,n){var r=new e(t=""+t,n);if(!r.valid())throw new s.InvalidInputException(r.constructor.name,t);var a=r.encode();a=(0,i.default)(a);for(var u=0;u<a.length;u++)a[u].options=(0,o.default)(n,a[u].options);return a}function _(){return r.default.CODE128?"CODE128":Object.keys(r.default)[0]}function g(t,e,n){e=(0,i.default)(e);for(var r=0;r<e.length;r++)e[r].options=(0,o.default)(n,e[r].options),(0,a.default)(e[r].options);(0,a.default)(n),new(0,t.renderer)(t.element,e,n).render(),t.afterRender&&t.afterRender()}d.prototype.options=function(t){return this._options=(0,o.default)(this._options,t),this},d.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},d.prototype.init=function(){var t;if(this._renderProperties)for(var e in Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]),this._renderProperties){t=this._renderProperties[e];var n=(0,o.default)(this._options,t.options);"auto"==n.format&&(n.format=_()),this._errorHandler.wrapBarcodeCall((function(){var e=v(n.value,r.default[n.format.toUpperCase()],n);g(t,e,n)}))}},d.prototype.render=function(){if(!this._renderProperties)throw new s.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)g(this._renderProperties[t],this._encodings,this._options);else g(this._renderProperties,this._encodings,this._options);
	return this
},d.prototype._defaults=l.default,"undefined"!=typeof window&&(window.JsBarcode=h),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var n=[];return jQuery(this).each((function(){n.push(this)})),h(n,t,e)}),t.exports=h},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(17),o=n(18),i=n(24),a=n(30),u=n(33),f=n(38),c=n(39),s=n(40);e.default={CODE39:r.CODE39,CODE128:o.CODE128,CODE128A:o.CODE128A,CODE128B:o.CODE128B,CODE128C:o.CODE128C,EAN13:i.EAN13,EAN8:i.EAN8,EAN5:i.EAN5,EAN2:i.EAN2,UPC:i.UPC,UPCE:i.UPCE,ITF14:a.ITF14,ITF:a.ITF,MSI:u.MSI,MSI10:u.MSI10,MSI11:u.MSI11,MSI1010:u.MSI1010,MSI1110:u.MSI1110,pharmacode:f.pharmacode,codabar:c.codabar,GenericBarcode:s.GenericBarcode}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CODE39=void 0;var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);var a=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t=t.toUpperCase(),n.mod43&&(t+=function(t){return u[t]}(function(t){for(var e=0,n=0;n<t.length;n++)e+=s(t[n]);return e%=43}(t))),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"encode",value:function(){for(var t=c("*"),e=0;e<this.data.length;e++)t+=c(this.data[e])+"0";return{data:t+=c("*"),text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),e}(((r=i)&&r.__esModule?r:{default:r}).default),u=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],f=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function c(t){return function(t){return f[t].toString(2)}(s(t))}function s(t){return u.indexOf(t)}e.CODE39=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CODE128C=e.CODE128B=e.CODE128A=e.CODE128=void 0;var r=u(n(19)),o=u(n(21)),i=u(n(22)),a=u(n(23));function u(t){return t&&t.__esModule?t:{default:t}}e.CODE128=r.default,e.CODE128A=o.default,e.CODE128B=i.default,e.CODE128C=a.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(n(5)),o=i(n(20));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var u=function(t){function e(t,n){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),/^[\x00-\x7F\xC8-\xD3]+$/.test(t))var r=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,(0,o.default)(t),n));else r=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return a(r)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(r.default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),o=function(t){return t.match(new RegExp("^"+r.A_CHARS+"*"))[0].length},i=function(t){return t.match(new RegExp("^"+r.B_CHARS+"*"))[0].length},a=function(t){return t.match(new RegExp("^"+r.C_CHARS+"*"))[0]};function u(t,e){var n=e?r.A_CHARS:r.B_CHARS,o=t.match(new RegExp("^("+n+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(o)return o[1]+String.fromCharCode(204)+f(t.substring(o[1].length));var i=t.match(new RegExp("^"+n+"+"))[0];return i.length===t.length?t:i+String.fromCharCode(e?205:206)+u(t.substring(i.length),!e)}function f(t){var e=a(t),n=e.length;if(n===t.length)return t;t=t.substring(n);var r=o(t)>=i(t);return e+String.fromCharCode(r?206:205)+u(t,r)}e.default=function(t){var e=void 0;if(a(t).length>=2)e=r.C_START_CHAR+f(t);else{var n=o(t)>i(t);e=(n?r.A_START_CHAR:r.B_START_CHAR)+u(t,n)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,(function(t,e){return String.fromCharCode(203)+e}))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),a=(r=i)&&r.__esModule?r:{default:r},u=n(1);var f=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,u.A_START_CHAR+t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return new RegExp("^"+u.A_CHARS+"+$").test(this.data)}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),a=(r=i)&&r.__esModule?r:{default:r},u=n(1);var f=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,u.B_START_CHAR+t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return new RegExp("^"+u.B_CHARS+"+$").test(this.data)}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),a=(r=i)&&r.__esModule?r:{default:r},u=n(1);var f=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,u.C_START_CHAR+t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return new RegExp("^"+u.C_CHARS+"+$").test(this.data)}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UPCE=e.UPC=e.EAN2=e.EAN5=e.EAN8=e.EAN13=void 0;var r=c(n(25)),o=c(n(26)),i=c(n(27)),a=c(n(28)),u=c(n(9)),f=c(n(29));function c(t){return t&&t.__esModule?t:{default:t}}e.EAN13=r.default,e.EAN8=o.default,e.EAN5=i.default,e.EAN2=a.default,e.UPC=u.default,e.UPCE=f.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(r):void 0},a=n(2),u=n(8),f=(r=u)&&r.__esModule?r:{default:r};var c=function(t){return(10-t.substr(0,12).split("").map((function(t){return+t})).reduce((function(t,e,n){return n%2?t+3*e:t+e}),0)%10)%10},s=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),-1!==t.search(/^[0-9]{12}$/)&&(t+=c(t));var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.lastChar=n.lastChar,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===c(this.data)}},{key:"leftText",value:function(){return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var t=this.data.substr(1,6),n=a.EAN13_STRUCTURE[this.data[0]];return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,n)}},{key:"rightText",value:function(){return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var t=this.data.substr(7,6);return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRRRR")}},{key:"encodeGuarded",value:function(){var t=i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(t.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(t.push({data:"00"}),t.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),t}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(r):void 0},a=n(8),u=(r=a)&&r.__esModule?r:{default:r};var f=function(t){return(10-t.substr(0,7).split("").map((function(t){return+t})).reduce((function(t,e,n){return n%2?t+e:t+3*e}),0)%10)%10},c=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),-1!==t.search(/^[0-9]{7}$/)&&(t+=f(t)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===f(this.data)}},{key:"leftText",value:function(){return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var t=this.data.substr(0,4);return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,"LLLL")}},{key:"rightText",value:function(){return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var t=this.data.substr(4,4);return i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRR")}}]),e}(u.default);e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=n(2),i=u(n(3)),a=u(n(0));function u(t){return t&&t.__esModule?t:{default:t}}var f=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t,e=o.EAN5_STRUCTURE[(t=this.data,t.split("").map((function(t){return+t})).reduce((function(t,e,n){return n%2?t+9*e:t+3*e}),0)%10)];return{data:"1011"+(0,i.default)(this.data,e,"01"),text:this.text}}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=n(2),i=a(n(3));function a(t){return t&&t.__esModule?t:{default:t}}var u=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=o.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,i.default)(this.data,t,"01"),text:this.text}}}]),e}(a(n(0)).default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=u(n(3)),i=u(n(0)),a=n(9);function u(t){return t&&t.__esModule?t:{default:t}}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var c=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],s=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],l=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=f(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));if(r.isValid=!1,-1!==t.search(/^[0-9]{6}$/))r.middleDigits=t,r.upcA=p(t,"0"),r.text=n.text||""+r.upcA[0]+t+r.upcA[r.upcA.length-1],r.isValid=!0;else{if(-1===t.search(/^[01][0-9]{7}$/))return f(r);if(r.middleDigits=t.substring(1,t.length-1),r.upcA=p(r.middleDigits,t[0]),r.upcA[r.upcA.length-1]!==t[t.length-1])return f(r);r.isValid=!0}return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),{data:t+="010101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],n=s[parseInt(e)][parseInt(t)];return(0,o.default)(this.middleDigits,n)}}]),e}(i.default);function p(t,e){for(var n=parseInt(t[t.length-1]),r=c[n],o="",i=0,u=0;u<r.length;u++){var f=r[u];o+="X"===f?t[i++]:f}return""+(o=""+e+o)+(0,a.checksum)(o)}e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ITF14=e.ITF=void 0;var r=i(n(10)),o=i(n(32));function i(t){return t&&t.__esModule?t:{default:t}}e.ITF=r.default,e.ITF14=o.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.START_BIN="1010",e.END_BIN="11101",e.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(10),a=(r=i)&&r.__esModule?r:{default:r};var u=function(t){var e=t.substr(0,13).split("").map((function(t){return parseInt(t,10)})).reduce((function(t,e,n){return t+e*(3-n%2*2)}),0);return 10*Math.ceil(e/10)-e},f=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),-1!==t.search(/^[0-9]{13}$/)&&(t+=u(t)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===u(this.data)}}]),e}(a.default);e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MSI1110=e.MSI1010=e.MSI11=e.MSI10=e.MSI=void 0;var r=f(n(4)),o=f(n(34)),i=f(n(35)),a=f(n(36)),u=f(n(37));function f(t){return t&&t.__esModule?t:{default:t}}e.MSI=r.default,e.MSI10=o.default,e.MSI11=i.default,e.MSI1010=a.default,e.MSI1110=u.default},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(4),i=(r=o)&&r.__esModule?r:{default:r},a=n(6);var u=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,a.mod10)(t),n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(i.default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(4),i=(r=o)&&r.__esModule?r:{default:r},a=n(6);var u=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,a.mod11)(t),n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(i.default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(4),i=(r=o)&&r.__esModule?r:{default:r},a=n(6);var u=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t+=(0,a.mod10)(t),t+=(0,a.mod10)(t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(i.default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(4),i=(r=o)&&r.__esModule?r:{default:r},a=n(6);var u=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t+=(0,a.mod11)(t),t+=(0,a.mod10)(t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(i.default);e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.pharmacode=void 0;var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);var a=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.number=parseInt(t,10),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return{data:e=e.slice(0,-2),text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),e}(((r=i)&&r.__esModule?r:{default:r}).default);e.pharmacode=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.codabar=void 0;var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);var a=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),0===t.search(/^[0-9\-\$\:\.\+\/]+$/)&&(t="A"+t+"A");var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.toUpperCase(),n));return r.text=r.options.text||r.text.replace(/[A-D]/g,""),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),n=0;n<this.data.length;n++)t.push(e[this.data.charAt(n)]),n!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"101100110011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),e}(((r=i)&&r.__esModule?r:{default:r}).default);e.codabar=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GenericBarcode=void 0;var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0);var a=function(t){function e(t,n){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),e}(((r=i)&&r.__esModule?r:{default:r}).default);e.GenericBarcode=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=[];return function t(n){if(Array.isArray(n))for(var r=0;r<n.length;r++)t(n[r]);else n.text=n.text||"",n.data=n.data||"",e.push(n)}(t),e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=u(n(44)),i=u(n(45)),a=n(14);function u(t){return t&&t.__esModule?t:{default:t}}function f(t){if("string"==typeof t)return function(t){var e=document.querySelectorAll(t);if(0===e.length)return;for(var n=[],r=0;r<e.length;r++)n.push(f(e[r]));return n}(t);if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(f(t[n]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return u=t,{element:c=document.createElement("canvas"),options:(0,o.default)(u),renderer:i.default.CanvasRenderer,afterRender:function(){u.setAttribute("src",c.toDataURL())}};if(t&&t.nodeName&&"svg"===t.nodeName.toLowerCase()||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,o.default)(t),renderer:i.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,o.default)(t),renderer:i.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:i.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":r(t))&&!t.nodeName)return{element:t,renderer:i.default.ObjectRenderer};throw new a.InvalidElementException;var u,c}e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(n(11)),o=i(n(12));function i(t){return t&&t.__esModule?t:{default:t}}e.default=function(t){var e={};for(var n in o.default)o.default.hasOwnProperty(n)&&(t.hasAttribute("jsbarcode-"+n.toLowerCase())&&(e[n]=t.getAttribute("jsbarcode-"+n.toLowerCase())),t.hasAttribute("data-"+n.toLowerCase())&&(e[n]=t.getAttribute("data-"+n.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,r.default)(e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(n(46)),o=a(n(47)),i=a(n(48));function a(t){return t&&t.__esModule?t:{default:t}}e.default={CanvasRenderer:r.default,SVGRenderer:o.default,ObjectRenderer:i.default}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(7),a=(r=i)&&r.__esModule?r:{default:r},u=n(13);var f=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.encodings=n,this.options=r}return o(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,a.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,u.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,u.getTotalWidthOfEncodings)(this.encodings),n=(0,u.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=n,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var n,r=this.canvas.getContext("2d"),o=e.data;n="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,r.fillStyle=t.lineColor;for(var i=0;i<o.length;i++){var a=i*t.width+e.barcodePadding;"1"===o[i]?r.fillRect(a,n,t.width,t.height):o[i]&&r.fillRect(a,n,t.width,t.height*o[i])}}},{key:"drawCanvasText",value:function(t,e){var n,r,o=this.canvas.getContext("2d"),i=t.fontOptions+" "+t.fontSize+"px "+t.font;t.displayValue&&(r="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,o.font=i,"left"==t.textAlign||e.barcodePadding>0?(n=0,o.textAlign="left"):"right"==t.textAlign?(n=e.width-1,o.textAlign="right"):(n=e.width/2,o.textAlign="center"),o.fillText(e.text,n,r))}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(7),a=(r=i)&&r.__esModule?r:{default:r},u=n(13);var f="http://www.w3.org/2000/svg",c=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.svg=e,this.encodings=n,this.options=r,this.document=r.xmlDocument||document}return o(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var n=this.encodings[e],r=(0,a.default)(this.options,n.options),o=this.createGroup(t,r.marginTop,this.svg);this.setGroupOptions(o,r),this.drawSvgBarcode(o,r,n),this.drawSVGText(o,r,n),t+=n.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,u.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,u.getTotalWidthOfEncodings)(this.encodings),e=(0,u.getMaximumHeightOfEncodings)(this.encodings),n=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(n,e),this.options.background&&this.drawRect(0,0,n,e,this.svg).setAttribute("style","fill:"+this.options.background+";")}},{key:"drawSvgBarcode",value:function(t,e,n){var r,o=n.data;r="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var i=0,a=0,u=0;u<o.length;u++)a=u*e.width+n.barcodePadding,"1"===o[u]?i++:i>0&&(this.drawRect(a-e.width*i,r,e.width*i,e.height,t),i=0);i>0&&this.drawRect(a-e.width*(i-1),r,e.width*i,e.height,t)}},{key:"drawSVGText",value:function(t,e,n){var r,o,i=this.document.createElementNS(f,"text");e.displayValue&&(i.setAttribute("style","font:"+e.fontOptions+" "+e.fontSize+"px "+e.font),o="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||n.barcodePadding>0?(r=0,i.setAttribute("text-anchor","start")):"right"==e.textAlign?(r=n.width-1,i.setAttribute("text-anchor","end")):(r=n.width/2,i.setAttribute("text-anchor","middle")),i.setAttribute("x",r),i.setAttribute("y",o),i.appendChild(this.document.createTextNode(n.text)),t.appendChild(i))}},{key:"setSvgAttributes",value:function(t,e){var n=this.svg;n.setAttribute("width",t+"px"),n.setAttribute("height",e+"px"),n.setAttribute("x","0px"),n.setAttribute("y","0px"),n.setAttribute("viewBox","0 0 "+t+" "+e),n.setAttribute("xmlns",f),n.setAttribute("version","1.1"),n.setAttribute("style","transform: translate(0,0)")}},{key:"createGroup",value:function(t,e,n){var r=this.document.createElementNS(f,"g");return r.setAttribute("transform","translate("+t+", "+e+")"),n.appendChild(r),r}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("style","fill:"+e.lineColor+";")}},{key:"drawRect",value:function(t,e,n,r,o){var i=this.document.createElementNS(f,"rect");return i.setAttribute("x",t),i.setAttribute("y",e),i.setAttribute("width",n),i.setAttribute("height",r),o.appendChild(i),i}}]),t}();e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var o=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.object=e,this.encodings=n,this.options=r}return r(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=e}return r(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();e.default=o}]);

/*=======================================================================================*\
========== @QR GENERADOR QR ===============================================================
\*=======================================================================================*/

var QRCode;

(function ()
{	function QR8bitByte(data)
	{	this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);

			if (code > 0x10000) {
				byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
				byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
				byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[3] = 0x80 | (code & 0x3F);
			} else if (code > 0x800) {
				byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
				byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[2] = 0x80 | (code & 0x3F);
			} else if (code > 0x80) {
				byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
				byteArray[1] = 0x80 | (code & 0x3F);
			} else {
				byteArray[0] = code;
			}

			this.parsedData.push(byteArray);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	QR8bitByte.prototype=
	{	getLength: function(buffer)
		{	return this.parsedData.length;
		},
		write: function (buffer)
		{	for (var i = 0, l = this.parsedData.length; i < l; i++)
			{	buffer.put(this.parsedData[i], 8);
			}
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = [];
	}

	QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
	return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
	this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
	if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
	this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
	return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
	return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
	this.modules[r][6]=(r%2==0);}
	for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
	this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
	for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
	for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
	for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
	this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
	var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
	this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
	row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
	var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
	if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
	+buffer.getLengthInBits()
	+">"
	+totalDataCount*8
	+")");}
	if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
	while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
	while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD1,8);}
	return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
	offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
	var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
	var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
	for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
	return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
	return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
	return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
	return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
	return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
	for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
	if(r==0&&c==0){continue;}
	if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
	if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
	for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
	for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
	for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
	var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
	var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
	return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
	while(n>=256){n-=255;}
	return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
	for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
	for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
	function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
	QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
	return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
	var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
	for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
	return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
	QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
	var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
	return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
	QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
	if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
	this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
	
	function _isSupportCanvas()
	{	return typeof CanvasRenderingContext2D != "undefined";
	}
	
	function _getAndroid()
	{	var android = false;
		var sAgent = navigator.userAgent;
		
		if (/android/i.test(sAgent))
		{	// android
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			
			if (aMat && aMat[1])
			{	android = parseFloat(aMat[1]);	}
		}
		return android;
	}
	
	var svgDrawer = (function() {

		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);

			this.clear();

			function makeSVG(tag, attrs) {
				var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
				for (var k in attrs)
					if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
				return el;
			}

			var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			_el.appendChild(svg);

			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					if (oQRCode.isDark(row, col)) {
						var child = makeSVG("use", {"x": String(col), "y": String(row)});
						child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
						svg.appendChild(child);
					}
				}
			}
		};
		Drawing.prototype.clear = function () {
			while (this._el.hasChildNodes())
				this._el.removeChild(this._el.lastChild);
		};
		return Drawing;
	})();

	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

	// Drawing in DOM by using Table tag
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};
			
		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			
			for (var row = 0; row < nCount; row++) {
				aHTML.push('<tr>');
				
				for (var col = 0; col < nCount; col++) {
					aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				}
				
				aHTML.push('</tr>');
			}
			
			aHTML.push('</table>');
			_el.innerHTML = aHTML.join('');
			
			// Fix the margin values as real size.
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
				elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
			}
		};
		
		Drawing.prototype.clear = function () {
			this._el.innerHTML = '';
		};
		
		return Drawing;
	})() : (function () { // Drawing in Canvas
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			this._elImage.style.display = "block";
			this._elCanvas.style.display = "none";			
		}
		
		// Android 2.1 bug workaround
		// http://code.google.com/p/android/issues/detail?id=5141
		if (this._android && this._android <= 2.1) {
			var factor = 1 / window.devicePixelRatio;
			var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
			CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
				if (("nodeName" in image) && /img/i.test(image.nodeName)) {
					for (var i = arguments.length - 1; i >= 1; i--) {
						arguments[i] = arguments[i] * factor;
					}
				} else if (typeof dw == "undefined") {
					arguments[1] *= factor;
					arguments[2] *= factor;
					arguments[3] *= factor;
					arguments[4] *= factor;
				}
				
				drawImage.apply(this, arguments); 
			};
		}
		
		function _safeSetDataURI(fSuccess, fFail) {
			var self = this;
			self._fFail = fFail;
			self._fSuccess = fSuccess;

			// Check it just once
			if (self._bSupportDataURI === null) {
				var el = document.createElement("img");
				var fOnError = function() {
					self._bSupportDataURI = false;

					if (self._fFail) {
						self._fFail.call(self);
					}
				};
				var fOnSuccess = function() {
					self._bSupportDataURI = true;

					if (self._fSuccess) {
						self._fSuccess.call(self);
					}
				};

				el.onabort = fOnError;
				el.onerror = fOnError;
				el.onload = fOnSuccess;
				el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
				return;
			} else if (self._bSupportDataURI === true && self._fSuccess) {
				self._fSuccess.call(self);
			} else if (self._bSupportDataURI === false && self._fFail) {
				self._fFail.call(self);
			}
		};
		
		var Drawing = function (el, htOption) {
			this._bIsPainted = false;
			this._android = _getAndroid();
		
			this._htOption = htOption;
			this._elCanvas = document.createElement("canvas");
			this._elCanvas.width = htOption.width;
			this._elCanvas.height = htOption.height;
			el.appendChild(this._elCanvas);
			this._el = el;
			this._oContext = this._elCanvas.getContext("2d");
			this._bIsPainted = false;
			this._elImage = document.createElement("img");
			this._elImage.alt = "Scan me!";
			this._elImage.style.display = "none";
			this._el.appendChild(this._elImage);
			this._bSupportDataURI = null;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _elImage = this._elImage;
			var _oContext = this._oContext;
			var _htOption = this._htOption;
			
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);

			_elImage.style.display = "none";
			this.clear();
			
			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					var bIsDark = oQRCode.isDark(row, col);
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
					_oContext.lineWidth = 1;
					_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
					_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
					
					// 안티 앨리어싱 방지 처리
					_oContext.strokeRect(
						Math.floor(nLeft) + 0.5,
						Math.floor(nTop) + 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
					
					_oContext.strokeRect(
						Math.ceil(nLeft) - 0.5,
						Math.ceil(nTop) - 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
				}
			}
			
			this._bIsPainted = true;
		};

		Drawing.prototype.makeImage = function () {
			if (this._bIsPainted) {
				_safeSetDataURI.call(this, _onMakeImage);
			}
		};

		Drawing.prototype.isPainted = function () {
			return this._bIsPainted;
		};
		
		Drawing.prototype.clear = function () {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false;
		};
		
		Drawing.prototype.round = function (nNumber) {
			if (!nNumber) {
				return nNumber;
			}
			
			return Math.floor(nNumber * 1000) / 1000;
		};
		
		return Drawing;
	})();
	
	function _getTypeNumber(sText, nCorrectLevel) {			
		var nType = 1;
		var length = _getUTF8Length(sText);
		
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			
			switch (nCorrectLevel) {
				case QRErrorCorrectLevel.L :
					nLimit = QRCodeLimitLength[i][0];
					break;
				case QRErrorCorrectLevel.M :
					nLimit = QRCodeLimitLength[i][1];
					break;
				case QRErrorCorrectLevel.Q :
					nLimit = QRCodeLimitLength[i][2];
					break;
				case QRErrorCorrectLevel.H :
					nLimit = QRCodeLimitLength[i][3];
					break;
			}
			
			if (length <= nLimit) {
				break;
			} else {
				nType++;
			}
		}
		
		if (nType > QRCodeLimitLength.length) {
			throw new Error("Too long data");
		}
		
		return nType;
	}

	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return replacedText.length + (replacedText.length != sText ? 3 : 0);
	}
	
	QRCode = function (el, vOption)
	{	this._htOption = {
			width : 256, 
			height : 256,
			typeNumber : 4,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRErrorCorrectLevel.H
		};
		
		if (typeof vOption === 'string') {
			vOption	= {
				text : vOption
			};
		}
		
		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i];
			}
		}
		
		if (typeof el == "string") {
			el = document.getElementById(el);
		}

		if (this._htOption.useSVG) {
			Drawing = svgDrawer;
		}
		
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		
		if (this._htOption.text) {
			this.makeCode(this._htOption.text);	
		}
	};
	
	QRCode.prototype.makeCode = function (sText)
	{	this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);			
		this.makeImage();
	};
	
	QRCode.prototype.makeImage = function()
	{	if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3))
		{	this._oDrawing.makeImage();
		}
	};
	
	QRCode.prototype.clear = function ()
	{	this._oDrawing.clear();
	};
	
	QRCode.CorrectLevel = QRErrorCorrectLevel;
})();


//OBJETO QUE PERMITE HACER EL EFECTO DE 3D EN LAS CARDS
var axmov3d = (function ()
{	'use strict';

	class axmov3d
	{	constructor(element, settings = {})
		{	if(!(element instanceof Node))
			{	throw ("Can't initialize axmov3d because " + element + " is not a Node.");	}

			this.width = null;
			this.height = null;
			this.clientWidth = null;
			this.clientHeight = null;
			this.left = null;
			this.top = null;
			// for Gyroscope sampling
			this.gammazero = null;
			this.betazero = null;
			this.lastgammazero = null;
			this.lastbetazero = null;
			this.transitionTimeout = null;

			this.updateCall = null;
			this.event = null;

			this.updateBind = this.update.bind(this);
			this.resetBind = this.reset.bind(this);

			this.element = element;
			this.settings = this.extendSettings(settings);

			this.reverse = this.settings.reverse ? -1 : 1;
			this.glare = axmov3d.isSettingTrue(this.settings.glare);
			this.glarePrerender = axmov3d.isSettingTrue(this.settings["glare-prerender"]);
			this.fullPageListening = axmov3d.isSettingTrue(this.settings["full-page-listening"]);
			this.gyroscope = axmov3d.isSettingTrue(this.settings.gyroscope);
			this.gyroscopeSamples = this.settings.gyroscopeSamples;

			this.elementListener = this.getElementListener();

			if (this.glare)
			{	this.prepareGlare();
			}

			if (this.fullPageListening)
			{	this.updateClientSize();
			}

			this.addEventListeners();
			this.updateInitialPosition();
		}

		static isSettingTrue(setting)
		{	return setting === "" || setting === true || setting === 1;
		}

		getElementListener()
		{	if(this.fullPageListening)
			{return window.document;}

			if (typeof this.settings["mouse-event-element"] === "string")
			{	const mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);

				if(mouseEventElement)
				{	return mouseEventElement;
				}
			}

			if (this.settings["mouse-event-element"] instanceof Node)
			{	return this.settings["mouse-event-element"];
			}

			return this.element;
		}

		addEventListeners()
		{	this.onMouseEnterBind = this.onMouseEnter.bind(this);
			this.onMouseMoveBind = this.onMouseMove.bind(this);
			this.onMouseLeaveBind = this.onMouseLeave.bind(this);
			this.onWindowResizeBind = this.onWindowResize.bind(this);
			this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

			this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
			this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
			this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

			if (this.glare || this.fullPageListening)
			{	window.addEventListener("resize", this.onWindowResizeBind);
			}

			if (this.gyroscope)
			{	window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
			}
		}

		removeEventListeners()
		{	this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
			this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
			this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);

			if (this.gyroscope)
			{	window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
			}

			if(this.glare || this.fullPageListening)
			{	window.removeEventListener("resize", this.onWindowResizeBind);
			}
		}

		destroy()
		{	clearTimeout(this.transitionTimeout);
			if (this.updateCall !== null)
			{	cancelAnimationFrame(this.updateCall);	
			}

			this.reset();

			this.removeEventListeners();
			this.element.axmov3d = null;
			delete this.element.axmov3d;

			this.element = null;
		}

		onDeviceOrientation(event)
		{	if (event.gamma === null || event.beta === null)
			{	return;	}

			this.updateElementPosition();

			if (this.gyroscopeSamples > 0)
			{	this.lastgammazero = this.gammazero;
				this.lastbetazero = this.betazero;

				if (this.gammazero === null)
				{	this.gammazero = event.gamma;
					this.betazero = event.beta;
				}
				else
				{	this.gammazero = (event.gamma + this.lastgammazero) / 2;
					this.betazero = (event.beta + this.lastbetazero) / 2;
				}
				this.gyroscopeSamples -= 1;
			}

			const totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
			const totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

			const degreesPerPixelX = totalAngleX / this.width;
			const degreesPerPixelY = totalAngleY / this.height;

			const angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
			const angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

			const posX = angleX / degreesPerPixelX;
			const posY = angleY / degreesPerPixelY;

			if(this.updateCall !== null)
			{	cancelAnimationFrame(this.updateCall);
			}

			this.event=
			{	clientX: posX + this.left,
				clientY: posY + this.top,
			};

			this.updateCall = requestAnimationFrame(this.updateBind);
		}

		onMouseEnter()
		{	this.updateElementPosition();
			this.element.style.willChange = "transform";
			this.setTransition();
		}

		onMouseMove(event)
		{	if(this.updateCall !== null)
			{	cancelAnimationFrame(this.updateCall);
			}
			this.event = event;
			this.updateCall = requestAnimationFrame(this.updateBind);
		}

		onMouseLeave()
		{	this.setTransition();

			if(this.settings.reset)
			{	requestAnimationFrame(this.resetBind);
			}
		}

		reset()
		{	this.event=
			{	clientX: this.left + this.width / 2,
				clientY: this.top + this.height / 2
			};

			if (this.element && this.element.style)
			{	this.element.style.transform = `perspective(${this.settings.perspective}px) ` +
				`rotateX(0deg) ` +
				`rotateY(0deg) ` +
				`scale3d(1, 1, 1)`;
			}
			this.resetGlare();
		}

		resetGlare()
		{	if (this.glare)
			{	this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
				this.glareElement.style.opacity = "0";
			}
		}

		updateInitialPosition()
		{	if (this.settings.startX === 0 && this.settings.startY === 0)
			{	return;
			}

			this.onMouseEnter();

			if (this.fullPageListening)
			{	this.event=
				{	clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
					clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
				};
			}
			else
			{	this.event=
				{	clientX: this.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width),
					clientY: this.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height)
				};
			}

			let backupScale = this.settings.scale;
			this.settings.scale = 1;
			this.update();
			this.settings.scale = backupScale;
			this.resetGlare();
		}

		getValues() 
		{	let x, y;

			if (this.fullPageListening)
			{	x = this.event.clientX / this.clientWidth;
				y = this.event.clientY / this.clientHeight;
			}
			else
			{	x = (this.event.clientX - this.left) / this.width;
				y = (this.event.clientY - this.top) / this.height;
			}

			x = Math.min(Math.max(x, 0), 1);
			y = Math.min(Math.max(y, 0), 1);

			let tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
			let tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
			let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

			return {tiltX:tiltX,tiltY:tiltY, percentageX: x * 100, percentageY:y * 100, angle:angle};
		}

		updateElementPosition()
		{	let rect = this.element.getBoundingClientRect();

			this.width = this.element.offsetWidth;
			this.height = this.element.offsetHeight;
			this.left = rect.left;
			this.top = rect.top;
		}

		update()
		{	let values = this.getValues();

			this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
			"rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
			"rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
			"scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

			if(this.glare)
			{	this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
				this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
			}

			this.element.dispatchEvent(new CustomEvent("tiltChange",{"detail":values}));
			this.updateCall=null;
		}

		prepareGlare()
		{	// If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
			if (!this.glarePrerender)
			{	// Create glare element
				const jsTiltGlare = document.createElement("div");
				jsTiltGlare.classList.add("js-tilt-glare");

				const jsTiltGlareInner = document.createElement("div");
				jsTiltGlareInner.classList.add("js-tilt-glare-inner");

				jsTiltGlare.appendChild(jsTiltGlareInner);
				this.element.appendChild(jsTiltGlare);
			}

			this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
			this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

			if (this.glarePrerender)
			{	return;
			}

			Object.assign(this.glareElementWrapper.style,{"position":"absolute","top":"0","left":"0","width":"100%","height":"100%","overflow":"hidden","pointer-events": "none"});
			Object.assign(this.glareElement.style,{"position": "absolute","top": "50%","left": "50%","pointer-events": "none","background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,"width": `${this.element.offsetWidth * 2}px`,"height": `${this.element.offsetWidth * 2}px`,"transform": "rotate(180deg) translate(-50%, -50%)","transform-origin": "0% 0%","opacity": "0",});
		}

		updateGlareSize()
		{	if(this.glare)
			{	Object.assign(this.glareElement.style,{"width":`${this.element.offsetWidth * 2}`,"height":`${this.element.offsetWidth * 2}`,});
			}
		}

		updateClientSize()
		{	this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			this.clientHeight = window.innerHeight || document.documentElement.clientHeight	|| document.body.clientHeight;
		}

		onWindowResize()
		{	this.updateGlareSize();
			this.updateClientSize();
		}

		setTransition()
		{	clearTimeout(this.transitionTimeout);
			this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
			if (this.glare) this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;

			this.transitionTimeout = setTimeout(()=>
			{	this.element.style.transition = "";
				if(this.glare)
				{	this.glareElement.style.transition = "";
				}
			},this.settings.speed);
		}

		extendSettings(settings)
		{	let defaultSettings={reverse:false,max:15,startX: 0,startY: 0,perspective: 1000,easing: "cubic-bezier(.03,.98,.52,.99)",scale: 1,speed: 300,transition: true,axis: null,glare: false,"max-glare": 1,"glare-prerender": false,"full-page-listening": false,"mouse-event-element": null,reset: true,gyroscope: true,gyroscopeMinAngleX:-45,gyroscopeMaxAngleX: 45,gyroscopeMinAngleY: -45,gyroscopeMaxAngleY: 45,gyroscopeSamples: 10};
			let newSettings = {};
			for (var property in defaultSettings)
			{	if(property in settings)
				{	newSettings[property] = settings[property];
				}
				else if(this.element.hasAttribute("data-tilt-" + property))
				{	let attribute = this.element.getAttribute("data-tilt-" + property);
					try
					{	newSettings[property] = JSON.parse(attribute);
					}
					catch(e)
					{	newSettings[property] = attribute;
					}
				}
				else
				{	newSettings[property] = defaultSettings[property];
				}
			}
			return newSettings;
		}

		static init(elements, settings)
		{	if (elements instanceof Node)
			{	elements = [elements];
			}

			if (elements instanceof NodeList)
			{	elements = [].slice.call(elements);
			}

			if (!(elements instanceof Array))
			{	return;
			}

			elements.forEach((element)=>
			{	if(!("axmov3d" in element))
				{	element.axmov3d = new axmov3d(element, settings);
				}
			});
		}
	}

	if(typeof document !== "undefined")
	{	window.axmov3d = axmov3d;
		axmov3d.init(document.querySelectorAll("[data-tilt]"));
	}

	return axmov3d;
}());


/* === @lib - para los banners - VERSION 10.3.1 - Released on: September 28, 2023 === */

var Swiper=function()
{   "use strict";
	function e(e)
	{   return null!==e && "object"==typeof e && "constructor" in e && e.constructor===Object
	}

	function t(s,a)
	{   void 0===s && (s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}function n(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function l(){return Date.now()}function o(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function d(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function c(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let a=1;a<arguments.length;a+=1){const i=a<0||arguments.length<=a?void 0:arguments[a];if(null!=i&&(s=i,!("undefined"!=typeof window&&void 0!==window.HTMLElement?s instanceof HTMLElement:s&&(1===s.nodeType||11===s.nodeType)))){const s=Object.keys(Object(i)).filter((e=>t.indexOf(e)<0));for(let t=0,a=s.length;t<a;t+=1){const a=s[t],r=Object.getOwnPropertyDescriptor(i,a);void 0!==r&&r.enumerable&&(d(e[a])&&d(i[a])?i[a].__swiper__?e[a]=i[a]:c(e[a],i[a]):!d(e[a])&&d(i[a])?(e[a]={},i[a].__swiper__?e[a]=i[a]:c(e[a],i[a])):e[a]=i[a])}}}var s;return e}function p(e,t,s){e.style.setProperty(t,s)}function u(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}function m(e){return e.querySelector(".swiper-slide-transform")||e.shadowRoot&&e.shadowRoot.querySelector(".swiper-slide-transform")||e}function h(e,t){return void 0===t&&(t=""),[...e.children].filter((e=>e.matches(t)))}function f(e,t){void 0===t&&(t=[]);const s=document.createElement(e);return s.classList.add(...Array.isArray(t)?t:[t]),s}function g(e){const t=r(),s=a(),i=e.getBoundingClientRect(),n=s.body,l=e.clientTop||n.clientTop||0,o=e.clientLeft||n.clientLeft||0,d=e===t?t.scrollY:e.scrollTop,c=e===t?t.scrollX:e.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}function v(e,t){return r().getComputedStyle(e,null).getPropertyValue(t)}function w(e){let t,s=e;if(s){for(t=0;null!==(s=s.previousSibling);)1===s.nodeType&&(t+=1);return t}}function b(e,t){const s=[];let a=e.parentElement;for(;a;)t?a.matches(t)&&s.push(a):s.push(a),a=a.parentElement;return s}function y(e,t){t&&e.addEventListener("transitionend",(function s(a){a.target===e&&(t.call(e,a),e.removeEventListener("transitionend",s))}))}function E(e,t,s){const a=r();return s?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}let x,S,T;function M(){return x||(x=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&t.documentElement.style&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}()),x}function C(e){return void 0===e&&(e={}),S||(S=function(e){let{userAgent:t}=void 0===e?{}:e;const s=M(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),m=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!h&&(l.os="android",l.android=!0),(p||m||u)&&(l.os="ios",l.ios=!0),l}(e)),S}function P(){return T||(T=function(){const e=r();let t=!1;function s(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(s()){const s=String(e.navigator.userAgent);if(s.includes("Version/")){const[e,a]=s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));t=e<16||16===e&&a<2}}return{isSafari:t||s(),needPerspectiveFix:t,isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),T}var L={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};const z=(e,t)=>{if(!e||e.destroyed||!e.params)return;const s=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(s){let t=s.querySelector(`.${e.params.lazyPreloaderClass}`);!t&&e.isElement&&(s.shadowRoot?t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`):requestAnimationFrame((()=>{s.shadowRoot&&(t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),t&&t.remove())}))),t&&t.remove()}},A=(e,t)=>{if(!e.slides[t])return;const s=e.slides[t].querySelector('[loading="lazy"]');s&&s.removeAttribute("loading")},$=e=>{if(!e||e.destroyed||!e.params)return;let t=e.params.lazyPreloadPrevNext;const s=e.slides.length;if(!s||!t||t<0)return;t=Math.min(t,s);const a="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),i=e.activeIndex;if(e.params.grid&&e.params.grid.rows>1){const s=i,r=[s-t];return r.push(...Array.from({length:t}).map(((e,t)=>s+a+t))),void e.slides.forEach(((t,s)=>{r.includes(t.column)&&A(e,s)}))}const r=i+a-1;if(e.params.rewind||e.params.loop)for(let a=i-t;a<=r+t;a+=1){const t=(a%s+s)%s;(t<i||t>r)&&A(e,t)}else for(let a=Math.max(i-t,0);a<=Math.min(r+t,s-1);a+=1)a!==i&&(a>r||a<i)&&A(e,a)};var I={updateSize:function(){const e=this;let t,s;const a=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(v(a,"padding-left")||0,10)-parseInt(v(a,"padding-right")||0,10),s=s-parseInt(v(a,"padding-top")||0,10)-parseInt(v(a,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{wrapperEl:i,slidesEl:r,size:n,rtlTranslate:l,wrongRTL:o}=e,d=e.virtual&&a.virtual.enabled,c=d?e.virtual.slides.length:e.slides.length,u=h(r,`.${e.params.slideClass}, swiper-slide`),m=d?e.virtual.slides.length:u.length;let f=[];const g=[],w=[];let b=a.slidesOffsetBefore;"function"==typeof b&&(b=a.slidesOffsetBefore.call(e));let y=a.slidesOffsetAfter;"function"==typeof y&&(y=a.slidesOffsetAfter.call(e));const x=e.snapGrid.length,S=e.slidesGrid.length;let T=a.spaceBetween,M=-b,C=0,P=0;if(void 0===n)return;"string"==typeof T&&T.indexOf("%")>=0?T=parseFloat(T.replace("%",""))/100*n:"string"==typeof T&&(T=parseFloat(T)),e.virtualSize=-T,u.forEach((e=>{l?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""})),a.centeredSlides&&a.cssMode&&(p(i,"--swiper-centered-offset-before",""),p(i,"--swiper-centered-offset-after",""));const L=a.grid&&a.grid.rows>1&&e.grid;let z;L&&e.grid.initSlides(m);const A="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<m;i+=1){let r;if(z=0,u[i]&&(r=u[i]),L&&e.grid.updateSlide(i,r,m,t),!u[i]||"none"!==v(r,"display")){if("auto"===a.slidesPerView){A&&(u[i].style[t("width")]="");const n=getComputedStyle(r),l=r.style.transform,o=r.style.webkitTransform;if(l&&(r.style.transform="none"),o&&(r.style.webkitTransform="none"),a.roundLengths)z=e.isHorizontal()?E(r,"width",!0):E(r,"height",!0);else{const e=s(n,"width"),t=s(n,"padding-left"),a=s(n,"padding-right"),i=s(n,"margin-left"),l=s(n,"margin-right"),o=n.getPropertyValue("box-sizing");if(o&&"border-box"===o)z=e+i+l;else{const{clientWidth:s,offsetWidth:n}=r;z=e+t+a+i+l+(n-s)}}l&&(r.style.transform=l),o&&(r.style.webkitTransform=o),a.roundLengths&&(z=Math.floor(z))}else z=(n-(a.slidesPerView-1)*T)/a.slidesPerView,a.roundLengths&&(z=Math.floor(z)),u[i]&&(u[i].style[t("width")]=`${z}px`);u[i]&&(u[i].swiperSlideSize=z),w.push(z),a.centeredSlides?(M=M+z/2+C/2+T,0===C&&0!==i&&(M=M-n/2-T),0===i&&(M=M-n/2-T),Math.abs(M)<.001&&(M=0),a.roundLengths&&(M=Math.floor(M)),P%a.slidesPerGroup==0&&f.push(M),g.push(M)):(a.roundLengths&&(M=Math.floor(M)),(P-Math.min(e.params.slidesPerGroupSkip,P))%e.params.slidesPerGroup==0&&f.push(M),g.push(M),M=M+z+T),e.virtualSize+=z+T,C=z,P+=1}}if(e.virtualSize=Math.max(e.virtualSize,n)+y,l&&o&&("slide"===a.effect||"coverflow"===a.effect)&&(i.style.width=`${e.virtualSize+T}px`),a.setWrapperSize&&(i.style[t("width")]=`${e.virtualSize+T}px`),L&&e.grid.updateWrapperSize(z,f,t),!a.centeredSlides){const t=[];for(let s=0;s<f.length;s+=1){let i=f[s];a.roundLengths&&(i=Math.floor(i)),f[s]<=e.virtualSize-n&&t.push(i)}f=t,Math.floor(e.virtualSize-n)-Math.floor(f[f.length-1])>1&&f.push(e.virtualSize-n)}if(d&&a.loop){const t=w[0]+T;if(a.slidesPerGroup>1){const s=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/a.slidesPerGroup),i=t*a.slidesPerGroup;for(let e=0;e<s;e+=1)f.push(f[f.length-1]+i)}for(let s=0;s<e.virtual.slidesBefore+e.virtual.slidesAfter;s+=1)1===a.slidesPerGroup&&f.push(f[f.length-1]+t),g.push(g[g.length-1]+t),e.virtualSize+=t}if(0===f.length&&(f=[0]),0!==T){const s=e.isHorizontal()&&l?"marginLeft":t("marginRight");u.filter(((e,t)=>!(a.cssMode&&!a.loop)||t!==u.length-1)).forEach((e=>{e.style[s]=`${T}px`}))}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;w.forEach((t=>{e+=t+(T||0)})),e-=T;const t=e-n;f=f.map((e=>e<=0?-b:e>t?t+y:e))}if(a.centerInsufficientSlides){let e=0;if(w.forEach((t=>{e+=t+(T||0)})),e-=T,e<n){const t=(n-e)/2;f.forEach(((e,s)=>{f[s]=e-t})),g.forEach(((e,s)=>{g[s]=e+t}))}}if(Object.assign(e,{slides:u,snapGrid:f,slidesGrid:g,slidesSizesGrid:w}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){p(i,"--swiper-centered-offset-before",-f[0]+"px"),p(i,"--swiper-centered-offset-after",e.size/2-w[w.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(m!==c&&e.emit("slidesLengthChange"),f.length!==x&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),g.length!==S&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset(),!(d||a.cssMode||"slide"!==a.effect&&"fade"!==a.effect)){const t=`${a.containerModifierClass}backface-hidden`,s=e.el.classList.contains(t);m<=a.maxBackfaceHiddenSlides?s||e.el.classList.add(t):s&&e.el.classList.remove(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides[t.getSlideIndexByData(e)]:t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&(t.wrapperEl.style.height=`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let a=0;a<t.length;a+=1)t[a].swiperSlideOffset=(e.isHorizontal()?t[a].offsetLeft:t[a].offsetTop)-s-e.cssOverflowAdjustment()},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.forEach((e=>{e.classList.remove(s.slideVisibleClass)})),t.visibleSlidesIndexes=[],t.visibleSlides=[];let l=s.spaceBetween;"string"==typeof l&&l.indexOf("%")>=0?l=parseFloat(l.replace("%",""))/100*t.size:"string"==typeof l&&(l=parseFloat(l));for(let e=0;e<a.length;e+=1){const o=a[e];let d=o.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(d-=a[0].swiperSlideOffset);const c=(n+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),p=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),u=-(n-d),m=u+t.slidesSizesGrid[e];(u>=0&&u<t.size-1||m>1&&m<=t.size||u<=0&&m>=t.size)&&(t.visibleSlides.push(o),t.visibleSlidesIndexes.push(e),a[e].classList.add(s.slideVisibleClass)),o.progress=i?-c:c,o.originalProgress=i?-p:p}},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n,progressLoop:l}=t;const o=r,d=n;if(0===a)i=0,r=!0,n=!0;else{i=(e-t.minTranslate())/a;const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1;r=s||i<=0,n=l||i>=1,s&&(i=0),l&&(i=1)}if(s.loop){const s=t.getSlideIndexByData(0),a=t.getSlideIndexByData(t.slides.length-1),i=t.slidesGrid[s],r=t.slidesGrid[a],n=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);l=o>=i?(o-i)/n:(o+n-r)/n,l>1&&(l-=1)}Object.assign(t,{progress:i,progressLoop:l,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!o&&t.emit("reachBeginning toEdge"),n&&!d&&t.emit("reachEnd toEdge"),(o&&!r||d&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,slidesEl:a,activeIndex:i}=e,r=e.virtual&&s.virtual.enabled,n=e=>h(a,`.${s.slideClass}${e}, swiper-slide${e}`)[0];let l;if(t.forEach((e=>{e.classList.remove(s.slideActiveClass,s.slideNextClass,s.slidePrevClass)})),r)if(s.loop){let t=i-e.virtual.slidesBefore;t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),l=n(`[data-swiper-slide-index="${t}"]`)}else l=n(`[data-swiper-slide-index="${i}"]`);else l=t[i];if(l){l.classList.add(s.slideActiveClass);let e=function(e,t){const s=[];for(;e.nextElementSibling;){const a=e.nextElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&!e&&(e=t[0]),e&&e.classList.add(s.slideNextClass);let a=function(e,t){const s=[];for(;e.previousElementSibling;){const a=e.previousElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&0===!a&&(a=t[t.length-1]),a&&a.classList.add(s.slidePrevClass)}e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:a,params:i,activeIndex:r,realIndex:n,snapIndex:l}=t;let o,d=e;const c=e=>{let s=e-t.virtual.slidesBefore;return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s};if(void 0===d&&(d=function(e){const{slidesGrid:t,params:s}=e,a=e.rtlTranslate?e.translate:-e.translate;let i;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?a>=t[e]&&a<t[e+1]-(t[e+1]-t[e])/2?i=e:a>=t[e]&&a<t[e+1]&&(i=e+1):a>=t[e]&&(i=e);return s.normalizeSlideIndex&&(i<0||void 0===i)&&(i=0),i}(t)),a.indexOf(s)>=0)o=a.indexOf(s);else{const e=Math.min(i.slidesPerGroupSkip,d);o=e+Math.floor((d-e)/i.slidesPerGroup)}if(o>=a.length&&(o=a.length-1),d===r)return o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")),void(t.params.loop&&t.virtual&&t.params.virtual.enabled&&(t.realIndex=c(d)));let p;p=t.virtual&&i.virtual.enabled&&i.loop?c(d):t.slides[d]?parseInt(t.slides[d].getAttribute("data-swiper-slide-index")||d,10):d,Object.assign(t,{previousSnapIndex:l,snapIndex:o,previousRealIndex:n,realIndex:p,previousIndex:r,activeIndex:d}),t.initialized&&$(t),t.emit("activeIndexChange"),t.emit("snapIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&(n!==p&&t.emit("realIndexChange"),t.emit("slideChange"))},updateClickedSlide:function(e,t){const s=this,a=s.params;let i=e.closest(`.${a.slideClass}, swiper-slide`);!i&&s.isElement&&t&&t.length>1&&t.includes(e)&&[...t.slice(t.indexOf(e)+1,t.length)].forEach((e=>{!i&&e.matches&&e.matches(`.${a.slideClass}, swiper-slide`)&&(i=e)}));let r,n=!1;if(i)for(let e=0;e<s.slides.length;e+=1)if(s.slides[e]===i){n=!0,r=e;break}if(!i||!n)return s.clickedSlide=void 0,void(s.clickedIndex=void 0);s.clickedSlide=i,s.virtual&&s.params.virtual.enabled?s.clickedIndex=parseInt(i.getAttribute("data-swiper-slide-index"),10):s.clickedIndex=r,a.slideToClickedSlide&&void 0!==s.clickedIndex&&s.clickedIndex!==s.activeIndex&&s.slideToClickedSlide()}};var k={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=o(i,e);return r+=this.cssOverflowAdjustment(),s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,wrapperEl:r,progress:n}=s;let l,o=0,d=0;s.isHorizontal()?o=a?-e:e:d=e,i.roundLengths&&(o=Math.floor(o),d=Math.floor(d)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?o:d,i.cssMode?r[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-o:-d:i.virtualTranslate||(s.isHorizontal()?o-=s.cssOverflowAdjustment():d-=s.cssOverflowAdjustment(),r.style.transform=`translate3d(${o}px, ${d}px, 0px)`);const c=s.maxTranslate()-s.minTranslate();l=0===c?0:(e-s.minTranslate())/c,l!==n&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return u({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.wrapperEl.addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd))),!0}};function O(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var D={slideTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e&&(e=parseInt(e,10));const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:m,wrapperEl:h,enabled:f}=r;if(r.animating&&l.preventInteractionOnTransition||!f&&!a&&!i)return!1;const g=Math.min(r.params.slidesPerGroupSkip,n);let v=g+Math.floor((n-g)/r.params.slidesPerGroup);v>=o.length&&(v=o.length-1);const w=-o[v];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*w),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&(m?w>r.translate&&w>r.minTranslate():w<r.translate&&w<r.minTranslate()))return!1;if(!r.allowSlidePrev&&w>r.translate&&w>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(n!==(c||0)&&s&&r.emit("beforeSlideChangeStart"),r.updateProgress(w),b=n>p?"next":n<p?"prev":"reset",m&&-w===r.translate||!m&&w===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(w),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=m?w:-w;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),t&&!r._cssModeVirtualInitialSet&&r.params.initialSlide>0?(r._cssModeVirtualInitialSet=!0,requestAnimationFrame((()=>{h[e?"scrollLeft":"scrollTop"]=s}))):h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._immediateVirtual=!1}))}else{if(!r.support.smoothScroll)return u({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(w),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.wrapperEl.addEventListener("transitionend",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){e=parseInt(e,10)}const i=this;let r=e;return i.params.loop&&(i.virtual&&i.params.virtual.enabled?r+=i.virtual.slidesBefore:r=i.getSlideIndexByData(r)),i.slideTo(r,t,s,a)},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{enabled:i,params:r,animating:n}=a;if(!i)return a;let l=r.slidesPerGroup;"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<r.slidesPerGroupSkip?1:l,d=a.virtual&&r.virtual.enabled;if(r.loop){if(n&&!d&&r.loopPreventsSliding)return!1;if(a.loopFix({direction:"next"}),a._clientLeft=a.wrapperEl.clientLeft,a.activeIndex===a.slides.length-1&&r.cssMode)return requestAnimationFrame((()=>{a.slideTo(a.activeIndex+o,e,t,s)})),!0}return r.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,snapGrid:r,slidesGrid:n,rtlTranslate:l,enabled:o,animating:d}=a;if(!o)return a;const c=a.virtual&&i.virtual.enabled;if(i.loop){if(d&&!c&&i.loopPreventsSliding)return!1;a.loopFix({direction:"prev"}),a._clientLeft=a.wrapperEl.clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(l?a.translate:-a.translate),m=r.map((e=>p(e)));let h=r[m.indexOf(u)-1];if(void 0===h&&i.cssMode){let e;r.forEach(((t,s)=>{u>=t&&(e=s)})),void 0!==e&&(h=r[e>0?e-1:e])}let f=0;if(void 0!==h&&(f=n.indexOf(h),f<0&&(f=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(f=f-a.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return i.loop&&0===a.activeIndex&&i.cssMode?(requestAnimationFrame((()=>{a.slideTo(f,e,t,s)})),!0):a.slideTo(f,e,t,s)},slideReset:function(e,t,s){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,slidesEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;const l=e.isElement?"swiper-slide":`.${t.slideClass}`;if(t.loop){if(e.animating)return;i=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=e.getSlideIndex(h(s,`${l}[data-swiper-slide-index="${i}"]`)[0]),n((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=e.getSlideIndex(h(s,`${l}[data-swiper-slide-index="${i}"]`)[0]),n((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var G={loopCreate:function(e){const t=this,{params:s,slidesEl:a}=t;if(!s.loop||t.virtual&&t.params.virtual.enabled)return;h(a,`.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t)})),t.loopFix({slideRealIndex:e,direction:s.centeredSlides?void 0:"next"})},loopFix:function(e){let{slideRealIndex:t,slideTo:s=!0,direction:a,setTranslate:i,activeSlideIndex:r,byController:n,byMousewheel:l}=void 0===e?{}:e;const o=this;if(!o.params.loop)return;o.emit("beforeLoopFix");const{slides:d,allowSlidePrev:c,allowSlideNext:p,slidesEl:u,params:m}=o;if(o.allowSlidePrev=!0,o.allowSlideNext=!0,o.virtual&&m.virtual.enabled)return s&&(m.centeredSlides||0!==o.snapIndex?m.centeredSlides&&o.snapIndex<m.slidesPerView?o.slideTo(o.virtual.slides.length+o.snapIndex,0,!1,!0):o.snapIndex===o.snapGrid.length-1&&o.slideTo(o.virtual.slidesBefore,0,!1,!0):o.slideTo(o.virtual.slides.length,0,!1,!0)),o.allowSlidePrev=c,o.allowSlideNext=p,void o.emit("loopFix");const h="auto"===m.slidesPerView?o.slidesPerViewDynamic():Math.ceil(parseFloat(m.slidesPerView,10));let f=m.loopedSlides||h;f%m.slidesPerGroup!=0&&(f+=m.slidesPerGroup-f%m.slidesPerGroup),o.loopedSlides=f;const g=[],v=[];let w=o.activeIndex;void 0===r?r=o.getSlideIndex(o.slides.filter((e=>e.classList.contains(m.slideActiveClass)))[0]):w=r;const b="next"===a||!a,y="prev"===a||!a;let E=0,x=0;if(r<f){E=Math.max(f-r,m.slidesPerGroup);for(let e=0;e<f-r;e+=1){const t=e-Math.floor(e/d.length)*d.length;g.push(d.length-t-1)}}else if(r>o.slides.length-2*f){x=Math.max(r-(o.slides.length-2*f),m.slidesPerGroup);for(let e=0;e<x;e+=1){const t=e-Math.floor(e/d.length)*d.length;v.push(t)}}if(y&&g.forEach((e=>{o.slides[e].swiperLoopMoveDOM=!0,u.prepend(o.slides[e]),o.slides[e].swiperLoopMoveDOM=!1})),b&&v.forEach((e=>{o.slides[e].swiperLoopMoveDOM=!0,u.append(o.slides[e]),o.slides[e].swiperLoopMoveDOM=!1})),o.recalcSlides(),"auto"===m.slidesPerView&&o.updateSlides(),m.watchSlidesProgress&&o.updateSlidesOffset(),s)if(g.length>0&&y)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w+E]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w+E,0,!1,!0),i&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t,o.touchEventsData.currentTranslate=o.translate))}else i&&(o.slideToLoop(t,0,!1,!0),o.touchEventsData.currentTranslate=o.translate);else if(v.length>0&&b)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w-x]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w-x,0,!1,!0),i&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t,o.touchEventsData.currentTranslate=o.translate))}else o.slideToLoop(t,0,!1,!0);if(o.allowSlidePrev=c,o.allowSlideNext=p,o.controller&&o.controller.control&&!n){const e={slideRealIndex:t,direction:a,setTranslate:i,activeSlideIndex:r,byController:!0};Array.isArray(o.controller.control)?o.controller.control.forEach((t=>{!t.destroyed&&t.params.loop&&t.loopFix({...e,slideTo:t.params.slidesPerView===m.slidesPerView&&s})})):o.controller.control instanceof o.constructor&&o.controller.control.params.loop&&o.controller.control.loopFix({...e,slideTo:o.controller.control.params.slidesPerView===m.slidesPerView&&s})}o.emit("loopFix")},loopDestroy:function(){const e=this,{params:t,slidesEl:s}=e;if(!t.loop||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const a=[];e.slides.forEach((e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex;a[t]=e})),e.slides.forEach((e=>{e.removeAttribute("data-swiper-slide-index")})),a.forEach((e=>{s.append(e)})),e.recalcSlides(),e.slideTo(e.realIndex,0)}};function H(e){const t=this,s=a(),i=r(),n=t.touchEventsData;n.evCache.push(e);const{params:o,touches:d,enabled:c}=t;if(!c)return;if(!o.simulateTouch&&"mouse"===e.pointerType)return;if(t.animating&&o.preventInteractionOnTransition)return;!t.animating&&o.cssMode&&o.loop&&t.loopFix();let p=e;p.originalEvent&&(p=p.originalEvent);let u=p.target;if("wrapper"===o.touchEventsTarget&&!t.wrapperEl.contains(u))return;if("which"in p&&3===p.which)return;if("button"in p&&p.button>0)return;if(n.isTouched&&n.isMoved)return;const m=!!o.noSwipingClass&&""!==o.noSwipingClass,h=e.composedPath?e.composedPath():e.path;m&&p.target&&p.target.shadowRoot&&h&&(u=h[0]);const f=o.noSwipingSelector?o.noSwipingSelector:`.${o.noSwipingClass}`,g=!(!p.target||!p.target.shadowRoot);if(o.noSwiping&&(g?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(f,u):u.closest(f)))return void(t.allowClick=!0);if(o.swipeHandler&&!u.closest(o.swipeHandler))return;d.currentX=p.pageX,d.currentY=p.pageY;const v=d.currentX,w=d.currentY,b=o.edgeSwipeDetection||o.iOSEdgeSwipeDetection,y=o.edgeSwipeThreshold||o.iOSEdgeSwipeThreshold;if(b&&(v<=y||v>=i.innerWidth-y)){if("prevent"!==b)return;e.preventDefault()}Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),d.startX=v,d.startY=w,n.touchStartTime=l(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,o.threshold>0&&(n.allowThresholdMove=!1);let E=!0;u.matches(n.focusableElements)&&(E=!1,"SELECT"===u.nodeName&&(n.isTouched=!1)),s.activeElement&&s.activeElement.matches(n.focusableElements)&&s.activeElement!==u&&s.activeElement.blur();const x=E&&t.allowTouchMove&&o.touchStartPreventDefault;!o.touchStartForcePreventDefault&&!x||u.isContentEditable||p.preventDefault(),o.freeMode&&o.freeMode.enabled&&t.freeMode&&t.animating&&!o.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",p)}function X(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:o,enabled:d}=s;if(!d)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",c));const p=i.evCache.findIndex((e=>e.pointerId===c.pointerId));p>=0&&(i.evCache[p]=c);const u=i.evCache.length>1?i.evCache[0]:c,m=u.pageX,h=u.pageY;if(c.preventedByNestedSwiper)return n.startX=m,void(n.startY=h);if(!s.allowTouchMove)return c.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:m,startY:h,prevX:s.touches.currentX,prevY:s.touches.currentY,currentX:m,currentY:h}),i.touchStartTime=l()));if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(h<n.startY&&s.translate<=s.maxTranslate()||h>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(m<n.startX&&s.translate<=s.maxTranslate()||m>n.startX&&s.translate>=s.minTranslate())return;if(t.activeElement&&c.target===t.activeElement&&c.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;n.currentX=m,n.currentY=h;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",c),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling||s.zoom&&s.params.zoom&&s.params.zoom.enabled&&i.evCache.length>1)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&c.cancelable&&c.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&c.stopPropagation();let v=s.isHorizontal()?f:g,w=s.isHorizontal()?n.currentX-n.previousX:n.currentY-n.previousY;r.oneWayMovement&&(v=Math.abs(v)*(o?1:-1),w=Math.abs(w)*(o?1:-1)),n.diff=v,v*=r.touchRatio,o&&(v=-v,w=-w);const b=s.touchesDirection;s.swipeDirection=v>0?"prev":"next",s.touchesDirection=w>0?"prev":"next";const y=s.params.loop&&!r.cssMode,E="next"===s.swipeDirection&&s.allowSlideNext||"prev"===s.swipeDirection&&s.allowSlidePrev;if(!i.isMoved){if(y&&E&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});s.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",c)}let x;i.isMoved&&b!==s.touchesDirection&&y&&E&&Math.abs(v)>=1&&(s.loopFix({direction:s.swipeDirection,setTranslate:!0}),x=!0),s.emit("sliderMove",c),i.isMoved=!0,i.currentTranslate=v+i.startTranslate;let S=!0,T=r.resistanceRatio;if(r.touchReleaseOnEdges&&(T=0),v>0?(y&&E&&!x&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.size/2:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(S=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**T))):v<0&&(y&&E&&!x&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.size/2:s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(S=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**T))),S&&(c.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function Y(e){const t=this,s=t.touchEventsData,a=s.evCache.findIndex((t=>t.pointerId===e.pointerId));if(a>=0&&s.evCache.splice(a,1),["pointercancel","pointerout","pointerleave","contextmenu"].includes(e.type)){if(!(["pointercancel","contextmenu"].includes(e.type)&&(t.browser.isSafari||t.browser.isWebView)))return}const{params:i,touches:r,rtlTranslate:o,slidesGrid:d,enabled:c}=t;if(!c)return;if(!i.simulateTouch&&"mouse"===e.pointerType)return;let p=e;if(p.originalEvent&&(p=p.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",p),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&i.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);i.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const u=l(),m=u-s.touchStartTime;if(t.allowClick){const e=p.path||p.composedPath&&p.composedPath();t.updateClickedSlide(e&&e[0]||p.target,e),t.emit("tap click",p),m<300&&u-s.lastClickTime<300&&t.emit("doubleTap doubleClick",p)}if(s.lastClickTime=l(),n((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===r.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=i.followFinger?o?t.translate:-t.translate:-s.currentTranslate,i.cssMode)return;if(i.freeMode&&i.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let f=0,g=t.slidesSizesGrid[0];for(let e=0;e<d.length;e+=e<i.slidesPerGroupSkip?1:i.slidesPerGroup){const t=e<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;void 0!==d[e+t]?h>=d[e]&&h<d[e+t]&&(f=e,g=d[e+t]-d[e]):h>=d[e]&&(f=e,g=d[d.length-1]-d[d.length-2])}let v=null,w=null;i.rewind&&(t.isBeginning?w=i.virtual&&i.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(v=0));const b=(h-d[f])/g,y=f<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;if(m>i.longSwipesMs){if(!i.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(b>=i.longSwipesRatio?t.slideTo(i.rewind&&t.isEnd?v:f+y):t.slideTo(f)),"prev"===t.swipeDirection&&(b>1-i.longSwipesRatio?t.slideTo(f+y):null!==w&&b<0&&Math.abs(b)>i.longSwipesRatio?t.slideTo(w):t.slideTo(f))}else{if(!i.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(p.target===t.navigation.nextEl||p.target===t.navigation.prevEl)?p.target===t.navigation.nextEl?t.slideTo(f+y):t.slideTo(f):("next"===t.swipeDirection&&t.slideTo(null!==v?v:f+y),"prev"===t.swipeDirection&&t.slideTo(null!==w?w:f))}}function N(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e,n=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const l=n&&t.loop;!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!n?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout((()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()}),500)),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function B(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function R(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}function q(e){const t=this;z(t,e.target),t.params.cssMode||"auto"!==t.params.slidesPerView&&!t.params.autoHeight||t.update()}let V=!1;function F(){}const _=(e,t)=>{const s=a(),{params:i,el:r,wrapperEl:n,device:l}=e,o=!!i.nested,d="on"===t?"addEventListener":"removeEventListener",c=t;r[d]("pointerdown",e.onTouchStart,{passive:!1}),s[d]("pointermove",e.onTouchMove,{passive:!1,capture:o}),s[d]("pointerup",e.onTouchEnd,{passive:!0}),s[d]("pointercancel",e.onTouchEnd,{passive:!0}),s[d]("pointerout",e.onTouchEnd,{passive:!0}),s[d]("pointerleave",e.onTouchEnd,{passive:!0}),s[d]("contextmenu",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[d]("click",e.onClick,!0),i.cssMode&&n[d]("scroll",e.onScroll),i.updateOnWindowResize?e[c](l.ios||l.android?"resize orientationchange observerUpdate":"resize observerUpdate",N,!0):e[c]("observerUpdate",N,!0),r[d]("load",e.onLoad,{capture:!0})};const j=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var W={init:!0,direction:"horizontal",oneWayMovement:!1,touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopedSlides:null,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function U(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(!0===e[a]&&(e[a]={enabled:!0}),"navigation"===a&&e[a]&&e[a].enabled&&!e[a].prevEl&&!e[a].nextEl&&(e[a].auto=!0),["pagination","scrollbar"].indexOf(a)>=0&&e[a]&&e[a].enabled&&!e[a].el&&(e[a].auto=!0),a in e&&"enabled"in i?("object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),c(t,s)):c(t,s)):c(t,s)}}const K={eventsEmitter:L,update:I,translate:k,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`,s.wrapperEl.style.transitionDelay=0===e?"0ms":""),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),O({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),O({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:D,loop:G,grabCursor:{setGrabCursor:function(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame((()=>{t.__preventObserver__=!1}))},unsetGrabCursor:function(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame((()=>{e.__preventObserver__=!1})))}},events:{attachEvents:function(){const e=this,t=a(),{params:s}=e;e.onTouchStart=H.bind(e),e.onTouchMove=X.bind(e),e.onTouchEnd=Y.bind(e),s.cssMode&&(e.onScroll=R.bind(e)),e.onClick=B.bind(e),e.onLoad=q.bind(e),V||(t.addEventListener("touchstart",F),V=!0),_(e,"on")},detachEvents:function(){_(this,"off")}},breakpoints:{setBreakpoint:function(){const e=this,{realIndex:t,initialized:s,params:a,el:i}=e,r=a.breakpoints;if(!r||r&&0===Object.keys(r).length)return;const n=e.getBreakpoint(r,e.params.breakpointsBase,e.el);if(!n||e.currentBreakpoint===n)return;const l=(n in r?r[n]:void 0)||e.originalParams,o=j(e,a),d=j(e,l),p=a.enabled;o&&!d?(i.classList.remove(`${a.containerModifierClass}grid`,`${a.containerModifierClass}grid-column`),e.emitContainerClasses()):!o&&d&&(i.classList.add(`${a.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===a.grid.fill)&&i.classList.add(`${a.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{if(void 0===l[t])return;const s=a[t]&&a[t].enabled,i=l[t]&&l[t].enabled;s&&!i&&e[t].disable(),!s&&i&&e[t].enable()}));const u=l.direction&&l.direction!==a.direction,m=a.loop&&(l.slidesPerView!==a.slidesPerView||u),h=a.loop;u&&s&&e.changeDirection(),c(e.params,l);const f=e.params.enabled,g=e.params.loop;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!f?e.disable():!p&&f&&e.enable(),e.currentBreakpoint=n,e.emit("_beforeBreakpoint",l),s&&(m?(e.loopDestroy(),e.loopCreate(t),e.updateSlides()):!h&&g?(e.loopCreate(t),e.updateSlides()):h&&!g&&e.loopDestroy()),e.emit("breakpoint",l)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,el:i,device:r}=e,n=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...n),i.classList.add(...t),e.emitContainerClasses()},removeClasses:function(){const{el:e,classNames:t}=this;e.classList.remove(...t),this.emitContainerClasses()}}},Z={};class Q{constructor(){let e,t;for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];1===i.length&&i[0].constructor&&"Object"===Object.prototype.toString.call(i[0]).slice(8,-1)?t=i[0]:[e,t]=i,t||(t={}),t=c({},t),e&&!t.el&&(t.el=e);const n=a();if(t.el&&"string"==typeof t.el && n.querySelectorAll(t.el).length>1){const e=[];return n.querySelectorAll(t.el).forEach((s=>{const a=c({},t,{el:s});e.push(new Q(a))})),e}const l=this;l.__swiper__=!0,l.support=M(),l.device=C({userAgent:t.userAgent}),l.browser=P(),l.eventsListeners={},l.eventsAnyListeners=[],l.modules=[...l.__modules__],t.modules&&Array.isArray(t.modules)&&l.modules.push(...t.modules);const o={};l.modules.forEach((e=>{e({params:t,swiper:l,extendParams:U(t,o),on:l.on.bind(l),once:l.once.bind(l),off:l.off.bind(l),emit:l.emit.bind(l)})}));const d=c({},W,o);return l.params=c({},d,Z,t),l.originalParams=c({},l.params),l.passedParams=c({},t),l.params&&l.params.on&&Object.keys(l.params.on).forEach((e=>{l.on(e,l.params.on[e])})),l.params&&l.params.onAny&&l.onAny(l.params.onAny),Object.assign(l,{enabled:l.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===l.params.direction,isVertical:()=>"vertical"===l.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:l.params.allowSlideNext,allowSlidePrev:l.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:l.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,evCache:[]},allowClick:!0,allowTouchMove:l.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),l.emit("_swiper"),l.params.init&&l.init(),l}getSlideIndex(e){const{slidesEl:t,params:s}=this,a=w(h(t,`.${s.slideClass}, swiper-slide`)[0]);return w(e)-a}getSlideIndexByData(e){return this.getSlideIndex(this.slides.filter((t=>1*t.getAttribute("data-swiper-slide-index")===e))[0])}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=h(e,`.${t.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if("number"==typeof s.slidesPerView)return s.slidesPerView;if(s.centeredSlides){let e,t=a[l]?a[l].swiperSlideSize:0;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;if(s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{t.complete&&z(e,t)})),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),s.freeMode&&s.freeMode.enabled&&!s.cssMode)a(),s.autoHeight&&e.updateAutoHeight();else{if(("auto"===s.slidesPerView||s.slidesPerView>1)&&e.isEnd&&!s.centeredSlides){const t=e.virtual&&s.virtual.enabled?e.virtual.slides:e.slides;i=e.slideTo(t.length-1,0,!1,!0)}else i=e.slideTo(e.activeIndex,0,!1,!0);i||a()}s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.el.classList.remove(`${s.params.containerModifierClass}${a}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let s=e||t.params.el;if("string"==typeof s&&(s=document.querySelector(s)),!s)return!1;s.swiper=t,s.parentNode&&s.parentNode.host&&"SWIPER-CONTAINER"===s.parentNode.host.nodeName&&(t.isElement=!0);const a=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let i=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector){return s.shadowRoot.querySelector(a())}return h(s,a())[0]})();return!i&&t.params.createElements&&(i=f("div",t.params.wrapperClass),s.append(i),h(s,`.${t.params.slideClass}`).forEach((e=>{i.append(e)}))),Object.assign(t,{el:s,wrapperEl:i,slidesEl:t.isElement&&!s.parentNode.host.slideSlots?s.parentNode.host:i,hostEl:t.isElement?s.parentNode.host:s,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===v(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===v(s,"direction")),wrongRTL:"-webkit-box"===v(i,"display")}),!0}init(e){const t=this;if(t.initialized)return t;if(!1===t.mount(e))return t;t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents();const s=[...t.el.querySelectorAll('[loading="lazy"]')];return t.isElement&&s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),s.forEach((e=>{e.complete?z(t,e):e.addEventListener("load",(e=>{z(t,e.target)}))})),$(t),t.initialized=!0,$(t),t.emit("init"),t.emit("afterInit"),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,el:i,wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttribute("style"),r.removeAttribute("style"),n&&n.length&&n.forEach((e=>{e.classList.remove(a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")}))),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.el.swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){c(Z,e)}static get extendedDefaults(){return Z}static get defaults(){return W}static installModule(e){Q.prototype.__modules__||(Q.prototype.__modules__=[]);const t=Q.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>Q.installModule(e))),Q):(Q.installModule(e),Q)}}function J(e,t,s,a){return e.params.createElements&&Object.keys(a).forEach((i=>{if(!s[i]&&!0===s.auto){let r=h(e.el,`.${a[i]}`)[0];r||(r=f("div",a[i]),r.className=a[i],e.el.append(r)),s[i]=r,t[i]=r}})),s}function ee(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function te(e){const t=this,{params:s,slidesEl:a}=t;s.loop&&t.loopDestroy();const i=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,a.append(t.children[0]),t.innerHTML=""}else a.append(e)};if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&i(e[t]);else i(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update()}function se(e){const t=this,{params:s,activeIndex:a,slidesEl:i}=t;s.loop&&t.loopDestroy();let r=a+1;const n=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,i.prepend(t.children[0]),t.innerHTML=""}else i.prepend(e)};if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&n(e[t]);r=a+e.length}else n(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),t.slideTo(r,0,!1)}function ae(e,t){const s=this,{params:a,activeIndex:i,slidesEl:r}=s;let n=i;a.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.recalcSlides());const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides[t];e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&r.append(t[e]);o=n>e?n+t.length:n}else r.append(t);for(let e=0;e<d.length;e+=1)r.append(d[e]);s.recalcSlides(),a.loop&&s.loopCreate(),a.observer&&!s.isElement||s.update(),a.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function ie(e){const t=this,{params:s,activeIndex:a}=t;let i=a;s.loop&&(i-=t.loopedSlides,t.loopDestroy());let r,n=i;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)r=e[s],t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1);n=Math.max(n,0)}else r=e,t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1),n=Math.max(n,0);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),s.loop?t.slideTo(n+t.loopedSlides,0,!1):t.slideTo(n,0,!1)}function re(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function ne(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.forEach((e=>
		{	e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t && (s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}

		function le(e,t)
		{	const s=m(t);
			return s!==t&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s
		}

		function oe(e)
		{	let{swiper:t,duration:s,transformElements:a,allSlides:i}=e;
			const{activeIndex:r}=t;
			if(t.params.virtualTranslate&&0!==s)
			{	let e,s=!1;e=i?a:a.filter((e=>{const s=e.classList.contains("swiper-slide-transform")?(e=>{if(!e.parentElement)return t.slides.filter((t=>t.shadowRoot&&t.shadowRoot===e.parentNode))[0];return e.parentElement})(e):e;return t.getSlideIndex(s)===r})),e.forEach((e=>{y(e,(()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});t.wrapperEl.dispatchEvent(e)}))}))}}function de(e,t,s){const a=`swiper-slide-shadow${s?`-${s}`:""}${e?` swiper-slide-shadow-${e}`:""}`,i=m(t);let r=i.querySelector(`.${a.split(" ").join(".")}`);return r||(r=f("div",a.split(" ")),i.append(r)),r}Object.keys(K).forEach((e=>{Object.keys(K[e]).forEach((t=>{Q.prototype[t]=K[e][t]}))})),Q.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,s){void 0===s&&(s={});const a=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(t.__preventObserver__)return;if(1===e.length)return void i("observerUpdate",e[0]);const s=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(s):l.setTimeout(s,0)}));a.observe(e,{attributes:void 0===s.attributes||s.attributes,childList:void 0===s.childList||s.childList,characterData:void 0===s.characterData||s.characterData}),n.push(a)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=b(t.hostEl);for(let t=0;t<e.length;t+=1)o(e[t])}o(t.hostEl,{childList:t.params.observeSlideChildren}),o(t.wrapperEl,{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const ce=[function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;i({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}});const l=a();s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]};const o=l.createElement("div");function d(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];let i;return a.renderSlide?(i=a.renderSlide.call(s,e,t),"string"==typeof i&&(o.innerHTML=i,i=o.children[0])):i=s.isElement?f("swiper-slide"):f("div",s.params.slideClass),i.setAttribute("data-swiper-slide-index",t),a.renderSlide||(i.innerHTML=e),a.cache&&(s.virtual.cache[t]=i),i}function c(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i,loop:r}=s.params,{addSlidesBefore:l,addSlidesAfter:o}=s.params.virtual,{from:c,to:p,slides:u,slidesGrid:m,offset:f}=s.virtual;s.params.cssMode||s.updateActiveIndex();const g=s.activeIndex||0;let v,w,b;v=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(w=Math.floor(t/2)+a+o,b=Math.floor(t/2)+a+l):(w=t+(a-1)+o,b=(r?t:a)+l);let y=g-b,E=g+w;r||(y=Math.max(y,0),E=Math.min(E,u.length-1));let x=(s.slidesGrid[y]||0)-(s.slidesGrid[0]||0);function S(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),n("virtualUpdate")}if(r&&g>=b?(y-=b,i||(x+=s.slidesGrid[0])):r&&g<b&&(y=-b,i&&(x+=s.slidesGrid[0])),Object.assign(s.virtual,{from:y,to:E,offset:x,slidesGrid:s.slidesGrid,slidesBefore:b,slidesAfter:w}),c===y&&p===E&&!e)return s.slidesGrid!==m&&x!==f&&s.slides.forEach((e=>{e.style[v]=x-Math.abs(s.cssOverflowAdjustment())+"px"})),s.updateProgress(),void n("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:x,from:y,to:E,slides:function(){const e=[];for(let t=y;t<=E;t+=1)e.push(u[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?S():n("virtualUpdate"));const T=[],M=[],C=e=>{let t=e;return e<0?t=u.length+e:t>=u.length&&(t-=u.length),t};if(e)s.slides.filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`))).forEach((e=>{e.remove()}));else for(let e=c;e<=p;e+=1)if(e<y||e>E){const t=C(e);s.slides.filter((e=>e.matches(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`))).forEach((e=>{e.remove()}))}const P=r?-u.length:0,L=r?2*u.length:u.length;for(let t=P;t<L;t+=1)if(t>=y&&t<=E){const s=C(t);void 0===p||e?M.push(s):(t>p&&M.push(s),t<c&&T.push(s))}if(M.forEach((e=>{s.slidesEl.append(d(u[e],e))})),r)for(let e=T.length-1;e>=0;e-=1){const t=T[e];s.slidesEl.prepend(d(u[t],t))}else T.sort(((e,t)=>t-e)),T.forEach((e=>{s.slidesEl.prepend(d(u[e],e))}));h(s.slidesEl,".swiper-slide, swiper-slide").forEach((e=>{e.style[v]=x-Math.abs(s.cssOverflowAdjustment())+"px"})),S()}r("beforeInit",(()=>{if(!s.params.virtual.enabled)return;let e;if(void 0===s.passedParams.virtual.slides){const t=[...s.slidesEl.children].filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`)));t&&t.length&&(s.virtual.slides=[...t],e=!0,t.forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t),s.virtual.cache[t]=e,e.remove()})))}e||(s.virtual.slides=s.params.virtual.slides),s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,c()})),r("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{c()}),100)):c())})),r("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&p(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);c(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.getAttribute("data-swiper-slide-index");r&&a.setAttribute("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}c(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.params.virtual.cache&&(delete s.virtual.cache[e[a]],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e[a],1),e[a]<t&&(t-=1),t=Math.max(t,0);else s.params.virtual.cache&&(delete s.virtual.cache[e],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e,1),e<t&&(t-=1),t=Math.max(t,0);c(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),c(!0),s.slideTo(0,0)},update:c})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function d(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,m=38===i,h=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&h||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&m||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||m||h)){let e=!1;if(b(t.el,`.${t.params.slideClass}, swiper-slide`).length>0&&0===b(t.el,`.${t.params.slideActiveClass}`).length)return;const a=t.el,i=a.clientWidth,r=a.clientHeight,n=o.innerWidth,l=o.innerHeight,d=g(a);s&&(d.left-=a.scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||m||h)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||h)&&t.slideNext(),(d||m)&&t.slidePrev()),n("keyPress",i)}}function c(){t.keyboard.enabled||(l.addEventListener("keydown",d),t.keyboard.enabled=!0)}function p(){t.keyboard.enabled&&(l.removeEventListener("keydown",d),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&c()})),i("destroy",(()=>{t.keyboard.enabled&&p()})),Object.assign(t.keyboard,{enable:c,disable:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const o=r();let d;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null,noMousewheelClass:"swiper-no-mousewheel"}}),t.mousewheel={enabled:!1};let c,p=l();const u=[];function m(){t.enabled&&(t.mouseEntered=!0)}function h(){t.enabled&&(t.mouseEntered=!1)}function f(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&l()-p<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&l()-p<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),p=(new o.Date).getTime(),!1)))}function g(e){let s=e,a=!0;if(!t.enabled)return;if(e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let o=t.el;"container"!==t.params.mousewheel.eventsTarget&&(o=document.querySelector(t.params.mousewheel.eventsTarget));const p=o&&o.contains(s.target);if(!t.mouseEntered&&!p&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let m=0;const h=t.rtlTranslate?-1:1,g=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(g.pixelX)>Math.abs(g.pixelY)))return!0;m=-g.pixelX*h}else{if(!(Math.abs(g.pixelY)>Math.abs(g.pixelX)))return!0;m=-g.pixelY}else m=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*h:-g.pixelY;if(0===m)return!0;r.invert&&(m=-m);let v=t.getTranslate()+m*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:l(),delta:Math.abs(m),direction:Math.sign(m)},a=c&&e.time<c.time+500&&e.delta<=c.delta&&e.direction===c.direction;if(!a){c=void 0;let l=t.getTranslate()+m*r.sensitivity;const o=t.isBeginning,p=t.isEnd;if(l>=t.minTranslate()&&(l=t.minTranslate()),l<=t.maxTranslate()&&(l=t.maxTranslate()),t.setTransition(0),t.setTranslate(l),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!o&&t.isBeginning||!p&&t.isEnd)&&t.updateSlidesClasses(),t.params.loop&&t.loopFix({direction:e.direction<0?"next":"prev",byMousewheel:!0}),t.params.freeMode.sticky){clearTimeout(d),d=void 0,u.length>=15&&u.shift();const s=u.length?u[u.length-1]:void 0,a=u[0];if(u.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))u.splice(0);else if(u.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=m>0?.8:.2;c=e,u.splice(0),d=n((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}d||(d=n((()=>{c=e,u.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),r.releaseOnEdges&&(l===t.minTranslate()||l===t.maxTranslate()))return!0}}
		else
		{	const s={time:l(),delta:Math.abs(m),direction:Math.sign(m),raw:e};u.length>=2&&u.shift();const a=u.length?u[u.length-1]:void 0;
		if(u.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150) && f(s):f(s),
			function(e)
			{	const s=t.params.mousewheel;
				if(e.direction<0)
				{	if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}
				else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function v(e){let s=t.el;"container"!==t.params.mousewheel.eventsTarget&&(s=document.querySelector(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",h),s[e]("wheel",g)}function w(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",g),!0):!t.mousewheel.enabled&&(v("addEventListener"),t.mousewheel.enabled=!0,!0)}function b(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,g),!0):!!t.mousewheel.enabled&&(v("removeEventListener"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&b(),t.params.mousewheel.enabled&&w()})),a("destroy",(()=>{t.params.cssMode&&w(),t.mousewheel.enabled&&b()})),Object.assign(t.mousewheel,{enable:w,disable:b})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,prevEl:null};const r=e=>(Array.isArray(e)?e:[e]).filter((e=>!!e));function n(e){let s;return e&&"string"==typeof e&&t.isElement&&(s=t.el.querySelector(e),s)?s:(e&&("string"==typeof e&&(s=[...document.querySelectorAll(e)]),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.el.querySelectorAll(e).length&&(s=t.el.querySelector(e))),e&&!s?e:s)}function l(e,s){const a=t.params.navigation;(e=r(e)).forEach((e=>{e&&(e.classList[s?"add":"remove"](...a.disabledClass.split(" ")),"BUTTON"===e.tagName&&(e.disabled=s),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](a.lockClass))}))}function o(){const{nextEl:e,prevEl:s}=t.navigation;if(t.params.loop)return l(s,!1),void l(e,!1);l(s,t.isBeginning&&!t.params.rewind),l(e,t.isEnd&&!t.params.rewind)}function d(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function c(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function p(){const e=t.params.navigation;if(t.params.navigation=J(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;let s=n(e.nextEl),a=n(e.prevEl);Object.assign(t.navigation,{nextEl:s,prevEl:a}),s=r(s),a=r(a);const i=(s,a)=>{s&&s.addEventListener("click","next"===a?c:d),!t.enabled&&s&&s.classList.add(...e.lockClass.split(" "))};s.forEach((e=>i(e,"next"))),a.forEach((e=>i(e,"prev")))}function u(){let{nextEl:e,prevEl:s}=t.navigation;e=r(e),s=r(s);const a=(e,s)=>{e.removeEventListener("click","next"===s?c:d),e.classList.remove(...t.params.navigation.disabledClass.split(" "))};e.forEach((e=>a(e,"next"))),s.forEach((e=>a(e,"prev")))}a("init",(()=>{!1===t.params.navigation.enabled?m():(p(),o())})),a("toEdge fromEdge lock unlock",(()=>{o()})),a("destroy",(()=>{u()})),a("enable disable",(()=>{let{nextEl:e,prevEl:s}=t.navigation;e=r(e),s=r(s),t.enabled?o():[...e,...s].filter((e=>!!e)).forEach((e=>e.classList.add(t.params.navigation.lockClass)))})),a("click",((e,s)=>{let{nextEl:a,prevEl:n}=t.navigation;a=r(a),n=r(n);const l=s.target;if(t.params.navigation.hideOnClick&&!n.includes(l)&&!a.includes(l)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===l||t.pagination.el.contains(l)))return;let e;a.length?e=a[0].classList.contains(t.params.navigation.hiddenClass):n.length&&(e=n[0].classList.contains(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),[...a,...n].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))}}));const m=()=>{t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),u()};Object.assign(t.navigation,{enable:()=>{t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),p(),o()},disable:m,update:o,init:p,destroy:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,bullets:[]};let l=0;const o=e=>(Array.isArray(e)?e:[e]).filter((e=>!!e));function d(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&0===t.pagination.el.length}function c(e,s){const{bulletActiveClass:a}=t.params.pagination;e&&(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&(e.classList.add(`${a}-${s}`),(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&e.classList.add(`${a}-${s}-${s}`))}function p(e){const s=e.target.closest(ee(t.params.pagination.bulletClass));if(!s)return;e.preventDefault();const a=w(s)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===a)return;const e=t.realIndex,s=t.getSlideIndexByData(a),i=t.getSlideIndexByData(t.realIndex),r=a=>{const i=t.activeIndex;t.loopFix({direction:a,activeSlideIndex:s,slideTo:!1});i===t.activeIndex&&t.slideToLoop(e,0,!1,!0)};if(s>t.slides.length-t.loopedSlides)r(s>i?"next":"prev");else if(t.params.centeredSlides){const e="auto"===t.params.slidesPerView?t.slidesPerViewDynamic():Math.ceil(parseFloat(t.params.slidesPerView,10));s<Math.floor(e/2)&&r("prev")}t.slideToLoop(a)}else t.slideTo(a)}function u(){const e=t.rtl,s=t.params.pagination;if(d())return;let a,r,p=t.pagination.el;p=o(p);const u=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,m=t.params.loop?Math.ceil(u/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(r=t.previousRealIndex||0,a=t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex):void 0!==t.snapIndex?(a=t.snapIndex,r=t.previousSnapIndex):(r=t.previousIndex||0,a=t.activeIndex||0),"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const i=t.pagination.bullets;let o,d,u;if(s.dynamicBullets&&(n=E(i[0],t.isHorizontal()?"width":"height",!0),p.forEach((e=>{e.style[t.isHorizontal()?"width":"height"]=n*(s.dynamicMainBullets+4)+"px"})),s.dynamicMainBullets>1&&void 0!==r&&(l+=a-(r||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),o=Math.max(a-l,0),d=o+(Math.min(i.length,s.dynamicMainBullets)-1),u=(d+o)/2),i.forEach((e=>{const t=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...t)})),p.length>1)i.forEach((e=>{const i=w(e);i===a?e.classList.add(...s.bulletActiveClass.split(" ")):t.isElement&&e.setAttribute("part","bullet"),s.dynamicBullets&&(i>=o&&i<=d&&e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),i===o&&c(e,"prev"),i===d&&c(e,"next"))}));else{const e=i[a];if(e&&e.classList.add(...s.bulletActiveClass.split(" ")),t.isElement&&i.forEach(((e,t)=>{e.setAttribute("part",t===a?"bullet-active":"bullet")})),s.dynamicBullets){const e=i[o],t=i[d];for(let e=o;e<=d;e+=1)i[e]&&i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));c(e,"prev"),c(t,"next")}}if(s.dynamicBullets){const a=Math.min(i.length,s.dynamicMainBullets+4),r=(n*a-n)/2-u*n,l=e?"right":"left";i.forEach((e=>{e.style[t.isHorizontal()?l:"top"]=`${r}px`}))}}p.forEach(((e,r)=>{if("fraction"===s.type&&(e.querySelectorAll(ee(s.currentClass)).forEach((e=>{e.textContent=s.formatFractionCurrent(a+1)})),e.querySelectorAll(ee(s.totalClass)).forEach((e=>{e.textContent=s.formatFractionTotal(m)}))),"progressbar"===s.type){let i;i=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const r=(a+1)/m;let n=1,l=1;"horizontal"===i?n=r:l=r,e.querySelectorAll(ee(s.progressbarFillClass)).forEach((e=>{e.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,e.style.transitionDuration=`${t.params.speed}ms`}))}"custom"===s.type&&s.renderCustom?(e.innerHTML=s.renderCustom(t,a+1,m),0===r&&i("paginationRender",e)):(0===r&&i("paginationRender",e),i("paginationUpdate",e)),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](s.lockClass)}))}function m(){const e=t.params.pagination;if(d())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length;let a=t.pagination.el;a=o(a);let r="";if("bullets"===e.type){let a=t.params.loop?Math.ceil(s/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&a>s&&(a=s);for(let s=0;s<a;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} ${t.isElement?'part="bullet"':""} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),t.pagination.bullets=[],a.forEach((s=>{"custom"!==e.type&&(s.innerHTML=r||""),"bullets"===e.type&&t.pagination.bullets.push(...s.querySelectorAll(ee(e.bulletClass)))})),"custom"!==e.type&&i("paginationRender",a[0])}function h(){t.params.pagination=J(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s;"string"==typeof e.el&&t.isElement&&(s=t.el.querySelector(e.el)),s||"string"!=typeof e.el||(s=[...document.querySelectorAll(e.el)]),s||(s=e.el),s&&0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&Array.isArray(s)&&s.length>1&&(s=[...t.el.querySelectorAll(e.el)],s.length>1&&(s=s.filter((e=>b(e,".swiper")[0]===t.el))[0])),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(t.pagination,{el:s}),s=o(s),s.forEach((s=>{"bullets"===e.type&&e.clickable&&s.classList.add(...(e.clickableClass||"").split(" ")),s.classList.add(e.modifierClass+e.type),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.classList.add(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.classList.add(e.progressbarOppositeClass),e.clickable&&s.addEventListener("click",p),t.enabled||s.classList.add(e.lockClass)})))}function f(){const e=t.params.pagination;if(d())return;let s=t.pagination.el;s&&(s=o(s),s.forEach((s=>{s.classList.remove(e.hiddenClass),s.classList.remove(e.modifierClass+e.type),s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&(s.classList.remove(...(e.clickableClass||"").split(" ")),s.removeEventListener("click",p))}))),t.pagination.bullets&&t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))}a("changeDirection",(()=>{if(!t.pagination||!t.pagination.el)return;const e=t.params.pagination;let{el:s}=t.pagination;s=o(s),s.forEach((s=>{s.classList.remove(e.horizontalClass,e.verticalClass),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),a("init",(()=>{!1===t.params.pagination.enabled?g():(h(),m(),u())})),a("activeIndexChange",(()=>{void 0===t.snapIndex&&u()})),a("snapIndexChange",(()=>{u()})),a("snapGridLengthChange",(()=>{m(),u()})),a("destroy",(()=>{f()})),a("enable disable",(()=>{let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass))))})),a("lock unlock",(()=>{u()})),a("click",((e,s)=>{const a=s.target,r=o(t.pagination.el);if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!a.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r[0].classList.contains(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))}}));const g=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),f()};Object.assign(t.pagination,{enable:()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),h(),m(),u()},disable:g,render:m,update:u,init:h,destroy:f})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const l=a();let o,d,c,p,u=!1,m=null,h=null;function v(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s}=t,{dragEl:a,el:i}=e,r=t.params.scrollbar,n=t.params.loop?t.progressLoop:t.progress;let l=d,o=(c-d)*n;s?(o=-o,o>0?(l=d-o,o=0):-o+d>c&&(l=c+o)):o<0?(l=d+o,o=0):o+d>c&&(l=c-o),t.isHorizontal()?(a.style.transform=`translate3d(${o}px, 0, 0)`,a.style.width=`${l}px`):(a.style.transform=`translate3d(0px, ${o}px, 0)`,a.style.height=`${l}px`),r.hide&&(clearTimeout(m),i.style.opacity=1,m=setTimeout((()=>{i.style.opacity=0,i.style.transitionDuration="400ms"}),1e3))}function w(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{dragEl:s,el:a}=e;s.style.width="",s.style.height="",c=t.isHorizontal()?a.offsetWidth:a.offsetHeight,p=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),d="auto"===t.params.scrollbar.dragSize?c*p:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s.style.width=`${d}px`:s.style.height=`${d}px`,a.style.display=p>=1?"none":"",t.params.scrollbar.hide&&(a.style.opacity=0),t.params.watchOverflow&&t.enabled&&e.el.classList[t.isLocked?"add":"remove"](t.params.scrollbar.lockClass)}function b(e){return t.isHorizontal()?e.clientX:e.clientY}function y(e){const{scrollbar:s,rtlTranslate:a}=t,{el:i}=s;let r;r=(b(e)-g(i)[t.isHorizontal()?"left":"top"]-(null!==o?o:d/2))/(c-d),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function E(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n,dragEl:l}=a;u=!0,o=e.target===l?b(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.style.transitionDuration="100ms",l.style.transitionDuration="100ms",y(e),clearTimeout(h),n.style.transitionDuration="0ms",s.hide&&(n.style.opacity=1),t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="none"),r("scrollbarDragStart",e)}function x(e){const{scrollbar:s,wrapperEl:a}=t,{el:i,dragEl:n}=s;u&&(e.preventDefault?e.preventDefault():e.returnValue=!1,y(e),a.style.transitionDuration="0ms",i.style.transitionDuration="0ms",n.style.transitionDuration="0ms",r("scrollbarDragMove",e))}function S(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:l}=a;u&&(u=!1,t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="",i.style.transitionDuration=""),s.hide&&(clearTimeout(h),h=n((()=>{l.style.opacity=0,l.style.transitionDuration="400ms"}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function T(e){const{scrollbar:s,params:a}=t,i=s.el;if(!i)return;const r=i,n=!!a.passiveListeners&&{passive:!1,capture:!1},o=!!a.passiveListeners&&{passive:!0,capture:!1};if(!r)return;const d="on"===e?"addEventListener":"removeEventListener";r[d]("pointerdown",E,n),l[d]("pointermove",x,n),l[d]("pointerup",S,o)}function M(){const{scrollbar:e,el:s}=t;t.params.scrollbar=J(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i,r;"string"==typeof a.el&&t.isElement&&(i=t.el.querySelector(a.el)),i||"string"!=typeof a.el?i||(i=a.el):i=l.querySelectorAll(a.el),t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.querySelectorAll(a.el).length&&(i=s.querySelector(a.el)),i.length>0&&(i=i[0]),i.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),i&&(r=i.querySelector(`.${t.params.scrollbar.dragClass}`),r||(r=f("div",t.params.scrollbar.dragClass),i.append(r))),Object.assign(e,{el:i,dragEl:r}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&T("on"),i&&i.classList[t.enabled?"remove":"add"](t.params.scrollbar.lockClass)}function C(){const e=t.params.scrollbar,s=t.scrollbar.el;s&&s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.params.scrollbar.el&&t.scrollbar.el&&T("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null},i("init",(()=>{!1===t.params.scrollbar.enabled?P():(M(),w(),v())})),i("update resize observerUpdate lock unlock",(()=>{w()})),i("setTranslate",(()=>{v()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&(t.scrollbar.dragEl.style.transitionDuration=`${e}ms`)}(s)})),i("enable disable",(()=>{const{el:e}=t.scrollbar;e&&e.classList[t.enabled?"remove":"add"](t.params.scrollbar.lockClass)})),i("destroy",(()=>{C()}));const P=()=>{t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.el&&t.scrollbar.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),C()};Object.assign(t.scrollbar,{enable:()=>{t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.el&&t.scrollbar.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),M(),w(),v()},disable:P,updateSize:w,setTranslate:v,init:M,destroy:C})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i="[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",r=(e,s)=>{const{rtl:a}=t,i=a?-1:1,r=e.getAttribute("data-swiper-parallax")||"0";let n=e.getAttribute("data-swiper-parallax-x"),l=e.getAttribute("data-swiper-parallax-y");const o=e.getAttribute("data-swiper-parallax-scale"),d=e.getAttribute("data-swiper-parallax-opacity"),c=e.getAttribute("data-swiper-parallax-rotate");if(n||l?(n=n||"0",l=l||"0"):t.isHorizontal()?(n=r,l="0"):(l=r,n="0"),n=n.indexOf("%")>=0?parseInt(n,10)*s*i+"%":n*s*i+"px",l=l.indexOf("%")>=0?parseInt(l,10)*s+"%":l*s+"px",null!=d){const t=d-(d-1)*(1-Math.abs(s));e.style.opacity=t}let p=`translate3d(${n}, ${l}, 0px)`;if(null!=o){p+=` scale(${o-(o-1)*(1-Math.abs(s))})`}if(c&&null!=c){p+=` rotate(${c*s*-1}deg)`}e.style.transform=p},n=()=>{const{el:e,slides:s,progress:a,snapGrid:n,isElement:l}=t,o=h(e,i);t.isElement&&o.push(...h(t.hostEl,i)),o.forEach((e=>{r(e,a)})),s.forEach(((e,s)=>{let l=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(l+=Math.ceil(s/2)-a*(n.length-1)),l=Math.min(Math.max(l,-1),1),e.querySelectorAll(`${i}, [data-swiper-parallax-rotate]`).forEach((e=>{r(e,l)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&n()})),a("setTranslate",(()=>{t.params.parallax.enabled&&n()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{el:s,hostEl:a}=t,r=[...s.querySelectorAll(i)];t.isElement&&r.push(...a.querySelectorAll(i)),r.forEach((t=>{let s=parseInt(t.getAttribute("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.style.transitionDuration=`${s}ms`}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,d,c=1,p=!1;const u=[],m={originX:0,originY:0,slideEl:void 0,slideWidth:void 0,slideHeight:void 0,imageEl:void 0,imageWrapEl:void 0,maxRatio:3},f={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},v={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let w=1;function y(){if(u.length<2)return 1;const e=u[0].pageX,t=u[0].pageY,s=u[1].pageX,a=u[1].pageY;return Math.sqrt((s-e)**2+(a-t)**2)}function E(e){const s=t.isElement?"swiper-slide":`.${t.params.slideClass}`;return!!e.target.matches(s)||t.slides.filter((t=>t.contains(e.target))).length>0}function x(e){if("mouse"===e.pointerType&&u.splice(0,u.length),!E(e))return;const s=t.params.zoom;if(l=!1,d=!1,u.push(e),!(u.length<2)){if(l=!0,m.scaleStart=y(),!m.slideEl){m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`),m.slideEl||(m.slideEl=t.slides[t.activeIndex]);let a=m.slideEl.querySelector(`.${s.containerClass}`);if(a&&(a=a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=a,m.imageWrapEl=a?b(m.imageEl,`.${s.containerClass}`)[0]:void 0,!m.imageWrapEl)return void(m.imageEl=void 0);m.maxRatio=m.imageWrapEl.getAttribute("data-swiper-zoom")||s.maxRatio}if(m.imageEl){const[e,t]=function(){if(u.length<2)return{x:null,y:null};const e=m.imageEl.getBoundingClientRect();return[(u[0].pageX+(u[1].pageX-u[0].pageX)/2-e.x-n.scrollX)/c,(u[0].pageY+(u[1].pageY-u[0].pageY)/2-e.y-n.scrollY)/c]}();m.originX=e,m.originY=t,m.imageEl.style.transitionDuration="0ms"}p=!0}}function S(e){if(!E(e))return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&(u[i]=e),u.length<2||(d=!0,m.scaleMove=y(),m.imageEl&&(a.scale=m.scaleMove/m.scaleStart*c,a.scale>m.maxRatio&&(a.scale=m.maxRatio-1+(a.scale-m.maxRatio+1)**.5),a.scale<s.minRatio&&(a.scale=s.minRatio+1-(s.minRatio-a.scale+1)**.5),m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`))}function T(e){if(!E(e))return;if("mouse"===e.pointerType&&"pointerout"===e.type)return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&u.splice(i,1),l&&d&&(l=!1,d=!1,m.imageEl&&(a.scale=Math.max(Math.min(a.scale,m.maxRatio),s.minRatio),m.imageEl.style.transitionDuration=`${t.params.speed}ms`,m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`,c=a.scale,p=!1,a.scale>1&&m.slideEl?m.slideEl.classList.add(`${s.zoomedSlideClass}`):a.scale<=1&&m.slideEl&&m.slideEl.classList.remove(`${s.zoomedSlideClass}`),1===a.scale&&(m.originX=0,m.originY=0,m.slideEl=void 0)))}function M(e){if(!E(e)||!function(e){const s=`.${t.params.zoom.containerClass}`;return!!e.target.matches(s)||[...t.hostEl.querySelectorAll(s)].filter((t=>t.contains(e.target))).length>0}(e))return;const s=t.zoom;if(!m.imageEl)return;if(!f.isTouched||!m.slideEl)return;f.isMoved||(f.width=m.imageEl.offsetWidth,f.height=m.imageEl.offsetHeight,f.startX=o(m.imageWrapEl,"x")||0,f.startY=o(m.imageWrapEl,"y")||0,m.slideWidth=m.slideEl.offsetWidth,m.slideHeight=m.slideEl.offsetHeight,m.imageWrapEl.style.transitionDuration="0ms");const a=f.width*s.scale,i=f.height*s.scale;if(a<m.slideWidth&&i<m.slideHeight)return;f.minX=Math.min(m.slideWidth/2-a/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-i/2,0),f.maxY=-f.minY,f.touchesCurrent.x=u.length>0?u[0].pageX:e.pageX,f.touchesCurrent.y=u.length>0?u[0].pageY:e.pageY;if(Math.max(Math.abs(f.touchesCurrent.x-f.touchesStart.x),Math.abs(f.touchesCurrent.y-f.touchesStart.y))>5&&(t.allowClick=!1),!f.isMoved&&!p){if(t.isHorizontal()&&(Math.floor(f.minX)===Math.floor(f.startX)&&f.touchesCurrent.x<f.touchesStart.x||Math.floor(f.maxX)===Math.floor(f.startX)&&f.touchesCurrent.x>f.touchesStart.x))return void(f.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(f.minY)===Math.floor(f.startY)&&f.touchesCurrent.y<f.touchesStart.y||Math.floor(f.maxY)===Math.floor(f.startY)&&f.touchesCurrent.y>f.touchesStart.y))return void(f.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),f.isMoved=!0;const r=(s.scale-c)/(m.maxRatio-t.params.zoom.minRatio),{originX:n,originY:l}=m;f.currentX=f.touchesCurrent.x-f.touchesStart.x+f.startX+r*(f.width-2*n),f.currentY=f.touchesCurrent.y-f.touchesStart.y+f.startY+r*(f.height-2*l),f.currentX<f.minX&&(f.currentX=f.minX+1-(f.minX-f.currentX+1)**.8),f.currentX>f.maxX&&(f.currentX=f.maxX-1+(f.currentX-f.maxX+1)**.8),f.currentY<f.minY&&(f.currentY=f.minY+1-(f.minY-f.currentY+1)**.8),f.currentY>f.maxY&&(f.currentY=f.maxY-1+(f.currentY-f.maxY+1)**.8),v.prevPositionX||(v.prevPositionX=f.touchesCurrent.x),v.prevPositionY||(v.prevPositionY=f.touchesCurrent.y),v.prevTime||(v.prevTime=Date.now()),v.x=(f.touchesCurrent.x-v.prevPositionX)/(Date.now()-v.prevTime)/2,v.y=(f.touchesCurrent.y-v.prevPositionY)/(Date.now()-v.prevTime)/2,Math.abs(f.touchesCurrent.x-v.prevPositionX)<2&&(v.x=0),Math.abs(f.touchesCurrent.y-v.prevPositionY)<2&&(v.y=0),v.prevPositionX=f.touchesCurrent.x,v.prevPositionY=f.touchesCurrent.y,v.prevTime=Date.now(),m.imageWrapEl.style.transform=`translate3d(${f.currentX}px, ${f.currentY}px,0)`}function C(){const e=t.zoom;m.slideEl&&t.activeIndex!==t.slides.indexOf(m.slideEl)&&(m.imageEl&&(m.imageEl.style.transform="translate3d(0,0,0) scale(1)"),m.imageWrapEl&&(m.imageWrapEl.style.transform="translate3d(0,0,0)"),m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),e.scale=1,c=1,m.slideEl=void 0,m.imageEl=void 0,m.imageWrapEl=void 0,m.originX=0,m.originY=0)}function P(e){const s=t.zoom,a=t.params.zoom;if(!m.slideEl){e&&e.target&&(m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`)),m.slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=h(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex]);let s=m.slideEl.querySelector(`.${a.containerClass}`);s&&(s=s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=s,m.imageWrapEl=s?b(m.imageEl,`.${a.containerClass}`)[0]:void 0}if(!m.imageEl||!m.imageWrapEl)return;let i,r,l,o,d,p,u,v,w,y,E,x,S,T,M,C,P,L;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.slideEl.classList.add(`${a.zoomedSlideClass}`),void 0===f.touchesStart.x&&e?(i=e.pageX,r=e.pageY):(i=f.touchesStart.x,r=f.touchesStart.y);const z="number"==typeof e?e:null;1===c&&z&&(i=void 0,r=void 0),s.scale=z||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,c=z||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,!e||1===c&&z?(u=0,v=0):(P=m.slideEl.offsetWidth,L=m.slideEl.offsetHeight,l=g(m.slideEl).left+n.scrollX,o=g(m.slideEl).top+n.scrollY,d=l+P/2-i,p=o+L/2-r,w=m.imageEl.offsetWidth,y=m.imageEl.offsetHeight,E=w*s.scale,x=y*s.scale,S=Math.min(P/2-E/2,0),T=Math.min(L/2-x/2,0),M=-S,C=-T,u=d*s.scale,v=p*s.scale,u<S&&(u=S),u>M&&(u=M),v<T&&(v=T),v>C&&(v=C)),z&&1===s.scale&&(m.originX=0,m.originY=0),m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform=`translate3d(${u}px, ${v}px,0)`,m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform=`translate3d(0,0,0) scale(${s.scale})`}function L(){const e=t.zoom,s=t.params.zoom;if(!m.slideEl){t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=h(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex];let e=m.slideEl.querySelector(`.${s.containerClass}`);e&&(e=e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=e,m.imageWrapEl=e?b(m.imageEl,`.${s.containerClass}`)[0]:void 0}m.imageEl&&m.imageWrapEl&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,c=1,m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform="translate3d(0,0,0)",m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform="translate3d(0,0,0) scale(1)",m.slideEl.classList.remove(`${s.zoomedSlideClass}`),m.slideEl=void 0,m.originX=0,m.originY=0)}function z(e){const s=t.zoom;s.scale&&1!==s.scale?L():P(e)}function A(){return{passiveListener:!!t.params.passiveListeners&&{passive:!0,capture:!1},activeListenerWithCapture:!t.params.passiveListeners||{passive:!1,capture:!0}}}function $(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const{passiveListener:s,activeListenerWithCapture:a}=A();t.wrapperEl.addEventListener("pointerdown",x,s),t.wrapperEl.addEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.addEventListener(e,T,s)})),t.wrapperEl.addEventListener("pointermove",M,a)}function I(){const e=t.zoom;if(!e.enabled)return;e.enabled=!1;const{passiveListener:s,activeListenerWithCapture:a}=A();t.wrapperEl.removeEventListener("pointerdown",x,s),t.wrapperEl.removeEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.removeEventListener(e,T,s)})),t.wrapperEl.removeEventListener("pointermove",M,a)}Object.defineProperty(t.zoom,"scale",{get:()=>w,set(e){if(w!==e){const t=m.imageEl,s=m.slideEl;i("zoomChange",e,t,s)}w=e}}),a("init",(()=>{t.params.zoom.enabled&&$()})),a("destroy",(()=>{I()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;if(!m.imageEl)return;if(f.isTouched)return;s.android&&e.cancelable&&e.preventDefault(),f.isTouched=!0;const a=u.length>0?u[0]:e;f.touchesStart.x=a.pageX,f.touchesStart.y=a.pageY}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.imageEl)return;if(!f.isTouched||!f.isMoved)return f.isTouched=!1,void(f.isMoved=!1);f.isTouched=!1,f.isMoved=!1;let s=300,a=300;const i=v.x*s,r=f.currentX+i,n=v.y*a,l=f.currentY+n;0!==v.x&&(s=Math.abs((r-f.currentX)/v.x)),0!==v.y&&(a=Math.abs((l-f.currentY)/v.y));const o=Math.max(s,a);f.currentX=r,f.currentY=l;const d=f.width*e.scale,c=f.height*e.scale;f.minX=Math.min(m.slideWidth/2-d/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-c/2,0),f.maxY=-f.minY,f.currentX=Math.max(Math.min(f.currentX,f.maxX),f.minX),f.currentY=Math.max(Math.min(f.currentY,f.maxY),f.minY),m.imageWrapEl.style.transitionDuration=`${o}ms`,m.imageWrapEl.style.transform=`translate3d(${f.currentX}px, ${f.currentY}px,0)`}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&z(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&C()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&C()})),Object.assign(t.zoom,{enable:$,disable:I,in:P,out:L,toggle:z})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{if("undefined"!=typeof window&&("string"==typeof t.params.controller.control||t.params.controller.control instanceof HTMLElement)){const e=document.querySelector(t.params.controller.control);if(e&&e.swiper)t.controller.control=e.swiper;else if(e){const s=a=>{t.controller.control=a.detail[0],t.update(),e.removeEventListener("init",s)};e.addEventListener("init",s)}}else t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){if(e.destroyed)return;const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid)}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),!Number.isNaN(r)&&Number.isFinite(r)||(r=1),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function l(s){s.destroyed||(s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&n((()=>{s.updateAutoHeight()})),y(s.wrapperEl,(()=>{i&&s.transitionEnd()}))))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&l(i[r]);else i instanceof a&&s!==i&&l(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null}}),t.a11y={clicked:!1};let i=null;function r(e){const t=i;0!==t.length&&(t.innerHTML="",t.innerHTML=e)}const n=e=>(Array.isArray(e)?e:[e]).filter((e=>!!e));function l(e){(e=n(e)).forEach((e=>{e.setAttribute("tabIndex","0")}))}function o(e){(e=n(e)).forEach((e=>{e.setAttribute("tabIndex","-1")}))}function d(e,t){(e=n(e)).forEach((e=>{e.setAttribute("role",t)}))}function c(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-roledescription",t)}))}function p(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-label",t)}))}function u(e){(e=n(e)).forEach((e=>{e.setAttribute("aria-disabled",!0)}))}function m(e){(e=n(e)).forEach((e=>{e.setAttribute("aria-disabled",!1)}))}function h(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=e.target;t.pagination&&t.pagination.el&&(a===t.pagination.el||t.pagination.el.contains(e.target))&&!e.target.matches(ee(t.params.pagination.bulletClass))||(t.navigation&&t.navigation.nextEl&&a===t.navigation.nextEl&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.prevEl&&a===t.navigation.prevEl&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.matches(ee(t.params.pagination.bulletClass))&&a.click())}function g(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function v(){return g()&&t.params.pagination.clickable}const b=(e,t,s)=>{l(e),"BUTTON"!==e.tagName&&(d(e,"button"),e.addEventListener("keydown",h)),p(e,s),function(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-controls",t)}))}(e,t)},y=()=>{t.a11y.clicked=!0},E=()=>{requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.destroyed||(t.a11y.clicked=!1)}))}))},x=e=>{if(t.a11y.clicked)return;const s=e.target.closest(`.${t.params.slideClass}, swiper-slide`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,t.slideTo(t.slides.indexOf(s),0))},S=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&c(t.slides,e.itemRoleDescriptionMessage),e.slideRole&&d(t.slides,e.slideRole);const s=t.slides.length;e.slideLabelMessage&&t.slides.forEach(((a,i)=>{const r=t.params.loop?parseInt(a.getAttribute("data-swiper-slide-index"),10):i;p(a,e.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,s))}))},T=()=>{const e=t.params.a11y;t.el.append(i);const s=t.el;e.containerRoleDescriptionMessage&&c(s,e.containerRoleDescriptionMessage),e.containerMessage&&p(s,e.containerMessage);const a=t.wrapperEl,r=e.id||a.getAttribute("id")||`swiper-wrapper-${l=16,void 0===l&&(l=16),"x".repeat(l).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var l;const o=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var d;d=r,n(a).forEach((e=>{e.setAttribute("id",d)})),function(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-live",t)}))}(a,o),S();let{nextEl:u,prevEl:m}=t.navigation?t.navigation:{};if(u=n(u),m=n(m),u&&u.forEach((t=>b(t,r,e.nextSlideMessage))),m&&m.forEach((t=>b(t,r,e.prevSlideMessage))),v()){(Array.isArray(t.pagination.el)?t.pagination.el:[t.pagination.el]).forEach((e=>{e.addEventListener("keydown",h)}))}t.el.addEventListener("focus",x,!0),t.el.addEventListener("pointerdown",y,!0),t.el.addEventListener("pointerup",E,!0)};a("beforeInit",(()=>{i=f("span",t.params.a11y.notificationClass),i.setAttribute("aria-live","assertive"),i.setAttribute("aria-atomic","true")})),a("afterInit",(()=>{t.params.a11y.enabled&&T()})),a("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&S()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{nextEl:e,prevEl:s}=t.navigation;s&&(t.isBeginning?(u(s),o(s)):(m(s),l(s))),e&&(t.isEnd?(u(e),o(e)):(m(e),l(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;g()&&t.pagination.bullets.forEach((s=>{t.params.pagination.clickable&&(l(s),t.params.pagination.renderBullet||(d(s,"button"),p(s,e.paginationBulletMessage.replace(/\{\{index\}\}/,w(s)+1)))),s.matches(ee(t.params.pagination.bulletActiveClass))?s.setAttribute("aria-current","true"):s.removeAttribute("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){i&&i.remove();let{nextEl:e,prevEl:s}=t.navigation?t.navigation:{};e=n(e),s=n(s),e&&e.forEach((e=>e.removeEventListener("keydown",h))),s&&s.forEach((e=>e.removeEventListener("keydown",h))),v()&&(Array.isArray(t.pagination.el)?t.pagination.el:[t.pagination.el]).forEach((e=>{e.removeEventListener("keydown",h)}));t.el.removeEventListener("focus",x,!0),t.el.removeEventListener("pointerdown",y,!0),t.el.removeEventListener("pointerup",E,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides[s];let d=l(o.getAttribute("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e?`${e}/`:""}${d}`}else n.pathname.includes(e)||(d=`${e?`${e}/`:""}${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides[i];if(l(r.getAttribute("data-history"))===s){const s=t.getSlideIndex(r);t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),n.key||n.value?(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p)):t.params.history.replaceState||e.addEventListener("popstate",p)}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),d=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1,getSlideIndex(e,s){if(t.virtual&&t.params.virtual.enabled){const e=t.slides.filter((e=>e.getAttribute("data-hash")===s))[0];if(!e)return 0;return parseInt(e.getAttribute("data-swiper-slide-index"),10)}return t.getSlideIndex(h(t.slidesEl,`.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0])}}});const c=()=>{i("hashChange");const e=o.location.hash.replace("#",""),s=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex];if(e!==(s?s.getAttribute("data-hash"):"")){const s=t.params.hashNavigation.getSlideIndex(t,e);if(void 0===s||Number.isNaN(s))return;t.slideTo(s)}},p=()=>{if(!l||!t.params.hashNavigation.enabled)return;const e=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex],s=e?e.getAttribute("data-hash")||e.getAttribute("data-history"):"";t.params.hashNavigation.replaceState&&d.history&&d.history.replaceState?(d.history.replaceState(null,null,`#${s}`||""),i("hashSet")):(o.location.hash=s||"",i("hashSet"))};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0,a=t.params.hashNavigation.getSlideIndex(t,e);t.slideTo(a||0,s,t.params.runCallbacksOnInit,!0)}t.params.hashNavigation.watchState&&d.addEventListener("hashchange",c)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d.removeEventListener("hashchange",c)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&p()})),n("slideChange",(()=>{l&&t.params.cssMode&&p()}))},function(e){let t,s,{swiper:i,extendParams:r,on:n,emit:l,params:o}=e;i.autoplay={running:!1,paused:!1,timeLeft:0},r({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let d,c,p,u,m,h,f,g=o&&o.autoplay?o.autoplay.delay:3e3,v=o&&o.autoplay?o.autoplay.delay:3e3,w=(new Date).getTime;function b(e){i&&!i.destroyed&&i.wrapperEl&&e.target===i.wrapperEl&&(i.wrapperEl.removeEventListener("transitionend",b),M())}const y=()=>{if(i.destroyed||!i.autoplay.running)return;i.autoplay.paused?c=!0:c&&(v=d,c=!1);const e=i.autoplay.paused?d:w+v-(new Date).getTime();i.autoplay.timeLeft=e,l("autoplayTimeLeft",e,e/g),s=requestAnimationFrame((()=>{y()}))},E=e=>{if(i.destroyed||!i.autoplay.running)return;cancelAnimationFrame(s),y();let a=void 0===e?i.params.autoplay.delay:e;g=i.params.autoplay.delay,v=i.params.autoplay.delay;const r=(()=>{let e;if(e=i.virtual&&i.params.virtual.enabled?i.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0]:i.slides[i.activeIndex],!e)return;return parseInt(e.getAttribute("data-swiper-autoplay"),10)})();!Number.isNaN(r)&&r>0&&void 0===e&&(a=r,g=r,v=r),d=a;const n=i.params.speed,o=()=>{i&&!i.destroyed&&(i.params.autoplay.reverseDirection?!i.isBeginning||i.params.loop||i.params.rewind?(i.slidePrev(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(i.slides.length-1,n,!0,!0),l("autoplay")):!i.isEnd||i.params.loop||i.params.rewind?(i.slideNext(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(0,n,!0,!0),l("autoplay")),i.params.cssMode&&(w=(new Date).getTime(),requestAnimationFrame((()=>{E()}))))};return a>0?(clearTimeout(t),t=setTimeout((()=>{o()}),a)):requestAnimationFrame((()=>{o()})),a},x=()=>{i.autoplay.running=!0,E(),l("autoplayStart")},S=()=>{i.autoplay.running=!1,clearTimeout(t),cancelAnimationFrame(s),l("autoplayStop")},T=(e,s)=>{if(i.destroyed||!i.autoplay.running)return;clearTimeout(t),e||(f=!0);const a=()=>{l("autoplayPause"),i.params.autoplay.waitForTransition?i.wrapperEl.addEventListener("transitionend",b):M()};if(i.autoplay.paused=!0,s)return h&&(d=i.params.autoplay.delay),h=!1,void a();const r=d||i.params.autoplay.delay;d=r-((new Date).getTime()-w),i.isEnd&&d<0&&!i.params.loop||(d<0&&(d=0),a())},M=()=>{i.isEnd&&d<0&&!i.params.loop||i.destroyed||!i.autoplay.running||(w=(new Date).getTime(),f?(f=!1,E(d)):E(),i.autoplay.paused=!1,l("autoplayResume"))},C=()=>{if(i.destroyed||!i.autoplay.running)return;const e=a();"hidden"===e.visibilityState&&(f=!0,T(!0)),"visible"===e.visibilityState&&M()},P=e=>{"mouse"===e.pointerType&&(f=!0,i.animating||i.autoplay.paused||T(!0))},L=e=>{"mouse"===e.pointerType&&i.autoplay.paused&&M()};n("init",(()=>{i.params.autoplay.enabled&&(i.params.autoplay.pauseOnMouseEnter&&(i.el.addEventListener("pointerenter",P),i.el.addEventListener("pointerleave",L)),a().addEventListener("visibilitychange",C),w=(new Date).getTime(),x())})),n("destroy",(()=>{i.el.removeEventListener("pointerenter",P),i.el.removeEventListener("pointerleave",L),a().removeEventListener("visibilitychange",C),i.autoplay.running&&S()})),n("beforeTransitionStart",((e,t,s)=>{!i.destroyed&&i.autoplay.running&&(s||!i.params.autoplay.disableOnInteraction?T(!0,!0):S())})),n("sliderFirstMove",(()=>{!i.destroyed&&i.autoplay.running&&(i.params.autoplay.disableOnInteraction?S():(p=!0,u=!1,f=!1,m=setTimeout((()=>{f=!0,u=!0,T(!0)}),200)))})),n("touchEnd",(()=>{if(!i.destroyed&&i.autoplay.running&&p){if(clearTimeout(m),clearTimeout(t),i.params.autoplay.disableOnInteraction)return u=!1,void(p=!1);u&&i.params.cssMode&&M(),u=!1,p=!1}})),n("slideChange",(()=>{!i.destroyed&&i.autoplay.running&&(h=!0)})),Object.assign(i.autoplay,{start:x,stop:S,pause:T,resume:M})},function(e){let{swiper:t,extendParams:s,on:i}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let r=!1,n=!1;function l(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&a.classList.contains(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;i=e.params.loop?parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10):s,t.params.loop?t.slideToLoop(i):t.slideTo(i)}function o(){const{thumbs:e}=t.params;if(r)return!1;r=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper.update();else if(d(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),n=!0}return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",l),!0}function c(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.forEach((e=>e.classList.remove(r))),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)h(s.slidesEl,`[data-swiper-slide-index="${t.realIndex+e}"]`).forEach((e=>{e.classList.add(r)}));else for(let e=0;e<i;e+=1)s.slides[t.realIndex+e]&&s.slides[t.realIndex+e].classList.add(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){const i=s.activeIndex;let r,o;if(s.params.loop){const e=s.slides.filter((e=>e.getAttribute("data-swiper-slide-index")===`${t.realIndex}`))[0];r=s.slides.indexOf(e),o=t.activeIndex>t.previousIndex?"next":"prev"}else r=t.realIndex,o=r>t.previousIndex?"next":"prev";l&&(r+="next"===o?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(r)<0&&(s.params.centeredSlides?r=r>i?r-Math.floor(a/2)+1:r+Math.floor(a/2)-1:r>i&&s.params.slidesPerGroup,s.slideTo(r,e?0:void 0))}}t.thumbs={swiper:null},i("beforeInit",(()=>{const{thumbs:e}=t.params;if(e&&e.swiper)if("string"==typeof e.swiper||e.swiper instanceof HTMLElement){const s=a(),i=()=>{const a="string"==typeof e.swiper?s.querySelector(e.swiper):e.swiper;if(a&&a.swiper)e.swiper=a.swiper,o(),c(!0);else if(a){const s=i=>{e.swiper=i.detail[0],a.removeEventListener("init",s),o(),c(!0),e.swiper.update(),t.update()};a.addEventListener("init",s)}return a},r=()=>{if(t.destroyed)return;i()||requestAnimationFrame(r)};requestAnimationFrame(r)}else o(),c(!0)})),i("slideChange update resize observerUpdate",(()=>{c()})),i("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),i("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&n&&e.destroy()})),Object.assign(t.thumbs,{init:o,update:c})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){if(t.params.cssMode)return;const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){if(t.params.cssMode)return;const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:l()})},onTouchEnd:function(e){let{currentPos:s}=e;if(t.params.cssMode)return;const{params:r,wrapperEl:n,rtlTranslate:o,snapGrid:d,touchEventsData:c}=t,p=l()-c.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(c.velocities.length>1){const e=c.velocities.pop(),s=c.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||l()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,c.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let p=t.translate+s;o&&(p=-p);let u,m=!1;const h=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(p<t.maxTranslate())r.freeMode.momentumBounce?(p+t.maxTranslate()<-h&&(p=t.maxTranslate()-h),u=t.maxTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(p>t.minTranslate())r.freeMode.momentumBounce?(p-t.minTranslate()>h&&(p=t.minTranslate()+h),u=t.minTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<d.length;t+=1)if(d[t]>-p){e=t;break}p=Math.abs(d[e]-p)<Math.abs(d[e-1]-p)||"next"===t.swipeDirection?d[e]:d[e-1],p=-p}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=o?Math.abs((-p-t.translate)/t.velocity):Math.abs((p-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((o?-p:p)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&m?(t.updateProgress(u),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating=!0,y(n,(()=>{t&&!t.destroyed&&c.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(u),y(n,(()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(p),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,y(n,(()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(p),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||p>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,i,{swiper:r,extendParams:n,on:l}=e;n({grid:{rows:1,fill:"column"}});const o=()=>{let e=r.params.spaceBetween;return"string"==typeof e&&e.indexOf("%")>=0?e=parseFloat(e.replace("%",""))/100*r.size:"string"==typeof e&&(e=parseFloat(e)),e};l("init",(()=>{i=r.params.grid&&r.params.grid.rows>1})),l("update",(()=>{const{params:e,el:t}=r,s=e.grid&&e.grid.rows>1;i&&!s?(t.classList.remove(`${e.containerModifierClass}grid`,`${e.containerModifierClass}grid-column`),a=1,r.emitContainerClasses()):!i&&s&&(t.classList.add(`${e.containerModifierClass}grid`),"column"===e.grid.fill&&t.classList.add(`${e.containerModifierClass}grid-column`),r.emitContainerClasses()),i=s})),r.grid={initSlides:e=>{const{slidesPerView:i}=r.params,{rows:n,fill:l}=r.params.grid;a=Math.floor(e/n),t=Math.floor(e/n)===e/n?e:Math.ceil(e/n)*n,"auto"!==i&&"row"===l&&(t=Math.max(t,i*n)),s=t/n},updateSlide:(e,i,n,l)=>{const{slidesPerGroup:d}=r.params,c=o(),{rows:p,fill:u}=r.params.grid;let m,h,f;if("row"===u&&d>1){const s=Math.floor(e/(d*p)),a=e-p*d*s,r=0===s?d:Math.min(Math.ceil((n-s*p*d)/p),d);f=Math.floor(a/r),h=a-f*r+s*d,m=h+f*t/p,i.style.order=m}else"column"===u?(h=Math.floor(e/p),f=e-h*p,(h>a||h===a&&f===p-1)&&(f+=1,f>=p&&(f=0,h+=1))):(f=Math.floor(e/s),h=e-f*s);i.row=f,i.column=h,i.style[l("margin-top")]=0!==f?c&&`${c}px`:""},updateWrapperSize:(e,s,a)=>{const{centeredSlides:i,roundLengths:n}=r.params,l=o(),{rows:d}=r.params.grid;if(r.virtualSize=(e+l)*t,r.virtualSize=Math.ceil(r.virtualSize/d)-l,r.wrapperEl.style[a("width")]=`${r.virtualSize+l}px`,i){const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];n&&(a=Math.floor(a)),s[t]<r.virtualSize+s[0]&&e.push(a)}s.splice(0,s.length),s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:te.bind(t),prependSlide:se.bind(t),addSlide:ae.bind(t),removeSlide:ie.bind(t),removeAllSlides:re.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1}}),ne({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t;t.params.fadeEffect;for(let s=0;s<e.length;s+=1){const e=t.slides[s];let a=-e.swiperSlideOffset;t.params.virtualTranslate||(a-=t.translate);let i=0;t.isHorizontal()||(i=a,a=0);const r=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e.progress),0):1+Math.min(Math.max(e.progress,-1),0),n=le(0,e);n.style.opacity=r,n.style.transform=`translate3d(${a}px, ${i}px, 0px)`}},setTransition:e=>{const s=t.slides.map((e=>m(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`})),oe({swiper:t,duration:e,transformElements:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=s?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=f("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"left":"top")).split(" ")),e.append(a)),i||(i=f("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"right":"bottom")).split(" ")),e.append(i)),a&&(a.style.opacity=Math.max(-t,0)),i&&(i.style.opacity=Math.max(t,0))};ne({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{el:e,wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:d}=t,c=t.params.cubeEffect,p=t.isHorizontal(),u=t.virtual&&t.params.virtual.enabled;let m,h=0;c.shadow&&(p?(m=t.wrapperEl.querySelector(".swiper-cube-shadow"),m||(m=f("div","swiper-cube-shadow"),t.wrapperEl.append(m)),m.style.height=`${r}px`):(m=e.querySelector(".swiper-cube-shadow"),m||(m=f("div","swiper-cube-shadow"),e.append(m))));for(let e=0;e<a.length;e+=1){const t=a[e];let s=e;u&&(s=parseInt(t.getAttribute("data-swiper-slide-index"),10));let r=90*s,n=Math.floor(r/360);l&&(r=-r,n=Math.floor(-r/360));const d=Math.max(Math.min(t.progress,1),-1);let m=0,f=0,g=0;s%4==0?(m=4*-n*o,g=0):(s-1)%4==0?(m=0,g=4*-n*o):(s-2)%4==0?(m=o+4*n*o,g=o):(s-3)%4==0&&(m=-o,g=3*o+4*o*n),l&&(m=-m),p||(f=m,m=0);const v=`rotateX(${p?0:-r}deg) rotateY(${p?r:0}deg) translate3d(${m}px, ${f}px, ${g}px)`;d<=1&&d>-1&&(h=90*s+90*d,l&&(h=90*-s-90*d)),t.style.transform=v,c.slideShadows&&i(t,d,p)}if(s.style.transformOrigin=`50% 50% -${o/2}px`,s.style["-webkit-transform-origin"]=`50% 50% -${o/2}px`,c.shadow)if(p)m.style.transform=`translate3d(0px, ${r/2+c.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`;else{const e=Math.abs(h)-90*Math.floor(Math.abs(h)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=c.shadowScale,a=c.shadowScale/t,i=c.shadowOffset;m.style.transform=`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-90deg)`}const g=(d.isSafari||d.isWebView)&&d.needPerspectiveFix?-o/2:0;s.style.transform=`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:h}deg) rotateY(${t.isHorizontal()?-h:0}deg)`,s.style.setProperty("--swiper-cube-translate-z",`${g}px`)},setTransition:e=>{const{el:s,slides:a}=t;if(a.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),t.params.cubeEffect.shadow&&!t.isHorizontal()){const t=s.querySelector(".swiper-cube-shadow");t&&(t.style.transitionDuration=`${e}ms`)}},recreateShadows:()=>{const e=t.isHorizontal();t.slides.forEach((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(t,s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0}});const i=(e,s)=>{let a=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=de("flip",e,t.isHorizontal()?"left":"top")),i||(i=de("flip",e,t.isHorizontal()?"right":"bottom")),a&&(a.style.opacity=Math.max(-s,0)),i&&(i.style.opacity=Math.max(s,0))};ne({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let r=0;r<e.length;r+=1){const n=e[r];let l=n.progress;t.params.flipEffect.limitRotation&&(l=Math.max(Math.min(n.progress,1),-1));const o=n.swiperSlideOffset;let d=-180*l,c=0,p=t.params.cssMode?-o-t.translate:-o,u=0;t.isHorizontal()?s&&(d=-d):(u=p,p=0,c=-d,d=0),n.style.zIndex=-Math.abs(Math.round(l))+e.length,a.slideShadows&&i(n,l);const m=`translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;le(0,n).style.transform=m}},setTransition:e=>{const s=t.slides.map((e=>m(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),oe({swiper:t,duration:e,transformElements:s})},recreateShadows:()=>{t.params.flipEffect,t.slides.forEach((e=>{let s=e.progress;t.params.flipEffect.limitRotation&&(s=Math.max(Math.min(e.progress,1),-1)),i(e,s)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),ne({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a[e],s=i[e],l=(o-t.swiperSlideOffset-s/2)/s,p="function"==typeof r.modifier?r.modifier(l):l*r.modifier;let u=n?d*p:0,m=n?0:d*p,h=-c*Math.abs(p),f=r.stretch;"string"==typeof f&&-1!==f.indexOf("%")&&(f=parseFloat(r.stretch)/100*s);let g=n?0:f*p,v=n?f*p:0,w=1-(1-r.scale)*Math.abs(p);Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(u)<.001&&(u=0),Math.abs(m)<.001&&(m=0),Math.abs(w)<.001&&(w=0);const b=`translate3d(${v}px,${g}px,${h}px)  rotateX(${m}deg) rotateY(${u}deg) scale(${w})`;if(le(0,t).style.transform=b,t.style.zIndex=1-Math.abs(Math.round(p)),r.slideShadows){let e=n?t.querySelector(".swiper-slide-shadow-left"):t.querySelector(".swiper-slide-shadow-top"),s=n?t.querySelector(".swiper-slide-shadow-right"):t.querySelector(".swiper-slide-shadow-bottom");e||(e=de("coverflow",t,n?"left":"top")),s||(s=de("coverflow",t,n?"right":"bottom")),e&&(e.style.opacity=p>0?p:0),s&&(s.style.opacity=-p>0?-p:0)}}},setTransition:e=>{t.slides.map((e=>m(e))).forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))}))},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;ne({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.style.transform=`translateX(calc(50% - ${e}px))`}for(let s=0;s<e.length;s+=1){const a=e[s],o=a.progress,d=Math.min(Math.max(a.progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a.originalProgress,-r.limitProgress),r.limitProgress));const p=a.swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],m=[0,0,0];let h=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,h=!0):d>0&&(f=r.prev,h=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),m.forEach(((e,t)=>{m[t]=f.rotate[t]*Math.abs(d*n)})),a.style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,y=`translate3d(${g}) ${v} ${w}`;if(h&&f.shadow||!h){let e=a.querySelector(".swiper-slide-shadow");if(!e&&f.shadow&&(e=de("creative",a)),e){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e.style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const E=le(0,a);E.style.transform=y,E.style.opacity=b,f.origin&&(E.style.transformOrigin=f.origin)}},setTransition:e=>{const s=t.slides.map((e=>m(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),oe({swiper:t,duration:e,transformElements:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),ne({effect:"cards",swiper:t,on:a,setTranslate:()=>
				{	const{slides:e,activeIndex:s,rtlTranslate:a}=t,i=t.params.cardsEffect,{startTranslate:r,isTouched:n}=t.touchEventsData,l=a?-t.translate:t.translate;for(let o=0;o<e.length;o+=1){const d=e[o],c=d.progress,p=Math.min(Math.max(c,-4),4);let u=d.swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&(t.wrapperEl.style.transform=`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(u-=e[0].swiperSlideOffset);let m=t.params.cssMode?-u-t.translate:-u,h=0;const f=-100*Math.abs(p);let g=1,v=-i.perSlideRotate*p,w=i.perSlideOffset-.75*Math.abs(p);const b=t.virtual&&t.params.virtual.enabled?t.virtual.from+o:o,y=(b===s||b===s-1)&&p>0&&p<1&&(n||t.params.cssMode)&&l<r,E=(b===s||b===s+1)&&p<0&&p>-1&&(n||t.params.cssMode)&&l>r;if(y||E){const e=(1-Math.abs((Math.abs(p)-.5)/.5))**.5;v+=-28*p*e,g+=-.5*e,w+=96*e,h=-25*e*Math.abs(p)+"%"}if(m=p<0?`calc(${m}px ${a?"-":"+"} (${w*Math.abs(p)}%))`:p>0?`calc(${m}px ${a?"-":"+"} (-${w*Math.abs(p)}%))`:`${m}px`,!t.isHorizontal()){const e=h;h=m,m=e}const x=p<0?""+(1+(1-g)*p):""+(1-(1-g)*p),S=`\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate?a?-v:v:0}deg)\n        scale(${x})\n      `;
				
				if(i.slideShadows)
				{	let e=d.querySelector(".swiper-slide-shadow");
					e || (e=de("cards",d)), e && (e.style.opacity=Math.min(Math.max((Math.abs(p)-.5)/.5,0),1))
				}

				d.style.zIndex=-Math.abs(Math.round(c))+e.length;
				le(0,d).style.transform=S
			}},setTransition:e=>
			{	const s=t.slides.map((e=>m(e)));
				s.forEach((t=>
				{	t.style.transitionDuration=`${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))
				})),oe({swiper:t,duration:e,transformElements:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return Q.use(ce),Q}();

/* === @slideract - Activador de sliders - de ayonix === */

function axslideract(classname,tim,classlazo,navefec)
{	if(tim==undefined || tim=='' || tim==0)
	{	tim=80000; 	//Por defecto tiempo largo
	}
	
	//NAVEGACION CON PUNTOS DISOLVENTES
	if(navefec==undefined || navefec=='' || navefec==false)
	{	desva=false;	}
	else
	{	desva=true;	}

	switch(classname)
	{	case'axslidermin':
			var swiper = new Swiper(".axslidermin",
			{	pagination:{el:".swiper-pagination", clickable:true, dynamicBullets:desva},
				navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
				autoplay:{delay:tim, disableOnInteraction:false,},
			});
		break;
		case'axslidecards':
			var swiper = new Swiper(".axslidecards",
			{	effect:"cards",grabCursor:true,
			});
		break;

		case'axsliderajus':
			var swiper = new Swiper(".axsliderajus",
			{	spaceBetween:0,
				centeredSlides:true,
				autoplay:{delay:tim, disableOnInteraction:false,},
				pagination:{el:".swiper-pagination",clickable:true},
				navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
			});
		break;
		case'axslidecua':
			var swiper = new Swiper(".axslidecua",
			{	loop:false,
				spaceBetween:10,
				slidesPerView:4,
				freeMode:true,
				watchSlidesProgress:true
			});
		break;
		case'axslidever':
			var swiper = new Swiper(".axslidever",
			{	direction:"vertical",
				pagination:{el:".swiper-pagination",clickable:true},
				autoplay:{delay:tim, disableOnInteraction:false,},
				navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
			});
		break;

		case 'axslidepost':
			var swiper = new Swiper('.axslidepost', 
			{	slidesPerView:3,
				centeredSlides: true,
				spaceBetween:20,
				navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'}
			});
		break;
	}

	if(classlazo!=undefined)
	{	var swiper2 = new Swiper(`.${classlazo}`,
		{	loop:true,  spaceBetween:0, navigation:{nextEl:".swiper-button-next", prevEl:".swiper-button-prev",},
			thumbs:{swiper:swiper}
		});
	}
}

//@axmry
function axmryset(key,vlr)
{	switch(typeof vlr)
	{	case "string":		
			//console.log('Es string');	
			localStorage.setItem(key,JSON.stringify({type:'str',vlr:vlr}));		
		break;
		case "number":		
			//console.log('Es numero');	
			localStorage.setItem(key,JSON.stringify({type:'int',vlr:vlr}));		
		break;
		case "boolean": 	
			//console.log('Es Booleano');
			localStorage.setItem(key,JSON.stringify({type:'bol',vlr:vlr}));			
		break;
		case "object":		
			//console.log('Es objeto');	
			localStorage.setItem(key,JSON.stringify({type:'obj',vlr:vlr}));		
		break;
		case "function": 	
			//console.log('Es funcion');
			localStorage.setItem(key,JSON.stringify({type:'fuc',vlr:vlr}));				
		break;
		case "undefined":	console.log('No definido no se guardo nada'); 	break;
		default: 			console.log('Desconocido no se guardo nada'); 	break;
	}
}

function axmryget(key)
{	let tmp;
	tmp=JSON.parse(localStorage.getItem(key));
	switch(tmp.type)
	{	case "str":
			vlr=tmp.vlr;
			//console.log('Es string',vlr);
		break;
		case "int":
			vlr=tmp.vlr;
			//console.log('Es numero',vlr);
		break;
		case "bol":
			vlr=tmp.vlr;
			//console.log('Es Booleano',vlr);
		break;
		case "obj":
			vlr=tmp.vlr;
			//console.log('Es objeto',vlr);
		break;
		case "fuc":
			vlr=tmp.vlr;
			//console.log('Es funcion',vlr);
		break;
		case "undefined":
			vlr=0;
			//console.log('No definido');
		break;
		default:
			vlr=0;
			//console.log('Desconocido');
		break;
	}
	return vlr;
}

/* === @axventimg - AMPLIADOR DE IMAGENES === */

window.requestAnimFrame=(function()
{	return(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||	function(callback){window.setTimeout(callback, 1000 / 60);}	);
})();

window.cancelRequestAnimFrame=(function()
{	return (
	window.cancelAnimationFrame ||
	window.webkitCancelRequestAnimationFrame ||
	window.mozCancelRequestAnimationFrame ||
	window.oCancelRequestAnimationFrame ||
	window.msCancelRequestAnimationFrame ||
	clearTimeout
	);
})();

var axventimg = (function()
{	"use strict";
	var KEYCODE_ESC = 27;
	var mouse={xCurr:0, yCurr:0, xDest:0, yDest:0};
	var horizontalOrientation = true;
	var invertInteractionDirection = false;
	var looper;
	var image;
	var lastPosition,currentPosition = 0;
	var sourceDimensions, target;
	var targetDimensions = { w: 0, h: 0 };
	var container;
	var containerDimensions = { w: 0, h: 0 };
	var overflowArea = { x: 0, y: 0 };
	var overflowValue;
	var active = false;

	function extend(target,source)
	{	for (var key in source) if (!(key in target)) target[key] = source[key];
		return target;
	}

	function applyProperties(target,properties)
	{	for(var key in properties)
		{	target.style[key]=properties[key];	}
	}

	function getFit(source)
	{	var heightRatio = window.innerHeight / source.h;
		if (source.w * heightRatio > window.innerWidth)
		{	return {w: source.w * heightRatio,h: source.h * heightRatio,fit: true};
		}
		else
		{	var widthRatio = window.innerWidth / source.w;
			return { w: source.w * widthRatio, h: source.h * widthRatio, fit: false };
		}
	}

	function startTracking(passedElements)
	{	var i;
		if (passedElements.length)
		{	// Loop and assign
			for (i = 0; i < passedElements.length; i++)
			{	track(passedElements[i]);	}
		}
		else
		{	track(passedElements);	}
	}

	//CUANDO SE HAGA CLIC EN EL ELEMENTO
	function track(element)
	{	if(element.getAttribute("data-image") || element.src || element.href)
		{	element.addEventListener("click",
			function(e)
			{	if (element.tagName === "A")
				{	e.preventDefault();	}

				if(!active)
				{	init(this);	}
			},false);
		}
	}

	function start()
	{	loop();	}

	function stop()
	{	cancelRequestAnimFrame(looper);	}

	function loop()
	{	looper = requestAnimFrame(loop);
		positionTarget();
	}

	// Lock scroll on the document body.
	function lockBody()
	{	overflowValue = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	}

	// Unlock scroll on the document body.
	function unlockBody()
	{	document.body.style.overflow = overflowValue;
	}

	function setState(element,newClassName)
	{	if(element)
		{	element.className = element.className.replace("intense--loading", "");
			element.className = element.className.replace("intense--viewing", "");
			element.className += " " + newClassName;
		}
		else
		{	// Remove element with class .view
			var elems=document.querySelectorAll(".intense--viewing");
			[].forEach.call(elems,function(el)
			{	el.className = el.className.replace("intense--viewing", "").trim();
			});
		}
	}

	function createViewer(title,caption)
	{	var containerProperties=
		{	backgroundColor: "rgba(0,0,0,0.8)",
			width: "100%",height:"100%",position:"fixed",top:"0px",left:"0px",
			overflow: "hidden",zIndex:"999999",margin:"0px",
			webkitTransition:"opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
			MozTransition: "opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
			transition: "opacity 150ms cubic-bezier( 0, 0, .26, 1 )",
			webkitBackfaceVisibility: "hidden",opacity:"1"
		};
		container=document.createElement("figure");
		container.appendChild(target);
		applyProperties(container,containerProperties);

		var imageProperties={cursor:'zoom-out'};

		applyProperties(target,imageProperties);

		//Caption Container
		var captionContainerProperties=
		{	fontFamily: 'Georgia, Times, "Times New Roman", serif',
			position: "fixed",bottom: "0px",left: "0px",
			padding: "20px",color: "#fff",wordSpacing:"0.2px",
			webkitFontSmoothing: "antialiased",
			textShadow:"-1px 0px 1px rgba(0,0,0,0.4)"
		};
		var captionContainer=document.createElement("figcaption");
		applyProperties(captionContainer,captionContainerProperties);

		//LO QUE SE CON LA IMAGEN
		if(title)
		{	var captionTitleProperties=
			{	margin:"0px",padding:"0px",
				fontWeight:"normal",fontSize:"40px",fontFamily:"var(--tex)",
				letterSpacing:"0.5px",lineHeight:"35px",
				textAlign: "left",color:"var(--colpri)",textShadow:"0px 0px 5px var(--colsec),0px 0px 10px var(--colsec)"
			};
			var captionTitle=document.createElement("h1");
			applyProperties(captionTitle, captionTitleProperties);
			captionTitle.innerHTML=title;
			captionContainer.appendChild(captionTitle);
		}

		if(caption)
		{	var captionTextProperties=
			{	margin:"0px",padding:"0px",fontWeight:"normal",
				fontSize:"20px",letterSpacing:"0.1px",
				maxWidth:"auto",textAlign:"left",
				background:"none",marginTop:"5px"
			};
			var captionText=document.createElement("h2");
			applyProperties(captionText,captionTextProperties);
			captionText.innerHTML=caption;
			captionContainer.appendChild(captionText);
		}

		container.appendChild(captionContainer);

		setDimensions();

		mouse.xCurr=mouse.xDest=window.innerWidth / 2;
		mouse.yCurr=mouse.yDest=window.innerHeight / 2;
		document.body.appendChild(container);
	}

	function removeViewer()
	{	unlockBody();
		unbindEvents();
		stop();
		document.body.removeChild(container);
		active = false;
		setState(false);
	}

	function setDimensions()
	{	// Manually set height to stop bug where
		var imageDimensions = getFit(sourceDimensions);
		target.width = imageDimensions.w;
		target.height = imageDimensions.h;
		horizontalOrientation = imageDimensions.fit;
		targetDimensions = { w: target.width, h: target.height };
		containerDimensions = { w: window.innerWidth, h: window.innerHeight };
		overflowArea=
		{	x: containerDimensions.w - targetDimensions.w,
			y: containerDimensions.h - targetDimensions.h
		};
	}

	function init(element)
	{	setState(element,"intense--loading");
		var imageSource=element.getAttribute("data-image") || element.src || element.href;
		var title = element.getAttribute("data-title") || element.title;
		var caption = element.getAttribute("data-caption");

		// Clear old onload message
		if(image)
		{	image.onload=null;	}

		image = new Image();
		image.onload = function()
		{	sourceDimensions={w:image.width, h:image.height};
			target = this;
			createViewer(title, caption);
			lockBody();
			bindEvents();
			loop();
			setState(element, "intense--viewing");
		};

		image.src=imageSource;
	}

	function bindEvents()
	{	container.addEventListener("mousemove", onMouseMove, false);
		container.addEventListener("touchmove", onTouchMove, false);
		window.addEventListener("resize", setDimensions, false);
		window.addEventListener("keyup", onKeyUp, false);
		target.addEventListener("click", removeViewer, false);
	}

	function unbindEvents()
	{	container.removeEventListener("mousemove", onMouseMove, false);
		container.removeEventListener("touchmove", onTouchMove, false);
		window.removeEventListener("resize", setDimensions, false);
		window.removeEventListener("keyup", onKeyUp, false);
		target.removeEventListener("click", removeViewer, false);
	}

	function onMouseMove(event)
	{	mouse.xDest = event.clientX;
		mouse.yDest = event.clientY;
	}

	function onTouchMove(event)
	{	event.preventDefault(); // Needed to keep this event firing.
		mouse.xDest = window.innerWidth - event.touches[0].clientX;
		mouse.yDest = window.innerHeight - event.touches[0].clientY;
	}

	// Exit on excape key pressed;
	function onKeyUp(event)
	{	event.preventDefault();
		if(event.keyCode===KEYCODE_ESC)
		{	removeViewer();	}
	}

	function positionTarget()
	{	mouse.xCurr += (mouse.xDest - mouse.xCurr) * 0.05;
		mouse.yCurr += (mouse.yDest - mouse.yCurr) * 0.05;

	if(horizontalOrientation===true)
	{	// HORIZONTAL SCANNING
		currentPosition += mouse.xCurr - currentPosition;
		if (mouse.xCurr !== lastPosition)
		{	var position=parseFloat(calcPosition(currentPosition, containerDimensions.w));
			position = overflowArea.x * position;
			target.style["webkitTransform"] = "translate(" + position + "px, 0px)";
			target.style["MozTransform"] = "translate(" + position + "px, 0px)";
			target.style["msTransform"] = "translate(" + position + "px, 0px)";
			lastPosition = mouse.xCurr;
		}
		}else
		{	if(horizontalOrientation===false)
			{	// VERTICAL SCANNING
				currentPosition += mouse.yCurr - currentPosition;
				if (mouse.yCurr !== lastPosition) {
				var position = parseFloat(
				calcPosition(currentPosition, containerDimensions.h)
				);
				position = overflowArea.y * position;
				target.style["webkitTransform"] = "translate( 0px, " + position + "px)";
				target.style["MozTransform"] = "translate( 0px, " + position + "px)";
				target.style["msTransform"] = "translate( 0px, " + position + "px)";
				lastPosition = mouse.yCurr;
				}
			}
		}

		function calcPosition(current,total)
		{	return invertInteractionDirection?(total - current) / total:current / total;
		}
	}

	function config(options)
	{	if("invertInteractionDirection" in options)
		invertInteractionDirection = options.invertInteractionDirection;
	}

	function main(element, configOptions)
	{	// Parse arguments
		if (!element)
		{	throw "You need to pass an element!";}

		// If they have a config, use it!
		if(configOptions)
		{	config(configOptions);	}

		startTracking(element);
	}

	return extend(main,
	{	resize:setDimensions,start:start,
		stop:stop,config:config
	});
})();

if(typeof module !== "undefined" && module.exports)
{	module.exports = axventimg;	}


// === @lib - LIBRERIA  Highcharts THEME ===

Highcharts.theme=
{	//COLORES QUE SE USARAN PARA LA GRAFICA
	colors: [colpri,colter,colok,colblk,colwar,colfoc, "#ff0066", "#eeaaee","#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart:
	{	backgroundColor:
		{	linearGradient:{x1:0,y1:0,x2:1,y2:1},
			stops:
			[	[0,colsec], /*COLOR DE FONDO DEGRADE 1*/
				[1,colsec],	/*COLOR DE FONDO DEGRADE 2*/
			]
		},
		style:{fontFamily:tex},
		plotBorderColor:'orange'
	},
	title:{style:
	{	color:colpri, 	/*COLOR DE TITULO*/
		textTransform:'uppercase',fontSize:'20px'}
	},
	subtitle:{style:{color:colter,textTransform:'uppercase'}
	},
	xAxis:
	{	gridLineColor:colter,labels:{style:{color:colok}},
		lineColor: colwar, /*LINEA BASE X*/
		minorGridLineColor:colfoc,
		tickColor:colok, /* LINEA BASE X SECMENTOS */
		title:{style:{color:colter}}
	},
	yAxis:
	{	gridLineColor:colter, /* LINEAS DE FONDO */
		labels:
		{	style:
			{	color: 'white' /* TEXTO DE CADA LINEA */
			}
		},
		lineColor:'#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title:
		{	style:
			{	color:colter  /*COLOR DE LEYENDA DE EJE*/
			}
		}
	},
	//COLORES DEL CUADRITO DE INFORMACION
	tooltip:{backgroundColor:colsec,style:{color:colter}},
	plotOptions:
	{	series:
		{dataLabels:
			{	color:colter  /* TEXTO EN TORTA DE CADA TROSO */
			},
			marker:{lineColor:'#333'}
		},
		boxplot:{fillColor:'red'},
		candlestick:{lineColor:'white'},
		errorbar:{color:'white'}
	},
	//LEYENDA DE ABAJO CON HOVER
	legend:{itemStyle:{color:colter},itemHoverStyle:{color:colpri},itemHiddenStyle:{color:colblk}},

	credits:{style:{color:colwar}},
	labels:{style:{color:colfoc}},
	drilldown:{activeAxisLabelStyle:{color:'#F0F0F3'},activeDataLabelStyle:{color:'#F0F0F3'}
	},
	navigation:{buttonOptions:{symbolStroke:'#DDDDDD',theme:{fill:'#505053'}}},
	// scroll charts
	rangeSelector:
	{	buttonTheme:{fill:'#505053',stroke:'#000000',style:{color:'#CCC'},
			states:{
				hover:{
					fill: '#707073',
					stroke: '#000000',
					style:{color:'red'}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'red'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: 'red',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator:
	{	handles:{backgroundColor:'#666',borderColor:'#AAA'},
		outlineColor:'#CCC',
		maskFill:'rgba(255,255,255,0.1)',
		series:{color:'#7798BF',lineColor:'#A6C7ED'},
		xAxis:{gridLineColor:'#505053'}
	},

	scrollbar:
	{	barBackgroundColor:'#808083',
		barBorderColor:'#808083',
		buttonArrowColor:'#CCC',
		buttonBackgroundColor:'#606063',
		buttonBorderColor:'#606063',
		rifleColor:'#FFF',
		trackBackgroundColor:'#404043',
		trackBorderColor:'#404043'
	},

	// special colors for some of the
	legendBackgroundColor:'rgba(0, 0, 0, 0.5)',
	background2:'#505053',
	dataLabelsColor:'#B0B0B3',
	textColor:'#C0C0C0',
	contrastTextColor:'#F0F0F3',
	maskColor:'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);


/* @lib Libreria para mensajes de alerta */
!function(e,t)
{	"object"==typeof exports && "undefined" != typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).ayonix=t();
}

(this,function()
{	"use strict";
	const u=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),t="ayonix:",o=e=>e.charAt(0).toUpperCase()+e.slice(1),s=e=>Array.prototype.slice.call(e),a=e=>{console.warn("".concat(t," ").concat("object"==typeof e?e.join(" "):e))},r=e=>{console.error("".concat(t," ").concat(e))},n=[],i=(e,t)=>{t='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),n.includes(t)||(n.push(t),a(t))},d=e=>"function"==typeof e?e():e,c=e=>e&&"function"==typeof e.toPromise,l=e=>c(e)?e.toPromise():Promise.resolve(e),p=e=>e&&Promise.resolve(e)===e,m=e=>"object"==typeof e&&e.jquery,g=e=>e instanceof Element||m(e);
	var e=e=>
	{	const t={};
		for(const n in e)t[e[n]]="swal2-"+e[n];
		return t
	};

	const h=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),f=e(["success","warning","info","question","error"]),b=()=>document.body.querySelector(".".concat(h.container)),y=e=>{const t=b();
	return t?t.querySelector(e):null},v=e=>y(".".concat(e)),w=()=>v(h.popup),C=()=>v(h.icon),k=()=>v(h.title),A=()=>v(h["html-container"]),P=()=>v(h.image),B=()=>v(h["progress-steps"]),x=()=>v(h["validation-message"]),E=()=>y(".".concat(h.actions," .").concat(h.confirm)),S=()=>y(".".concat(h.actions," .").concat(h.deny));const T=()=>y(".".concat(h.loader)),L=()=>y(".".concat(h.actions," .").concat(h.cancel)),O=()=>v(h.actions),j=()=>v(h.footer),D=()=>v(h["timer-progress-bar"]),M=()=>v(h.close),I=()=>{const e=s(w().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>(e=parseInt(e.getAttribute("tabindex")),(t=parseInt(t.getAttribute("tabindex")))<e?1:e<t?-1:0));
	var t=s(w().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));
	return(t=>
	{	const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);
		return n
	})(e.concat(t)).filter(e=>ee(e))},H=()=>!q()&&!document.body.classList.contains(h["no-backdrop"]),q=()=>document.body.classList.contains(h["toast-shown"]);

	function V(e)
	{	var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];
		const n=D();
		ee(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>
		{	n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))
	}

	const N={previousBodyPadding:null},U=(t,e)=>
	{	if(t.textContent="",e)
		{	const n=new DOMParser,o=n.parseFromString(e,"text/html");
			s(o.querySelector("head").childNodes).forEach(e=>
			{	t.appendChild(e);
			}),s(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})
		}
	},F=(t,e)=>
	{	if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)
		if(!t.classList.contains(n[e]))return!1;
		return!0
	},R=(e,t,n)=>
	{	var o,i;if(o=e,i=t,s(o.classList).forEach(e=>
		{	Object.values(h).includes(e)||Object.values(f).includes(e)||Object.values(i.showClass).includes(e)||o.classList.remove(e)
		}),t.customClass&&t.customClass[n])
		{	if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return a("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));
			K(e,t.customClass[n])
		}
	},z=(e,t)=>
	{	if(!t)return null;
		switch(t)
		{	case"select":case"textarea":case"file":return Z(e,h[t]);
			case"checkbox":return e.querySelector(".".concat(h.checkbox," input"));
			case"radio":return e.querySelector(".".concat(h.radio," input:checked"))||e.querySelector(".".concat(h.radio," input:first-child"));
			case"range":return e.querySelector(".".concat(h.range," input"));
			default:return Z(e,h.input)
		}
	},W=e=>
	{	var t;
		e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},_=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{e.forEach?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},K=(e,t)=>{_(e,t,!0)},Y=(e,t)=>{_(e,t,!1)},Z=(t,n)=>{for(let e=0;e<t.childNodes.length;e++)if(F(t.childNodes[e],n))return t.childNodes[e]},J=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},X=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},$=e=>{e.style.display="none"},G=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},Q=(e,t,n)=>{t?X(e,n):$(e)},ee=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),te=()=>!ee(E())&&!ee(S())&&!ee(L()),ne=e=>!!(e.scrollHeight>e.clientHeight),oe=e=>{const t=window.getComputedStyle(e);var n=parseFloat(t.getPropertyValue("animation-duration")||"0"),e=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<n||0<e},ie=()=>"undefined"==typeof window||"undefined"==typeof document,se='\n <div aria-labelledby="'.concat(h.title,'" aria-describedby="').concat(h["html-container"],'" class="').concat(h.popup,'" tabindex="-1">\n   <button type="button" class="').concat(h.close,'"></button>\n   <ul class="').concat(h["progress-steps"],'"></ul>\n   <div class="').concat(h.icon,'"></div>\n   <img class="').concat(h.image,'" />\n   <h2 class="').concat(h.title,'" id="').concat(h.title,'"></h2>\n   <div class="').concat(h["html-container"],'" id="').concat(h["html-container"],'"></div>\n   <input class="').concat(h.input,'" />\n   <input type="file" class="').concat(h.file,'" />\n   <div class="').concat(h.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(h.select,'"></select>\n   <div class="').concat(h.radio,'"></div>\n   <label for="').concat(h.checkbox,'" class="').concat(h.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(h.label,'"></span>\n   </label>\n   <textarea class="').concat(h.textarea,'"></textarea>\n   <div class="').concat(h["validation-message"],'" id="').concat(h["validation-message"],'"></div>\n   <div class="').concat(h.actions,'">\n     <div class="').concat(h.loader,'"></div>\n     <button type="button" class="').concat(h.confirm,'"></button>\n     <button type="button" class="').concat(h.deny,'"></button>\n     <button type="button" class="').concat(h.cancel,'"></button>\n   </div>\n   <div class="').concat(h.footer,'"></div>\n   <div class="').concat(h["timer-progress-bar-container"],'">\n     <div class="').concat(h["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),ae=()=>{on.isVisible()&&on.resetValidationMessage()},re=e=>{var t=(()=>{const e=b();return!!e&&(e.remove(),Y([document.documentElement,document.body],[h["no-backdrop"],h["toast-shown"],h["has-column"]]),!0)})();if(ie())r("ayonix requires document to initialize");else{const n=document.createElement("div");n.className=h.container,t&&K(n,h["no-transition"]),U(n,se);const o="string"==typeof(t=e.target)?document.querySelector(t):t;o.appendChild(n),(e=>{const t=w();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")})(e),e=o,"rtl"===window.getComputedStyle(e).direction&&K(b(),h.rtl),(()=>{const e=w(),t=Z(e,h.input),n=Z(e,h.file),o=e.querySelector(".".concat(h.range," input")),i=e.querySelector(".".concat(h.range," output")),s=Z(e,h.select),a=e.querySelector(".".concat(h.checkbox," input")),r=Z(e,h.textarea);t.oninput=ae,n.onchange=ae,s.onchange=ae,a.onchange=ae,r.oninput=ae,o.oninput=()=>{ae(),i.value=o.value},o.onchange=()=>{ae(),o.nextSibling.value=o.value}})()}},ce=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):"object"==typeof e?((e,t)=>{if(e.jquery)le(t,e);else U(t,e.toString())})(e,t):e&&U(t,e)},le=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},ue=(()=>{if(ie())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),de=(e,t)=>{var n,o,i,s,a,r=O(),c=T();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?X:$)(r),R(r,t,"actions"),n=r,o=c,i=t,s=E(),a=S(),r=L(),pe(s,"confirm",i),pe(a,"deny",i),pe(r,"cancel",i),function(e,t,n,o){if(!o.buttonsStyling)return Y([e,t,n],h.styled);K([e,t,n],h.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,K(e,h["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,K(t,h["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,K(n,h["default-outline"]))}(s,a,r,i),i.reverseButtons&&(i.toast?(n.insertBefore(r,s),n.insertBefore(a,s)):(n.insertBefore(r,o),n.insertBefore(a,o),n.insertBefore(s,o))),U(c,t.loaderHtml),R(c,t,"loader")};function pe(e,t,n){Q(e,n["show".concat(o(t),"Button")],"inline-block"),U(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=h[t],R(e,n,"".concat(t,"Button")),K(e,n["".concat(t,"ButtonClass")])}const me=(e,t)=>{var n,o,i=b();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||K([document.documentElement,document.body],h["no-backdrop"]),o=i,(n=t.position)in h?K(o,h[n]):(a('The "position" parameter is not valid, defaulting to "center"'),K(o,h.center)),n=i,!(o=t.grow)||"string"!=typeof o||(o="grow-".concat(o))in h&&K(n,h[o]),R(i,t,"container"))};var ge={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const he=["input","file","range","select","radio","checkbox","textarea"],fe=(e,o)=>{const i=w();e=ge.innerParams.get(e);const s=!e||o.input!==e.input;he.forEach(e=>{var t=h[e];const n=Z(i,t);((e,t)=>{const n=z(w(),e);if(n){be(n);for(const o in t)n.setAttribute(o,t[o])}})(e,o.inputAttributes),n.className=t,s&&$(n)}),o.input&&(s&&(e=>{if(!Ce[e.input])return r('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=we(e.input),n=Ce[e.input](t,e);X(n),setTimeout(()=>{W(n)})})(o),(e=>{const t=we(e.input);if(e.customClass)K(t,e.customClass.input)})(o))},be=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},ye=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},ve=(e,t,n)=>{if(n.inputLabel){e.id=h.input;const i=document.createElement("label");var o=h["input-label"];i.setAttribute("for",e.id),i.className=o,K(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},we=e=>{e=h[e]||h.input;return Z(w(),e)},Ce={};Ce.text=Ce.email=Ce.password=Ce.number=Ce.tel=Ce.url=(e,t)=>("string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:p(t.inputValue)||a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t.inputValue,'"')),ve(e,e,t),ye(e,t),e.type=t.input,e),Ce.file=(e,t)=>(ve(e,e,t),ye(e,t),e),Ce.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,ve(n,e,t),e},Ce.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");U(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return ve(e,e,t),e},Ce.radio=e=>(e.textContent="",e),Ce.checkbox=(e,t)=>{const n=z(w(),"checkbox");n.value=1,n.id=h.checkbox,n.checked=Boolean(t.inputValue);var o=e.querySelector("span");return U(o,t.inputPlaceholder),e},Ce.textarea=(n,e)=>{n.value=e.inputValue,ye(n,e),ve(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(w()).width);new MutationObserver(()=>{var e,e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?w().style.width="".concat(e,"px"):w().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n};const ke=(e,t)=>{const n=A();R(n,t,"htmlContainer"),t.html?(ce(t.html,n),X(n,"block")):t.text?(n.textContent=t.text,X(n,"block")):$(n),fe(e,t)},Ae=(e,t)=>{var n=j();Q(n,t.footer),t.footer&&ce(t.footer,n),R(n,t,"footer")},Pe=(e,t)=>{const n=M();U(n,t.closeButtonHtml),R(n,t,"closeButton"),Q(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},Be=(e,t)=>{var n=ge.innerParams.get(e),e=C();return n&&t.icon===n.icon?(Se(e,t),void xe(e,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(f).indexOf(t.icon)?(r('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),$(e)):(X(e),Se(e,t),xe(e,t),void K(e,t.showClass.icon)):$(e)},xe=(e,t)=>{for(const n in f)t.icon!==n&&Y(e,f[n]);K(e,f[t.icon]),Te(e,t),Ee(),R(e,t,"icon")},Ee=()=>{const e=w();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Se=(e,t)=>{var n;e.textContent="",t.iconHtml?U(e,Le(t.iconHtml)):"success"===t.icon?U(e,'\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '):"error"===t.icon?U(e,'\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '):(n={question:"?",warning:"!",info:"i"},U(e,Le(n[t.icon])))},Te=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])G(e,n,"backgroundColor",t.iconColor);G(e,".swal2-success-ring","borderColor",t.iconColor)}},Le=e=>'<div class="'.concat(h["icon-content"],'">').concat(e,"</div>"),Oe=(e,t)=>{const n=P();if(!t.imageUrl)return $(n);X(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),J(n,"width",t.imageWidth),J(n,"height",t.imageHeight),n.className=h.image,R(n,t,"image")},je=(e,o)=>{const i=B();if(!o.progressSteps||0===o.progressSteps.length)return $(i);X(i),i.textContent="",o.currentProgressStep>=o.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach((e,t)=>{var n,e=(n=e,e=document.createElement("li"),K(e,h["progress-step"]),U(e,n),e);i.appendChild(e),t===o.currentProgressStep&&K(e,h["active-progress-step"]),t!==o.progressSteps.length-1&&(t=(e=>{const t=document.createElement("li");return K(t,h["progress-step-line"]),e.progressStepsDistance&&(t.style.width=e.progressStepsDistance),t})(o),i.appendChild(t))})},De=(e,t)=>{const n=k();Q(n,t.title||t.titleText,"block"),t.title&&ce(t.title,n),t.titleText&&(n.innerText=t.titleText),R(n,t,"title")},Me=(e,t)=>{var n=b();const o=w();t.toast?(J(n,"width",t.width),o.style.width="100%",o.insertBefore(T(),C())):J(o,"width",t.width),J(o,"padding",t.padding),t.background&&(o.style.background=t.background),$(x()),((e,t)=>{if(e.className="".concat(h.popup," ").concat(ee(e)?t.showClass.popup:""),t.toast){K([document.documentElement,document.body],h["toast-shown"]);K(e,h.toast)}else K(e,h.modal);if(R(e,t,"popup"),typeof t.customClass==="string")K(e,t.customClass);if(t.icon)K(e,h["icon-".concat(t.icon)])})(o,t)},Ie=(e,t)=>{Me(e,t),me(e,t),je(e,t),Be(e,t),Oe(e,t),De(e,t),Pe(e,t),ke(e,t),de(e,t),Ae(e,t),"function"==typeof t.didRender&&t.didRender(w())};const He=()=>E()&&E().click();

	const qe=e=>
	{	let t=w();
		t||on.msg(),t=w();
		var n=T();
		q()?$(C()):((e,t)=>
		{	const n=O(),o=T();
			if(!t&&ee(E()))
			t=E();
			if(X(n),t)
			{	$(t);
				o.setAttribute("data-button-to-replace",t.className)
			}
			o.parentNode.insertBefore(o,t),K([e,n],h.loading)
		})(t,e),X(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()
	},Ve=100,Ne={},Ue=()=>
	{	Ne.previousActiveElement&&Ne.previousActiveElement.focus?(Ne.previousActiveElement.focus(),Ne.previousActiveElement=null):document.body&&document.body.focus()
	},Fe=o=>new Promise(e=>
	{	if(!o)return e();
		var t=window.scrollX,n=window.scrollY;Ne.restoreFocusTimeout=setTimeout(()=>{Ue(),e()},Ve),window.scrollTo(t,n)
	});
	const Re=()=>
	{	if(Ne.timeout)return(()=>
		{	const e=D();
			var t=parseInt(window.getComputedStyle(e).width);
			e.style.removeProperty("transition"),e.style.width="100%";
			var n=parseInt(window.getComputedStyle(e).width),n=parseInt(t/n*100);
			e.style.removeProperty("transition"),e.style.width="".concat(n,"%")
		})(),Ne.timeout.stop()},ze=()=>
		{	if(Ne.timeout)
			{	var e=Ne.timeout.start();
				return V(e),e
			}
		};

		let We=!1;const _e={};
		const Ke=t=>
		{	for(let e=t.target;e&&e!==document;e=e.parentNode)
			for(const o in _e)
			{	var n=e.getAttribute(o);
				if(n)
				return
				void _e[o].msg({template:n})
			}
		},Ye={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},Ze=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],Je={},Xe=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],$e=e=>Object.prototype.hasOwnProperty.call(Ye,e);
		const Ge=e=>Je[e],Qe=e=>
		{	$e(e)||a('Unknown parameter "'.concat(e,'"'))
		},et=e=>
		{	Xe.includes(e)&&a('The parameter "'.concat(e,'" is incompatible with toasts'))},tt=e=>
			{	Ge(e)&&i(e,Ge(e))
			};
			var nt=Object.freeze({isValidParameter:$e,isUpdatableParameter:e=>-1!==Ze.indexOf(e),isDeprecatedParameter:Ge,argsToParams:n=>{const o={};return"object"!=typeof n[0]||g(n[0])?["title","html","icon"].forEach((e,t)=>
				{	t=n[t];
					"string"==typeof t||g(t)?o[e]=t:void 0!==t&&r("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>ee(w()),clickConfirm:He,clickDeny:()=>S()&&S().click(),clickCancel:()=>L()&&L().click(),getContainer:b,getPopup:w,getTitle:k,getHtmlContainer:A,getImage:P,getIcon:C,getInputLabel:()=>v(h["input-label"]),getCloseButton:M,getActions:O,getConfirmButton:E,getDenyButton:S,getCancelButton:L,getLoader:T,getFooter:j,getTimerProgressBar:D,getFocusableElements:I,getValidationMessage:x,isLoading:()=>w().hasAttribute("data-loading"),msg:function()
					{	for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)
						t[n]=arguments[n];
						return new this(...t)
					},mixin:function(n)
					{	class e extends this
						{	_main(e,t)
							{	return super._main(e,Object.assign({},n,t))
							}
						}
						return e
					},showLoading:qe,enableLoading:qe,getTimerLeft:()=>Ne.timeout&&Ne.timeout.getTimerLeft(),stopTimer:Re,resumeTimer:ze,toggleTimer:()=>
					{	var e=Ne.timeout;
						return e&&(e.running?Re:ze)()
					},increaseTimer:e=>
					{	if(Ne.timeout)
						{	e=Ne.timeout.increase(e);
							return V(e,!0),e
						}
					},isTimerRunning:()=>Ne.timeout&&Ne.timeout.isRunning(),bindClickHandler:function()
					{	var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-ax-template";
						_e[e]=this,We||(document.body.addEventListener("click",Ke),We=!0)
					}});function ot()
					{	var e=ge.innerParams.get(this);
						if(e)
						{	const t=ge.domCache.get(this);
							$(t.loader),q()?e.icon&&X(C()):(e=>
							{	const t=e.popup.getElementsByClassName(e.loader.getAttribute("data-button-to-replace"));
								if(t.length)X(t[0],"inline-block");
								else
								if(te())$(e.actions)
							})(t),Y([t.popup,t.actions],h.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.denyButton.disabled=!1,t.cancelButton.disabled=!1
						}
					}
					const it=()=>
					{	null===N.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(N.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(N.previousBodyPadding+(()=>
						{	const e=document.createElement("div");
							e.className=h["scrollbar-measure"],document.body.appendChild(e);
							var t=e.getBoundingClientRect().width-e.clientWidth;
							return document.body.removeChild(e),t
						})(),"px"))
					},st=()=>
					{	null!==N.previousBodyPadding&&(document.body.style.paddingRight="".concat(N.previousBodyPadding,"px"),N.previousBodyPadding=null)
					},at=()=>
					{	var e;
						(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!F(document.body,h.iosfix)&&(e=document.body.scrollTop,document.body.style.top="".concat(-1*e,"px"),K(document.body,h.iosfix),(()=>
						{	const e=b();
							let t;
							e.ontouchstart=e=>{t=rt(e)},e.ontouchmove=e=>
							{	if(t)
								{	e.preventDefault();
									e.stopPropagation()
								}
							}
						})(),(()=>
						{	const e=!navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);if(e){const t=44;if(w().scrollHeight>window.innerHeight-t)b().style.paddingBottom="".concat(t,"px")}})())},rt=e=>{var t,n=e.target,o=b();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(e=e).touches&&1<e.touches.length)&&(n===o||!(ne(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||ne(A())&&A().contains(n)))},ct=()=>{var e;F(document.body,h.iosfix)&&(e=parseInt(document.body.style.top,10),Y(document.body,h.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},lt=()=>{const e=s(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})};var ut={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};function dt(e,t,n,o){q()?ht(e,o):(Fe(n).then(()=>ht(e,o)),Ne.keydownTarget.removeEventListener("keydown",Ne.keydownHandler,{capture:Ne.keydownListenerCapture}),Ne.keydownHandlerAdded=!1),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),H()&&(st(),ct(),lt()),Y([document.documentElement,document.body],[h.shown,h["height-auto"],h["no-backdrop"],h["toast-shown"]])}function pt(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=ut.swalPromiseResolve.get(this);var n=(e=>{const t=w();if(!t)return false;const n=ge.innerParams.get(e);if(!n||F(t,n.hideClass.popup))return false;Y(t,n.showClass.popup),K(t,n.hideClass.popup);const o=b();return Y(o,n.showClass.backdrop),K(o,n.hideClass.backdrop),gt(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(mt(this),t(e)):n&&t(e)}const mt=e=>{e.isAwaitingPromise()&&(ge.awaitingPromise.delete(e),ge.innerParams.get(e)||e._destroy())},gt=(e,t,n)=>{var o,i,s,a=b(),r=ue&&oe(t);"function"==typeof n.willClose&&n.willClose(t),r?(o=e,i=t,s=a,r=n.returnFocus,t=n.didClose,Ne.swalCloseEventFinishedCallback=dt.bind(null,o,s,r,t),i.addEventListener(ue,function(e){e.target===i&&(Ne.swalCloseEventFinishedCallback(),delete Ne.swalCloseEventFinishedCallback)})):dt(e,a,n.returnFocus,n.didClose)},ht=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function ft(e,t,n){const o=ge.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function bt(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}class yt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date-this.started),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}var vt={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function wt(e){var t,n;(t=e).inputValidator||Object.keys(vt).forEach(e=>{t.input===e&&(t.inputValidator=vt[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&a("ayonix"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(a('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />")),re(e)}const Ct=["ax-title","ax-html","ax-footer"],kt=e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content;return(e=>{const n=Ct.concat(["ax-param","ax-button","ax-image","ax-icon","ax-input","ax-input-option"]);s(e.children).forEach(e=>{const t=e.tagName.toLowerCase();if(n.indexOf(t)===-1)a("Unrecognized element <".concat(t,">"))})})(e),Object.assign((e=>{const o={};return s(e.querySelectorAll("ax-param")).forEach(e=>{At(e,["name","value"]);const t=e.getAttribute("name");let n=e.getAttribute("value");if(typeof Ye[t]==="boolean"&&n==="false")n=false;if(typeof Ye[t]==="object")n=JSON.parse(n);o[t]=n}),o})(e),(e=>{const n={};return s(e.querySelectorAll("ax-button")).forEach(e=>{At(e,["type","color","aria-label"]);const t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML;n["show".concat(o(t),"Button")]=true;if(e.hasAttribute("color"))n["".concat(t,"ButtonColor")]=e.getAttribute("color");if(e.hasAttribute("aria-label"))n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label")}),n})(e),(e=>{const t={},n=e.querySelector("ax-image");if(n){At(n,["src","width","height","alt"]);if(n.hasAttribute("src"))t.imageUrl=n.getAttribute("src");if(n.hasAttribute("width"))t.imageWidth=n.getAttribute("width");if(n.hasAttribute("height"))t.imageHeight=n.getAttribute("height");if(n.hasAttribute("alt"))t.imageAlt=n.getAttribute("alt")}return t})(e),(e=>{const t={},n=e.querySelector("ax-icon");if(n){At(n,["type","color"]);if(n.hasAttribute("type"))t.icon=n.getAttribute("type");if(n.hasAttribute("color"))t.iconColor=n.getAttribute("color");t.iconHtml=n.innerHTML}return t})(e),(e=>{const o={},t=e.querySelector("ax-input");if(t){At(t,["type","label","placeholder","value"]);o.input=t.getAttribute("type")||"text";if(t.hasAttribute("label"))o.inputLabel=t.getAttribute("label");if(t.hasAttribute("placeholder"))o.inputPlaceholder=t.getAttribute("placeholder");if(t.hasAttribute("value"))o.inputValue=t.getAttribute("value")}const n=e.querySelectorAll("ax-input-option");if(n.length){o.inputOptions={};s(n).forEach(e=>{At(e,["value"]);const t=e.getAttribute("value");const n=e.innerHTML;o.inputOptions[t]=n})}return o})(e),((e,t)=>{const n={};for(const o in t){const i=t[o];const s=e.querySelector(i);if(s){At(s,[]);n[i.replace(/^ax-/,"")]=s.innerHTML.trim()}}return n})(e,Ct))},At=(t,n)=>{s(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&a(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})},Pt=10,Bt=e=>{const t=b(),n=w();"function"==typeof e.willOpen&&e.willOpen(n);var o=window.getComputedStyle(document.body).overflowY;((e,t,n)=>{if(K(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),X(t,"grid"),setTimeout(()=>{K(t,n.showClass.popup);t.style.removeProperty("opacity")},Pt),K([document.documentElement,document.body],h.shown),n.heightAuto&&n.backdrop&&!n.toast)K([document.documentElement,document.body],h["height-auto"])})(t,n,e),setTimeout(()=>{((e,t)=>{if(ue&&oe(t)){e.style.overflowY="hidden";t.addEventListener(ue,xt)}else e.style.overflowY="auto"})(t,n)},Pt),H()&&(((e,t,n)=>{if(at(),t&&n!=="hidden")it();setTimeout(()=>{e.scrollTop=0})})(t,e.scrollbarPadding,o),(()=>{const e=s(document.body.children);e.forEach(e=>{e===b()||e.contains(b())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})})()),q()||Ne.previousActiveElement||(Ne.previousActiveElement=document.activeElement),"function"==typeof e.didOpen&&setTimeout(()=>e.didOpen(n)),Y(t,h["no-transition"])},xt=e=>{const t=w();if(e.target===t){const n=b();t.removeEventListener(ue,xt),n.style.overflowY="auto"}},Et=(e,t)=>{"select"===t.input||"radio"===t.input?((t,n)=>{const o=w(),i=e=>Tt[n.input](o,Lt(e),n);if(c(n.inputOptions)||p(n.inputOptions)){qe(E());l(n.inputOptions).then(e=>{t.hideLoading();i(e)})}else if(typeof n.inputOptions==="object")i(n.inputOptions);else r("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))})(e,t):["text","email","number","tel","textarea"].includes(t.input)&&(c(t.inputValue)||p(t.inputValue))&&(qe(E()),((t,n)=>{const o=t.getInput();$(o),l(n.inputValue).then(e=>{o.value=n.input==="number"?parseFloat(e)||0:"".concat(e);X(o);o.focus();t.hideLoading()}).catch(e=>{r("Error in inputValue promise: ".concat(e));o.value="";X(o);o.focus();t.hideLoading()})})(e,t))},St=(e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o},Tt={select:(e,t,i)=>{const s=Z(e,h.select),a=(e,t,n)=>{const o=document.createElement("option");o.value=n,U(o,t),o.selected=Ot(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,s.appendChild(o),n.forEach(e=>a(o,e[1],e[0]))}else a(s,n,t)}),s.focus()},radio:(e,t,s)=>{const a=Z(e,h.radio);t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label");n.type="radio",n.name=h.radio,n.value=t,Ot(t,s.inputValue)&&(n.checked=!0);const i=document.createElement("span");U(i,e),i.className=h.label,o.appendChild(n),o.appendChild(i),a.appendChild(o)});const n=a.querySelectorAll("input");n.length&&n[0].focus()}},Lt=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Lt(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Lt(t)),o.push([e,t])}),o},Ot=(e,t)=>t&&t.toString()===e.toString(),jt=e=>{var t=ge.innerParams.get(e);e.disableButtons(),t.input?It(e,"confirm"):Ut(e,!0)},Dt=e=>{var t=ge.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?It(e,"deny"):qt(e,!1)},Mt=(e,t)=>{e.disableButtons(),t(u.cancel)},It=(e,t)=>{var n=ge.innerParams.get(e),o=St(e,n);n.inputValidator?Ht(e,o,t):e.getInput().checkValidity()?("deny"===t?qt:Ut)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Ht=(t,n,o)=>{const e=ge.innerParams.get(t);t.disableInput();const i=Promise.resolve().then(()=>l(e.inputValidator(n,e.validationMessage)));i.then(e=>{t.enableButtons(),t.enableInput(),e?t.showValidationMessage(e):("deny"===o?qt:Ut)(t,n)})},qt=(t,n)=>{const e=ge.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&qe(S()),e.preDeny){ge.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>l(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?t.hideLoading():t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Nt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},Vt=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},Nt=(e,t)=>{e.rejectPromise(t)},Ut=(t,n)=>{const e=ge.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&qe(),e.preConfirm){t.resetValidationMessage(),ge.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>l(e.preConfirm(n,e.validationMessage)));o.then(e=>{ee(x())||!1===e?t.hideLoading():Vt(t,void 0===e?n:e)}).catch(e=>Nt(t||void 0,e))}else Vt(t,n)},Ft=(t,e,n,o)=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1),n.toast||(e.keydownHandler=e=>((e,t,n)=>{const o=ge.innerParams.get(e);o&&(o.stopKeydownPropagation&&t.stopPropagation(),"Enter"===t.key?_t(e,t,o):"Tab"===t.key?Kt(t,o):[...zt,...Wt].includes(t.key)?Yt(t.key):"Escape"===t.key&&Zt(t,o,n))})(t,e,o),e.keydownTarget=n.keydownListenerCapture?window:w(),e.keydownListenerCapture=n.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0)},Rt=(e,t,n)=>{const o=I();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();w().focus()},zt=["ArrowRight","ArrowDown"],Wt=["ArrowLeft","ArrowUp"],_t=(e,t,n)=>{t.isComposing||t.target&&e.getInput()&&t.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(n.input)||(He(),t.preventDefault()))},Kt=(e,t)=>{var n=e.target,o=I();let i=-1;for(let e=0;e<o.length;e++)if(n===o[e]){i=e;break}e.shiftKey?Rt(0,i,-1):Rt(0,i,1),e.stopPropagation(),e.preventDefault()},Yt=e=>{const t=E(),n=S(),o=L();if([t,n,o].includes(document.activeElement)){e=zt.includes(e)?"nextElementSibling":"previousElementSibling";const i=document.activeElement[e];i&&i.focus()}},Zt=(e,t,n)=>{d(t.allowEscapeKey)&&(e.preventDefault(),n(u.esc))},Jt=(e,t,n)=>{var o,i,s,a,r,c,l;ge.innerParams.get(e).toast?(c=e,l=n,t.popup.onclick=()=>{var e=ge.innerParams.get(c);e.showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||e.timer||e.input||l(u.close)}):((r=t).popup.onmousedown=()=>{r.container.onmouseup=function(e){r.container.onmouseup=void 0,e.target===r.container&&(Xt=!0)}},(a=t).container.onmousedown=()=>{a.popup.onmouseup=function(e){a.popup.onmouseup=void 0,e.target!==a.popup&&!a.popup.contains(e.target)||(Xt=!0)}},o=e,s=n,(i=t).container.onclick=e=>{var t=ge.innerParams.get(o);Xt?Xt=!1:e.target===i.container&&d(t.allowOutsideClick)&&s(u.backdrop)})};let Xt=!1;const $t=(e,t,n)=>{var o=D();$(o),t.timer&&(e.timeout=new yt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(X(o),setTimeout(()=>{e.timeout&&e.timeout.running&&V(t.timer)})))},Gt=(e,t)=>{if(!t.toast)return d(t.allowEnterKey)?void(((e,t)=>{if(t.focusDeny&&ee(e.denyButton)){e.denyButton.focus();return true}if(t.focusCancel&&ee(e.cancelButton)){e.cancelButton.focus();return true}if(t.focusConfirm&&ee(e.confirmButton)){e.confirmButton.focus();return true}return false})(e,t)||Rt(0,-1,1)):(()=>{if(document.activeElement&&typeof document.activeElement.blur==="function")document.activeElement.blur()})()};const Qt=e=>{e.isAwaitingPromise()?(en(ge,e),ge.awaitingPromise.set(e,!0)):(en(ut,e),en(ge,e))},en=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:ot,disableLoading:ot,getInput:function(e){var t=ge.innerParams.get(e||this);return(e=ge.domCache.get(e||this))?z(e.popup,t.input):null},close:pt,isAwaitingPromise:function(){return!!ge.awaitingPromise.get(this)},rejectPromise:function(e){const t=ut.swalPromiseReject.get(this);mt(this),t&&t(e)},closePopup:pt,closeModal:pt,closeToast:pt,enableButtons:function(){ft(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){ft(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return bt(this.getInput(),!1)},disableInput:function(){return bt(this.getInput(),!0)},showValidationMessage:function(e){const t=ge.domCache.get(this);var n=ge.innerParams.get(this);U(t.validationMessage,e),t.validationMessage.className=h["validation-message"],n.customClass&&n.customClass.validationMessage&&K(t.validationMessage,n.customClass.validationMessage),X(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",h["validation-message"]),W(o),K(o,h.inputerror))},resetValidationMessage:function(){var e=ge.domCache.get(this);e.validationMessage&&$(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),Y(t,h.inputerror))},getProgressSteps:function(){return ge.domCache.get(this).progressSteps},_main:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};(e=>{!e.backdrop&&e.allowOutsideClick&&a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const t in e)Qe(t),e.toast&&et(t),tt(t)})(Object.assign({},t,e)),Ne.currentInstance&&(Ne.currentInstance._destroy(),H()&&lt()),Ne.currentInstance=this,wt(e=((e,t)=>{const n=kt(e),o=Object.assign({},Ye,t,n,e);return o.showClass=Object.assign({},Ye.showClass,o.showClass),o.hideClass=Object.assign({},Ye.hideClass,o.hideClass),o})(e,t)),Object.freeze(e),Ne.timeout&&(Ne.timeout.stop(),delete Ne.timeout),clearTimeout(Ne.restoreFocusTimeout);var o,i,s,t=(e=>{const t={popup:w(),container:b(),actions:O(),confirmButton:E(),denyButton:S(),cancelButton:L(),loader:T(),closeButton:M(),validationMessage:x(),progressSteps:B()};return ge.domCache.set(e,t),t})(this);return Ie(this,e),ge.innerParams.set(this,e),o=this,i=t,s=e,new Promise((e,t)=>{const n=e=>{o.closePopup({isDismissed:!0,dismiss:e})};ut.swalPromiseResolve.set(o,e),ut.swalPromiseReject.set(o,t),i.confirmButton.onclick=()=>jt(o),i.denyButton.onclick=()=>Dt(o),i.cancelButton.onclick=()=>Mt(o,n),i.closeButton.onclick=()=>n(u.close),Jt(o,i,n),Ft(o,Ne,s,n),Et(o,s),Bt(s),$t(Ne,s,n),Gt(i,s),setTimeout(()=>{i.container.scrollTop=0})})},update:function(t){var e=w(),n=ge.innerParams.get(this);if(!e||F(e,n.hideClass.popup))return a("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");const o={};Object.keys(t).forEach(e=>{on.isUpdatableParameter(e)?o[e]=t[e]:a('Invalid parameter to update: "'.concat(e,'ayonix'))}),n=Object.assign({},n,o),Ie(this,n),ge.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,t),writable:!1,enumerable:!0}})},_destroy:function(){var e=ge.domCache.get(this);const t=ge.innerParams.get(this);t?(e.popup&&Ne.swalCloseEventFinishedCallback&&(Ne.swalCloseEventFinishedCallback(),delete Ne.swalCloseEventFinishedCallback),Ne.deferDisposalTimer&&(clearTimeout(Ne.deferDisposalTimer),delete Ne.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,Qt(e),delete e.params,delete Ne.keydownHandler,delete Ne.keydownTarget,delete Ne.currentInstance):Qt(this)}});let tn;class nn{constructor(){if("undefined"!=typeof window){tn=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}});o=this._main(this.params);ge.promise.set(this,o)}}then(e){const t=ge.promise.get(this);return t.then(e)}finally(e){const t=ge.promise.get(this);return t.finally(e)}}Object.assign(nn.prototype,e),Object.assign(nn,nt),Object.keys(e).forEach(e=>{nn[e]=function(){if(tn)return tn[e](...arguments)}}),nn.DismissReason=u,nn.version="11.2.1";const on=nn;return on.default=on,on}),void 0!==this&&this.ayonix&&(this.ax=this.ayxmsg=this.ax=this.ayxmsg=this.ayonix);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");
if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)
	n.styleSheet.disabled||(n.styleSheet.cssText=t);
else
	try{n.innerHTML=t}
	catch(e)
	{n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 0}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 0;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");



function axmsg(msg)
{	ax.msg(
	{	title:msg,
		//text:msg,
		background:colsec,
		buttonsStyling:false,
		customClass:
		{	title:'axtitle',
			confirmButton:'axbotfrm'
		}
	})
}

function axmsgok(msg)
{	ax.msg(
	{	title:msg,
		//text:msg,
		background:colsec,
		iconColor:colok,
		icon:'success',
		buttonsStyling:false,
		customClass:
		{	title:'axtitle',
			confirmButton:'axbotfrm'
		}
	})
}

function axmsgwar(msg)
{	ax.msg(
	{	title:msg,
		//text:msg,
		background:colsec,
		iconColor:colwar,
		icon:'warning',
		buttonsStyling:false,
		customClass:
		{	title:'axtitle',
			confirmButton:'axbotfrm'
		}
	})
}

function axmsgerr(msg)
{	ax.msg(
	{	title:msg,
		//text:msg,
		background:colsec,

		iconColor:colwar,
		icon:'error',

		buttonsStyling:false,

		customClass:
		{	title:'axtitle',
			confirmButton:'axbotfrm'
		}
	})
}

function axmsgmin(msg,titu)
{	if(titu==undefined || titu==null){titu='';}
	ax.msg(
	{	title:titu,
		//text:'gatito 1',
		background:colsec,
		html:`<p class='axbody'  style="padding:0px;  margin:0px;">${msg}</p>`,
		//width:'90%',
		padding:'0px',
		buttonsStyling:false,
		toast:true,
		position:'bottom-end',
		timer:3000,
		timerProgressBar:false,
		customClass:
		{	title:'axtitle',
			confirmButton:'axbotfrm'
		}
	})
}

function axmsgsw(titu,msg)
{	const { value: text } = ax.msg(
	{	//=== VENTANA
		//width:'100%',
		//padding:'0px',
		//grow:'row', //'row' es como width 100%, 'column' es todo lo alto,  'fullscreen' 
		background:colsec,
		//backdrop:false,  //El fondo oscuro para motrar o no
		//timer:3000, 	//La ventana solo se mostrara 3 seg
		//timerProgressBar:true, //Para mostrar barra de tiempo de visualizacion de ventana
		//position:'bottom-end', //top, top-end, top-start, bottom, bottom-start, bottom-end, center
		allowOutsideClick:false, //Cerrar ventana con clic en backdrop?
		allowEscapeKey:false, 	//Cerrar la ventana con tecla ESC?
		allowEnterKey:false, 	//Cerrar ventana con tecla ENTER?
		stopKeydownPropagation:false,

		// VENTANA PEQUEÑA
		//toast:true, 	// ventana pequeña y icono se coloca a lado izquierdo

		//=== TEXTO 
		title:titu, 	//Al cual podemos aplicar stilos en el customClass
		//titleText:'Gatito', 
		//text:msg,
		html:`<p class='axbody'>${msg}</p>`, //REMPLAZA A text e inserta codigo html en el

		//=== ICONO
		icon:'warning', 	//success error warning info question
		iconColor:colwar,

		//=== IMAGEN
		imageUrl:'res/baka.png',
		imageWidth:'200px',
		imageHeight:'200px',
		imageAlt:'Iamgen bonita',

		//=== CAJA DE TEXTO
		input:'text', // 'text' 'textarea' 'select'
		//inputOptions:{lpz:'La Paz', cbb:'Cochabamba'}, 	//Solo para input:'select'
		inputLabel:'escribe abajo',
		inputPlaceholder:'Aqui choko',
		/*inputValidator:(value)=>
		{	return new Promise((resolve)=>
			{	if(value === 'stan')
				{	resolve();	}
				else
				{	resolve('debes escribir estan');	}
			})
		},*/
		inputAttributes:{'aria-label':'Type your message here'},
		

		//=== BOTON PEQUEÑO PARA CERRAR
		showCloseButton:true,
		closeButtonAriaLabel:'cerrar ventana',

		//=== BOTON CONFIRMAR
		showConfirmButton:true,
		//confirmButtonColor:colpri,
		confirmButtonText:'Claro que si',
		confirmButtonAriaLabel:'boton claro que si',

		//=== BOTON DE CANCELAR
		showCancelButton:true,
		//cancelButtonColor:colpri,
		cancelButtonText:'ya no',
		cancelButtonAriaLabel:'boton ya no',

		buttonsStyling:false, 	//Activar stylos por defecto

		//=== FOOTER
		footer:"<p class='axbody'>Hola</p>",

		//== CLASES PERSONALIZADAS A ELEMENTOS
		customClass:
		{	//popup:'axfrmmed', 	da una clase a todo el mensaje
			title:'axtitle',
			
			//header:'',
			//container:'',
			//footer:'',
			//icon:'',
			//image:'',
			//content:'',
			//input:'',
			//actions:'',
			confirmButton:'axbotmed',
			cancelButton:'axbotmed',
			//closeButton:''
		}
	})
	.then( (res)=>
	{	return res.value;
		//console.log(res.value);
	});

	/*
	if(text)
	{	ax.msg(text)
	}
	*/
}

function axmsgconfirm(msg)
{	return new Promise( (resolve,rej)=>
	{	ax.msg(
		{	background:colsec,
			title:msg,
			//=== BOTON CONFIRMAR
			showConfirmButton:true,
			confirmButtonText:'SI',
			confirmButtonAriaLabel:'Escoger si.',
			//=== BOTON DE CANCELAR
			showCancelButton:true,
			cancelButtonText:'NO',
			cancelButtonAriaLabel:'Escoger no',

			buttonsStyling:false, 	//Activar stylos por defecto
			//== CLASES PERSONALIZADAS A ELEMENTOS
			customClass:
			{	title:'axtitle',
				confirmButton:'axbotmed',
				cancelButton: 'axbotmed'
			}
		}).then((result)=>
		{	if(result.isConfirmed)
			{	resolve(true); 	//lo que devolvera
			}
			else
			{	resolve(false); 	//lo que devolvera
			}
		})
	});
}

/* === @lib - LIBRERIA DE DECIMALES === */

;(function (globalScope)
{	'use strict';
	var MAX_DIGITS = 1e9,                        // 0 to 1e9
	Decimal = 
	{	precision: 20,                         // 1 to MAX_DIGITS
		rounding: 4,                           // 0 to 8
		toExpNeg: -7,                          // 0 to -MAX_E
		toExpPos:  21,                         // 0 to MAX_E
		LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286'
	},
	external = true,
	decimalError = '[DecimalError] ',
	invalidArgument = decimalError + 'Invalid argument: ',
	exponentOutOfRange = decimalError + 'Exponent out of range: ',
	mathfloor = Math.floor,
	mathpow = Math.pow,
	isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	ONE,
	BASE = 1e7,
	LOG_BASE = 7,
	MAX_SAFE_INTEGER = 9007199254740991,
	MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE),    // 1286742750677284
	// Decimal.prototype object
	P = {};

	P.absoluteValue = P.abs = function ()
	{	var x = new this.constructor(this);
		if (x.s) x.s = 1;
		return x;
	};

	P.comparedTo = P.cmp = function (y)
	{	var i, j, xdL, ydL,
		x = this;
		y = new x.constructor(y);
		// Signs differ?
		if (x.s !== y.s) return x.s || -y.s;
		// Compare exponents.
		if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;
		xdL = x.d.length;
		ydL = y.d.length;
		// Compare digit by digit.
		for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i)
		{	if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
		}

	// Compare lengths.
	return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
  };

  P.decimalPlaces = P.dp = function () {
	var x = this,
	  w = x.d.length - 1,
	  dp = (w - x.e) * LOG_BASE;

	// Subtract the number of trailing zeros of the last word.
	w = x.d[w];
	if (w) for (; w % 10 == 0; w /= 10) dp--;

	return dp < 0 ? 0 : dp;
  };


  P.dividedBy = P.div = function (y) {
	return divide(this, new this.constructor(y));
  };


  P.dividedToIntegerBy = P.idiv = function (y) {
	var x = this,
	  Ctor = x.constructor;
	return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
  };


  P.equals = P.eq = function (y) {
	return !this.cmp(y);
  };

  P.exponent = function () {
	return getBase10Exponent(this);
  };

  P.greaterThan = P.gt = function (y) {
	return this.cmp(y) > 0;
  };

  P.greaterThanOrEqualTo = P.gte = function (y) {
	return this.cmp(y) >= 0;
  };

  P.isInteger = P.isint = function () {
	return this.e > this.d.length - 2;
  };


  P.isNegative = P.isneg = function () {
	return this.s < 0;
  };

  P.isPositive = P.ispos = function () {
	return this.s > 0;
  };


  P.isZero = function () {
	return this.s === 0;
  };


  P.lessThan = P.lt = function (y) {
	return this.cmp(y) < 0;
  };


  P.lessThanOrEqualTo = P.lte = function (y) {
	return this.cmp(y) < 1;
  };


  P.logarithm = P.log = function (base) {
	var r,
	  x = this,
	  Ctor = x.constructor,
	  pr = Ctor.precision,
	  wpr = pr + 5;

	// Default base is 10.
	if (base === void 0) {
	  base = new Ctor(10);
	} else {
	  base = new Ctor(base);

	  // log[-b](x) = NaN
	  // log[0](x)  = NaN
	  // log[1](x)  = NaN
	  if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + 'NaN');
	}

	// log[b](-x) = NaN
	// log[b](0) = -Infinity
	if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

	// log[b](1) = 0
	if (x.eq(ONE)) return new Ctor(0);

	external = false;
	r = divide(ln(x, wpr), ln(base, wpr), wpr);
	external = true;

	return round(r, pr);
  };

  P.minus = P.sub = function (y) {
	var x = this;
	y = new x.constructor(y);
	return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
  };


  P.modulo = P.mod = function (y) {
	var q,
	  x = this,
	  Ctor = x.constructor,
	  pr = Ctor.precision;

	y = new Ctor(y);

	// x % 0 = NaN
	if (!y.s) throw Error(decimalError + 'NaN');

	// Return x if x is 0.
	if (!x.s) return round(new Ctor(x), pr);

	// Prevent rounding of intermediate calculations.
	external = false;
	q = divide(x, y, 0, 1).times(y);
	external = true;

	return x.minus(q);
  };


  P.naturalExponential = P.exp = function () {
	return exp(this);
  };

  P.naturalLogarithm = P.ln = function () {
	return ln(this);
  };


  P.negated = P.neg = function () {
	var x = new this.constructor(this);
	x.s = -x.s || 0;
	return x;
  };

  P.plus = P.add = function (y) {
	var x = this;
	y = new x.constructor(y);
	return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
  };

  P.precision = P.sd = function (z) {
	var e, sd, w,
	  x = this;

	if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

	e = getBase10Exponent(x) + 1;
	w = x.d.length - 1;
	sd = w * LOG_BASE + 1;
	w = x.d[w];

	// If non-zero...
	if (w) {

	  // Subtract the number of trailing zeros of the last word.
	  for (; w % 10 == 0; w /= 10) sd--;

	  // Add the number of digits of the first word.
	  for (w = x.d[0]; w >= 10; w /= 10) sd++;
	}

	return z && e > sd ? e : sd;
  };

  P.squareRoot = P.sqrt = function () {
	var e, n, pr, r, s, t, wpr,
	  x = this,
	  Ctor = x.constructor;

	// Negative or zero?
	if (x.s < 1) {
	  if (!x.s) return new Ctor(0);

	  // sqrt(-x) = NaN
	  throw Error(decimalError + 'NaN');
	}

	e = getBase10Exponent(x);
	external = false;

	// Initial estimate.
	s = Math.sqrt(+x);

	// Math.sqrt underflow/overflow?
	// Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	if (s == 0 || s == 1 / 0) {
	  n = digitsToString(x.d);
	  if ((n.length + e) % 2 == 0) n += '0';
	  s = Math.sqrt(n);
	  e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

	  if (s == 1 / 0) {
		n = '5e' + e;
	  } else {
		n = s.toExponential();
		n = n.slice(0, n.indexOf('e') + 1) + e;
	  }

	  r = new Ctor(n);
	} else {
	  r = new Ctor(s.toString());
	}

	pr = Ctor.precision;
	s = wpr = pr + 3;

	// Newton-Raphson iteration.
	for (;;) {
	  t = r;
	  r = t.plus(divide(x, t, wpr + 2)).times(0.5);

	  if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
		n = n.slice(wpr - 3, wpr + 1);

		// The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
		// 4999, i.e. approaching a rounding boundary, continue the iteration.
		if (s == wpr && n == '4999') {

		  // On the first iteration only, check to see if rounding up gives the exact result as the
		  // nines may infinitely repeat.
		  round(t, pr + 1, 0);

		  if (t.times(t).eq(x)) {
			r = t;
			break;
		  }
		} else if (n != '9999') {
		  break;
		}

		wpr += 4;
	  }
	}

	external = true;

	return round(r, pr);
  };


  P.times = P.mul = function (y) {
	var carry, e, i, k, r, rL, t, xdL, ydL,
	  x = this,
	  Ctor = x.constructor,
	  xd = x.d,
	  yd = (y = new Ctor(y)).d;

	// Return 0 if either is 0.
	if (!x.s || !y.s) return new Ctor(0);

	y.s *= x.s;
	e = x.e + y.e;
	xdL = xd.length;
	ydL = yd.length;

	// Ensure xd points to the longer array.
	if (xdL < ydL) {
	  r = xd;
	  xd = yd;
	  yd = r;
	  rL = xdL;
	  xdL = ydL;
	  ydL = rL;
	}

	// Initialise the result array with zeros.
	r = [];
	rL = xdL + ydL;
	for (i = rL; i--;) r.push(0);

	// Multiply!
	for (i = ydL; --i >= 0;) {
	  carry = 0;
	  for (k = xdL + i; k > i;) {
		t = r[k] + yd[i] * xd[k - i - 1] + carry;
		r[k--] = t % BASE | 0;
		carry = t / BASE | 0;
	  }

	  r[k] = (r[k] + carry) % BASE | 0;
	}

	// Remove trailing zeros.
	for (; !r[--rL];) r.pop();

	if (carry) ++e;
	else r.shift();

	y.d = r;
	y.e = e;

	return external ? round(y, Ctor.precision) : y;
  };


  P.toDecimalPlaces = P.todp = function (dp, rm) {
	var x = this,
	  Ctor = x.constructor;

	x = new Ctor(x);
	if (dp === void 0) return x;

	checkInt32(dp, 0, MAX_DIGITS);

	if (rm === void 0) rm = Ctor.rounding;
	else checkInt32(rm, 0, 8);

	return round(x, dp + getBase10Exponent(x) + 1, rm);
  };

  P.toExponential = function (dp, rm) {
	var str,
	  x = this,
	  Ctor = x.constructor;

	if (dp === void 0) {
	  str = toString(x, true);
	} else {
	  checkInt32(dp, 0, MAX_DIGITS);

	  if (rm === void 0) rm = Ctor.rounding;
	  else checkInt32(rm, 0, 8);

	  x = round(new Ctor(x), dp + 1, rm);
	  str = toString(x, true, dp + 1);
	}

	return str;
  };

  P.toFixed = function (dp, rm) {
	var str, y,
	  x = this,
	  Ctor = x.constructor;

	if (dp === void 0) return toString(x);

	checkInt32(dp, 0, MAX_DIGITS);

	if (rm === void 0) rm = Ctor.rounding;
	else checkInt32(rm, 0, 8);

	y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
	str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);

	// To determine whether to add the minus sign look at the value before it was rounded,
	// i.e. look at `x` rather than `y`.
	return x.isneg() && !x.isZero() ? '-' + str : str;
  };


  P.toInteger = P.toint = function () {
	var x = this,
	  Ctor = x.constructor;
	return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
  };

  P.toNumber = function () {
	return +this;
  };

  P.toPower = P.pow = function (y) {
	var e, k, pr, r, sign, yIsInt,
	  x = this,
	  Ctor = x.constructor,
	  guard = 12,
	  yn = +(y = new Ctor(y));

	// pow(x, 0) = 1
	if (!y.s) return new Ctor(ONE);

	x = new Ctor(x);

	// pow(0, y > 0) = 0
	// pow(0, y < 0) = Infinity
	if (!x.s) {
	  if (y.s < 1) throw Error(decimalError + 'Infinity');
	  return x;
	}

	// pow(1, y) = 1
	if (x.eq(ONE)) return x;

	pr = Ctor.precision;

	// pow(x, 1) = x
	if (y.eq(ONE)) return round(x, pr);

	e = y.e;
	k = y.d.length - 1;
	yIsInt = e >= k;
	sign = x.s;

	if (!yIsInt) {

	  // pow(x < 0, y non-integer) = NaN
	  if (sign < 0) throw Error(decimalError + 'NaN');

	// If y is a small integer use the 'exponentiation by squaring' algorithm.
	} else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	  r = new Ctor(ONE);

	  // Max k of 9007199254740991 takes 53 loop iterations.
	  // Maximum digits array length; leaves [28, 34] guard digits.
	  e = Math.ceil(pr / LOG_BASE + 4);

	  external = false;

	  for (;;) {
		if (k % 2) {
		  r = r.times(x);
		  truncate(r.d, e);
		}

		k = mathfloor(k / 2);
		if (k === 0) break;

		x = x.times(x);
		truncate(x.d, e);
	  }

	  external = true;

	  return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
	}

	// Result is negative if x is negative and the last digit of integer y is odd.
	sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;

	x.s = 1;
	external = false;
	r = y.times(ln(x, pr + guard));
	external = true;
	r = exp(r);
	r.s = sign;

	return r;
  };

  P.toPrecision = function (sd, rm) {
	var e, str,
	  x = this,
	  Ctor = x.constructor;

	if (sd === void 0) {
	  e = getBase10Exponent(x);
	  str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
	} else {
	  checkInt32(sd, 1, MAX_DIGITS);

	  if (rm === void 0) rm = Ctor.rounding;
	  else checkInt32(rm, 0, 8);

	  x = round(new Ctor(x), sd, rm);
	  e = getBase10Exponent(x);
	  str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
	}

	return str;
  };

  P.toSignificantDigits = P.tosd = function (sd, rm) {
	var x = this,
	  Ctor = x.constructor;

	if (sd === void 0) {
	  sd = Ctor.precision;
	  rm = Ctor.rounding;
	} else {
	  checkInt32(sd, 1, MAX_DIGITS);

	  if (rm === void 0) rm = Ctor.rounding;
	  else checkInt32(rm, 0, 8);
	}

	return round(new Ctor(x), sd, rm);
  };

  P.toString = P.valueOf = P.val = P.toJSON = function () {
	var x = this,
	  e = getBase10Exponent(x),
	  Ctor = x.constructor;

	return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
  };


  function add(x, y) {
	var carry, d, e, i, k, len, xd, yd,
	  Ctor = x.constructor,
	  pr = Ctor.precision;

	// If either is zero...
	if (!x.s || !y.s) {

	  // Return x if y is zero.
	  // Return y if y is non-zero.
	  if (!y.s) y = new Ctor(x);
	  return external ? round(y, pr) : y;
	}

	xd = x.d;
	yd = y.d;

	// x and y are finite, non-zero numbers with the same sign.

	k = x.e;
	e = y.e;
	xd = xd.slice();
	i = k - e;

	// If base 1e7 exponents differ...
	if (i) {
	  if (i < 0) {
		d = xd;
		i = -i;
		len = yd.length;
	  } else {
		d = yd;
		e = k;
		len = xd.length;
	  }

	  // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	  k = Math.ceil(pr / LOG_BASE);
	  len = k > len ? k + 1 : len + 1;

	  if (i > len) {
		i = len;
		d.length = 1;
	  }

	  // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	  d.reverse();
	  for (; i--;) d.push(0);
	  d.reverse();
	}

	len = xd.length;
	i = yd.length;

	// If yd is longer than xd, swap xd and yd so xd points to the longer array.
	if (len - i < 0) {
	  i = len;
	  d = yd;
	  yd = xd;
	  xd = d;
	}

	// Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
	for (carry = 0; i;) {
	  carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	  xd[i] %= BASE;
	}

	if (carry) {
	  xd.unshift(carry);
	  ++e;
	}

	// Remove trailing zeros.
	// No need to check for zero, as +x + +y != 0 && -x + -y != 0
	for (len = xd.length; xd[--len] == 0;) xd.pop();

	y.d = xd;
	y.e = e;

	return external ? round(y, pr) : y;
  }


  function checkInt32(i, min, max) {
	if (i !== ~~i || i < min || i > max) {
	  throw Error(invalidArgument + i);
	}
  }


  function digitsToString(d) {
	var i, k, ws,
	  indexOfLastWord = d.length - 1,
	  str = '',
	  w = d[0];

	if (indexOfLastWord > 0) {
	  str += w;
	  for (i = 1; i < indexOfLastWord; i++) {
		ws = d[i] + '';
		k = LOG_BASE - ws.length;
		if (k) str += getZeroString(k);
		str += ws;
	  }

	  w = d[i];
	  ws = w + '';
	  k = LOG_BASE - ws.length;
	  if (k) str += getZeroString(k);
	} else if (w === 0) {
	  return '0';
	}

	// Remove trailing zeros of last w.
	for (; w % 10 === 0;) w /= 10;

	return str + w;
  }


  var divide = (function () {

	// Assumes non-zero x and k, and hence non-zero result.
	function multiplyInteger(x, k) {
	  var temp,
		carry = 0,
		i = x.length;

	  for (x = x.slice(); i--;) {
		temp = x[i] * k + carry;
		x[i] = temp % BASE | 0;
		carry = temp / BASE | 0;
	  }

	  if (carry) x.unshift(carry);

	  return x;
	}

	function compare(a, b, aL, bL) {
	  var i, r;

	  if (aL != bL) {
		r = aL > bL ? 1 : -1;
	  } else {
		for (i = r = 0; i < aL; i++) {
		  if (a[i] != b[i]) {
			r = a[i] > b[i] ? 1 : -1;
			break;
		  }
		}
	  }

	  return r;
	}

	function subtract(a, b, aL) {
	  var i = 0;

	  // Subtract b from a.
	  for (; aL--;) {
		a[aL] -= i;
		i = a[aL] < b[aL] ? 1 : 0;
		a[aL] = i * BASE + a[aL] - b[aL];
	  }

	  // Remove leading zeros.
	  for (; !a[0] && a.length > 1;) a.shift();
	}

	return function (x, y, pr, dp) {
	  var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz,
		Ctor = x.constructor,
		sign = x.s == y.s ? 1 : -1,
		xd = x.d,
		yd = y.d;

	  // Either 0?
	  if (!x.s) return new Ctor(x);
	  if (!y.s) throw Error(decimalError + 'Division by zero');

	  e = x.e - y.e;
	  yL = yd.length;
	  xL = xd.length;
	  q = new Ctor(sign);
	  qd = q.d = [];

	  // Result exponent may be one less than e.
	  for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
	  if (yd[i] > (xd[i] || 0)) --e;

	  if (pr == null) {
		sd = pr = Ctor.precision;
	  } else if (dp) {
		sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
	  } else {
		sd = pr;
	  }

	  if (sd < 0) return new Ctor(0);

	  // Convert precision in number of base 10 digits to base 1e7 digits.
	  sd = sd / LOG_BASE + 2 | 0;
	  i = 0;

	  // divisor < 1e7
	  if (yL == 1) {
		k = 0;
		yd = yd[0];
		sd++;

		// k is the carry.
		for (; (i < xL || k) && sd--; i++) {
		  t = k * BASE + (xd[i] || 0);
		  qd[i] = t / yd | 0;
		  k = t % yd | 0;
		}

	  // divisor >= 1e7
	  } else {

		// Normalise xd and yd so highest order digit of yd is >= BASE/2
		k = BASE / (yd[0] + 1) | 0;

		if (k > 1) {
		  yd = multiplyInteger(yd, k);
		  xd = multiplyInteger(xd, k);
		  yL = yd.length;
		  xL = xd.length;
		}

		xi = yL;
		rem = xd.slice(0, yL);
		remL = rem.length;

		// Add zeros to make remainder as long as divisor.
		for (; remL < yL;) rem[remL++] = 0;

		yz = yd.slice();
		yz.unshift(0);
		yd0 = yd[0];

		if (yd[1] >= BASE / 2) ++yd0;

		do {
		  k = 0;

		  // Compare divisor and remainder.
		  cmp = compare(yd, rem, yL, remL);

		  // If divisor < remainder.
		  if (cmp < 0) {

			// Calculate trial digit, k.
			rem0 = rem[0];
			if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);

			// k will be how many times the divisor goes into the current remainder.
			k = rem0 / yd0 | 0;

			//  Algorithm:
			//  1. product = divisor * trial digit (k)
			//  2. if product > remainder: product -= divisor, k--
			//  3. remainder -= product
			//  4. if product was < remainder at 2:
			//    5. compare new remainder and divisor
			//    6. If remainder > divisor: remainder -= divisor, k++

			if (k > 1) {
			  if (k >= BASE) k = BASE - 1;

			  // product = divisor * trial digit.
			  prod = multiplyInteger(yd, k);
			  prodL = prod.length;
			  remL = rem.length;

			  // Compare product and remainder.
			  cmp = compare(prod, rem, prodL, remL);

			  // product > remainder.
			  if (cmp == 1) {
				k--;

				// Subtract divisor from product.
				subtract(prod, yL < prodL ? yz : yd, prodL);
			  }
			} else {

			  // cmp is -1.
			  // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
			  // to avoid it. If k is 1 there is a need to compare yd and rem again below.
			  if (k == 0) cmp = k = 1;
			  prod = yd.slice();
			}

			prodL = prod.length;
			if (prodL < remL) prod.unshift(0);

			// Subtract product from remainder.
			subtract(rem, prod, remL);

			// If product was < previous remainder.
			if (cmp == -1) {
			  remL = rem.length;

			  // Compare divisor and new remainder.
			  cmp = compare(yd, rem, yL, remL);

			  // If divisor < new remainder, subtract divisor from remainder.
			  if (cmp < 1) {
				k++;

				// Subtract divisor from remainder.
				subtract(rem, yL < remL ? yz : yd, remL);
			  }
			}

			remL = rem.length;
		  } else if (cmp === 0) {
			k++;
			rem = [0];
		  }    // if cmp === 1, k will be 0

		  // Add the next digit, k, to the result array.
		  qd[i++] = k;

		  // Update the remainder.
		  if (cmp && rem[0]) {
			rem[remL++] = xd[xi] || 0;
		  } else {
			rem = [xd[xi]];
			remL = 1;
		  }

		} while ((xi++ < xL || rem[0] !== void 0) && sd--);
	  }

	  // Leading zero?
	  if (!qd[0]) qd.shift();

	  q.e = e;

	  return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
	};
  })();

  function exp(x, sd) {
	var denominator, guard, pow, sum, t, wpr,
	  i = 0,
	  k = 0,
	  Ctor = x.constructor,
	  pr = Ctor.precision;

	if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));

	// exp(0) = 1
	if (!x.s) return new Ctor(ONE);

	if (sd == null) {
	  external = false;
	  wpr = pr;
	} else {
	  wpr = sd;
	}

	t = new Ctor(0.03125);

	while (x.abs().gte(0.1)) {
	  x = x.times(t);    // x = x / 2^5
	  k += 5;
	}

	// Estimate the precision increase necessary to ensure the first 4 rounding digits are correct.
	guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	wpr += guard;
	denominator = pow = sum = new Ctor(ONE);
	Ctor.precision = wpr;

	for (;;) {
	  pow = round(pow.times(x), wpr);
	  denominator = denominator.times(++i);
	  t = sum.plus(divide(pow, denominator, wpr));

	  if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
		while (k--) sum = round(sum.times(sum), wpr);
		Ctor.precision = pr;
		return sd == null ? (external = true, round(sum, pr)) : sum;
	  }

	  sum = t;
	}
  }


  // Calculate the base 10 exponent from the base 1e7 exponent.
  function getBase10Exponent(x) {
	var e = x.e * LOG_BASE,
	  w = x.d[0];

	// Add the number of digits of the first word of the digits array.
	for (; w >= 10; w /= 10) e++;
	return e;
  }


  function getLn10(Ctor, sd, pr) {

	if (sd > Ctor.LN10.sd()) {


	  // Reset global state in case the exception is caught.
	  external = true;
	  if (pr) Ctor.precision = pr;
	  throw Error(decimalError + 'LN10 precision limit exceeded');
	}

	return round(new Ctor(Ctor.LN10), sd);
  }


  function getZeroString(k) {
	var zs = '';
	for (; k--;) zs += '0';
	return zs;
  }


  function ln(y, sd) {
	var c, c0, denominator, e, numerator, sum, t, wpr, x2,
	  n = 1,
	  guard = 10,
	  x = y,
	  xd = x.d,
	  Ctor = x.constructor,
	  pr = Ctor.precision;

	// ln(-x) = NaN
	// ln(0) = -Infinity
	if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

	// ln(1) = 0
	if (x.eq(ONE)) return new Ctor(0);

	if (sd == null) {
	  external = false;
	  wpr = pr;
	} else {
	  wpr = sd;
	}

	if (x.eq(10)) {
	  if (sd == null) external = true;
	  return getLn10(Ctor, wpr);
	}

	wpr += guard;
	Ctor.precision = wpr;
	c = digitsToString(xd);
	c0 = c.charAt(0);
	e = getBase10Exponent(x);

	if (Math.abs(e) < 1.5e15) {

	  while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
		x = x.times(y);
		c = digitsToString(x.d);
		c0 = c.charAt(0);
		n++;
	  }

	  e = getBase10Exponent(x);

	  if (c0 > 1) {
		x = new Ctor('0.' + c);
		e++;
	  } else {
		x = new Ctor(c0 + '.' + c.slice(1));
	  }
	} else {

	  // The argument reduction method above may result in overflow if the argument y is a massive
	  // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	  // function using ln(x*10^e) = ln(x) + e*ln(10).
	  t = getLn10(Ctor, wpr + 2, pr).times(e + '');
	  x = ln(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);

	  Ctor.precision = pr;
	  return sd == null ? (external = true, round(x, pr)) : x;
	}

	// x is reduced to a value near 1.

	// Taylor series.
	// ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	// where x = (y - 1)/(y + 1)    (|x| < 1)
	sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
	x2 = round(x.times(x), wpr);
	denominator = 3;

	for (;;) {
	  numerator = round(numerator.times(x2), wpr);
	  t = sum.plus(divide(numerator, new Ctor(denominator), wpr));

	  if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
		sum = sum.times(2);

		// Reverse the argument reduction.
		if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
		sum = divide(sum, new Ctor(n), wpr);

		Ctor.precision = pr;
		return sd == null ? (external = true, round(sum, pr)) : sum;
	  }

	  sum = t;
	  denominator += 2;
	}
  }


  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */
  function parseDecimal(x, str) {
	var e, i, len;

	// Decimal point?
	if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	// Exponential form?
	if ((i = str.search(/e/i)) > 0) {

	  // Determine exponent.
	  if (e < 0) e = i;
	  e += +str.slice(i + 1);
	  str = str.substring(0, i);
	} else if (e < 0) {

	  // Integer.
	  e = str.length;
	}

	// Determine leading zeros.
	for (i = 0; str.charCodeAt(i) === 48;) ++i;

	// Determine trailing zeros.
	for (len = str.length; str.charCodeAt(len - 1) === 48;) --len;
	str = str.slice(i, len);

	if (str) {
	  len -= i;
	  e = e - i - 1;
	  x.e = mathfloor(e / LOG_BASE);
	  x.d = [];

	  // Transform base

	  // e is the base 10 exponent.
	  // i is where to slice str to get the first word of the digits array.
	  i = (e + 1) % LOG_BASE;
	  if (e < 0) i += LOG_BASE;

	  if (i < len) {
		if (i) x.d.push(+str.slice(0, i));
		for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
		str = str.slice(i);
		i = LOG_BASE - str.length;
	  } else {
		i -= len;
	  }

	  for (; i--;) str += '0';
	  x.d.push(+str);

	  if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
	} else {

	  // Zero.
	  x.s = 0;
	  x.e = 0;
	  x.d = [0];
	}

	return x;
  }


  /*
   * Round `x` to `sd` significant digits, using rounding mode `rm` if present (truncate otherwise).
   */
   function round(x, sd, rm) {
	var i, j, k, n, rd, doRound, w, xdi,
	  xd = x.d;

	// rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
	// w: the word of xd which contains the rounding digit, a base 1e7 number.
	// xdi: the index of w within xd.
	// n: the number of digits of w.
	// i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	// they had leading zeros)
	// j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

	// Get the length of the first word of the digits array xd.
	for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
	i = sd - n;

	// Is the rounding digit in the first word of xd?
	if (i < 0) {
	  i += LOG_BASE;
	  j = sd;
	  w = xd[xdi = 0];
	} else {
	  xdi = Math.ceil((i + 1) / LOG_BASE);
	  k = xd.length;
	  if (xdi >= k) return x;
	  w = k = xd[xdi];

	  // Get the number of digits of w.
	  for (n = 1; k >= 10; k /= 10) n++;

	  // Get the index of rd within w.
	  i %= LOG_BASE;

	  // Get the index of rd within w, adjusted for leading zeros.
	  // The number of leading zeros of w is given by LOG_BASE - n.
	  j = i - LOG_BASE + n;
	}

	if (rm !== void 0) {
	  k = mathpow(10, n - j - 1);

	  // Get the rounding digit at index j of w.
	  rd = w / k % 10 | 0;

	  // Are there any non-zero digits after the rounding digit?
	  doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;

	  // The expression `w % mathpow(10, n - j - 1)` returns all the digits of w to the right of the
	  // digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression will give
	  // 714.

	  doRound = rm < 4
		? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
		: rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 &&

		  // Check whether the digit to the left of the rounding digit is odd.
		  ((i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
			rm == (x.s < 0 ? 8 : 7));
	}

	if (sd < 1 || !xd[0]) {
	  if (doRound) {
		k = getBase10Exponent(x);
		xd.length = 1;

		// Convert sd to decimal places.
		sd = sd - k - 1;

		// 1, 0.1, 0.01, 0.001, 0.0001 etc.
		xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
		x.e = mathfloor(-sd / LOG_BASE) || 0;
	  } else {
		xd.length = 1;

		// Zero.
		xd[0] = x.e = x.s = 0;
	  }

	  return x;
	}

	// Remove excess digits.
	if (i == 0) {
	  xd.length = xdi;
	  k = 1;
	  xdi--;
	} else {
	  xd.length = xdi + 1;
	  k = mathpow(10, LOG_BASE - i);

	  // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	  // j > 0 means i > number of leading zeros of w.
	  xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
	}

	if (doRound) {
	  for (;;) {

		// Is the digit to be rounded up in the first word of xd?
		if (xdi == 0) {
		  if ((xd[0] += k) == BASE) {
			xd[0] = 1;
			++x.e;
		  }

		  break;
		} else {
		  xd[xdi] += k;
		  if (xd[xdi] != BASE) break;
		  xd[xdi--] = 0;
		  k = 1;
		}
	  }
	}

	// Remove trailing zeros.
	for (i = xd.length; xd[--i] === 0;) xd.pop();

	if (external && (x.e > MAX_E || x.e < -MAX_E)) {
	  throw Error(exponentOutOfRange + getBase10Exponent(x));
	}

	return x;
  }


  function subtract(x, y) {
	var d, e, i, j, k, len, xd, xe, xLTy, yd,
	  Ctor = x.constructor,
	  pr = Ctor.precision;

	// Return y negated if x is zero.
	// Return x if y is zero and x is non-zero.
	if (!x.s || !y.s) {
	  if (y.s) y.s = -y.s;
	  else y = new Ctor(x);
	  return external ? round(y, pr) : y;
	}

	xd = x.d;
	yd = y.d;

	// x and y are non-zero numbers with the same sign.

	e = y.e;
	xe = x.e;
	xd = xd.slice();
	k = xe - e;

	// If exponents differ...
	if (k) {
	  xLTy = k < 0;

	  if (xLTy) {
		d = xd;
		k = -k;
		len = yd.length;
	  } else {
		d = yd;
		e = xe;
		len = xd.length;
	  }

	  // Numbers with massively different exponents would result in a very high number of zeros
	  // needing to be prepended, but this can be avoided while still ensuring correct rounding by
	  // limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	  i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

	  if (k > i) {
		k = i;
		d.length = 1;
	  }

	  // Prepend zeros to equalise exponents.
	  d.reverse();
	  for (i = k; i--;) d.push(0);
	  d.reverse();

	// Base 1e7 exponents equal.
	} else {

	  // Check digits to determine which is the bigger number.

	  i = xd.length;
	  len = yd.length;
	  xLTy = i < len;
	  if (xLTy) len = i;

	  for (i = 0; i < len; i++) {
		if (xd[i] != yd[i]) {
		  xLTy = xd[i] < yd[i];
		  break;
		}
	  }

	  k = 0;
	}

	if (xLTy) {
	  d = xd;
	  xd = yd;
	  yd = d;
	  y.s = -y.s;
	}

	len = xd.length;

	// Append zeros to xd if shorter.
	// Don't add zeros to yd if shorter as subtraction only needs to start at yd length.
	for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

	// Subtract yd from xd.
	for (i = yd.length; i > k;) {
	  if (xd[--i] < yd[i]) {
		for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
		--xd[j];
		xd[i] += BASE;
	  }

	  xd[i] -= yd[i];
	}

	// Remove trailing zeros.
	for (; xd[--len] === 0;) xd.pop();

	// Remove leading zeros and adjust exponent accordingly.
	for (; xd[0] === 0; xd.shift()) --e;

	// Zero?
	if (!xd[0]) return new Ctor(0);

	y.d = xd;
	y.e = e;

	//return external && xd.length >= pr / LOG_BASE ? round(y, pr) : y;
	return external ? round(y, pr) : y;
  }


  function toString(x, isExp, sd) {
	var k,
	  e = getBase10Exponent(x),
	  str = digitsToString(x.d),
	  len = str.length;

	if (isExp) {
	  if (sd && (k = sd - len) > 0) {
		str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
	  } else if (len > 1) {
		str = str.charAt(0) + '.' + str.slice(1);
	  }

	  str = str + (e < 0 ? 'e' : 'e+') + e;
	} else if (e < 0) {
	  str = '0.' + getZeroString(-e - 1) + str;
	  if (sd && (k = sd - len) > 0) str += getZeroString(k);
	} else if (e >= len) {
	  str += getZeroString(e + 1 - len);
	  if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	} else {
	  if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	  if (sd && (k = sd - len) > 0) {
		if (e + 1 === len) str += '.';
		str += getZeroString(k);
	  }
	}

	return x.s < 0 ? '-' + str : str;
  }


  // Does not strip trailing zeros.
  function truncate(arr, len) {
	if (arr.length > len) {
	  arr.length = len;
	  return true;
	}
  }


  function clone(obj) {
	var i, p, ps;


	function Decimal(value) {
	  var x = this;

	  // Decimal called without new.
	  if (!(x instanceof Decimal)) return new Decimal(value);

	  // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	  // which points to Object.
	  x.constructor = Decimal;

	  // Duplicate.
	  if (value instanceof Decimal) {
		x.s = value.s;
		x.e = value.e;
		x.d = (value = value.d) ? value.slice() : value;
		return;
	  }

	  if (typeof value === 'number') {

		// Reject Infinity/NaN.
		if (value * 0 !== 0) {
		  throw Error(invalidArgument + value);
		}

		if (value > 0) {
		  x.s = 1;
		} else if (value < 0) {
		  value = -value;
		  x.s = -1;
		} else {
		  x.s = 0;
		  x.e = 0;
		  x.d = [0];
		  return;
		}

		// Fast path for small integers.
		if (value === ~~value && value < 1e7) {
		  x.e = 0;
		  x.d = [value];
		  return;
		}

		return parseDecimal(x, value.toString());
	  } else if (typeof value !== 'string') {
		throw Error(invalidArgument + value);
	  }

	  // Minus sign?
	  if (value.charCodeAt(0) === 45) {
		value = value.slice(1);
		x.s = -1;
	  } else {
		x.s = 1;
	  }

	  if (isDecimal.test(value)) parseDecimal(x, value);
	  else throw Error(invalidArgument + value);
	}

	Decimal.prototype = P;

	Decimal.ROUND_UP = 0;
	Decimal.ROUND_DOWN = 1;
	Decimal.ROUND_CEIL = 2;
	Decimal.ROUND_FLOOR = 3;
	Decimal.ROUND_HALF_UP = 4;
	Decimal.ROUND_HALF_DOWN = 5;
	Decimal.ROUND_HALF_EVEN = 6;
	Decimal.ROUND_HALF_CEIL = 7;
	Decimal.ROUND_HALF_FLOOR = 8;

	Decimal.clone = clone;
	Decimal.config = Decimal.set = config;

	if (obj === void 0) obj = {};
	if (obj) {
	  ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'];
	  for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	}

	Decimal.config(obj);

	return Decimal;
  }

  function config(obj) {
	if (!obj || typeof obj !== 'object') {
	  throw Error(decimalError + 'Object expected');
	}
	var i, p, v,
	  ps = [
		'precision', 1, MAX_DIGITS,
		'rounding', 0, 8,
		'toExpNeg', -1 / 0, 0,
		'toExpPos', 0, 1 / 0
	  ];

	for (i = 0; i < ps.length; i += 3) {
	  if ((v = obj[p = ps[i]]) !== void 0) {
		if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
		else throw Error(invalidArgument + p + ': ' + v);
	  }
	}

	if ((v = obj[p = 'LN10']) !== void 0) {
		if (v == Math.LN10) this[p] = new this(v);
		else throw Error(invalidArgument + p + ': ' + v);
	}

	return this;
  }


  // Create and configure initial Decimal constructor.
  Decimal = clone(Decimal);

  Decimal['default'] = Decimal.Decimal = Decimal;

  // Internal constant.
  ONE = new Decimal(1);


  // Export.


  // AMD.
  if (typeof define == 'function' && define.amd) {
	define(function () {
	  return Decimal;
	});

  // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
	module.exports = Decimal;

	// Browser.
  } else {
	if (!globalScope) {
	  globalScope = typeof self != 'undefined' && self && self.self == self
		? self : Function('return this')();
	}

	globalScope.Decimal = Decimal;
  }
})(this);



//@  Highcharts JS v7.1.1 (2019-04-09) 3D features for Highcharts JS
(function(u){"object"===typeof module&&module.exports?(u["default"]=u,module.exports=u):"function"===typeof define&&define.amd?define("highcharts/highcharts-3d",["highcharts"],function(A){u(A);u.Highcharts=A;return u}):u("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(u){function A(b,z,x,v){b.hasOwnProperty(z)||(b[z]=v.apply(null,x))}u=u?u._modules:{};A(u,"parts-3d/Math.js",[u["parts/Globals.js"]],function(b){var z=b.deg2rad,x=b.pick;b.perspective3D=function(b,r,n){r=0<n&&n<Number.POSITIVE_INFINITY?
n/(b.z+r.z+n):1;return{x:b.x*r,y:b.y*r}};b.perspective=function(v,r,n){var y=r.options.chart.options3d,g=n?r.inverted:!1,t={x:r.plotWidth/2,y:r.plotHeight/2,z:y.depth/2,vd:x(y.depth,1)*x(y.viewDistance,0)},p=r.scale3d||1,h=z*y.beta*(g?-1:1),y=z*y.alpha*(g?-1:1),a=Math.cos(y),f=Math.cos(-h),q=Math.sin(y),k=Math.sin(-h);n||(t.x+=r.plotLeft,t.y+=r.plotTop);return v.map(function(m){var e;e=(g?m.y:m.x)-t.x;var c=(g?m.x:m.y)-t.y;m=(m.z||0)-t.z;e={x:f*e-k*m,y:-q*k*e+a*c-f*q*m,z:a*k*e+q*c+a*f*m};c=b.perspective3D(e,
t,t.vd);c.x=c.x*p+t.x;c.y=c.y*p+t.y;c.z=e.z*p+t.z;return{x:g?c.y:c.x,y:g?c.x:c.y,z:c.z}})};b.pointCameraDistance=function(b,r){var n=r.options.chart.options3d,v=r.plotWidth/2;r=r.plotHeight/2;n=x(n.depth,1)*x(n.viewDistance,0)+n.depth;return Math.sqrt(Math.pow(v-b.plotX,2)+Math.pow(r-b.plotY,2)+Math.pow(n-b.plotZ,2))};b.shapeArea=function(b){var r=0,n,v;for(n=0;n<b.length;n++)v=(n+1)%b.length,r+=b[n].x*b[v].y-b[v].x*b[n].y;return r/2};b.shapeArea3d=function(v,r,n){return b.shapeArea(b.perspective(v,
r,n))}});A(u,"parts-3d/SVGRenderer.js",[u["parts/Globals.js"]],function(b){function z(a,c,d,b,f,B,k,m){var l=[],E=B-f;return B>f&&B-f>Math.PI/2+.0001?(l=l.concat(z(a,c,d,b,f,f+Math.PI/2,k,m)),l=l.concat(z(a,c,d,b,f+Math.PI/2,B,k,m))):B<f&&f-B>Math.PI/2+.0001?(l=l.concat(z(a,c,d,b,f,f-Math.PI/2,k,m)),l=l.concat(z(a,c,d,b,f-Math.PI/2,B,k,m))):["C",a+d*Math.cos(f)-d*e*E*Math.sin(f)+k,c+b*Math.sin(f)+b*e*E*Math.cos(f)+m,a+d*Math.cos(B)+d*e*E*Math.sin(B)+k,c+b*Math.sin(B)-b*e*E*Math.cos(B)+m,a+d*Math.cos(B)+
k,c+b*Math.sin(B)+m]}var x=Math.cos,v=Math.PI,r=Math.sin,n=b.animObject,y=b.charts,g=b.color,t=b.defined,p=b.deg2rad,h=b.extend,a=b.merge,f=b.perspective,q=b.pick,k=b.SVGElement,m=b.SVGRenderer,e,c,w;e=4*(Math.sqrt(2)-1)/3/(v/2);m.prototype.toLinePath=function(a,c){var d=[];a.forEach(function(a){d.push("L",a.x,a.y)});a.length&&(d[0]="M",c&&d.push("Z"));return d};m.prototype.toLineSegments=function(a){var c=[],d=!0;a.forEach(function(a){c.push(d?"M":"L",a.x,a.y);d=!d});return c};m.prototype.face3d=
function(a){var c=this,d=this.createElement("path");d.vertexes=[];d.insidePlotArea=!1;d.enabled=!0;d.attr=function(a){if("object"===typeof a&&(t(a.enabled)||t(a.vertexes)||t(a.insidePlotArea))){this.enabled=q(a.enabled,this.enabled);this.vertexes=q(a.vertexes,this.vertexes);this.insidePlotArea=q(a.insidePlotArea,this.insidePlotArea);delete a.enabled;delete a.vertexes;delete a.insidePlotArea;var d=f(this.vertexes,y[c.chartIndex],this.insidePlotArea),l=c.toLinePath(d,!0),d=b.shapeArea(d),d=this.enabled&&
0<d?"visible":"hidden";a.d=l;a.visibility=d}return k.prototype.attr.apply(this,arguments)};d.animate=function(a){if("object"===typeof a&&(t(a.enabled)||t(a.vertexes)||t(a.insidePlotArea))){this.enabled=q(a.enabled,this.enabled);this.vertexes=q(a.vertexes,this.vertexes);this.insidePlotArea=q(a.insidePlotArea,this.insidePlotArea);delete a.enabled;delete a.vertexes;delete a.insidePlotArea;var d=f(this.vertexes,y[c.chartIndex],this.insidePlotArea),l=c.toLinePath(d,!0),d=b.shapeArea(d),d=this.enabled&&
0<d?"visible":"hidden";a.d=l;this.attr("visibility",d)}return k.prototype.animate.apply(this,arguments)};return d.attr(a)};m.prototype.polyhedron=function(a){var c=this,d=this.g(),l=d.destroy;this.styledMode||d.attr({"stroke-linejoin":"round"});d.faces=[];d.destroy=function(){for(var a=0;a<d.faces.length;a++)d.faces[a].destroy();return l.call(this)};d.attr=function(a,l,e,b){if("object"===typeof a&&t(a.faces)){for(;d.faces.length>a.faces.length;)d.faces.pop().destroy();for(;d.faces.length<a.faces.length;)d.faces.push(c.face3d().add(d));
for(var f=0;f<a.faces.length;f++)c.styledMode&&delete a.faces[f].fill,d.faces[f].attr(a.faces[f],null,e,b);delete a.faces}return k.prototype.attr.apply(this,arguments)};d.animate=function(a,l,e){if(a&&a.faces){for(;d.faces.length>a.faces.length;)d.faces.pop().destroy();for(;d.faces.length<a.faces.length;)d.faces.push(c.face3d().add(d));for(var b=0;b<a.faces.length;b++)d.faces[b].animate(a.faces[b],l,e);delete a.faces}return k.prototype.animate.apply(this,arguments)};return d.attr(a)};c={initArgs:function(a){var c=
this,d=c.renderer,l=d[c.pathType+"Path"](a),b=l.zIndexes;c.parts.forEach(function(a){c[a]=d.path(l[a]).attr({"class":"highcharts-3d-"+a,zIndex:b[a]||0}).add(c)});c.attr({"stroke-linejoin":"round",zIndex:b.group});c.originalDestroy=c.destroy;c.destroy=c.destroyParts},singleSetterForParts:function(a,c,d,e,f,B){var l={};e=[null,null,e||"attr",f,B];var k=d&&d.zIndexes;d?(b.objectEach(d,function(c,e){l[e]={};l[e][a]=c;k&&(l[e].zIndex=d.zIndexes[e]||0)}),e[1]=l):(l[a]=c,e[0]=l);return this.processParts.apply(this,
e)},processParts:function(a,c,d,e,f){var l=this;l.parts.forEach(function(k){c&&(a=b.pick(c[k],!1));if(!1!==a)l[k][d](a,e,f)});return l},destroyParts:function(){this.processParts(null,null,"destroy");return this.originalDestroy()}};w=b.merge(c,{parts:["front","top","side"],pathType:"cuboid",attr:function(a,c,d,e){if("string"===typeof a&&"undefined"!==typeof c){var l=a;a={};a[l]=c}return a.shapeArgs||t(a.x)?this.singleSetterForParts("d",null,this.renderer[this.pathType+"Path"](a.shapeArgs||a)):k.prototype.attr.call(this,
a,void 0,d,e)},animate:function(a,c,d){t(a.x)&&t(a.y)?(a=this.renderer[this.pathType+"Path"](a),this.singleSetterForParts("d",null,a,"animate",c,d),this.attr({zIndex:a.zIndexes.group})):k.prototype.animate.call(this,a,c,d);return this},fillSetter:function(a){this.singleSetterForParts("fill",null,{front:a,top:g(a).brighten(.1).get(),side:g(a).brighten(-.1).get()});this.color=this.fill=a;return this}});m.prototype.elements3d={base:c,cuboid:w};m.prototype.element3d=function(a,c){var d=this.g();b.extend(d,
this.elements3d[a]);d.initArgs(c);return d};m.prototype.cuboid=function(a){return this.element3d("cuboid",a)};b.SVGRenderer.prototype.cuboidPath=function(a){function c(a){return r[a]}var d=a.x,e=a.y,l=a.z,k=a.height,m=a.width,h=a.depth,q=y[this.chartIndex],p,w,g=q.options.chart.options3d.alpha,n=0,r=[{x:d,y:e,z:l},{x:d+m,y:e,z:l},{x:d+m,y:e+k,z:l},{x:d,y:e+k,z:l},{x:d,y:e+k,z:l+h},{x:d+m,y:e+k,z:l+h},{x:d+m,y:e,z:l+h},{x:d,y:e,z:l+h}],r=f(r,q,a.insidePlotArea);w=function(a,d){var e=[[],-1];a=a.map(c);
d=d.map(c);0>b.shapeArea(a)?e=[a,0]:0>b.shapeArea(d)&&(e=[d,1]);return e};p=w([3,2,1,0],[7,6,5,4]);a=p[0];m=p[1];p=w([1,6,7,0],[4,5,2,3]);k=p[0];h=p[1];p=w([1,2,5,6],[0,7,4,3]);w=p[0];p=p[1];1===p?n+=1E4*(1E3-d):p||(n+=1E4*d);n+=10*(!h||0<=g&&180>=g||360>g&&357.5<g?q.plotHeight-e:10+e);1===m?n+=100*l:m||(n+=100*(1E3-l));return{front:this.toLinePath(a,!0),top:this.toLinePath(k,!0),side:this.toLinePath(w,!0),zIndexes:{group:Math.round(n)},isFront:m,isTop:h}};b.SVGRenderer.prototype.arc3d=function(c){function e(d){var c=
!1,e={},l;d=a(d);for(l in d)-1!==f.indexOf(l)&&(e[l]=d[l],delete d[l],c=!0);return c?e:!1}var d=this.g(),l=d.renderer,f="x y r innerR start end".split(" ");c=a(c);c.alpha=(c.alpha||0)*p;c.beta=(c.beta||0)*p;d.top=l.path();d.side1=l.path();d.side2=l.path();d.inn=l.path();d.out=l.path();d.onAdd=function(){var a=d.parentGroup,c=d.attr("class");d.top.add(d);["out","inn","side1","side2"].forEach(function(e){d[e].attr({"class":c+" highcharts-3d-side"}).add(a)})};["addClass","removeClass"].forEach(function(a){d[a]=
function(){var c=arguments;["top","out","inn","side1","side2"].forEach(function(e){d[e][a].apply(d[e],c)})}});d.setPaths=function(a){var c=d.renderer.arc3dPath(a),e=100*c.zTop;d.attribs=a;d.top.attr({d:c.top,zIndex:c.zTop});d.inn.attr({d:c.inn,zIndex:c.zInn});d.out.attr({d:c.out,zIndex:c.zOut});d.side1.attr({d:c.side1,zIndex:c.zSide1});d.side2.attr({d:c.side2,zIndex:c.zSide2});d.zIndex=e;d.attr({zIndex:e});a.center&&(d.top.setRadialReference(a.center),delete a.center)};d.setPaths(c);d.fillSetter=
function(a){var c=g(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:c});this.side2.attr({fill:c});this.inn.attr({fill:c});this.out.attr({fill:c});this.top.attr({fill:a});return this};["opacity","translateX","translateY","visibility"].forEach(function(a){d[a+"Setter"]=function(a,c){d[c]=a;["out","inn","side1","side2","top"].forEach(function(e){d[e].attr(c,a)})}});d.attr=function(a){var c;"object"===typeof a&&(c=e(a))&&(h(d.attribs,c),d.setPaths(d.attribs));return k.prototype.attr.apply(d,
arguments)};d.animate=function(c,l,f){var m,h=this.attribs,p,w="data-"+Math.random().toString(26).substring(2,9);delete c.center;delete c.z;delete c.depth;delete c.alpha;delete c.beta;p=n(q(l,this.renderer.globalAnimation));p.duration&&(m=e(c),d[w]=0,c[w]=1,d[w+"Setter"]=b.noop,m&&(p.step=function(c,d){function e(a){return h[a]+(q(m[a],h[a])-h[a])*d.pos}d.prop===w&&d.elem.setPaths(a(h,{x:e("x"),y:e("y"),r:e("r"),innerR:e("innerR"),start:e("start"),end:e("end")}))}),l=p);return k.prototype.animate.call(this,
c,l,f)};d.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();k.prototype.destroy.call(this)};d.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};d.show=function(a){this.top.show(a);this.out.show(a);this.inn.show(a);this.side1.show(a);this.side2.show(a)};return d};m.prototype.arc3dPath=function(a){function c(a){a%=2*Math.PI;a>Math.PI&&(a=2*Math.PI-a);return a}var d=a.x,e=a.y,l=a.start,
b=a.end-.00001,f=a.r,m=a.innerR||0,k=a.depth||0,h=a.alpha,p=a.beta,q=Math.cos(l),w=Math.sin(l);a=Math.cos(b);var g=Math.sin(b),n=f*Math.cos(p),f=f*Math.cos(h),t=m*Math.cos(p),y=m*Math.cos(h),m=k*Math.sin(p),u=k*Math.sin(h),k=["M",d+n*q,e+f*w],k=k.concat(z(d,e,n,f,l,b,0,0)),k=k.concat(["L",d+t*a,e+y*g]),k=k.concat(z(d,e,t,y,b,l,0,0)),k=k.concat(["Z"]),A=0<p?Math.PI/2:0,p=0<h?0:Math.PI/2,A=l>-A?l:b>-A?-A:l,C=b<v-p?b:l<v-p?v-p:b,D=2*v-p,h=["M",d+n*x(A),e+f*r(A)],h=h.concat(z(d,e,n,f,A,C,0,0));b>D&&l<
D?(h=h.concat(["L",d+n*x(C)+m,e+f*r(C)+u]),h=h.concat(z(d,e,n,f,C,D,m,u)),h=h.concat(["L",d+n*x(D),e+f*r(D)]),h=h.concat(z(d,e,n,f,D,b,0,0)),h=h.concat(["L",d+n*x(b)+m,e+f*r(b)+u]),h=h.concat(z(d,e,n,f,b,D,m,u)),h=h.concat(["L",d+n*x(D),e+f*r(D)]),h=h.concat(z(d,e,n,f,D,C,0,0))):b>v-p&&l<v-p&&(h=h.concat(["L",d+n*Math.cos(C)+m,e+f*Math.sin(C)+u]),h=h.concat(z(d,e,n,f,C,b,m,u)),h=h.concat(["L",d+n*Math.cos(b),e+f*Math.sin(b)]),h=h.concat(z(d,e,n,f,b,C,0,0)));h=h.concat(["L",d+n*Math.cos(C)+m,e+f*Math.sin(C)+
u]);h=h.concat(z(d,e,n,f,C,A,m,u));h=h.concat(["Z"]);p=["M",d+t*q,e+y*w];p=p.concat(z(d,e,t,y,l,b,0,0));p=p.concat(["L",d+t*Math.cos(b)+m,e+y*Math.sin(b)+u]);p=p.concat(z(d,e,t,y,b,l,m,u));p=p.concat(["Z"]);q=["M",d+n*q,e+f*w,"L",d+n*q+m,e+f*w+u,"L",d+t*q+m,e+y*w+u,"L",d+t*q,e+y*w,"Z"];d=["M",d+n*a,e+f*g,"L",d+n*a+m,e+f*g+u,"L",d+t*a+m,e+y*g+u,"L",d+t*a,e+y*g,"Z"];g=Math.atan2(u,-m);e=Math.abs(b+g);a=Math.abs(l+g);l=Math.abs((l+b)/2+g);e=c(e);a=c(a);l=c(l);l*=1E5;b=1E5*a;e*=1E5;return{top:k,zTop:1E5*
Math.PI+1,out:h,zOut:Math.max(l,b,e),inn:p,zInn:Math.max(l,b,e),side1:q,zSide1:.99*e,side2:d,zSide2:.99*b}}});A(u,"parts-3d/Chart.js",[u["parts/Globals.js"]],function(b){function u(b,h){var a=b.plotLeft,f=b.plotWidth+a,p=b.plotTop,k=b.plotHeight+p,m=a+b.plotWidth/2,e=p+b.plotHeight/2,c=Number.MAX_VALUE,w=-Number.MAX_VALUE,l=Number.MAX_VALUE,E=-Number.MAX_VALUE,d,g=1;d=[{x:a,y:p,z:0},{x:a,y:p,z:h}];[0,1].forEach(function(a){d.push({x:f,y:d[a].y,z:d[a].z})});[0,1,2,3].forEach(function(a){d.push({x:d[a].x,
y:k,z:d[a].z})});d=n(d,b,!1);d.forEach(function(a){c=Math.min(c,a.x);w=Math.max(w,a.x);l=Math.min(l,a.y);E=Math.max(E,a.y)});a>c&&(g=Math.min(g,1-Math.abs((a+m)/(c+m))%1));f<w&&(g=Math.min(g,(f-m)/(w-m)));p>l&&(g=0>l?Math.min(g,(p+e)/(-l+p+e)):Math.min(g,1-(p+e)/(l+e)%1));k<E&&(g=Math.min(g,Math.abs((k-e)/(E-e))));return g}var x=b.addEvent,v=b.Chart,r=b.merge,n=b.perspective,y=b.pick,g=b.wrap;v.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};v.prototype.propsRequireDirtyBox.push("chart.options3d");
v.prototype.propsRequireUpdateSeries.push("chart.options3d");x(v,"afterInit",function(){var b=this.options;this.is3d()&&(b.series||[]).forEach(function(h){"scatter"===(h.type||b.chart.type||b.chart.defaultSeriesType)&&(h.type="scatter3d")})});x(v,"addSeries",function(b){this.is3d()&&"scatter"===b.options.type&&(b.options.type="scatter3d")});b.wrap(b.Chart.prototype,"isInsidePlot",function(b){return this.is3d()||b.apply(this,[].slice.call(arguments,1))});var t=b.getOptions();r(!0,t,{chart:{options3d:{enabled:!1,
alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,axisLabelPosition:null,frame:{visible:"default",size:1,bottom:{},top:{},left:{},right:{},back:{},front:{}}}}});x(v,"afterGetContainer",function(){this.styledMode&&(this.renderer.definition({tagName:"style",textContent:".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n"}),[{name:"darker",slope:.6},{name:"brighter",slope:1.4}].forEach(function(b){this.renderer.definition({tagName:"filter",
id:"highcharts-"+b.name,children:[{tagName:"feComponentTransfer",children:[{tagName:"feFuncR",type:"linear",slope:b.slope},{tagName:"feFuncG",type:"linear",slope:b.slope},{tagName:"feFuncB",type:"linear",slope:b.slope}]}]})},this))});g(v.prototype,"setClassName",function(b){b.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});x(b.Chart,"afterSetChartSize",function(){var b=this.options.chart.options3d;if(this.is3d()){var h=this.inverted,a=this.clipBox,
f=this.margin;a[h?"y":"x"]=-(f[3]||0);a[h?"x":"y"]=-(f[0]||0);a[h?"height":"width"]=this.chartWidth+(f[3]||0)+(f[1]||0);a[h?"width":"height"]=this.chartHeight+(f[0]||0)+(f[2]||0);this.scale3d=1;!0===b.fitToPlot&&(this.scale3d=u(this,b.depth));this.frame3d=this.get3dFrame()}});x(v,"beforeRedraw",function(){this.is3d()&&(this.isDirtyBox=!0)});x(v,"beforeRender",function(){this.is3d()&&(this.frame3d=this.get3dFrame())});g(v.prototype,"renderSeries",function(b){var h=this.series.length;if(this.is3d())for(;h--;)b=
this.series[h],b.translate(),b.render();else b.call(this)});x(v,"afterDrawChartBox",function(){if(this.is3d()){var p=this.renderer,h=this.options.chart.options3d,a=this.get3dFrame(),f=this.plotLeft,q=this.plotLeft+this.plotWidth,k=this.plotTop,m=this.plotTop+this.plotHeight,h=h.depth,e=f-(a.left.visible?a.left.size:0),c=q+(a.right.visible?a.right.size:0),w=k-(a.top.visible?a.top.size:0),l=m+(a.bottom.visible?a.bottom.size:0),g=0-(a.front.visible?a.front.size:0),d=h+(a.back.visible?a.back.size:0),
n=this.hasRendered?"animate":"attr";this.frame3d=a;this.frameShapes||(this.frameShapes={bottom:p.polyhedron().add(),top:p.polyhedron().add(),left:p.polyhedron().add(),right:p.polyhedron().add(),back:p.polyhedron().add(),front:p.polyhedron().add()});this.frameShapes.bottom[n]({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:a.bottom.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:e,y:l,z:g},{x:c,y:l,z:g},{x:c,y:l,z:d},{x:e,y:l,z:d}],enabled:a.bottom.visible},
{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:f,y:m,z:h},{x:q,y:m,z:h},{x:q,y:m,z:0},{x:f,y:m,z:0}],enabled:a.bottom.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:e,y:l,z:g},{x:e,y:l,z:d},{x:f,y:m,z:h},{x:f,y:m,z:0}],enabled:a.bottom.visible&&!a.left.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:c,y:l,z:d},{x:c,y:l,z:g},{x:q,y:m,z:0},{x:q,y:m,z:h}],enabled:a.bottom.visible&&!a.right.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:c,
y:l,z:g},{x:e,y:l,z:g},{x:f,y:m,z:0},{x:q,y:m,z:0}],enabled:a.bottom.visible&&!a.front.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:e,y:l,z:d},{x:c,y:l,z:d},{x:q,y:m,z:h},{x:f,y:m,z:h}],enabled:a.bottom.visible&&!a.back.visible}]});this.frameShapes.top[n]({"class":"highcharts-3d-frame highcharts-3d-frame-top",zIndex:a.top.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:e,y:w,z:d},{x:c,y:w,z:d},{x:c,y:w,z:g},{x:e,y:w,z:g}],enabled:a.top.visible},
{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:f,y:k,z:0},{x:q,y:k,z:0},{x:q,y:k,z:h},{x:f,y:k,z:h}],enabled:a.top.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:e,y:w,z:d},{x:e,y:w,z:g},{x:f,y:k,z:0},{x:f,y:k,z:h}],enabled:a.top.visible&&!a.left.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:c,y:w,z:g},{x:c,y:w,z:d},{x:q,y:k,z:h},{x:q,y:k,z:0}],enabled:a.top.visible&&!a.right.visible},{fill:b.color(a.top.color).get(),vertexes:[{x:e,y:w,z:g},
{x:c,y:w,z:g},{x:q,y:k,z:0},{x:f,y:k,z:0}],enabled:a.top.visible&&!a.front.visible},{fill:b.color(a.top.color).get(),vertexes:[{x:c,y:w,z:d},{x:e,y:w,z:d},{x:f,y:k,z:h},{x:q,y:k,z:h}],enabled:a.top.visible&&!a.back.visible}]});this.frameShapes.left[n]({"class":"highcharts-3d-frame highcharts-3d-frame-left",zIndex:a.left.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:e,y:l,z:g},{x:f,y:m,z:0},{x:f,y:m,z:h},{x:e,y:l,z:d}],enabled:a.left.visible&&!a.bottom.visible},
{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:e,y:w,z:d},{x:f,y:k,z:h},{x:f,y:k,z:0},{x:e,y:w,z:g}],enabled:a.left.visible&&!a.top.visible},{fill:b.color(a.left.color).brighten(-.1).get(),vertexes:[{x:e,y:l,z:d},{x:e,y:w,z:d},{x:e,y:w,z:g},{x:e,y:l,z:g}],enabled:a.left.visible},{fill:b.color(a.left.color).brighten(-.1).get(),vertexes:[{x:f,y:k,z:h},{x:f,y:m,z:h},{x:f,y:m,z:0},{x:f,y:k,z:0}],enabled:a.left.visible},{fill:b.color(a.left.color).get(),vertexes:[{x:e,y:l,z:g},{x:e,y:w,z:g},
{x:f,y:k,z:0},{x:f,y:m,z:0}],enabled:a.left.visible&&!a.front.visible},{fill:b.color(a.left.color).get(),vertexes:[{x:e,y:w,z:d},{x:e,y:l,z:d},{x:f,y:m,z:h},{x:f,y:k,z:h}],enabled:a.left.visible&&!a.back.visible}]});this.frameShapes.right[n]({"class":"highcharts-3d-frame highcharts-3d-frame-right",zIndex:a.right.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:c,y:l,z:d},{x:q,y:m,z:h},{x:q,y:m,z:0},{x:c,y:l,z:g}],enabled:a.right.visible&&!a.bottom.visible},
{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:c,y:w,z:g},{x:q,y:k,z:0},{x:q,y:k,z:h},{x:c,y:w,z:d}],enabled:a.right.visible&&!a.top.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:q,y:k,z:0},{x:q,y:m,z:0},{x:q,y:m,z:h},{x:q,y:k,z:h}],enabled:a.right.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:c,y:l,z:g},{x:c,y:w,z:g},{x:c,y:w,z:d},{x:c,y:l,z:d}],enabled:a.right.visible},{fill:b.color(a.right.color).get(),vertexes:[{x:c,y:w,z:g},{x:c,
y:l,z:g},{x:q,y:m,z:0},{x:q,y:k,z:0}],enabled:a.right.visible&&!a.front.visible},{fill:b.color(a.right.color).get(),vertexes:[{x:c,y:l,z:d},{x:c,y:w,z:d},{x:q,y:k,z:h},{x:q,y:m,z:h}],enabled:a.right.visible&&!a.back.visible}]});this.frameShapes.back[n]({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:a.back.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:c,y:l,z:d},{x:e,y:l,z:d},{x:f,y:m,z:h},{x:q,y:m,z:h}],enabled:a.back.visible&&!a.bottom.visible},
{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:e,y:w,z:d},{x:c,y:w,z:d},{x:q,y:k,z:h},{x:f,y:k,z:h}],enabled:a.back.visible&&!a.top.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:e,y:l,z:d},{x:e,y:w,z:d},{x:f,y:k,z:h},{x:f,y:m,z:h}],enabled:a.back.visible&&!a.left.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:c,y:w,z:d},{x:c,y:l,z:d},{x:q,y:m,z:h},{x:q,y:k,z:h}],enabled:a.back.visible&&!a.right.visible},{fill:b.color(a.back.color).get(),
vertexes:[{x:f,y:k,z:h},{x:q,y:k,z:h},{x:q,y:m,z:h},{x:f,y:m,z:h}],enabled:a.back.visible},{fill:b.color(a.back.color).get(),vertexes:[{x:e,y:l,z:d},{x:c,y:l,z:d},{x:c,y:w,z:d},{x:e,y:w,z:d}],enabled:a.back.visible}]});this.frameShapes.front[n]({"class":"highcharts-3d-frame highcharts-3d-frame-front",zIndex:a.front.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:e,y:l,z:g},{x:c,y:l,z:g},{x:q,y:m,z:0},{x:f,y:m,z:0}],enabled:a.front.visible&&!a.bottom.visible},
{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:c,y:w,z:g},{x:e,y:w,z:g},{x:f,y:k,z:0},{x:q,y:k,z:0}],enabled:a.front.visible&&!a.top.visible},{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:e,y:w,z:g},{x:e,y:l,z:g},{x:f,y:m,z:0},{x:f,y:k,z:0}],enabled:a.front.visible&&!a.left.visible},{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:c,y:l,z:g},{x:c,y:w,z:g},{x:q,y:k,z:0},{x:q,y:m,z:0}],enabled:a.front.visible&&!a.right.visible},{fill:b.color(a.front.color).get(),
vertexes:[{x:q,y:k,z:0},{x:f,y:k,z:0},{x:f,y:m,z:0},{x:q,y:m,z:0}],enabled:a.front.visible},{fill:b.color(a.front.color).get(),vertexes:[{x:c,y:l,z:g},{x:e,y:l,z:g},{x:e,y:w,z:g},{x:c,y:w,z:g}],enabled:a.front.visible}]})}});v.prototype.retrieveStacks=function(b){var h=this.series,a={},f,g=1;this.series.forEach(function(k){f=y(k.options.stack,b?0:h.length-1-k.index);a[f]?a[f].series.push(k):(a[f]={series:[k],position:g},g++)});a.totalStacks=g+1;return a};v.prototype.get3dFrame=function(){var g=this,
h=g.options.chart.options3d,a=h.frame,f=g.plotLeft,q=g.plotLeft+g.plotWidth,k=g.plotTop,m=g.plotTop+g.plotHeight,e=h.depth,c=function(a){a=b.shapeArea3d(a,g);return.5<a?1:-.5>a?-1:0},w=c([{x:f,y:m,z:e},{x:q,y:m,z:e},{x:q,y:m,z:0},{x:f,y:m,z:0}]),l=c([{x:f,y:k,z:0},{x:q,y:k,z:0},{x:q,y:k,z:e},{x:f,y:k,z:e}]),r=c([{x:f,y:k,z:0},{x:f,y:k,z:e},{x:f,y:m,z:e},{x:f,y:m,z:0}]),d=c([{x:q,y:k,z:e},{x:q,y:k,z:0},{x:q,y:m,z:0},{x:q,y:m,z:e}]),v=c([{x:f,y:m,z:0},{x:q,y:m,z:0},{x:q,y:k,z:0},{x:f,y:k,z:0}]),c=c([{x:f,
y:k,z:e},{x:q,y:k,z:e},{x:q,y:m,z:e},{x:f,y:m,z:e}]),t=!1,B=!1,u=!1,z=!1;[].concat(g.xAxis,g.yAxis,g.zAxis).forEach(function(a){a&&(a.horiz?a.opposite?B=!0:t=!0:a.opposite?z=!0:u=!0)});var x=function(a,c,d){for(var e=["size","color","visible"],b={},l=0;l<e.length;l++)for(var f=e[l],h=0;h<a.length;h++)if("object"===typeof a[h]){var m=a[h][f];if(void 0!==m&&null!==m){b[f]=m;break}}a=d;!0===b.visible||!1===b.visible?a=b.visible:"auto"===b.visible&&(a=0<c);return{size:y(b.size,1),color:y(b.color,"none"),
frontFacing:0<c,visible:a}},a={bottom:x([a.bottom,a.top,a],w,t),top:x([a.top,a.bottom,a],l,B),left:x([a.left,a.right,a.side,a],r,u),right:x([a.right,a.left,a.side,a],d,z),back:x([a.back,a.front,a],c,!0),front:x([a.front,a.back,a],v,!1)};"auto"===h.axisLabelPosition?(d=function(a,c){return a.visible!==c.visible||a.visible&&c.visible&&a.frontFacing!==c.frontFacing},h=[],d(a.left,a.front)&&h.push({y:(k+m)/2,x:f,z:0,xDir:{x:1,y:0,z:0}}),d(a.left,a.back)&&h.push({y:(k+m)/2,x:f,z:e,xDir:{x:0,y:0,z:-1}}),
d(a.right,a.front)&&h.push({y:(k+m)/2,x:q,z:0,xDir:{x:0,y:0,z:1}}),d(a.right,a.back)&&h.push({y:(k+m)/2,x:q,z:e,xDir:{x:-1,y:0,z:0}}),w=[],d(a.bottom,a.front)&&w.push({x:(f+q)/2,y:m,z:0,xDir:{x:1,y:0,z:0}}),d(a.bottom,a.back)&&w.push({x:(f+q)/2,y:m,z:e,xDir:{x:-1,y:0,z:0}}),l=[],d(a.top,a.front)&&l.push({x:(f+q)/2,y:k,z:0,xDir:{x:1,y:0,z:0}}),d(a.top,a.back)&&l.push({x:(f+q)/2,y:k,z:e,xDir:{x:-1,y:0,z:0}}),r=[],d(a.bottom,a.left)&&r.push({z:(0+e)/2,y:m,x:f,xDir:{x:0,y:0,z:-1}}),d(a.bottom,a.right)&&
r.push({z:(0+e)/2,y:m,x:q,xDir:{x:0,y:0,z:1}}),m=[],d(a.top,a.left)&&m.push({z:(0+e)/2,y:k,x:f,xDir:{x:0,y:0,z:-1}}),d(a.top,a.right)&&m.push({z:(0+e)/2,y:k,x:q,xDir:{x:0,y:0,z:1}}),f=function(a,c,d){if(0===a.length)return null;if(1===a.length)return a[0];for(var e=0,b=n(a,g,!1),l=1;l<b.length;l++)d*b[l][c]>d*b[e][c]?e=l:d*b[l][c]===d*b[e][c]&&b[l].z<b[e].z&&(e=l);return a[e]},a.axes={y:{left:f(h,"x",-1),right:f(h,"x",1)},x:{top:f(l,"y",-1),bottom:f(w,"y",1)},z:{top:f(m,"y",-1),bottom:f(r,"y",1)}}):
a.axes={y:{left:{x:f,z:0,xDir:{x:1,y:0,z:0}},right:{x:q,z:0,xDir:{x:0,y:0,z:1}}},x:{top:{y:k,z:0,xDir:{x:1,y:0,z:0}},bottom:{y:m,z:0,xDir:{x:1,y:0,z:0}}},z:{top:{x:u?q:f,y:k,xDir:u?{x:0,y:0,z:1}:{x:0,y:0,z:-1}},bottom:{x:u?q:f,y:m,xDir:u?{x:0,y:0,z:1}:{x:0,y:0,z:-1}}}};return a};b.Fx.prototype.matrixSetter=function(){var g;if(1>this.pos&&(b.isArray(this.start)||b.isArray(this.end))){var h=this.start||[1,0,0,1,0,0],a=this.end||[1,0,0,1,0,0];g=[];for(var f=0;6>f;f++)g.push(this.pos*a[f]+(1-this.pos)*
h[f])}else g=this.end;this.elem.attr(this.prop,g,null,!0)}});A(u,"parts-3d/Axis.js",[u["parts/Globals.js"]],function(b){function u(e,c,b){if(!e.chart.is3d()||"colorAxis"===e.coll)return c;var l=e.chart,h=y*l.options.chart.options3d.alpha,d=y*l.options.chart.options3d.beta,m=a(b&&e.options.title.position3d,e.options.labels.position3d);b=a(b&&e.options.title.skew3d,e.options.labels.skew3d);var g=l.frame3d,k=l.plotLeft,w=l.plotWidth+k,q=l.plotTop,n=l.plotHeight+q,l=!1,r=0,v=0,t={x:0,y:1,z:0};c=e.swapZ({x:c.x,
y:c.y,z:0});if(e.isZAxis)if(e.opposite){if(null===g.axes.z.top)return{};v=c.y-q;c.x=g.axes.z.top.x;c.y=g.axes.z.top.y;k=g.axes.z.top.xDir;l=!g.top.frontFacing}else{if(null===g.axes.z.bottom)return{};v=c.y-n;c.x=g.axes.z.bottom.x;c.y=g.axes.z.bottom.y;k=g.axes.z.bottom.xDir;l=!g.bottom.frontFacing}else if(e.horiz)if(e.opposite){if(null===g.axes.x.top)return{};v=c.y-q;c.y=g.axes.x.top.y;c.z=g.axes.x.top.z;k=g.axes.x.top.xDir;l=!g.top.frontFacing}else{if(null===g.axes.x.bottom)return{};v=c.y-n;c.y=g.axes.x.bottom.y;
c.z=g.axes.x.bottom.z;k=g.axes.x.bottom.xDir;l=!g.bottom.frontFacing}else if(e.opposite){if(null===g.axes.y.right)return{};r=c.x-w;c.x=g.axes.y.right.x;c.z=g.axes.y.right.z;k=g.axes.y.right.xDir;k={x:k.z,y:k.y,z:-k.x}}else{if(null===g.axes.y.left)return{};r=c.x-k;c.x=g.axes.y.left.x;c.z=g.axes.y.left.z;k=g.axes.y.left.xDir}"chart"!==m&&("flap"===m?e.horiz?(d=Math.sin(h),h=Math.cos(h),e.opposite&&(d=-d),l&&(d=-d),t={x:k.z*d,y:h,z:-k.x*d}):k={x:Math.cos(d),y:0,z:Math.sin(d)}:"ortho"===m?e.horiz?(t=
Math.cos(h),m=Math.sin(d)*t,h=-Math.sin(h),d=-t*Math.cos(d),t={x:k.y*d-k.z*h,y:k.z*m-k.x*d,z:k.x*h-k.y*m},h=1/Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z),l&&(h=-h),t={x:h*t.x,y:h*t.y,z:h*t.z}):k={x:Math.cos(d),y:0,z:Math.sin(d)}:e.horiz?t={x:Math.sin(d)*Math.sin(h),y:Math.cos(h),z:-Math.cos(d)*Math.sin(h)}:k={x:Math.cos(d),y:0,z:Math.sin(d)});c.x+=r*k.x+v*t.x;c.y+=r*k.y+v*t.y;c.z+=r*k.z+v*t.z;l=p([c],e.chart)[0];b&&(0>f(p([c,{x:c.x+k.x,y:c.y+k.y,z:c.z+k.z},{x:c.x+t.x,y:c.y+t.y,z:c.z+t.z}],e.chart))&&(k={x:-k.x,
y:-k.y,z:-k.z}),e=p([{x:c.x,y:c.y,z:c.z},{x:c.x+k.x,y:c.y+k.y,z:c.z+k.z},{x:c.x+t.x,y:c.y+t.y,z:c.z+t.z}],e.chart),l.matrix=[e[1].x-e[0].x,e[1].y-e[0].y,e[2].x-e[0].x,e[2].y-e[0].y,l.x,l.y],l.matrix[4]-=l.x*l.matrix[0]+l.y*l.matrix[2],l.matrix[5]-=l.x*l.matrix[1]+l.y*l.matrix[3]);return l}var x,v=b.addEvent,r=b.Axis,n=b.Chart,y=b.deg2rad,g=b.extend,t=b.merge,p=b.perspective,h=b.perspective3D,a=b.pick,f=b.shapeArea,q=b.splat,k=b.Tick,m=b.wrap;t(!0,r.prototype.defaultOptions,{labels:{position3d:"offset",
skew3d:!1},title:{position3d:null,skew3d:null}});v(r,"afterSetOptions",function(){var e;this.chart.is3d&&this.chart.is3d()&&"colorAxis"!==this.coll&&(e=this.options,e.tickWidth=a(e.tickWidth,0),e.gridLineWidth=a(e.gridLineWidth,1))});m(r.prototype,"getPlotLinePath",function(a){var c=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||"colorAxis"===this.coll||null===c)return c;var e=this.chart,b=e.options.chart.options3d,b=this.isZAxis?e.plotWidth:b.depth,e=e.frame3d,c=[this.swapZ({x:c[1],
y:c[2],z:0}),this.swapZ({x:c[1],y:c[2],z:b}),this.swapZ({x:c[4],y:c[5],z:0}),this.swapZ({x:c[4],y:c[5],z:b})],b=[];this.horiz?(this.isZAxis?(e.left.visible&&b.push(c[0],c[2]),e.right.visible&&b.push(c[1],c[3])):(e.front.visible&&b.push(c[0],c[2]),e.back.visible&&b.push(c[1],c[3])),e.top.visible&&b.push(c[0],c[1]),e.bottom.visible&&b.push(c[2],c[3])):(e.front.visible&&b.push(c[0],c[2]),e.back.visible&&b.push(c[1],c[3]),e.left.visible&&b.push(c[0],c[1]),e.right.visible&&b.push(c[2],c[3]));b=p(b,this.chart,
!1);return this.chart.renderer.toLineSegments(b)});m(r.prototype,"getLinePath",function(a){return this.chart.is3d()&&"colorAxis"!==this.coll?[]:a.apply(this,[].slice.call(arguments,1))});m(r.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,1));var c=arguments,e=c[2],b=[],c=this.getPlotLinePath(c[1]),e=this.getPlotLinePath(e);if(c&&e)for(var h=0;h<c.length;h+=6)b.push("M",c[h+1],c[h+2],"L",c[h+4],c[h+5],"L",e[h+4],e[h+
5],"L",e[h+1],e[h+2],"Z");return b});m(k.prototype,"getMarkPath",function(a){var c=a.apply(this,[].slice.call(arguments,1)),c=[u(this.axis,{x:c[1],y:c[2],z:0}),u(this.axis,{x:c[4],y:c[5],z:0})];return this.axis.chart.renderer.toLineSegments(c)});v(k,"afterGetLabelPosition",function(a){g(a.pos,u(this.axis,a.pos))});m(r.prototype,"getTitlePosition",function(a){var c=a.apply(this,[].slice.call(arguments,1));return u(this,c,!0)});v(r,"drawCrosshair",function(a){this.chart.is3d()&&"colorAxis"!==this.coll&&
a.point&&(a.point.crosshairPos=this.isXAxis?a.point.axisXpos:this.len-a.point.axisYpos)});v(r,"destroy",function(){["backFrame","bottomFrame","sideFrame"].forEach(function(a){this[a]&&(this[a]=this[a].destroy())},this)});r.prototype.swapZ=function(a,c){return this.isZAxis?(c=c?0:this.chart.plotLeft,{x:c+a.z,y:a.y,z:a.x-c}):a};x=b.ZAxis=function(){this.init.apply(this,arguments)};g(x.prototype,r.prototype);g(x.prototype,{isZAxis:!0,setOptions:function(a){a=t({offset:0,lineWidth:0},a);r.prototype.setOptions.call(this,
a);this.coll="zAxis"},setAxisSize:function(){r.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var b=this,c=b.chart;b.hasVisibleSeries=!1;b.dataMin=b.dataMax=b.ignoreMinPadding=b.ignoreMaxPadding=null;b.buildStacks&&b.buildStacks();b.series.forEach(function(e){if(e.visible||!c.options.chart.ignoreHiddenSeries)b.hasVisibleSeries=!0,e=e.zData,e.length&&(b.dataMin=Math.min(a(b.dataMin,
e[0]),Math.min.apply(null,e)),b.dataMax=Math.max(a(b.dataMax,e[0]),Math.max.apply(null,e)))})}});v(n,"afterGetAxes",function(){var a=this,c=this.options,c=c.zAxis=q(c.zAxis||{});a.is3d()&&(this.zAxis=[],c.forEach(function(c,b){c.index=b;c.isX=!0;(new x(a,c)).setScale()}))});m(r.prototype,"getSlotWidth",function(b,c){if(this.chart.is3d()&&c&&c.label&&this.categories&&this.chart.frameShapes){var e=this.chart,f=this.ticks,k=this.gridGroup.element.childNodes[0].getBBox(),d=e.frameShapes.left.getBBox(),
g=e.options.chart.options3d,e={x:e.plotWidth/2,y:e.plotHeight/2,z:g.depth/2,vd:a(g.depth,1)*a(g.viewDistance,0)},m,q,g=c.pos,n=f[g-1],f=f[g+1];0!==g&&n&&n.label.xy&&(m=h({x:n.label.xy.x,y:n.label.xy.y,z:null},e,e.vd));f&&f.label.xy&&(q=h({x:f.label.xy.x,y:f.label.xy.y,z:null},e,e.vd));f={x:c.label.xy.x,y:c.label.xy.y,z:null};f=h(f,e,e.vd);return Math.abs(m?f.x-m.x:q?q.x-f.x:k.x-d.x)}return b.apply(this,[].slice.call(arguments,1))})});A(u,"parts-3d/Series.js",[u["parts/Globals.js"]],function(b){var u=
b.addEvent,x=b.perspective,v=b.pick;u(b.Series,"afterTranslate",function(){this.chart.is3d()&&this.translate3dPoints()});b.Series.prototype.translate3dPoints=function(){var b=this.chart,n=v(this.zAxis,b.options.zAxis[0]),u=[],g,t,p;for(p=0;p<this.data.length;p++)g=this.data[p],n&&n.translate?(t=n.isLog&&n.val2lin?n.val2lin(g.z):g.z,g.plotZ=n.translate(t),g.isInside=g.isInside?t>=n.min&&t<=n.max:!1):g.plotZ=0,g.axisXpos=g.plotX,g.axisYpos=g.plotY,g.axisZpos=g.plotZ,u.push({x:g.plotX,y:g.plotY,z:g.plotZ});
b=x(u,b,!0);for(p=0;p<this.data.length;p++)g=this.data[p],n=b[p],g.plotX=n.x,g.plotY=n.y,g.plotZ=n.z}});A(u,"parts-3d/Column.js",[u["parts/Globals.js"]],function(b){function u(b){var a=b.apply(this,[].slice.call(arguments,1));this.chart.is3d&&this.chart.is3d()&&(a.stroke=this.options.edgeColor||a.fill,a["stroke-width"]=n(this.options.edgeWidth,1));return a}function x(b,a,f){var h=this.chart.is3d&&this.chart.is3d();h&&(this.options.inactiveOtherPoints=!0);b.call(this,a,f);h&&(this.options.inactiveOtherPoints=
!1)}var v=b.addEvent,r=b.perspective,n=b.pick,y=b.Series,g=b.seriesTypes,t=b.svg,p=b.wrap;p(g.column.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.translate3dShapes()});p(b.Series.prototype,"alignDataLabel",function(b){arguments[3].outside3dPlot=arguments[1].outside3dPlot;b.apply(this,[].slice.call(arguments,1))});p(b.Series.prototype,"justifyDataLabel",function(b){return arguments[2].outside3dPlot?!1:b.apply(this,[].slice.call(arguments,1))});
g.column.prototype.translate3dPoints=function(){};g.column.prototype.translate3dShapes=function(){var b=this,a=b.chart,f=b.options,g=f.depth||25,k=(f.stacking?f.stack||0:b.index)*(g+(f.groupZPadding||1)),m=b.borderWidth%2?.5:0;a.inverted&&!b.yAxis.reversed&&(m*=-1);!1!==f.grouping&&(k=0);k+=f.groupZPadding||1;b.data.forEach(function(e){e.outside3dPlot=null;if(null!==e.y){var c=e.shapeArgs,f=e.tooltipPos,h;[["x","width"],["y","height"]].forEach(function(a){h=c[a[0]]-m;0>h&&(c[a[1]]+=c[a[0]]+m,c[a[0]]=
-m,h=0);h+c[a[1]]>b[a[0]+"Axis"].len&&0!==c[a[1]]&&(c[a[1]]=b[a[0]+"Axis"].len-c[a[0]]);if(0!==c[a[1]]&&(c[a[0]]>=b[a[0]+"Axis"].len||c[a[0]]+c[a[1]]<=m)){for(var d in c)c[d]=0;e.outside3dPlot=!0}});"rect"===e.shapeType&&(e.shapeType="cuboid");c.z=k;c.depth=g;c.insidePlotArea=!0;f=r([{x:f[0],y:f[1],z:k}],a,!0)[0];e.tooltipPos=[f.x,f.y]}});b.z=k};p(g.column.prototype,"animate",function(b){if(this.chart.is3d()){var a=arguments[1],f=this.yAxis,g=this,k=this.yAxis.reversed;t&&(a?g.data.forEach(function(a){null!==
a.y&&(a.height=a.shapeArgs.height,a.shapey=a.shapeArgs.y,a.shapeArgs.height=1,k||(a.shapeArgs.y=a.stackY?a.plotY+f.translate(a.stackY):a.plotY+(a.negative?-a.height:a.height)))}):(g.data.forEach(function(a){null!==a.y&&(a.shapeArgs.height=a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,g.options.animation))}),this.drawDataLabels(),g.animate=null))}else b.apply(this,[].slice.call(arguments,1))});p(g.column.prototype,"plotGroup",function(b,a,f,g,k,m){this.chart.is3d()&&m&&!this[a]&&
(this.chart.columnGroup||(this.chart.columnGroup=this.chart.renderer.g("columnGroup").add(m)),this[a]=this.chart.columnGroup,this.chart.columnGroup.attr(this.getPlotBox()),this[a].survive=!0);return b.apply(this,Array.prototype.slice.call(arguments,1))});p(g.column.prototype,"setVisible",function(b,a){var f=this,g;f.chart.is3d()&&f.data.forEach(function(b){g=(b.visible=b.options.visible=a=void 0===a?!b.visible:a)?"visible":"hidden";f.options.data[f.data.indexOf(b)]=b.options;b.graphic&&b.graphic.attr({visibility:g})});
b.apply(this,Array.prototype.slice.call(arguments,1))});g.column.prototype.handle3dGrouping=!0;v(y,"afterInit",function(){if(this.chart.is3d()&&this.handle3dGrouping){var b=this.options,a=b.grouping,f=b.stacking,g=n(this.yAxis.options.reversedStacks,!0),k=0;if(void 0===a||a){a=this.chart.retrieveStacks(f);k=b.stack||0;for(f=0;f<a[k].series.length&&a[k].series[f]!==this;f++);k=10*(a.totalStacks-a[k].position)+(g?f:-f);this.xAxis.reversed||(k=10*a.totalStacks-k)}b.zIndex=k}});p(g.column.prototype,"pointAttribs",
u);p(g.column.prototype,"setState",x);g.columnrange&&(p(g.columnrange.prototype,"pointAttribs",u),p(g.columnrange.prototype,"setState",x),g.columnrange.prototype.plotGroup=g.column.prototype.plotGroup,g.columnrange.prototype.setVisible=g.column.prototype.setVisible);p(y.prototype,"alignDataLabel",function(b){if(this.chart.is3d()&&this instanceof g.column){var a=arguments,f=a[4],a=a[1],h={x:f.x,y:f.y,z:this.z},h=r([h],this.chart,!0)[0];f.x=h.x;f.y=a.outside3dPlot?-9E9:h.y}b.apply(this,[].slice.call(arguments,
1))});p(b.StackItem.prototype,"getStackBox",function(g,a){var f=g.apply(this,[].slice.call(arguments,1));if(a.is3d()){var h={x:f.x,y:f.y,z:0},h=b.perspective([h],a,!0)[0];f.x=h.x;f.y=h.y}return f})});A(u,"parts-3d/Pie.js",[u["parts/Globals.js"]],function(b){var u=b.deg2rad,x=b.pick,v=b.seriesTypes,r=b.svg;b=b.wrap;b(v.pie.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var n=this,g=n.options,t=g.depth||0,p=n.chart.options.chart.options3d,h=p.alpha,
a=p.beta,f=g.stacking?(g.stack||0)*t:n._i*t,f=f+t/2;!1!==g.grouping&&(f=0);n.data.forEach(function(b){var k=b.shapeArgs;b.shapeType="arc3d";k.z=f;k.depth=.75*t;k.alpha=h;k.beta=a;k.center=n.center;k=(k.end+k.start)/2;b.slicedTranslation={translateX:Math.round(Math.cos(k)*g.slicedOffset*Math.cos(h*u)),translateY:Math.round(Math.sin(k)*g.slicedOffset*Math.cos(h*u))}})}});b(v.pie.prototype.pointClass.prototype,"haloPath",function(b){var n=arguments;return this.series.chart.is3d()?[]:b.call(this,n[1])});
b(v.pie.prototype,"pointAttribs",function(b,r,g){b=b.call(this,r,g);g=this.options;this.chart.is3d()&&!this.chart.styledMode&&(b.stroke=g.edgeColor||r.color||this.color,b["stroke-width"]=x(g.edgeWidth,1));return b});b(v.pie.prototype,"drawDataLabels",function(b){if(this.chart.is3d()){var n=this.chart.options.chart.options3d;this.data.forEach(function(b){var g=b.shapeArgs,p=g.r,h=(g.start+g.end)/2;b=b.labelPosition;var a=b.connectorPosition,f=-p*(1-Math.cos((g.alpha||n.alpha)*u))*Math.sin(h),q=p*(Math.cos((g.beta||
n.beta)*u)-1)*Math.cos(h);[b.natural,a.breakAt,a.touchingSliceAt].forEach(function(a){a.x+=q;a.y+=f})})}b.apply(this,[].slice.call(arguments,1))});b(v.pie.prototype,"addPoint",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});b(v.pie.prototype,"animate",function(b){if(this.chart.is3d()){var n=arguments[1],g=this.options.animation,t=this.center,p=this.group,h=this.markerGroup;r&&(!0===g&&(g={}),n?(p.oldtranslateX=p.translateX,p.oldtranslateY=
p.translateY,n={translateX:t[0],translateY:t[1],scaleX:.001,scaleY:.001},p.attr(n),h&&(h.attrSetters=p.attrSetters,h.attr(n))):(n={translateX:p.oldtranslateX,translateY:p.oldtranslateY,scaleX:1,scaleY:1},p.animate(n,g),h&&h.animate(n,g),this.animate=null))}else b.apply(this,[].slice.call(arguments,1))})});A(u,"parts-3d/Scatter.js",[u["parts/Globals.js"]],function(b){var u=b.Point,x=b.seriesType,v=b.seriesTypes;x("scatter3d","scatter",{tooltip:{pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"}},
{pointAttribs:function(r){var n=v.scatter.prototype.pointAttribs.apply(this,arguments);this.chart.is3d()&&r&&(n.zIndex=b.pointCameraDistance(r,this.chart));return n},axisTypes:["xAxis","yAxis","zAxis"],pointArrayMap:["x","y","z"],parallelArrays:["x","y","z"],directTouch:!0},{applyOptions:function(){u.prototype.applyOptions.apply(this,arguments);void 0===this.z&&(this.z=0);return this}})});A(u,"parts-3d/VMLRenderer.js",[u["parts/Globals.js"]],function(b){var u=b.addEvent,x=b.Axis,v=b.SVGRenderer,r=
b.VMLRenderer;r&&(b.setOptions({animate:!1}),r.prototype.face3d=v.prototype.face3d,r.prototype.polyhedron=v.prototype.polyhedron,r.prototype.elements3d=v.prototype.elements3d,r.prototype.element3d=v.prototype.element3d,r.prototype.cuboid=v.prototype.cuboid,r.prototype.cuboidPath=v.prototype.cuboidPath,r.prototype.toLinePath=v.prototype.toLinePath,r.prototype.toLineSegments=v.prototype.toLineSegments,r.prototype.arc3d=function(b){b=v.prototype.arc3d.call(this,b);b.css({zIndex:b.zIndex});return b},
b.VMLRenderer.prototype.arc3dPath=b.SVGRenderer.prototype.arc3dPath,u(x,"render",function(){this.sideFrame&&(this.sideFrame.css({zIndex:0}),this.sideFrame.front.attr({fill:this.sideFrame.color}));this.bottomFrame&&(this.bottomFrame.css({zIndex:1}),this.bottomFrame.front.attr({fill:this.bottomFrame.color}));this.backFrame&&(this.backFrame.css({zIndex:0}),this.backFrame.front.attr({fill:this.backFrame.color}))}))});A(u,"masters/highcharts-3d.src.js",[],function(){})});


/*******************************************************************************\
****** @grafi - GRAFICAS ********************************************************
\*******************************************************************************/

// OLD - gtorta
function axgracake(idobj,titul,mag,mat)
{	MAT=[];
	for(F=0; F<mat.length; F++)
	{	MAT.push({name:mat[F][0],y:mat[F][1]});
	}
	Highcharts.chart(idobj,
	{	chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:false,type:'pie'},
		title:{text:titul},tooltip:{pointFormat:'{series.name}: <b>{point.percentage:.1f}%</b>'},
		plotOptions:
		{	pie:
			{	allowPointSelect:true,cursor:'pointer',dataLabels:
				{	enabled:true,format:'<b>{point.name}</b>: {point.percentage:.1f} %',
				style:{color:(Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'}
				}
			}
		},series:[{name:mag,colorByPoint:true,data:MAT}]
	});
}

//OLD - gareamissing
function axgraarea(idobj,titul,mag,dat,subtitul,simb,grups)
{	MAT=[];
	for(F=0; F<dat.length; F++)
	{	VEC=[];
		for(C=1;C<dat[F].length; C++)
		{	VEC.push(dat[F][C]);
		}
		MAT.push({name:dat[F][0],data:VEC});
	}
	Highcharts.chart(idobj,
	{	chart:{type:'area',spacingBottom:30},
		title:{text:titul},
		subtitle:
		{	text:subtitul,floating:true,
			align:'right',verticalAlign:'bottom',y:15
		},
		legend:
		{	layout:'vertical',align:'left',verticalAlign: 'top',
			x:100,y:70,floating:true,borderWidth:1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis:{categories:grups},
		yAxis:{title:{text:mag},labels:{formatter:function (){return this.value;}}},
		tooltip:
		{	formatter:function ()
			{	return '<b>'+this.series.name+'</b><br/>'+this.x+': '+this.y+' '+simb;	}
		},
		plotOptions:{area:{fillOpacity:0.5}},
		credits:{enabled:false},series:MAT
	});
}

// GRAFICA DE AREA BASICA - OLD gareabasic
function axgrabasic(idobj,titul,mag,dat,subtitul,simb)
{	MAT=[];
	for(F=0; F<dat.length; F++)
	{	VEC=[];
		for(C=1;C<dat[F].length; C++)
		{	VEC.push(dat[F][C]);
		}
		MAT.push({name:dat[F][0],data:VEC});
	}
	Highcharts.chart(idobj,
	{	chart:{type:'area'},title:{text:titul},subtitle:{text:subtitul},xAxis:{allowDecimals:false,labels:
		{formatter:function (){return this.value;}}},
		yAxis:
		{	title:{text:mag},labels:{formatter:function ()
			{return this.value+' '+simb;}}
		},
		tooltip:{pointFormat:'{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'},
		plotOptions:
		{	area:
			{	pointStart:0,marker:
				{	enabled:false,symbol:'circle',radius:2,states:{hover:{enabled:true}}}
			}
		},series:MAT
	});
}

function axgrabar(obj,titul,mag,dat,subtitul,simb)
{	Highcharts.chart(obj,
	{	chart:{type:'column'},
		title:{text:titul},
		subtitle:{text:subtitul},
		xAxis:{type:'category',labels:{rotation:-45,style:{fontSize:'13px',fontFamily:tex}}},
		yAxis:{min:0,title:{text:mag}},
		legend:{enabled:false},
		tooltip:{pointFormat:'{point.y:.1f} '+simb},
		series:[{name:'Population',
			data:dat,
			dataLabels:{enabled:true,rotation:-90,color:colsec,align:'right',format:'{point.y:.1f}',y:10,style:{fontSize:'15px',fontFamily:tex}}
		}]
	});
}

function axgrabar3d(obj,titul,mag,dat,subtitul,simb)
{	let P;
	let grup=[],d1=[];
	for(P=0;P<dat.length;P++)
	{	grup.push(dat[P][0]);
		d1.push(dat[P][1]);
	}
	//console.log(grup);
	//console.log(d1);
	Highcharts.chart(obj,
	{	chart:{type:'column',options3d:{enabled:true,alpha:10,beta:25,depth:70}},
		title:{text:titul},
		subtitle:{text:subtitul},
		plotOptions:{column:{depth:25}},
		xAxis:{categories:grup,labels:{skew3d:true,style:{fontSize:'16px'}}},
		yAxis:{title:{text:null}},
		series:[{name:simb,data:d1}]
	});
}

function axgrabi(obj,titul,mag,dat,subtitul,simb,grup,dat2,mag2,simb2)
{	Highcharts.chart(obj, 
	{	chart:{zoomType:'xy'},
		title:{text:titul},
		subtitle:{text:subtitul},
		tooltip:{shared:true},
		legend:{layout:'vertical',align:'left',x:120,verticalAlign:'top',y:100,floating:true,backgroundColor:(Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'},
		xAxis:[{categories:grup,crosshair:true}],
		yAxis:
		[	{	labels:{format:'{value} '+simb,style:{color:Highcharts.getOptions().colors[1]}},
				title:{text:mag,style:{color:Highcharts.getOptions().colors[1]}}
			},
			{	title:{text:mag2,style:{color:Highcharts.getOptions().colors[0]}},
				labels:{format:'{value} '+simb2,style:{color:Highcharts.getOptions().colors[0]}},opposite:true
			}
		],
		series:
		[	{	name:mag2,type:'column',yAxis:1,
				data:dat,tooltip:{valueSuffix:' '+simb}
			},
			{	name:mag,type:'spline',
				data:dat2,tooltip:{valueSuffix:' '+simb2}
			}
		]
	});
}
