

//localStorage.setItem('matrix',JSON.stringify(matrix));

var body = document.body;
var PlayingField = document.createElement('div')
PlayingField.id = "field"
var emptyElement = {}
var matrix
function PlayingFieldCreator(size){
    matrix = []
    var arr = [];
    for(let i = 0 ; i < size*size ; i++){
        arr.push(i)
    }
    for(let i = 0; i < size; i++){
        let line = []
        for(let k = 0; k < size ; k ++){
            let rand = Math.random();
            line.push(arr.splice(parseInt((arr.length-1)*rand),1))
        }
        matrix.push(line)
    }

    

    for(let i = 0; i < size ; i++){
        let line = document.createElement('div')
        line.className = "line"
        for(let k = 0; k < size ; k++){
            line.appendChild(new puzzle(k,i,matrix[i][k]).HtmlPuzzle())
        }
        PlayingField.appendChild(line)
    }
    body.appendChild(PlayingField)
}

class puzzle{
    constructor(x, y, value){
        this.xindex = x
        this.yindex = y
        this.value = value
        this.translatex = 0
        this.translatey = 0
    }
    HtmlPuzzle(){
       var htmlPuzzle = document.createElement('div')

       if(this.value[0] === 0){
        emptyElement.x = this.xindex
        emptyElement.y = this.yindex
        htmlPuzzle.innerHTML = this.value
        htmlPuzzle.style.backgroundColor = "black"
        htmlPuzzle.style.transition = "none"
        htmlPuzzle.id = "empty"
       }
       else{
        htmlPuzzle.innerHTML = this.value
        }
        htmlPuzzle.className = "puzzle " + this.value

        htmlPuzzle.xindexcopy = this.xindex
        htmlPuzzle.yindexcopy = this.yindex
        htmlPuzzle.xtranslatecopy = 0
        htmlPuzzle.ytranslatecopy = 0
        var handler = function (){

            if(this.xindexcopy - 1 == emptyElement.x && this.yindexcopy == emptyElement.y){
                this.xtranslatecopy = this.xtranslatecopy - 100
                this.style.transform = "translate("+this.xtranslatecopy+"%, "+this.ytranslatecopy+"%)"
                this.xindexcopy = emptyElement.x
                emptyElement.x = emptyElement.x + 1
                console.log(emptyElement.x+"-")
            }
            else if(this.xindexcopy + 1 == emptyElement.x && this.yindexcopy == emptyElement.y ){
                this.xtranslatecopy = this.xtranslatecopy + 100
                htmlPuzzle.style.transform = "translate("+this.xtranslatecopy+"%, "+this.ytranslatecopy+"%)"
                this.xindexcopy = emptyElement.x
                emptyElement.x = emptyElement.x - 1
                console.log(emptyElement.x+"-")  
            }
            else if(this.xindexcopy == emptyElement.x && this.yindexcopy - 1 == emptyElement.y){
                this.ytranslatecopy = this.ytranslatecopy - 100
                htmlPuzzle.style.transform = "translate("+this.xtranslatecopy+"%, "+this.ytranslatecopy+"%)"
                this.yindexcopy = emptyElement.y
                emptyElement.y = emptyElement.y + 1
                console.log(emptyElement.y+"-") 
            }
            else if(this.xindexcopy == emptyElement.x && this.yindexcopy  + 1 == emptyElement.y){
                this.ytranslatecopy = this.ytranslatecopy + 100
                htmlPuzzle.style.transform = "translate("+this.xtranslatecopy+"%, "+this.ytranslatecopy+"%)"
                this.yindexcopy = emptyElement.y
                emptyElement.y = emptyElement.y - 1
                console.log(emptyElement.y+"-") 
            }
            // if(WinCondition(this.xindexcopy,this.yindexcopy)){alert("you win!")}
        }    
       htmlPuzzle.addEventListener('click',handler.bind(htmlPuzzle),false)

       return htmlPuzzle;
    }
    

}

function WinCondition (x,y){

    for(let i = 0; i < matrix.lengh ; i++){
        for(let k = 0 ; k < matrix.length ; k ++){
            if(sum !== matrix[i][k]){return false}
            sum++
        }
    }
    return true
}

PlayingFieldCreator(3)