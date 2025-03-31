/**
 * ABOUT
 * Effectively controls the Loader component display.
 * 
 * Example (from within a component):
 * const dispatch = useDispatch();
 * dispatch(setLoader(true)) // loader will be displayed
 * //... make api call
 * dispatch(setLoader(false)) // loader will be hidden
 * 
 * The reducer setLoader is meant to be called directly inside components making an api request.
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 display: false
}

export const loaderSlice = createSlice({
 name: "loader",
 initialState,
 reducers: {
  setLoader: (state, action) => {
   state.display = action.payload;
  },
 }
});

const loaderReducer = loaderSlice.reducer;

export const { setLoader } = loaderSlice.actions;
export default loaderReducer;