import cc from 'classnames';

export const RequestToJoinButton: React.FC<{
  toEmail: string;
  toName: string;
  showname: string;
  fromName?: string;
  fromEmail?: string;
  className?: string;
}> = (props) => {
  const {
    toEmail,
    toName,
    fromName = 'NAME',
    fromEmail = 'EMAIL',
    showname,
  } = props;
  const href = `mailto:${toEmail}?subject=%5B${showname}%5D%20Interested%20in%20joining%20the%20crew&body=Hi%20${toName}%2C%20I%20would%20like%20to%20join%20the%20crew%20of%20${showname}.%0AI'm%20interested%20in%20the%20role%20of%20mic%20tech%20%2F%20stage%20crew%20%2F%20followspot%20operator%20etc.%20etc.%0A%0A${fromName}%0A${fromEmail}`;
  return (
    <a className={cc('btn btn-outline', props.className)} href={href}>
      Request to join
    </a>
  );
};
