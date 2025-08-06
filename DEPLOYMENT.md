# 🚀 GitHub Pages Deployment Guide

Follow these steps to publish your MediLeaf AI project on GitHub Pages:

## 📋 Prerequisites
- GitHub account
- Git installed on your computer
- Your project files ready

## 🔧 Deployment Steps

### 1. Push Your Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Add MediLeaf AI project with GitHub Pages support"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/sohag221/Medicinal.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Access Your Live Site
- Your site will be available at: `https://sohag221.github.io/Medicinal/`
- It may take a few minutes to deploy initially

## 📁 Important Files for GitHub Pages

Make sure these files are in your root directory:
- ✅ `index.html` (main page)
- ✅ `static/css/style.css` (styling)
- ✅ `static/js/script-static.js` (static demo functionality)
- ✅ `README.md` (project documentation)

## 🎯 What Works on GitHub Pages

### ✅ Fully Functional
- Modern responsive UI design
- Plant database with detailed information
- Image upload and preview workflow
- Interactive plant cards and modals
- Smooth animations and transitions
- Navigation and scrolling effects

### 🔄 Demo Mode (Simulated)
- Image classification (shows random results)
- Confidence scores and predictions
- Medicinal uses display
- Processing animations

### ❌ Not Available on GitHub Pages
- Real AI model inference (requires Python/Flask backend)
- Actual plant identification from uploaded images
- Server-side processing

## 🛠️ For Full AI Functionality

To use the complete AI features:
1. Clone the repository locally
2. Install Python dependencies: `pip install -r requirements.txt`
3. Run Flask app: `python app.py`
4. Access at `http://localhost:5000`

## 🔄 Updating Your Site

To update your GitHub Pages site:
```bash
# Make your changes
git add .
git commit -m "Update website"
git push origin main
```

Changes will automatically deploy to your live site!

## 📊 Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to your repository root
2. Put your domain name in the file (e.g., `medipleaf.yoursite.com`)
3. Configure your domain's DNS settings
4. Update GitHub Pages settings to use your custom domain

## 🎉 You're Live!

Your medicinal plant classifier is now live and accessible to anyone worldwide! Share your link and showcase your AI project.

**Live Demo:** [https://sohag221.github.io/Medicinal/](https://sohag221.github.io/Medicinal/)
