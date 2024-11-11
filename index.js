//ECMA Script 6
//CommonJS
import express from "express";
//const express = require(`express`);//Importa la librería para crear un servidor web
import generalRouters from './Routes/generalRouters.js'
import userRouters from './Routes/userRouters.js'
//const=express
//Instanciar nuestra aplicación web
const app =express()
//carpeta publica
app.use(express.static('./public'));
//Configuramos nuestro servidor web
const port =3000;
app.listen(port,()=>{
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);
})

//habilitar pug
app.set('view engine','pug')
app.set('views', './views')
app.use('/auth/',userRouters);
// Probamos las rutas para poder presentar mensajes  al usario a traves del navegador 
app.use('/',generalRouters);
// Probamos las rutas para poder presentar mensajes  al usario a traves del navegador 





