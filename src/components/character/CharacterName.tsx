'use client'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { setName } from '@/store/characters/characterSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const CharacterName: React.FC = () => {

    const dispatch = useDispatch();

    const name = useTypedSelector(state=>state.character.name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setName(event.target.value))
    }

    return (
        <div>
            <label > Имя персонажа:</label>
            <input type="text" value={name} onChange={handleChange}/>
        </div>
    );
};

export default CharacterName;