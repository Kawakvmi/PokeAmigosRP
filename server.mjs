import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://127.0.0.1');
    let requested = decodeURIComponent(url.pathname);
    if (requested === '/') requested = '/index.html';
    const file = path.resolve(root,'.'+requested);
    if (!file.startsWith(root + path.sep) || /(^|[\\/])\./.test(requested) || !['.html','.css','.js','.png','.jpg','.webp','.ico'].includes(path.extname(file))) {res.writeHead(404);return res.end('Página não encontrada');}
    if (!(await stat(file)).isFile()) throw new Error('not a file');
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada');}
}).listen(port,'127.0.0.1',()=>console.log(`Poke Amigos RP: http://127.0.0.1:${port}`));
