import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if (
        searchParams.get("previewSecret") !== "1234U3QMvSOhg8R5EGxmNxe9Yf1T8zLXeHVBarR2CFqteGQ56789"
    ) {
        return new Response("Invalid token", { status: 401 });
    }

    draftMode().enable();

    redirect(searchParams.get("redirect") || "/");
}
