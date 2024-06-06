// //Implement a checkout component with stripe payment gateway as buy.strip.com Link to the store

// // pages/checkout.js
// import { loadStripe } from "@stripe/stripe-js";

// const CheckoutComponent = () => {
//   const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     const stripe = await stripePromise;
//     if (!stripe) {
//       return;
//     }
//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [{ price: "price_ID", quantity: 1 }],
//       mode: "payment",
//       successUrl: "http://localhost:3000/success",
//       cancelUrl: `http://localhost:3000/cancel`,
//     });

//     if (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <button
//       className="rounded-full bg-green-700 px-8 py-2 font-bold text-white transition-colors hover:bg-green-800"
//       role="link"
//       onClick={handleClick}
//     >
//       Checkout
//     </button>
//   );
// };

// export default CheckoutComponent;
