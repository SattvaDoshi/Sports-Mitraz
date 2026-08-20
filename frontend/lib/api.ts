const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getAdminKey = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminKey") || "";
  }
  return "";
};

export const setAdminKey = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminKey", key);
  }
};

export const clearAdminKey = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminKey");
  }
};

interface FetchOptions extends RequestInit {
  isAdmin?: boolean;
}

export const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
  const { isAdmin = false, headers = {}, ...restOptions } = options;

  const requestHeaders: Record<string, string> = {
    ...headers as Record<string, string>,
  };

  if (isAdmin) {
    const adminKey = getAdminKey();
    if (adminKey) {
      requestHeaders["X-Admin-Key"] = adminKey;
    }
  }

  // Set default content type to JSON if not sending FormData
  if (!(restOptions.body instanceof FormData) && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: requestHeaders,
    ...restOptions,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 && isAdmin && typeof window !== "undefined") {
        // Redirect to login if unauthorized
        window.location.href = "/admin/login";
    }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
