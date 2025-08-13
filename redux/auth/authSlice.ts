import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UserDetails  {
    id : string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    role: string

}
interface UserState {
    user: UserDetails | null;
    session: any | null;
}

const initialState: UserState = {
    user: null,
    session: null
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user: UserDetails; session: any}>) => {
            state.user = action.payload.user
            state.session = action.payload.session
        },
        clearUser: (state) => {
            state.user = null;
            state.user = null;
        }
    }
})
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;