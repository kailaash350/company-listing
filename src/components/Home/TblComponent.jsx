import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { useSortBy } from 'react-table/dist/react-table.development';
import { Checkbox } from './Checkbox.jsx';
import { FilterInput } from './FilterInput';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



export default function TblComponent(props){
    const columns = props.columns
    const data =  props.data

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

    const headerGroup = headerGroups.at(0);
    console.log(headerGroups);

    const { globalFilter, pageIndex, pageSize} = state

    return (
        <>
            
            <FilterInput  filter={globalFilter} setFilter={setGlobalFilter} />
            
            <Table {...getTableProps()}>
                <Thead>
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <Th {...column.getHeaderProps(column.getSortByToggleProps)}>
                                {column.render('Header')}
                                <span style={{ marginLeft: '1rem' }}>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? 'v'
                                            : '^'
                                        : ''}
                                </span>
                            </Th>
                        ))}
                    </Tr>
               </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()} style={{padding: "10px 0"}}>
                                {row.cells.map(cell => {
                                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                })}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
            <div className="page-section">
                
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
            </div>
            {/* <div className='page-section'>
            <h3>For network call to fetch feed data</h3>
              <code>
                {JSON.stringify(
                    {
                        selectedFlatRows:selectedFlatRows.map(row=>row.original)
                    },
                    null,
                )
                }
            </code> 
</div> */}
        </>
    )
}

