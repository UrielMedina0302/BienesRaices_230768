import {check, validationResult} from 'express-validator'
import User from '../models/User.js'
import { generatetID } from '../helpers/tokens.js'

const formularioLogin = (req,res)=>{
    res.render("auth/login",{
        page : "Ingresa a la plataforma"
    })
}
const formularioRegister =(req,res)=>{
    res.render('auth/register',{
 page :"Crea una nueva cuenta"
    })};

const formularioPasswordRecovery= (req,res)=>{
    res.render('auth/passwordRecovery',{
 page : "Recupera tu contraseña"
    })};
const createNewUser= async(req, res)=>{
    //Validación de los campos que reciben del formulario
    await check('nombre_usuario').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('correo_usuario').isEmail.withMessage('Eso no parece un email').run(req)
    await check('ontraseña_usuario').isLength({min: 8}).withMessage('La constraseña debe de ser de al menos 8 caracteres').run(req)

    let resultado = validationResult(req)
    res.json(resultado.array());


    const user = await User.create(req.body);
    
    //console.log("Registrando a un nuevo usuario.")
    console.log(req.body)

    res.json(User)
}
export {formularioLogin,formularioRegister,formularioPasswordRecovery, createNewUser}