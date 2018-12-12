
let _productHTML=({id, name, image_url, price, special_price})=>{
	let $card=$(`<div class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
	$card.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$card.append($(`<span class="product-title mx-auto">`).text(name));
	if(special_price) {
        
        $card.append($(`<span class="mx-auto product-special-price">`).text(special_price));
        
		$card.append($(`<s class="mx-auto product-price">`).text(price));
		
         $card.append($(`<button type="button" class="btn button bg-success product-buy  add_item" data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${special_price}">`).text("В корзину"));
	}else{
        $card.append($(`<span class="mx-auto product-price">`).text("Цена: " + price));
        
        
         $card.append($(`<button type="button" class="btn button bg-success product-buy  add_item" data-id='${id}' data-title="${name}" data-img="${image_url}" data-price="${price}">`).text("В корзину"));
    }
    return $card;
};

module.exports=_productHTML;





