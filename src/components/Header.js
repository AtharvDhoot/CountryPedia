import { useEffect } from "react";
import { themeChange } from "theme-change";

export function Header() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1 px-2 lg:flex-none">
        <p className="text-sm font-bold lg:text-lg">
          Countrypedia: Exploring the Nations of the World
        </p>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <select data-choose-theme className="h-10 rounded-full px-3 border">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="black">Black</option>
          </select>
        </div>
      </div>
    </div>
  );
}
