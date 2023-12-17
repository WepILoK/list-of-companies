import './Table.style.sass'
import {useEffect, useState} from "react";
import {HeaderSettingsData} from "./Table.types.ts";

interface TableProps<D extends { [key: string]: any, id: string }> {
    rowHeight: number
    data: D[]
    total: number
    tableName: string
    visibleRows: number
    headerSettings: HeaderSettingsData[]
    createRow: (obj: D, callback: () => void) => void
    updateRow: (obj: D, callback: () => void) => void
    deleteCheckedRows: (ids: string[]) => void
    selectRowById: (id: string) => void
    selectedRowId: string
}

export const Table = <D extends { [key: string]: any, id: string }, >({
                                                                          rowHeight,
                                                                          data,
                                                                          total,
                                                                          visibleRows,
                                                                          headerSettings,
                                                                          selectRowById,
                                                                          selectedRowId,
                                                                          tableName,
                                                                          createRow,
                                                                          updateRow,
                                                                          deleteCheckedRows
                                                                      }: TableProps<D>) => {
    const [start, setStart] = useState(0)
    const [checkedRows, setCheckedRows] = useState<string[]>([])
    const [newItem, setNewItem] = useState({} as D)
    const [redactItem, setRedactItem] = useState({} as D)
    const toggleCheckedRow = (id: string) => {
        const isChecked = checkedRows.includes(id)
        if (isChecked) {
            setCheckedRows(prevState => prevState.filter(item => item !== id))
        } else {
            setCheckedRows(prevState => [...prevState, id])
        }
    }

    const toggleCheckedAll = () => {
        if (checkedRows.length === total) {
            setCheckedRows([])
        } else {
            setCheckedRows(data.map(item => item.id))
        }
    }

    const getTopHeight = () => {
        return rowHeight * start
    }

    const getBottomHeight = () => {
        return rowHeight * (data.length - (start + visibleRows))
    }

    function onScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        setStart(Math.min(
            data.length - visibleRows,
            Math.floor(e.currentTarget.scrollTop / rowHeight)
        ));
    }

    useEffect(() => {
        if (!!selectedRowId) {
            setRedactItem(data.find(item => item.id === selectedRowId) as D)
        }
    }, [data])

    return (
        <div className={"table-wrapper"}>
            <div className={"table-top"}>
                <button onClick={() => {
                    if (!!checkedRows?.length) {
                        deleteCheckedRows(checkedRows);
                    }
                }}>
                    Удалить
                </button>
            </div>
            <table
                className={"table"}
                style={{height: rowHeight * visibleRows + 1}}
                onScroll={onScroll}
            >
                <thead>
                <tr
                    style={{height: rowHeight}}
                >
                    <th className={"checkbox"}>
                        <input
                            type="checkbox"
                            checked={total === checkedRows.length}
                            onChange={toggleCheckedAll}
                            id={"selectAll"}
                        />
                        <label htmlFor={"selectAll"}>
                            Выделить всё
                        </label>
                    </th>
                    {headerSettings.map((setting, index) => (
                        <th
                            key={tableName + setting.field + 'head'}
                            style={{maxWidth: headerSettings[index].width}}
                        >
                            {setting.title}
                        </th>
                    ))}
                    <th style={{width: "100px"}}/>
                </tr>
                </thead>

                <tbody>
                <tr style={{height: getTopHeight()}}/>

                {data.slice(start, start + visibleRows + 1).map((row) => {
                    return (
                        <tr
                            style={{
                                height: rowHeight,
                                backgroundColor: row.id === selectedRowId ? 'rgb(232,240,254)' : ''
                            }}
                            key={tableName + row.id}
                            onClick={() => {
                                selectRowById(row.id)
                                setRedactItem(row)
                            }}
                        >
                            <td style={{maxWidth: "50px"}}>
                                <input
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    type="checkbox"
                                    checked={checkedRows.includes(row.id)}
                                    onChange={() => {
                                        toggleCheckedRow(row.id)
                                    }}
                                />
                            </td>
                            {headerSettings.map((item, index) => (
                                <td
                                    key={tableName + row.id + item.field}
                                    style={{maxWidth: headerSettings[index].width}}
                                >
                                    {row.id === selectedRowId && item.isCreate
                                        ? <input
                                            value={redactItem[item.field]}
                                            onChange={(e) => {
                                                setRedactItem(prevState => ({
                                                    ...prevState,
                                                    [item.field]: e.target.value
                                                }))
                                            }}
                                        />
                                        : row[item.field]}
                                </td>
                            ))}
                            <td style={{width: "100px"}}>
                                {row.id === selectedRowId &&
                                    <button
                                        onClick={() => {
                                            updateRow(redactItem, () => {
                                            })
                                        }}
                                    >
                                        Сохранить
                                    </button>
                                }
                            </td>
                        </tr>
                    )
                })}
                <tr style={{height: getBottomHeight()}}/>

                </tbody>
                <tfoot>
                <tr
                    style={{
                        height: rowHeight,
                    }}
                >
                    <td>
                        <button
                            onClick={() => {
                                createRow({...newItem, id: tableName + total + 1},
                                    () => {
                                        setNewItem({} as D)
                                    })
                            }}
                        >
                            Создать
                        </button>
                    </td>
                    {headerSettings.map(item => {
                        if (!item.isCreate) {
                            return <td key={tableName + 'create' + item.field}></td>
                        }
                        return (
                            <td
                                key={tableName + 'create' + item.field}
                            >
                                <input
                                    value={newItem[item.field]}
                                    onChange={(e) => {
                                        setNewItem(prevState => ({...prevState, [item.field]: e.target.value}))
                                    }}
                                />
                            </td>
                        )
                    })}
                    <th style={{width: "100px"}}/>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}