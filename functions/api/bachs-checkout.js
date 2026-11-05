// BACKEND: creates a Bachs checkout for one product and returns the payment page link.
// Runs on Cloudflare (free). Your Bachs SECRET key is stored in Cloudflare, never in the website files.
// Prices are read from products.js here on the server, so nobody can change the price in their browser.
import "../../products.js";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export async function onRequestPost({ request, env }) {
  const key = env.BACHS_SECRET_KEY || "";
  if (!key.startsWith("sk_")) return json({ error: "Payments are not set up yet" }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request" }, 400); }
  const name = String(body.name || "").trim().slice(0, 100);
  const email = String(body.email || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 30);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Enter your name and a valid email" }, 400);

  const product = (globalThis.PRODUCTS || []).find((p) => p.name === body.product);
  const price = product ? parseInt(String(product.price).replace(/\D/g, ""), 10) : NaN;
  if (!product || !(price >= 1000)) return json({ error: "This product can’t be bought online yet" }, 400);

  // sk_sandbox_ keys use the test system; sk_live_ keys take real money
  const api = key.startsWith("sk_sandbox_") ? "https://sandbox-api.bachs.io" : "https://api.bachs.io";
  const site = new URL(request.url).origin;
  const reference = "cmr82-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);

  const res = await fetch(api + "/v1/checkout-sessions", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json", "Idempotency-Key": reference },
    body: JSON.stringify({
      customer: phone ? { name, email, phone_number: phone } : { name, email },
      pricing: { currency: "NGN", amount: price.toFixed(2), price_type: "fixed" },
      reference,
      metadata: { product: product.name, phone },
      success_url: site + "/?paid=1&item=" + encodeURIComponent(product.name),
      cancel_url: site + "/#shop",
      expires_in_minutes: 60,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.checkout_url) {
    console.log("Bachs error", res.status, JSON.stringify(data));
    return json({ error: "Payment service error (" + res.status + ")" }, 502);
  }
  return json({ url: data.checkout_url });
}
