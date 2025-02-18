"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ToDoPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: number; task: string }[]>([]);
  const [user, setUser] = useState<any>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth"); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }
    };
  
    fetchUser();
  }, []);
  

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      let { data } = await supabase.from("tasks").select("*").eq("user_id", user.id);
      setTasks(data || []);
    };
    fetchTasks();
  }, [user]);

  const addTask = async () => {
    if (!user) return; // Ensure user is logged in
    if (task.trim() === "") return; // Prevent empty tasks
  
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ task, user_id: user.id }])
      .select();
  
    if (error) {
      alert("Failed to add task: " + error.message);
      return;
    }
  
    setTasks([...tasks, data[0]]); // Update UI
    setTask(""); // Clear input field
  };
  

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };  

  const updateTask = async (id: number) => {
    if (editingText.trim() === "") return;

    const { error } = await supabase
      .from("tasks")
      .update({ task: editingText })
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, task: editingText } : t))
      );
      setEditingId(null);
      setEditingText("");
    }
  };  

  return (
    <div>
      <h1>My To-Do List</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task..." />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{t.task}</span>
            )}

            {editingId === t.id ? (
              <button onClick={() => updateTask(t.id)}>💾 Save</button>
            ) : (
              <button onClick={() => startEditing(t.id, t.task)}>✏️ Edit</button>
            )}

            <button onClick={() => deleteTask(t.id)}>✖</button>
          </li>
        ))}
      </ul>
            
      <button onClick={async () => { await supabase.auth.signOut(); router.push("/auth"); }}>Logout</button>
    </div>
  );
}
