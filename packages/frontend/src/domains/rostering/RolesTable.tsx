import { useQuery } from "@tanstack/react-query"
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useShowSummary } from "domains/shows/lib/summaryContext"

export const RolesTable: React.FC<{
	className?: string
}> = ({
	className,
}) => {
		const show = useShowSummary();
		const { isError, isLoading, data: roles } = useQuery(["show-roles", show.id], () => api.rolesGet({ showId: show.id }));
		return <div className={className}>
			{isLoading && <LoadingBox />}
			{isError && <ErrorBox>Could not get roles</ErrorBox>}
			{roles && <table className="table">
			<tbody>
				{roles?.map(r => <tr key={r.id}>
					<td>{r.name}</td>
				</tr>)}
			</tbody>
		</table>}
		</div>
	}
