
// Caching the calls to the DOM

var calc_screen = $("#screen")
var equals = $("#sym-equals")
var number_cell = $(".cell")
var math_operator = $(".math-operator")
var clear = $("#sym-clear")
var decimal = $("#sym-decimal")

// setup the variables that will remember user clicks and numbers

var numbersArray = []
var savedNumber = ""
var currentTotal = 0
var decimal_clicked = false


// 4 functions that deal with the actual math operations


function add(x, y){
	var add_result = parseFloat(x) + parseFloat(y)

	calc_screen.html("<p>" + add_result + "</p>")
	currentTotal = add_result
	return add_result
}


function subtract(x, y){
	var sub_result = Number(x) - Number(y)

	calc_screen.html("<p>" + sub_result + "</p>")
	currentTotal = sub_result
	return sub_result
}



function multiply(x, y){
	var multi_result = Number(x) * Number(y)
	
	calc_screen.html("<p>" + multi_result + "</p>")
	currentTotal = multi_result
	return multi_result
}



function divide(x, y){
	var div_result = Number(x) / Number(y)

	calc_screen.html("<p>" + div_result + "</p>")
	currentTotal = div_result
	return div_result
}

// Clear everything out to start a new calculation - after the user clicks equals OR the clear button

function clearAll() {
	savedNumber = ""
	numbersArray = []
	decimal_clicked = false

}


// When a user clicks on a number we concatanate THAT number to any previous numbers (e.g 55 not 5+5=10)
// and show it on the calculator screen, ready for operation

number_cell.click(function() {

	savedNumber = savedNumber + (this.getAttribute("data-button-number"))
	calc_screen.html("<p>" + savedNumber + "</p>")

})

// Since a user shouldn't be able to have "...1" we start with a boolean to control this.
// If no decimal exists == false, concatanate it to the previous number or 0, ELSE do nothing

decimal.click(function(){

	if (decimal_clicked == false) {
		savedNumber = savedNumber + (this.getAttribute("data-button-math"))
		calc_screen.html("<p>" + savedNumber + "</p>")
		decimal_clicked = true
	} else { 
		console.log ("you've already clicked it")
	}

})

// When the user clicks on the operator we are taking our current saved number (e.g 4.5), parsing as float (since it was a string)
// and pushing it to an array that will keep it in memory. (Saved number is then cleared ready for the next sum or decimal point)
// Grab the current operator (e.g +) and display

math_operator.click(function(){

	numbersArray.push(parseFloat(savedNumber))
    savedNumber = ""
   	decimal_clicked = false
	currentOperator = this.getAttribute("data-button-math")
	calc_screen.html("<p>" + numbersArray + " " + currentOperator + "</p>")

	// First check = If we have more than one item in the array ( occurs if we do "3 + 3 + " ) will perform
	// the operation and keep a running total and chain multple operations , otherwise we can only do 2+2 or 222+22

	if (numbersArray.length > 1) {
		if (currentOperator == "+"){
			add(numbersArray.slice(-2, -1), numbersArray.slice(-1))
			numbersArray = []
			numbersArray.push(currentTotal)
		}

		if (currentOperator == "*"){
			multiply(numbersArray.slice(-2, -1), numbersArray.slice(-1))
			numbersArray = []
			numbersArray.push(currentTotal)
		
		}

		if (currentOperator == "-"){
			subtract(numbersArray.slice(-2, -1), numbersArray.slice(-1))
			numbersArray = []
			numbersArray.push(currentTotal)
			
		}

		if (currentOperator == "/"){
			divide(numbersArray.slice(-2, -1), numbersArray.slice(-1))
			numbersArray = []
			numbersArray.push(currentTotal)
		
		}
	};

})

// User indicates that they've finished, much like the previous function (running total) it performs the relevant operation on the array

equals.click(function(){

	numbersArray.push(parseFloat(savedNumber))
	if (currentOperator == "+"){
		add(numbersArray.slice(-2, -1), numbersArray.slice(-1))
	}
	if (currentOperator == "*"){
		multiply(numbersArray.slice(-2, -1), numbersArray.slice(-1))
	}
	if (currentOperator == "-"){
		subtract(numbersArray.slice(-2, -1), numbersArray.slice(-1))
	}
	if (currentOperator == "/"){
		divide(numbersArray.slice(-2, -1), numbersArray.slice(-1))
	}

	clearAll()

})

clear.click(function(){

	clearAll()
	calc_screen.html("")

})



