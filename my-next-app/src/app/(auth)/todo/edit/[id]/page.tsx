"use client";

import TodoForm from "@/app/_components/todoForm";
import { RootState } from "@/app/_store/store";
import { todoSelector, TodoState } from "@/app/_store/todoSlice";
import { useSelector } from "react-redux";

export default function EditTodo({ params: { id } }: { params: { id: string } }) {
  const { todoList} = useSelector<RootState, TodoState>(todoSelector);
  const todo = todoList.find((todo) => todo.id === id);
  return <TodoForm state="Edit" todo={todo} />;
}
