import { revalidatePath } from "next/cache";
import sql from "../db";

export default async function TodoList() {
	const getTodos = async () => {
		"use server";
        // get all todos from the database and sort by id in ascending order
		const todos = await sql`SELECT * FROM todos ORDER BY id ASC`;
		return todos;
	};

	const todos = await getTodos();

	// Delete Todos
	const deleteTodo = async (formData: FormData) => {
		"use server";
		const id = formData.get("todoId") as string;
		await sql`DELETE FROM todos WHERE id = ${id}`;

		revalidatePath("/");
	};

	return (
		<div className="flex flex-col">
			<label className="label text-2xl" htmlFor="input">
				Todo List
			</label>
			<table className="table table-sm">
				<thead>
					<tr>
						<th>No</th>
						<th>Todo</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<tr key={i} className="list">
							<th>{i + 1}</th>
							<td>{todo.todo}</td>
							<td>
								{/* Delete Button in server component */}
								<form action={deleteTodo}>
									<input type="hidden" name="todoId" value={todo.id} />
									<button type="submit" className="btn btn-xs btn-error">
										Delete
									</button>
								</form>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
