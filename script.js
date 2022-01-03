let display = ""; // string that keeps track of user inputs. 
let inputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "."]; //set of possible user inputs
// basic math functions for plus, minus, times , divide.
let sum = function (a, b) {
	return a + b;
}
let subtract = function (a, b) {
	return a - b;
}
let multiply = function (a, b) {
	return a * b;
}
let divide = function (a, b) {
	// division by zero returns infinity
	return a / b;
}
let operate = function (a, b, c) {                //function that employs the above math functions 
	if (c == "+") { return sum(a, b); }
	if (c == "-") { return subtract(a, b); }
	if (c == "*") { return multiply(a, b); }
	if (c == "/") { return divide(a, b); }
	return "error invalid character";
}
// get values of a buttom when clicked
//
let keyPressed = function (btn) {
	getKeyPressed(btn.value);
}
//get User input from the keyboard 
document.addEventListener('keydown', function (event) {
	getKeyPressed(event.key);
});
//these method is used to capture user inputs and
//process it down to an answer to display on the screen 
//
let calculations = function (string) {
	let startNumber = 0;
	let array = [];
	let arraySplit = string.split("");
	let position = array.length;
	for (let i = startNumber; i < arraySplit.length; i++) {
		if (arraySplit[i] != "+" && arraySplit[i] != "-" && arraySplit[i] != "*" && arraySplit[i] != "/") {
			if (array[position] !== undefined) {     //when array =[] this takes care of undefined
				array[position] += arraySplit[i];
			}
			else {
				array[position] = arraySplit[i];    //cannot do += with an undefined element 
			}
		}
		else if (arraySplit[i] == "+" || arraySplit[i] == "-" || arraySplit[i] == "*" || arraySplit[i] == "/") {
			if (i == 0) {
				array[position] = arraySplit[i];
			}
			else {
				array.push(arraySplit[i]);
				position++;
				position++;
			}
		}
	}
	return array;
}
let stringToNumbers = function (array) {  // converts the operands from strings to numbers, leaves the operators as strings.  ex) ["1","+","2"] becomes [1,"+",2]	
	for (let i = 0; i < array.length; i++) {
		if (array[i] != "+" && array[i] != "-" && array[i] != "*" && array[i] != "/") {
			array[i] = parseFloat(array[i]);
		}
	}
	return array;
}
let computeTimesAndDivide = function (array) { //does all the multiplaction and division needed 
	let returnArray = [];
	for (i = 0; i < array.length; i++) {
		if (typeof array[i] === "number") {
			var leftOperand = array[i];
			if (array[i + 1] === "+" || array[i + 1] === "-" || i == array.length - 1) {
				returnArray.push(array[i]);
			}
		}
		else if (array[i] === "*" || array[i] === "/") {
			var leftOperand = operate(leftOperand, array[i + 1], array[i]);
			if (array[i - 2] === "*" || array[i - 2] === "/") {
				returnArray[returnArray.length - 1] = leftOperand;
			}
			else {
				returnArray.push(leftOperand); //current solution to operate 
			}
			i++;
		}
		else {
			returnArray.push(array[i]);
		}
	}
	return returnArray;
}
let computePlusAndMinus = function (array) {  //computes all the plus and minus operations
	let leftOperand = array[0];
	for (i = 1; i < array.length; i++) {
		leftOperand = operate(leftOperand, array[i + 1], array[i])
		i++;
	}
	return leftOperand;
}
// excecute when the equals button is clicked to perform the requested task
let execute = function (string) {
	let lastChar = string.charAt(string.length - 1);
	if (lastChar != "+" && lastChar != "-" && lastChar != "*" && lastChar != "/" && string != "") {
		let array = [];
		array = calculations(string); // include last number
		array = stringToNumbers(array);   //turn the strings to numbers
		//array = getDivisionAndTimes(array);
		array=computeTimesAndDivide(array);
		let numberAnswer = computePlusAndMinus(array);
		numberAnswer = Math.round(numberAnswer * 10000) / 10000 //only allows for 4 decimals 
		let stringAnswer = numberAnswer.toString();
		return stringAnswer;
	}
	else {

	}
}
let getKeyPressed = function (cmd) { // takes the user input at does the appropriate logi based on it 
	if (cmd == "=") {
		document.getElementById("display").value = execute(display);
		display = "";
	}
	else if (cmd == "clear") {  //is clr right ? 
		clearField();
	}
	else if (cmd == "Backspace") {
		backSpace();
	}
	else if (inputs.includes(cmd)) {
		if (cmd == "0" && display.charAt(display.length - 1) == "/") {   //no division by zero 
			alert("You can't divide by Zero! If you wish to divide by a decimal value, do not apply a leading zero before the decimal.");
		}
		else if (cmd == ".") {
			if (decimalFind(display) == true) {
				display = document.getElementById("display").value += cmd;
			}
		}
		else {
			display = document.getElementById("display").value += cmd;
		}
	}
}
//smaller functions to support the other functions 
let clearField = function () {  //deletes the UI textfield and the display letiable 
	display = document.getElementById("display").value = "";
	display = "";
}
//remove the last number
let backSpace = function () {
	if (display != "") {
		display = display.slice(0, display.length - 1);
		document.getElementById("display").value = display;
	}
}
let decimalFind = function (string) {//checks if the last number has a decimal already in place
	let i = string.length - 1;
	while (i >= 0 && typeof parseInt(string.charAt(i)) == "number" && isNaN(parseInt(string.charAt(i))) == false) {
		i--;
	}
	if (i >= 0) {
		if (string.charAt(i) === ".") {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return true;
	}

}

