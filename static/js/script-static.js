// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const previewImage = document.getElementById('previewImage');
const imageFileName = document.getElementById('imageFileName');
const imageFileSize = document.getElementById('imageFileSize');
const processBtn = document.getElementById('processBtn');
const cancelBtn = document.getElementById('cancelBtn');
const predictionContainer = document.getElementById('predictionContainer');
const loading = document.getElementById('loading');
const uploadedImage = document.getElementById('uploadedImage');
const predictedClass = document.getElementById('predictedClass');
const confidenceFill = document.getElementById('confidenceFill');
const confidenceText = document.getElementById('confidenceText');
const medicinalUsesList = document.getElementById('medicinalUsesList');
const topPredictionsList = document.getElementById('topPredictionsList');
const plantCards = document.querySelectorAll('.plant-card');
const plantModal = document.getElementById('plantModal');
const modalPlantName = document.getElementById('modalPlantName');
const modalUsesList = document.getElementById('modalUsesList');
const closeModal = document.querySelector('.close');
const featureCards = document.querySelectorAll('.floating-card');
const featureModal = document.getElementById('featureModal');
const featureModalTitle = document.getElementById('featureModalTitle');
const featureModalContent = document.getElementById('featureModalContent');
const closeFeatureModal = document.querySelector('.close-feature');
const navLinks = document.querySelectorAll('.nav-link');

// Global variable to store selected file
let selectedFile = null;

// Static medicinal uses data for demo
const staticMedicinalUses = {
    'Bhibitaki': [
        'Digestive disorders and constipation relief',
        'Respiratory infections and cough treatment',
        'Anti-inflammatory and antioxidant properties',
        'Blood sugar regulation',
        'Immune system support'
    ],
    'Candelabra plant': [
        'Skin conditions and wound healing',
        'Anti-inflammatory effects',
        'Pain relief for joint problems',
        'Treatment of cuts and burns',
        'Antimicrobial properties'
    ],
    'Chebulic Myrobalan': [
        'Antioxidant and anti-aging properties',
        'Digestive health improvement',
        'Cholesterol level management',
        'Brain function enhancement',
        'Liver detoxification'
    ],
    'Gotu Kola': [
        'Brain function and memory enhancement',
        'Anxiety and stress reduction',
        'Wound healing acceleration',
        'Circulation improvement',
        'Mental clarity and focus'
    ],
    'Madagascar Periwinkle': [
        'Diabetes management and blood sugar control',
        'Cancer support and cell protection',
        'Blood pressure regulation',
        'Immune system strengthening',
        'Anti-tumor properties'
    ],
    'Neem Tree': [
        'Skin health and acne treatment',
        'Antimicrobial and antifungal properties',
        'Dental health and oral care',
        'Immune system boosting',
        'Anti-inflammatory effects'
    ],
    'Holy Basil': [
        'Stress reduction and adaptogenic properties',
        'Immune system support',
        'Respiratory health improvement',
        'Anti-inflammatory effects',
        'Mental clarity and focus'
    ],
    'Indian Borage': [
        'Respiratory health and cough relief',
        'Wound healing and skin care',
        'Digestive disorders treatment',
        'Anti-inflammatory properties',
        'Pain relief for headaches'
    ],
    'Lemongrass': [
        'Digestive health and stomach comfort',
        'Stress relief and anxiety reduction',
        'Anti-inflammatory properties',
        'Antimicrobial effects',
        'Blood pressure regulation'
    ],
    'Longevity Spinach': [
        'Anti-aging and longevity promotion',
        'Blood sugar regulation',
        'Antioxidant properties',
        'Immune system support',
        'Nutritional supplement benefits'
    ]
};

