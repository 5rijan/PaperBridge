(function() {
  const createSplitView = () => {
      document.body.innerHTML = '';
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.height = '100vh';
      container.style.position = 'relative'; 

      const leftFrame = document.createElement('iframe');
      leftFrame.src = window.location.href; 
      leftFrame.style.width = '50%';
      leftFrame.style.height = '100%';
      leftFrame.style.border = 'none';

      const rightFrame = document.createElement('iframe');
      rightFrame.src = chrome.runtime.getURL('example.html'); 
      rightFrame.style.width = '50%';
      rightFrame.style.height = '100%';
      rightFrame.style.border = 'none';

      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.innerHTML = '&times;'; 
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.backgroundColor = '#f44336';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.padding = '10px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '18px';
      closeButton.style.zIndex = '1000';
      closeButton.style.borderRadius = '5px';
      closeButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
      closeButton.style.transition = 'background-color 0.3s';

      closeButton.onmouseover = () => {
          closeButton.style.backgroundColor = '#d32f2f'; 
      };

      closeButton.onmouseout = () => {
          closeButton.style.backgroundColor = '#f44336';
      };

      closeButton.onclick = () => {
          // Expand the left iframe to take full width when closing the right iframe
          leftFrame.style.width = '100%';
          rightFrame.remove(); 
          closeButton.remove(); 
      };

      container.appendChild(leftFrame);
      container.appendChild(rightFrame);
      container.appendChild(closeButton);

      document.body.appendChild(container);
  };
  createSplitView();
})();
