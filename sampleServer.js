const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

app.get('/', async (req, res) => {
    const auth = req.headers.authorization;
    console.log(auth)
    if(!auth || !auth.startsWith('Bearer')){
        return res.status(401).send("Unauthorized Access");
    }

    const token  = auth.split(' ')[1];
    
    const verify = await jwt.verify(token, 'The key to create the jwt token')
    console.log(verify)
    res.send("done")
})

app.listen(3000, () => console.log("Dummy server on 3000"))
