"use client";
import React from "react";
import { useFormState } from "react-dom";
import { saveTask } from "../../../lib/action";

const CreateTaskPage = () => {
    const [state, formAction] = useFormState(saveTask,null);
    return(
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Add New Task </h1>
            <div>
            <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Title..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.title}</p>
          </div>
          
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Description..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.description}</p>
          </div>
        </div>
       
       
        <button className="btn btn-primary">Save</button>
        </form>
            </div>
        </div>
    );
};
export default CreateTaskPage;