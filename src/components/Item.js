import React from "react";

//step-25 pass onDeleteItem prop
//step-17 pass onUpdateItem as prop
// function Item({ item, onUpdateItem }) {
  function Item({ item, onUpdateItem, onDeleteItem  }) {

//step-26 fetch DELETE
function handleDeleteClick() {
  // Call onDeleteItem, passing the deleted item
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => onDeleteItem(item));
}


//step-11 add handle click function
function handleAddToCartClick(){
  // console.log("clicked item", item)

  //step-13 fetch PATCH
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
    .then((r) => r.json())
    // step-18 Call onUpdateItem, passing the data returned from the fetch request
    // .then((updatedItem) => console.log(updatedItem))
    .then((updatedItem) => onUpdateItem(updatedItem));
}


  //step-22 fetch DELETE
  // function handleDeleteClick() {
  //   fetch(`http://localhost:4000/items/${item.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((r) => r.json())
  //     .then(() => console.log("deleted!"));
  // }




  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

       {/* step-12 add the onClick listener */}
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      {/* step-22.5 onClick to delet */}
      {/* <button className="remove">Delete</button> */}
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item
