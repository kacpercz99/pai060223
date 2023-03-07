function gen() {
    const main = document.getElementById('main')
    const output = document.createElement('div')
    const buttons = ["AC","←","÷",7,8,9,"*",4,5,6,"+",1,2,3,"-",".",0,"="]
    const center = document.createElement('div')
    let previous = 0
    center.id= "centerAl"
    output.innerText = '0'
    output.id = "output"
    center.appendChild(output)
    main.appendChild(center)
    createButtons(main,buttons)
    createListeners(output, previous)
}

function createButtons(main, buttons){
    for(let i = 0; i < buttons.length; i++){
    let button = document.createElement('button')
    button.innerText = buttons[i]
    button.id = buttons[i]
    main.appendChild(button)
    }
}
function createListeners(output, previous){
    let flag = "none"

    for(let i = 0; i<10 ; i++){
        let button = document.getElementById(i)
        button.onclick = function() {
            if(flag == "ZERO"){
                output.innerText = 0
                flag = "none"
            }
            if(output.innerText == "0") {
                output.innerText = button.innerText
            } else {
                output.innerText+= button.innerText
            }
        }
    }

    document.getElementById("←").onclick = function(){
        if(output.innerText.length > 1) {
            output.innerText = output.innerText.slice(0,-1)
        } else if (output.innerText.length == 1){
            output.innerText = 0
        }
    }

    document.getElementById("AC").onclick = function(){
        output.innerText = 0
        previous = 0
        flag = "none"
    }

    document.getElementById(".").onclick = function() {
        if(output.innerText.indexOf(".") == -1) {
            output.innerText+="."
        }
    }

    document.getElementById("*").onclick = function(){
        if(output.innerText != 0){
            previous = output.innerText
            output.innerText = 0
            flag = "*"
        }
    }

    document.getElementById("+").onclick = function(){
        previous = output.innerText
        output.innerText = 0
        flag = "+"
    }

    document.getElementById("-").onclick = function(){
        previous = output.innerText
        output.innerText = 0
        flag = "-"
    }

    document.getElementById("÷").onclick = function(){
        previous = output.innerText
        output.innerText = 0
        flag = "÷"
    }

    document.getElementById("=").onclick = function(){
        switch(flag){
            case "*":
                output.innerText*=previous
                break
            case "+":
                output.innerText = +output.innerText + +previous
                break
            case "-":
                if(output.innerText = "0"){
                    output.innerText = -previous
                } else {
                    output.innerText = previous - output.innerText
                }
                break
            case "÷":
                if(output.innerText == 0) {
                    output.innerText = "Division by 0 :("
                    flag="ZERO"
                } else {
                    output.innerText = parseFloat(previous) / parseFloat(output.innerText)
                }
                break
        }
    }
}