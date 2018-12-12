
let _show_cat=({id, name, description})=>{
	let $a =$(`<p class="load" id="${id+name}">`).text(name);
    return $a;
};

module.exports=_show_cat;