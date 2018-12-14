
let _show_description=({
	id,
	name,
	image_url,
	description,
	price,
	special_price
})=>{
    
let $product=$(`<div class="card col-xs-12 col-sm-4 col-md-3 mx-auto" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title mx-auto> `).text(name));
	$product.append($(`<span class="product-description">ОПИС:</span>`).text(description));
    
		if(special_price) {
		$product.append($(`<s class="mx-auto product-price">`).text(price));
		$product.append($(`<span class="mx-auto product-special-price">`).text(special_price));
        $product.append($(`<button type="button" class="btn btn-success button  product-buy  add_item"  data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${special_price}">`).text("В корзину"));
	}else{
        $product.append($(`<span class="mx-auto product-price">`).text("Цена: " + price));
        $product.append($(`<button type="button" class="btn btn-success button product-buy  add_item"  data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${price}">`).text("В корзину"));
    }
	return $product;
};

module.exports=_show_description;