import React from "react";
import { useState } from "react";
import Filter from "./Filter";
import Products from "./Products";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [products, setProducts] = useState([]);
  const [mighty , setMighty] = useState(false)

  const saveData = async () => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("qty", qty);
    formData.append("price", price);
    formData.append("date", date);

    let res = await fetch("http://localhost:3001/product", {
      method: "POST",
      body: formData,
      // mode:'no-cors'
    });
    res = await res.json();

    if (res.data) {
      alert("sucessfully added...!!")
      setProducts(res.data);

    } else {
      alert(res.message);
    }

    // console.log(res.data)
  };

  const passData = (products)=>{
    setProducts(products)  
  }

  return (
    <>
      <h1 className="name">5 Exceptions</h1>

      <div className="main">
        <div className="product">

          <label htmlFor="">Product Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>{" "} <br />
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input  type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
          <input  type="number" placeholder="Qty"  value={qty}  onChange={(e) => setQty(e.target.value)}/>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)}/>

          <button className="add" onClick={() => setMighty(true)}  >+</button>
        </div>
        <button className="save" onClick={saveData}>
          save
        </button>
      </div>
      <div className="filter-with">
        <div>
          <Filter passData={passData} />
        </div>
        <div className="do-top">
          <Products data={products}/>    
        </div>
        
      </div>
    </>
  );
};

export default Home;
