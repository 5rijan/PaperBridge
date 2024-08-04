document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-button');
    const dropdownContent = document.getElementById('dropdown-content');
    const downloadHtml = document.getElementById('download-html');
    const downloadMmd = document.getElementById('download-mmd');
    const contentText = localStorage.getItem('formattedText') || 'No content available';

    // Toggle dropdown visibility
    downloadButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });


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
            font-family: Arial, sans-serif; /* Default font family */
            font-size: 16px; /* Default font size */
        }
        #content {
            padding: 20px;
            background-color: white; 
            color: black; 
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            color: black; /* Ensure text color is black in light mode */
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            color: black; /* Ensure text color is black in light mode */
        }
        /* Dark Mode Styles */
        .dark-mode {
            background-color: #333;
            color: white;
        }
        .dark-mode #content {
            background-color: #444;
            color: white;
        }
        .dark-mode table {
            background-color: #333;
            color: white; /* Make text white in dark mode */
        }
        .dark-mode th, .dark-mode td {
            background-color: #444; /* Darker background for table cells in dark mode */
            color: white; /* White text in table cells */
        }
        .dark-mode th {
            background-color: #555; /* Slightly darker for headers in dark mode */
        }
        .dark-mode .header {
            background-color: #222; /* Darker background for the header in dark mode */
            border-bottom: 1px solid #444; /* Adjust border color for the header */
        }
        /* Header Styling */
        .header {
            position: fixed;
            top: 0;
            right: 0;
            width: calc(100% - 20px);
            background: white;
            border-bottom: 1px solid #ddd;
            z-index: 1000;
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: background-color 0.3s, border-bottom 0.3s; /* Transition for dark mode */
        }
        .right-buttons {
            display: flex;
            gap: 10px; /* Space between buttons */
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
    </style>
</head>
<body>
    <div class="header">
        <div class="right-buttons">
            <button id="toggle-button">Dark Mode</button>
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
        </div>
    </div>
    <br>
    <br>
            <div id="content">
                ${content}
            </div>
    <script>
        // Dark Mode Toggle
        const toggleButton = document.getElementById('toggle-button');
        const body = document.body;
        const content = document.getElementById('content');
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

        // Font Size Selector
        const fontSizeSelector = document.getElementById('font-size-selector');
        
        fontSizeSelector.addEventListener('change', () => {
            const fontSize = fontSizeSelector.value;
            content.style.fontSize = fontSize;
        });

        // Font Family Selector
        const fontFamilySelector = document.getElementById('font-family-selector');
        
        fontFamilySelector.addEventListener('change', () => {
            const fontFamily = fontFamilySelector.value;
            body.style.fontFamily = fontFamily;
        });
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
