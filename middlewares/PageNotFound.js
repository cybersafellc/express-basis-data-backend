import response from "../responses/response.js";

const PageNotFound = async (req, res) => {
  try {
    return response(200, "page not found", null, res);
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};
export default PageNotFound;
