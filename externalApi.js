window.addEventListener("load", () => {

    let searchBookBtn = document.getElementById("searchBookBtn");
    let searchBook = document.getElementById("searchBook");
    let consoleOutput = document.getElementById("consoleOutput");
    let failBookSearch = document.getElementById("failBookSearch");

    let ajaxAdd = new XMLHttpRequest(); // NEW AJAX REQUEST
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");
    let inputKey = document.getElementById("keyin");
    let addSearchedBook = document.getElementById("addBkn");


    console.log(inputKey.value)

    name = ""
    author = "";
    id = "";
    datum = "";

    addSearchedBook.addEventListener("click", () => {
        console.log(searchBook.value)
        ajaxAdd.onreadystatechange = function () {
            if (ajaxAdd.readyState === 4) {
                console.log("klaar!")
            }
        }
        ajaxAdd.open("get", `https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${inputKey.value}&title=${name}&author=${author}`)
        ajaxAdd.send()
    })

    function checkMin(d) {
        if (d < 10)
            return "0" + d
        else
            return d
    }

    //////////////////////////////SÖKA EFTER BOK////////////////////////////////////
    searchBookBtn.addEventListener("click", function (e) {
        let datum = new Date();
        //Exempel: 2017-11-27 09:58:44 
        let datumet = `${datum.getFullYear()}-${datum.getMonth()}-${datum.getDay()} ${datum.getHours()}:${checkMin(datum.getMinutes())}:${datum.getSeconds()}`;

        ajaxAdd.onreadystatechange = function () {
            let addLi = document.createElement("li");
            ulList[0].innerHTML = "";
            if (ajaxAdd.readyState === 4) {
                let json = JSON.parse(ajaxAdd.responseText);
                //                        console.log(json.answer.books.book);
                name = json.answer.books.book[0].name;
                author = json.answer.books.book[0].author_name;
                id = json.answer.books.book[0].id;
                datum = datumet;
                addLi.innerHTML += `Title: <strong>${json.answer.books.book[0].name}</strong><br>`;
                addLi.innerHTML += `Author: <strong>${json.answer.books.book[0].author_name}</strong><br>`;
                ulList[0].appendChild(addLi);
            }
        }
        ajaxAdd.open("get", `http://api.boktipset.se/book/search.cgi?accesskey=3KWiPjmHsjXZChC7YaQvSg&userkey=rZqiGeHZ&format=json&value=${searchBook.value}`)
        ajaxAdd.send()
    });
});
