import { deauthenticate } from '../services/msEntraId';
import { Button } from '@/components/button';

export async function LogoutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await deauthenticate();
      }}
    >
      <Button
        label='Log Out'
        type='submit'
        className='bg-red-500 hover:bg-red-600'
      />
    </form>
  );
}
