window.addEventListener("load", () => {
    //Söka efter bok
    let searchBookBtn = document.getElementById("searchBookBtn");
    let searchBook = document.getElementById("searchBook");
    let inputKey = document.getElementById("keyin");
    //Söka efter bok
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");



    let clickBtn = document.getElementsByClassName('book');

    //////////////////////////////SÖKA/LÄGGA TILL BOK MED API////////////////////////////////////
    searchBookBtn.addEventListener("click", function (event) {
        fetch(`http://api.boktipset.se/book/search.cgi?accesskey=3KWiPjmHsjXZChC7YaQvSg&userkey=rZqiGeHZ&format=json&value=${searchBook.value}`)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                ulList[1].innerHTML = "";
                let idCount = 0;
                for (let i = 0; i < json.answer.books.book.length; i++) {
                    let button = document.createElement("button");
                    let li = document.createElement("li");
                    li.className = "list-inline-item col-lg-5 col-sm-10 col-md-12";
                    button.className = "book btn btn-outline-success"
                    button.setAttribute("id", "addBook" + idCount++);
                    li.innerHTML += `<img src="${json.answer.books.book[i].image}">`;
                    button.innerHTML = `Add to list`;
                    li.appendChild(button);
                    li.innerHTML += `Title: <strong>${json.answer.books.book[i].name}</strong><br>`;
                    li.innerHTML += `Author: <strong>${json.answer.books.book[i].author_name}</strong><br>`;
                    ulList[1].appendChild(li);
                }
                for (let i = 0; i < clickBtn.length; i++) {
                    clickBtn[i].addEventListener("click", function () {
                        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=T8T4f&title=${json.answer.books.book[i].name}&author=${json.answer.books.book[i].author_name}`)
                            .then(function (resonse) {
                                return resonse.json();
                            }).then(function (json) {
                                if (json.status === "success") {
                                    clickBtn[i].className = "book btn btn-outline-success"
                                    clickBtn[i].innerHTML = `Added!`;
                                } else {
                                    clickBtn[i].className = "book btn btn-danger"
                                    clickBtn[i].innerHTML = `Oops! try again`;
                                }
                            })
                    });
                }
            })
    });
});
