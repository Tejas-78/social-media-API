import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import swagger from 'swagger-ui-express';
import swaggerDocument from './swagger.json'assert{type:'json'};
import cors from 'cors'

//imports all the routers
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';

import { ApplicationError } from './error/application.error.js';

import jwtAuth from './src/middleware/jwt-Auth.middleware.js';
import { logger,loggerMiddleware } from './src/middleware/logger.middlware.js';

const app = express();
app.use(bodyParser.json())

let corsOption = {
  origin:'http://localhost:5500'
}
app.use(cors(corsOption))
app.use(loggerMiddleware);

app.use(express.static(path.join(path.resolve(),'public')));


app.use('/api/user',userRouter)
app.use('/api/post',jwtAuth,postRouter)
app.use('/api/comment',jwtAuth,commentRouter)
app.use('/api/like',jwtAuth,likeRouter)
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

// error handler middleware
app.use((err,req,res,next)=>{
      console.log(err)
      if(err instanceof ApplicationError){
          res.status(err.code)
          .send(err.message)
      }

      res.status(500)
      .send('oops! somthing went Wrong, Pleas try again later')
    //use logger here to store error
      logger.error(`timestamp:${new Date()},request Url :${req.url}, error message: ${err.message}`);

  });
app.listen(4000,()=>{
    console.log('server listning on port 4000');
})