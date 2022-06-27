import React,{useState}from 'react'
import { useAsyncDebounce } from 'react-table'
import "./Home.css";

export const FilterInput = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined)
    }, 1000)

  return (
   
      <span>
        <label htmlFor="">Local Search : </label>
        <input className='table-search'
        placeholder='Local Search'
          value={value || ''}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </span>
    
  )
}
