import { HttpError } from "@/lib/http";
import ReqApi from "@/lib/reqApi";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const cookieStore = cookies();
  const token = (await cookies()).get("token")?.value;
  const force = req.force as boolean | undefined;
  console.log(force);

  if (!token) {
    return Response.json(
      { message: "Token not found" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (force) {
    (await cookieStore).set("token", "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    return Response.json(
      { message: "Tài khoản đã bị đăng xuất" },
      {
        status: 200,
      }
    );
  }

  try {
    const res = await ReqApi.logoutToServer(token as string);

    (await cookieStore).set("token", "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });

    return Response.json(res, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    }
    return Response.json("Lỗi không xác định", {
      status: 401,
    });
  }
}
