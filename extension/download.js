document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-button');
    const dropdownContent = document.getElementById('dropdown-content');
    const downloadHtml = document.getElementById('download-html');
    const downloadMmd = document.getElementById('download-mmd');
    const contentText = localStorage.getItem('formattedText') || 'No content available';

    downloadButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });





    function generateToc(text) {
        const lines = text.split('\n');
        const sectionCounters = Array(6).fill(0);
        let toc = '<ol style="list-style-type:none;">\n'; 
    
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('#')) {
                const level = line.split('#').length - 1;
                const headingText = removeExistingNumbers(line.slice(level).trim());
    
                sectionCounters[level - 1] += 1;
                for (let i = level; i < sectionCounters.length; i++) {
                    sectionCounters[i] = 0;
                }
    
                const sectionNumber = sectionCounters.slice(0, level)
                    .map(num => num > 0 ? num : '')
                    .filter(num => num !== '')
                    .join('.');
    
                const indent = '   '.repeat(level - 1); // Indentation for the TOC hierarchy
                toc += `${indent}<li style="margin-left:${(level - 1) * 20}px;">${sectionNumber} ${headingText}</li>\n`;
    
                if (level < sectionCounters.filter(num => num > 0).length) {
                    toc += `${indent}</ol>\n${'   '.repeat(level)}<ol style="list-style-type:none;">\n`;
                }
            }
        });
    
        toc += '</ol>'; // Close the main ordered list
    
        return toc;
    }
    
    function removeExistingNumbers(text) {
        return text.replace(/^\d+(\.\d+)*\s+/, ''); // Regex to remove existing numbers
    }
    
    const mmd_text = localStorage.getItem('formattedText');
    const toc = generateToc(mmd_text);


    const downloadContentHtml = () => {
        const content = document.getElementById('content').innerHTML;
        const docHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background-color: white;
            color: black;
            transition: background-color 0.3s, color 0.3s;
            font-family: Arial, sans-serif;
            font-size: 16px;
            overflow: hidden;
            scroll-padding-top: 60px; /* Adjust if needed */
        }
        #container {
            display: flex;
            height: 100vh;
        }
        #bb {
            width: 24%;
            overflow-y: auto;
            padding: 20px;
            background-color: white;
            color: black;
            border-right: 1px solid #ddd;
        }
        #bb ul {
            list-style-type: none;
            padding-left: 0;
        }
        #bb li {
            margin: 5px 0;
        }
        #bb li ul {
            padding-left: 20px;
        }
        #bb a { 
           text-decoration: none;
        }
        #bb a:hover {
            text-decoration: underline;
        }
        #content {
            width: 76%;
            padding: 20px;
            overflow-y: auto;
            background-color: white; 
            color: black; 
        }
        .dark-mode #bb {
            background-color: #333;
            color: white;
        }
        .dark-mode #bb a {
            color: #2196F3; /* Lighter blue for dark mode */
        }
        .dark-mode #content {
            background-color: #444;
            color: white;
        }
        .dark-mode .header {
            background-color: #333; /* Same shade as the body */
            border-bottom: 1px solid #444;
        }
        .header {
            position: fixed;
            top: 0;
            right: 0;
            width: calc(100% - 40px);
            background: white;
            border-bottom: 1px solid #ddd;
            z-index: 1000;
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: background-color 0.3s, border-bottom 0.3s;
        }
        .right-buttons {
            display: flex;
            gap: 10px;
        }
        button, select {
            background-color: #2196F3;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: background-color 0.3s;
        }
        button:hover, select:hover {
            background-color: #1976D2;
        }
        select {
            background-color: #f9f9f9;
            color: black;
            border: 1px solid #ddd;
        }
        /* Smooth scrolling to the middle of the section */
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="right-buttons">
            <div id="google_translate_element"></div>
            <select id="font-size-selector">
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
                <option value="24px">24px</option>
                <option value="26px">26px</option>
            </select>
            <select id="font-family-selector">
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Helvetica, sans-serif">Helvetica</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Verdana, sans-serif">Verdana</option>
            </select>
            <button id="toggle-button">Dark Mode</button>
        </div>
    </div>
    <div id="container">
        <div id="bb">
            <ul id="toc">
            <br>
            <br>
            <br>
            <h2 style="text-decoration: underline;">Table Of Contents</h2>
                <!-- TOC will be dynamically generated here -->
            </ul>
        </div>
        <div id="content">
            <br>
            <br>
            <br>
            ${content} <!-- Your content goes here -->
        </div>
    </div>
    <script>
        const toggleButton = document.getElementById('toggle-button');
        const body = document.body;
        const content = document.getElementById('content');
        const toc = document.getElementById('bb');
        const darkModeText = 'Light Mode';
        const lightModeText = 'Dark Mode';
        let darkMode = false;

        toggleButton.addEventListener('click', () => {
            darkMode = !darkMode;
            if (darkMode) {
                body.classList.add('dark-mode');
                toggleButton.textContent = lightModeText;
            } else {
                body.classList.remove('dark-mode');
                toggleButton.textContent = darkModeText;
            }
        });

        const fontSizeSelector = document.getElementById('font-size-selector');
        
        fontSizeSelector.addEventListener('change', () => {
            const fontSize = fontSizeSelector.value;
            content.style.fontSize = fontSize;
            toc.style.fontSize = fontSize;
        });

        const fontFamilySelector = document.getElementById('font-family-selector');
        
        fontFamilySelector.addEventListener('change', () => {
            const fontFamily = fontFamilySelector.value;
            body.style.fontFamily = fontFamily;
        });

        function generateTocLinks() {
            const tocElement = document.getElementById('toc');
            const headers = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4, #content h5, #content h6');
            headers.forEach(header => {
                const link = document.createElement('a');
                const text = document.createTextNode(header.textContent);
                link.appendChild(text);
                link.href = \`#\${header.id}\`;
                const listItem = document.createElement('li');
                listItem.appendChild(link);
                listItem.style.marginLeft = \`\${(parseInt(header.tagName.replace('H', '')) - 1) * 20}px\`;// Indentation
                tocElement.appendChild(listItem);
            });
        }

        function assignHeaderIds() {
            const headers = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4, #content h5, #content h6');
            headers.forEach((header, index) => {
                header.id = \`section-\${index}\`;
            });
        }

        function initializeToc() {
            assignHeaderIds();
            generateTocLinks();
        }

        window.onload = initializeToc;
    </script>

    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
            );
        }
    </script>

    <script type="text/javascript" 
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
    </script>
</body>
</html>

        `;
                
        ;
    const blob = new Blob([docHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'potato.html';
    a.click();
    URL.revokeObjectURL(url);
};


    downloadHtml.addEventListener('click', () => {
        downloadContentHtml();
    });

    // Download MMD content
    downloadMmd.addEventListener('click', () => {
        const blob = new Blob([contentText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'potato.mmd'; 
        a.click();
        URL.revokeObjectURL(url);
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.download-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});
