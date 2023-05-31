export const getError = err => err?.response?.data?.message || err.message || "Something went wrong..."
