"use client";

import { todoSelector, fetchTodoByUser, TodoState, deleteTodo } from "@/app/_store/todoSlice";
import { AppDispatch, RootState } from "@/app/_store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ConfirmPopup from "@/app/_components/confirm";
import { ITodo } from "@/app/_services/todoService";

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState<ITodo | null>(null);
  const { todoList, loading, error } = useSelector<RootState, TodoState>(todoSelector);
  const router = useRouter();
  const handleDelete = () => {
    dispatch(deleteTodo(selectItem?.id!));
    console.log("Item deleted");
    setShowPopup(false);
    setSelectItem(null);
  };
  const handleCancel = () => {
    setShowPopup(false);
    setSelectItem(null);
  };
  const handleConfirm = (id: string) => {
    let todo = todoList.find((todo) => todo.id === id);
    if (todo) {
      setSelectItem(todo);
      setShowPopup(true);
    }
  };
  //   React.useEffect(() => {
  //     dispatch(fetchTodoByUser());
  //   }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {showPopup && (
        <ConfirmPopup
          message={`Want delete ${selectItem?.title}`}
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => router.push("/todo/add")}
      >
        Add
      </button>
      <h1>Todo {todoList.length}</h1>
      <ul className="divide-y divide-gray-100">
        {todoList.map((todo) => (
          <li key={todo.id} className="flex justify-between gap-x-6 py-5 cursor-pointer">
            <div
              className="flex min-w-0 gap-x-4"
              onClick={() => router.push("/todo/edit/" + todo.id)}
            >
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{todo.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{todo.description}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p
                className="text-sm leading-6 text-gray-900 cursor-pointer"
                onClick={() => handleConfirm(todo.id)}
              >
                x
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
