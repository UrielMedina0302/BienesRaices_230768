//ECMA Script 6
//CommonJS
import express from "express";
//const express = require(`express`);//Importa la librería para crear un servidor web
import generalRouters from './Routes/generalRouters.js'
import userRouters from './Routes/userRouters.js'
import db from './db/config.js'
import cookieParser from "cookie-parser";
import csrf from 'csurf'
import dotenv  from "dotenv"



dotenv.config({path: '.env'})
//const=express
//Instanciar nuestra aplicación web
const app =express()

//habilitar pug
app.set('view engine','pug')
app.set('views', './views')


//carpeta publica
app.use(express.static('./public'));

//Conexion a la base de datos
try{
await db.authenticate();
db.sync();
console.log("Conexión exitosa a la base de datos")
}
catch(error){
    console.log(error)
}

// Habilitar Cookie Parser 
app.use(cookieParser());
// Habilitar CSRF
app.use(csrf({cookie: true}));

//Habilitamos la lectura de datos desde formularios
app.use(express.urlencoded({extended: true}))

//Configuramos nuestro servidor web
const port = process.env.BACKEND_PORT;
app.listen(port,()=>{
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);
})


app.use('/auth/',userRouters);
// Probamos las rutas para poder presentar mensajes  al usario a traves del navegador 
app.use('/',generalRouters);
// Probamos las rutas para poder presentar mensajes  al usario a traves del navegador 

//


