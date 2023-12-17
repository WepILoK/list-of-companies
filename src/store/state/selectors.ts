import {RootState} from "../types";

export const selectCompaniesState = (state: RootState) => state.companies;

export const selectEmployeesState = (state: RootState) => state.employees;