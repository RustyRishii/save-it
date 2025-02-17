// document.addEventListener('DOMContentLoaded', function() {
//     const saveButton = document.getElementById('saveButton');
//     const clearButton = document.getElementById('clearButton');
//     const smartInput = document.getElementById('smartInput');
//     const savedItems = document.getElementById('savedItems');
//     const saveCurrentTabButton = document.getElementById('saveCurrentTabButton');

//     function isValidUrl(string) {
//         try {
//             return /^https?:\/\/|^www\./.test(string) && Boolean(new URL(string.includes('://') ? string : 'https://' + string));
//         } catch {
//             return false;
//         }
//     }

//     function updateStorageInfo() {
//         chrome.storage.local.getBytesInUse(null, function(bytesInUse) {
//             const mbUsed = (bytesInUse / 1024 / 1024).toFixed(2);
//             const maxMB = 10;
//             const percentUsed = ((bytesInUse / (maxMB * 1024 * 1024)) * 100).toFixed(1);
            
//             document.getElementById('storageUsage').textContent = 
//                 `Storage used: ${mbUsed}MB / ${maxMB}MB (${percentUsed}%)`;
//         });
//     }

//     function saveItem(text) {
//         if (text) {
//             let newItem;
            
//             if (isValidUrl(text)) {
//                 newItem = {
//                     text: '',
//                     link: text.includes('://') ? text : 'https://' + text,
//                     timestamp: new Date().toISOString()
//                 };
//             } else {
//                 newItem = {
//                     text: text,
//                     link: '',
//                     timestamp: new Date().toISOString()
//                 };
//             }

//             chrome.storage.local.get(['savedData'], function(result) {
//                 const savedData = result.savedData || [];
//                 savedData.push(newItem);
                
//                 chrome.storage.local.set({ savedData: savedData }, function() {
//                     displaySavedItems(savedData);
//                     smartInput.value = '';
//                     updateStorageInfo();
//                 });
//             });
//         }
//     }

//     function displaySavedItems(items) {
//         savedItems.innerHTML = '';
//         items.forEach((item, index) => {
//             const itemElement = document.createElement('div');
//             itemElement.className = 'saved-item';
            
//             const copyButton = `
//                 <button class="copy-button">
//                     <img src="copy.svg" alt="Copy" width="24" height="24">
//                 </button>
//             `;
    
//             const deleteButton = `
//                 <button class="delete-button">
//                     <img src="delete.svg" alt="Delete" width="24" height="24">
//                 </button>
//             `;
    
//             itemElement.innerHTML = `
//                 <div class="item-container">
//                     ${copyButton}
//                     <div class="item-content">
//                         ${item.text ? `<p>${item.text}</p>` : ''}
//                         ${item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : ''}
//                     </div>
//                     ${deleteButton}
//                 </div>
//             `;
    
//             // Copy button functionality
//             const copyBtn = itemElement.querySelector('.copy-button');
//             copyBtn.addEventListener('click', () => {
//                 const textToCopy = item.text || item.link;
//                 navigator.clipboard.writeText(textToCopy)
//                     .then(() => {
//                         copyBtn.classList.add('copied');
//                         setTimeout(() => {
//                             copyBtn.classList.remove('copied');
//                         }, 1000);
//                     })
//                     .catch(err => {
//                         console.error('Failed to copy:', err);
//                     });
//             });
    
//             // Delete button functionality
//             const deleteBtn = itemElement.querySelector('.delete-button');
//             deleteBtn.addEventListener('click', () => {
//                 chrome.storage.local.get(['savedData'], function(result) {
//                     const savedData = result.savedData || [];
//                     savedData.splice(index, 1);
                    
//                     chrome.storage.local.set({ savedData: savedData }, function() {
//                         displaySavedItems(savedData);
//                         updateStorageInfo();
//                     });
//                 });
//             });
    
//             savedItems.appendChild(itemElement);
//         });
//     }

// 	function saveCurrentTab() {
// 		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// 			if (chrome.runtime.lastError) {
// 				console.error(chrome.runtime.lastError.message);
// 				return;
// 			}
// 			if (tabs.length > 0) {
// 				saveItem(tabs[0].url);
// 			} else {
// 				console.error("No active tab found.");
// 			}
// 		});
// 	}
	

