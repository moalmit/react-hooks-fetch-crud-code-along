import React, { useState } from "react";


//step-9 include onAddItem is a prop comes from ShoppingList parent and use it in fetch
// function ItemForm()
function ItemForm( {onAddItem} ) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

//step-4 add function to handle submissions
function handleSubmit(e){
  e.preventDefault()
  // console.log("name", name)
  // console.log("category", category)

  //step-5 create new item object
  const itemData = {name: name, category: category, isInCart: false}
  // console.log(itemData)
  
  //step-6 fetch POST
  fetch("http://localhost:4000/items",{
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(itemData),
  })
  .then(r=>r.json())
  // .then(newItem=>console.log(newItem))
  //replace console.log(newItem) and use prop onAddItem
  .then(newItem=>onAddItem(newItem))


}


  return (
    // Set up the form to call handleSubmit when the form is submitted
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
