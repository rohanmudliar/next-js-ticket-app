"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const totalPriority = new Array(5).fill(true);

const TicketForm = ({ ticket }) => {
  const startingTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "not started",
    active: true,
  };

  const router = useRouter();
  const EDITMODE = ticket._id !== "new";

  if (EDITMODE) {
    Object.keys(startingTicketData).forEach((key) => {
      startingTicketData[key] = ticket[key];
    });
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchURL = EDITMODE ? `/api/tickets/${ticket._id}` : `/api/tickets`;
    const method = EDITMODE ? "PUT" : "POST";

    const res = await fetch(fetchURL, {
      method,
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      throw new Error(
        `Couldn't ${
          EDITMODE ? "update" : "create"
        } ticket. Please try again later.`
      );
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center ">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update" : "Create"} Your Ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          {totalPriority.map((val, index) => (
            <span key={index}>
              <input
                id={`priority-${index + 1}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={index + 1}
                checked={formData.priority == index + 1}
              />
              <label>{index + 1}</label>
            </span>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn"
          value={`${EDITMODE ? "Update" : "Create"} Ticket`}
        />
      </form>
    </div>
  );
};

export default TicketForm;
