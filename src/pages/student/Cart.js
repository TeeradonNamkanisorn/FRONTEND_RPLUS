import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import CartItemsContainer from '../../components/layout/cart/CartItemsContainer';
import axios from "../../config/axios";
import { OMISE_PUBLIC_KEY } from '../../config/env';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import SuccessPay from '../../components/layout/cart/SuccessPay';
import { clearCart } from '../../slices/cartSlice';

let OmiseCard;
function Cart() {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    let cartItems = useSelector(state => state.cart.cart);
    cartItems = Object.values(cartItems);
    console.log(cartItems)
    const sum = cartItems.reduce((sum, cur) => sum+(cur.price) , 0) * 100;

    const omiseHandler = async () => {
        OmiseCard.open({
            amount: sum,
            onCreateTokenSuccess: async (token) => {

                try {
                    setLoading(true);
                    const res = await sendOmiseData({token: token});
                    setSuccess(true);
                    dispatch(clearCart());
                } catch (err) {
                    console.log(err);
                    setErr( err.response?.data?.message || err.message || "Request Error");
                } finally {
                    setLoading(false);
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
        
        
        const body = {
            courseItems: cartItems,
            omiseToken: token
        }
        const res = await axios.post('/student/course/buy', body);
        return res;
     
    }
    const handleSubmit= async (e) => {
        e.preventDefault();
        console.log("handle submit")
        setLoading(true)
        //set sucess = true inside omise handler
        //ret catch inside omise handler
        await omiseHandler();
        setLoading(false);
        
    }

    useEffect(() => {
        //Omise requires the button id #credit-card to exist otherwise will throw an error.
        if (success) return;

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
        creditCardConfigure();

    }, [cartItems, success])
    

    const NOT_PAID_SCREEN = (
        <>
            <CartItemsContainer cartItems={Object.values(cartItems)}/>
            <form id="checkout-form" >
                <button id="credit-card" className='btn' type='button' onClick={handleSubmit}>
                    PAY WITH OMISE
                </button>
            </form>
        </>
    )

    const SUCCESS_PAID_SCREEN = (
        <SuccessPay/>
    )

  return (
    <>
        {success? SUCCESS_PAID_SCREEN: NOT_PAID_SCREEN}
        {loading && <Spinner title={"processing transaction..."}/>}
        {err && <Toast error={err}/>}
    </>
  )
}

export default Cart