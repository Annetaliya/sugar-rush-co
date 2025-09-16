import { NextResponse } from "next/server";
import { supabase } from "@/lib/superbaseClient";

export async function GET(req: Request, { params }: {params: {id: string}}) {
  
    const {data, error} = await supabase
        .from('products')
        .select('*')
        .eq('product_id', params.id)
        .single()

        if (error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }

        return NextResponse.json(data, {status: 200})


}