import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllCourseAsync } from '../../../slices/manyCourseSlice';

function SearchSideBar() {
    const dispatch = useDispatch();
    const handleSearchByPopularity = async() => {
        dispatch(fetchAllCourseAsync({
            popularity: true
        }));
    }
    const handleSearchByDate = async() => {
        dispatch(fetchAllCourseAsync({
            sortByDate: true
        }))
    }
  return (
    <div className='search-side text-center'>
        <button className='btn btn-danger mt-4' onClick={handleSearchByPopularity}>Sort by popularity</button>
        <button className='btn btn-warning my-3' onClick={handleSearchByDate}>Sort By Latest Update</button>
    </div>
  )
}

export default SearchSideBar