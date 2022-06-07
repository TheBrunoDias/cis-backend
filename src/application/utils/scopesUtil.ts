import { Role } from '@prisma/client';
import { Scope } from '../../core/domain/Scopes';

const {
  // USER
  read_user,
  create_user,
  update_user,
  disable_user,
  delete_user,

  create_admin,
  create_secretary,
  create_technical_manager,
  // PROFESSIONAL
  read_professional,
  create_professional,
  update_professional,
  disable_professional,
  delete_professional,

  // INTERN
  read_intern,
  create_intern,
  update_intern,
  disable_intern,
  delete_intern,

  // ROOM
  read_room,
  create_room,
  update_room,
  disable_room,
  delete_room,

  // SPECIALTY
  read_specialty,
  create_specialty,
  update_specialty,
  disable_specialty,
  delete_specialty,

  // APPOINTMENT
  read_appointment,
  create_appointment,
  update_appointment,
  disable_appointment,
  delete_appointment,

  // SCHEDULE
  read_schedule,
  create_schedule,
  update_schedule,
  disable_schedule,
  delete_schedule,

  // SERVICE_PACK
  read_service_pack,
  create_service_pack,
  update_service_pack,
  disable_service_pack,
  delete_service_pack,

  // PATIENT
  read_patient,
  create_patient,
  update_patient,
  disable_patient,
  delete_patient,
} = Scope;

const adminScopes = [
  // USER
  read_user,
  create_user,
  update_user,
  disable_user,
  delete_user,

  create_admin,
  create_secretary,
  create_technical_manager,

  // PROFESSIONAL
  read_professional,
  create_professional,
  update_professional,
  disable_professional,
  delete_professional,

  // INTERN
  read_intern,
  create_intern,
  update_intern,
  disable_intern,
  delete_intern,

  // ROOM
  read_room,
  create_room,
  update_room,
  disable_room,
  delete_room,

  // SPECIALTY
  read_specialty,
  create_specialty,
  update_specialty,
  disable_specialty,
  delete_specialty,

  // APPOINTMENT
  read_appointment,
  create_appointment,
  update_appointment,
  disable_appointment,
  delete_appointment,

  // SCHEDULE
  read_schedule,
  create_schedule,
  update_schedule,
  disable_schedule,
  delete_schedule,

  // SERVICE_PACK
  read_service_pack,
  create_service_pack,
  update_service_pack,
  disable_service_pack,
  delete_service_pack,

  // PATIENT
  read_patient,
  create_patient,
  update_patient,
  disable_patient,
  delete_patient,
];

const secretaryScopes = [
  // USER
  read_user,
  update_user,

  create_secretary,
  create_technical_manager,

  // PROFESSIONAL
  read_professional,
  create_professional,
  update_professional,

  // INTERN
  read_intern,
  create_intern,
  update_intern,

  // ROOM
  read_room,
  create_room,
  update_room,

  // SPECIALTY
  read_specialty,
  create_specialty,
  update_specialty,

  // APPOINTMENT
  read_appointment,
  create_appointment,
  update_appointment,

  // SCHEDULE
  read_schedule,
  create_schedule,
  update_schedule,

  // SERVICE_PACK
  read_service_pack,
  create_service_pack,
  update_service_pack,

  // PATIENT
  read_patient,
  create_patient,
  update_patient,
];

const technicalManagerScopes = [
  // USER
  read_user,
  update_user,

  // PROFESSIONAL
  read_professional,

  // INTERN
  read_intern,
  create_intern,
  update_intern,
  delete_intern,
  disable_intern,

  // ROOM
  read_room,

  // SPECIALTY
  read_specialty,

  // APPOINTMENT
  read_appointment,
  create_appointment,
  update_appointment,

  // SCHEDULE
  read_schedule,
  create_schedule,
  update_schedule,

  // SERVICE_PACK
  read_service_pack,

  // PATIENT
  read_patient,
  create_patient,
];

const internScopes = [
  // PROFESSIONAL
  read_professional,

  // INTERN
  read_intern,

  // ROOM
  read_room,

  // SPECIALTY
  read_specialty,

  // APPOINTMENT
  read_appointment,
  create_appointment,
  update_appointment,

  // SERVICE_PACK
  read_service_pack,

  // PATIENT
  read_patient,
  create_patient,
];

const userHasScope = (userScopes: Scope[], scope: Scope) => {
  const find = userScopes.find((s) => s === scope);
  return !!find;
};

const getUserScope = (role: Role) => {
  switch (role) {
    case 'ADMIN':
      return adminScopes;
    case 'SECRETARY':
      return secretaryScopes;
    case 'INTERN':
      return internScopes;
    case 'TECHNICAL_MANAGER':
      return technicalManagerScopes;
  }
};

export { userHasScope, getUserScope };
