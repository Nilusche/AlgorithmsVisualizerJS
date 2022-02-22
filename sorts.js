var delay=500;
var num =20;
var stopExec=false;
const container = document.querySelector("#array");
const bubble = document.querySelector("#bubblesort");
const bogo = document.querySelector("#bogosort");
const selection = document.querySelector("#selectionsort");
const quicksort = document.querySelector("#quicksort");
const insertion =  document.querySelector("#insertionsort");
const gnome = document.querySelector("#gnomesort");
const heap = document.querySelector("#heapsort");
const cocktail = document.querySelector("#cocktailsort");
const merge = document.querySelector("#mergesort");
const shell = document.querySelector("#shellsort");
var sorted = false;

function disableButtons(){
    bubble.disabled=true;
    bogo.disabled=true;
    selection.disabled=true;
    quicksort.disabled=true;
    insertion.disabled=true;
    gnome.disabled =true;
    heap.disabled =true;
    cocktail.disabled = true;
    merge.disabled = true;
    shell.disabled = true;
}
bubble.addEventListener("click",()=>{
    disableButtons();
    bubblesort();
});

bogo.addEventListener("click", ()=>{  
    disableButtons();
    bogosort();
});

selection.addEventListener("click", ()=>{
    disableButtons();
    selectionsort();
});

quicksort.addEventListener("click",()=>{
    disableButtons();
    quicksortImpl();
    
});

insertion.addEventListener("click", ()=>{
    disableButtons();
    insertionsort();
});

gnome.addEventListener("click", ()=>{
    disableButtons();
    gnomesort();
});

heap.addEventListener("click",()=>{
    disableButtons();
    heapsortImpl();
});

cocktail.addEventListener("click",()=>{
    disableButtons();
    cocktailsort();
});
merge.addEventListener("click",()=>{
    disableButtons();
    mergeSortImpl();
});
shell.addEventListener("click", ()=>{
    disableButtons();
    shellsort();
});



function changespeed(val){
    delay = parseInt(val);
    document.querySelector("#rangevalue").innerHTML = val +"ms";
}

function generatearray(type=1, asc)
{
    container.innerHTML='';
    if(type==1){
        generaterandomarray(50);

    }else{
        if(!asc){
            generateSortedArray(50, true);
        }else{
            generateSortedArray(50,false);
        }
    }
}
function generaterandomarray(num=50){
    container.innerHTML="";
    for(let i=0; i<num; i+=1){
        var value=Math.ceil(Math.random()*150);
        var element = document.createElement("div");
        element.classList.add("item");
        element.style.height= `${value*3 +12}px`;
        element.transform = `translate(${i*30}px)`;
        element.innerText = value;
        element.style.backgroundColor = "#FF6464";
        container.appendChild(element);
    }
}

function generateSortedArray(num=50, asc=true){
    if(!asc){
        for(let i=0; i<num; i+=1){
                var value=i +1 +2*i;
                var element = document.createElement("div");
                element.classList.add("item");
                element.style.height= `${value*3 +12}px`;
                element.transform = `translate(${i*30}px)`;
                element.innerText = value;
                element.style.backgroundColor = "#FF6464";
                container.appendChild(element);
        }
    }
    else{
        for(let i=num; i>0; i--){
            var value=i +1 +2*i;
            var element = document.createElement("div");
            element.classList.add("item");
            element.style.height= `${value*3 +12}px`;
            element.transform = `translate(${i*30}px)`;
            element.innerText = value;
            element.style.backgroundColor = "#FF6464";
            container.appendChild(element);
        }
    }
}
    

    

async function endsort(items){    
    for(let i=0; i< items.length; i++){
        
        items[i].style.backgroundColor ="#95CD41";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },50)
        );
    }

}


function swap(element1, element2, changecolor=false){

    setTimeout(()=>{
        tmp_height = element1.style.height;
        tmp_value = element1.innerText;
        tmp_background = element1.style.backgroundColor;
        element1.style.height = element2.style.height;
        element1.innerText= element2.innerText;
        element2.style.height = tmp_height;
        element2.innerText = tmp_value;  
        if(changecolor){
            element1.style.backgroundColor = element2.style.backgroundColor;
            element2.style.backgroundColor = tmp_background;
        }
       
    }, 25);
}

