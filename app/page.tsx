import { revalidatePath } from "next/cache";
import TodoList from "./components/TodoList";
import sql from "./db";

export default function Home() {
	const postTodo = async (formData: FormData) => {
		"use server";
		const todoData = formData.get("todo") as string;
		await sql`INSERT INTO todos (todo) VALUES (${todoData})`;

		revalidatePath("/");
	};
	return (
		<div className="flex flex-col m-6 sm:m-auto sm:justify-center">
			<div className="h-32 lg:col-span-1">
				<form
					action={postTodo}
					className="mx-auto mb-0 mt-8 max-w-md space-y-4"
				>
					<label className="label text-2xl" htmlFor="input">
						Todo
					</label>
					<input
						type="text"
						name="todo"
						placeholder="Type here"
						className="input input-bordered input-accent w-full"
					/>
					<button type="submit" className="btn btn-accent w-full">
						Add
					</button>
				</form>
				<div className="mx-auto max-w-md mt-10">
					<TodoList />
				</div>
			</div>
		</div>
	);
}
