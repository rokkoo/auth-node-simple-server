import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mykey';

export const haveToken = (req, res, next) => {
  let token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    res.status(401).send('Inserst autorization token');
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(401).send({ error: 'Invalid token', err });
    } else {
      res.send({ message: 'Corred token', user });
    }
  });
};
