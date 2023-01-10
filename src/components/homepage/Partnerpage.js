import { useState, useEffect } from "react";

export default function PartnerPage({user}) {
    console.log(user)
    return (
        <>
            <h1>Hello {user.name}. You and {user.partner} make a lovely couple</h1>
        </>
    )
}