const response = async (statusCode, message, data, res) => {
  try {
    res.status(statusCode).json({
      message: message,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};
export default response;
