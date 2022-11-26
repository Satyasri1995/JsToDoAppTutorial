inComplete=[];
completed=[];

function submitForm(event){
    event.preventDefault();
    let itemValue=event.currentTarget.product.value;
    if(itemValue){
        inComplete.push({id:Math.random(),value:itemValue});
        event.currentTarget.product.value=null;
        renderItems();
    }
}

function renderIncomplete(){
    let container = document.getElementById("InCompleteContainer");
    if(container){
        container.innerHTML=null;
        inComplete.forEach((item)=>{
            let innerContent=`
                <span class="item-name">${item.value}</span>
                <span>
                    <button class="item-button delete-button" onclick="deleteFromInComplete('${item.id}')">Delete</button>
                    <button class="item-button complete-button" onclick="addToComplete('${item.id}')">Complete</button>
                </span>
            `;
            let element = document.createElement("div");
            element.className="list-item shadow";
            element.innerHTML=innerContent;
            container.appendChild(element)
        })
    }
}

function deleteFromComplete(id){
    completed=completed.filter(item=>item.id!=id);
    renderItems();
}

function deleteFromInComplete(id){
    inComplete=inComplete.filter(item=>item.id!=id);
    renderItems();
}

function renderComplete(){
    let container = document.getElementById("CompleteContainer");
    if(container){
        container.innerHTML=null;
        completed.forEach((item)=>{
            let innerContent=`
            <span class="item-name">${item.value}</span>
            <span>
                <button class="item-button delete-button" onclick="deleteFromComplete('${item.id}')">Delete</button>
                <button class="item-button in-complete-button" onclick="addToInComplete('${item.id}')">In-Complete</button>
            </span>
            `;
            let element = document.createElement("div");
            element.className="list-item shadow";
            element.innerHTML=innerContent;
            container.appendChild(element)
        })
    }
}

function addToComplete(id){
    let currentitem = inComplete.find(item=>item.id==id);
    if(currentitem){
        completed.push(currentitem);
        inComplete=inComplete.filter(item=>item.id!=id);
        renderItems();
    }
}

function addToInComplete(id){
    let currentitem = completed.find(item=>item.id==id);
    if(currentitem){
        inComplete.push(currentitem);
        completed=completed.filter(item=>item.id!=id);
        renderItems();
    }
}

function renderItems(){
    renderComplete();
    renderIncomplete();
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("addForm").addEventListener("submit",submitForm);
    renderItems();
});