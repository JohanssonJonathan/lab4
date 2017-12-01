window.addEventListener("load", () => {
    let viewBooks = document.getElementById("viewBooks");
    let ulList = document.getElementsByTagName("ul");
    let deleteBtn = document.getElementsByClassName('delete');
    let div = document.getElementsByTagName("div");
let error = document.getElementById('error');
    
    
    ////////////////////////////KOLLA BOKLISTAN////////////////////////////////////

     viewBooks.addEventListener("click", function (e) {
        
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=T8T4f`)
            .then(function (response) {
                ulList[1].innerHTML = "";
            error.innerHTML = "";
                return response.json()
            }).then(function (json) {
                if (json.status !== "error") {
                    let idCount = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        let addLi = document.createElement("li");
                        let button = document.createElement("button");
                        button.className = "delete btn btn-outline-danger"
//                        button.setAttribute("class", "deleteBook" + idCount++);
                        addLi.className = "list-inline-item col-lg-5 col-sm-10 col-md-5";
                        addLi.innerHTML += `Title: <strong>${json.data[i].title}</strong><br>`;
                        addLi.innerHTML += `Author: <strong>${json.data[i].author}</strong><br>`;
                        addLi.innerHTML += `Book ID: <strong class="idvalue">${json.data[i].id}</strong><br>`;
                        addLi.innerHTML += `Last Update: <strong>${json.data[i].updated}</strong><br><br>`;
                        addLi.setAttribute("id", json.data[i].title)
                        button.innerHTML = `Remove`;
                        addLi.appendChild(button);
                        let content = ulList[1].appendChild(addLi);
                        content;
                    }
                }else{
                    error.innerHTML = `<strong>Ooops, something went wrong!</strong><br> Message: <strong>${json.message}</strong>`
                }
                for (let i = 0; i < deleteBtn.length; i++) {
                    deleteBtn[i].addEventListener("click", function () {
                            fetch("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=" + "T8T4f" + "&id=" + json.data[i].id)
                            .then(function(response){
                                return response.json();
                            }).then(function(remove){
                                console.log(remove)
                                if(remove.status === "success"){
                                
                            }else {
                                deleteBtn[i].innerHTML = `Error....`;
                            }
                            })
                    })
                }
            }).catch(function () {
            error.innerHTML = `<strong>Some sort of disturbance in the force...</strong>`
            })
    })

});

