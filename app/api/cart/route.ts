import { supabase } from '@/lib/superbaseClient';

import { NextResponse  } from 'next/server';

export async function POST (req: Request) {
    const body = await req.json();
    const {user_id, quantity, product_id} = body;

    const {data, error} = await supabase
    .from('cart_items')
    .insert([{user_id, quantity, product_id}])

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
    return NextResponse.json({data})

}