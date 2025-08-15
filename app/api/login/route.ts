import { supabase } from '@/lib/superbaseClient';

import { NextResponse  } from 'next/server';

export async function Post(req: Request) {
    const {email, password} = await req.json()

  const { data: userCheck, error: userCheckError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

    if (!userCheck || userCheckError) {
        return NextResponse.json({error: 'Invalid email'}, {status: 400})

    }


    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return NextResponse.json({error: 'Invalid password'}, {status: 400})
    }
    return Response.json({
        user: data.user,
        session: data.session
    })

}