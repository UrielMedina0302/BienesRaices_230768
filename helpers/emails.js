import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { text } from 'express'

dotenv.config({path: '.env'})

const emailAfterRegister = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //console.log(data)
    const {email, name, token} = newUserData

    //Enviar el email
    await transport.sendMail({
        from: 'bienes_raices_230852.com',
        to: email,
        subject: 'Confirmación de email',
        text: 'Para poder acceder a la plataforma necesitarás...',
        html: `
        <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"><span style="color: #31e981">¡Estás a solo un paso de poder acceder a tu cuenta en</span> <span style="color: #379392"> Bienes Raíces!</span></h1>
            <img src="https://th.bing.com/th/id/R.2f9dcdb66e3797a905539bff3c91fc3b?rik=NkTf6I3SAsyo8Q&pid=ImgRaw&r=0" width="100%">
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"> Muchas gracias por unirse a nuestra página de Bienes Raíces, el mejor sitio donde podrás buscar, comprar y ofertar propiedades a través de Internet.</p>
            <br>
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Haz click en el siguiente enlace para poder comenzar a acceder a tu cuenta y poder comprar y/o vender propiedades, ahora mismo:</p>
            <br>
            <center><h1><a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}" style="text-decoration: none; color: #379392">Confirme su cuenta</a></h1></center>
            <br>
            <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">Si no has creado la cuenta, por favor ignora este mensaje.</p>
            <br>
            <h2>Atentamente:</h2>
            <h3 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"><center><span style="color: #338A89">Equipo de Bienes Raíces</span></h3>`
    })
}

const emailChangePassword = async ( userData ) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const {email, name, token} = userData

    //Enviar el email
    await transport.sendMail({
        from: 'bienesraices-matricula.com',
        to: email,
        subject: 'Solicitud de actualización de constraseña en Bienes Raíces',
        text: `Por favor, actualiza tu contraseña para ingresar a la plataforma`,
        html: ` <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000000; text-align: center;">
        Hola, <span style="color: #603280;">${name}</span>, <br>
        Usted ha reportado el olvido o extravío de su contraseña para acceder a su cuenta de Bienes Raíces.
        </p>
        <div style="text-align: center;">
            <img src="https://th.bing.com/th/id/R.461bfe7162c98a819d156af2aa07d65f?rik=ghQX1xZRp2XyqA&pid=ImgRaw&r=0" alt="Recuperación de Contraseña" style="width: 80%; margin: 20px auto; border: 2px solid #78737a;">
        </div>
        <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color: #000000; text-align: center;">
            Por lo que requerimos que ingrese a la siguiente liga: 
            <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/passwordRecovery/${token}" style="color: #379392; text-decoration: none; color: #379392"">Actualizar Contraseña</a>
        </p>
        <p style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color: #000000; text-align: center;">
            Si no ha solicitado ningún cambio de contraseña, ignora este mensaje.
        </p>`
    })

}



export {emailAfterRegister, emailChangePassword}