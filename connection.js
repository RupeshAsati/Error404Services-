var sql = require('mssql');
var connection = sql.connect({
    server: 'localhost', //sql database host name
    user: 'sa', //sql database user name
    password: 'sapassword@123', //sql database password
    port: '1433',
    database: 'Error404DB' //sql database name
});

module.exports = connection;