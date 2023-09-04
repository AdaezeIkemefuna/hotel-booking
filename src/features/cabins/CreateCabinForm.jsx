import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './hooks/useCreateCabin';
import { useEditCabin } from './hooks/useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditMode = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;
  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditMode)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  };
  const onError = () => {
    // console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label={'Cabin Name'}
        error={errors?.name?.message}
        disabled={isWorking}
      >
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label={'Maximum capacity'}
        error={errors?.maxCapacity?.message}
        disabled={isWorking}
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label={'Regular price'}
        error={errors?.regularPrice?.message}
        disabled={isWorking}
      >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label={'Discount'}
        error={errors?.discount?.message}
        disabled={isWorking}
      >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value < getValues().regularPrice ||
              'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
        disabled={isWorking}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditMode ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? 'Edit Cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
