"use client";

import { useState } from "react";
import React, { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [token, setToken] = useState(null);

  const handleSignout = async () => {

    localStorage.clear();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <div className="flex justify-between bg-slate-950">
      <h1 className="text-xl p-8">EStore</h1>
      <ul className="flex p-8 cursor-pointer">
        <Link className="mx-2" href="/">
          products
        </Link>
        <Link className="mx-2" href="/admin/addproduct">
          Admin
        </Link>
        {token ? (
          <Link className="mx-2" href="/auth/signin" onClick={handleSignout}>
            Logout
          </Link>
        ) : (
          <Link className="mx-2" href="/auth/signin">
            Login
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
