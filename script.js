let selectedRow = null;

function showAlert(message,className){
    const div=document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector(".main");
    container.insertBefore(div,main); 
    setTimeout(() => {
        document.querySelector(".alert").remove()
    }, 3000);
}

function clearFields(){
    document.querySelector("#firstName").value="";
    document.querySelector("#lastName").value="";
    document.querySelector("#rollNo").value="";
}

//add data
document.querySelector("#student-form").addEventListener( "submit", (event)=>{
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const rollNo = document.querySelector('#rollNo').value;
    
    //validate
    if(firstName==="" || lastName==="" || rollNo===""){
        showAlert("Please fill in all fields ! ","danger")
    }
    else{
        let table = document.querySelector(".table");
        table.classList.remove("d-none")
        if(selectedRow==null)
        {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr")
            row.innerHTML=`<td>${firstName}</td>
                           <td>${lastName}</td>
                           <td>${rollNo}</td>
                           <td> <a href="#" class="btn btn-warning btn-sm "><i class="bi bi-pencil-square edit"></i></a>
                           <a href="#" class="btn btn-danger ms-2 btn-sm "><i class="bi bi-trash delete"></i></a></td>
                           `;
            list.appendChild(row);
            selectedRow==null;
            showAlert( "Data added Successfully","success");
            
        }
        else{
            selectedRow.children[0].textContent=firstName;
            selectedRow.children[1].textContent=lastName;
            selectedRow.children[2].textContent=rollNo;
            showAlert("Data updated successfully!","info");
            selectedRow=null;
        }
        clearFields();
    }
})

document.querySelector("#student-list").addEventListener( 'click', (event)=>{
    let target = event.target;
    console.log("inside  click ",target);
    if(target.classList.contains("edit")){
        console.log("inside edit");
        selectedRow=target.parentElement.parentElement.parentElement;
        document.querySelector("#firstName").value=selectedRow.children[0].textContent;
        document.querySelector("#lastName").value=selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value=selectedRow.children[2].textContent;
    }
})

document.querySelector("#student-list").addEventListener( 'click', (event) =>{
    let target = event.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.parentElement.remove();
        showAlert("Student data deleted","danger");
    }
})