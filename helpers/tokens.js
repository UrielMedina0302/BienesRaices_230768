const generatetID = () => + Math.random(32).substring(2) + Date.now().toString(32)
export{
    generatetID
}