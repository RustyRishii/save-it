chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "savePage",
        title: "Save this page",
        contexts: ["page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "savePage") {
        // Retrieve the URL (and optionally title) from the tab
        const url = tab.url;
        const title = tab.title;
        
        // Retrieve the saved data from storage
        chrome.storage.local.get(['savedData'], (result) => {
            const savedData = result.savedData || [];
            
            // Create a new item based on the URL (and title)
            let newItem;
            // If it's a valid URL, store it as a link
            if (/^https?:\/\//.test(url) || /^www\./.test(url)) {
                newItem = {
                    text: '',  // or you could use title if you prefer
                    link: url,
                    timestamp: new Date().toISOString()
                };
            } else {
                newItem = {
                    text: title,
                    link: '',
                    timestamp: new Date().toISOString()
                };
            }
            
            // Save the updated data
            savedData.push(newItem);
            chrome.storage.local.set({ savedData: savedData });
        });
    }
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === "open_extension") {
      chrome.action.openPopup(function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      });
    }
  });
  