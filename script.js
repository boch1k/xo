const table3 = '<tr>\n<td id="00"></td>\n<td id="01"></td>\n<td id="02"></td>\n</tr>\n<tr>\n<td id="10"></td>\n<td id="11"></td>\n<td id="12"></td>\n</tr>\n<tr>\n<td id="20"></td>\n<td id="21"></td>\n<td id="22"></td>\n</tr>\n'
const table5 = '<tr>\n<td id="00"></td>\n<td id="01"></td>\n<td id="02"></td>\n<td id="03"></td>\n<td id="04"></td>\n</tr>\n<tr>\n<td id="10"></td>\n<td id="11"></td>\n<td id="12"></td>\n<td id="13"></td>\n<td id="14"></td>\n</tr>\n<tr>\n<td id="20"></td>\n<td id="21"></td>\n<td id="22"></td>\n<td id="23"></td>\n<td id="24"></td>\n</tr>\n<tr>\n<td id="30"></td>\n<td id="31"></td>\n<td id="32"></td>\n<td id="33"></td>\n<td id="34"></td>\n</tr>\n<tr>\n<td id="40"></td>\n<td id="41"></td>\n<td id="42"></td>\n<td id="43"></td>\n<td id="44"></td>\n</tr>\n'
const table10 = '<tr>\n<td id="00"></td>\n<td id="01"></td>\n<td id="02"></td>\n<td id="03"></td>\n<td id="04"></td>\n<td id="05"></td>\n<td id="06"></td>\n<td id="07"></td>\n<td id="08"></td>\n<td id="09"></td>\n</tr>\n<tr>\n<td id="10"></td>\n<td id="11"></td>\n<td id="12"></td>\n<td id="13"></td>\n<td id="14"></td>\n<td id="15"></td>\n<td id="16"></td>\n<td id="17"></td>\n<td id="18"></td>\n<td id="19"></td>\n</tr>\n<tr>\n<td id="20"></td>\n<td id="21"></td>\n<td id="22"></td>\n<td id="23"></td>\n<td id="24"></td>\n<td id="25"></td>\n<td id="26"></td>\n<td id="27"></td>\n<td id="28"></td>\n<td id="29"></td>\n</tr>\n<tr>\n<td id="30"></td>\n<td id="31"></td>\n<td id="32"></td>\n<td id="33"></td>\n<td id="34"></td>\n<td id="35"></td>\n<td id="36"></td>\n<td id="37"></td>\n<td id="38"></td>\n<td id="39"></td>\n</tr>\n<tr>\n<td id="40"></td>\n<td id="41"></td>\n<td id="42"></td>\n<td id="43"></td>\n<td id="44"></td>\n<td id="45"></td>\n<td id="46"></td>\n<td id="47"></td>\n<td id="48"></td>\n<td id="49"></td>\n</tr>\n<tr>\n<td id="50"></td>\n<td id="51"></td>\n<td id="52"></td>\n<td id="53"></td>\n<td id="54"></td>\n<td id="55"></td>\n<td id="56"></td>\n<td id="57"></td>\n<td id="58"></td>\n<td id="59"></td>\n</tr>\n<tr>\n<td id="60"></td>\n<td id="61"></td>\n<td id="62"></td>\n<td id="63"></td>\n<td id="64"></td>\n<td id="65"></td>\n<td id="66"></td>\n<td id="67"></td>\n<td id="68"></td>\n<td id="69"></td>\n</tr>\n<tr>\n<td id="70"></td>\n<td id="71"></td>\n<td id="72"></td>\n<td id="73"></td>\n<td id="74"></td>\n<td id="75"></td>\n<td id="76"></td>\n<td id="77"></td>\n<td id="78"></td>\n<td id="79"></td>\n</tr>\n<tr>\n<td id="80"></td>\n<td id="81"></td>\n<td id="82"></td>\n<td id="83"></td>\n<td id="84"></td>\n<td id="85"></td>\n<td id="86"></td>\n<td id="87"></td>\n<td id="88"></td>\n<td id="89"></td>\n</tr>\n<tr>\n<td id="90"></td>\n<td id="91"></td>\n<td id="92"></td>\n<td id="93"></td>\n<td id="94"></td>\n<td id="95"></td>\n<td id="96"></td>\n<td id="97"></td>\n<td id="98"></td>\n<td id="99"></td>\n</tr>\n'
let indexField = new Map()
let fieldId = { str: "", endline: 4, endcolumn: 4 }
let mamba = 2 // first player, 1 - X ; 2 - O
let player
let winArr = []
winLine = 2 // length to win

