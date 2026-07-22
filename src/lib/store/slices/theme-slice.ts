import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CURRENCIES } from "@/lib/constants/site";

interface ThemeSliceState {
  mode: "light" | "dark" | "system";
  currency: string;
  language: string;
}

const initialState: ThemeSliceState = {
  mode: "light",
  currency: CURRENCIES[0].code,
  language: "en",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (
      state,
      action: PayloadAction<"light" | "dark" | "system">
    ) => {
      state.mode = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setThemeMode, setCurrency, setLanguage } = themeSlice.actions;
export default themeSlice.reducer;
