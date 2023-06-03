import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // step-1 import and add useEffect hook
  useEffect(()=> {
    fetch("http://localhost:4000/items")
    .then(r=>r.json())
    // step-2 fetch GET displays items .then((items)=>console.log(items))
    // step-3 replace console.log with setItems state and the items will be displayed
    .then((items)=>setItems(items))
  }, [])

  //step-14 add function and pass it as a prop for update item fetch
  function handleUpdateItem(updatedItem){
    console.log("In ShoppingCart:", updatedItem)
    //step-19 use map methos tp update 
    const updatedItems = items.map(item=>{
      if (item.id===updatedItem.id){return updatedItem}
      else {return item}
    })
    //step-20 setState with the new array
    setItems(updatedItems)
  }

  //step-7 add this function and pass it as a prop to ItemForm component
  function handleAddItem(newItem){
    // console.log("In ShoppingList:", newItem)
    //step-10 add new item to the array using state and spread operator
    setItems([...items, newItem])
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });


  //step-23 function to pass as a prop
//   function handleDeleteItem(deletedItem) {
//     // console.log("In ShoppingCart:", deletedItem);
//   //step-27 call setState to delete with a new array using .filter
//     const updatedItems = items.filter((item) => item.id !== deletedItem.id)
//     setItems(updatedItems);
// }

function handleDeleteItem(deletedItem) {
  // console.log("In ShoppingCart:", deletedItem)
  const updatedItems = items.filter((item) => item.id !== deletedItem.id);
  setItems(updatedItems)

}


  return (
    <div className="ShoppingList">

    {/* step-8 add the onAddItem prop to pass it to ItemForm.js */}
      {/* <ItemForm /> */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* step-24 pass handleDeleteItem as a prop to Item */}
        {/* step-15 pass handleUpdateItem as a prop to Item */}
        {itemsToDisplay.map((item) => (
          // <Item key={item.id} item={item} onUpdateItem={handleUpdateItem}/>
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
