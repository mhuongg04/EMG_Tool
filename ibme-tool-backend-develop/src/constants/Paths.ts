/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Signup: "/signup",
  },
  File: {
    Base: "/file",
    Get: "/:id",
    GetAll: "/all",
    Upload: "/upload",
    Update: "/update/:id",
    GetAllRecords: "/:id/records",
    CreateRecord: "/:id/records/create",
    UpdateManyRecords: "/:id/records/update",
    Delete: "/:id",
    SearchByStatus: "/searchbystatus",
    SearchByName: "/searchbyname",

  },
  Record: {
    Base: "/record",
    Get: "/:id",
    Update: "/update/:id",
    Delete: "/:id",
    GetByIdAndWaveNo: "/:fileId/wave/:wave_no",
  },

  Save: {
    Base: "/save",
    Get: "/:id",
    Update: "/update/:id",
    Delete: "/delete/:id",

  }
} as const;
