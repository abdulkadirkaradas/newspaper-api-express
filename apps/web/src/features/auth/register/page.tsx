import Link from "next/link";
import { WEB_ROUTES } from "@/core/config/routes";
import { Logo } from "@/shared/components/Logo";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 py-8">
      <Link
        href={WEB_ROUTES.HOME}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Logo className="h-fit w-fit text-primary" />
      </Link>
      <RegisterForm />
    </div>
  );
}
