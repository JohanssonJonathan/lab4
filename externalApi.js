window.addEventListener("click", ()=>{

            let searchBookBtn = document.getElementById("searchBookBtn");
            let searchBook = document.getElementById("searchBook");
//            let loginBtn = document.getElementById("loginBtn");
            let consoleOutput = document.getElementById("consoleOutput");
    let failBookSearch = document.getElementById("failBookSearch");

            let ajaxAdd = new XMLHttpRequest(); // NEW AJAX REQUEST
            let ulList = document.getElementsByTagName("ul");
            let li = document.getElementsByTagName("li");

            /////////////////////////////////////////////////////////////////

//            loginBtn.addEventListener("click", function(e) { // KLICKA PÅ KNAPP GET KEY
//                ajaxAdd.onreadystatechange = function() {
//                    consoleOutput.innerHTML = "";
//                    if (ajaxAdd.readyState === 4) {
//                        let json = JSON.parse(ajaxAdd.responseText);
//                        console.log(json)
//                        consoleOutput.innerHTML += `Key: <strong>${json.userkey}</strong><br>`;
//                        consoleOutput.innerHTML += `Nick: <strong>${json.member_nick}</strong><br>`;
//                        consoleOutput.innerHTML += `Member: <strong>${json.member}</strong><br>`;
//                    }
//                }
//                ajaxAdd.open("get", "http://api.boktipset.se/api/authenticate.cgi?accesskey=3KWiPjmHsjXZChC7YaQvSg&userkey=rZqiGeHZ&format=json")
//                ajaxAdd.send()
//            });

            /////////////////////////////////////////////////////////////////
    
            function checkMin(d) {
                if (d < 10) {
                    return "0" + d
                } else {
                    return d
                }
            }

            searchBookBtn.addEventListener("click", function(e) {
                                let datum = new Date();
                //2017-11-27 09:58:44
                let datumet = datum.getFullYear() + "-" + datum.getMonth() + "-" + datum.getDay() + " " +
                    datum.getHours() + ":" + checkMin(datum.getMinutes()) + ":" + datum.getSeconds();

                ajaxAdd.onreadystatechange = function() {
                let addLi = document.createElement("li");    
                    ulList[0].innerHTML = "";
                    if (ajaxAdd.readyState === 4) {
                        let json = JSON.parse(ajaxAdd.responseText);
//                        console.log(json.answer.books.book);
                        console.log(json);
                            addLi.innerHTML += `Title: <strong>${json.answer.books.book[0].name}</strong><br>`;
                            addLi.innerHTML += `Author: <strong>${json.answer.books.book[0].author_name}</strong><br>`;
                            addLi.innerHTML += `Book ID: <strong>${json.answer.books.book[0].id}</strong><br>`;
                        addLi.innerHTML += `Last Update: <strong>${datumet}</strong><br><br>`;
                        ulList[0].appendChild(addLi);
                        }
                        
                    }
               
                ajaxAdd.open("get", `http://api.boktipset.se/book/search.cgi?accesskey=3KWiPjmHsjXZChC7YaQvSg&userkey=rZqiGeHZ&format=json&value=${searchBook.value}`)
                ajaxAdd.send()
            });
});
