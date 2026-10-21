# Food Delivery Application

This is a full-stack food delivery app with React/Vite frontend and Express/MongoDB backend.

## Local Development

1. Install dependencies for both client and server:

```bash
cd "c:\codes\java codes\FOOD DELIVERY APPLICATION\client"
npm install
cd "..\server"
npm install
```

2. Start the backend and frontend separately:

```bash
cd "c:\codes\java codes\FOOD DELIVERY APPLICATION\server"
npm run dev
```

```bash
cd "c:\codes\java codes\FOOD DELIVERY APPLICATION\client"
npm run dev
```

3. Open the app in the browser at `http://localhost:5173`.

## Production Build

From the `server` folder:

```bash
cd "c:\codes\java codes\FOOD DELIVERY APPLICATION\server"
npm run start:prod
```

This will:
- install client dependencies if needed
- build the Vite client into `client/dist`
- start the Express server with `NODE_ENV=production`

Then open `http://localhost:5000`.

## Deployment Notes

- The backend serves client static files in production.
- The client API uses `/api` by default in production.
- Netlify proxies `/api/*` requests to the Render backend, so the browser does not make cross-origin API requests.
- `render.yaml` configures the backend service. Set `MONGO_URI` to your MongoDB Atlas connection string and set a strong `JWT_SECRET` in Render before deploying.
- Vercel is configured with `vercel.json` for a static client build and Node API function.
- Set Vercel environment variables: `MONGO_URI`, `JWT_SECRET`, and any other secrets.

### Deploying to Netlify and Render

1. In Render, create a new Blueprint from this repository and apply the `render.yaml` configuration. Enter `MONGO_URI` and `JWT_SECRET` when prompted; keep both values private.
2. Wait for the Render web service health check to pass at `/`.
3. In Netlify, trigger a new deploy so it applies the `/api/*` proxy rule from `netlify.toml`.
4. Test the deployed site. API calls should use the Netlify site's own `/api` path and be forwarded to Render.

### Deploying to Vercel

1. Install Vercel CLI if needed:

```bash
npm install -g vercel
```

2. From the repo root, deploy:

```bash
vercel deploy --prod
```

3. On Vercel, confirm the project uses `server/server.js` for API routes and `client/package.json` for static builds.

## Environment Variables

Create `server/.env` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/foodDelivery
JWT_SECRET=mysecretkey
NODE_ENV=development
```
