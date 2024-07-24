import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Removed unused import FaUser
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed unused import useParams
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./Rating";
import { addToWishlist } from "../slices/wishSlice";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const addToWishlistHandler = (event) => {
    dispatch(addToWishlist(product));

    // Use the passed event object to find the heart icon within the same component
    const heartIcon = event.currentTarget.querySelector("svg");
    heartIcon.classList.add("heart-pop");
    setTimeout(() => heartIcon.classList.remove("heart-pop"), 600); // Remove class after animation
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>

        <div className="cardButtons">
          <Button
            variant="light"
            onClick={(event) => addToWishlistHandler(event)} // Pass the event object
            className="btn-block wishlist-btn"
            type="button"
          >
            <FaHeart color="red" /> {/* Red heart icon for wishlist */}
          </Button>

          <Button
            variant="light"
            className="btn-block cart-btn"
            type="button"
            disabled={product.countInStock === 0}
            onClick={addToCartHandler}
          >
            <FaShoppingCart /> {/* Cart icon for add to cart */}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
