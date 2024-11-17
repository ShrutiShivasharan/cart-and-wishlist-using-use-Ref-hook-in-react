import { createContext, useRef, useState, useContext } from "react";

const CartWishlistContext = createContext();

export function CartWishlistProvider({ children }) {
    const cartRef = useRef([]);
    const wishlistRef = useRef([]);

    const [cart, setCart] = useState(0);
    const [wishlist, setWishlist] = useState(0);
    const [discount, setDiscount] = useState(0);

    //functions
    const addToCart = (product) => {
        const index = cartRef.current.findIndex((item) => item.id === product.id); 
        if (index === -1) {
            cartRef.current.push({ ...product, quantity: 1 });
        }else {
            cartRef.current[index].quantity += 1;
        }
        setCart(cart + 1); //re-render
    }

    const addToWishlist = (product) => {
        if (!wishlistRef.current.some((item) => item.id === product.id)) {
            wishlistRef.current.push(product);
        }
        setWishlist(wishlistRef + 1); //re-render
    }

    const removeFromCart = (productId) => {
        cartRef.current = cartRef.current.filter((item) => item.id !== productId);
        setCart(cart + 1); //re-render
    }

    const removeFromWishlist = (productId) => {
        wishlistRef.current = wishlistRef.current.filter((item) => item.id !== productId);
        setWishlist(wishlist + 1); //re-render
    }

    const clearCart = () => {
        cartRef.current = [];
        setCart(cart + 1); //re-render
    }

    const updateQuantity = (productId, action) => {
        const index = cartRef.current.findIndex((item) => item.id === productId);
        if (action === 'increment') {
            cartRef.current[index].quantity += 1;
        } else if (action === 'decrement' && cartRef.current[index].quantity > 1) {
            cartRef.current[index].quantity -= 1;
        }
        setCart(cart + 1); //re-render
    }

    const applyCoupon = (code) => {
        if (code === '100Off') {
            setDiscount(100);
        } else if (code === '200Off') {
            setDiscount(200);
        } else {
            alert("Invalid Coupon Code! Enter 100Off");
            setDiscount(0);
        }
    }

    const removeCoupon = () => {
        setDiscount(0);
    }

    return (
        <CartWishlistContext.Provider
            value={{
                cartRef, wishlistRef, cart, wishlist, discount, addToCart, addToWishlist, removeFromCart, removeFromWishlist, clearCart, updateQuantity, applyCoupon, removeCoupon
            }}>
            {children}
        </CartWishlistContext.Provider>
    )
}

export function useCartWishlistRef() {
    return useContext(CartWishlistContext)
}