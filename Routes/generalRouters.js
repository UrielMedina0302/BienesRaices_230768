import express from 'express';
const router = express.Router();

//Probamos las rutas para poder presentar mensajes al usuario a travez del navegador
router.get("/", function(req, res){
    res.send("Hola mundo atravez del navegador")
})
router.get("/QuienSoy",function(req, res){
    res.json({"estudiante": "Uriel Abdallah Medina Torres",
    "carrera":"TI DSM",
    "grado": "4°",
    "grupo": "B",
     "asignatura":"Aplicación Orientada a Objetos (AWOS)"   
    });
    
})
export default router;