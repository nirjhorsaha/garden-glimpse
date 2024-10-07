/* eslint-disable prettier/prettier */
// import { getCookies } from "cookies-next";

// import envConfig from "@/src/config/envConfig";


// export const getSingleUser = async (userId: string) => {
//     console.log({userId})
//     let fetchOptions = {};
//     const cookies = getCookies(); // Retrieve cookies using getCookies


//     fetchOptions = {
//         cache: "no-store",
//         Authorization: `Bearer ${cookies.accessToken}`,
//     };

//     const res = await fetch(`${envConfig.baseApi}/users/${userId}`, fetchOptions);

//     if (!res.ok) {
//         throw new Error("Failed to fetch user data");
//     }

//     return res.json();
// };
