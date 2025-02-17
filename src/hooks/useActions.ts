import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { useMemo } from "react";
import { movePlayer } from "@/store/playerSlice";
const useActions = () =>{
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators({movePlayer}, dispatch), [dispatch]);
    
}
export default useActions;