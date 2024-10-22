//ECMA Script 6
//CommonJS
import express from`express`;

//const=express
const express = require(`express`);//Importa la librería para crear un servidor web

//Instanciar nuestra aplicación web
const app =express();

//Configuramos nuestro servidor web
const port =3000;
app.listen(port,()=>{
    console.log(`La aplicación ha iniciado en el puerto: ${port}`);
})

//Probamos las rutas para poder presentar mensajes al usuario a travez del navegador
app.get("/", function(req, res){
    res.send("Hola mundo atravez del navegador")
})

app.get("/QuienSoy",function(req, res){
    res.json({"estudiante": "Uriel Abdallah Medina Torres",
    "carrera":"TI DSM",
    "grado": "4°",
    "grupo": "B",
     "asignatura":"Aplicación Orientada a Objetos (AWOS)"   
    });
    
})