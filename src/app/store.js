//  import configureStore API from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// import reducers
import darkModeReducer from "../features/darkMode/darkModeSlice";
// import authReducer from "../features/darkMode/authSlice";

// create store with reducers
const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    // auth: authReducer,
  },
});

// export store
export default store;
