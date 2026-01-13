import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <Link href="/profile/settings">
        <Button>settings </Button>
      </Link>
    </div>
  );
}
