package permissions

var ViewEvents = ShowPermission{perm: "view-events"}
var Rostering = ShowPermission{perm: "shows"}
var AddEvents = ShowPermission{perm: "add-events"}
var ViewPersonnel = ShowPermission{perm: "personnel"}
var AddPersonnel = ShowPermission{perm: "add-personnel"}
var ViewPrivatePersonnelDetails = ShowPermission{perm: "personnel-private-details"}

var AddShow = Permission{perm: "add-show"}

var Admin = GeneralRole{
	Name:        "Administrator",
	Key:         "admin",
	Permissions: []string{AddShow.perm},
}

var ShowRosterer = ShowRole{
	Name:        "Rosterer",
	key:         "Rosterer",
	Permissions: []ShowPermission{ViewEvents, Rostering},
}

var ShowManager = ShowRole{
	Name:        "Manager",
	key:         "manager",
	Permissions: []ShowPermission{ViewEvents, AddEvents, ViewPersonnel, Rostering, AddPersonnel, ViewPrivatePersonnelDetails},
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
	ShowRosterer,
}
