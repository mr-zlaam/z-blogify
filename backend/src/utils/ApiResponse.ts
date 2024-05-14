const ApiResponse = (
  status: number,
  message: string = "OK",
  optMessage: string | null = null,
  data: any = null
) => {
  return {
    success: status < 400,
    statusCode: status,
    message: message,
    optMessage: optMessage,
    data: data,
  };
};
export default ApiResponse;
