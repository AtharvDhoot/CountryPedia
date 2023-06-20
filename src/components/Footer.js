import React from "react";

export function Footer() {
  return (
    <footer className="bg-base-300 py-[9.5px] fixed inset-x-0 bottom-0">
      <div className="container mx-auto px-4">
        <p className="text-center">
          Atharv Dhoot © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
