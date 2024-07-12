import { Typography } from '@mui/material';

type WelcomeMessageProps = {
  firstName: string;
  lastName: string;
};

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  firstName,
  lastName,
}) => {
  return (
    <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h2">
      Welcome! {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{' '}
      {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
    </Typography>
  );
};
