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
        
    $('button.load').on('click', function() {
        $(".label-place").empty();
        $(".saveRow").empty();
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
					console.log("in");
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
		
	});
});

$(document).on('click', '.product-buy', function(){
    console.log("addclick");
  $("#orderForm").addClass("d-none");
  var id = $(this).attr('data-id');
    console.log(id);
  addToCart(id);
});

$(document).on('click', '.showCart', function(){
  $("#orderForm").addClass("d-none");
  showCart();
})

var cartArrID = [];
var cartArrAmount = [];

function addToCart(id){
  while(cartArrAmount.length <= id){
    cartArrAmount.push(0);
  }
  if(cartArrAmount[id] == 0){
    cartArrID.push(id);
    cartArrAmount[id]++;
  }
  else{
    cartArrAmount[id]++;
  }
  Cookies.set('cartArrID', JSON.stringify(cartArrID));
  Cookies.set('cartArrAmount', JSON.stringify(cartArrAmount));
}


function showCart(){

  if(Cookies.get('cartArrID') != undefined){
    cartArrID=JSON.parse(Cookies.get('cartArrID'));
    cartArrAmount=JSON.parse(Cookies.get('cartArrAmount'));
  }

  var categoryName = "<p class=\"categoryName text-center font weight-bold\">Cart " + "<i class=\"material-icons align-middle\">shop</i>";
  $(".label-place").empty();
    $('.product_view').empty();
  $(".saveRow").empty();
  $(".label-place").append(categoryName);

  $(".product_item").empty();
  if(cartArrID.length == 0){
    $(".product_item").append( "<div class=\"container\"><div class=\"row products\"><div class=\"col\"><p class=\"text-center font-weight-bold\">Cart is empty</p></div></div></div>");
  }
  else{
    for(var i = 0; i < cartArrID.length; i++){
      setTimeout(function(i_local) {
          return function() {
            var id = cartArrID[i_local];
            $.ajax({
                url: 'http://nit.tron.net.ua/api/product/'+id,
                type: 'GET',
                dataType: 'json',
                success: function(content){
                  if(content.special_price != null){
                    var cart1 = "<div class=\"container border cartObj\"><div class=\"row\"><div class=\"col-sm-4\">" +
                    "<img src=\"" + content.image_url +"\" data_id=\"" + id + "\" class=\"rounded mx-auto d-block cartImg openStartProduct\" alt=\"Smiley face\" style=\"max-width:200px;max-height:500px\">" +
                    "</div><div class=\"col-sm-7\"><p data_id=\"" 
                        + id + "\" class=\"productName font-weight-bold openStartProduct\">"
                        + content.name + "</p><div class=\"row\"><div class=\"col-auto\"><a class=\"font-weight-bold align-middle\">Amount: </a></div><div class=\"form-group col\"><input class=\"form-control example-number-input\" type=\"number\" id=\"saveAmountId"+id+"\" value=\""+ cartArrAmount[id] + "\"></div></div>"+
                    "<a class=\"priceText font-weight-bold align-middle float-sm-right\">" + content.special_price + " &#8372</a></div><div class=\"float-right col\"><span data_id=\"" + id + "\" class=\"float-right removeFromCart\"><i class=\"material-icons align-middle\" style=\"font-size:30px;color:red\">cancel</i></span></div></div></div>";
                  }
                  else{
                    var cart1 = "<div class=\"container border cartObj\"><div class=\"row\"><div class=\"col-sm-4\">" +
                    "<img src=\"" + content.image_url +"\" data_id=\"" + id + "\" class=\"rounded mx-auto d-block cartImg openStartProduct\" style=\"max-width:200px;max-height:500px\" alt=\"Smiley face\">" +
                    "</div><div class=\"col-sm-7\"><p data_id=\"" + id + "\" class=\"productName font-weight-bold openStartProduct\">" + content.name + "</p><div class=\"row\"><div class=\"col-auto\"><a class=\"font-weight-bold align-middle\">Amount: </a></div><div class=\"form-group col\"><input class=\"form-control example-number-input\" type=\"number\" id=\"saveAmountId"+id+"\" value=\""+ cartArrAmount[id] + "\"></div></div>"+
                    "<a class=\"priceText font-weight-bold align-middle float-sm-right\">" + content.price + " &#8372</a></div><div class=\"float-right col\"><span data_id=\"" + id + "\" class=\"float-right removeFromCart\"><i class=\"material-icons align-middle\" style=\"font-size:30px;color:red\">cancel</i></span></div></div></div>";
                  }
                  $(".product_item").append(cart1);
                },
                error: function(xhr){
                    alert('Error while loading data!');
                },
            });
        }
      }(i), 50);
    }
    $(".saveRow").remove();
    $(".product_item").after( '<div class="row saveRow justify-content-center"><div class="col-auto"><button type="button" class="btn btn-primary mx-auto btn-lg orderBtn">Order</button></div>');
  }
}





