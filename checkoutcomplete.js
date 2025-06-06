document.addEventListener('DOMContentLoaded', function() {
    // clear localstorage
    localStorage.removeItem('cartProducts');
    localStorage.removeItem('totalPrice');
    // check if they are really removed
    console.log('Cart cleared:', !localStorage.getItem('cartProducts') && !localStorage.getItem('totalPrice'));

});