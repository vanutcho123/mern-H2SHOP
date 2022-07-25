import "./App.scss";
import Header from "./components/Header/Header";
// import Products from "./components/Products/Products";
import data from "./data";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <div className="products">
          {data.products.map(product => (
            <div className="product" key={product.slug}>
              <a href="/" className="product_img">
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product_content">
                <h4 className="product_category">{product.category}</h4>
                <h3 className="product_name">{product.name}</h3>
                <div className="product_price">
                  <span className="product_price-initial">
                    {product.initialPrice}
                  </span>
                  <span className="product_price-current">
                    {product.currentPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
