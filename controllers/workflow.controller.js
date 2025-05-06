import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";

import { createRequire } from "module";
import { SERVER_URL } from "../config/env.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");


const REMAINDERS = [1, 3, 5, 7];



export const sendReminders = serve( async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);


    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscription}. Stopping workflow`);

        return;
    }


    for(const daysBefore of REMAINDERS) {
        const remainderDate = renewalDate.subtract(daysBefore, "day");
        if (remainderDate.isAfter(dayjs())) {
            await sleepUntilRemainder(context, `Remainder ${daysBefore} days before`);
    
        }

        await triggerRemainder(context, `Remainder ${daysBefore} days before`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get Subscription", async () => {
        return Subscription.findById(subscriptionId).populate({path: "user", select: "name email"});
    })
}


const sleepUntilRemainder = async (context, label, date) => {
    console.log(`Sleeping until $label} remainder at ${date}`);
    await context.sleepUntil(label, date.toDate())
    
}

const triggerRemainder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminader`);
        //Send email, SMS, push notifications...
    })


}