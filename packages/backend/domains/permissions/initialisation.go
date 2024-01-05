package permissions

var ViewEvents = ShowPermission{perm: "view-events"}
var AddEvents = ShowPermission{perm: "add-events"}
var ManagePersonnel = ShowPermission{perm: "personnel"}

var ViewShow = Permission{perm: "view-shows"}
var AddShow = Permission{perm: "add-show"}

var Admin = GeneralRole{
	Name:        "Administrator",
	Key:         "admin",
	Permissions: []string{ViewShow.perm, AddShow.perm},
}

var ShowManager = ShowRole{
	Name:        "Manager",
	key:         "manager",
	Permissions: []ShowPermission{ViewEvents, AddEvents, ManagePersonnel},
}

var Roles = []GeneralRole{
	Admin,
}

var ShowRoles = []ShowRole{
	ShowManager,
}
