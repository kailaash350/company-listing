import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { useSortBy } from 'react-table/dist/react-table.development';
import { Checkbox } from './Checkbox.jsx';
import { FilterInput } from './FilterInput';

const Table = (props) => {
    const columns = useMemo(() => props.columns, [])
    const data = useMemo(() => props.data, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage, 
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        setPageSize,
        selectedFlatRows,
        state, 
        setGlobalFilter,
        prepareRow,
    } = useTable({
        columns,
        data 
    },  
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
            return[
                {
                    id:'selection',
                    Header:({getToggleAllRowsSelectedProps})=>(
                        <Checkbox {...getToggleAllRowsSelectedProps()}/>
                    ),
                    Cell:({row})=>(
                        <Checkbox {...row.getToggleRowSelectedProps()}/>
                    )      
                },
                ...columns
            ]
        })
    }
    )

    const { globalFilter, pageIndex, pageSize} = state

    return (
        <>
            <FilterInput filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps)}>{column.render('Header')}
                                    <span style={{ marginLeft: '1rem' }}>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? 'v'
                                                : '^'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[50,100,300].map(pageSize => ( 
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>

            {/* for RSS API <code>
                {JSON.stringify(
                    {
                        selectedFlatRows:selectedFlatRows.map(row=>row.original)
                    },
                    null,
                )
                }
            </code> */}
        </>
    )
}

export default Table;