import toast from 'react-hot-toast';

export const handleErrorStatuses = (status: number) => {
  switch (status) {
    case 400:
      toast.error('Error: 400, Bad Request');

      throw new Error('Error: 400, Bad Request');
    case 401:
      toast.error('Error: 401, Unauthorized');

      throw new Error('Error: 401, Unauthorized');
    case 404:
      toast.error('Error: 404, Not Found');

      throw new Error('Error: 404, Not Found');
    case 500:
      toast.error('Error: 500, Internal Server Error');

      throw new Error('Error: 500, Internal Server Error');
    default:
      toast.error(`Error Status Code: ${status.toString()}`);

      throw new Error(`Error Status Code: ${status.toString()}`);
  }
};
