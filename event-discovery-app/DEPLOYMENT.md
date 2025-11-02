# Deployment Guide

This guide covers multiple deployment options for the Event Discovery App.

## Option 1: Vercel (Recommended)

Vercel is the easiest and recommended way to deploy this Next.js application.

### Method A: Deploy via Vercel Dashboard

1. **Push to Git Repository**
   ```bash
   cd event-discovery-app
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!**
   - Your app will be live at `https://your-project-name.vercel.app`
   - Automatic deployments on every push to main branch

### Method B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd event-discovery-app
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - What's your project's name? event-discovery-app
   - In which directory is your code located? ./
   - Want to override the settings? No

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Option 2: Railway

Railway offers easy deployment with automatic HTTPS and custom domains.

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize and Deploy**
   ```bash
   cd event-discovery-app
   railway init
   railway up
   ```

4. **Generate Domain**
   ```bash
   railway domain
   ```

Your app will be live at the generated Railway domain.

## Option 3: Render

Render provides free hosting for web services.

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Configure:
     - **Name**: event-discovery-app
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

Your app will be live at `https://your-app-name.onrender.com`

## Option 4: Netlify

Netlify is another great option for Next.js apps.

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   cd event-discovery-app
   netlify init
   netlify deploy --prod
   ```

Alternatively, use the Netlify dashboard to import from Git.

## Option 5: Self-Hosted (VPS/Cloud)

Deploy to your own server (AWS, DigitalOcean, etc.)

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Set up PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "event-discovery-app" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Set up SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

This application doesn't require any environment variables for basic functionality. However, if you add features like:

- Database connection
- Authentication
- External APIs

You'll need to configure them in your deployment platform:

**Vercel**: Project Settings → Environment Variables
**Railway**: Project → Variables
**Render**: Environment → Environment Variables
**Netlify**: Site Settings → Environment Variables

## Post-Deployment Checklist

- ✅ Application loads successfully
- ✅ All pages are accessible (home, event detail, create event)
- ✅ API endpoints work correctly
- ✅ Search and filter functionality works
- ✅ Event creation works
- ✅ Distance calculation works (requires HTTPS for geolocation)
- ✅ Responsive design works on mobile devices

## Troubleshooting

### Build Fails
- Check Node.js version (requires 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`

### API Routes Not Working
- Ensure the deployment platform supports Next.js API routes
- Check server logs for errors

### Geolocation Not Working
- Geolocation requires HTTPS (works on localhost and HTTPS deployments)
- Users must grant location permission in their browser

### Performance Issues
- Enable caching in your deployment platform
- Consider adding a CDN for static assets
- Monitor with Vercel Analytics or similar tools

## Monitoring and Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Railway
```bash
railway domain add your-domain.com
```

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Configure DNS records

## Scaling Considerations

For production use with high traffic:

1. **Add a Database**: Replace in-memory storage with PostgreSQL, MongoDB, or similar
2. **Add Caching**: Implement Redis for caching
3. **Add Authentication**: Implement user authentication
4. **Add Rate Limiting**: Protect API endpoints
5. **Add Monitoring**: Use Sentry, LogRocket, or similar
6. **Add Testing**: Implement unit and integration tests

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Railway: [docs.railway.app](https://docs.railway.app)
- Render: [render.com/docs](https://render.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
