document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const fontSizeSelector = document.getElementById('font-size-selector');
    
    fontSizeSelector.addEventListener('change', () => {
        const fontSize = fontSizeSelector.value;
        content.style.fontSize = fontSize;
    });

    const fontFamilySelector = document.getElementById('font-family-selector');
    
    fontFamilySelector.addEventListener('change', () => {
        const fontFamily = fontFamilySelector.value;
        content.style.fontFamily = fontFamily;
    });
});
