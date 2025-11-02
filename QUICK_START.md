# Quick Start Guide - Event Discovery App

## 🚀 Get Started in 3 Steps

### Step 1: Navigate to Project
```bash
cd /vercel/sandbox/event-discovery-app
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Open [http://localhost:3000](http://localhost:3000)

---

## 📋 What You'll See

### Home Page (/)
- **5 pre-loaded sample events** from different cities
- **Search bar** - Try searching for "tech" or "startup"
- **Location filter** - Try filtering by "San Francisco" or "New York"
- **Distance calculation** - Allow location access to see distances
- **Create Event button** - Click to add a new event

### Event Detail Page (/events/:id)
- Click any event card to see full details
- View participant count and availability
- See distance from your location
- Registration button (UI demo)

### Create Event Page (/events/create)
- Fill out the form to create a new event
- All fields are validated
- Optional coordinates for distance calculation
- Redirects to event detail page on success

---

## 🧪 Quick Test Scenarios

### Test 1: Browse Events
1. Open http://localhost:3000
2. Scroll through the event list
3. Notice the different locations and dates

### Test 2: Search Functionality
1. Type "tech" in the search bar
2. See filtered results
3. Clear search to see all events again

### Test 3: Location Filter
1. Type "San Francisco" in location filter
2. See only SF events
3. Try other cities: "New York", "Austin", "Seattle", "Miami"

### Test 4: Distance Calculation
1. Click "Allow" when browser asks for location
2. See distances appear on event cards
3. Distances calculated using Haversine formula

### Test 5: View Event Details
1. Click on any event card
2. See full event information
3. Notice participant progress bar
4. See distance from your location

### Test 6: Create New Event
1. Click "Create Event" button
2. Fill out the form:
   - Title: "My Test Event"
   - Description: "This is a test event for demonstration"
   - Location: "Your City, State"
   - Date: Select a future date
   - Max Participants: 25
3. Click "Create Event"
4. You'll be redirected to the new event's detail page

### Test 7: Form Validation
1. Go to Create Event page
2. Try submitting empty form - see validation errors
3. Try entering a past date - see error
4. Try short title/description - see errors

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📁 Key Files to Explore

### Backend
- `app/api/events/route.ts` - GET/POST events API
- `app/api/events/[id]/route.ts` - GET event by ID API
- `lib/eventStore.ts` - In-memory data storage
- `lib/utils.ts` - Utility functions (distance calc, validation)

### Frontend
- `app/page.tsx` - Home page with event list
- `app/events/[id]/page.tsx` - Event detail page
- `app/events/create/page.tsx` - Create event form

### Types
- `types/event.ts` - TypeScript interfaces

---

## 🌐 API Testing

### Test API with curl

**Get all events:**
```bash
curl http://localhost:3000/api/events
```

**Search events:**
```bash
curl "http://localhost:3000/api/events?search=tech"
```

**Filter by location:**
```bash
curl "http://localhost:3000/api/events?location=San%20Francisco"
```

**Get event by ID:**
```bash
curl http://localhost:3000/api/events/1
```

**Create new event:**
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Test Event",
    "description": "Created via API for testing purposes",
    "location": "Test City, TS",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "date": "2025-12-01T18:00:00",
    "maxParticipants": 30
  }'
```

---

## 🚀 Deploy to Vercel (1 Minute)

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /vercel/sandbox/event-discovery-app
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
```bash
# Initialize git
cd /vercel/sandbox/event-discovery-app
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <your-repo-url>
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import your repository
# 4. Click "Deploy"
```

---

## 📱 Mobile Testing

1. Start dev server: `npm run dev`
2. Find your local IP: `ifconfig` or `ipconfig`
3. Open on mobile: `http://YOUR_IP:3000`
4. Test responsive design and geolocation

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Geolocation not working
- Requires HTTPS (works on localhost and production)
- Check browser permissions
- Try in different browser

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Next Steps

1. **Read the full README**: `cat README.md`
2. **Check deployment guide**: `cat DEPLOYMENT.md`
3. **Review project summary**: `cat /vercel/sandbox/PROJECT_SUMMARY.md`
4. **Explore the code**: Start with `app/page.tsx`
5. **Deploy to production**: Follow deployment guide

---

## ✅ Verification Checklist

- [ ] Development server starts successfully
- [ ] Home page loads with 5 sample events
- [ ] Search functionality works
- [ ] Location filter works
- [ ] Can view event details
- [ ] Can create new event
- [ ] Form validation works
- [ ] Geolocation works (if allowed)
- [ ] Responsive design works on mobile
- [ ] Build completes successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)

---

## 🎉 You're Ready!

The Event Discovery App is fully functional and ready to use. Explore the features, test the API, and deploy to production when ready!

For detailed documentation, see:
- `README.md` - Full project documentation
- `DEPLOYMENT.md` - Deployment instructions
- `/vercel/sandbox/PROJECT_SUMMARY.md` - Technical overview
