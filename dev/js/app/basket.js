/*
 * Object literal pattern (with jQuery) used to demonstrate the following:
 * - simple modular javascript approach, 
 * - scalability/separation of concerns 
 * - efficient DOM usage
 *
 * To do:
 * - Implement AJAX to post data in JSON format to a REST API endpoint
 * - Determine a more suitable pattern for checkout module / incorporate a JS framework
 *
 */

var basket = {
    subtotal: 0,
    vat: 0,
    totalCost: 0,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        this.$el = $('#basket');
        this.$product = this.$el.find('tr.product');
        this.$subtotalEl = this.$el.find('.subtotal-value');
        this.$vatEl = this.$el.find('.vat-value');
        this.$totalEl = this.$el.find('.totalcost-value');
    },
    bindEvents: function() {
        this.$product.on('click', '.delete-product', this.deleteProduct.bind(this));
        this.$product.on('click', ':input.checkout-qty', this.updateQuantities.bind(this));
    },
    render: function() {
        this.updateSubtotal();
        this.updateVat();
        this.updateTotal();
        this.$subtotalEl.text(this.subtotal.toFixed(2));
        this.$vatEl.text(this.vat.toFixed(2));
        this.$totalEl.text(this.totalCost.toFixed(2));
    },
    updateQuantities: function(event) {
        console.log('u qty');
        var newQuantity = $(event.target).val();
        var itemPrice = $(event.target).closest('tr').find('.price-value').text();
        var newCost = newQuantity*itemPrice;
        $(event.target).closest('tr').find('.cost-value').text(newCost.toFixed(2));
        this.render();
    },
    deleteProduct: function(event) {
        var $remove = $(event.target).closest('tr');
        $remove.remove(); // remove from DOM
        var i = this.$product.index($remove); 
        this.$product.splice(i, 1); // remove from cached DOM
        this.render();
    },
    updateSubtotal: function() {
        var basketSubtotal = 0;
        this.$product.each( function () {
            basketSubtotal += parseFloat($(this).find('.cost-value').text(), 10);
        });
        this.subtotal = basketSubtotal;
    },
    updateVat: function() {
        this.vat = this.subtotal * 0.2;
    },
    updateTotal: function() {
        this.totalCost = this.subtotal + this.vat;
    },
};

basket.init();