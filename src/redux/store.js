import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";  // Booking slice for managing bookings
import authReducer from "./authSlice";        // Auth slice for authentication

const store = configureStore({
  reducer: {
    auth: authReducer,       // Authentication state
    bookings: bookingReducer, // Booking state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid errors with non-serializable data (e.g., Dates, Promises)
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development mode
});

export default store;
