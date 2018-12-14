import './scss/main.scss';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


console.log('hi');
console.log(`The time is ${new Date()}`);


let _item = require('./modules/show_item');
let _productHTML = require('./modules/product-html');
let _categoryHTML = require('./modules/show-categoris');
let _item_description = require('./modules/show_description');



jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json) {
		json.forEach(product => $('.product_item').append(_productHTML(product)));
	},
	error: function(xhr) {
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},
});


$(document).ready(function() {
    $('#categories').append(_categoryHTML({id: "1", name: "All", description: "All products"}));
	$.getJSON('https://nit.tron.net.ua/api/category/list', function(data) {
		data.forEach((category) => {
            $('#categories').append(_categoryHTML(category));
		});
        
    $('p.load').on('click', function() {
			$(".product_item").html('');
			$(".product_view").html('');
			var id = this.id;
        console.log(id);
        if(id=="1All"){
            $.getJSON('http://nit.tron.net.ua/api/product/list', function(data) {
				data.forEach((product) => {
					let $productHTML = _productHTML(product);
					$('.product_item').append($productHTML);
				});
			});} else {
			$.getJSON('http://nit.tron.net.ua/api/product/list/category/' + parseInt(id, 10), function(data) {
				data.forEach((product) => {
					console.log("in for");
					let $productHTML = _productHTML(product);
					$('.product_item').append($productHTML);
				});
			});}
		});
        
	$('div.product_item').on('click', function() {
			var name_ = $(this).attr('name');
		});
	});
});

$(document).on('click', '.card', function() {
	var $this = $(this);
	var id = $this.closest('.card').data('product-id');
	$(".product_item").html('');
	$(".product_view").html('');
	$.getJSON('http://nit.tron.net.ua/api/product/' + id, function(data) {
		let $itemDescription = _item_description(data);
		$('.product_view').append($itemDescription);
		$('.product_view').append($itemDescription);
	});
});