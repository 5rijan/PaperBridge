document.addEventListener('DOMContentLoaded', () => {
    const storedText = localStorage.getItem('formattedText');
    if (storedText) {
        console.log('Retrieved formatted text from localStorage:', storedText);
        let script = document.createElement('script');
        script.src = "bundle.js";
        document.head.append(script);

        script.onload = function() {
            console.log('Mathpix Markdown bundle.js loaded successfully.');
            const isLoaded = window.loadMathJax && window.loadMathJax();
            if (isLoaded) {
                console.log('MathJax loaded successfully.');
                const el = document.getElementById('content-text');
                const options = {
                    htmlTags: true 
                };
                    const html = window.markdownToHTML(storedText, options);
                    el.innerHTML = html;

            } else {
                console.error('Failed to load MathJax.');
            }
        };

        script.onerror = function() {
            console.error('Failed to load Mathpix Markdown bundle.js.');
        };
    } else {
        console.log('No formatted text found in localStorage.');
        const contentTextElement = document.getElementById('content-text');
        contentTextElement.textContent = 'No content available. Please process a .mmd file first.';
    }
});
