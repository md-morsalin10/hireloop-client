"use client"

import { serverMutation } from "../core/server"

export const getCompany = async (company) => {
    return serverMutation("/api/companies", company)

}

// const API_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const getCompany =async(company)=>{
//     const res = await fetch(`${API_URL}/api/companies`, {
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(company)
//     })
//       return res.json();
// }