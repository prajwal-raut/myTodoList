import React, { useState, useEffect } from "react";

const Todo = () => {

  // get the data from Local Storage
  const getLocalItmes = () => {
    let list = localStorage.getItem("lists");
    console.log(list);

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };


  // hooks
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);


  // add items
  const addItem = () => {
    if (!inputData) {
      alert("plzz fill data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };


  // delete the items
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };


  // edit items
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };


  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      // input sec
      <section id="main">
        <div className="child-div">
          <h2>
            Add Your <span>TodoList...</span>
          </h2>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus addEdit"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit addEdit"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>
        </div>
      </section>


      // Card sec
      <section id="Cards">
        <div className="box-container">

        {/* use map method to render the cards dynamically */}
          {items.map((elem, index) => {
            return (
              <div className="box" key={elem.id}>
                <span className="number">{index + 1}</span>
                <p>{elem.name}</p>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    title="Edit Item"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Todo;
