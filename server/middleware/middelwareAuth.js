import JWT from 'jsonwebtoken';
import authSchema from '../model/modelAuth.js'

export const requiresignin=(req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();

    } catch (error) {
        console.log(error)
    }

}

export const isAdmin = async (req, res, next) => {
    try {
      const user = await authSchema.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
        console.log(user.role)
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };