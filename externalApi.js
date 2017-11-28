window.addEventListener("load", () => {

    let searchBookBtn = document.getElementById("searchBookBtn");
    let searchBook = document.getElementById("searchBook");
    let consoleOutput = document.getElementById("consoleOutput");
    let failBookSearch = document.getElementById("failBookSearch");

    let ajaxAdd = new XMLHttpRequest(); // NEW AJAX REQUEST
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");
    let inputKey = document.getElementById("keyin");

    let failAddNewCounter = 0;
    let addSearchedBook = document.getElementById("addBkn");
    let addNewBookStatus = document.getElementById("addNewBookStatus");

    console.log(inputKey.value)

    name = ""
    author = "";
    id = "";
    datum = "";

    addSearchedBook.addEventListener("click", function (event) {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${inputKey.value}&title=${name}&author=${author}`)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);
                if (json.id === undefined) {
                    failAddNewCounter = failAddNewCounter + 1;
                    addNewBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br>
                                    Fail counter: <strong>${failAddNewCounter}</strong>`;
                } else {
                    addNewBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br>
                                    Book ID: <strong>${json.id}</strong>`;
                }
            })
    });

    function checkMin(d) {
        if (d < 10)
            return "0" + d
        else
            return d
    }

    //////////////////////////////SÖKA EFTER BOK////////////////////////////////////

    searchBookBtn.addEventListener("click", function (event) {
        let datum = new Date();
        //Exempel: 2017-11-27 09:58:44 
        let datumet = `${datum.getFullYear()}-${datum.getMonth()}-${datum.getDay()} ${datum.getHours()}:${checkMin(datum.getMinutes())}:${datum.getSeconds()}`;

        fetch(`http://api.boktipset.se/book/search.cgi?accesskey=3KWiPjmHsjXZChC7YaQvSg&userkey=rZqiGeHZ&format=json&value=${searchBook.value}`)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                let addLi = document.createElement("li");
                console.log(json);
                name = json.answer.books.book[0].name;
                author = json.answer.books.book[0].author_name;
                id = json.answer.books.book[0].id;
                datum = datumet;
                addLi.innerHTML += `Title: <strong>${json.answer.books.book[0].name}</strong><br>`;
                addLi.innerHTML += `Author: <strong>${json.answer.books.book[0].author_name}</strong><br>`;
                ulList[0].appendChild(addLi);
            })

    });
});
