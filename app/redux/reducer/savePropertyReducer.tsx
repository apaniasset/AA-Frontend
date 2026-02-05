import { createSlice } from '@reduxjs/toolkit';

export const savePropertySlice = createSlice({
    name: "saveProperty",
    initialState: {
        saveProperty: [],
    },
    reducers:{
        addTosaveProperty : (state:any,action:any) => {
            const itemInsaveProperty = state.saveProperty.find((item:any) => item.id == action.payload.id);
            if(itemInsaveProperty){
                itemInsaveProperty.quantity++;
            }else{
                state.saveProperty.push({...action.payload,quantity:1})
            }
        },
        removeFromsaveProperty:(state:any,action:any) => {
            const removeFromsaveProperty = state.saveProperty.filter((item:any) => item.id !== action.payload);
            state.saveProperty = removeFromsaveProperty;
        },
        incrementQuantity : (state:any,action:any) => {
            const itemInsaveProperty = state.saveProperty.find((item:any) => item.id == action.payload.id);
            itemInsaveProperty.quantity++;
        },
        decrementQuantity : (state:any,action:any) => {
            const itemInsaveProperty = state.saveProperty.find((item:any) => item.id == action.payload.id);
            if(itemInsaveProperty.quantity == 1){
                const removeFromsaveProperty = state.saveProperty.filter((item:any) => item.id !== action.payload.id);
                state.saveProperty = removeFromsaveProperty;
            }else{
                itemInsaveProperty.quantity--;
            }
        }
    }
});

export const {addTosaveProperty,removeFromsaveProperty,incrementQuantity,decrementQuantity} = savePropertySlice.actions;

export default savePropertySlice.reducer;