// Initialize the application
function initializeApp() {
    console.log('Initializing MediLeaf AI application (Static Demo)');
    
    // Ensure the upload area is visible and other containers are hidden
    if (uploadArea) uploadArea.style.display = 'block';
    if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
    if (predictionContainer) predictionContainer.style.display = 'none';
    if (loading) loading.style.display = 'none';
    
    // Clear any existing file input value
    if (imageInput) {
        imageInput.value = '';
        imageInput.setAttribute('accept', 'image/*');
    }
    
    console.log('Static demo initialized successfully');
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Feature scripts data
const featureScripts = {
    'ai-powered': {
        title: 'AI-Powered Technology',
        content: 'Our model is powered by a state-of-the-art EfficientNetB3 deep learning algorithm trained on over 10,000 medicinal leaf images. This demo showcases the UI, while the full AI functionality requires running the Flask application locally. Download the repository to experience real-time plant identification!'
    },
    'plant-types': {
        title: '10 Plant Types Database',
        content: 'Explore a comprehensive database of 10 powerful medicinal plants, including Neem Tree, Holy Basil, Gotu Kola, and more. Each plant entry is supported with detailed medicinal uses and therapeutic properties. Click on any plant card to learn more!'
    },
    'medicinal-uses': {
        title: 'Medicinal Uses & Benefits',
        content: 'Discover the natural healing properties of each plant. From boosting immunity to reducing inflammation, our database provides detailed therapeutic information backed by traditional and modern research. Perfect for health-conscious users looking for natural remedies.'
    }
};

// Smooth scrolling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// File upload handling
uploadArea.addEventListener('click', (e) => {
    // Only trigger if clicking the area itself, not the button
    if (e.target === uploadArea || e.target.closest('.upload-content') && !e.target.closest('.upload-btn')) {
        imageInput.value = '';
        imageInput.click();
    }
});

// Upload button specific handler
if (uploadBtn) {
    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upload button clicked (Static Demo)');
        imageInput.value = '';
        imageInput.click();
    });
}

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    console.log('Input change event fired (Static Demo)', e.target.files.length);
    if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// Additional safety check for input
imageInput.addEventListener('input', (e) => {
    console.log('Input event fired (Static Demo)', e.target.files.length);
    if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// Handle file selection (show preview, don't process yet)
function handleFileSelection(file) {
    console.log('File selected (Static Demo):', file.name, file.type, file.size);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('Please select an image smaller than 10MB.');
        return;
    }
    
    selectedFile = file;
    
    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        imageFileName.textContent = `File: ${file.name}`;
        imageFileSize.textContent = `Size: ${formatFileSize(file.size)}`;
        
        // Hide upload area and show preview
        uploadArea.style.display = 'none';
        imagePreviewContainer.style.display = 'block';
        predictionContainer.style.display = 'none';
        loading.style.display = 'none';
        
        console.log('Image preview loaded successfully (Static Demo)');
    };
    reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Error reading the selected file. Please try again.');
    };
    reader.readAsDataURL(file);
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Process button click handler
processBtn.addEventListener('click', () => {
    if (selectedFile) {
        processImageDemo(selectedFile);
    }
});

// Cancel button click handler
cancelBtn.addEventListener('click', () => {
    resetToUploadState();
});

// Demo process function (simulates AI prediction)
function processImageDemo(file) {
    // Show loading
    imagePreviewContainer.style.display = 'none';
    loading.style.display = 'block';
    
    // Display uploaded image in results
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Simulate AI processing with a delay
    setTimeout(() => {
        loading.style.display = 'none';
        
        // Generate demo prediction
        const plants = Object.keys(staticMedicinalUses);
        const randomPlant = plants[Math.floor(Math.random() * plants.length)];
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
        
        const demoData = {
            success: true,
            predicted_class: randomPlant,
            confidence: confidence,
            medicinal_uses: staticMedicinalUses[randomPlant],
            top_predictions: generateTopPredictions(plants, randomPlant)
        };
        
        displayPredictionResults(demoData);
        
        // Show demo notice
        setTimeout(() => {
            alert('🌿 Demo Mode: This is a simulated prediction! For real AI classification, please run the Flask application locally from our GitHub repository.');
        }, 1000);
        
    }, 3000); // 3 second delay to simulate processing
}

// Generate demo top predictions
function generateTopPredictions(plants, selectedPlant) {
    const otherPlants = plants.filter(plant => plant !== selectedPlant);
    const shuffled = otherPlants.sort(() => 0.5 - Math.random());
    const topPredictions = [
        { class: selectedPlant, confidence: Math.floor(Math.random() * 30) + 70 }
    ];
    
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
        topPredictions.push({
            class: shuffled[i],
            confidence: Math.floor(Math.random() * 40) + 10
        });
    }
    
    return topPredictions.sort((a, b) => b.confidence - a.confidence);
}

// Reset to initial upload state
function resetToUploadState() {
    console.log('Resetting to upload state (Static Demo)');
    uploadArea.style.display = 'block';
    imagePreviewContainer.style.display = 'none';
    predictionContainer.style.display = 'none';
    loading.style.display = 'none';
    selectedFile = null;
    
    // Clear the input value and force a reset
    imageInput.value = '';
    imageInput.type = 'text';
    imageInput.type = 'file';
}

