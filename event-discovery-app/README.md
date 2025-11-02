# Event Discovery App

A full-stack event discovery application built with Next.js, TypeScript, and Tailwind CSS. Users can browse events, view details, create new events, and calculate distances from their location.

## Features

### Backend (API Routes)
- ✅ **POST /api/events** - Create new events
- ✅ **GET /api/events** - List all events with optional location and search filters
- ✅ **GET /api/events/:id** - Get specific event details
- ✅ In-memory storage with sample data
- ✅ Full TypeScript type safety
- ✅ Input validation

### Frontend
- ✅ **Event List View** - Browse all events with search and filter
- ✅ **Event Detail View** - View complete event information
- ✅ **Create Event Form** - Add new events with validation
- ✅ **Distance Calculation** - Calculate distance from user's location using Haversine formula
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Responsive Design** - Mobile-first responsive layout

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: In-memory (no database required)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd event-discovery-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
event-discovery-app/
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── route.ts          # GET/POST /api/events
│   │       └── [id]/route.ts     # GET /api/events/:id
│   ├── events/
│   │   ├── [id]/page.tsx         # Event detail page
│   │   └── create/page.tsx       # Create event page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (event list)
│   └── globals.css               # Global styles
├── lib/
│   ├── eventStore.ts             # In-memory event storage
│   └── utils.ts                  # Utility functions
├── types/
│   └── event.ts                  # TypeScript interfaces
└── package.json
```

## API Documentation

### Create Event
```
POST /api/events
Content-Type: application/json

{
  "title": "Event Title",
  "description": "Event description",
  "location": "City, State",
  "latitude": 37.7749,      // Optional
  "longitude": -122.4194,   // Optional
  "date": "2025-11-15T18:00:00",
  "maxParticipants": 50
}
```

### List Events
```
GET /api/events?location=San%20Francisco&search=tech
```

### Get Event by ID
```
GET /api/events/:id
```

## Features in Detail

### Distance Calculation
The app uses the Haversine formula to calculate the distance between the user's location and event locations. Users are prompted to share their location, and distances are displayed in kilometers.

### Search & Filter
- **Search**: Filter events by title, description, or location
- **Location Filter**: Filter events by specific location
- Real-time filtering as you type

### Event Management
- Create events with detailed information
- View participant counts and availability
- See past vs. upcoming events
- Visual progress bars for participant capacity

### Validation
- Client-side and server-side validation
- Date validation (events must be in the future)
- Required field validation
- User-friendly error messages

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository on [Vercel](https://vercel.com):
   - Go to https://vercel.com/new
   - Import your repository
   - Vercel will automatically detect Next.js and configure the build settings

3. Click "Deploy"

Your app will be live at `https://your-project-name.vercel.app`

### Alternative Deployment Options

**Railway**:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

**Render**:
1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm run build`
4. Set start command: `npm start`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

No environment variables are required for basic functionality. The app uses in-memory storage.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
