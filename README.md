# V-SOFT Vehicle Price Prediction Platform

A modern, AI-powered web application for predicting vehicle prices using machine learning. Built with React, TypeScript, and Tailwind CSS, designed to interface with a FastAPI backend for real-time price predictions.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with light/dark mode support
- **AI-Powered Predictions**: XGBoost-based machine learning model integration
- **File Upload**: Drag-and-drop CSV upload with validation
- **Real-time Processing**: Live progress tracking and instant results
- **Data Visualization**: Interactive results display with statistics
- **Download Results**: Export predictions as CSV files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Technology Stack

### Frontend (This Repository)
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Shadcn/ui** - High-quality, accessible UI components
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

### Backend (Your FastAPI Application)
- **FastAPI** - High-performance Python web framework
- **XGBoost** - Gradient boosting machine learning framework
- **Pandas** - Data manipulation and analysis
- **Scikit-learn** - Machine learning utilities
- **Uvicorn** - ASGI server

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── BrandLogo.tsx    # V-SOFT logo component with theme support
│   ├── FileUpload.tsx   # Drag-and-drop file upload
│   ├── ResultsDisplay.tsx # Interactive results visualization
│   └── ThemeToggle.tsx  # Light/dark mode toggle
├── assets/              # Images and static assets
│   ├── vsoft-logo-light.png
│   ├── vsoft-logo-dark.png
│   ├── hero-bg.jpg
│   └── prediction-illustration.jpg
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── pages/              # Page components
    └── Index.tsx       # Main application page
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python 3.8+** (for the FastAPI backend)

### Frontend Setup (This UI)

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:8080
   ```

### Backend Setup (Your FastAPI Application)

1. **Save your FastAPI code** (the one you provided) as `main.py`

2. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn pandas numpy scikit-learn scipy joblib python-multipart jinja2 aiofiles
   ```

3. **Install XGBoost:**
   ```bash
   pip install xgboost
   ```

4. **Prepare your model files:**
   - Place your trained XGBoost model (`xgboost_optimized_onehot_log_outliers_model.joblib`) in the same directory as `main.py`
   - Place your encoder files (`.pkl` files) in the same directory
   - Create `templates/` and `static/` directories if needed

5. **Start the FastAPI server:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

6. **Your API will be available at:**
   ```
   http://localhost:8000
   ```

### Full Integration

1. **Start both servers:**
   - Frontend: `npm run dev` (runs on port 8080)
   - Backend: `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

2. **The frontend will automatically connect to your FastAPI backend**

3. **Upload a CSV file with the required columns:**
   - `year`, `condition`, `fuel`, `odometer`, `transmission`, `size`, `type`, `manufacturer`, `cylinders`

## 🎨 Design System

The application features a comprehensive design system with:

- **Brand Colors**: Inspired by V-SOFT's colorful, data-driven aesthetic
- **Gradients**: Custom brand gradients and subtle backgrounds
- **Animations**: Smooth transitions and micro-interactions
- **Typography**: Clean, professional typography hierarchy
- **Components**: Consistent, reusable UI components
- **Dark Mode**: Full dark mode support with automatic theme detection

## 🔧 Configuration

### API Endpoint
Update the API URL in `src/pages/Index.tsx`:
```typescript
const API_URL = 'http://localhost:8000'; // Change this to your production URL
```

### Theme Customization
Modify the design system in `src/index.css` and `tailwind.config.ts`:
- Colors and gradients
- Animations and transitions
- Component variants

## 📊 Features in Detail

### File Upload
- Drag-and-drop interface
- File validation (CSV only, size limits)
- Real-time feedback and error handling
- Required columns validation

### AI Processing
- Progress indicators
- Real-time status updates
- Error handling and fallbacks
- Demo mode for testing without backend

### Results Display
- Summary statistics (count, average, min/max prices)
- Interactive data preview
- Downloadable results
- Responsive data tables

### User Experience
- Smooth animations and transitions
- Loading states and feedback
- Responsive design for all devices
- Accessible UI components

## 🚢 Deployment

### Frontend Deployment
1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Your own server

### Backend Deployment
Deploy your FastAPI application to:
- AWS EC2 or Lambda
- Google Cloud Platform
- Heroku
- DigitalOcean
- Your own server

### Environment Variables
For production, consider using environment variables:
- `VITE_API_URL` - Backend API URL
- Database connections (if using a database)
- Authentication secrets

## 🤝 Support

For questions about the UI implementation or customizations, please refer to:
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

For backend/ML questions related to your FastAPI application:
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [XGBoost Documentation](https://xgboost.readthedocs.io/)

## 📄 License

This project is created for V-SOFT Consulting. All rights reserved.