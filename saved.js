document.addEventListener('DOMContentLoaded', function() {
    const savedItemsContainer = document.getElementById('savedItemsContainer');

    function displaySavedItems(items) {
        savedItemsContainer.innerHTML = '';
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'saved-item';

            itemElement.innerHTML = `
                <div class="item-content">
                    ${item.text ? `<p>${item.text}</p>` : ''}
                    ${item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : ''}
                </div>
            `;
            savedItemsContainer.appendChild(itemElement);
        });
    }

    chrome.storage.local.get(['savedData'], function(result) {
        if (result.savedData) {
            displaySavedItems(result.savedData);
        }
    });
});
