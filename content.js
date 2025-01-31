let typingTimer; // Timer identifier
const debounceDelay = 1000; // Delay in milliseconds before making the API call



// Listen for keyup events in text input and text area elements
document.addEventListener('keyup', function(event) {
  const element = event.target;

  console.log(element);




  const inputFields_e_1 = element.querySelectorAll('span'); // ## works for twitter

  inputFields_e_1.forEach(field => {
    const typed_text = field.innerHTML;

    console.log(typed_text);

    if (!String(field.innerHTML).includes('<span')){
      console.log(typed_text);
      handleTextInputFromSpan(typed_text)
    }
  });
});



function handleTextInputFromSpan(text_i){
  const inputText = text_i;
  
  if (inputText) {
    clearTimeout(typingTimer); // Clear the timer
    typingTimer = setTimeout(() => {
      // Send the input text to the background script
      chrome.runtime.sendMessage({ action: 'sendText', text: inputText }, function(response) {
        if (response.success) {
          showPopup(response.data);
          chrome.storage.local.set({ apiResponse: response.data }); // Store response for popup
        } else {
          console.error("API Error:", response.error);
        }
      });
    }, debounceDelay); // Call after the user stops typing
  }
}


// Function to handle the text input
function handleTextInput(event) {
  const inputText = event.target.value.trim();
  
  if (inputText) {
    clearTimeout(typingTimer); // Clear the timer
    typingTimer = setTimeout(() => {
      // Send the input text to the background script
      chrome.runtime.sendMessage({ action: 'sendText', text: inputText }, function(response) {
        if (response.success) {
          showPopup(response.data);
          chrome.storage.local.set({ apiResponse: response.data }); // Store response for popup
        } else {
          console.error("API Error:", response.error);
        }
      });
    }, debounceDelay); // Call after the user stops typing
  }
}

// Listen for text selection
document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString();
  
  if (selectedText) {
    // Send the selected text to the background script
    chrome.runtime.sendMessage({ action: 'sendText', text: selectedText }, function(response) {
      if (response.success) {
        showPopup(response.data);
        chrome.storage.local.set({ apiResponse: response.data }); // Store response for popup
      } else {
        console.error("API Error:", response.error);
      }
    });
  }
});


// Listen for input on text fields
const inputFields = document.querySelectorAll('input[type="text"]');
inputFields.forEach(field => {
  field.addEventListener('input', handleTextInput);
});

const inputFields_text_area = document.querySelectorAll('textarea');
inputFields_text_area.forEach(field => {
  field.addEventListener('input', handleTextInput);
});


// document.querySelectorAll('[data-foo="value"]');

const inputFields_text_area_inner = document.querySelectorAll('span[data-text="true"]');
inputFields_text_area.forEach(field => {
  field.addEventListener('input', handleTextInput);
});






function showPopup(data) {
  const existingPopup = document.getElementById('apiResponsePopup');
  if (existingPopup) {
    existingPopup.remove(); // Remove existing popup if present
  }



  // Create a new div for the popup
  const popup = document.createElement('div');
  popup.id = 'apiResponsePopup';
  popup.style.position = 'fixed'; // Fixed positioning
  popup.style.backgroundColor = '#c8e7ff'; // Standout background color
  popup.style.color = '#FFFFFF'; // Text color
  popup.style.borderRadius = '2px'; // Rounded corners
  popup.style.padding = '5px'; // More padding
  popup.style.zIndex = '10000';
  popup.style.maxWidth = '300px';
  popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'; // Deeper shadow
  popup.style.textAlign = 'center'; // Center text
  popup.style.fontFamily = 'Arial, sans-serif'; // Font family change
  popup.style.fontSize = '16px'; // Font size

  // Create a table to display the key-value pairs
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse'; // Remove gaps between cells

  // Create table headers
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Self-Disclosures';
  headerCell.style.color = '#cc3300'; // Header text color
  headerCell.style.padding = '4px'; // Padding for header
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  // Add each key-value pair as a new row in the table
  Object.entries(data).forEach(([key, value]) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');

    sd_type = value['label'];
    sd_score = value['score'];
    if (sd_score > 0.01){ //threshold can be changed
      cell.textContent = sd_type; // Display only the key
      
      cell.style.border = '1px solid #FFFFFF'; // Cell border
      cell.style.color = '#FFFFFF'; // Cell text color

      // cel.style.backgroundColor = '#f5f5f5'; // Light gray background color
      cell.style.color = '#333'; // Dark text color

      cell.style.padding = '8px'; // Padding for cells
      row.appendChild(cell);
      table.appendChild(row);
    }
  });

  // Append the table to the popup
  popup.appendChild(table);
  document.body.appendChild(popup);

  // Position the popup in the center of the screen
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;


  // Position the popup in the top-right corner of the screen
  popup.style.right = '20px'; // Distance from the right edge
  popup.style.top = '20px'; // Distance from the top edge

  // popup.style.left = `${(viewportWidth - popupWidth) / 2}px`;
  // popup.style.top = `${(viewportHeight - popupHeight) / 2}px`;

  // Automatically remove the popup after a few seconds
  setTimeout(() => {
    popup.remove();
  }, 5000);
}