async function bubblesort(){
    items = document.querySelectorAll(".item");
    for(let i=0; i< items.length; i++){
        for(let j=0; j<items.length - i -1; j++){
            if(stopExec)
                return;
            items[j].style.backgroundColor = "#126E82";
            items[j+1].style.backgroundColor = "#126E82";

            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );
            let value1 = parseInt(items[j].innerText);
            let value2 = parseInt(items[j+1].innerText);

            
            if(value1>value2){
                swap(items[j], items[j+1]);
            }


            items[j].style.backgroundColor = "#FF6464";
            items[j+1].style.backgroundColor = "#FF6464";


        }
        items[items.length - i - 1].style.backgroundColor ="#95CD41";
    }
}

async function bogosort(){
    items= document.querySelectorAll(".item");
    while(!isSorted()) {
        if(stopExec)
            return;
        let a = Math.floor(Math.random() * items.length);
        let b = Math.floor(Math.random() * items.length);
        items[a].style.backgroundColor = "#219F94";
        items[b].style.backgroundColor = "#219F94";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay)
        );
        swap(items[a], items[b]);
        items[a].style.backgroundColor = "#FF6464";
        items[b].style.backgroundColor = "#FF6464";
    }

    function isSorted() {
        for(let i = 0; i < items.length - 1; i++) {
            if (items[i].innerText > items[i + 1].innerText) return false;
        }
        return true;
    }
}

async function selectionsort(){
    items= document.querySelectorAll(".item");
    for(let i =0; i<items.length-1; i++){
        let min = i;

        items[i].style.backgroundColor ="#126E82";

        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay-10)
        );

        items[i].style.backgroundColor = "#FF6464";
        for(let j = i+1; j<items.length; j++){
            let val = parseInt(items[j].innerText);
            let current_min = parseInt(items[min].innerText);
            let current_min_index = min;

            items[j].style.backgroundColor = "#126E82";
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay-10)
            );
            items[j].style.backgroundColor = "#FF6464";

            if(val<current_min){
                items[min].style.backgroundColor ="#5800FF";
                min = j;
            }
            if(parseInt(items[min].innerText)!=current_min){
                items[current_min_index].style.backgroundColor ="#FF6464";
                items[min].style.backgroundColor= "#5800FF";
            }

        }
        swap(items[min], items[i])
        items[min].style.backgroundColor = "#FF6464";
        items[i].style.backgroundColor = "#95CD41";
        

    }
    items[items.length-1].style.backgroundColor = "#95CD41";
}
function parse(){
    

}

async function quicksortImpl(){
    
    let items = document.querySelectorAll(".item");
    quicksort(items, 0, items.length-1);

    async function quicksort(items, low, high){
        if(parseInt(low)<parseInt(high)){

            const pivot = parseInt(items[high].innerText);
            items[high].style.backgroundColor = "#5800FF";
            let i = parseInt(low) ;

            var marked=[];
            for(let j = low; j<high; j++){
                let val = parseInt(items[j].innerText);
                items[j].style.backgroundColor = "#eeeeee";
                await new Promise((resolve)=>
                    setTimeout(()=>{
                        resolve();
                    },delay-50)
                );
                items[j].style.backgroundColor = "#FF6464";

                if(val<pivot){
                    items[i].style.backgroundColor = "#219F94";     
                    items[j].style.backgroundColor = "#F1D00A";  
                    swap(items[i], items[j],false);   
 
                    i++;    
                    
                }else{
                    items[j].style.backgroundColor = "#F1D00A";
                }
                marked.push(items[j]);
            }
            swap(items[i], items[high],true);
            let partitionIndex = parseInt(i);

            marked.push(items[i]);
            marked.push(items[high]);

            marked.forEach(element => {
                element.style.backgroundColor =  "#FF6464";
            });



            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );
            quicksort(items, low, partitionIndex-1);
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );
            quicksort(items, partitionIndex +1, high);
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );
            
        }
    }

    

}


async function insertionsort(){
    let items = document.querySelectorAll(".item");

    items[0].style.backgroundColor ="#95CD41";
    for(let i=1; i<items.length; i++){

        let key=parseInt(items[i].innerText);
        let height = items[i].style.height;

        let j = i-1;
        
        items[i].style.backgroundColor = "#F1D00A";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay)
        );
        items[i].style.backgroundColor ="#95CD41";
        while(j>=0 && parseInt(items[j].innerText)>key){
            items[j].style.backgroundColor = "#FF1700";

            items[j+1].style.height = items[j].style.height;
            items[j+1].innerText = items[j].innerText;

            j--;
            

            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );  
            items[j+1].style.backgroundColor = "#FF6464";

            for(let i =0; i<j; i++){
                items[i].style.backgroundColor = "#95CD41";
            }
            
        }
        
        items[j+1].style.height = height;
        items[j+1].innerText = key;

        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay)
        );

        
    }
    items.forEach((element)=>{
        element.style.backgroundColor ="#95CD41";
    })

}

