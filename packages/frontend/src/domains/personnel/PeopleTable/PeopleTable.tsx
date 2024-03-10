import { useQuery } from '@tanstack/react-query';
import { api } from 'core/api';
import ErrorBox from 'core/components/ErrorBox/ErrorBox';
import { LoadingBox } from 'core/components/LoadingBox/LoadingBox';
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
            </tr>
          </thead>
          <tbody>
            {data.people?.map((person) => (
              <tr key={person.id}>
                <td>
                  <PersonDisplayName person={person}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};
