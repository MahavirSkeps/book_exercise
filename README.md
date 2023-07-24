# book_exercise
Assignment

#userapi's
 signup api :  post request localhost:3000/signup 

body = {
    {
      "name": "string",
    "email":"string",
    "role": "string",
    "password":" string"
}
}
return user And jwt token

login api :
 post request localhost:3000/users/login
 body = 
    {
    "email":"string",
    "password":" string"
}

book API's
Get Books: Get request localhost:3000/books

Add book : post request localhost:3000/add/book
Header = authorization = (Bearer jwt token)
body = {
    "title": string,
  "author":string,
   "price": int,
    "stock": int
}
update book : post request localhost:3000/update/book
Header = authorization = (Bearer jwt token)
body = {
    "title": string,
  "author":string,
   "price": int,
    "stock": int
}

Delete Book : Delete request /delete/book/:id?
id = book_id which we want to delete








