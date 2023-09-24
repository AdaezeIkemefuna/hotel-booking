import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signUp as signUpApi } from '../../../services/apiAuth';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        'Account successfully created. Please verify new user from email address.'
      );
    },
    onError: () => {
      toast.error('Something went wrong.');
    },
  });
  return { signUp, isLoading };
}