function sizeFn(val) {
    let form = document.querySelector("table")
    form.innerHTML = val
    let td = document.querySelectorAll("td")
    fieldId.endline = Number(td[td.length - 1].id.charAt(0, 1))
    fieldId.endcolumn = Number(td[td.length - 1].id.charAt(1))
    indexField.clear()
    mamba = 2
    winArr.length = 0
    init()
}

window.onload = init
function init() {
    const field = document.querySelectorAll("td");
    field.keys().forEach((key) => {
        field.item(key).addEventListener('click', function () {
            fieldId.str = this.id;
            checkId(fieldId.str)
        })
    })
}

function checkId(a) {
    if (indexField.has(a)) {
        console.log("this step allready use")
        return
    };
    mamba % 2 ? player = "X" : player = "O"
    mamba++
    indexField.set(a, player)
    let changer = document.getElementById(fieldId.str)
    changer.innerText = player
    let step = new Step(fieldId)
    step.sumSteps()
    step.crosSteps("left", "right")
    step.crosSteps("up", "down")
    step.crosSteps("dole", "upri")
    step.crosSteps("uple", "dori")
    step.createWinarr()
    step.colorWin()
}

class Step {
    constructor({ str, endline = 4, endcolumn = 4 }) {
        this.arrleft = [];
        this.arrright = [];
        this.arrup = [];
        this.arrdown = [];
        this.arrdole = [];
        this.arruple = [];
        this.arrupri = [];
        this.arrdori = [];
        this.arrleftright = [];
        this.arrupdown = [];
        this.arrdoleupri = [];
        this.arrupledori = [];
        Object.defineProperty(this, "lc", { value: str });
        this.left = Number(str.charAt(1));
        this.right = endcolumn - Number(str.charAt(1));
        this.up = Number(str.charAt(0));
        this.down = endline - Number(str.charAt(0, 1));
        this.dole = Math.min(this.left, this.down);
        this.uple = Math.min(this.up, this.left);
        this.upri = Math.min(this.up, this.right);
        this.dori = Math.min(this.down, this.right);
    }

    sumSteps() { Object.keys(this).forEach(val => { if (this[val] > 0) this.Fn(val) }) };
    
    crosSteps(a, b) {
        let a1 = this["arr" + a]
        let b1 = this["arr" + b]
        if (a1.length + b1.length > a1.length && a1.length + b1.length > b1.length) {
            this["arr" + a + b].push(...a1, ...b1)
            a1.length = 0
            b1.length = 0
        }
    }

    createWinarr() {
        Object.keys(this).forEach(val => {
            if (Array.isArray(this[val]) && this[val].length >= winLine) {
                winArr.push(fieldId.str, ...this[val]);
            }
        })
    }
    colorWin() {
        if (winArr.length != 0) {
            winArr.forEach((val) => {
                let td = document.getElementById(val)
                td.setAttribute("class", "win");
            })
            setTimeout(() => alert(`Player: ${player} win`), 50);
        }
    }

    Fn(prop) {
        let xy = this.lc;
        while (this[prop] > 0) {
            xy = this[prop + "Fn"](xy)
            if (indexField.get(xy) === player) {
                this["arr" + prop].push(xy);
                this[prop]--;
            } else return
        }
    }

    leftFn(val) { return val.charAt(0) + (Number(val.charAt(1)) - 1); };
    rightFn(val) { return val.charAt(0) + (Number(val.charAt(1)) + 1); };
    upFn(val) { return (Number(val.charAt(0)) - 1) + val.charAt(1); };
    downFn(val) { return (Number(val.charAt(0)) + 1) + val.charAt(1); };
    doleFn(val) { return (Number(val.charAt(0)) + 1).toString() + (Number(val.charAt(1)) - 1); };
    upleFn(val) { return (Number(val.charAt(0)) - 1).toString() + (Number(val.charAt(1)) - 1); };
    upriFn(val) { return (Number(val.charAt(0)) - 1).toString() + (Number(val.charAt(1)) + 1); };
    doriFn(val) { return (Number(val.charAt(0)) + 1).toString() + (Number(val.charAt(1)) + 1); };
}






