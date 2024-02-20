import express from 'express';
import fs from 'fs/promises';

const app = express();

app.get('/', async (request, response) => {
    const buf = await fs.readFile('./index.html');
    const html = buf.toString();

    response.send(html);
});

// app.use('/src', express.static('./src'));
// app.use('/images', express.static('./images'));
app.use('/', express.static('./'));

app.listen(5501);
console.log('listening to port 5501')