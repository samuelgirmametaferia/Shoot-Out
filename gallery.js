document.addEventListener('DOMContentLoaded', function() {
  const galleryDiv = document.getElementById('image-gallery');
  const fullscreenOverlay = document.getElementById('fullscreen-overlay');
  const closeButton = document.getElementById('close-button');

  // List of image filenames; these might be generated dynamically in a real scenario.
  const imageFolder = 'assets/screenshots/';
  const imageNames = [
    '1Itr7X.png',
    '1PQbvY.png',
    '1qClXp.png',
    '6rUSs7.png',
    '8axChd.png',
    '32sXqr.png',
    'avfAuE.png',
    'bfmOCs.png',
    'bOBayX.png',
    'HqiBmY.png',
    'm7+Q7r.png',
    'R+HZRH.png',
    'sQkTjZ.png',
    'UVamp3.png',
    'wKVZSb.png',
    'x66Qe_.png'
  ];

  // Populate the gallery with images.
  imageNames.forEach(imageName => {
    const img = document.createElement('img');
    img.src = imageFolder + imageName;
    img.alt = 'Screenshot: ' + imageName;

    // On image click, upscale using bilinear interpolation and show in fullscreen mode.
    img.addEventListener('click', () => {
      upscaleAndShowFullscreen(img.src);
    });

    galleryDiv.appendChild(img);
  });

  function upscaleAndShowFullscreen(src) {
    const originalImage = new Image();
    originalImage.src = src;
    originalImage.onload = () => {
      // Scale factor for upscaling.
      const scaleFactor = 3;

      // Create a canvas element and set its dimensions based on the scale factor.
      const canvas = document.createElement('canvas');
      canvas.width = originalImage.naturalWidth * scaleFactor;
      canvas.height = originalImage.naturalHeight * scaleFactor;
      const ctx = canvas.getContext('2d');

      // Enable bilinear upscaling by turning on image smoothing.
      ctx.imageSmoothingEnabled = true;
      // Set smoothing quality to "medium" for bilinear upscaling.
      ctx.imageSmoothingQuality = 'medium';

      // Draw the original image scaled up onto the canvas.
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

      // Clear previous content, then add the upscaled canvas.
      fullscreenOverlay.innerHTML = '';
      fullscreenOverlay.appendChild(canvas);
      // Re-add close button, ensuring it remains clickable.
      fullscreenOverlay.appendChild(closeButton);

      // Show the fullscreen overlay.
      fullscreenOverlay.classList.add('active');
    };

    originalImage.onerror = () => {
      console.error('Failed to load image for upscaling:', src);
    };
  }

  // Close the fullscreen overlay when the close button is clicked.
  closeButton.addEventListener('click', () => {
    fullscreenOverlay.classList.remove('active');
  });

  // Allow closing fullscreen overlay when clicking outside the canvas.
  fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.classList.remove('active');
    }
  });
});