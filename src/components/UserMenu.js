import React, { useContext } from 'react'
import { userInfoCtx } from '../contexts/userInfoCtx'

function UserMenu() {
    const {state, dispatch} = useContext(userInfoCtx);
    const username = state.personal.username;
  return (
    <div>{username || "Guest"}</div>
  )
}

export default UserMenu