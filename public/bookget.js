document.addEventListener('DOMContentLoaded', async () => {
   
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (!accessToken) {
      window.location.href = 'login.html';
    } else {
      try { 
        const headers = new Headers({
            'Authorization': 'Bearer ' + accessToken, // Replace with your actual token
            'Content-Type': 'application/json'
            // You can add more headers as needed
          });
          const requestOptions = {
            method: 'GET',
            headers: headers
          };
        const response = await fetch('http://localhost:3000/books',requestOptions) 
        const booksResponse  = await response.json();
        console.log(booksResponse);
                // const books = JSON.parse(booksResponse)
        const bookList = document.getElementById('book-Table');
        booksResponse.forEach((book) => {
            console.log(book);
          const row = document.createElement('tr');
        //   const td = document.createElement('td');
        //   td.innerHTML = book.title;
          row.innerHTML = 
          `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.price}</td>
            <td>${book.stock}</td>`;
          bookList.appendChild(row);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching books. Please try again.');
      }
    }
  });