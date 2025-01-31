document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('apiResponse', function(result) {
    const data = result.apiResponse;

    if (data) {
      console.log(data)
      const container = document.getElementById('apiResponseContainer');
      const table = document.createElement('table');

      // Create table headers
      const headerRow = document.createElement('tr');
      const headerCellKey = document.createElement('th');
      const headerCellValue = document.createElement('th');
      // headerCellKey.textContent = 'Self-Disclosure';
      // headerCellValue.textContent = 'Confidence';
      headerRow.appendChild(headerCellKey);
      // headerRow.appendChild(headerCellValue);
      table.appendChild(headerRow);


      table.style.backgroundColor = '#f5f5f5'; // Light gray background color
      table.style.color = '#333'; // Dark text color

      // Add each key-value pair as a new row in the table
      Object.entries(data).forEach(([key, value]) => {

        sd_type = value['label'];
        sd_score = value['score'];

        const row = document.createElement('tr');
        const cell = document.createElement('td');

        sd_type = value['label'];
        sd_score = value['score'];
        if (sd_score > 0.01){
          cell.textContent = sd_type; // Display only the key
          
          cell.style.border = '1px solid #FFFFFF'; // Cell border
          cell.style.color = '#FFFFFF'; // Cell text color

          // cel.style.backgroundColor = '#f5f5f5'; // Light gray background color
          cell.style.color = '#333'; // Dark text color

          cell.style.padding = '8px'; // Padding for cells
          row.appendChild(cell);
          table.appendChild(row);
        }


        // if (key == 'label'){
        //   const row = document.createElement('tr');
        //   const cellKey = document.createElement('td');
        //   const cellValue = document.createElement('td');
        //   cellKey.textContent = key;
        //   cellValue.textContent = value; // Display the value
        //   // row.appendChild(cellKey);
        //   row.appendChild(cellValue);
        //   table.appendChild(row);
        // }
      });

      // Append the table to the container
      container.appendChild(table);
    }
  });
});