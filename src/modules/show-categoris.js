
let _show_cat=({id, name, description})=>{
	let $a =$(`<button class="load btn btn-primary" id="${id+name}">`).text(name);
    return $a;
};

module.exports=_show_cat;