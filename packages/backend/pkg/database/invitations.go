package database

func GetInvitationsByShowID(showID int64) ([]Invitation, error) {
	invitations := []Invitation{}
	err := db.Where("show_id = ?", showID).Find(&invitations).Error
	return invitations, err
}
