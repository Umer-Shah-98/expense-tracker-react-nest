import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategory(state, action) {
      const categories = action.payload;
      state.categories = categories;
    },
    updateCategoryAmount(state, action) {
      const category = action.payload;
      const { categoryId, type, amount } = category;

      // Find the index of the category in the state array
      const categoryIndex = state.categories.findIndex(
        (cat) => cat._id === categoryId
      );

      if (categoryIndex !== -1) {
        // Create a copy of the category to update it immutably
        const updatedCategory = { ...state.categories[categoryIndex] };

        // Update the category's amount based on the type
        if (type === "INCOME") {
          updatedCategory.incomeAmount += amount;
        } else if (type === "EXPENSE") {
          updatedCategory.expenseAmount += amount;
        }

        // Create a new state object with the updated category
        const updatedCategories = [...state.categories];
        updatedCategories[categoryIndex] = updatedCategory;

        // Update the state with the new categories array
        state.categories = updatedCategories;
      }
    },
    updateCategory(state, action) {
      const newCategory = action.payload;
      state.categories.push(newCategory);
    },
    deleteCategory(state, action) {
      state.categories = [];
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
