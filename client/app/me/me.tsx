"use client";

import { ClientSessionToken, HttpError } from "@/lib/http";
import ReqApi from "@/lib/reqApi";
import { useEffect, useState } from "react";
import { AccountType } from "../validate";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const MePage = () => {
  const [account, setAccount] = useState<AccountType>();
  const router = useRouter();
  const { toast } = useToast();
  const token = ClientSessionToken.token;

  const handleLogout = async () => {
    try {
      const res = await ReqApi.logoutToNextServer();
      ClientSessionToken.value = "";
      toast({
        title: "Success",
        description: res.message,
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof HttpError) {
      }
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetch = async () => {
      try {
        const res = await ReqApi.getMe(token as string);
        setAccount(res.data);
      } catch (error) {
        if (error instanceof HttpError) {
          console.log(error);
        }
      }
    };
    fetch();
  }, [token]);
  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
      <h1>Hello {(account as AccountType)?.name}</h1>
    </>
  );
};
export default MePage;
