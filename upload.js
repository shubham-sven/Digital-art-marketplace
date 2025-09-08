// Upload functionality for ArtVault

document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('artwork-upload-form');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('artwork-file');
    const uploadedFiles = document.getElementById('uploaded-files');
    const filePreviewImg = document.getElementById('file-preview-img');
    const filePreviewVideo = document.getElementById('file-preview-video');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const removeFileBtn = document.getElementById('remove-file');
    const editionTypeSelect = document.getElementById('edition-type');
    const editionSizeGroup = document.getElementById('edition-size-group');
    const submitBtn = document.getElementById('submit-btn');
    const previewBtn = document.getElementById('preview-btn');

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadArea.classList.add('highlight');
    }

    function unhighlight(e) {
        uploadArea.classList.remove('highlight');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            handleFile(files[0]);
        }
    }

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'model/gltf-binary', 'model/gltf+json'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid file type (JPG, PNG, GIF, MP4, GLTF)');
            return;
        }

        // Validate file size (100MB max)
        const maxSize = 100 * 1024 * 1024; // 100MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 100MB');
            return;
        }

        // Display file info
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);

        // Preview file
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreviewImg.src = e.target.result;
                filePreviewImg.style.display = 'block';
                filePreviewVideo.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreviewVideo.src = e.target.result;
                filePreviewVideo.style.display = 'block';
                filePreviewImg.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }

        // Show uploaded files section
        uploadedFiles.style.display = 'block';
        uploadArea.style.display = 'none';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Remove file
    removeFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        uploadedFiles.style.display = 'none';
        uploadArea.style.display = 'block';
        filePreviewImg.style.display = 'none';
        filePreviewVideo.style.display = 'none';
    });

    // Edition type handling
    editionTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'limited') {
            editionSizeGroup.style.display = 'block';
        } else {
            editionSizeGroup.style.display = 'none';
        }
    });

    // Form validation and submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const title = document.getElementById('artwork-title').value.trim();
        const description = document.getElementById('artwork-description').value.trim();
        const price = document.getElementById('artwork-price').value;
        const file = fileInput.files[0];

        if (!title || !description || !price || !file) {
            alert('Please fill in all required fields and upload a file');
            return;
        }

        // Show loading state
        submitBtn.textContent = 'Uploading...';
        submitBtn.disabled = true;

        // Simulate upload (replace with actual upload logic)
        setTimeout(() => {
            alert('Artwork uploaded successfully! It will be reviewed before going live.');
            submitBtn.textContent = 'Upload Artwork';
            submitBtn.disabled = false;

            // Reset form
            uploadForm.reset();
            uploadedFiles.style.display = 'none';
            uploadArea.style.display = 'block';
            filePreviewImg.style.display = 'none';
            filePreviewVideo.style.display = 'none';
        }, 2000);
    });

    // Preview functionality
    previewBtn.addEventListener('click', () => {
        const title = document.getElementById('artwork-title').value.trim();
        const description = document.getElementById('artwork-description').value.trim();
        const price = document.getElementById('artwork-price').value;
        const currency = document.getElementById('currency-select').value;
        const file = fileInput.files[0];

        if (!title || !description || !price || !file) {
            alert('Please fill in all required fields and upload a file to preview');
            return;
        }

        // Create preview modal (simplified)
        const previewHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div style="background: #1e293b; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <h3 style="color: #6366f1; margin-bottom: 1rem;">Artwork Preview</h3>
                    <div style="text-align: center; margin-bottom: 1rem;">
                        ${file.type.startsWith('image/') ? `<img src="${URL.createObjectURL(file)}" style="max-width: 100%; max-height: 300px; border-radius: 10px;">` : ''}
                        ${file.type.startsWith('video/') ? `<video src="${URL.createObjectURL(file)}" controls style="max-width: 100%; max-height: 300px; border-radius: 10px;"></video>` : ''}
                    </div>
                    <h4 style="color: white; margin-bottom: 0.5rem;">${title}</h4>
                    <p style="color: #9ca3af; margin-bottom: 1rem;">${description}</p>
                    <p style="color: #6366f1; font-weight: bold;">Price: ${price} ${currency.toUpperCase()}</p>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: #6366f1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; margin-top: 1rem;">Close Preview</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', previewHTML);
    });
});
