export async function onRequestGet(context) {

    console.log("🔥 testconnections.js function called");

    const { env } = context;
    const verbose = env?.VERBOSE_LOGGING === "true";
    function LogVerbose(...args) {
    if (verbose) console.log(...args);
  }
    function LogVerbose(...args) {
      if (verbose) console.log(...args);
    }
  
    LogVerbose("Test connection function triggered");
  
    // Simple quick call to test Brevo connection
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/templates?limit=1&offset=0&templateStatus=true", {
        method: "GET",
        headers: {
          "api-key": env.BREVO_API_KEY,
          "accept": "application/json"
        }
      });
  
      const status = res.status;
      const data = await res.json();
  
      LogVerbose("API status:", status);
      LogVerbose("Response:", data);
  
      if (!res.ok) {
        return new Response(`Brevo API check failed. Status: ${status}`, { status });
      }
  
      return new Response(JSON.stringify({
        status,
        message: "Brevo API is reachable and authenticated",
        data
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
  
    } catch (err) {
      LogVerbose("Exception:", err.message);
      return new Response(`Test connection failed: ${err.message}`, { status: 500 });
    }
  }