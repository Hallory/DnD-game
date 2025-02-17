import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PlayerState {
    position: {x: number, y: number, z: number}
}

const initialState:PlayerState ={
    position: {x: 0, y: 1, z: 0}
}

export const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        movePlayer:(state, action:PayloadAction<{x: number, y: number, z: number}>)=>{
            state.position = action.payload;
        }
    }
    
})


export const {movePlayer} = playerSlice.actions;

export default playerSlice.reducer