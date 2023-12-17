export interface IState {
    companies: {
        data: ICompanyItem[]
        total: number
        selectId: string
    }
    employees: {
        data: IEmployeeItem[]
        total: number
        selectId: string
    }
}

export interface ICompanyItem {
    id: string
    name: string
    employeesCount: number
    address: string
}

export interface IEmployeeItem {
    id: string
    firstName: string
    surname: string
    job: string
}
