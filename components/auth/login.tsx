"use client"

import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button";

export default function Login() {
  return (
    <Button className="z-50" color="warning" size="md" variant="ghost" onPress={() => signIn()}>
      Log In
    </Button>
)}