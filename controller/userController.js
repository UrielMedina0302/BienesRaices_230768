import {check, validationResult} from 'express-validator'
import User from '../models/User.js'
import { generateID } from '../helpers/tokens.js'
import { emailAfterRegister } from '../helpers/email.js'


const formularioLogin = (req,res)=>{
    res.render("auth/login",{
        page : "Ingresa a la plataforma"
    })
}
const formularioRegister =(req,res)=>{
    res.render('auth/register',{
        page :"Crea una nueva cuenta",
        
 })};

const createNewUser= async(req, res)=>{
        //Validación de los campos que reciben del formulario
       
   await check(`nombre_usuario`).notEmpty().withMessage("El nombre del usuario es un campo obligatorio").run(req)
   await check("correo_usuario").notEmpty().withMessage("El correo electronico es un campo obligatorio").isEmail().withMessage("El correo electronico no tiene el formato obligatoprio").run(req)
   await check("contraseña_usuario").notEmpty().withMessage("La contraseña es un campo obligatorio").isLength({min:8}).withMessage("La contraseña debe ser  de almenos 8 caracteres").run(req)
   await check("repite_contraseña").equals(req.body.contraseña_usuario).withMessage("la contraseña no coinciden").run(req)

        let result= validationResult(req)
    
        //return res.json
        //validación que el resultado este vacío
        if(!result.isEmpty()){
            return res.render('auth/register',{
                page: 'Error al intentar crear la cuenta',
               
                errors: result.array(),
                user:{
                    name: req.body.nombre_usuario,
                    email: req.body.email
                }
                
            })
        }
    
    
        //Desestructurar los parametros del request
        const {nombre_usuario: name, correo_usuario:email, contraseña_usuario:password}= req.body
    
        //Verificar que el usuario no existe previamente en la bd
        const existingUser= await User.findOne({where: {email}})
    
        console.log(existingUser);
    
        //este error no lo encuentra el express.validator, sino nosotros mismos con la base de datos
        if(existingUser){
            return res.render("auth/register",{
                page: `Error al intentar crear la cuenta de usuario`,
                
                errores: [{msg: `El correo ${email} ya se encuentra registrado`}],
                user:{
                    name: req.body.nombre_usuario,
                    email: req.body.email
                
                }
            })
        }
    
    
        console.log("Registrando a nuevo usuario");
        console.log(req.body);
    
        const newUser= await User.create({
            name,
            email,
            password,
            token: generateID()
        });
        
        emailAfterRegister({
            name: newUser.name,
            email: newUser.email,
            token: newUser.token
        })
        
        res.render('templates/message',{
            
            page: 'cuenta creada Correctamente',
            msg: 'Hemos Enviado un Email de Confirmación, '
        })
    
        //res.json(newUser);
        //return;
    }
    

    const Confirm= async(req,res)=>{
        //validacion token 
        
    
        //
        const {token}=req.params;
        console.log("Error")
        console.log(`Intentando confirmar la cuenta con el token: ${token}`);
        
    
        const userWithToken = await User. findOne({where: {token}})
        console.log(userWithToken)
    
        if(!userWithToken){
            return res.render('auth/accountConfirmed',{
                page: 'Error al confirmar tu cuenta',
                msg:'hubo un error al confirmar tu cuenta, intenta de nuevo',
                error: true
            })
            
        }
        userWithToken.token=null;
        userWithToken.confirmed=true;
        await userWithToken.save();
    
        res.render('auth/accountConfirmed',{
            page: 'Cuenta confirmada',
            msg: 'La cuenta fue confirmada correctamente',
            error:false
        })
    
    }
    const formularioPasswordRecovery = (req, res) =>  {
        res.render('auth/passwordRecovery', {
                page : "Recuperación de Contraseña"
         })};

export {formularioLogin,formularioRegister, createNewUser,Confirm,formularioPasswordRecovery}