import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export async function GET(request: Request, res: Response) {
    const { searchParams } = new URL(request.url);
    if (
        searchParams.get("previewSecret") !== "1234U3QMvSOhg8R5EGxmNxe9Yf1T8zLXeHVBarR2CFqteGQ56789"
    ) {
        return new Response("Invalid token", { status: 401 });
    }
    draftMode().enable();
    const __prerender_bypass = cookies().get("__prerender_bypass")
    console.log("__prerender_bypass", __prerender_bypass)
    cookies().set({
        name: __prerender_bypass.name,
        value: __prerender_bypass.value,
        sameSite: "none",
        secure: true,
      })
    



    redirect(searchParams.get("redirect") || "/");
}
