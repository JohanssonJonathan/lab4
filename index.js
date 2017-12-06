window.addEventListener("load", () => {
    //Söka efter bok
    let searchBookBtn = document.getElementById("searchBookBtn");
    let searchBook = document.getElementById("searchBook");
    let inputKey = document.getElementById("keyin");
    let error = document.getElementsByClassName("error")[0];
    //Söka efter bok
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");
    let webpage = "https://www.googleapis.com/books/v1/volumes?q="
    let key = "&key=AIzaSyCsuyWFqAI8X9ijyfo1vCSMUGdEwgMnFLc&";
    let clickBtn = document.getElementsByClassName('book');
    let fails = document.getElementById("fails")

    let x =0;

    console.log(fails.children[0].innerHTML )

    //////////////////////////////SÖKA/LÄGGA TILL BOK MED API////////////////////////////////////

    function fetchSearch(){
      ulList[1].innerHTML = "";
      fetch(webpage + searchBook.value)
          .then(function (response) {
              return response.json();
          }).then(function (json) {

              error.innerHTML =""
              if(json.items === undefined){
                  error.innerHTML = "Error there is no book with that name"

              }
              let idCount = 0;
              for (let i = 0; i < json.items.length; i++) {
                  let button = document.createElement("button");
                  let li = document.createElement("li");
                  li.className = "list-inline-item col-lg-5 col-sm-10 col-md-12";
                  button.className = "book btn btn-outline-success"
                  button.setAttribute("id", "addBook" + idCount++);
                  li.setAttribute("id", "detail" + idCount++)
                  if (json.items[i].volumeInfo.readingModes.image === false) {
                      li.innerHTML += `<img src="./no_book_for_you.png" width="128" alt="Nothing to show">`;
                  } else {
                      li.innerHTML += `<img src="${json.items[i].volumeInfo.imageLinks.thumbnail}" alt="Nothing to show">`;
                  }
                  button.innerHTML = `Add to list`;
                  li.appendChild(button);
                  li.innerHTML += `Title: <strong>${json.items[i].volumeInfo.title}</strong><br>`;
                  li.innerHTML += `Author: <strong>${json.items[i].volumeInfo.authors}</strong><br>`;
                  li.innerHTML += `Average Rating: <strong>${json.items[i].volumeInfo.pusblished}</strong><br>`;
                  li.innerHTML += `Rating count: <strong>${json.items[i].volumeInfo.averageRating}</strong><br>`;
                  li.innerHTML += `Publisher: <strong>${json.items[i].volumeInfo.publisher}</strong><br>`;
                  ulList[1].appendChild(li);
              }
              for (let i = 0; i < clickBtn.length; i++) {
                  clickBtn[i].addEventListener("click", function () {
                      refresh()
                    function refresh(){
                      fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=T8T4f&title=${json.items[i].volumeInfo.title}&author=${json.items[i].volumeInfo.authors}`)
                          .then(function (resonse) {
                              return resonse.json();
                          }).then(function (json) {
                              if (json.status === "success") {
                                  clickBtn[i].className = "book btn btn-outline-success"
                                  clickBtn[i].innerHTML = `Added!`;
                              } else {
                                x++
                                fails.children[0].innerHTML = x;
                                refresh()

                              }
                          })
                      }
                  });
              }
          })

    }

    searchBookBtn.addEventListener("click", function (event) {

        fetchSearch()
    });

    searchBook.addEventListener("keypress", function (event) {
      if(event.key === "Enter"){
        fetchSearch()
      }
    });
});
