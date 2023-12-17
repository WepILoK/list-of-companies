import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICompanyItem, IEmployeeItem, IState} from "./types.ts";
import {fakeCompaniesData, fakeEmployeesData} from "./fakeCompaniesData.ts";

const initialState: IState = {
    companies: {
        data: [],
        total: 0,
        selectId: ''
    },
    employees: {
        data: [],
        total: 0,
        selectId: ''
    }
}

const companySlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        getCompanyData: (state) => {
            state.companies.data = fakeCompaniesData
            state.companies.total = fakeCompaniesData.length
        },
        createCompanyItem: (state, action: PayloadAction<ICompanyItem>) => {
            state.companies.data = [{...action.payload, employeesCount: 0}, ...state.companies.data]
            state.companies.total = state.companies.total + 1
        },
        updateCompanyItem: (state, action: PayloadAction<ICompanyItem>) => {
            state.companies.data = state.companies.data.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                } else return item
            })
        },
        deleteCompaniesData: (state, action: PayloadAction<string[]>) => {
            state.companies.data = state.companies.data.filter((item) => !action.payload.includes(item.id))
            state.companies.total = state.companies.total - action.payload.length
        },
        selectCompanyId: (state, action: PayloadAction<string>) => {
          state.companies.selectId = action.payload
        },
        getEmployeesData: (state, action: PayloadAction<string>) => {
            const findEmployeesData = fakeEmployeesData
                .find((item) => item.id === action.payload)

            state.companies.selectId = action.payload

            state.employees.data = findEmployeesData?.data ?? []
            state.employees.total = findEmployeesData?.data.length ?? 0
        },
        createEmployeeItem: (state, action: PayloadAction<IEmployeeItem>) => {

            state.companies.data = state.companies.data
                .map((item) => item.id === state.companies.selectId
                    ? {...item, employeesCount: item.employeesCount + 1} : item)

            state.employees.data = [{...action.payload}, ...state.employees.data]
            state.employees.total = state.employees.total + 1
        },
        updateEmployeeItem: (state, action: PayloadAction<IEmployeeItem>) => {
            state.employees.data = state.employees.data.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                } else return item
            })
        },
        deleteEmployeesData: (state, action: PayloadAction<string[]>) => {
            const ids = action.payload

            state.companies.data = state.companies.data
                .map((item) => item.id === state.companies.selectId
                    ? {...item, employeesCount: item.employeesCount - ids.length} : item)

            state.employees.data = state.employees.data
                .filter((item) => !ids.includes(item.id))
            state.employees.total = state.employees.total - ids.length
        },
        selectEmployeeId: (state, action: PayloadAction<string>) => {
            state.employees.selectId = action.payload
        }
    },

})

export const companyReducer = companySlice.reducer

export const {
    getCompanyData,
    createCompanyItem,
    updateCompanyItem,
    deleteCompaniesData,
    getEmployeesData,
    createEmployeeItem,
    updateEmployeeItem,
    deleteEmployeesData,
    selectCompanyId,
    selectEmployeeId,
} = companySlice.actions