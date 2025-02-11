"use client";

import { useToast } from "@/hooks/use-toast";
import { ClientSessionToken } from "@/lib/http";
import ReqApi from "@/lib/reqApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const token = searchParam.get("token");
  const { toast } = useToast();
  useEffect(() => {
    const logout = async () => {
      if (token === ClientSessionToken.value) {
        console.log(token);
        const res = await ReqApi.logoutToNextServer(true);
        console.log(res);
      }
    };
    logout();
    toast({
      title: "Success",
      description: "Tài khoản của bạn đã bị đăng xuất",
    });
  }, [token, router, toast]);
  return <div>Page</div>;
}
