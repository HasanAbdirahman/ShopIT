import { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import Product from "../product/product";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const keyword = params.keyword;
  console.log(keyword);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getAllProducts(keyword, price, currentPage));
  }, [dispatch, alert, error, keyword, price, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Product Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                    <div className="col-6 col-md-9">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} col={3} />
                    ))}
                </Fragment>
              )}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
