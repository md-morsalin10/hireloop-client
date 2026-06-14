"use server"
import { serverMutation } from "../core/server"

export const getApplicants = async (payload) => {
    return serverMutation("/api/applications", payload)
}