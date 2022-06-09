import { useSelector } from 'react-redux'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import CartItemsContainer from '../../components/layout/cart/CartItemsContainer';
import axios from "../../config/axios";
import { OMISE_PUBLIC_KEY } from '../../config/env';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';

let OmiseCard;
function Cart() {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("")

    let cartItems = useSelector(state => state.cart.cart);
    cartItems = Object.values(cartItems);
    console.log(cartItems)
    const sum = cartItems.reduce((sum, cur) => sum+(cur.price) , 0) * 100;

    const omiseHandler = () => {
        OmiseCard.open({
            amount: sum,
            onCreateTokenSuccess: async (token) => {

                try {
                    console.log(token)
                    const res = await sendOmiseData({token: token});
                    console.log(res.data);
                } catch (err) {
                    console.log(err);
                    setErr(err.response.data.message);
                }
            },
            onFormClosed: () => {
              /* Handler on form closure. */
            },
          })
    }
    
    
    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: []
        })
        OmiseCard.configureButton("#credit-card")
        OmiseCard.attach();
    }
    async function sendOmiseData({token}) {
        
        try {
            const body = {
                courseItems: cartItems,
                omiseToken: token
            }
            const res = await axios.post('/student/course/buy', body);
            return res;
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            omiseHandler()
        } catch (err) {
            console.log(err);
        }
    }

    useLayoutEffect(() => {
        console.log(window.OmiseCard);
        OmiseCard = window.OmiseCard;
        //Needs to multiply by 100 to convert the unit to cents
        OmiseCard.configure({
            publicKey: OMISE_PUBLIC_KEY,
            amount: sum,
            currency: 'usd',
            frameLabel: "remote plus",
            submitLabel: "pay now",
            buttonLabel: "pay with omise",
            submitAuto: "no"
        })
    }, [cartItems])
    
    useEffect(() => {
        creditCardConfigure();
    }, [sum])
  return (
    <>
        <CartItemsContainer cartItems={Object.values(cartItems)}/>
        <form id="checkout-form">
            <button id="credit-card" className='btn' type='button' onClick={handleSubmit}>
                PAY WITH OMISE
            </button>
        </form>

        {loading && <Spinner title={"processing transaction..."}/>}
        {<Toast error={"test"}/>}
    </>
  )
}

export default Cart