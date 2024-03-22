import { useQuery } from '@tanstack/react-query';
import { api } from 'core/api';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { LoadingBox } from 'core/components/LoadingBox/LoadingBox';
import { HasPermission, PERMISSION } from 'core/permissions';
import { PersonDisplayName } from 'domains/personnel/PersonDisplayName';

export const PeopleTable: React.FC<{
  showId: number;
  className?: string;
}> = ({ showId, className }) => {
  const { data, isLoading, isError } = useQuery(
    ['assigned-people', showId],
    () => api.personnelAssignedGet({ showId }),
  );
  if (isLoading) {
    return <LoadingBox />;
  }
  if (isError) {
    return <ErrorBox>Could not load people</ErrorBox>;
  }
  if (data) {
    return (
      <div className={className}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <HasPermission permission={PERMISSION.personnelPrivateDetails} showId={showId}>
                <th>Phone</th>
                <th>Email</th>
                <th>WWC</th>
                <th>DOB</th>
              </HasPermission>
            </tr>
          </thead>
          <tbody>
            {data.people?.map((person) => (
              <tr key={person.id}>
                <td className='text-nowrap'>
                  <PersonDisplayName person={person} />
                </td>
                <HasPermission permission={PERMISSION.personnelPrivateDetails} showId={showId}>
                  <td><a className="link text-nowrap" href={`tel:${person?._private?.phone}`}>{person?._private?.phone}</a></td>
                  <td><a className="link text-nowrap" href={`mailto:${person?._private?.email}`}>{person?._private?.email}</a></td>
                  <td className="text-nowrap">{person?._private?.wwc}</td>
                  <td className="text-nowrap">{person?._private?.dob}</td>
                </HasPermission>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};
