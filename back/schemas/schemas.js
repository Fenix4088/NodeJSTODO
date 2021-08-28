const {Schema, model} = require('mongoose');

const User = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todos: [{ref: 'Todo'}]
})

const Todo = new Schema({
    title: {type: String, required: true},
    done: {type: Boolean, default: false}
})


module.exports={
    userSchema: model('User', User),
    todoSchema: model('Todo', Todo),
}