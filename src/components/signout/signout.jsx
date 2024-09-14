import React from 'react'
import './signout.css'

function SignOut({auth}) {
    return auth.currentUser && (
        <button className='signout-btn' onClick={() => auth.signOut()}> Sign Out </button>
    )
}

export default SignOut