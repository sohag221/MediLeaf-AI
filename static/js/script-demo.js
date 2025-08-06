// Demo version of script.js for static hosting (GitHub Pages)
// This version simulates AI predictions without requiring a Flask backend

// DOM Elements (same as original)
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

// Demo data for simulated predictions
const demoPlantData = {
    'Bhibitaki': {
        medicinal_uses: [
            'Digestive health and bowel regulation',
            'Respiratory ailments like asthma and bronchitis',
            'Antioxidant properties for overall wellness',
            'Hair and skin health improvement',
            'Liver detoxification support'
        ]
    },
    'Candelabra plant': {
        medicinal_uses: [
            'Treatment of skin conditions and wounds',
            'Anti-inflammatory properties',
            'Pain relief for joints and muscles',
            'Traditional remedy for cuts and burns',
            'Antimicrobial effects'
        ]
    },
    'Chebulic Myrobalan': {
        medicinal_uses: [
            'Antioxidant and anti-aging properties',
            'Digestive system support',
            'Cardiovascular health benefits',
            'Immune system strengthening',
            'Blood sugar regulation'
        ]
    },
    'Gotu Kola': {
        medicinal_uses: [
            'Brain function and memory enhancement',
            'Anxiety and stress reduction',
            'Wound healing acceleration',
            'Circulation improvement',
            'Skin health and anti-aging'
        ]
    },
    'Holy Basil': {
        medicinal_uses: [
            'Stress reduction and adaptogenic effects',
            'Immune system support',
            'Respiratory health improvement',
            'Blood sugar regulation',
            'Anti-inflammatory properties'
        ]
    },
    'Indian Borage': {
        medicinal_uses: [
            'Respiratory health and cough relief',
            'Wound healing and skin care',
            'Digestive health support',
            'Anti-inflammatory effects',
            'Antimicrobial properties'
        ]
    },
    'Lemongrass': {
        medicinal_uses: [
            'Digestive health and stomach comfort',
            'Stress relief and relaxation',
            'Antimicrobial and antifungal properties',
            'Pain relief and muscle relaxation',
            'Fever reduction'
        ]
    },
    'Longevity Spinach': {
        medicinal_uses: [
            'Anti-aging and longevity promotion',
            'Blood sugar regulation',
            'Cholesterol management',
            'Kidney health support',
            'Antioxidant protection'
        ]
    },
    'Madagascar Periwinkle': {
        medicinal_uses: [
            'Diabetes management and blood sugar control',
            'Cancer research and treatment support',
            'Hypertension regulation',
            'Wound healing properties',
            'Antimicrobial effects'
        ]
    },
    'Neem Tree': {
        medicinal_uses: [
            'Skin health and acne treatment',
            'Antimicrobial and antifungal properties',
            'Dental health and oral care',
            'Immune system strengthening',
            'Blood purification'
        ]
    }
};

// Function to simulate AI prediction
function simulateAIPrediction() {
    const plantNames = Object.keys(demoPlantData);
    const mainPlant = plantNames[Math.floor(Math.random() * plantNames.length)];
    const confidence = Math.floor(Math.random() * 25) + 75; // 75-99% confidence
    
    // Generate alternative predictions
    const alternatives = plantNames
        .filter(name => name !== mainPlant)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(name => ({
            class: name,
            confidence: Math.floor(Math.random() * (confidence - 20)) + 10
        }));
    
    return {
        success: true,
        predicted_class: mainPlant,
        confidence: confidence,
        medicinal_uses: demoPlantData[mainPlant].medicinal_uses,
        top_predictions: [
            { class: mainPlant, confidence: confidence },
            ...alternatives
        ]
    };
}

// Initialize the application
function initializeApp() {
    console.log('🌿 Initializing MediLeaf AI Demo application');
    
    // Show demo notice
    showDemoNotice();
    
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
    
    console.log('✅ Demo application initialized successfully');
    
    // Add demo indicator to title
    const title = document.querySelector('title');
    if (title && !title.textContent.includes('Demo')) {
        title.textContent = 'MediLeaf AI - Demo Mode';
    }
}

