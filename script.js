document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');
    const saveButton = document.getElementById('saveButton');
    const arrows = document.querySelectorAll('.arrow');

    const options = {
        hair: ['hair1', 'hair2'],
        eyes: ['eyes_blue', 'eyes_brown', 'eyes_green'],
        skin: ['skin1', 'skin2', 'skin3', 'skin4', 'skin5'],
        outfit: ['cloth1', 'cloth2', 'cloth3', 'cloth4', 'cloth5', 'cloth6']
    };

    const images = {
        hair1: 'images/hairstyle1.png',
        hair2: 'images/hairstyle3.png',
        eyes_blue: 'images/eyes-blue.png',
        eyes_brown: 'images/eyes-brown.png',
        eyes_green: 'images/eyes-green.png',
        skin1: 'images/head_skin_1.png',
        skin2: 'images/head_skin_2.png',
        skin3: 'images/head_skin_3.png',
        skin4: 'images/head_skin_4.png',
        skin5: 'images/head_skin_5.png',
        cloth1: 'images/cloth_men_1.png',
        cloth2: 'images/cloth_men_2.png',
        cloth3: 'images/cloth_men_3.png',
        cloth4: 'images/cloth_men_4.png',
        cloth5: 'images/cloth_men_5.png',
        cloth6: 'images/cloth_men_6.png',
    };

    const currentSelection = {
        hair: 0,
        eyes: 0,
        skin: 0,
        outfit: 0
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
        canvas.classList.add('fade');

        setTimeout(async() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        

        try {
            const skinImage = await loadImage(images[options.skin[currentSelection.skin]]);
            ctx.drawImage(skinImage, 0, 0, canvas.width, canvas.height);

            const eyesImage = await loadImage(images[options.eyes[currentSelection.eyes]]);
            ctx.drawImage(eyesImage, 0, 0, canvas.width, canvas.height);

            const hairImage = await loadImage(images[options.hair[currentSelection.hair]]);
            ctx.drawImage(hairImage, 0, 0, canvas.width, canvas.height);

            const outfitImage = await loadImage(images[options.outfit[currentSelection.outfit]]);
            ctx.drawImage(outfitImage, 0, 0, canvas.width, canvas.height);
        } catch (error) {
            console.error('Error loading image:', error);
        }

        canvas.classList.remove('fade');
        }, 150);
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
