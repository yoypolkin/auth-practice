import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passport/index.js';
import loginRouter from './routes/auth.js';
import registerRouter from './routes/register.js';
import logoutRouter from './routes/logout.js';
import secretsRouter from './routes/secrets.js';

const app = express();
const port = 3000;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

/**
 * Initializes passport on every request. Meaning adds some methods and fields to the express's session object.
 *
 * session() reads user object under the express's session. If no key .user was found. Leaves it empty.
 * isAuthorised() will be false in this case.
 */
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.use('/auth', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/secrets', secretsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
