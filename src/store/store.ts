import {configureStore} from "@reduxjs/toolkit";
import {companyReducer} from "./state";

const store = configureStore({
    reducer: companyReducer
})

export default store