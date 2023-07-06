import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";



export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [fooditems, setfooditems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/displaydata", {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
    response = await response.json();
    setfoodCat(response[1]);
    setfooditems(response[0]);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner " style={{ maxHeight: "500px" }}>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setsearch(e.target.value)}}
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?fruit"
                className="d-block w-100 "
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100 "
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditems !== []
                    ? fooditems
                        .filter(
                          (item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                foodItem = {filterItems}
                                options={filterItems.options[0]}
                                
                              ></Card>
                            </div>
                          );
                        })
                    : "nodata"}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
