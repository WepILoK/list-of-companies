import './App.sass'
import {CompaniesTable} from "./components/Table/CompaniesTable/CompaniesTable.tsx";
import {EmployeesTable} from "./components/Table/EmployeesTable/EmployeesTable.tsx";
import {useSelector} from "react-redux";
import {selectCompaniesState} from "./store/state";

function App() {
    const isCompanySelected = !!useSelector(selectCompaniesState).selectId;


    return (
        <div className={'app'}>
            <CompaniesTable/>
            {isCompanySelected &&
                <EmployeesTable/>
            }
        </div>
    )
}

export default App
