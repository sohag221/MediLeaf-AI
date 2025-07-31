// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
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
const navLinks = document.querySelectorAll('.nav-link');

// Global variable to store selected file
let selectedFile = null;

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
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

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
    if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// Handle file selection (show preview, don't process yet)
function handleFileSelection(file) {
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
        processImage(selectedFile);
    }
});

// Cancel button click handler
cancelBtn.addEventListener('click', () => {
    resetToUploadState();
});

// Process the selected image
function processImage(file) {
    // Show loading
    imagePreviewContainer.style.display = 'none';
    loading.style.display = 'block';
    
    // Display uploaded image in results
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Send prediction request
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = 'none';
        
        if (data.success) {
            displayPredictionResults(data);
        } else {
            alert('Error: ' + (data.error || 'Failed to predict image'));
            resetToUploadState();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loading.style.display = 'none';
        alert('Network error. Please try again.');
        resetToUploadState();
    });
}

// Reset to initial upload state
function resetToUploadState() {
    uploadArea.style.display = 'block';
    imagePreviewContainer.style.display = 'none';
    predictionContainer.style.display = 'none';
    loading.style.display = 'none';
    selectedFile = null;
    imageInput.value = '';
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

function showPlantModal(plantName) {
    fetch(`/plant_info/${encodeURIComponent(plantName)}`)
    .then(response => response.json())
    .then(data => {
        if (data.plant_name) {
            modalPlantName.textContent = data.plant_name;
            
            modalUsesList.innerHTML = '';
            data.medicinal_uses.forEach(use => {
                const li = document.createElement('li');
                li.textContent = use;
                modalUsesList.appendChild(li);
            });
            
            plantModal.style.display = 'block';
        } else {
            alert('Plant information not found.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error loading plant information.');
    });
}

// Close modal
closeModal.addEventListener('click', () => {
    plantModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === plantModal) {
        plantModal.style.display = 'none';
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
            loadingText.textContent = `Analyzing your image${dots}`;
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
    if (e.key === 'Escape' && plantModal.style.display === 'block') {
        plantModal.style.display = 'none';
    }
});

// Form validation for better UX
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
        throw new Error('Please upload a valid image file (JPEG, PNG, or WebP).');
    }
    
    if (file.size > maxSize) {
        throw new Error('Image size should be less than 10MB.');
    }
    
    return true;
}

// Enhanced error handling
function handlePredictionError(error) {
    console.error('Prediction error:', error);
    
    let message = 'An error occurred while processing your image. ';
    
    if (error.message.includes('network') || error.message.includes('fetch')) {
        message += 'Please check your internet connection and try again.';
    } else if (error.message.includes('size')) {
        message += 'Please try with a smaller image.';
    } else {
        message += 'Please try with a different image.';
    }
    
    alert(message);
    resetClassifier();
}

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when page loads
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add touch support for mobile devices
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
            // Swipe up - scroll to next section
            const currentSection = getCurrentSection();
            const nextSection = currentSection?.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Swipe down - scroll to previous section
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
