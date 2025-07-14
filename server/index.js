const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');
const CLIENT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');

// Initialize Google Cloud Storage
const gcs = new Storage();
const bucketName = `content-forge-uploads-${process.env.GOOGLE_CLOUD_PROJECT || 'eloquent-ratio-465214-r9'}`;
const bucket = gcs.bucket(bucketName);

// Configure multer for file uploads (memory storage for Cloud Storage)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Serve static files
app.use('/data', express.static(DATA_DIR));
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/template', express.static(path.join(__dirname, '..', 'public', 'template')));

// File upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { type } = req.body;
    const targetType = type || 'general';
    
    // Generate unique filename
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(req.file.originalname);
    const fileName = `${targetType}/${uniqueName}`;
    
    // Upload to Google Cloud Storage
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
      public: true,
    });

    stream.on('error', (err) => {
      console.error('❌ Upload stream error:', err);
      res.status(500).json({ error: 'Upload failed' });
    });

    stream.on('finish', () => {
      // Make the file publicly accessible
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      console.log(`✅ File uploaded to Cloud Storage: ${publicUrl}`);
      res.json({ 
        success: true, 
        url: publicUrl,
        filename: uniqueName 
      });
    });

    // Write the buffer to the stream
    stream.end(req.file.buffer);
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// List uploaded files endpoint
app.get('/api/uploads', async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    
    const fileList = files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      created: file.metadata.timeCreated,
      updated: file.metadata.updated,
      publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`
    }));

    res.json({
      success: true,
      bucket: bucketName,
      files: fileList
    });
  } catch (error) {
    console.error('❌ Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Save site content
app.post('/api/sites/:siteId', async (req, res) => {
  try {
    const { siteId } = req.params;
    const siteData = req.body;
    
    // Add timestamp
    siteData.lastUpdated = new Date().toISOString();
    
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    const filePath = path.join(DATA_DIR, `${siteId}.json`);
    await fs.writeFile(filePath, JSON.stringify(siteData, null, 2));
    
    console.log(`✅ Content saved for ${siteId}`);
    res.json({ success: true, message: `Content saved for ${siteId}` });
  } catch (error) {
    console.error('❌ Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Load site content
app.get('/api/sites/:siteId', async (req, res) => {
  try {
    const { siteId } = req.params;
    const filePath = path.join(DATA_DIR, `${siteId}.json`);
    
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('❌ Error loading content:', error);
    res.status(404).json({ error: 'Site content not found' });
  }
});

// Serve site templates
app.get('/sites/:siteId', async (req, res) => {
  try {
    const templatePath = path.join(__dirname, '..', 'public', 'template', 'index.html');
    res.sendFile(templatePath);
  } catch (error) {
    res.status(404).send('Template not found');
  }
});

// Serve React app (admin interface)
app.use(express.static(CLIENT_BUILD_DIR));

app.get('*', (req, res) => {
  const indexPath = path.join(CLIENT_BUILD_DIR, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send(`
        <h1>Content-Forge Server</h1>
        <p>React app not built yet. Run 'npm run build' first.</p>
        <p>For development, run 'npm run dev'</p>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Content-Forge server running on http://localhost:${PORT}`);
  console.log(`📝 Admin: http://localhost:${PORT}`);
  console.log(`🌐 Sites: http://localhost:${PORT}/sites/:siteId`);
});