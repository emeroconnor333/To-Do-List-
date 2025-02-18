import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to To-Do</h1>
      <Link href="todo">
        <button>Go to To-Do</button>
      </Link>
    </div>
  );
}
