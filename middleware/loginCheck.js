const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        console.log("Checking token");
        console.log(req.headers);
        
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    }
    catch(err) {
        console.log(`Exception:${err}`);
        return res.status(401).send({message: "Falha na authenticação!"});
    }
}