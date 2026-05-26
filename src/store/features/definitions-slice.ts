import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {
    org_id: null,
  },
};

const definitionsSlice = createSlice({
  name: 'orgId',
  initialState,
  reducers: {
    handleChangeOrgId: (state, action) => {
      state.info = action.payload;
    },
  },
});

export default definitionsSlice.reducer;

export const { handleChangeOrgId } = definitionsSlice.actions;
