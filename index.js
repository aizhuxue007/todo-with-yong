const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}))

app.use(methodOverride('_method'));

let todoItems = [];

let id = 0;

app.get('/', (req, res) => {
    res.render('index', {todoItems});
});

app.post('/', (req, res) => {
    id++;
    const today = new Date();
    const newItem = req.body.item;
    console.log(newItem);
    todoItems.push({ id, date: today, item: newItem });
    res.redirect('/');
});

app.delete('/', (req, res) => {
    console.log(req.body[0])
    if (req.body.id !== undefined) {
        todoItems = todoItems.filter(todo => {
            console.log(todo.id);
            console.log(req.body);
            return todo.id !== req.body.id; 
        });
    }
    
    // if todoItem has index of checkId
        // delete todoItem[checkId]
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('todo app live!! baby');
})