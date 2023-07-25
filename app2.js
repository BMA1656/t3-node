const http = require('http');

const server = http.createServer((req, res) => {
  const urlParams = new URLSearchParams(req.url.slice(req.url.indexOf('?')));
  const edad = parseInt(urlParams.get('edad'));

  if (req.url === '/') {
    handleHomePage(req, res);
  } else if (req.url.startsWith('/verificar-edad')) {
    handleVerification(req, res, edad);
  } else {
    handle404Page(req, res);
  }
});

function handleHomePage(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verificacion de Edad</title>
    </head>
    <body>
      <h1>Verificacion de Edad</h1>
      <form action="/verificar-edad" method="get">
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required>
        <button type="submit">Verificar</button>
      </form>
    </body>
    </html>
  `);
}

function handleVerification(req, res, edad) {
  if (isNaN(edad)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Verificacion de Edad</title>
      </head>
      <body>
        <h1>Error</h1>
        <p>La edad debe ser un número válido.</p>
      </body>
      </html>
    `);
  } else {
    let mensaje;
    if (edad >= 18) {
      mensaje = 'La persona es mayor de edad.';
    } else {
      mensaje = 'La no es mayor de edad.';
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Verificacion de Edad</title>
      </head>
      <body>
        <h1>Sabias que?</h1>
        <p>${mensaje}</p>
      </body>
      </html>
    `);
  }
}

function handle404Page(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Error 404, Página no encontrada');
}

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
