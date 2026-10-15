"use client";

import NotFound from "@/app/not-found";
import { protectedRoutes, routes } from "@/app/resources";
import { Button, Column, Flex, Heading, PasswordInput, Spinner } from "@/once-ui/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
}

// sections with pages nested under them, switched on by their own entry in `routes`
const dynamicRoutes = ["/blog", "/work", "/gallery"] as const;

function isRouteEnabled(path: string) {
  if (path in routes) {
    return routes[path as keyof typeof routes];
  }
  return dynamicRoutes.some((route) => path.startsWith(`${route}/`) && routes[route]);
}

/*
  Decides during render, from the path alone, so a public page is in the static HTML
  and appears at once. Only a password-protected page waits on the network, and that
  needs the API routes, which exist under `npm run dev` or on Vercel but not on Pages.
*/
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname() ?? "/";
  // trailingSlash: true gives "/about/"; the keys in `routes` have no trailing slash
  const path = pathname === "/" ? pathname : pathname.replace(/\/$/, "");
  const isProtected = Boolean(protectedRoutes[path as keyof typeof protectedRoutes]);

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(isProtected);
  const [error, setError] = useState<string | undefined>(undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `path` re-runs the check when moving between protected pages
  useEffect(() => {
    if (!isProtected) return;
    let cancelled = false;
    setChecking(true);
    setIsAuthenticated(false);
    fetch("/api/check-auth")
      .then((response) => !cancelled && setIsAuthenticated(response.ok))
      .catch(() => {})
      .finally(() => !cancelled && setChecking(false));
    return () => {
      cancelled = true;
    };
  }, [isProtected, path]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!isRouteEnabled(path)) {
    return <NotFound />;
  }

  if (isProtected && !isAuthenticated) {
    if (checking) {
      return (
        <Flex fillWidth paddingY="128" horizontal="center">
          <Spinner />
        </Flex>
      );
    }

    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
