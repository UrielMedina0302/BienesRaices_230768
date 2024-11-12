

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
    await check('nombre_usuario').notEmpty().run(req)
    let resultado = vaidationResult(req)
    res.json(resultado.array());
    
console.log("Registrando a un nuevo usuario.")
console.log(req.body)
const user = await UserActivation.create(req.body)
res.json
}
export {formularioLogin,formularioRegister,formularioPasswordRecovery, createNewUser}