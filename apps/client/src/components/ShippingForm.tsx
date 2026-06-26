import { shippingformInputs, shippingSchema } from "@repo/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import {SubmitHandler, useForm} from "react-hook-form"

const ShippingForm = ({setShippingForm}:{setShippingForm:(data:shippingformInputs) => void;
}) => {

    const {register,handleSubmit,formState:{errors},
    } = useForm<shippingformInputs>({
        resolver:zodResolver(shippingSchema as any)
    });

   const router = useRouter();

    const handleShippingForm:SubmitHandler<shippingformInputs> = (data)=>{
    setShippingForm(data);
    router.push("/cart?step=3",{scroll:false})
    }

  return (
    <form onSubmit={handleSubmit(handleShippingForm)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="name">Name</label>
            <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="name" placeholder="Eg. Rohit Mathur" {...register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

{/* email  */}

        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="email">Email</label>
            <input className="border-b border-gray-200 py-2 outline-none text-sm" type="email" id="email" placeholder="Eg. example@eg.com" {...register("email")}  />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

{/* Phone  */}

        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="phone">Mobile Number</label>
            <input className="border-b border-gray-200 py-2 outline-none text-sm" type="phone" id="phone" placeholder="Eg. 1234567" {...register("phone")} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

{/* address  */}

        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="address">Address</label>
            <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="address" placeholder="Eg. 1234 Address" {...register("address")} />
            {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
        </div>

{/* city  */}

        <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium" htmlFor="city">City</label>
            <input className="border-b border-gray-200 py-2 outline-none text-sm" type="city" id="city" placeholder="Eg. Denmark" {...register("city")} />
            {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
        </div>
        <button className="w-full hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 bg-gray-800 text-white p-2 rounded-lg cursor-pointer">Continue
  <ArrowRight className="w-3 h-3" />
</button>
    </form>
  )
}

export default ShippingForm