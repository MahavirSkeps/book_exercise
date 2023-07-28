const axios = require('axios');

async function makePostRequest(postData) {
  try {
    const response = await axios.post('https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process', postData);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

// Example usage (inside an async function):
async function fetchData() {
    const postData = {
        "card_number": "1122334455667788",
        "cvv": "123",
        "expiry": "07/23",
        "currency": "USD",
        "amount": 0.01
      }

  try {
    const responseData = await makePostRequest(postData);
    console.log('Response Data:', responseData);
    // You can use the responseData here or perform any other operations with it
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchData();





// const axios = require('axios');

// const postData = {
//     "card_number": "1122334455667788",
//     "cvv": "123",
//     "expiry": "07/23",
//     "currency": "USD",
//     "amount": 0.01
//   }

// axios.post('https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process', postData)
//   .then((response) => {
//     // console.log(`Status Code: ${response.status}`);
//     // console.log('Response Data:', response.data);
    
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


