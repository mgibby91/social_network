import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import ReactTags from 'react-tag-autocomplete'
 
interface IProps {
	tags: ITags
}

interface ITags {
	id: number,
	name: string
}
export default function Tags(props: IProps) {
 
	const [tags, setTags] = useState([]);
	const [suggestions, setSuggestions] = useState([])

	setTags([
		{ id: 1, name: "Apples" },
		{ id: 2, name: "Pears" }
	])
	setSuggestions([
		{ id: 3, name: "Bananas" },
		{ id: 4, name: "Mangos" },
		{ id: 5, name: "Lemons" },
		{ id: 6, name: "Apricots" }
	])

	const reactTags = useRef(null)
 
  const onDelete = (i) => {
    tags.slice(0)
    tags.splice(i, 1)
    setTags({ tags })
  }
 
  const onAddition = (tag) => {
    [].concat(tags, tag)
    setTags({ tags })
  }
 
	return (
      <ReactTags
        ref={reactTags}
        tags={tags}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition} />
	)
}
