import { serverMutation } from "../core/server"

export const createSubscription = async (subInfo) => {
    return serverMutation("/api/subscription", subInfo)
}