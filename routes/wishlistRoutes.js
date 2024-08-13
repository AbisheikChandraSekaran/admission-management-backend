const express = require('express');
const Router = express.Router();
const wishlistController = require("../controllers/wishlistController.js");
const auth = require("../middleware/auth.js")

Router.post("/wishlist", auth, wishlistController.addToWishlist);
Router.get("/wishlist", auth, wishlistController.getWishlistItems);
Router.delete("/wishlist", auth, wishlistController.deleteWishlistItem);


module.exports = Router;