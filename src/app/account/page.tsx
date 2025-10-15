import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="container-page py-12">
        <p className="text-sm">Please <Link href="/login" className="underline">sign in</Link> to view your account.</p>
      </div>
    );
  }
  return (
    <div className="container-page py-12">
      <h1 className="heading-serif text-2xl mb-4">Welcome, {session.user.name ?? session.user.email}</h1>
      <p className="text-sm text-foreground/70">Order history and profile management coming soon.</p>
    </div>
  );
}


