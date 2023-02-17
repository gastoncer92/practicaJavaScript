const form = document.getElementById("transactionForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData);
    saveTransactionObj(transactionObj);
    insertarFilaEnTransactionTable(transactionObj);

})



document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArray.forEach(
        function (arrayElement) {
            insertarFilaEnTransactionTable(arrayElement);
        })
    draw_category()
    
    //draw_category.forEach(element => insertCategory(element));
})

function getNewTransactionId() {

    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId

}

function convertFormDataToTransactionObj(transactionFormData) {
    let transactionTipo = transactionFormData.get('transactionTipo');
    let transactionDescripcion = transactionFormData.get('datoDescripcion');
    let transactionMonto = transactionFormData.get('datoMonto');
    let transactionCategoria = transactionFormData.get('datoCategoria');
    let transactionId = getNewTransactionId();
    return {
        "transactionId": transactionId,
        "transactionTipo": transactionTipo,
        "transactionDescripcion": transactionDescripcion,
        "transactionMonto": transactionMonto,
        "transactionCategoria": transactionCategoria
    }
}

function draw_category() {
    let allCategory = [
        "Comida", "Compras", "Facturas","Importaciones","awdaw"
    ]
    for (let index = 0; index < allCategory.length; index++){
        insertCategory(allCategory[index])
    }
    //draw_category.forEach(element => insertCategory(element));
}

function insertCategory(categoryName) {
    const selectElement = document.getElementById("transactionCategoria")
    // let htmlInsert = '<option>'+categoryName+'</option>'
    let htmlInsert = `<option>${categoryName}</option>` 
    selectElement.insertAdjacentHTML('beforeend', htmlInsert)
    //draw_category.forEach(categoryName => insertCategory)
    
}



function insertarFilaEnTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);

    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"])

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj['transactionTipo'];

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj['transactionDescripcion'];

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj['transactionMonto'];

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj['transactionCategoria'];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener("click", (event) => {
        let transactionRow = event.target.parentNode.parentNode;
        
        deteleTransactionObj(transactionRow.getAttribute("data-transaction-id"))
        transactionRow.remove()

    })



}

function deteleTransactionObj(transactionId) {
    let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"))
    let transactionIndexInArray = transactionObjArray.findIndex(element => element.transactionId === transactionId)
    transactionObjArray.splice(transactionIndexInArray, 1)

    let transactionObjJSON = JSON.stringify(transactionObjArray);
    localStorage.setItem("transactionData", transactionObjJSON)

}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    let transactionObjJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData", transactionObjJSON)

    form.reset()

}