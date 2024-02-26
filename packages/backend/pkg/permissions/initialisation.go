package permissions

var ViewEvents = ShowPermission{perm: "view-events"}
var Rostering = ShowPermission{perm: "rostering"}
var AddEvents = ShowPermission{perm: "add-events"}
var ViewPersonnel = ShowPermission{perm: "personnel"}
var EditPersonnel = ShowPermission{perm: "add-personnel"}

var AddShow = Permission{perm: "add-show"}

var Admin = GeneralRole{
	Name:        "Administrator",
	Key:         "admin",
	Permissions: []string{AddShow.perm},
}

var ShowManager = ShowRole{
	Name:        "Manager",
	key:         "manager",
	Permissions: []ShowPermission{ViewEvents, AddEvents, ViewPersonnel, Rostering, EditPersonnel},
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