// Display prediction results
function displayPredictionResults(data) {
    predictionContainer.style.display = 'block';
    
    // Main prediction
    predictedClass.textContent = data.predicted_class;
    
    // Confidence bar
    const confidence = Math.round(data.confidence);
    confidenceFill.style.width = `${confidence}%`;
    confidenceText.textContent = `${confidence}%`;
    
    // Medicinal uses
    medicinalUsesList.innerHTML = '';
    data.medicinal_uses.forEach(use => {
        const li = document.createElement('li');
        li.textContent = use;
        medicinalUsesList.appendChild(li);
    });
    
    // Top predictions
    topPredictionsList.innerHTML = '';
    data.top_predictions.slice(1).forEach(prediction => {
        const predictionDiv = document.createElement('div');
        predictionDiv.className = 'alternative-prediction';
        predictionDiv.innerHTML = `
            <span class="plant-name">${prediction.class}</span>
            <span class="confidence">${Math.round(prediction.confidence)}%</span>
        `;
        topPredictionsList.appendChild(predictionDiv);
    });
    
    // Smooth scroll to results
    predictionContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Reset classifier
function resetClassifier() {
    resetToUploadState();
}

// Plant card modal functionality
plantCards.forEach(card => {
    card.addEventListener('click', () => {
        const plantName = card.getAttribute('data-plant');
        showPlantModal(plantName);
    });
});

// Feature card modal functionality
featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const featureType = card.getAttribute('data-feature');
        showFeatureModal(featureType);
    });
});

function showFeatureModal(featureType) {
    const feature = featureScripts[featureType];
    if (feature) {
        featureModalTitle.textContent = feature.title;
        featureModalContent.textContent = feature.content;
        featureModal.style.display = 'block';
    }
}

function showPlantModal(plantName) {
    // Use static data instead of API call
    if (staticMedicinalUses[plantName]) {
        modalPlantName.textContent = plantName;
        
        modalUsesList.innerHTML = '';
        staticMedicinalUses[plantName].forEach(use => {
            const li = document.createElement('li');
            li.textContent = use;
            modalUsesList.appendChild(li);
        });
        
        plantModal.style.display = 'block';
    } else {
        alert('Plant information not found.');
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    plantModal.style.display = 'none';
});

// Close feature modal
closeFeatureModal.addEventListener('click', () => {
    featureModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === plantModal) {
        plantModal.style.display = 'none';
    }
    if (e.target === featureModal) {
        featureModal.style.display = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.plant-card, .floating-card, .feature, .stat').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(44, 85, 48, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Loading dots animation
function addLoadingDots() {
    const loadingText = document.querySelector('.loading p');
    if (loadingText) {
        let dots = '';
        const interval = setInterval(() => {
            dots += '.';
            if (dots.length > 3) dots = '';
            loadingText.textContent = `Simulating AI analysis${dots}`;
        }, 500);
        
        // Store interval ID for cleanup
        loadingText.dataset.intervalId = interval;
    }
}

// Cleanup loading animation
function cleanupLoadingDots() {
    const loadingText = document.querySelector('.loading p');
    if (loadingText && loadingText.dataset.intervalId) {
        clearInterval(loadingText.dataset.intervalId);
        loadingText.textContent = 'Analyzing your image...';
    }
}

// Update loading animation when showing/hiding
const loadingObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === loading && mutation.attributeName === 'style') {
            if (loading.style.display === 'block') {
                addLoadingDots();
            } else {
                cleanupLoadingDots();
            }
        }
    });
});

loadingObserver.observe(loading, { attributes: true });

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (plantModal.style.display === 'block') {
            plantModal.style.display = 'none';
        }
        if (featureModal.style.display === 'block') {
            featureModal.style.display = 'none';
        }
    }
});

// Add demo notice on page load
window.addEventListener('load', () => {
    // Create demo banner
    const demoBanner = document.createElement('div');
    demoBanner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    demoBanner.innerHTML = `
        🌿 DEMO MODE: This is a static preview. For full AI functionality, visit 
        <a href="https://github.com/sohag221/Medicinal" target="_blank" style="color: white; text-decoration: underline;">GitHub Repository</a>
        <span onclick="this.parentElement.style.display='none'" style="float: right; cursor: pointer; margin-right: 20px;">✕</span>
    `;
    document.body.insertBefore(demoBanner, document.body.firstChild);
    
    // Adjust header position
    const header = document.querySelector('.header');
    if (header) {
        header.style.top = '40px';
    }
    
    // Auto-hide banner after 10 seconds
    setTimeout(() => {
        demoBanner.style.display = 'none';
        if (header) {
            header.style.top = '0';
        }
    }, 10000);
});
