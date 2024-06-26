document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');
    const saveButton = document.getElementById('saveButton');
    const arrows = document.querySelectorAll('.arrow');

    const options = {
        hair: ['hair1', 'hair2'],
        eyes: ['eyes_blue', 'eyes_brown', 'eyes_green'],
        skin: ['skin1', 'skin2', 'skin3']
    };

    const images = {
        hair1: 'images/hair1.png',
        hair2: 'images/hair2.png',
        eyes_blue: 'images/eyes_blue.png',
        eyes_brown: 'images/eyes_brown.png',
        eyes_green: 'images/eyes_green.png',
        skin1: 'images/Sprite-0001.png',
        skin2: 'images/Sprite-0002.png',
        skin3: 'images/Sprite-0003.png'
    };

    const currentSelection = {
        hair: 0,
        eyes: 0,
        skin: 0
    };

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async function drawAvatar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        try {
            const skinImage = await loadImage(images[options.skin[currentSelection.skin]]);
            ctx.drawImage(skinImage, 0, 0, canvas.width, canvas.height);

            const eyesImage = await loadImage(images[options.eyes[currentSelection.eyes]]);
            ctx.drawImage(eyesImage, 0, 0, canvas.width, canvas.height);

            const hairImage = await loadImage(images[options.hair[currentSelection.hair]]);
            ctx.drawImage(hairImage, 0, 0, canvas.width, canvas.height);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }

    arrows.forEach(arrow => {
        arrow.addEventListener('click', (event) => {
            const type = event.target.getAttribute('data-type');
            if (event.target.classList.contains('left')) {
                currentSelection[type] = (currentSelection[type] - 1 + options[type].length) % options[type].length;
            } else {
                currentSelection[type] = (currentSelection[type] + 1) % options[type].length;
            }
            drawAvatar();
        });
    });

    saveButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'avatar.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Initial draw
    drawAvatar();
});
