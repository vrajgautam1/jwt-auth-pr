const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const app = express();
const port = 3000;

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const mainRoutes = require('./routers/adminroutes');
app.use(mainRoutes);

app.listen(port, (err) => {
    db();
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server running at http://localhost:${port}`);
});
