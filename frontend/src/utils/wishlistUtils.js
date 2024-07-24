export const saveWishlistToLocalStorage = (state) => {
  localStorage.setItem("wishlist", JSON.stringify(state));
};
