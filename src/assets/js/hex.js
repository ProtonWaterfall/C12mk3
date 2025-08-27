<script>
window.addEventListener('load', function () {
    const container = document.querySelector('.hexagon-line');
    const placeholder = document.querySelector('.hexagon-placeholder');
    const overlay = document.querySelector('.overlay');

    placeholder.style.display = 'block';

    createHexagons();

    window.addEventListener('resize', createHexagons);
    window.addEventListener('orientationchange', createHexagons);

    function createHexagons() {
        container.innerHTML = '';

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const hexagonWidth = 100;
        const hexagonHeight = hexagonWidth * 0.75;
        const hexagonsPerRow = Math.floor(viewportWidth / hexagonWidth);
        const totalRows = Math.floor(viewportHeight / hexagonHeight);

        let reducedHexagonCount = Math.floor((totalRows * hexagonsPerRow) * 0.6);
        reducedHexagonCount = Math.floor(reducedHexagonCount / hexagonsPerRow) * hexagonsPerRow;

        for (let i = 0; i < reducedHexagonCount; i++) {
            const hexagon = document.createElement('div');
            hexagon.classList.add(i % 2 === 0 ? 'hex' : 'hex-alt');
            container.appendChild(hexagon);

            // Apply fade-in animation
            setTimeout(() => {
                hexagon.classList.add('show');
            }, i * 100);
        }

        placeholder.style.display = 'none';

        setTimeout(() => {
            overlay.classList.add('show');
            applyGlowEffect();
            startRandomRobotAnimation();
        }, reducedHexagonCount * 100);
    }

    function applyGlowEffect() {
        const hexagons = container.querySelectorAll('.hex, .hex-alt');
        hexagons.forEach((hexagon) => {
            setTimeout(() => {
                hexagon.classList.add('glow');
            }, Math.random() * 2000);
        });
    }

    function startRandomRobotAnimation() {
        const hexagons = container.querySelectorAll('.hex, .hex-alt');

        if (!hexagons.length) {
            console.error('No hexagons found!');
            return;
        }

        setInterval(() => {
            // Remove any existing robot images
            container.querySelectorAll('.hex img, .hex-alt img').forEach((img) => img.remove());

            // Select a random hexagon
            const randomHex = hexagons[Math.floor(Math.random() * hexagons.length)];

            // Add a robot image to the selected hexagon
            const img = document.createElement('img');
            img.src = Math.random() < 0.5 ? 'robolft.png' : 'roborgt.png';
            img.alt = 'Robot';
            img.classList.add('robot');

            randomHex.style.position = 'relative'; // Ensure the parent hexagon is positioned
            randomHex.appendChild(img);

            // Fade out the robot after 2 seconds (1 second visible + fade duration)
            setTimeout(() => {
                img.classList.add('fade-out');
                setTimeout(() => {
                    if (img.parentNode) img.parentNode.removeChild(img);
                }, 1000); // Match fade-out duration
            }, 2000); // Visible for 2 seconds
        }, 3000); // New robot every 3 seconds
    }
});
</script>