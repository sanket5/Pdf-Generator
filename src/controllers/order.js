
const fetch = require('node-fetch');

module.exports = getOrders = ()=>{
    return fetch('https://jsonplaceholder.typicode.com/todos/')
}