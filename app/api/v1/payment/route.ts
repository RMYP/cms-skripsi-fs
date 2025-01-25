import { MidtransCore } from "@/lib/midtrans";

export async function POST() {
  const uuidv4 = "12345";
  try {
    const coba = await MidtransCore.charge({
      payment_type: "bank_transfer",
      bank_transfer: { bank: "bca" },
      transaction_details: {
        order_id: uuidv4,
        gross_amount: 100000,
      },
      item_details: [
        {
          id: uuidv4,
          name: "ayam bakar sambal balado",
          quantity: 2,
          price: 25000,
        },
        {
          id: uuidv4,
          name: "sop iga bakar daging lunak",
          quantity: 1,
          price: 30000,
        },
        {
          id: uuidv4,
          name: "just alpuckat",
          quantity: 2,
          price: 10000,
        },
      ],
      customer_details: {
        first_name: "restu wahyu",
        last_name: " saputra",
        email: "restuwahyu13@zetmail.com",
        phone: "087820154350",
        billing_address: {
          address: "jl.sibuta gua hantu no.120",
          city: "Depok",
          postal_code: "16436",
        },
      },
    })

    return Response.json({
      data: coba,
    });
  } catch (err: unknown) {
    return Response.json({
      status: 500,
      message: err instanceof Error ? err.message : "Unexpected Server Error",
    });
  }
}
