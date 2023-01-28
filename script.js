/*
	WEB 303 Assignment 1 - jQuery
	Name: Manish Makwana
*/

// Created event 'keyup' here as it shows the amount when user releases a key after typing.

$(document).ready(function() {

	$("#yearly-salary, #percent").on("keyup", function() {		 
	
		var salary = $("#yearly-salary").val();
		var percent = $("#percent").val();
		var amount = salary * percent / 100;
		$("#amount").text("$" + amount).toFixed(2);
	
  	});

});

//We can also create 'change' event as it shows the amount after clicked an enter button.
// $("#yearly-salary, #percent").on("change", function(){});