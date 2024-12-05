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

         const passwordReset = async(request, response) =>{

            //console.log("Validando los datos para la recuperación de la contraseña")
            //Validación de los campos que se reciben del formulario
            //Validación de Frontend
            await check('correo_usuario').notEmpty().withMessage("El correo electrónico es un campo obligatorio.").isEmail().withMessage("El correo electrónico no tiene el formato de: usuario@dominio.extesion").run(request)
            let result = validationResult(request)
            
            //Verificamos si hay errores de validacion
            if(!result.isEmpty())
            {
                console.log("Hay errores")
                return response.render("auth/passwordRecovery", {
                    page: 'Error al intentar resetear la contraseña',
                    errors: result.array()
                   
                })
            }
            
            //Desestructurar los parametros del request
            const {correo_usuario:email} = request.body
    
            //Validacion de BACKEND
            //Verificar que el usuario no existe previamente en la bd
            const existingUser = await User.findOne({ where: { email, confirmed:1}})
    
            if(!existingUser)
            { 
                
                return response.render("auth/passwordRecovery", {
                page: 'Error, no existe una cuenta autentificada asociada al correo electrónico ingresado.',
                
                errors: [{msg: `Por favor revisa los datos e intentalo de nuevo` }],
                user: {
                    email:email
                }
            })
            }
                
                console.log("El usuario si existe en la bd")
                //Registramos los datos en la base de datos.
                existingUser.password="";
                existingUser.token=  generateID();
                existingUser.save();
              
    
            //Enviar el correo de confirmación
            emailChangePassword({
                name: existingUser.name,
                email: existingUser.email,
                token: existingUser.token   
            })
    
    
            response.render('templates/message', {
                
                page: 'Solicitud de actualización de contraseña aceptada',
                msg: 'Hemos enviado un correo a : <poner el correo aqui>, para la la actualización de tu contraseña.'
            })
    
    
        }
    
    
        const verifyTokenPasswordChange =async(request, response)=>{
    
            const {token} = request.params;
            const userTokenOwner = await User.findOne({where :{token}})
    
            if(!userTokenOwner)
                { 
                    response.render('templates/message', {
                        
                        page: 'Error',
                        msg: 'El token ha expirado o no existe.'
                    })
                }
        
             
           
            response.render('auth/reset-password', {
                
                page: 'Restablece tu password',
                msg: 'Por favor ingresa tu nueva contraseña'
            })
        }
    
        const updatePassword = async(request, response)=>{
    
            const {token}= request.params
    
            //Validar campos de contraseñas
            await check('new_password').notEmpty().withMessage("La contraseña es un campo obligatorio.").isLength({min:8}).withMessage("La constraseña debe ser de almenos 8 carácteres.").run(request)
            await check("confirm_new_password").equals(request.body.new_password).withMessage("La contraseña y su confirmación deben coincidir").run(request)
    
            let result = validationResult(request)
    
            if(!result.isEmpty())
                {
                    return response.render("auth/reset-password", {
                        page: 'Error al intentar crear la Cuenta de Usuario',
                        errors: result.array(),
                        csrfToken: request.csrfToken(),
                        token: token
                    })
                }
    
            //Actualizar en BD el pass 
            const userTokenOwner = await User.findOne({where: {token}}) 
            userTokenOwner.password=request.body.new_password
            userTokenOwner.token=null;
            userTokenOwner.save();  // update tb_users set password=new_pasword where token=token;
    
            //Renderizar la respuesta
            response.render('auth/accountConfirmed', {
                page: 'Excelente..!',
                msg: 'Tu contraseña ha sido confirmada de manera exitosa.',
                error: false
            })
    
        }
    
    
    export {formularioLogin, formularioRegister, formularioPasswordRecovery, createNewUser, Confirm, passwordReset, verifyTokenPasswordChange, updatePassword}