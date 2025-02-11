"use client";

import { ClientSessionToken } from "@/lib/http";
import { ReactNode, useState } from "react";

const Provider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      ClientSessionToken.value = token;
    }
  });
  return <>{children}</>;
};

export default Provider;
