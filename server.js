const app = require('./app');

app.set('port', 30);
const server = app.listen(app.get('port'), () => {
    console.log(`O servidor foi iniciado na porta: ${server.address().port}`);
});