// toast.js
import { toast } from "react-toastify";

/**
 * Displays a toast message.
 * @param {string} message - The text message to display.
 * @param {string} [type="default"] - The toast type: "success", "error", "info", "warn", or "default".
 */
export const Toast = (message, type = "default") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    default:
      toast(message);
      break;
  }
};