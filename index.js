const express = require('express');
const path = require('path');
const exphb = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//Init middleware
app.use(logger);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Handlebars Middleware
app.engine('handlebars', exphb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res)=> res.render('index', {
    title:"Home",
    members: members
}));
app.get('/about', (req, res)=> res.render('about', {
    title:"About"
}));
app.get('/add', (req, res)=> res.render('addmember', {
    title:"Add Member"
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));