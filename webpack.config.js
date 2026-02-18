const path = require('path'); //For resolving file paths
module.exports = {
    entry: './client/client.js', //The 'main' file of your bundle
    mode: 'development', //Development mode lets us debug client code
    watchOptions: {
        aggregateTimeout: 200, //Prevents multiple rebuilds on save
    },
    output: {
        //Where to put the bundle
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js', //The name of the bundle file
    }
}