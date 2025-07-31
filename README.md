# MediLeaf AI - Medicinal Plant Classifier

![MediLeaf AI](https://img.shields.io/badge/MediLeaf-AI-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-2.3+-red)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-orange)

A sophisticated web application that uses deep learning to identify medicinal plants from leaf images and provides detailed information about their therapeutic properties.

## 🌿 Features

- **AI-Powered Classification**: Uses EfficientNetB3 deep learning model for accurate plant identification
- **10 Medicinal Plants**: Supports classification of 10 different medicinal plant species
- **Detailed Medical Information**: Provides comprehensive medicinal uses for each identified plant
- **Modern UI/UX**: Responsive, mobile-friendly design with smooth animations
- **Real-time Predictions**: Instant classification with confidence scores
- **Plant Database**: Interactive plant information cards with detailed descriptions

## 🎯 Supported Plants

1. **Bhibitaki** - Digestive health and respiratory support
2. **Candelabra Plant** - Skin conditions and inflammation relief
3. **Chebulic Myrobalan** - Antioxidant and anti-aging properties
4. **Gotu Kola** - Brain function and memory enhancement
5. **Holy Basil** - Stress reduction and immune support
6. **Indian Borage** - Respiratory health and wound healing
7. **Lemongrass** - Digestive health and stress relief
8. **Longevity Spinach** - Anti-aging and blood sugar regulation
9. **Madagascar Periwinkle** - Diabetes management and cancer support
10. **Neem Tree** - Skin health and antimicrobial properties

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- At least 4GB RAM (recommended for model inference)

### Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd "e:\Medicinal Leaf classification\Medicinal"
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Ensure the model file exists**:
   Make sure `efficientnet_b3_model.pth` is in the project root directory

5. **Run the application**:
   
   **Option A: Using the batch file (Windows)**
   ```bash
   run.bat
   ```
   
   **Option B: Direct Python execution**
   ```bash
   python app.py
   ```

6. **Open your browser** and go to: `http://localhost:5000`

## 📁 Project Structure

```
Medicinal/
├── app.py                     # Main Flask application
├── efficientnet_b3_model.pth  # Trained EfficientNetB3 model
├── requirements.txt           # Python dependencies
├── run.bat                   # Windows batch file to start the app
├── README.md                 # Project documentation
├── static/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       └── script.js         # JavaScript functionality
└── templates/
    └── index.html            # Main HTML template
```

## 🔧 Technical Details

### Model Architecture
- **Base Model**: EfficientNetB3
- **Framework**: PyTorch
- **Input Size**: 300x300 pixels
- **Number of Classes**: 10
- **Preprocessing**: Normalization with ImageNet statistics

### Web Framework
- **Backend**: Flask 2.3+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Responsive**: Mobile-first design approach

### Key Dependencies
```
Flask==2.3.3
torch==2.0.1
torchvision==0.15.2
Pillow==10.0.0
numpy==1.24.3
```

## 💡 Usage

1. **Upload Image**: Click the upload area or drag and drop a leaf image
2. **Wait for Processing**: The AI model will analyze your image
3. **View Results**: See the predicted plant name with confidence score
4. **Explore Uses**: Read about the medicinal properties and uses
5. **Alternative Predictions**: Check other possible matches

### Supported Image Formats
- JPEG/JPG
- PNG
- WebP
- Maximum file size: 10MB

## 🎨 Features Overview

### Modern UI Design
- Clean, professional interface
- Smooth animations and transitions
- Interactive elements with hover effects
- Mobile-responsive layout

### Plant Information Modal
- Detailed medicinal uses for each plant
- Easy-to-read format
- Scientific backing for therapeutic claims

### Prediction Results
- Main prediction with confidence percentage
- Top 3 alternative predictions
- Comprehensive medicinal uses list
- Visual confidence indicator

## 🔒 Error Handling

The application includes robust error handling for:
- Invalid file formats
- File size limitations
- Network connectivity issues
- Model prediction errors
- Missing dependencies

## 📱 Mobile Compatibility

- Responsive design works on all screen sizes
- Touch-friendly interface
- Optimized for mobile browsers
- Fast loading on slower connections

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## ⚠️ Disclaimer

This application is for educational and informational purposes only. The medicinal information provided should not replace professional medical advice. Always consult with healthcare professionals before using any medicinal plants for treatment.

## 🐛 Troubleshooting

### Common Issues

1. **Model file not found**
   - Ensure `efficientnet_b3_model.pth` is in the project root
   - Check file permissions

2. **Installation errors**
   - Update pip: `python -m pip install --upgrade pip`
   - Install Visual C++ redistributables (Windows)

3. **Memory errors**
   - Ensure at least 4GB RAM is available
   - Close other applications before running

4. **Port already in use**
   - Change the port in `app.py`: `app.run(port=5001)`
   - Kill existing processes using the port

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the error messages carefully
3. Ensure all dependencies are properly installed
4. Verify the model file is present and accessible

## 🔮 Future Enhancements

- Support for more medicinal plant species
- Batch processing capabilities
- API endpoints for integration
- Mobile app development
- Advanced filtering and search features
- User accounts and history tracking

---

**Made with ❤️ for the advancement of traditional medicine through modern AI technology**
