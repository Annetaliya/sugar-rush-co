import { NextResponse  } from 'next/server';
import { supabase } from '@/lib/superbaseClient';

export async function POST(req: Request) {
   
    const body = await req.json()

    const {first_name, second_name, email, password, phone, role} = body;

    const {data: authData, error: authError} = await supabase.auth.signUp({
        email,
        password
    })
    if (authError || !authData.user) {
        return NextResponse.json({ error: authError?.message || 'Signup failed' }, {status: 405})
    }

    const defaultRole = role || 'user'

    const {error: dbError} = await supabase.from('users').insert({
         id: authData.user.id,
         first_name,
         second_name,
         email,
         phone,
         role: defaultRole
    })
    if (dbError) {
        NextResponse.json({ error: 'User created but profile insert failed' }, {status: 500})
    }
    return NextResponse.json({message: 'User registered successfully' }, {status: 200})
}