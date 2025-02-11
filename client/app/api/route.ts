import { decodeJWT } from "@/lib/utils";

type JWTPayload = {
  id: number;
  iat: number;
  exp: number;
  tokenType: string;
};

export async function POST(request: Request) {
  // Kiểm tra dữ liệu hoặc xử lý logic nếu cần // Ví dụ trả về một đối tượng dữ liệu
  const body = await request.json();
  const token = body.body.token;
  const decode = decodeJWT<JWTPayload>(token);
  console.log("check token>>:", token);
  console.log("check decode>>:", decode);
  const expDate = new Date(decode.exp * 1000).toUTCString();
  // Trả về Response
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
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=None; Expires = ${expDate}; SameSite = Lax; Secure`,
    },
  });
}
