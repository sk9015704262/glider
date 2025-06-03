export default {
  async fetch(request, env, ctx) {
    return onRequestPost({ request, env, ctx });
  }
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const verbose = env?.VERBOSE_LOGGING === "true";

  function LogVerbose(...args) {
    if (verbose) console.log(...args);
  }

  LogVerbose("Request received");

  try {
    const formData = await request.json();
    LogVerbose("Form data received:", formData);

    const {
      name, phone, email, street, suburb, postcode,
      note, appointmentDay, appointmentTime,
      doorStyle, series, doorDesign, doorColour, imagePath
    } = formData;

    const html = `
      <h2>New Design Enquiry from Gliderol Design Centre</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${street}, ${suburb}, ${postcode}</p>
      <p><strong>Note:</strong> ${note}</p>
      <p><strong>Preferred Appointment:</strong> ${appointmentDay} at ${appointmentTime}</p>
      <h3>Door Details</h3>
      <ul>
        <li><strong>Style:</strong> ${doorStyle}</li>
        <li><strong>Series:</strong> ${series}</li>
        <li><strong>Design:</strong> ${doorDesign}</li>
        <li><strong>Colour:</strong> ${doorColour}</li>
      </ul>
      ${imagePath ? `<p><img src="${imagePath}" alt="Design Preview" style="max-width: 100%;" /></p>` : ''}
    `;

    const recipients = (env.RECIPIENTS || "")
      .split(",")
      .map(e => e.trim())
      .filter(e => e.length > 0)
      .map(email => ({ email }));

    if (!recipients || recipients.length === 0) {
      LogVerbose("No recipients found in environment variables");
      return new Response("No recipients configured", { status: 500 });
    }

    LogVerbose("Recipients:", recipients);

    const emailPayload = {
      sender: {
        name: env.SENDER_NAME,
        email: env.SENDER_EMAIL
      },
      to: recipients,
      subject: "New Garage Door Design Enquiry",
      htmlContent: html
    };

    LogVerbose("Sending request to Brevo with payload:", emailPayload);

    const res = await fetch("https://api.brevo.com/v3/smtp/email",  {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    if (!res.ok) {
      LogVerbose("Brevo API returned error:", await res.text());
      return new Response("Failed to send email", { status: 500 });
    }

    LogVerbose("Email sent successfully");
    return new Response("Submitted successfully", { status: 200 ,
       headers: {
        "Access-Control-Allow-Origin": "*", // Or restrict to a specific domain for security
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }
    });

  } catch (err) {
    LogVerbose("Caught exception:", err.message, err.stack);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}