document.addEventListener('DOMContentLoaded', () => {
    const storedText = localStorage.getItem('formattedText');
    const el = document.getElementById('content-text');
    const saveButton = document.getElementById('save-button');
    const contextMenu = document.getElementById('context-menu');
    const insertImageOption = document.getElementById('insert-image');
    const insertTableOption = document.getElementById('insert-table');
    const imageForm = document.getElementById('image-form');
    const tableForm = document.getElementById('table-form');
    const confirmImageButton = document.getElementById('confirm-image');
    const confirmTableButton = document.getElementById('confirm-table');
    
    let currentSelection;

    if (storedText) {
        el.innerHTML = decodeHtmlEntities(storedText);
    } else {
        console.error('No formatted text found in localStorage!');
    }

    el.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent the default context menu
        currentSelection = window.getSelection().getRangeAt(0);
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
    });

    document.addEventListener('click', () => {
        contextMenu.style.display = 'none'; 
    });

    insertImageOption.addEventListener('click', () => {
        imageForm.style.display = 'block'; 
    });

    insertTableOption.addEventListener('click', () => {
        tableForm.style.display = 'block'; 
    });

    confirmImageButton.addEventListener('click', () => {
        const imageURL = document.getElementById('image-url').value;
        const imageCaption = document.getElementById('image-caption').value;
        const imageWidth = document.getElementById('image-width').value;
        const imageHeight = document.getElementById('image-height').value;
        const imageAlignment = document.getElementById('image-alignment').value;

        if (imageURL && imageCaption) {
            const figureTemplate = `
\\begin{figure}
\\includegraphics[width=${imageWidth || '350'}px, height=${imageHeight || '70'}px, ${imageAlignment || 'right'}]{${imageURL}}
\\caption{${imageCaption}}
\\label{fig:figure${Date.now()}}
\\end{figure}
`;
            insertTextAtCursor(currentSelection, figureTemplate);
            imageForm.style.display = 'none'; 
        } else {
            alert('Please enter a valid image URL and caption.');
        }
    });

    confirmTableButton.addEventListener('click', () => {
        const tableCaption = document.getElementById('table-caption').value;
        const csvFile = document.getElementById('csv-file').files[0];

        if (csvFile && tableCaption) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const csvContent = e.target.result;
                const tableCode = csvToMmd(csvContent, tableCaption);
                insertTextAtCursor(currentSelection, tableCode);
                tableForm.style.display = 'none'; 
            };

            reader.readAsText(csvFile);
        } else {
            alert('Please select a CSV file and enter a table caption.');
        }
    });

    function csvToMmd(csvContent, caption) {
        const rows = csvContent.split('\n').map(row => row.split(',').map(cell => cell.trim()));
        while (rows.length && rows[0].length === 0) rows.shift();
        while (rows.length && rows[rows.length - 1].length === 0) rows.pop();
        const alignments = rows[0].map(() => 'l');
        const colFormat = "|" + alignments.join("|") + "|";
    
        let mmdContent = "  \\begin{tabular}{" + colFormat + "}\n";
        mmdContent += "    \\hline\n";
    
        rows.forEach((row, rowIndex) => {
            const rowContent = row.map(col => {
                const escapedCol = col
                    ? `{${col.replace(/\\/g, '\\textbackslash ').replace(/&/g, '\\&').replace(/_/g, '\\_')}}`
                    : `{}`;
                return escapedCol;
            }).join(" & ");
    
            if (rowIndex === 0) {
                mmdContent += `    ${rowContent} \\\\\n`;
                mmdContent += "    \\hline\n";
            } else {
                mmdContent += `    ${rowContent} \\\\\n`;
                mmdContent += "    \\hline\n";
            }
        });
    
        mmdContent += "  \\end{tabular}\n";
        mmdContent += `\\${caption}\n`;
    
        return mmdContent;
    }

    function insertTextAtCursor(selection, text) {
        if (selection) {
            selection.deleteContents();

            const textNode = document.createTextNode(text);
            selection.insertNode(textNode);
            selection.setStartAfter(textNode);
            selection.setEndAfter(textNode);
            const range = document.createRange();
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
    saveButton.addEventListener('click', () => {
        const contentText = el.innerHTML;
        const decodedText = decodeHtmlEntities(contentText);
            localStorage.setItem('formattedText', decodedText);
    
        alert('Changes saved successfully!');
        window.location.href = 'example.html';
    });
    
    function decodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }
    
    function encodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.textContent = text;
        return textarea.innerHTML;
    }
    
});
