import toast from 'react-hot-toast';

const errorMessages: Record<number, string> = {
  400: 'Error: 400, Bad Request',
  401: 'Error: 401, Unauthorized',
  404: 'Error: 404, Not Found',
  500: 'Error: 500, Internal Server Error',
};

export const handleErrorStatuses = (status: number) => {
  const defaultMessage = `Error Status Code: ${status.toString()}`;
  const message = errorMessages[status] || defaultMessage;

  toast.error(message);

  throw new Error(message);
};
