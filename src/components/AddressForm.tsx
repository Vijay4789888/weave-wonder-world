
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAddresses } from '@/context/AddressContext';
import { toast } from '@/components/ui/sonner';

interface AddressFormProps {
  onSuccess?: () => void;
  editingAddressId?: string;
}

interface AddressFormData {
  name: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  type: 'Home' | 'Work' | 'Other';
}

const AddressForm: React.FC<AddressFormProps> = ({ onSuccess, editingAddressId }) => {
  const { addAddress, updateAddress, addresses } = useAddresses();
  
  const editingAddress = editingAddressId 
    ? addresses.find(a => a.id === editingAddressId) 
    : undefined;
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddressFormData>({
    defaultValues: editingAddress || {
      name: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: '',
      type: 'Home'
    }
  });
  
  const onSubmit = (data: AddressFormData) => {
    try {
      if (editingAddressId) {
        updateAddress(editingAddressId, data);
        toast.success('Address updated successfully');
      } else {
        addAddress(data);
        toast.success('Address added successfully');
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter your full name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile Number</Label>
          <Input
            id="phone"
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })}
            placeholder="10-digit mobile number"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            {...register('pincode', { 
              required: 'Pincode is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Please enter a valid 6-digit pincode'
              }
            })}
            placeholder="6-digit pincode"
            className={errors.pincode ? 'border-red-500' : ''}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs">{errors.pincode.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register('city', { required: 'City is required' })}
            placeholder="Enter your city"
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            {...register('state', { required: 'State is required' })}
            placeholder="Enter your state"
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address', { required: 'Address is required' })}
          placeholder="House no. / Building / Street / Area"
          className={errors.address ? 'border-red-500' : ''}
        />
        {errors.address && (
          <p className="text-red-500 text-xs">{errors.address.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Address Type</Label>
        <RadioGroup 
          defaultValue={editingAddress?.type || 'Home'} 
          className="flex space-x-4"
          onValueChange={(value) => setValue('type', value as 'Home' | 'Work' | 'Other')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Home" id="home" />
            <Label htmlFor="home">Home</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Work" id="work" />
            <Label htmlFor="work">Work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="pt-4">
        <Button className="w-full bg-theme-purple hover:bg-theme-darkPurple" type="submit">
          SAVE ADDRESS
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
