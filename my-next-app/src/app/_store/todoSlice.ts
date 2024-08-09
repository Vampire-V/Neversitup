import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITodo, todoService } from "../_services/todoService";
import { update } from "lodash";

export interface TodoState {
  counter: number;
  todoList: ITodo[];
  loading: boolean;
  error: any;
}

const initialValue: TodoState = {
  counter: 0,
  todoList: [{
    id: 'sdfdsfdsfds',
    title: "Todo 1",
    description: "Todo 1 description",
    created_at: "2021-01-01 12:00:00",
    updated_at: "2021-01-01 12:00:00",
  },{
    id: 'sdfa',
    title: "Todo 2",
    description: "Todo 2 description",
    created_at: "2021-01-01 12:00:00",
    updated_at: "2021-01-01 12:00:00",
  }],
  loading: false,
  error: null,
};

export const fetchTodoByUser = createAsyncThunk("todo/fetchTodoByUser", async () => {
  const { getAllByUser } = todoService();
  const response = await getAllByUser();
  return response.data.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action: PayloadAction<Pick<ITodo,'title'|'description'>>) => {
      state.todoList.push({
        ...action.payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.todoList.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todoList[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoByUser.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.loading = false;
        state.todoList = action.payload;
      })
      .addCase(fetchTodoByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const todoSelector = (state: RootState) => state.todo;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
