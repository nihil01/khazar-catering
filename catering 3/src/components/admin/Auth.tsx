import React, { useState } from "react";
import { AdminPage } from "./Admin.tsx";
import { LoginForm } from "./LoginForm.tsx";

export const Admin: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setAuthenticated(true);
        localStorage.setItem("token", data.token);
        setError(null);
      } else {
        setAuthenticated(false);
        setError("Неверный email или пароль. Попробуйте снова.");
      }
    } catch (err) {
      setAuthenticated(false);
      setError("Произошла ошибка. Попробуйте позже.");
    }
  };

  return isAuthenticated ? <AdminPage /> : <LoginForm onLogin={handleLogin} error={error} />;
};