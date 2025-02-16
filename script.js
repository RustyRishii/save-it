document.addEventListener('DOMContentLoaded', function() {
	const saveButton = document.getElementById('saveButton');
	const textInput = document.getElementById('textInput');
	const linkInput = document.getElementById('linkInput');
	const savedItems = document.getElementById('savedItems');



	// Add event listeners for Enter key
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveItem();
        }
    });

    linkInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveItem();
        }
    });

    // Modify save button click handler to use the same save function
    saveButton.addEventListener('click', saveItem);

    // Create a separate function for saving items to avoid code duplication
    function saveItem() {
        const text = textInput.value;
        const link = linkInput.value;
        
        if (text || link) {
            const newItem = {
                text: text,
                link: link,
                timestamp: new Date().toISOString()
            };

            chrome.storage.local.get(['savedData'], function(result) {
                const savedData = result.savedData || [];
                savedData.push(newItem);
                
                chrome.storage.local.set({ savedData: savedData }, function() {
                    displaySavedItems(savedData);
                    textInput.value = '';
                    linkInput.value = '';
                });
            });
        }
    }


  
	// Load saved items when popup opens
	chrome.storage.local.get(['savedData'], function(result) {
	  if (result.savedData) {
		displaySavedItems(result.savedData);
	  }
	});
  
	saveButton.addEventListener('click', function() {
	  const text = textInput.value;
	  const link = linkInput.value;
	  
	  if (text || link) {
		const newItem = {
		  text: text,
		  link: link,
		  timestamp: new Date().toISOString()
		};
  
		chrome.storage.local.get(['savedData'], function(result) {
		  const savedData = result.savedData || [];
		  savedData.push(newItem);
		  
		  chrome.storage.local.set({ savedData: savedData }, function() {
			displaySavedItems(savedData);
			textInput.value = '';
			linkInput.value = '';
		  });
		});
	  }
	});

	function displaySavedItems(items) {
		savedItems.innerHTML = '';
		items.forEach((item, index) => {
			const itemElement = document.createElement('div');
			itemElement.className = 'saved-item';
			
			// Create both copy and delete buttons with SVG
			const copyButton = `
				<button class="copy-button">
					<img src="copy.svg" alt="Copy" width="24" height="24">
				</button>
			`;
	
			const deleteButton = `
				<button class="delete-button">
					<img src="delete.svg" alt="Delete" width="24" height="24">
				</button>
			`;
	
			itemElement.innerHTML = `
				<div class="item-container">
					${copyButton}
					<div class="item-content">
						${item.text ? `<p>${item.text}</p>` : ''}
						${item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : ''}
					</div>
					${deleteButton}
				</div>
			`;
	
			// Copy button functionality
			const copyBtn = itemElement.querySelector('.copy-button');
			copyBtn.addEventListener('click', () => {
				const textToCopy = item.text || item.link;
				navigator.clipboard.writeText(textToCopy)
					.then(() => {
						copyBtn.classList.add('copied');
						setTimeout(() => {
							copyBtn.classList.remove('copied');
						}, 1000);
					})
					.catch(err => {
						console.error('Failed to copy:', err);
					});
			});
	
			// Delete button functionality
			const deleteBtn = itemElement.querySelector('.delete-button');
			deleteBtn.addEventListener('click', () => {
				chrome.storage.local.get(['savedData'], function(result) {
					const savedData = result.savedData || [];
					savedData.splice(index, 1); // Remove the item at current index
					
					chrome.storage.local.set({ savedData: savedData }, function() {
						displaySavedItems(savedData); // Refresh the display
					});
				});
			});
	
			savedItems.appendChild(itemElement);
		});
	}

	const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all saved items?')) {
        chrome.storage.local.set({ savedData: [] }, function() {
            displaySavedItems([]);
        });
    }
});
  });

  //<small>${new Date(item.timestamp).toLocaleString()}</small>