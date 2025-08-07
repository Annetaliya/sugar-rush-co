import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/superbaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'})
    }

    const {first_name, second_name, email, password, phone, role} = req.body;

    const {data: authData, error: authError} = await supabase.auth.signUp({
        email,
        password
    })
    if (authError || !authData.user) {
        return res.status(405).json({ error: authError?.message || 'Signup failed' })
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
        return res.status(500).json({ error: 'User created but profile insert failed' })
    }
    return res.status(200).json({message: 'User registered successfully' })
}