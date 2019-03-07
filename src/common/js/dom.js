//为el添加该class
export function addClass(el,className){
	if(hasClass(el,className)){
		return
	}
	let classNames = el.className.split(" ")
	classNames.push(className)//添加
	el.className = classNames.join(" ")
}
//判断el是否含有该class
export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}