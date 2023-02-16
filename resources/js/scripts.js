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