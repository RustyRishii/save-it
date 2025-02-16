document.addEventListener('DOMContentLoaded', function() {
	const saveButton = document.getElementById('saveButton');
	const textInput = document.getElementById('textInput');
	const linkInput = document.getElementById('linkInput');
	const savedItems = document.getElementById('savedItems');
  
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
	  items.forEach(item => {
		const itemElement = document.createElement('div');
		itemElement.className = 'saved-item';
		itemElement.innerHTML = `
		  <p>${item.text}</p>
		  ${item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : ''}
		  <small>${new Date(item.timestamp).toLocaleString()}</small>
		`;
		savedItems.appendChild(itemElement);
	  });
	}
  });