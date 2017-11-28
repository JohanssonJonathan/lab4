window.addEventListener("load", () => {
    //Fail counter
    let failAddNewCounter = 0;
    //Söka efter bok
    let searchBookBtn = document.getElementById("searchBookBtn");
    let searchBook = document.getElementById("searchBook");
    let failBookSearch = document.getElementById("failBookSearch");
    //Input och listor
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");
    let inputKey = document.getElementById("keyin");
    //Söka efter bok
    let addSearchedBook = document.getElementById("addBkn");
    let addNewBookStatus = document.getElementById("addNewBookStatus");

    name = ""
    author = "";
    id = "";
    datum = "";

    //////////////////////////////LÄGGA TILL BOK MED API////////////////////////////////////
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
    //Datum fix
//    function checkMin(d) {
//        if (d < 10)
//            return "0" + d;
//        else
//            return d;
//    }

    //////////////////////////////SÖKA EFTER BOK MED API////////////////////////////////////
    searchBookBtn.addEventListener("click", function (event) {
        ulList[0].innerHTML = "";
        let datum = new Date();
        let datumet = `${datum.getUTCFullYear()}-${datum.getUTCMonth()+1}-${("0" + datum.getUTCDate()).slice(-2)} ${datum.getUTCHours()+1}:${datum.getUTCMinutes()}:${datum.getUTCSeconds()-1}`;
        console.log(datumet);

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
