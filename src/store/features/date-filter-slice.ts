import { createSlice } from '@reduxjs/toolkit';

// get today date and format it to yyyy-mm-dd
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  return formattedDate;
};

const initialState = {
  info: {
    period_type: 'Daily',
    inserted_date: getTodayDate(),
  },
};

const dateFilterSlice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    handleChangeDateFilter: (state, action) => {
      state.info = action.payload;
    },
  },
});

export default dateFilterSlice.reducer;

export const { handleChangeDateFilter } = dateFilterSlice.actions;
