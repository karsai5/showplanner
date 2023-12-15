export type CreateEvent = {
  start: Date;
  end: Date;
  show: string;
  name?: string;
  shortnote?: string;
  curtainsUp?: string;
  requiresAvailabilities: boolean;
  publishedAt: Date;
  location?: {
    name?: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
};

export interface PublicShowSchedule {
  id: number;
  name: string;
  company: string;
  slug: string;
  password?: null;
  rolesOrder?: null;
  hidden: boolean;
  hideRoles: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  events?: EventsEntity[] | null;
  mainContact: MainContact;
  bannerimage?: Media;
}

export interface Media {
  formats: {
    large: {
      name: string;
      mime: string;
      url: string;
    };
  };
}

export interface EventsEntity {
  id: number;
  start: string;
  end: string;
  name: string;
  shortnote?: string;
  curtainsUp?: string | null;
}
export interface MainContact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
