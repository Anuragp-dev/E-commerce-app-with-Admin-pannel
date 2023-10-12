import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';


const OurStore = () => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState(4);
    const productState = useSelector((state) => state.product?.product);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);


    // Filter state

    const [tag, setTag] = useState(null);
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);
   

    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newTags = [];


        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrands.push(element?.brand);
            category.push(element.category);
            newTags.push(element.tags);

        }
        setBrands(newBrands);
        setCategories(category);
        setTags(newTags);

    }, [productState]);


    useEffect(() => {
        getProducts();
    }, [sort,tag,brand,category,minPrice,maxPrice]);

    const getProducts = () => {
        dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
    }



    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title='Our Store' />
            <Container class1="store-wrapper home-wrapper-2 py-5">

                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>
                                Shop By Catagories
                            </h3>
                            <div>
                                <ul className='ps-0'>
                                    {
                                        categories && [...new Set(categories)]?.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setCategory(item)}>{item} </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='filter-card mb-3'>
                            <h3 className='filter-title'>
                                Filter By
                            </h3>
                            <div className=''>


                                <h5 className="sub-title">Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating">
                                        <input type="number"
                                         className="form-control" 
                                        id="floatingInput1" 
                                        placeholder="From"
                                        onChange={(event) => {setMinPrice(event.target.value)}}
                                        />
                                        <label htmlFor="floatingInput1">From</label>
                                    </div>

                                    <div className="form-floating">
                                        <input type="number" className="form-control " id="floatingInput1" placeholder="To" 
                                         onChange={(event) => {setMaxPrice(event.target.value)}} />
                                        <label htmlFor="floatingInput1">To</label>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className='mt-4 mb-3'>
                            <h3 className='sub-title'>
                                Products Tags
                            </h3>
                            <div>
                                <div className=" text-capitalize product-tags d-flex flex-wrap align-items-center gap-10">

                                    {
                                        tags && [...new Set(tags)]?.map((item, index) => {
                                            return (
                                                <span key={index} onClick={() => setTag(item)}
                                                    className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                                    {item}
                                                </span>

                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>
                        <div className='mt-4 mb-3'>
                            <h3 className='sub-title'>
                                Products Brands
                            </h3>
                            <div>
                                <div className=" text-capitalize product-tags d-flex flex-wrap align-items-center gap-10">

                                    {
                                        brands && [...new Set(brands)]?.map((item, index) => {
                                            return (
                                                <span key={index} onClick={() => setBrand(item)}
                                                    className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                                    {item}
                                                </span>

                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className='mb-0 d-block' style={{ width: "100px" }}> Sort By:</p>
                                    <select defaultValue={"manual"} name="" id="" className="form-control form-select" onChange={(event) => { setSort(event.target.value)}}>
                                        <option value="title">Alphabetically, A-Z</option>
                                        <option value="-title">Alphabetically, Z-A</option>

                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low  </option>

                                        <option value="createdAt">Date, old to new</option>
                                        <option value="-createdAt">Date, new to old  </option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className="totalproducts mb-0">21 Products</p>
                                    <div className='d-flex gap-10 align-items-center grid'>
                                        <img onClick={() => { setGrid(3) }} src="images/gr4.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(4) }} src="images/gr3.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(6) }} src="images/gr2.svg" className='d-block img-fluid' alt="grid" />
                                        <img onClick={() => { setGrid(12) }} src="images/gr.svg" className='d-block img-fluid' alt="grid" />



                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="product-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard grid={grid} data={productState ? productState : []} />
                            </div>

                        </div>
                    </div>
                </div>

            </Container>


        </>

    )
}

export default OurStore;
