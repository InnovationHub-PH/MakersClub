export function initTinting() {
    let currentTintLevel = 1; // Starting at 70% (level 1)
    const tintLevels = [70, 50, 35, 20, 15, 5]; // Percentage values for each level
    const tintOpacities = [0.5, 0.65, 0.8, 0.85, 0.95, 1]; // Custom opacity values for each level
    const tintBarOpacities = [0, 0.1, 0.2, 0.3, 0.5, 0.7]; // Inverted sequential opacity values for each bar
    const maxLevel = 6;
    const minLevel = 1;

    // Get DOM elements
    const tintPercentageElement = document.getElementById('tint-percentage');
    const minusButton = document.getElementById('minus-btn');
    const plusButton = document.getElementById('plus-btn');
    const tintBars = document.querySelectorAll('.tint-bar');
    const tintPaths = document.querySelectorAll('.tint-path');

    // Ensure all elements exist before proceeding
    if (!tintPercentageElement || !minusButton || !plusButton || tintBars.length === 0 || tintPaths.length === 0) {
        console.warn("Tinting elements not found. Skipping tinting initialization.");
        return;
    }

    // Update the display and visual state
    function updateTintDisplay() {
        // Update percentage text
        tintPercentageElement.textContent = tintLevels[currentTintLevel - 1] + '%';
        
        // Update tint bars visual state with inverted sequential opacity
        tintBars.forEach((bar, index) => {
            const barLevel = parseInt(bar.getAttribute('data-level'));
            if (barLevel <= currentTintLevel) {
                bar.setAttribute('fill', '#C92F33');
                bar.setAttribute('fill-opacity', tintBarOpacities[barLevel - 1].toString());
            } else {
                bar.removeAttribute('fill');
                bar.removeAttribute('fill-opacity');
            }
        });

        // Update tint overlay opacity using custom values
        const tintOpacity = tintOpacities[currentTintLevel - 1];
        tintPaths.forEach(path => {
            path.setAttribute('fill-opacity', tintOpacity.toString());
        });

        // Update button states
        updateButtonStates();
    }

    // Update button opacity based on current level
    function updateButtonStates() {
        if (currentTintLevel <= minLevel) {
            minusButton.style.opacity = '0.3';
        } else {
            minusButton.style.opacity = '1';
        }

        if (currentTintLevel >= maxLevel) {
            plusButton.style.opacity = '0.3';
        } else {
            plusButton.style.opacity = '1';
        }
    }

    // Decrease tint level
    function decreaseTint() {
        if (currentTintLevel > minLevel) {
            currentTintLevel--;
            updateTintDisplay();
        }
    }

    // Increase tint level
    function increaseTint() {
        if (currentTintLevel < maxLevel) {
            currentTintLevel++;
            updateTintDisplay();
        }
    }

    // Add event listeners
    minusButton.addEventListener('click', decreaseTint);
    plusButton.addEventListener('click', increaseTint);

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' || event.key === '-') {
            decreaseTint();
        } else if (event.key === 'ArrowRight' || event.key === '+') {
            increaseTint();
        }
    });

    // Initialize display
    updateTintDisplay();

    // Add click handlers to tint bars for direct selection
    tintBars.forEach((bar) => {
        bar.style.cursor = 'pointer';
        bar.addEventListener('click', function() {
            const barLevel = parseInt(this.getAttribute('data-level'));
            currentTintLevel = barLevel;
            updateTintDisplay();
        });
    });
}