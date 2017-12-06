window.addEventListener("load", function() {
    //Fail counters
    let failViewCounter = 0;
    let failAddCounter = 0;
    let failChangeCounter = 0;
    let btn = document.getElementById("key");

    //Nyckel
    let output = document.getElementById("output")
    let inputKey = document.getElementById("keyin");

    //Lägga till bok
    let ajaxAdd = new XMLHttpRequest(); // NEW AJAX REQUEST
    let addBook = document.getElementById("addBook");
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let addBookStatus = document.getElementById("addBookStatus");
    //Ändra bok
    let changeBookStatus = document.getElementById("changeBookStatus");
    let changeBook = document.getElementById("changeBook");
    let bookId = document.getElementById("bookId");
    let authorChange = document.getElementById("authorChange");
    let titleChange = document.getElementById("titleChange");
    //Ta bort Book
    let deleteBook = document.getElementById("deleteBook");
    let deleteId = document.getElementById("deleteId");
    let delBookStatus = document.getElementById("delBookStatus");
    //Kolla på böcker
    let viewBooks = document.getElementById("viewBooks");
    let ulList = document.getElementsByTagName("ul");
    let li = document.getElementsByTagName("li");


    let datum = new Date();
    //Exempel: 2017-11-27 09:58:44
    let datumet = `${datum.getUTCFullYear()}-${datum.getUTCMonth()+1}-${("0" + datum.getUTCDate()).slice(-2)} ${datum.getUTCHours()+1}:${datum.getUTCMinutes()}:${datum.getUTCSeconds()-1}`;


    //////////////////////////////LÄGGA TILL BOK////////////////////////////////////
    addBook.addEventListener("click", function() {
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${inputKey.value}&title=${title.value}&author=${author.value}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json.status);
                let addLi = document.createElement("li");
                addLi.innerHTML += `Title: <strong>${title.value}</strong><br>`;
                addLi.innerHTML += `Author: <strong>${author.value}</strong><br>`;
                addLi.innerHTML += `Book ID: <strong>${json.id}</strong><br>`;
                addLi.innerHTML += `Last Update: <strong>${datumet}</strong><br><br>`;
                addLi.setAttribute("id", title.value)
                if (json.status === "error") {
                    failAddCounter = failAddCounter + 1;
                    addBookStatus.innerHTML = `Status: <strong>${json.status}, try again!</strong><br>
            Fail counter: <strong>${failAddCounter}</strong>`
                } else {
                    addBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br>
            Book ID: <strong>${json.id}</strong>`
                    ulList[0].appendChild(addLi);
                }
            })
    });

    //////////////////////////////KOLLA BOKLISTAN////////////////////////////////////
    viewBooks.addEventListener("click", function(e) {

        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${inputKey.value}`)
            .then(function(response) {
                ulList[0].innerHTML = "";
                return response.json()
            }).then(function(json) {
                if (json.data !== undefined) {
                    for (let i = 0; i < json.data.length; i++) {
                        let addLi = document.createElement("li");
                        addLi.innerHTML += `Title: <strong>${json.data[i].title}</strong><br>`;
                        addLi.innerHTML += `Author: <strong>${json.data[i].author}</strong><br>`;
                        addLi.innerHTML += `Book ID: <strong class="idvalue">${json.data[i].id}</strong><br>`;
                        addLi.innerHTML += `Last Update: <strong>${json.data[i].updated}</strong><br><br>`;
                        addLi.setAttribute("id", json.data[i].title)
                        ulList[0].appendChild(addLi);
                    }
                } else {
                    failViewCounter = failViewCounter + 1;
                    let addLi = document.createElement("li");
                    addLi.innerHTML += `Status: error, try again! <br> Fail counter: <strong>${failViewCounter}</strong>`;
                    ulList[0].appendChild(addLi);
                }
            }).catch(function() {
                console.log("error")
            })
    });

    //////////////////////////////ÄNDRA I BOK////////////////////////////////////

            titleChange.addEventListener("change",(event)=>{

                fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${inputKey.value}&id=${bookId.value}&title=${titleChange.value}&author=${authorChange.value}`)
                .then((response)=>{
                    return response.json()
                }).then((json)=>{
                  if(json.message === undefined){
                    changeBookStatus.innerHTML = `Status:<strong>${json.status}</strong><br>Message:<strong>It worked!</strong>`;
                  }else{
                    changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br>Message:<strong>${json.message}</strong>`;
                    failChangeCounter = failChangeCounter +1;
                    changeBookStatus.innerHTML = `Status: <strong>${json.status}, try again!</strong><br>Fail counter: <strong> ${failChangeCounter}</strong>`;
                  }
                }).catch(()=>{
                  console.log("ERROR!!!")
                })

            })

            authorChange.addEventListener("change", function(event) {

                fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${inputKey.value}&id=${bookId.value}&title=${titleChange.value}&author=${authorChange.value}`)
                    .then((response) => {

                        return response.json()
                    }).then((json) => {
                        if (json.message === undefined) {
                            changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br> Message: <strong>It worked!</strong>`;
                        } else {
                            changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong> <br> Message: <strong>${json.message}</strong>`;
                            failChangeCounter = failChangeCounter + 1;
                            changeBookStatus.innerHTML = `Status: <strong>${json.status}, try again!</strong> <br>Fail counter: <strong>${failChangeCounter}</strong>`
                        }
                    }).catch(function() {
                        console.log("ERROR!!!")
                    })
            });

    //////////////////////////////HÄMTA NYCKEL////////////////////////////////////

    btn.addEventListener("click", function(e) { // KLICKA PÅ KNAPP GET KEY


        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
            .then((response) => {

                return response.json()
            }).then((json) => {
                inputKey.value = json.key
            }).catch(function() {
                console.log("ERROR!!!")
            })


    });

    //////////////////////////////TA BORT BOK////////////////////////////////////
    deleteBook.addEventListener("click", function(event) {
        ajaxAdd.onreadystatechange = function() {
            if (ajaxAdd.readyState === 4) {
                let json = JSON.parse(ajaxAdd.responseText);
                console.log(json);
                if (json !== undefined) {
                    if (json.status === "success") {
                        delBookStatus.innerHTML = `Status: <strong>Success! click on "View Books"</strong>`
                    }
                }
            }else{
                    delBookStatus.innerHTML = `Status: <strong>Failed! something went wrong.</strong><br>`;
            }
        }
        ajaxAdd.open("get", "https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + inputKey.value + "&id=" + deleteId.value)
        ajaxAdd.send();
    });
})
