 window.addEventListener("load", () => {
     let viewBooks = document.getElementById("viewBooks");
     let ulList = document.getElementsByTagName("ul");
     let deleteBtn = document.getElementsByClassName('delete');
     let div = document.getElementsByTagName("div");
     let error = document.getElementsByClassName('error')[0];
     let buttons = document.getElementsByClassName("delete btn btn-outline-danger")
     let titleChange = document.getElementById("titleChange");
     let failcount = document.getElementById("failcount")
     let x = 0;
     let key = "T8T4f"



     ////////////////////////////KOLLA BOKLISTAN////////////////////////////////////

     function resizeIframe(obj) {
         obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
     }

     getPage();

     function getPage(counter = 0) {
         fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${key}`)
             .then(function (response) {
                 ulList[1].innerHTML = "";
                 if(error !== undefined){
                 error.innerHTML = "";
               }
                 return response.json();
             }, function (failed) {
                 if (counter < 5)
                     getPage(counter + 1);
             }).then(function (json) {
                 if (json.status !== "error") {
                     for (let i = 0; i < json.data.length; i++) {
                         let addLi = document.createElement("li");
                         let button = document.createElement("button");
                         button.className = "delete btn btn-outline-danger"
                         button.setAttribute("id", json.data[i].id);
                         addLi.className = "list-inline-item col-lg-5 col-sm-10 col-md-5";
                         addLi.innerHTML += `Title: <strong>${json.data[i].title}</strong><br>`;
                         addLi.innerHTML += `Author: <strong>${json.data[i].author}</strong><br>`;
                         addLi.innerHTML += `Book ID: <strong class="idvalue">${json.data[i].id}</strong><br>`;
                         addLi.innerHTML += `Last Update: <strong>${json.data[i].updated}</strong><br><br>`;
                         addLi.setAttribute("id", json.data[i].title)
                         button.innerHTML = `Remove`;
                         addLi.appendChild(button);
                         let content = ulList[1].appendChild(addLi);
                     }
                 } else {

                     location.reload();
                 }
                 console.log(buttons.length)
                 for (let i = 0; i < buttons.length; i++) {
                     buttons[i].addEventListener("click", function (clicked) {
                         if (json.status === "success") {
                             fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + "T8T4f" + "&id=" + json.data[i].id)
                                 .then(function (response) {
                                     return response.json();
                                 }).then(function (deleteThis) {
                                     console.log(deleteThis.status)
                                     if (deleteThis.status === "success") {
                                         console.log(deleteThis.status)
                                         clicked.target.parentNode.remove();
                                     } else {
                                          x++
                                          failcount.innerHTML = x
                                         clicked.target.innerHTML = "Try again!"
                                     }
                                 })
                         }

                     })

                 }
             })
     }



        // ÄNDRA BOK //




        titleChange.addEventListener("change",(event)=>{

          refresh()
          function refresh(){
            failcount.innerHTML  =x;
            x++;
            fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${key}&id=${bookId.value}&title=${titleChange.value}&author=${authorChange.value}`)
            .then((response)=>{
                return response.json()
            }).then((json)=>{

              if(json.message === undefined){
                changeBookStatus.innerHTML = `Status:<strong>${json.status}</strong>`;
              }else{

                refresh()

                changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br>Message:<strong>${json.message}</strong>`;
                failChangeCounter = failChangeCounter +1;
                failcount.innerHTML = failChangeCounter

              }
            }).catch(()=>{
              console.log("ERROR!!!")
            })
          }

        })

        authorChange.addEventListener("change", function(event) {

            refreshAuthor()
            function refreshAuthor(){
              failcount.innerHTML = x;

              x++
            fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${key}&id=${bookId.value}&title=${titleChange.value}&author=${authorChange.value}`)
                .then((response) => {

                    return response.json()
                }).then((json) => {
                    if (json.message === undefined) {
                        changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong><br> Message: <strong>It worked!</strong>`;
                    } else {
                      refreshAuthor()
                        changeBookStatus.innerHTML = `Status: <strong>${json.status}</strong>`;
                        failChangeCounter = failChangeCounter + 1;

                    }
                }).catch(function() {
                    console.log("ERROR!!!")
                })
              }
        });



 })