//     // Load saved items when popup opens
//     chrome.storage.local.get(['savedData'], function(result) {
//         if (result.savedData) {
//             displaySavedItems(result.savedData);
//         }
//         updateStorageInfo();
//     });

//     // Event Listeners
//     smartInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             saveItem(smartInput.value.trim());
//         }
//     });

//     saveButton.addEventListener('click', () => saveItem(smartInput.value.trim()));

//     clearButton.addEventListener('click', function() {
//         if (confirm('Are you sure you want to clear all saved items?')) {
//             chrome.storage.local.set({ savedData: [] }, function() {
//                 displaySavedItems([]);
//                 updateStorageInfo();
//             });
//         }
//     });

// 	document.getElementById('openSavedPage').addEventListener('click', function() {
// 		chrome.tabs.create({ url: chrome.runtime.getURL('saved.html') });
// 	});

//     saveCurrentTabButton.addEventListener('click', saveCurrentTab);
// });


document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const smartInput = document.getElementById('smartInput');
    const savedItems = document.getElementById('savedItems');
    const saveCurrentTabButton = document.getElementById('saveCurrentTabButton');

    function isValidUrl(string) {
        try {
            return /^https?:\/\/|^www\./.test(string) && Boolean(new URL(string.includes('://') ? string : 'https://' + string));
        } catch {
            return false;
        }
    }

    function updateStorageInfo() {
        chrome.storage.local.getBytesInUse(null, function(bytesInUse) {
            const mbUsed = (bytesInUse / 1024 / 1024).toFixed(2);
            const maxMB = 10;
            const percentUsed = ((bytesInUse / (maxMB * 1024 * 1024)) * 100).toFixed(1);
            
            document.getElementById('storageUsage').textContent = 
                `Storage used: ${mbUsed}MB / ${maxMB}MB (${percentUsed}%)`;
        });
    }

    function saveItem(text) {
        if (text) {
            let newItem;
            
            if (isValidUrl(text)) {
                newItem = {
                    text: '',
                    link: text.includes('://') ? text : 'https://' + text,
                    timestamp: new Date().toISOString()
                };
            } else {
                newItem = {
                    text: text,
                    link: '',
                    timestamp: new Date().toISOString()
                };
            }

            chrome.storage.local.get(['savedData'], function(result) {
                const savedData = result.savedData || [];
                savedData.push(newItem);
                
                chrome.storage.local.set({ savedData: savedData }, function() {
                    displaySavedItems(savedData);
                    smartInput.value = '';
                    updateStorageInfo();
                });
            });
        }
    }

    function displaySavedItems(items) {
        savedItems.innerHTML = '';
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'saved-item';
            
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
                    savedData.splice(index, 1);
                    
                    chrome.storage.local.set({ savedData: savedData }, function() {
                        displaySavedItems(savedData);
                        updateStorageInfo();
                    });
                });
            });
    
            savedItems.appendChild(itemElement);
        });
    }

    function saveCurrentTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            if (tabs.length > 0) {
                saveItem(tabs[0].url);
            } else {
                console.error("No active tab found.");
            }
        });
    }
    
    // Load saved items when popup opens
    chrome.storage.local.get(['savedData'], function(result) {
        if (result.savedData) {
            displaySavedItems(result.savedData);
        }
        updateStorageInfo();
    });

    // Event Listeners
    smartInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveItem(smartInput.value.trim());
        }
    });

    saveButton.addEventListener('click', () => saveItem(smartInput.value.trim()));

    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all saved items?')) {
            chrome.storage.local.set({ savedData: [] }, function() {
                displaySavedItems([]);
                updateStorageInfo();
            });
        }
    });

    document.getElementById('openSavedPage').addEventListener('click', function() {
        chrome.tabs.create({ url: chrome.runtime.getURL('saved.html') });
    });

    saveCurrentTabButton.addEventListener('click', saveCurrentTab);

    // --- Right-click Context Save Functionality ---
    // This listens for messages from the background script (triggered by the context menu)
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'savePage') {
            saveItem(request.url);
            sendResponse({ status: 'success' });
        }
    });
});
