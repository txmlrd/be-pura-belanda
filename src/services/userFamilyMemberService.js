const User = require("../models/user.model");
const UserFamilyMember = require("../models/userFamilyMembers.model");

module.exports = {
  addFamilyMember: async (userId, familyMemberData) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    return await UserFamilyMember.create({
      user_id: userId,
      name: familyMemberData.name,
      relationship_status: familyMemberData.relationship_status,
    });
  },

  getFamilyMembersByUserId: async (userId) => {
    return await UserFamilyMember.findAll({
      where: { user_id: userId },
    });
  },

  updateFamilyMember: async (familyMemberId, data) => {
    const familyMember = await UserFamilyMember.findByPk(familyMemberId);
    if (!familyMember) return null;
    return await familyMember.update(data);
  },

  deleteFamilyMember: async (familyMemberId) => {
    const familyMember = await UserFamilyMember.findByPk(familyMemberId);
    if (!familyMember) return null;
    await familyMember.destroy();
    return true;
  },
};