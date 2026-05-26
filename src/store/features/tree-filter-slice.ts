// store/slices/treeFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TreeFilterState = {
  treeFilterLevels: (string | undefined)[] | null | undefined;
  deviceStatus: string | null | undefined;
};

const initialState: TreeFilterState = {
  deviceStatus: null,
  treeFilterLevels: [],
};

const treeFilterSlice = createSlice({
  name: 'treeFilter',
  initialState,
  reducers: {
    setTreeFilter: (state, action: PayloadAction<TreeFilterState>) => {
      return { ...state, ...action.payload };
    },
    resetTreeFilter: () => initialState,
  },
});

export const { setTreeFilter, resetTreeFilter } = treeFilterSlice.actions;
export default treeFilterSlice.reducer;
