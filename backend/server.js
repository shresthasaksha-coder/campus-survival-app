
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { housing, dining, filterListings } from './data/listings.js';
import { resources, safety } from './data/resources.js';

const root = path.resolve(
  fileURLToPath(new URL('../dist/', import.meta.url))
);

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml'
};

export function createServer() {
  return http.createServer(async (req, res) => {

    const url = new URL(req.url, 'http://localhost');

    const json = (status, data) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(JSON.stringify(data));
    };

    if (req.method !== 'GET') {
      return json(405, {
        error: 'Only GET requests are supported.'
      });
    }

    // Health API
    if (url.pathname === '/api/health') {
      return json(200, { status: 'ok' });
    }

    // =====================================
    // Housing and Dining APIs
    // =====================================

    for (const [name, items] of Object.entries({ housing, dining })) {

      if (url.pathname === `/api/${name}`) {

        if ((url.searchParams.get('q') || '').length > 200) {
          return json(400, {
            error: 'Search must be 200 characters or fewer.'
          });
        }

        const results = filterListings(items, url.searchParams);

        return json(200, {
          items: results,
          total: results.length
        });
      }

      if (url.pathname.startsWith(`/api/${name}/`)) {
        const id = url.pathname.split('/')[3];
        const item = items.find(i => i.id === id);

        return item
          ? json(200, item)
          : json(404, { error: 'Listing not found.' });
      }
    }

    // =====================================
    // Campus Resources and Safety APIs
    // =====================================

    for (const [name, items] of Object.entries({ resources, safety })) {

      // GET /api/resources
      // GET /api/safety

      if (url.pathname === `/api/${name}`) {

        const q = url.searchParams.get('q') || '';
        const category = url.searchParams.get('category') || '';

        if (q.length > 200) {
          return json(400, {
            error: 'Search must be 200 characters or fewer.'
          });
        }

        const results = items.filter(item => {

          const matchesSearch =
            `${item.name} ${item.category} ${item.description}`
              .toLowerCase()
              .includes(q.toLowerCase());

          const matchesCategory =
            !category ||
            item.category.toLowerCase() === category.toLowerCase();

          return matchesSearch && matchesCategory;
        });

        return json(200, {
          items: results,
          total: results.length
        });
      }

      // GET /api/resources/:id
      // GET /api/safety/:id

      if (url.pathname.startsWith(`/api/${name}/`)) {

        const id = url.pathname.split('/')[3];
        const item = items.find(item => item.id === id);

        return item
          ? json(200, item)
          : json(404, { error: 'Resource not found.' });
      }
    }

    // Unknown API route
    if (url.pathname.startsWith('/api/')) {
      return json(404, {
        error: 'API route not found.'
      });
    }

    // =====================================
    // Frontend Static File Server
    // =====================================

    try {
      const requested = decodeURIComponent(url.pathname);
      const target = path.resolve(root, '.' + requested);

      if (
        target !== root &&
        !target.startsWith(root + path.sep)
      ) {
        return json(403, { error: 'Forbidden' });
      }

      const file = path.extname(target)
        ? target
        : path.join(root, 'index.html');

      const body = await readFile(file);

      res.writeHead(200, {
        'Content-Type':
          mime[path.extname(file)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff'
      });

      res.end(body);

    } catch {
      return json(404, {
        error: 'Page not found. Run npm run build, or use npm run dev.'
      });
    }
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  createServer().listen(
    Number(process.env.PORT) || 3001,
    () => console.log(
      'Campus Survival API: http://localhost:3001'
    )
  ); 
}  
