"use client";

import { useForm } from "react-hook-form";
import { ITodo } from "../_services/todoService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { pick } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../_store/store";
import { addTodo, updateTodo } from "../_store/todoSlice";
import { useRouter } from "next/navigation";

const schema = yup.object({
  title: yup.string().min(3).max(255).required(),
  description: yup.string().required(),
});
//   .required();

type TodoForm = yup.InferType<typeof schema>;

export default function TodoForm({ state, todo }: { state: "Create" | "Edit"; todo?: ITodo }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  let tempTodo = (todo && state === "Edit") ? {...todo} : undefined;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoForm>({
    resolver: yupResolver<TodoForm>(schema),
    defaultValues: pick(tempTodo, ["title", "description"]) || {
      title: "",
      description: "",
    },
  });

  const fields = {
    title: register("title"),
    description: register("description"),
  };

  async function onSubmit(data: TodoForm) {
    if (state === "Create") {
        dispatch(addTodo({title:data.title,description:data.description}));
        router.push("/todo");
    }
    if (state === "Edit" && tempTodo) {
        tempTodo.title = data.title;
        tempTodo.description = data.description;
        dispatch(updateTodo(tempTodo));
        router.push("/todo");
    }
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 flex flex-col items-center">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    {...fields.title}
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...fields.description}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => router.push("/todo")}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {state}
        </button>
      </div>
    </form>
  );
}