async function gnomesort(){
    let items = document.querySelectorAll(".item");
    let index =0;
    while(index < items.length){
        items[index].style.backgroundColor = "#95CD41";
        if(index==0){
            index++;
        }
        let a = parseInt(items[index].innerText);
        let b = parseInt(items[index-1].innerText);
        
        if(a>=b){
            index++;
        }
        else{
            swap(items[index], items[index-1]);
            index--;
        }
        items[index].style.backgroundColor = "#FF6464";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay)
        );  
        
        
    }
    

}

async function mergeSortImpl(){
    let items = document.querySelectorAll(".item");
    
    await mergesort(items,0 , items.length-1);
        items.forEach((e)=>{
        e.style.backgroundColor="#95CD41";
    })
    async function mergesort(arr, l, r){
        if(l<r){
            let m = l + Math.floor((r-l)/2);
            await mergesort(arr, l, m);
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );  
            await mergesort(arr, m + 1, r);
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );  
            await merge(arr, l, m, r);
            
        }
    }
    
    async function merge(arr, start, mid, end){
        let start2 = mid +1;
        arr[start2].style.backgroundColor = "#219F94";
        arr[start].style.backgroundColor = "#139487";
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay-10)
        );  
        arr[start2].style.backgroundColor = "#FF6464";
        arr[start].style.backgroundColor = "#FF6464";
        if(parseInt(arr[mid].innerText)>parseInt(arr[start2].innerText)){
            while(start<=mid&&start2<=end){
                
                if(parseInt(arr[start].innerText)<=parseInt(arr[start2].innerText)){
                    start++;
                }
                else{
                    let valueHeight  = arr[start2].style.height;
                    let valueText = arr[start2].innerText;
                    let index = start2;
                    
                    while(index!=start){
                        arr[index].innerText =arr[index-1].innerText;
                        arr[index].style.height = arr[index-1].style.height;
                        
                        arr[index].style.backgroundColor = "#DA1212";
                        await new Promise((resolve)=>
                            setTimeout(()=>{
                                resolve();
                            },delay-20)
                        ); 
                        arr[index].style.backgroundColor = "#FF6464";
                        index--;
                        
                    }
                     
                    arr[start].style.height = valueHeight;
                    arr[start].innerText = valueText;
                    start++;
                    mid++;
                    start2++;

                }
                await new Promise((resolve)=>
                    setTimeout(()=>{
                        resolve();
                    },delay-10)
                ); 
                for(let i =start-1; i<=mid; i++){
                    arr[i].style.backgroundColor = "#95CD41";
                }
                
            }
        }
        
        
    }
    
}
//FF6464
async function heapsortImpl(){
    let items = document.querySelectorAll(".item");
    heapsort(items, items.length);
    
    async function heapsort(items, count){
        //heapify
        let start = parseInt((count -2 )/2);
        while(start>=0){
             //siftdown(a, start, count -1)
            let root = start;
            let end = count-1;
            
            while(root*2+1<=end){
                let child= root *2+1;
                
                if(child+1<=end &&  parseInt(items[child].innerText) < parseInt(items[child+1].innerText)){
                    items[child].style.backgroundColor = "#F1D00A";
                    items[child+1].style.backgroundColor = "#F1D00A";
                    items[root].style.backgroundColor = "#5800FF";
                    await new Promise((resolve)=>
                        setTimeout(()=>{
                            resolve();
                        },delay-10)
                    ); 
                    items[child].style.backgroundColor = "#FF6464";
                    items[child+1].style.backgroundColor = "#FF6464";
                    items[root].style.backgroundColor = "#FF6464";
                    child++;
                }
                if(parseInt(items[root].innerText) < parseInt(items[child].innerText)){
                    items[root].style.backgroundColor = "#5800FF";
                    swap(items[root], items[child]);
                    await new Promise((resolve)=>
                        setTimeout(()=>{
                            resolve();
                        },delay)
                    );  
                    items[root].style.backgroundColor = "#FF6464";
                    root = child;
                }
                else{
                    break;
                }
            }
            start--;
            //
            
            
        }
        items[0].style.backgroundColor = "#F9ED69";
        //
        let end2 = count -1;
        while(end2>0){
            items[end2].style.backgroundColor = "#95CD41";
            items[0].style.backgroundColor = "#F9ED69";
            swap(items[end2], items[0]);
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            );  
            end2--;

            let root1 = 0;

            //siftdown(a, 0, end)
            while(root1*2+1<=end2){
                let child1= root1 *2+1;
                if(child1+1<=end2 &&  parseInt(items[child1].innerText) < parseInt(items[child1+1].innerText)){
                    items[child1].style.backgroundColor = "#F1D00A";
                    items[child1+1].style.backgroundColor = "#F1D00A";
                    items[root1].style.backgroundColor = "#5800FF";
                    await new Promise((resolve)=>
                        setTimeout(()=>{
                            resolve();
                        },delay-10)
                    ); 
                    items[child1].style.backgroundColor = "#FF6464";
                    items[child1+1].style.backgroundColor = "#FF6464";
                    items[root1].style.backgroundColor = "#FF6464";
                    child1++;
                }
                if(parseInt(items[root1].innerText) < parseInt(items[child1].innerText)){
                    items[root1].style.backgroundColor = "#5800FF";
                    swap(items[root1], items[child1]);
                    await new Promise((resolve)=>
                        setTimeout(()=>{
                            resolve();
                        },delay)
                    );  
                    items[root1].style.backgroundColor = "#FF6464";
                    root1 = child1;
                }
                else{
                    break;
                }
            }
             

        }
        items[end2].style.backgroundColor = "#95CD41";
    }
    
}
async function cocktailsort(){
    let items = document.querySelectorAll(".item");
    let swapped = true;
    let start = 0;
    let end = items.length;
    while(swapped == true){
        swapped  = false;

        for(let i = start; i<end-1; ++i){
            let itemI = parseInt(items[i].innerText);
            let itemI2 = parseInt(items[i+1].innerText);
            items[i].style.backgroundColor = "#126E82";
            items[i+1].style.backgroundColor = "#126E82";
            if(itemI>itemI2){
                swap(items[i], items[i+1]);
                swapped = true;
            }
            
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            ); 
            items[i].style.backgroundColor = "#FF6464";
            items[i+1].style.backgroundColor = "#FF6464";
            
        }
        
        if(swapped  == false)
            break;
        swapped = false;
        end = end-1;
        for(let i = items.length-1; i>=end; i--){
            items[i].style.backgroundColor = "#95CD41";
        }

        for(let j = end-1; j>=start; --j){
            let itemI = parseInt(items[j].innerText);
            let itemI2 = parseInt(items[j+1].innerText);
            items[j].style.backgroundColor = "#126E82";
            items[j+1].style.backgroundColor = "#126E82";
            if(itemI>itemI2){
                swap(items[j], items[j+1]);
                swapped = true;
            }
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            ); 
            items[j].style.backgroundColor = "#FF6464";
            items[j+1].style.backgroundColor = "#FF6464";
        }
        start = start +1;

        for(let i = 0; i<start; i++){
            items[i].style.backgroundColor = "#95CD41";
        }
        
        
    }
    items.forEach((e)=>{
        e.style.backgroundColor = "#95CD41";
    })

}

