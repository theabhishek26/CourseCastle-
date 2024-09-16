const jwt=require('jsonwebtoken');
const jwtPass='SECr3t'

const authenticateJwt=(req,res,next)=>
    {
        const authHeader=req.headers.authorization
        // This header is typically formatted as: Authorization: Bearer <token>
    
        if(authHeader)
        {
            const input_token=authHeader.split(' ')[1];
            jwt.verify(input_token,jwtPass,(err,decoded)=>
            {
                if(err)
                return res.status(403).send('token authorization failed');
                
                //By setting req.user, you make the user’s information available throughout the rest of the request-handling pipeline, allowing other middleware functions or route handlers to access the authenticated user's data.It has no relation with next()
                req.user=decoded;
    
                // The next() function is used to continue the request-response cycle, moving on to the next middleware function or route handler
                next();
            });
        }
        else{
            res.status(401).send('invalid token');
        }
    }

    module.exports={
        authenticateJwt,
        jwtPass
    }