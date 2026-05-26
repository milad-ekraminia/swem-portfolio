import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {
    tree_id: null,
    title: '',
    parentTitle: '',
    type: 0,
    deviceModelType: 0,
    locationId: null,
  },
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    handleChangeTree: (state, action) => {
      state.info = action.payload;
    },
    resetTreeState: () => initialState,
  },
});

export const { handleChangeTree, resetTreeState } = treeSlice.actions;
export default treeSlice.reducer;
