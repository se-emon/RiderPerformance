"use client";

import * as React from "react";
import { AppLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login } from "@/lib/actions";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const [role, setRole] = React.useState<UserRole>("admin");

  const handleTabChange = (value: string) => {
    setRole(value as UserRole);
  };

  const handleLogin = async () => {
    await login(role);
  };
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Tabs defaultValue="admin" className="w-[400px]" onValueChange={handleTabChange}>
        <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
                <AppLogo className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">RiderPerformance</h1>
            </div>
        </div>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="rider">Rider</TabsTrigger>
          <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
        </TabsList>
        <form action={handleLogin}>
          <TabsContent value="admin">
            <LoginCard role="Admin" />
          </TabsContent>
          <TabsContent value="rider">
            <LoginCard role="Rider" />
          </TabsContent>
          <TabsContent value="data-entry">
            <LoginCard role="Data Entry" />
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}

function LoginCard({ role }: { role: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role} Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the {role.toLowerCase()} dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" defaultValue={role === 'Admin' ? 'admin@example.com' : role === 'Rider' ? 'rider@example.com' : 'data@example.com'} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" defaultValue="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Login</Button>
      </CardFooter>
    </Card>
  );
}
