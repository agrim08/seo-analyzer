import { API_KEY } from "../utils/constant.js";

export const seo_analyzer = async (targetUrl) => {
  const apiEndpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=seo";
  const url = new URL(apiEndpoint);
  url.searchParams.set("url", targetUrl);
  url.searchParams.set("key", API_KEY);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching results", error);
    throw error;
  }
};
