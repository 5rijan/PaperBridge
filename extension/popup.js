document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('convert');
  const mmdFileInput = document.getElementById('mmdFile');

  let text = ""; 

  convertButton.addEventListener('click', () => {
    console.log('Convert button clicked.');

    const file = mmdFileInput.files[0];
    if (!file) {
      alert('Please select an .mmd file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      console.log('File loaded successfully.');

      const fileContent = event.target.result;
      text = formatMmdContent(fileContent); // Update the text variable
      console.log('Formatted content:', text); // Log the formatted content 
      try {
        localStorage.setItem('formattedText', text);
        console.log('Formatted text saved to localStorage.');
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    };

    reader.readAsText(file);
  });
});

function formatMmdContent(fileContent) {
  const lines = fileContent;
  return lines;
}
