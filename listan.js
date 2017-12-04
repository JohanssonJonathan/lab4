 window.addEventListener("load", () => {
     let viewBooks = document.getElementById("viewBooks");
     let ulList = document.getElementsByTagName("ul");
     let deleteBtn = document.getElementsByClassName('delete');
     let div = document.getElementsByTagName("div");
     let error = document.getElementById('error');
     let buttons = document.getElementsByClassName("delete btn btn-outline-danger")
console.log(buttons.length)

     ////////////////////////////KOLLA BOKLISTAN////////////////////////////////////

     function resizeIframe(obj) {
         obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
     }

//     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=T8T4f`)
//         .then(function (response) {
//             ulList[1].innerHTML = "";
//             error.innerHTML = "";
//             return response.json();
//         }).then(function (json) {
//             if (json.status !== "error") {
//                 for (let i = 0; i < json.data.length; i++) {
//                     let addLi = document.createElement("li");
//                     let button = document.createElement("button");
//                     button.className = "delete btn btn-outline-danger"
//                     button.setAttribute("id", json.data[i].id);
//                     addLi.className = "list-inline-item col-lg-5 col-sm-10 col-md-5";
//                     addLi.innerHTML += `Title: <strong>${json.data[i].title}</strong><br>`;
//                     addLi.innerHTML += `Author: <strong>${json.data[i].author}</strong><br>`;
//                     addLi.innerHTML += `Book ID: <strong class="idvalue">${json.data[i].id}</strong><br>`;
//                     addLi.innerHTML += `Last Update: <strong>${json.data[i].updated}</strong><br><br>`;
//                     addLi.setAttribute("id", json.data[i].title)
//                     button.innerHTML = `Remove`;
//                     addLi.appendChild(button);
//                     let content = ulList[1].appendChild(addLi);
//                     console.log(buttons.length)
//                     console.log(json.data)
//                 }
//                 else {
//
//                 //                 error.innerHTML = `<strong>Ooops, something went wrong!</strong><br> Message: <strong>${json.message}</strong>`
//                 location.reload();
//             }


//             for (let i = 0; i < buttons.length; i++) {
//                 buttons[i].addEventListener("click", function (clicked) {
//                     if (json.status === "success") {
//                         fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + "T8T4f" + "&id=" + json.data[i].id)
//                             .then(function (response) {
//                                 return response.json();
//
//                             }).then(function (deleteThis) {
//                                 console.log(deleteThis.status)
//                                 if (deleteThis.status === "success") {
//                                     location.reload();
//                                 } else {
//                                     buttons[i].innerHTML = `Error....`;
//                                 }
//                             })

                 getPage();

     function getPage(counter = 0) {
         fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=T8T4f`)
             .then(function (response) {
                 ulList[1].innerHTML = "";
                 error.innerHTML = "";
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
//                             console.log(buttons.length)
//                             console.log(json.data)
                         }
                     } else {
                         error.innerHTML = `<strong>Ooops, something went wrong!</strong><br> Message: <strong>${json.message}</strong>`
                         location.reload();
                     }




                     //     document.addEventListener("click", function(event) {
                     //         let getButton = document.getElementsByTagName("button")
                     //         let targetElement = event.target;
                     //         console.log(targetElement.id);
                     ////         console.log(getButton.id);
                     //         fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + "T8T4f" + "&id=" + targetElement)
                     //             .then(function(response) {
                     //         return response.json();
                     //         }).then(function(object) { 
                     //             console.log(object)
                     //             if(object.status === "success")
                     //             event.target.parentNode.remove();
                     //             
                     //                 
                     //         })
                     //     })
console.log(buttons.length)
                     for (let i = 0; i < buttons.length; i++) {
                         buttons[i].addEventListener("click", function (clicked) {
                             if (json.status === "success") {
                                 fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + "T8T4f" + "&id=" + json.data[i].id)
                                     .then(function (response) {
                                         return response.json();
                                     }).then(function (deleteThis) {
                                         console.log(deleteThis.status)
                                         if(deleteThis.status === "success"){
                                             console.log(deleteThis.status)
                                             clicked.target.parentNode.remove();
                                         }else{
                                             clicked.target.innerHTML = "Try again!"
                                         }
                                     })
                             }


                         })

                     }
                 }
             )
     }
 })
//                 })
//     })
                 