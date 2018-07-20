export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	}
};

export const pushLog = (arr, elem) => {
	let newArr = [...arr]
	if (newArr.length >= 100) {
		newArr.shift();
	}
	newArr.push(elem);
	return newArr;
}