async function shellsort(){
    let items = document.querySelectorAll(".item");
    let n = items.length;
    for(let gap=Math.floor(n/2); gap>0; gap=Math.floor(gap/2)){
        for(let i =parseInt(gap); i<n; i++){
            
            let tempVal = items[i].innerText;
            let tempHeight = items[i].style.height;
            items[i].style.backgroundColor = "#5800FF";
            await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                },delay)
            ); 
            items[i].style.backgroundColor = "#FF6464";
            
            let j;
            for(j=i; j>=gap && parseInt(items[j-gap].innerText)>parseInt(tempVal); j-=gap){
                items[j].style.backgroundColor = "#008E89"; 
                items[j-gap].style.backgroundColor = "#008E89"; 
                items[j].style.height = items[j-gap].style.height;
                items[j].innerText = items[j-gap].innerText;
                await new Promise((resolve)=>
                    setTimeout(()=>{
                        resolve();
                    },delay)
                ); 
                items[j].style.backgroundColor = "#FF6464";
                items[j-gap].style.backgroundColor = "#FF6464"; 
            }
            items[j].innerText = tempVal;
            items[j].style.height = tempHeight;
        }
        await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            },delay)
        ); 
    }
    items.forEach((e)=>{
        e.style.backgroundColor ="#95CD41";
    });
}

generatearray(1,false);





