export const errhandler = (err, request, response, next) => {
    if (err.status) {
        return response.status(err.status).json({ message: err.message });
    }

    return response.status(500).json({ message: "Internal Server Error" });
};