// Show demo notice
function showDemoNotice() {
    const sectionHeader = document.querySelector('#classifier .section-header');
    if (sectionHeader && !document.querySelector('.demo-notice')) {
        const demoNotice = document.createElement('div');
        demoNotice.className = 'demo-notice';
        demoNotice.innerHTML = `
            <p><i class="fas fa-info-circle"></i> <strong>Demo Mode:</strong> This is a static demo with simulated AI predictions. For full AI functionality with real plant identification, visit our <a href="https://github.com/sohag221/Medicinal" target="_blank">GitHub repository</a> to run locally.</p>
        `;
        sectionHeader.appendChild(demoNotice);
    }
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Feature scripts data (same as original)
const featureScripts = {
    'ai-powered': {
        title: 'AI-Powered Technology',
        content: 'Our model is powered by a state-of-the-art deep learning algorithm trained on over 10,000 medicinal leaf images. It accurately identifies each plant species, ensuring fast and reliable results for researchers, herbalists, and nature enthusiasts. Just scan a leaf, and let the AI do the rest!'
    },
    'plant-types': {
        title: '10 Plant Types Database',
        content: 'Explore a comprehensive database of 10 powerful medicinal plants, including Neem Tree, Holy Basil, Gotu Kola, and more. Each plant entry is supported with high-resolution samples and precise classification, making it easy to learn and compare.'
    },
    'medicinal-uses': {
        title: 'Medicinal Uses & Benefits',
        content: 'Discover the natural healing properties of each plant. From boosting immunity to reducing inflammation, we provide detailed therapeutic information backed by traditional and modern sources. Perfect for health-conscious users looking for natural remedies.'
    }
};

// Smooth scrolling for navigation (same as original)
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

// Update active nav link on scroll (same as original)
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

// File upload handling (same as original)
uploadArea.addEventListener('click', (e) => {
    if (e.target === uploadArea || e.target.closest('.upload-content') && !e.target.closest('.upload-btn')) {
        imageInput.value = '';
        imageInput.click();
    }
});

if (uploadBtn) {
    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upload button clicked (Demo mode)');
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
    console.log('Input change event fired (Demo mode)', e.target.files.length);
    if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

imageInput.addEventListener('input', (e) => {
    console.log('Input event fired (Demo mode)', e.target.files.length);
    if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// Handle file selection (same as original)
function handleFileSelection(file) {
    console.log('File selected (Demo mode):', file.name, file.type, file.size);
    
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        alert('Please select an image smaller than 10MB.');
        return;
    }
    
    selectedFile = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        imageFileName.textContent = `File: ${file.name}`;
        imageFileSize.textContent = `Size: ${formatFileSize(file.size)}`;
        
        uploadArea.style.display = 'none';
        imagePreviewContainer.style.display = 'block';
        predictionContainer.style.display = 'none';
        loading.style.display = 'none';
        
        console.log('Image preview loaded successfully (Demo mode)');
    };
    reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Error reading the selected file. Please try again.');
    };
    reader.readAsDataURL(file);
}

// Format file size for display (same as original)
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Process button click handler (modified for demo)
processBtn.addEventListener('click', () => {
    if (selectedFile) {
        processImageDemo(selectedFile);
    }
});

// Cancel button click handler (same as original)
cancelBtn.addEventListener('click', () => {
    resetToUploadState();
});

// Process the selected image (DEMO VERSION - simulates AI prediction)
function processImageDemo(file) {
    console.log('🎭 Processing image in demo mode...');
    
    try {
        // Show loading
        imagePreviewContainer.style.display = 'none';
        loading.style.display = 'block';
        
        // Display uploaded image in results
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
        };
        reader.onerror = (e) => {
            console.error('Error reading file in demo mode:', e);
            alert('Error processing image. Please try again.');
            resetToUploadState();
            return;
        };
        reader.readAsDataURL(file);
        
        // Simulate processing delay (1.5-3 seconds)
        const processingTime = Math.random() * 1500 + 1500;
        
        setTimeout(() => {
            try {
                loading.style.display = 'none';
                
                // Generate simulated prediction
                const demoData = simulateAIPrediction();
                displayPredictionResults(demoData);
                
                console.log('✅ Demo prediction completed:', demoData);
            } catch (error) {
                console.error('Error in demo prediction:', error);
                alert('Demo processing failed. Please try again.');
                resetToUploadState();
            }
        }, processingTime);
        
    } catch (error) {
        console.error('Error in processImageDemo:', error);
        alert('Demo mode error. Please refresh and try again.');
        resetToUploadState();
    }
}

// Reset to initial upload state (same as original)
function resetToUploadState() {
    console.log('Resetting to upload state (Demo mode)');
    uploadArea.style.display = 'block';
    imagePreviewContainer.style.display = 'none';
    predictionContainer.style.display = 'none';
    loading.style.display = 'none';
    selectedFile = null;
    
    imageInput.value = '';
    imageInput.type = 'text';
    imageInput.type = 'file';
}

// Display prediction results (same as original)
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

// Reset classifier (same as original)
function resetClassifier() {
    resetToUploadState();
}

// Plant card modal functionality (modified for demo)
plantCards.forEach(card => {
    card.addEventListener('click', () => {
        const plantName = card.getAttribute('data-plant');
        showPlantModalDemo(plantName);
    });
});

// Demo version of plant modal (uses static data)
function showPlantModalDemo(plantName) {
    const plantData = demoPlantData[plantName];
    if (plantData) {
        modalPlantName.textContent = plantName;
        
        modalUsesList.innerHTML = '';
        plantData.medicinal_uses.forEach(use => {
            const li = document.createElement('li');
            li.textContent = use;
            modalUsesList.appendChild(li);
        });
        
        plantModal.style.display = 'block';
    } else {
        alert('Plant information not found.');
    }
}

// Feature card modal functionality (same as original)
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

// Close modal functionality (same as original)
closeModal.addEventListener('click', () => {
    plantModal.style.display = 'none';
});

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

// All remaining functionality (animations, scroll effects, etc.) same as original...

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
            loadingText.textContent = `Analyzing your image${dots}`;
        }, 500);
        
        loadingText.dataset.intervalId = interval;
    }
}

function cleanupLoadingDots() {
    const loadingText = document.querySelector('.loading p');
    if (loadingText && loadingText.dataset.intervalId) {
        clearInterval(loadingText.dataset.intervalId);
        loadingText.textContent = 'Analyzing your image...';
    }
}

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

// Touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            const currentSection = getCurrentSection();
            const nextSection = currentSection?.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const currentSection = getCurrentSection();
            const prevSection = currentSection?.previousElementSibling;
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    return null;
}

console.log('🌿 MediLeaf AI Demo Mode Loaded - Simulated predictions active!');

// Global error handler for demo mode
window.addEventListener('error', function(e) {
    console.error('Demo mode error caught:', e.error);
    // Don't show alert for every error, just log it
});

// Prevent any accidental network requests in demo mode
const originalFetch = window.fetch;
window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string' && (url.startsWith('/') || url.includes('/predict') || url.includes('/plant_info'))) {
        console.warn('🚫 Blocked network request in demo mode:', url);
        return Promise.reject(new Error('Network requests disabled in demo mode'));
    }
    return originalFetch.apply(this, args);
};
