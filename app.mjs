import express from 'express';
import bodyPaser from 'body-parser';
import jwt from 'jsonwebtoken';
import { haveToken } from './middlewares';

const app = express();
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

const SECRET_KEY = 'mykey';
const SERVER_PORT = 8060;

app.post('/login', (req, res) => {
  const { user } = req.body;
  console.log(user);
  const token = jwt.sign({ user: user }, SECRET_KEY, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });

  res.send({ token });
});

// After use haveToken middleware every http method need token bearer
app.use(haveToken);

app.post('/results', (req, res) => {
  const { info } = req.body;
});

app.listen(SERVER_PORT, () =>
  console.log(`server running at port ${SERVER_PORT}`)
);
