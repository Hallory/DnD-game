import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
    name: string,
    level: number,
    experience: number,
    attributes:{
        strength:number,
        dexterity: number,
        constitution:number,
        intelligence:number,
        wisdom:number,
        charisma:number
    }
}

const initialState:CharacterState = {
    name: 'Безымянный персонаж', 
    level:1,
    experience:0,
    attributes:{
        strength:10,
        dexterity:10,
        constitution:10,
        intelligence:10,
        wisdom:10,
        charisma:10
    }
}


const characterSlice = createSlice({
    name:'character',
    initialState,
    reducers:{
        setName:(state, action: PayloadAction<string>)=>{
            state.name = action.payload;
        },
        increaseAttribute:(state, action: PayloadAction<keyof CharacterState['attributes']>)=>{
            state.attributes[action.payload]+=1;
        },
        decreaseAttribute:(state, action: PayloadAction<keyof CharacterState['attributes']>)=>{
            state.attributes[action.payload]-=1;
        }
    }

})


export const {setName, increaseAttribute, decreaseAttribute} = characterSlice.actions;
export default characterSlice.reducer;