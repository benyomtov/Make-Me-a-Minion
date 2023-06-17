const { connect, connection } = require('mongoose');

const connectionURI = connect('mongodb://localhost:27017/minionDB');

connect(connectionURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

module.exports = connection;