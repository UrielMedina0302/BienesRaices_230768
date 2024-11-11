

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
const createNewUser= (req, res)=>{
console.log("Registrando a un nuevo usuario.")
console.log(req.body)
}
export {formularioLogin,formularioRegister,formularioPasswordRecovery, createNewUser}