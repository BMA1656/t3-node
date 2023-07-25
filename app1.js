const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const nombre = queryObject.nombre;

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Formulario de Saludo</title>
      </head>
      <body>
        <h1>Formulario de Saludo</h1>
        <form action="/saludo" method="get">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre">
          <button type="submit">Enviar</button>
        </form>
      </body>
      </html>
    `);
  } else if (req.url.startsWith('/saludo')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    let mensaje;
    if (nombre) {
      mensaje = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Saludo Personalizado</title>
        </head>
        <body>
          <p>Hola, ${nombre} bienvenido al servidor HTTP en Node.js.</p>
        </body>
        </html>
      `;
    } else {
      mensaje = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Saludo Invitado</title>
        </head>
        <body>
          <p>Hola, Invitado! bienvenido al servidor HTTP en Node.js.</p>
        </body>
        </html>
      `;
    }
    res.end(mensaje);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor de Saludo escuchando en http://localhost:${port}`);
});
