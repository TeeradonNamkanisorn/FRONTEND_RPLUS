import React from 'react'
import { useDispatch } from 'react-redux'
import { removeById } from '../../../slices/cartSlice';

function CartItem({courseItem}) {
    const dispatch = useDispatch();
    const {imageLink, name, description, price, id} = courseItem;
    
    const handleClickDelete = () => {
        dispatch(removeById({id}))
    }
  return (
    <div className="card mb-3 my-3 w-75 " >
        <div className="row g-0">
            <div className="col-sm-1 border d-flex justify-content-center align-items-center">
                <img src={imageLink} className="img-fluid rounded-start" alt="course preview" style={{maxWidth:80, maxHeight:80}}/>
            </div>
            <div className="col-md-2 border card-title my-0 d-flex justify-content-center align-items-center">
                <p className='my-0' style={{maxHeight: 50}}>{name}</p>
            </div>
            <div className='col-sm-4 card-body border d-flex justify-content-center align-items-center'>
                <p className="card-text my-0" style={{maxHeight: 100, overflow: "auto"}}>{description}</p>
            </div>
            <p className='col-sm-1 d-flex align-items-center justify-content-center h2 border my-0 '>$ {price}</p>
            <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                <i className='fa-solid fa-trash-can fa-3x' role={"button"} onClick={handleClickDelete}></i>
            </div>
        </div>
    </div>
  )
}

export default CartItem