/*
This file loaded in the footer
*/

var subtotal, vat, totalCost;

jQuery(document).ready(function($) {
  
  calculateSubtotal();
  calculateVat();
  calculateTotal();
  updateQuantities();
  deleteProduct();

 
}); /* end of as page load scripts */



function calculateSubtotal() {
	subtotal = 0;

  	$(".cost-value").each( function () {
	  	subtotal += parseFloat($(this).text(), 10);
	  	console.log(subtotal);
  	});

  	$('.subtotal-value').text(subtotal.toFixed(2));
}

function calculateVat() {
	vat = subtotal * 0.2;

  	$('.vat-value').text(vat.toFixed(2));
}

function calculateTotal() {
	total = subtotal + vat;

  	$('.totalcost-value').text(total.toFixed(2));
}

function updateQuantities() {

  	$(":input.checkout-qty").on('keyup mouseup', function () {
	  	var newQuantity = $(this).val();
	  	var itemPrice = $(this).closest('tr').find('.price-value').text();
	  	var newCost = newQuantity*itemPrice;
	  	$(this).parents('tr').find('.cost-value').text(newCost.toFixed(2));

	  	  calculateSubtotal();
		  calculateVat();
		  calculateTotal();
  	});

}

function deleteProduct(){
	$(".delete-product span").on('keyup mouseup', function () {
		var itemPrice = $(this).closest('tr').remove();
		  calculateSubtotal();
		  calculateVat();
		  calculateTotal();
	});
}


          