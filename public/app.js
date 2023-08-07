// const checkLoginStatus1= async () => {
//     if("token" in localStorage)
//     {
//         window.location.replace("http://localhost:3000/ui/books");
//     }
// }
// const checkLoginStatus2 = async () => {
//     if(localStorage.getItem("token") === null){
//         window.location.replace("http://localhost:3000/ui/login");
//     }
// }

const loginHandler = async () => {
    console.log("email");
    try{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log("reached")
        const data = {
            "email": email,
            "password": password
        }
        const url = "http://localhost:3000/users/login"
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                      "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        // console.log(response)
        const resData = await response.json();
        const token = resData.token;
        console.log(token);
        await localStorage.setItem("token", token);
        // checkLoginStatus1()
    }catch(error){
        console.log(error.message);
    }
}

function fetchBooks() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + localStorage.token, // Replace with your actual token
      'Content-Type': 'application/json'
      // You can add more headers as needed
    });
  
    const requestOptions = {
      method: 'GET',
      headers: headers
    };
  
    return fetch("http://localhost:3000/books", requestOptions) // Replace with your API endpoint
      .then(response => response.json())
      .catch(error => {
        console.error("Error:", error);
      });
  }