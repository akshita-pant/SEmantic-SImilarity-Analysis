// Get references to DOM elements
const form = document.getElementById('similarity-form');
const skipgramButton = document.getElementById('skipgram');
const cbowButton = document.getElementById('cbow');
const similarityValues = []; // Array to store similarity values
let chartInstance = null; // Keeps track of the chart for updates
var selectedButton = "skipgram";

// Function to send POST request for Skip-gram similarity
async function sendSkipGramSimilarityRequest(sentence1, sentence2, model) {
  const url = '/skipgram-similarity100';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          sentence1: sentence1,
          sentence2: sentence2,
          model: model,
      }),
    });
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    if (responseData.error) {  // Check for errors in response data
      throw new Error(responseData.error);
    }
    // Store the similarity value and log it
    similarity = responseData.similarity;
    console.log('Similarity:', similarity);

    similarityValues.push(similarity);// Add similarity to the array

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to send POST request for CBOW similarity
async function sendCbowSimilarityRequest(sentence1, sentence2, model) {
  const url = '/cbow-similarity100';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          sentence1: sentence1,
          sentence2: sentence2,
          model: model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    if (responseData.error) {
      throw new Error(responseData.error);
    }

    similarity = responseData.similarity;
    console.log('Similarity:', similarity);

    similarityValues.push(similarity);

  } catch (error) {
    console.error('Error:', error.message);
  }
}
// Function to send requests with a delay for each model version
function sendRequestWithDelay(sentence1, sentence2, versions) {
  versions.forEach((version, index) => {
    setTimeout(() => {
      if(selectedButton == "skipgram"){
        sendSkipGramSimilarityRequest(sentence1, sentence2, version);
      }
      else{
        sendCbowSimilarityRequest(sentence1, sentence2, version);
      }
    }, index * 200);
  });
}
// Event listener for form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const sentence1 = document.getElementById('sentence1').value;
    const sentence2 = document.getElementById('sentence2').value;

    similarityValues.length = 0; // Clear the array

    sendRequestWithDelay(sentence1, sentence2, ['1', '2', '3', '4', '5']);


    // Create or update the chart after all similarity values are fetched
    setTimeout(() => {
      createOrUpdateChart();
    }, 1000);
});
// Function to create or update the chart with similarity values
function createOrUpdateChart() {
  const chartContainer = document.getElementById('chart-container');
  chartContainer.innerHTML = ''; // Clear the container

  if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart instance
  }

  const chartData = {
      labels: ['type 1', 'type 2', 'type 3', 'type 4', 'type 5'],
      datasets: [
          {
              label: 'Cosine Similarity',
              data: similarityValues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              borderRadius: 5,
          },
      ],
  };
 // Configuration for the chart
  const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 1,
              },
          },
      },
  };
 // Create a new canvas element for the chart
  const chartCanvas = document.createElement('canvas');
  chartContainer.appendChild(chartCanvas);
 // Create the new chart instance
  chartInstance = new Chart(chartCanvas, chartConfig);
}
// Function to handle Skip-gram button selection
function selectSkipGram(){
  skipgramButton.style.backgroundColor = "white";
  cbowButton.style.backgroundColor = "#ffffff32";
  selectedButton = "skipgram";
  const sentence1 = document.getElementById('sentence1').value;
  const sentence2 = document.getElementById('sentence2').value;
  similarityValues.length = 0; // Clear the array
  sendRequestWithDelay(sentence1, sentence2, ['1', '2', '3', '4', '5']);
  // Create or update the chart after all similarity values are fetched
  setTimeout(() => {
    createOrUpdateChart();
  }, 1000);
}

function selectCBOW(){
  cbowButton.style.backgroundColor = "white";
  skipgramButton.style.backgroundColor = "#ffffff32";
  selectedButton = "cbow";
  const sentence1 = document.getElementById('sentence1').value;
  const sentence2 = document.getElementById('sentence2').value;
  similarityValues.length = 0; // Clear the array
  sendRequestWithDelay(sentence1, sentence2, ['1', '2', '3', '4', '5']);
  // Create or update the chart after all similarity values are fetched
  setTimeout(() => {
    createOrUpdateChart();
  }, 1000);
}