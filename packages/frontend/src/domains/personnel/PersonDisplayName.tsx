import { PersonSummaryDTO } from "core/api/generated"

export const PersonDisplayName: React.FC<{
	person: PersonSummaryDTO
}> = ({
	person
}) => {
		const firstName = person.preferredName || person.firstName || ''
		return <>{firstName} {person.lastName || ''}</>
	}
