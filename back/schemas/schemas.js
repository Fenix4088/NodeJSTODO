const {Schema, model} = require('mongoose');

const Todo = new Schema({
    title: {type: String, required: true},
    done: {type: Boolean, default: false}
})

const User = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todos: [Todo]
})


module.exports={
    USER: model('User', User),
    TODO: model('Todo', Todo),
}