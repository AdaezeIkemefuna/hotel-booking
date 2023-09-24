import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updatedUserApi } from '../../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updatedUserApi,
    onSuccess: () => {
      toast.success('User successfully Updated');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}
