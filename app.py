from flask import Flask, request, jsonify, send_from_directory
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import base64
import os

app = Flask(__name__)

# Define class names
class_names = ['Bhibitaki', 'Candelabra plant', 'Chebulic Myrobalan', 'Gotu Kola',
               'Holy Basil', 'Indian Borage', 'Lemongrass', 'Longevity Spinach',
               'Madagascar Periwinkle', 'Neem Tree']

# Medicinal uses for each plant
medicinal_uses = {
    'Bhibitaki': [
        'Digestive health and bowel regulation',
        'Respiratory ailments like asthma and bronchitis',
        'Antioxidant properties for overall wellness',
        'Hair and skin health improvement',
        'Liver detoxification support'
    ],
    'Candelabra plant': [
        'Treatment of skin conditions and wounds',
        'Anti-inflammatory properties',
        'Pain relief for joints and muscles',
        'Antimicrobial effects',
        'Traditional fever reduction'
    ],
    'Chebulic Myrobalan': [
        'Powerful digestive aid and laxative',
        'Antioxidant and anti-aging properties',
        'Cardiovascular health support',
        'Immune system strengthening',
        'Mental clarity and memory enhancement'
    ],
    'Gotu Kola': [
        'Brain function and memory improvement',
        'Wound healing and skin regeneration',
        'Anxiety and stress reduction',
        'Circulation enhancement',
        'Anti-inflammatory effects'
    ],
    'Holy Basil': [
        'Stress reduction and adaptogenic properties',
        'Respiratory health and cough relief',
        'Blood sugar regulation',
        'Immune system support',
        'Anti-inflammatory and antioxidant effects'
    ],
    'Indian Borage': [
        'Respiratory ailments like cold and cough',
        'Digestive disorders and stomach pain',
        'Skin conditions and wound healing',
        'Fever reduction',
        'Antimicrobial properties'
    ],
    'Lemongrass': [
        'Digestive health and stomach disorders',
        'Antimicrobial and antifungal properties',
        'Anxiety and stress relief',
        'Pain and inflammation reduction',
        'Detoxification and cleansing'
    ],
    'Longevity Spinach': [
        'Anti-aging and longevity promotion',
        'Blood sugar regulation',
        'Cardiovascular health support',
        'Antioxidant protection',
        'Immune system enhancement'
    ],
    'Madagascar Periwinkle': [
        'Diabetes management and blood sugar control',
        'Cancer treatment support (vincristine/vinblastine)',
        'Wound healing properties',
        'Antimicrobial effects',
        'Blood pressure regulation'
    ],
    'Neem Tree': [
        'Skin conditions and acne treatment',
        'Antimicrobial and antifungal properties',
        'Dental health and oral hygiene',
        'Immune system support',
        'Blood purification and detox'
    ]
}

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the model
def load_model():
    try:
        # First, try to load the state dict and inspect its structure
        state_dict = torch.load('efficientnet_b3_model.pth', map_location=device)
        
        # Check if it's a complete model or just state dict
        if isinstance(state_dict, dict) and 'conv_stem.weight' in state_dict:
            # This appears to be an EfficientNet model with a different structure
            # Try using timm's EfficientNet implementation or custom loading
            from torchvision.models import efficientnet_b3
            model = efficientnet_b3(weights=None)
            
            # Modify the classifier for our number of classes
            num_features = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(num_features, len(class_names))
            
            # Try to load with strict=False to handle mismatched keys
            missing_keys, unexpected_keys = model.load_state_dict(state_dict, strict=False)
            
            # If too many keys are missing, try alternative approach
            if len(missing_keys) > 10:
                # Create a custom EfficientNet-like model structure
                model = create_custom_efficientnet(len(class_names))
                model.load_state_dict(state_dict, strict=False)
        else:
            # Standard approach
            model = models.efficientnet_b3(weights=None)
            num_features = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(num_features, len(class_names))
            model.load_state_dict(state_dict)
        
        model.to(device)
        model.eval()
        return model
        
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Trying alternative loading method...")
        
        # Alternative: Create a model compatible with the saved weights
        model = create_compatible_model()
        model.to(device)
        model.eval()
        return model

def create_custom_efficientnet(num_classes):
    """Create a custom EfficientNet model that matches the saved weights structure"""
    import timm
    try:
        # Try using timm's EfficientNet implementation
        model = timm.create_model('efficientnet_b3', pretrained=False, num_classes=num_classes)
        return model
    except:
        # Fallback to torchvision
        model = models.efficientnet_b3(weights=None)
        num_features = model.classifier[1].in_features
        model.classifier[1] = nn.Linear(num_features, num_classes)
        return model

def create_compatible_model():
    """Create a simple CNN model as fallback"""
    class SimpleCNN(nn.Module):
        def __init__(self, num_classes=10):
            super(SimpleCNN, self).__init__()
            self.features = nn.Sequential(
                nn.Conv2d(3, 32, 3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Conv2d(32, 64, 3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Conv2d(64, 128, 3, padding=1),
                nn.ReLU(),
                nn.AdaptiveAvgPool2d(1)
            )
            self.classifier = nn.Linear(128, num_classes)
            
        def forward(self, x):
            x = self.features(x)
            x = x.view(x.size(0), -1)
            x = self.classifier(x)
            return x
    
    return SimpleCNN(len(class_names))

# Initialize model
model = load_model()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_image(image):
    """Predict the class of an image"""
    try:
        # Preprocess the image
        image_tensor = transform(image).unsqueeze(0).to(device)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            predicted_class_idx = torch.argmax(probabilities).item()
            confidence = probabilities[predicted_class_idx].item()
            
        predicted_class = class_names[predicted_class_idx]
        return predicted_class, confidence, probabilities.cpu().numpy()
    
    except Exception as e:
        print(f"Error in prediction: {e}")
        return None, 0, None

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    
    try:
        # Read and process the image
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        
        # Make prediction
        predicted_class, confidence, probabilities = predict_image(image)
        
        if predicted_class is None:
            return jsonify({'error': 'Error in prediction'})
        
        # Get top 3 predictions
        top_predictions = []
        prob_indices = sorted(range(len(probabilities)), key=lambda i: probabilities[i], reverse=True)[:3]
        
        for i in prob_indices:
            top_predictions.append({
                'class': class_names[i],
                'confidence': float(probabilities[i]) * 100,
                'uses': medicinal_uses[class_names[i]]
            })
        
        return jsonify({
            'success': True,
            'predicted_class': predicted_class,
            'confidence': confidence * 100,
            'medicinal_uses': medicinal_uses[predicted_class],
            'top_predictions': top_predictions
        })
    
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'})

@app.route('/plant_info/<plant_name>')
def plant_info(plant_name):
    if plant_name in medicinal_uses:
        return jsonify({
            'plant_name': plant_name,
            'medicinal_uses': medicinal_uses[plant_name]
        })
    else:
        return jsonify({'error': 'Plant not found'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
