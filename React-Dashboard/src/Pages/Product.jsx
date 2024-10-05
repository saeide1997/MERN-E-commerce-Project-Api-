import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Chart from "../components/Chart";
import { productData } from "../dummyData";
import { Publish } from "@mui/icons-material";
import {addProduct,updateProduct} from '../redux/apiCalls'
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const location = useLocation()
  console.log(location.pathname.split('/')[2]);
  const productId = location.pathname.split('/')[2]
  const product = useSelector(state=> state.product.products.find(product => product._id == productId))

  const [userInf, setUserInf] = useState([]);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInf((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
      const product = { ...userInf, categories: cat, color:color, size:size };
      updateProduct(productId,product, dispatch);
  };

  return (
    <div className="flex-6 p-5 items-start">
      <div className=" flex justify-between items-center">
        <h1 className=""> </h1>
        <Link to={"/newProduct"}>
          <button className="w-20 p-1 bg-teal-500 rounded text-white ">
            ایجاد
          </button>
        </Link>
      </div>
      <div className="flex ">
        <div className="flex-1">
          <Chart data={productData} title=" فروش" grid dataKey="فروش" />
        </div>
        <div className="flex-1 p-5 m-5 shadow">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover ml-5"
              src={product.img}
              alt=""
            />
            <span className="">محصول</span>
          </div>
          <div className="mt-3">
            <div className="w-36 flex justify-between">
              <span className="">شناسه:</span>
              <span className="">{product._id}</span>
            </div>
            <div className="w-36 flex justify-between">
              <span className="">نام کالا:</span>
              <span className="">{product.title}</span>
            </div>
            <div className="w-36 flex justify-between">
              <span className="">موجودی:</span>
              <span className="">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-5 m-5 shadow">
        <form className="flex justify-between mt-5" action="">
          <div className="flex flex-wrap">
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                نام محصول
              </label>
              <input
                className=" w-[50%] h-8"
                onChange={handleChange}
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                placeholder = {product.title}
                name="title"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                توضیحات محصول
              </label>
              <input
                className=" w-[50%] h-8"
                onChange={handleChange}
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                placeholder = {product.desc}
                name="desc"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                قیمت محصول
              </label>
              <input
                className=" w-[50%] h-8"
                onChange={handleChange}
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                placeholder = {product.price}
                name="price"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                کتگوری محصول
              </label>
              <input
                className=" w-[50%] h-8"
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                onChange={handleCat} 
                placeholder = {product.categories}
                name="Categories"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                رنگ محصول
              </label>
              <input
                className=" w-[50%] h-8"
                onChange={handleColor} 
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                placeholder = {product.color}
                name="color"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" htmlFor="">
                سایز محصول
              </label>
              <input
                className=" w-[50%] h-8"
                onChange={handleSize} 
                style={{ borderBottom: "1px solid gray" }}
                type="text"
                placeholder = {product.size}
                name="size"
                id=""
              />
            </div>
            <div className="flex flex-col w-[50%] mt-3">
              <label className="mb-1 text-base" for="stock">
                موجودی
              </label>
              <select onChange={handleChange} className="h-10 w-[50%] rounded-md pr-2" name="inStock" id="stock">
                <option value="true">بله</option>
                <option value="false">خیر</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-center items-center">
              <label htmlFor="img">
                <Publish className="cursor-pointer" />
              </label>
              <input className="hidden" type="file" name="" id="img" />
              <img
                className="w-44 h-44"
                src={product.img}
                alt=""
              />
            </div>
            <button onClick={handleClick} className="p-1 rounded-md bg-teal-600 text-white">
              به روز رسانی
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
