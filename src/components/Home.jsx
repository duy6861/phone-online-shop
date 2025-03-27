import { useGetAllProductQuery } from "../features/productApi";
import "./style/home.scss"
import { useNavigate } from 'react-router-dom'
import { addToCart } from "../features/cartSlice";
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { item, status, errors } = useSelector((state) => state.product)
  const { data: product, error, isLoading } = useGetAllProductQuery()
  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
    navigate('/cart')
  }
  return (
    <div className="home-container">
      {isLoading ? (<p>Loading ...</p>)
        : error ? (<p> an error occurred ...</p>) :
          (<>
            <h2>New Arrivals</h2>
            <div className="products">
              {product?.map(item => <div key={item.id} className="product" onClick={() => console.log("aa")}>
                <h3>{item.name}</h3>
                <img alt={item.name} src={item.img}></img>
                <div className="product-detail">
                  <span>{item.desc}</span>
                  <span className="price">$ {item.price}</span>
                </div>
                <button onClick={() => handleAddToCart(item)}>Add To Cart</button>
              </div>)}
            </div>
          </>)}
    </div>
  );
}

export default Home;