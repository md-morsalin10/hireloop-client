import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
   "seeker_pro":"price_1Ti5COIM3hhHjEyt5IhuDwlk",
   "seeker_premium":"price_1TiIDXIM3hhHjEytqHADOW5U",
   "recruiter_pro":"price_1TiIGzIM3hhHjEytHl93dWR5",
   "recruiter_premium":"price_1TiII3IM3hhHjEytQCV4fPkt"
}