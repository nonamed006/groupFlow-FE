import { useState } from "react"

export const UseMouseOver = () => {
	const [mouseOverIndex, setMouseOverIndex] = useState(-1);

	// MouseOver 동작
	const onMouseOver = (index) => setMouseOverIndex(index)

	// MouseOut 동작
	const onMouseOut = () => setMouseOverIndex(-1)

	return [mouseOverIndex, onMouseOver, onMouseOut]
}