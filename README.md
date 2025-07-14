# Content-Forge CMS

A modern, full-stack Content Management System built with React and Node.js, designed for creating and managing multiple websites with customizable branding and content.

## ✨ Features

### 🎨 **Multi-Site Management**
- Manage multiple websites from a single admin interface
- Site-specific branding (logos, colors, content)
- Independent content management per site

### 🛠️ **Comprehensive Content Editor**
- **Contact Information** - Phone, email with custom icons
- **Navigation Menus** - Fully customizable menu items
- **Branding** - Logo upload, primary/secondary colors
- **Hero Sections** - Background images, titles, call-to-action buttons
- **How It Works** - Step-by-step process sections
- **How to Qualify** - Requirements with custom icon uploads
- **Why Choose Us** - Benefits with custom SVG icons
- **Customer Testimonials** - Reviews with ratings and customer photos
- **Complaints Procedure** - Regulatory compliance sections
- **Footer Management** - Contact info, quick links, social media

### 🎯 **Advanced UI Components**
- **Custom Loan Slider** - Interactive range slider with custom SVG thumb
- **Login/Signup Modals** - Professional authentication interface
- **Image Upload System** - Google Cloud Storage integration
- **Responsive Design** - Mobile-first responsive layouts
- **Custom SVG Icons** - Footer contact icons, social media icons

### ☁️ **Cloud Integration**
- **Google Cloud Storage** - Persistent image storage
- **Cloud Run Deployment** - Scalable containerized deployment
- **Multi-stage Docker** - Optimized production builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Content-Forge
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```
   This runs both the backend server and React development server concurrently.

4. **Access the application**
   - Admin Interface: `http://localhost:3000`
   - Site 1: `http://localhost:3000/sites/site1`
   - Site 2: `http://localhost:3000/sites/site2`

### Production Build

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Local Docker

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

### Google Cloud Run

```bash
# Deploy using the working deployment script
./deploy-working.sh
```

## 📁 Project Structure

```
Content-Forge/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript interfaces
│   └── build/              # Production build output
├── server/                 # Node.js backend
│   └── index.js            # Express server
├── public/                 # Static files and templates
│   ├── data/               # Site configuration files
│   ├── template/           # HTML templates
│   └── uploads/            # File uploads (local development)
├── docker-compose.yml      # Docker composition
├── Dockerfile              # Production Docker image
└── deploy-working.sh       # Cloud deployment script
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=production
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET=your-bucket-name
```

### Site Configuration

Sites are configured through JSON files in `/public/data/`:
- `site1.json` - Configuration for first site
- `site2.json` - Configuration for second site

Each site configuration includes:
- Contact information
- Navigation structure
- Branding (colors, logos)
- Content sections
- Footer configuration

## 🎨 Customization

### Adding New Sites

1. Create a new JSON configuration file in `/public/data/`
2. Add the site ID to the `SITE_IDS` array in `/client/src/types/Site.ts`
3. The site will be automatically available at `/sites/your-site-id`

### Custom Styling

- **Global Styles**: Modify `/client/src/index.css`
- **Component Styles**: Individual component CSS in `/client/src/components/`
- **Template Styles**: HTML template styling in `/public/template/index.html`

### Brand Colors

Each site supports custom branding:
- Primary color (buttons, links, accents)
- Secondary color (hover states)
- Automatic color application across all components

## 📤 Deployment Options

### 1. Google Cloud Run (Recommended)
```bash
./deploy-working.sh
```

### 2. Traditional Hosting
```bash
npm run build
# Deploy the built files to your hosting provider
```

### 3. Docker Container
```bash
docker build -t content-forge .
docker run -p 3000:3000 content-forge
```

## 🔒 Security Features

- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Secure file storage with Google Cloud

## 🛣️ API Endpoints

- `GET /api/sites/:siteId` - Get site configuration
- `POST /api/sites/:siteId` - Update site configuration
- `POST /api/upload/:type` - Upload files to cloud storage
- `GET /api/uploads/:type` - List uploaded files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Deployment Guide](./DEPLOYMENT.md)
- [Google Cloud Documentation](https://cloud.google.com/run/docs)
- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)

---

Built with ❤️ using React, Node.js, and Google Cloud Platform