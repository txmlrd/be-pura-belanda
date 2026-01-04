const userFamilyMemberService = require("../services/userFamilyMemberService");
const { success, error } = require("../helpers/response");

module.exports = {
  addFamilyMember: async (req, res) => {
    try {
      const familyMember = await userFamilyMemberService.addFamilyMember(
        req.user.id,
        req.body
      );
      return success(
        res,
        "Family Member Added Successfully",
        familyMember,
        201
      );
    } catch (e) {
      console.error(e);
      return error(res, e.message || "Failed to Add Family Member", 500);
    }
  },

  getFamilyMembers: async (req, res) => {
    try {
      const familyMembers = await userFamilyMemberService.getFamilyMembersByUserId(
        req.user.id
      );
      return success(
        res,
        "Family Members Retrieved Successfully",
        familyMembers,
        200
      );
    } catch (e) {
      console.error(e);
      return error(res, "Failed to Retrieve Family Members", 500);
    }
  },

  updateFamilyMember: async (req, res) => {
    try {
      const familyMember = await userFamilyMemberService.updateFamilyMember(
        req.params.id,
        req.body
      );
      if (!familyMember) {
        return error(res, "Family Member Not Found", 404);
      }
      return success(
        res,
        "Family Member Updated Successfully",
        familyMember,
        200
      );
    } catch (e) {
      console.error(e);
      return error(res, "Failed to Update Family Member", 500);
    }
  },

  deleteFamilyMember: async (req, res) => {
    try {
      const result = await userFamilyMemberService.deleteFamilyMember(
        req.params.id
      );
      if (!result) {
        return error(res, "Family Member Not Found", 404);
      }
      return success(res, "Family Member Deleted Successfully", null, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to Delete Family Member", 500);
    } 
  },
};
