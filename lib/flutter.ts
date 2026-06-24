// Server-side context configuration file wrapper
if (!process.env.FLUTTERWAVE_SECRET_KEY) {
  throw new Error("FLUTTERWAVE_SECRET_KEY is missing from internal runtime parameters.");
}

export async function initiateServerPayment(payload: {
  amount: number;
  email: string;
  name: string;
  tx_ref: string;
}) {
  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: payload.tx_ref,
      amount: payload.amount,
      currency: "NGN",
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/flutterwave`,
      customer: {
        email: payload.email,
        name: payload.name,
      },
      customizations: {
        title: "Wyna & co.",
      },
    }),
  });

  const data = await response.json();
  return data.data?.link; // Explicit routing execution target string
}