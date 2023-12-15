export const userFixture = {
  __typename: 'UsersPermissionsMe',
  id: '1',
  email: 'linus@linusk.com.au',
  username: 'linusk',
  permissions:
    'show::priscilla::personnel,show::priscilla::rostering,show::priscilla::event-edit,general::permissions-edit,show::test_show::personnel,show::showpass::event-edit,show::priscilla::notifications-new-crew,personnel,general::personnel,show::priscilla::notifications-availabilities,general::locations-edit,general::shows-view-hidden,show::showpass::personnel,show::showpass::rostering,show::testshow::personnel,show::testshow::rostering,show::testshow::event-edit,show::test_show::rostering,show::test_show::event-edit,show::empty::personnel,show::empty::event-edit,show::empty::rostering,show::empty::notifications-new-crew,show::empty::notifications-availabilities,show::empty::notifications-daily-roster,general::application-events',
  role: {
    __typename: 'UsersPermissionsMeRole',
    id: '1',
    name: 'Authenticated',
  },
  person: {
    __typename: 'People',
    id: '1',
    firstname: 'Linus',
    lastname: 'Karsai',
    avatar: {
      __typename: 'UploadFile',
      formats: {
        thumbnail: {
          name: 'thumbnail_CleanShot 2022-01-01 at 16.45.10@2x.png',
          hash: 'thumbnail_Clean_Shot_2022_01_01_at_16_45_10_2x_7b2b0c6616',
          ext: '.png',
          mime: 'image/png',
          width: 139,
          height: 156,
          size: 67.28,
          path: null,
          url: '/uploads/thumbnail_Clean_Shot_2022_01_01_at_16_45_10_2x_7b2b0c6616.png',
        },
      },
    },
  },
};
