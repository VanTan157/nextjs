type CustumOptions = RequestInit & { baseUrl?: string; body?: unknown };

class HttpError extends Error {
  status: number;
  payload: unknown;
  constructor({ status, payload }: { status: number; payload: unknown }) {
    super("HTTP Error");
    this.status = status;
    this.payload = payload;
  }
}

const res = <Request>({
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
  return fetch(fullUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const payload: Request = await res.json();
      throw new HttpError({ status: res.status, payload });
    }
  });
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
