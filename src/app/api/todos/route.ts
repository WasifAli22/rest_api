// Import necessary modules and types from Next.js and the application
import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../../../../types";

// Define the URL of the data source and retrieve the API key from environment variables
const DATA_SOURCE_URL = "http://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

// Define an asynchronous function to handle HTTP GET requests
export async function GET() {
    // Fetch all 'Todo' items from the data source
    const res = await fetch(DATA_SOURCE_URL);
    
    // Parse the fetched JSON response into an array of 'Todo' objects
    const todos: Todo[] = await res.json();
    
    // Return a JSON response containing the array of 'Todo' objects
    return NextResponse.json(todos);
}

// Define an asynchronous function to handle HTTP DELETE requests
export async function DELETE(request: NextRequest) {
    // Extract 'id' from the request JSON body
    const { id }: Partial<Todo> = await request.json();
    
    // Check if 'id' is missing
    if (!id) {
        // Return a JSON response indicating that 'id' is required
        return NextResponse.json({ "message": "Todo id is required" });
    }
    
    // Send an HTTP DELETE request to the specific 'Todo' item's URL
    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "API-KEY": API_KEY
        },
    });
    
    // Return a JSON response indicating successful deletion
    return NextResponse.json({ "message": `Todo ${id} is deleted` });
}

// Define an asynchronous function to handle HTTP POST requests
export async function POST(request: NextRequest) {
    // Extract 'UserId' and 'title' from the request JSON body
    const { UserId, title }: Partial<Todo> = await request.json();
    
    // Check if required data is missing
    if (!UserId || !title) {
        // Return a JSON response indicating missing required data
        return NextResponse.json({ "message": "Missing required Data" });
    }
    
    // Send an HTTP POST request to create a new 'Todo' item
    const res = await fetch(DATA_SOURCE_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "API-KEY": API_KEY
        },
        body: JSON.stringify({ "userId": UserId, "title": title, completed: false })
    });
    
    // Parse the response and return the newly created 'Todo' object
    const newTodo: Todo = await res.json();
    return NextResponse.json(newTodo);
}

// Define an asynchronous function to handle HTTP PUT requests
export async function PUT(request: NextRequest) {
    // Extract 'UserId', 'title', 'id', and 'completed' from the request JSON body
    const { UserId, title, id, completed }: Todo = await request.json();
    
    // Check if required data is missing or invalid
    if (!UserId || !id || !title || typeof (completed) !== 'boolean') {
        // Return a JSON response indicating missing or invalid data
        return NextResponse.json({ "message": "Missing required Data" });
    }
    
    // Send an HTTP PUT request to update a 'Todo' item
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "API-KEY": API_KEY
        },
        body: JSON.stringify({ UserId, title, completed })
    });
    
    // Parse the response and return the updated 'Todo' object
    const updatedTodo: Todo = await res.json();
    return NextResponse.json(updatedTodo);
}
