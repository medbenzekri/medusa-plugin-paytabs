import e from "express";
import paytabs from "paytabs_pt2"

function createPaymentPage(region: string,method:string, context: any) {


    const profileID = process.env.PAYTABS_PROFILE_ID;

    const serverKey = process.env.PAYTABS_SERVER_KEY;

    paytabs.setConfig(profileID, serverKey, region);
    const price = context.amount / 100;

    const transaction = {
        type: "sale",
        class: "ecom"
    };

    const cart = {
        id: context.resource_id,
        currency: context.currency_code,
        amount: price,
        description: "dummy description"
    };

    const customer = {
        name: "",
        email: context.email || "",
        phone: context?.customer?.phone || "",
        street1: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        IP: context.context.ip
    };

    const url = {
        callback: `${process.env.WEB_ENDPOINT}/checkout?paymentStatus=approved`,
        response: `${process.env.WEB_ENDPOINT}/initiate-payment`
    };

    const paymentMethods = [method];

    const transaction_details = [
        transaction.type,
        transaction.class
    ];

    const cart_details = [
        cart.id,
        cart.currency,
        cart.amount,
        cart.description
    ];

    const customer_details = [
        customer.name,
        customer.email,
        customer.phone,
        customer.street1, // Use 'street1' instead of 'street'
        customer.city,
        customer.state,
        customer.country,
        customer.zip,
        customer.IP
    ];

    const shipping_address = customer_details;

    const response_URLs = [
        url.response,
        url.callback
    ];

    const lang = "ar";
    return new Promise((resolve, reject) => {
        paytabs.createPaymentPage(
            paymentMethods,
            transaction_details,
            cart_details,
            customer_details,
            shipping_address,
            response_URLs,
            lang,
            (paymentPageResult) => {
                // Resolve the promise with paymentPageResult when the callback is executed
                resolve(paymentPageResult);
            },
            true // frameMode: true
        );
    });
}


export default createPaymentPage;