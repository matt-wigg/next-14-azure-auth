import { azureADUnauthenticated } from "../services/authenticate";
import Button from "@/app/components/button";

export default async function LogoutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await azureADUnauthenticated();
      }}
    >
      <Button
        label="Log Out"
        type="submit"
        className="bg-red-500 hover:bg-red-600"
      />
    </form>
  );
}
