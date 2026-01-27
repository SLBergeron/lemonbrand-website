import { redirect } from "next/navigation";

// Root page redirects to the Sprint course
export default function LearnHomePage() {
  redirect("/sprint");
}
