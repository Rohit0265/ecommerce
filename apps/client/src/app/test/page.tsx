import { auth } from "@clerk/nextjs/server";

const page = async ()=>{

    // console.log(process.env.NEXT_PUBLIC_PRODUCT_URL);

    const {getToken} = await auth();
    const token = await getToken();
    console.log(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_URL}/test`,{
        // credentials: "include",
        headers:{ 
            Authorization:`Bearer ${token}`,
        }    
    });
    const data1 =await res.json(); 
    console.log(data1)



    const datares = await fetch(`${process.env.NEXT_PUBLIC_ORDER_URL}/test`,{
        headers:{ 
            Authorization:`Bearer ${token}`,
        }    
    });

    const data =await datares.json();
    console.log(data);



    const payment = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/test`,{
        headers:{ 
            Authorization:`Bearer ${token}`,
        }    
    });

    const paydata =await payment.json();
    console.log(paydata);

    return (
        <div>Hello</div>
    )
}


export default page;