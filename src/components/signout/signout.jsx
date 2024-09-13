import React from 'react'
import './signout.css'

function Signout({auth}) {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}> Sign Out </button>
    )
}

export default Signout