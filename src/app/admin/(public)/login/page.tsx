import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="cf-admin-section cf-admin-section--auth">
      <LoginForm error={params.error} />
    </section>
  );
}
