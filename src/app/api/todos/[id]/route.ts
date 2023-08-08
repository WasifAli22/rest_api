import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../../../../../types";

// Define the URL of the data source and retrieve the API key from environment variables
const DATA_SOURCE_URL = "http://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

// Define an asynchronous function to handle HTTP GET requests
export async function GET(request: NextRequest) {
    // Extract the 'id' from the last part of the request URL
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);

    // Fetch the 'Todo' item from the data source based on the extracted 'id'
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

    // Parse the fetched JSON response into a 'Todo' object
    const todo: Todo = await res.json();

    // Check if the 'id' property of the 'Todo' is missing, indicating it's not found
    if (!todo.id) {
        // Return a JSON response indicating that the 'Todo' was not found
        return NextResponse.json({ "message": "Todo not found" });
    }

    // Return a JSON response containing the retrieved 'Todo' object
    return NextResponse.json(todo);
}
