function checkForFirstPersonPronouns(text) {
    // Define an array of first-person pronouns
    const firstPersonPronouns = ['i', 'iam',"i'am","i'm","i am", "i'll","i ll", "i'd","I've", "we're", "we hv","we'd", "we'll", 'me', 'my', 'mine', 'myself', 'we', 'us', 'our', 'ours', 'ourselves'];

    // Convert the text to lowercase for case-insensitive matching
    const lowerCaseText = text.toLowerCase();

    // Check if the text contains any first-person pronoun
    const containsFirstPersonPronoun = firstPersonPronouns.some(pronoun => {
        const regex = new RegExp(`\\b${pronoun}\\b`, 'i');
        return regex.test(lowerCaseText);
    });

    return containsFirstPersonPronoun;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "sendText" && checkForFirstPersonPronouns(request.text)) {
    const apiUrl = "https://itj9novoo7xxvlxp.us-east-1.aws.endpoints.huggingface.cloud"; // Replace with your Hugging Face model URL
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Authorization": "", // Replace with your Hugging Face API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: request.text,  "parameters": {"top_k": 11}})
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
  }
});
