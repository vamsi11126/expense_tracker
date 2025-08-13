import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let trans_hist=JSON.parse(localStorage.getItem("trans_hist"))||[];
function saveToLocalStorage(){
  localStorage.setItem("trans_hist",JSON.stringify(trans_hist))
}
document.querySelector(".js-add-button").addEventListener("click",(e)=>{
  e.preventDefault();
  const amount=(document.getElementById("amount").value)
  const desc= (document.getElementById("desc").value.trim());
const type = document.querySelector('input[name="type"]:checked').value;
  const descPattern = /^[A-Za-z\s]+$/;

  if (!descPattern.test(desc)) {
    alert("Please enter a valid description (letters and spaces only).");
    return; // stop execution if invalid
  }
trans_hist.push({"desc":desc,"amount":amount,"type":type})
saveToLocalStorage()
renderTransactions()
displayMoney()
const {income,expense}=calculateTypes();
});


function calculateTypes(){
let income=0;
let expense=0;
trans_hist.forEach((item)=>{
  if (item.type==="income"){
    income+=Number(item.amount)
  }
  else{
    expense+=Number(item.amount)
  }
})
  return {income,expense};

}
 function displayMoney(){
  const {income,expense}=calculateTypes()
  document.getElementById("income").innerHTML=`₹${income}`
document.getElementById("expense").innerHTML=`₹${expense}`
const balanceElement = document.getElementById("balance");
const total=income-expense
balanceElement.textContent = `₹${total}`;
if (total < 0) {
  balanceElement.insertAdjacentHTML("beforeend", `<span class="js-balance"> (Low Balance)</span>`);
}
/*
if (total<0){
  document.getElementById("balance").innerHTML = `₹${income - expense}<span class="js-balance">(LowBalance)</span>`;
}
else{
document.getElementById("balance").innerHTML = `₹${income - expense}`;
 }*/}
function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = ""; // Clear old list

  trans_hist.forEach((item) => {
const li = document.createElement("li");
const date=addDate();
li.textContent = `${item.desc} - ₹${item.amount} (${item.type})\u00A0\u00A0\u00A0${date}`;

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className="li-delete-button"
deleteButton.addEventListener("click", () => {
  // remove the item from trans_hist
  const index = trans_hist.indexOf(item);
  if (index > -1) {
    trans_hist.splice(index, 1);
    saveToLocalStorage();
    renderTransactions();
    displayMoney();
  }
});

li.appendChild(deleteButton);
list.appendChild(li);
  });
}
renderTransactions()

 displayMoney()

document.querySelector(".js-reset-button").addEventListener("click",()=>{
  localStorage.removeItem("trans_hist");
  trans_hist=[];
renderTransactions()
displayMoney()
})
function addDate(){
const today = dayjs();
const dateString = today.format('YYYY-MM-DD');
return (dateString);
}
