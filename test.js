const apiUrl = ""; // Replace with your Hugging Face model URL
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Authorization": "Bearer ", // Replace with your Hugging Face API key
        "Content-Type": "application/json",
        parameters:{"return_all_scores": true}

      },
      body: JSON.stringify({ inputs: request.text })
    })
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.error("Error:", error);
        sendResponse({ success: false, error: error });
      });
    return true; // Will respond asynchronously
  