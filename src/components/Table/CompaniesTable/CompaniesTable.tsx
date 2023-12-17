import {CompaniesTableProps} from "../Table.types.ts";
import {useEffect} from "react";
import {Table} from "../Table.tsx";
import {AppDispatch} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {
    createCompanyItem,
    deleteCompaniesData,
    getCompanyData, getEmployeesData,
    ICompanyItem,
    selectCompaniesState, selectCompanyId, updateCompanyItem
} from "../../../store/state";

export const CompaniesTable = ({}: CompaniesTableProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const companiesData = useSelector(selectCompaniesState);

    const createItem = (obj: ICompanyItem) => {
        dispatch(createCompanyItem(obj))
    }

    const updateItem = (obj: ICompanyItem) => {
        dispatch(updateCompanyItem(obj))
    }

    const deleteData = (ids: string[]) => {
        dispatch(deleteCompaniesData(ids))
    }

    const selectRowId = (id: string) => {
        dispatch(selectCompanyId(id))
        dispatch(getEmployeesData(id))
    }


    const headerSettings = [
        {
            title: "Название компании",
            width: '100px',
            field: 'name',
            isCreate: true
        },
        {
            title: "Кол-во сотрудников",
            width: '100px',
            field: 'employeesCount',
            isCreate: false
        },
        {
            title: "Адрес",
            width: '250px',
            field: 'address',
            isCreate: true
        }
    ]

    useEffect(() => {
        dispatch(getCompanyData())
    }, [])


    return (
        <div>
            <Table<ICompanyItem>
                rowHeight={50}
                tableName={"company"}
                data={companiesData.data}
                total={companiesData.total}
                visibleRows={10}
                headerSettings={headerSettings}
                createRow={createItem}
                updateRow={updateItem}
                deleteCheckedRows={deleteData}
                selectedRowId={companiesData.selectId}
                selectRowById={selectRowId}
            />
        </div>
    )
}