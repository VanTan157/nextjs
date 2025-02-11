import { redirect } from "next/navigation";

type CustumOptions = RequestInit & {
  baseUrl?: string;
  body?: unknown;
  Authorization?: string;
};

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
  statusCode: number;
};

class HttpError extends Error {
  status: number;
  payload: unknown;
  constructor({ status, payload }: { status: number; payload: unknown }) {
    super("HTTP Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: number;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
  get value() {
    return this.token;
  }
  get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}

export const ClientSessionToken = new SessionToken("");

const res = async <Request>({
  method,
  url,
  options,
  body,
}: {
  method: string;
  url: string;
  options: CustumOptions;
  body: unknown;
}) => {
  const baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_BE_URL ?? "";
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: options.Authorization ?? "",
    },
    redirect: "follow",
  });
  if (res.ok) {
    return res.json();
  } else {
    const payload: Request = await res.json();
    if (res.status === 422) {
      throw new EntityError({
        status: 422,
        payload: payload as EntityErrorPayload,
      });
    } else if (res.status === 401) {
      console.log("error 401");
      if (typeof window !== "undefined") {
        try {
          await fetch(`http://localhost:3000/api/logout`, {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          ClientSessionToken.value = "";
          location.href = "/login";
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("server get me");
        const token = options.Authorization?.split(" ")[1];
        console.log(token);
        console.log(typeof window === "undefined");
        redirect(`/logout?token=${token}`);
      }
    } else {
      throw new HttpError({ status: res.status, payload });
    }
  }
};

export const http = {
  get: <Request>(url: string, options: CustumOptions = {}) =>
    res<Request>({ method: "GET", url, options, body: undefined }),
  post: <Request>(url: string, body: unknown, options: CustumOptions = {}) =>
    res<Request>({ method: "POST", url, options, body }),
  put: <Request>(url: string, body: unknown, options: CustumOptions = {}) =>
    res<Request>({ method: "PUT", url, options, body }),
  delete: <Request>(url: string, options: CustumOptions = {}) =>
    res<Request>({ method: "DELETE", url, options, body: undefined }),
};

export { HttpError };
