import {Table} from "../Table.tsx";
import {EmployeesTableProps} from "../Table.types.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    createEmployeeItem,
    deleteEmployeesData,
    IEmployeeItem, selectEmployeeId,
    selectEmployeesState, updateEmployeeItem
} from "../../../store/state";
import {AppDispatch} from "../../../store";


export const EmployeesTable = ({}: EmployeesTableProps) => {
    const employeesData = useSelector(selectEmployeesState);
    const dispatch = useDispatch<AppDispatch>()

    const createItem = (obj: IEmployeeItem) => {
        dispatch(createEmployeeItem(obj))
    }

    const updateItem = (obj: IEmployeeItem) => {
        dispatch(updateEmployeeItem(obj))
    }

    const deleteData = (ids: string[]) => {
        dispatch(deleteEmployeesData(ids))
    }

    const selectRowId = (id: string) => {
        dispatch(selectEmployeeId(id))
    }

    const headerSettings = [
        {
            title: "Фамилия",
            width: '100px',
            field: 'surname',
            isCreate: true
        },
        {
            title: "Имя",
            width: '100px',
            field: 'firstName',
            isCreate: true
        },
        {
            title: "Должность",
            width: '100px',
            field: 'job',
            isCreate: true
        }
    ]

    return (
        <div>
            <Table<IEmployeeItem>
                rowHeight={50}
                tableName={"employees"}
                data={employeesData.data}
                total={employeesData.total}
                visibleRows={10}
                headerSettings={headerSettings}
                createRow={createItem}
                updateRow={updateItem}
                deleteCheckedRows={deleteData}
                selectedRowId={employeesData.selectId}
                selectRowById={selectRowId}
            />
        </div>
    )
}