import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// ✅ Fetch Admin Bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      const response = await axios.get("http://localhost:8000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching bookings");
    }
  }
);


// ✅ Cancel Booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:8000/api/admin/cancel-booking/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return bookingId; // ✅ Return ID to update Redux state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error canceling booking");
    }
  }
);

// ✅ Create Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
        state.error = null; // ✅ Reset error
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error"; // ✅ Ensure error is a string
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload || "Error canceling booking"; // ✅ Handle errors properly
      });
  },
});

export default bookingSlice.reducer;
