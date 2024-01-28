package permissions

var ViewEvents = ShowPermission{perm: "view-events"}
var Rostering = ShowPermission{perm: "rostering"}
var AddEvents = ShowPermission{perm: "add-events"}
var ManagePersonnel = ShowPermission{perm: "personnel"}

var AddShow = Permission{perm: "add-show"}

var Admin = GeneralRole{
	Name:        "Administrator",
	Key:         "admin",
	Permissions: []string{AddShow.perm},
}

var ShowManager = ShowRole{
	Name:        "Manager",
	key:         "manager",
	Permissions: []ShowPermission{ViewEvents, AddEvents, ManagePersonnel, Rostering},
}

var ShowMember = ShowRole{
	Name:        "Member",
	key:         "member",
	Permissions: []ShowPermission{ViewEvents},
}

var Roles = []GeneralRole{
	Admin,
}

var ShowRoles = []ShowRole{
	ShowManager,
	ShowMember,
}
